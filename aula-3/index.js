
// https://www.codecademy.com/article/getting-user-input-in-node-js

// npm init -y

// npm install prompt-sync

const prompt = require('prompt-sync')({sigint: true});

const num = prompt('Enter a number: ');
console.log('Your number + 4 =');
console.log(Number(num) + 4);
