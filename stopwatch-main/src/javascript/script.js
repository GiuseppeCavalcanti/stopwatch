// Seleção de Elementos HTML:
const TimerEl = document.getElementById('timer')
const MarksList = document.getElementById('marks-list')
//Variáveis Globais:
let intervaloId = 0; // Armazena o identificador do intervalo
let timer = 0; // Contador do tempo em milissegundos
let marks = []; // Array que armazena os tempos das marcas


/*Esta função recebe o tempo em milissegundos e o formata para o formato HH:MM:SS:HH */
const formatTime = (time) => {
    const hours = Math.floor(time / 360000)
    const minutes = Math.floor((time % 360000) / 6000)
    const seconds = Math.floor((time % 6000) / 100)
    const hundredths = time % 100;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${hundredths.toString().padStart(2, '0')}`
}
/*Atualiza o conteúdo HTML do elemento TimerEl com o tempo formatado, exibindo-o na tela.*/
const setTimer = (time) => {
    TimerEl.innerHTML = formatTime(time)

}

// Função responsável por alternar o estado do temporizador (iniciar/pausar)
const toggleTimer = () => {
    const button = document.getElementById('power')
    const action = button.getAttribute('action')

    clearInterval(intervaloId)
    // Inicia ou pausa o temporizador dependendo do estado atual
    if (action == 'start' || action == 'continue') {
        intervaloId = setInterval(() => {
            timer += 1
            setTimer(timer)
        }, 10)
        button.setAttribute('action', 'pause')
        button.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else if (action == 'pause') {
        button.setAttribute('action', 'continue')
        button.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}
//Function marcador
const addMarkToList = (markIndex, markTime) => {
    MarksList.innerHTML += `<p> Marca: ${markIndex}: ${formatTime(markTime)}</p>`
}


const markTime = () => {
    const button = document.getElementById('power');
    const action = button.getAttribute('action');

    // Validação: verifica se o timer é maior que 0 E se o cronômetro está em execução ('pause')
    if (timer > 0 && action === 'pause') {

        marks.push(timer);
        addMarkToList(marks.length, timer);
    } else if (timer === 0) {
        alert("O cronômetro precisa ser iniciado para marcar um tempo."); // Feedback para o usuário
    } else{
        alert("O cronômetro precisa estar em execução para marcar um tempo.");
    }
};
//Function resetar
const resetTimer = () => {
    clearInterval(intervaloId)
    timer = 0
    marks = []
    setTimer(timer)
    MarksList.innerHTML = ''
    const button = document.getElementById('power')
    button.setAttribute('action', 'start')
    button.innerHTML = '<i class="fa-solid fa-play"></i>';

}


// Controla iniciar/pausar
document.getElementById('power').addEventListener('click', toggleTimer)
// Marca o tempo atual
document.getElementById('mark').addEventListener('click', markTime)
// Reseta o temporizador
document.getElementById('reset').addEventListener('click', resetTimer)


//Ferramentas de documentação podem usar esses comentários para gerar documentação automática.