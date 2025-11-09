let score = 0;
let time = 60;
let currentQuestion;
let timerInterval = null;

function generateQuestion() {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;

    // Randomly choose an operation: +, -, *, /
    const operations = ['+', '-', '*', '/'];
    const op = operations[Math.floor(Math.random() * operations.length)];

    let answer;
    let questionText;

    switch(op) {
        case '+':
            answer = a + b;
            questionText = `${a} + ${b} = ?`;
            break;
        case '-':
            answer = a - b;
            questionText = `${a} - ${b} = ?`;
            break;
        case '*':
            answer = a * b;
            questionText = `${a} × ${b} = ?`;
            break;
        case '/':
            // Ensure division is integer
            const num = a * b; // make it divisible by b
            answer = num / b;
            questionText = `${num} ÷ ${b} = ?`;
            break;
    }

    currentQuestion = { a, b, op, answer };
    document.getElementById('question').innerText = questionText;
}

function checkAnswer() {
    const userAnswer = Number(document.getElementById('answer').value);
    if(userAnswer === currentQuestion.answer){
        score++;
    }
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('answer').value = '';
    generateQuestion();
}

function startGame() {
    score = 0;
    time = 60;
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('timer').innerText = `Time: ${time}`;
    document.getElementById('answer').disabled = false;
    generateQuestion();

    if(timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        time--;
        document.getElementById('timer').innerText = `Time: ${time}`;
        if(time <= 0){
            clearInterval(timerInterval);
            document.getElementById('question').innerText = "Time's up!";
            document.getElementById('answer').disabled = true;
            alert(`Time's up! Your final score: ${score}`);
        }
    }, 1000);
}

// Event listeners
document.getElementById('submitBtn').addEventListener('click', checkAnswer);
document.getElementById('startBtn').addEventListener('click', startGame);

// Allow Enter key to submit answer
document.getElementById('answer').addEventListener('keypress', function(e){
    if(e.key === 'Enter') checkAnswer();
});
