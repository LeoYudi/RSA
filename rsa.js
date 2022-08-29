const bigInt = require('big-integer'); //package para manipulação de números grandes

class RSA {

  //recebe o numero de digitos e retorna um numero possivelmente primo
  static randomPrime(digits) {
    const min = bigInt.one.shiftLeft(digits - 1);
    const max = bigInt.one.shiftLeft(digits).prev();

    while (true) {
      let p = bigInt.randBetween(min, max);
      if (p.isProbablePrime(128)) {
        return p;
      }
    }
  }

  //gera as chaves para criptografia e descriptografia
  static generate() {
    const expoEnc = bigInt(65537);
    const primo1 = this.randomPrime(1024);
    const primo2 = this.randomPrime(1024);
    const phi = primo1.subtract(bigInt.one).multiply(primo2.subtract(bigInt.one));

    return {
      expoEnc,
      keyPub: primo1.multiply(primo2),
      expoDec: expoEnc.modInv(phi),
    };
  }

  static encrypt(msg, expoEnc, keyPub) {
    return bigInt(msg).modPow(expoEnc, keyPub);
  }

  static decrypt(encryptedMsg, expoDec, keyPub) {
    return bigInt(encryptedMsg).modPow(expoDec, keyPub);
  }

  //transforma uma string em número inteiro
  static encode(str) {
    const codes = str
      .split('')
      .map(i => i.charCodeAt())
      .join('');

    return bigInt(codes);
  }

  //transforma um número inteiro em string
  static decode(code) {
    const stringified = code.toString();
    let string = '';

    for (let i = 0; i < stringified.length; i += 2) {
      let num = Number(stringified.substr(i, 2));

      if (num <= 30) {
        string += String.fromCharCode(Number(stringified.substr(i, 3)));
        i++;
      } else {
        string += String.fromCharCode(num);
      }
    }

    return string;
  }
}

module.exports = RSA;