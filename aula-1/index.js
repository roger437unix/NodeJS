
console.log("Hello, World!")

// Variável global
{
    var nome = "tux"
}
console.log(nome)

/**************************
Variável mutável e imutável

const => imutável | local
let   => mutável  | local       
var   => mutável  | global
***************************/

// const nome2 = "multics"
let nome2 = "multics"
console.log(nome2)

nome2 = "unix"
console.log(nome2)

// Nomes semânticos
const processCurrentWorkDirectory = process.cwd()
console.log(processCurrentWorkDirectory)
