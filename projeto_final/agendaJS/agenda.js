// Agenda gravando e lendo arquivo CSV
// Finalizado 02/mai/2025

const readline = require('readline-sync');
const fs = require('fs');


const CLS       = '\x1Bc';
const BLACK     = '\u001b[30m';
const VERMELHO  = '\u001b[31m';
const VERDE     = '\u001b[32m';
const AMARELO   = '\u001b[33m';
const AZUL      = '\u001b[34m';
const MAGENTA   = '\u001b[35m';
const CIANO     = '\u001b[36m';

const FVERMELHO = '\u001b[41m';
const FVERDE    = '\u001b[42m';
const FAMARELO  = '\u001b[43m';
const FAZUL     = '\u001b[44m';
const FMAGENTA  = '\u001b[45m';
const FCIANO    = '\u001b[46m';
const FBRANCO   = '\u001b[47m';

const NORMAL    = '\u001b[m';
const NEGRITO   = '\u001b[1m';
const SUBLINADO = '\u001b[4m';


dic = {}

function menu() {
    console.log(`\n${NEGRITO}${FAZUL}** Agenda **${NORMAL}\n`);
    console.log('1. Cadastrar usuário');
    console.log('2. Mostrar dados de um usuário');
    console.log('3. Listar todos nomes cadastrados');
    console.log('4. Remover usuário');
    console.log('5. Limpar toda agenda');
    console.log('6. Gravar arquivo');
    console.log('7. Ler arquivo');
    console.log('8. Sair');
    const op = Number(readline.question(`\n${NEGRITO}${VERDE}Opção: ${NORMAL}`));
    return op;
}


function cadastrar_usuario() {
    process.stdout.write(CLS);
    console.log(`\n${NEGRITO}${AZUL}** Cadastrar usuário **${NORMAL}`);
    const nome = readline.question("\nNome: ");
    const fone = readline.question("Fone [ddd]: ");
    const email = readline.question('E-mail: ');

    if (nome != '' && fone != '' && email != '') {
        if (validarFone(fone)) {
            if (validarEmail(email)) {
                dic[nome] = { 'fone': fone, 'email': email };
                console.log(`\n${NEGRITO}${AZUL}** Usuário [${nome}] cadastrato com sucesso! **${NORMAL}`);
                gravar_agenda(true);
            }
            else {
                console.log(NEGRITO, VERMELHO, '\n** E-mail inválido **', NORMAL);
            }
        }
        else {
            console.log(NEGRITO, VERMELHO, '\n** Telefone inválido **', NORMAL);
        }
    }
    else {
        console.log(NEGRITO, VERMELHO, '\n** Usuário não cadastrato, todos os dados devem ser fornecidos **', NORMAL);
    }
    readline.question(`\n${VERDE}Pressione Enter para continuar.${NORMAL}`);
}


// Retorna true se email válido
function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (regex.test(email)) {
        return true;
    } else {
        return false;
    }
}


// Retorna true se fone válido no formato "11 99999-9999" ou "11 2222-2222"
function validarFone(fone) {
    const regex = /^\d{2}\s\d{4,5}-\d{4}$/;

    if (regex.test(fone)) {
        return true;
    } else {
        return false;
    }
}


function buscar_usuario() {
    ref = listar_todos_usuarios(true);
    if (ref) {
        const user = readline.question('\nQual usuário deseja listar dados? ');

        // Para nome
        if (isNaN(user)) {
            if (user in dic) {
                for (let nome in dic) {
                    if (nome === user) {
                        console.log(`\nNome  : ${user}`);
                        console.log(`Fone  : ${dic[user]['fone']}`);
                        console.log(`E-mail: ${dic[user]['email']}`);
                    }
                }
            }
            else {
                console.log(`\n${NEGRITO}${VERMELHO}Usuário "${user}" não cadastrado.${NORMAL}`);
            }
        }
        // Para número [índice]
        else {
            const index = Number(user);
            const tam = Object.keys(dic).length;

            if (index > 0 && index <= tam) {
                let i = 1;
                for (let nome in dic) {
                    if (i === index) {
                        console.log();
                        console.log(`Nome  : ${nome}`);
                        console.log(`Fone  : ${dic[nome]['fone']}`);
                        console.log(`E-mail: ${dic[nome]['email']}`);
                        break;
                    }
                    i++;
                }
            }
            else {
                console.log(`\n${NEGRITO}${VERMELHO}Índice [${index}] inexistente.${NORMAL}`);
            }
        }
        readline.question(`\n${NEGRITO}${VERDE}Pressione Enter para continuar.${NORMAL}`);
    }
}


function listar_todos_usuarios(ref = false) {
    process.stdout.write(CLS);
    console.log(`\n${NEGRITO}${AZUL}** Usuários cadastrados **${NORMAL}`);
    if (Object.values(dic).length === 0) {
        console.log('\n** Nao há usuário cadastrado! **');
        readline.question(`\n${NEGRITO}${VERDE}Pressione Enter para continuar.${NORMAL}`);
        return false;
    }
    else {
        console.log();
        let i = 1;
        for (let nome in dic) {
            console.log(`${i}. ${nome}`);
            i++;
        }
        if (ref) {
            return true;
        }
    }
    readline.question(`\n${NEGRITO}${VERDE}Pressione Enter para continuar.${NORMAL}`);
}


function remover_usuario() {
    ref = listar_todos_usuarios(true);

    if (ref) {
        let usuarioCadastrado = false;        

        const user = readline.question(`\n${NEGRITO}${AMARELO}Qual usuário deseja remover?${NORMAL} `);

        if (isNaN(user)) {
            for (let nome in dic) {
                if (nome === user) {
                    const op = readline.question(`\n${NEGRITO}${VERMELHO}Usuário [${user}] será removido. Continuar? [N/s]:${NORMAL} `);
                    if (op === 's') {
                        delete dic[user];
                        gravar_agenda(true);                        
                        break;
                    }
                    usuarioCadastrado = true;
                }
            }
            if (!usuarioCadastrado) {
                console.log(`\n${NEGRITO}${MAGENTA}Usuário [${user}] não cadastrado.${NORMAL}`);
            }
        }
        else if (!isNaN(user)) {
            const index = Number(user);

            let i = 1;
            for (let nome in dic) {
                if (i === index) {
                    const op = readline.question(`\n${NEGRITO}${VERMELHO}Usuário [${user}. ${nome}] será removido. Continuar? [N/s]:${NORMAL} `);
                    if (op == 's') {
                        delete dic[nome];
                        gravar_agenda(true);                        
                        break;
                    }
                    usuarioCadastrado = true;
                }
                i++;
            }
            if (!usuarioCadastrado && user != '') {
                console.log(`\n${NEGRITO}${MAGENTA}Identificador [${user}.] não encontrado.${NORMAL}`);
            }
        }                
        readline.question(`\n${NEGRITO}${VERDE}Pressione Enter para continuar.${NORMAL}`);        
    }
}


function limpar_agenda() {
    ref = listar_todos_usuarios(true);
    if (ref) {
        const op = readline.question('\nToda a agenda será apagada. Continuar? [N/s] ');
        if (op === 's') {
            const op = readline.question('\nTem certeza? [N/s] ');
            if (op === 's') {
                dic = {};
                gravar_agenda(true);
                console.log('\n** Todos registros foram apagados **');
                readline.question(`\n${NEGRITO}${VERDE}Pressione Enter para continuar.${NORMAL}`);
            }
        }
    }
}


function ler_agenda(ref = false) {
    process.stdout.write(CLS);
    const file1 = './agenda.json';

    // Verificar se arquivo "agenda.json" existe
    if (!fs.existsSync(file1)) {
        gravar_agenda(true);
    }

    const fileBuffer = fs.readFileSync(file1, 'utf-8');
    const contentJson = JSON.parse(fileBuffer);
    dic = contentJson;

    if (!ref) {
        console.log(`\n${NEGRITO}${AZUL}*** Agenda atualizada ***${NORMAL}`);
        readline.question(`\n${NEGRITO}${VERDE}Pressione Enter para continuar.${NORMAL}`);
    }
}


function gravar_agenda(ref = false) {
    if (!ref) {
        process.stdout.write(CLS);
    }

    const file1 = './agenda.json';
    const file2 = './agenda.txt';
    const file3 = './agenda.csv';

    // Json
    const contentString = JSON.stringify(dic);
    fs.writeFileSync(file1, contentString);

    // txt
    let texto = '';
    for (let nome in dic) {
        texto += `${nome};${dic[nome]['fone']};${dic[nome]['email']}\n`;
    }
    fs.writeFileSync(file2, texto, function (erro) {
        if (erro) {
            throw erro;
        }
    });

    // CSV
    fs.writeFileSync(file3, texto, function (erro) {
        if (erro) {
            throw erro;
        }
    });

    if (!ref) {
        console.log(`\n${NEGRITO}${AZUL}*** Arquivos salvos em disco ***${NORMAL}`);
        readline.question(`\n${NEGRITO}${VERDE}Pressione Enter para continuar.${NORMAL}`);
    }
}


function sair() {
    console.log();
    process.exit(0);
}


//-------------------------------------------------


ler_agenda(true);

while (true) {
    process.stdout.write(CLS);
    const op = menu();

    switch (op) {
        case 1: cadastrar_usuario(); break;
        case 2: buscar_usuario(); break;
        case 3: listar_todos_usuarios(); break;
        case 4: remover_usuario(); break;
        case 5: limpar_agenda(); break;
        case 6: gravar_agenda(); break;
        case 7: ler_agenda(); break;
        case 8: sair(); break;
    }
}
