/********************************************
        Operador condicional ternário
(teste lógico) ? [se verdadeiro] : [se falso]
********************************************/

// Verificar seu um número é positivo ou negativo
const n = '-1'
res = (n>=0) ? 'positivo' : 'negativo';

// Validar valor com isNaN
// res = (!isNaN(n) ? (n >= 0) ? 'positivo' : 'negativo' : 'não é número')

console.log(n, ':', res)


// Verificar se um número é par ou impar
const num = '11';
// const result = (num % 2 === 0) ? 'par' : 'impar';
// const result = (!isNaN(num) ? (num % 2 === 0) ? 'par' : 'impar' : 'texto')

// console.log(`${num}  é ${result}.`);
// console.log(`${num} -> ${typeof num}`)

// Maior|menor de idade
let idade = 18;
const result2 = (idade>0 && idade<=120) ? (idade>17) ? 'Maior de idade': 'Menor de idade' : 'Idade inválida';
// console.log(`${idade} => ${result2}`);


// Imc
const readline = require('readline-sync');
// let peso = Number(readline.question('Seu peso? '));
// let altura = Number(readline.question('Sua altura? '));
// const imc = peso / altura ** 2;

// const estado = (imc<17) ? 'Muito abaixo do peso' : (imc>=17 && imc<18.5) ? 'Abaixo do peso' : (imc>=18.5 && imc<25) ? 'Peso normal' : (imc>=25 && imc<30) ? 
// 'Acima do peso' : (imc>=30 && imc<35) ? 'Obesidade 1' : (imc>=35 && imc < 40) ? 'Obesidade 2' : !isNaN ? 'Obesidade 3' : 'Indeterminado';

// console.log('Imc:', !(isNaN(imc)) ? imc.toFixed(1) : 'Valores inválidos');
// console.log('Estado:', estado)
