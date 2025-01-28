const rl = require("node:readline");

const prompt = rl.createInterface({
    input: process.stdin,
    output: process.stdout,
})

let name;

prompt.question("Informe seu nome: ", answer => {
    name = answer;
    prompt.close();
})

prompt.on("close", () => {
    console.log("Seja bem vindo:", name);
})
