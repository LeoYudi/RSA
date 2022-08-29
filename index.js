//arquivo principal
//para executar primeiro utilize o comando 'npm install' na pasta do projeto
//depois utilize o comando node ./index.js

const RSA = require('./rsa'); //importa classe rsa
const getInput = require('./input'); //importa método para leitura no console

const main = async () => {

  console.log('Aguarde ...')
  const { keyPub, expoDec, expoEnc } = RSA.generate();
  console.log({ keyPub, expoDec, expoEnc });

  const msg = await getInput('Digite a mensagem para ser criptografada: \n');
  const resultCode = RSA.encrypt(RSA.encode(msg), expoEnc, keyPub);
  console.log('O resultado é', RSA.decode(resultCode));

  const resultMsg = RSA.decrypt(resultCode, expoDec, keyPub);
  console.log('O resulto é', RSA.decode(resultMsg));

  process.exit(1);
}



main();