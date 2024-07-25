const prompt = require("prompt-sync")();


//Esta função previne entradas numericas invalidas e ainda aceita entradas com , ou . 
function lerNumeroComValidacao(pergunta, min, max) {
    let numero;
    while (true) {
        let entrada = prompt(pergunta);
        entrada = entrada.replace(',','.');
        numero = parseFloat(entrada);
        if (!isNaN(numero) && numero >= min && numero <= max) {
            break; 
        }
        console.log(`Entrada inválida. Por favor, insira um número entre ${min} e ${max}.`);
    }
        return numero;
}
//Esta função garante que a entrada com esta validação receba apenas strings alfabeticas
function lerStringComValidacao(pergunta) {
    let entrada;
    while (true) {
        entrada = prompt(pergunta);
        if (/^[A-Za-z\s]+$/.test(entrada)) {
            break;
        }
        console.log("Entrada inválida. Por favor, insira um texto válido.");
    }
    return entrada;
    
}
// função para cadastrar o aluno
function cadastrarAlunos(){
   return lerStringComValidacao("Entre com o nome do Aluno: ");
}
//função para criar materia, com array de notas e numero de faltas a partir do 0.
function criarMaterias(nomeMateria) {
    return {
        nome: nomeMateria,
        notas: [],
        faltas: 0
    };
}
//função que adiciona a materia a nota do aluno, restringindo entre 0 e 10 as notas das materias
function notasPorMateria(materia) {
    for (let i = 0; i < 3; i++) {
        const nota = lerNumeroComValidacao(`Digite a nota ${i + 1} para ${materia.nome}(0 a 10): `, 0, 10);
        materia.notas.push(nota);
    }
}
//função que define o numero de faltas cometidas pelo aluno restringindo de 0 até 30 faltas
function faltasPorMateria(materia) {
    const faltas = lerNumeroComValidacao(`Informe quantidade de Faltas ${materia.nome}:(0 a 100) `, 0, 30);
    materia.faltas = faltas;
}

//função com as entradas das materias com a quantidade de materias que o usuario cadastrar respeitando o minimo de 3
function cadastrarMaterias() {
    const materias = [];
    const limiteMaterias = 3;
    console.log(`Você deve cadastrar o mínimo de ${limiteMaterias} matérias!`)

    //condição que entre com no mínimo 3 matéria
    while (materias.length<limiteMaterias) {
        const nomeMateria = lerStringComValidacao('Digite o nome da matéria: ');
        const novaMateria = criarMaterias(nomeMateria); 
        materias.push(novaMateria);
        if(materias.length<limiteMaterias){
            console.log(`\nFalta cadastrar mais ${limiteMaterias-materias.length} matérias`);
            const resposta = prompt('Gostaria de adicionar outra matéria? (s/n): ').toLowerCase();
            if (resposta === 's') {
                const nomeMateria = lerStringComValidacao('Digite o nome da matéria: ');
                const novaMateria = criarMaterias(nomeMateria); 
                materias.push(novaMateria);
            }else{
                console.log("Digite no mínimo 3 Matérias!!!");
            }
        }
    }
    return materias;
}
//função do calculo da média
function calcularMedia(notas) {
    let soma = 0;
    for (let i = 0; i < notas.length; i++) {
        soma += notas[i];
    }
    return soma / notas.length;
}
//função para verificar qual seu status "Aprovado", "Reprovado por Falta", ou "Reprovado"
function verificarAprovacao(materia) {
    const media = calcularMedia(materia.notas);
    const reprovadoPorFaltas = materia.faltas > 5;
    const aprovadoPorNota = media >= 6;


    if (reprovadoPorFaltas && aprovadoPorNota) {
        return {media: media, status: 'Reprovado por falta!'}
    }else if(media < 6) {
        return { media: media, status: 'Reprovado!'};
    }else{
        return { media: media, status: 'Aprovado!' };
    }
}
//função para mostrar o Resultado para o usuario
function exibirResultados(materias) {
    for (let i = 0; i < materias.length; i++) {
        let materia = materias[i];
        const resultado = verificarAprovacao(materia);

        console.log(`-----------------------`)
        console.log(`Matéria: ${materia.nome}`);
        console.log(`Média: ${resultado.media.toFixed(2)}`);
        console.log(`Situação: ${resultado.status}`);
        console.log('-----------------------');
    }
}

//modo de execução do programa
const nomeAluno = cadastrarAlunos(); 
const materias = cadastrarMaterias(); 

//cadastra notas e faltas por materia
for (let i = 0; i < materias.length; i++) {
        notasPorMateria(materias[i]);
        faltasPorMateria(materias[i]);
    }
    //mostra o resultado final com seu status
    console.log(`\nResultado do Aluno ${nomeAluno}:`);
    exibirResultados(materias);





