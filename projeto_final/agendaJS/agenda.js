// Agenda gravando e lendo arquivo CSV
// Finalizado 02/mai/2025

const readline = require('readline-sync');
const fs = require('fs');

const CLS = '\x1Bc';

dic = {}

function menu() {
    console.log('\n** Agenda **\n');
    console.log('1. Cadastrar usuário');
    console.log('2. Mostrar dados de um usuário');
    console.log('3. Listar todos nomes cadastrados');
    console.log('4. Remover usuário');
    console.log('5. Limpar toda agenda');
    console.log('6. Gravar arquivo');
    console.log('7. Ler arquivo');
    console.log('8. Sair');
    const op = Number(readline.question('\nOpção: '));
    return op;
}

function cadastrar_usuario() {
    process.stdout.write(CLS);
    console.log('\n** Cadastrar usuário **');
    const nome = readline.question("\nNome: ");
    const fone = readline.question("Telefone: ");
    const email = readline.question('E-mail: ');

    if (nome != '' && fone != '' && email != '') {
        dic[nome] = { 'fone': fone, 'email': email };
        console.log(`\n** Usuário [${nome}] cadastrato com sucesso! **`);
        gravar_agenda(true);
    }
    else {
        console.log('\n** Usuário não cadastrato, todos os dados devem ser fornecidos **');
    }
    readline.question('\nPressione Enter para continuar.');
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
                console.log(`\nUsuário "${user}" não cadastrado.`);
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
                console.log(`\nÍndice [${index}] inexistente.`);
            }
        }
        readline.question('\nPressione Enter para continuar.');
    }
}


function listar_todos_usuarios(ref = false) {
    process.stdout.write(CLS);
    if (Object.values(dic).length === 0) {
        console.log('\n** Nao há usuário cadastrado! **');
        readline.question('\nPressione Enter para continuar.');
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
    readline.question('\nPressione Enter para continuar.');
}


function remover_usuario() {
    ref = listar_todos_usuarios(true);

    if (ref) {
        const user = readline.question('\nQual usuário deseja remover? ');

        if (isNaN(user)) {
            for (let nome in dic) {
                if (nome === user) {
                    const op = readline.question(`\nUsuário [${user}] será removido. Continuar? [N/s]: `);
                    if (op === 's') {
                        delete dic[user];
                        gravar_agenda(true);
                        break;
                    }
                }
            }
        }
        else if (!isNaN(user)) {
            const index = Number(user);

            let i = 1;
            for (let nome in dic) {
                if (i === index) {
                    const op = readline.question(`\nUsuário [${user}. ${nome}] será removido. Continuar? [N/s]: `);
                    if (op == 's') {
                        delete dic[nome];
                        gravar_agenda(true);
                        break;
                    }
                }
                i++;
            }
        }
        else {
            print('\nUsuário não cadastrado');
            input('\nPressione Enter para continuar.');
        }
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
                readline.question('\nPressione Enter para continuar.');
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
        console.log('\n*** Agenda atualizada ***');
        readline.question('\nPressione Enter para continuar.');
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
        console.log('\n*** Arquivos salvos em disco ***');
        readline.question('\nPressione Enter para continuar.');
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
