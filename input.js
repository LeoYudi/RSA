//arquivo para leitura de input no terminal

const readline = require("readline"); //package nativo do node
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//método que printa uma pergunta no console e retorna a entrada do usuário
const getInput = async (question) => {
  return await new Promise((resolve, reject) => {

    rl.question(question, function (input) {
      resolve(input);
    });
  });
}

module.exports = getInput;