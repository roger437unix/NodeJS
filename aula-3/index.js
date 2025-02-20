
/* Entrada de dados com readline-sync */

// npm install readline-sync

const readline = require('readline-sync');

const nome = readline.question('Seu nome: ');
let peso = Number(readline.question('Informe seu peso: '));
let altura = Number(readline.question('Informe sua altura: '));

const imc = peso / altura ** 2;

console.log('Nome:', nome);
console.log(`Nome: ${nome ** 2}`);  // NAN
console.log(`Imc: ${imc.toFixed(0)}`);
