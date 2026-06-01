const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}, 3000);

const btnNo = document.getElementById('btn-no');

function moveButton() {
    const padding = 20;
    const maxX = window.innerWidth - btnNo.offsetWidth - padding;
    const maxY = window.innerHeight - btnNo.offsetHeight - padding;
    
    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));
    
    btnNo.style.position = 'fixed';
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
    btnNo.style.bottom = 'auto';
    btnNo.style.transform = 'none';
}

btnNo.addEventListener('mouseenter', moveButton);
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});

const btnYes = document.getElementById('btn-yes');
const quizScreen = document.getElementById('quiz-screen');
const mainScreen = document.getElementById('main-screen');
const music = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');

btnYes.addEventListener('click', () => {
    quizScreen.classList.remove('active');
    mainScreen.classList.add('active');
    startHearts();
    
    music.play().then(() => {
        musicToggle.textContent = "⏸ Остановить музыку";
    }).catch(() => {
        console.log("Ожидание клика для музыки");
    });
});

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
    
    if(tabId === 'test-menu') {
        initQuiz();
    }
}

const quizData = [
    {
        question: "Какое моё самое любимое хобби на свете?",
        options: ["Играть в КС ау🎮", "Проводить время с тобой ❤️", "Пить (", "Работать 💻"],
        correct: 1
    },
    {
        question: "Какое качество я ценю в тебе больше всего?",
        options: ["Твою доброту 🌸", "Твой чудесный характер 🦊", "Всё и сразу, ты идеальна! ✨", "Как ты смеешься 💖"],
        correct: 2
    },
    {
        question: "Где бы я хотел оказаться прямо сейчас?",
        options: ["На море 🌊", "С друзьями ", "В ПК клубе", "В постельке 😴 с тобой)"],
        correct: 3
    }
];

let currentQuestionIndex = 0;

function initQuiz() {
    currentQuestionIndex = 0;
    document.getElementById('test-container').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('love-bar').style.width = '0%';
    showQuestion();
}

function showQuestion() {
    const progressText = document.getElementById('quiz-progress');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    
    progressText.innerText = `Вопрос ${currentQuestionIndex + 1} из ${quizData.length}`;
    
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    
    optionsContainer.innerHTML = '';
    
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const currentQuestion = quizData[currentQuestionIndex];
    
    if (selectedIndex === currentQuestion.correct) {
        alert("Правильно! Ты умничка моя 🥰");
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizData.length) {
            showQuestion();
        } else {
            showResult();
        }
    } else {
        alert("Хмм, не угадала! 😜 Попробуй еще раз, ты точно знаешь правильный ответ!");
    }
}

function showResult() {
    document.getElementById('test-container').style.display = 'none';
    document.getElementById('quiz-progress').innerText = "Тест успешно пройден!";
    
    const resultBox = document.getElementById('quiz-result');
    const loveBar = document.getElementById('love-bar');
    
    resultBox.style.display = 'block';
    setTimeout(() => { loveBar.style.width = '100%'; }, 100);
}

function startHearts() {
    const container = document.getElementById('hearts');
    const heartTypes = ['❤️', '💖', '💗', '💕', '❣'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        
        heart.style.left = Math.random() * 100 + 'vw';
        
        const duration = Math.random() * 2.5 + 1.5;
        heart.style.animationDuration = duration + 's';
        
        heart.style.fontSize = (Math.random() * 16 + 12) + 'px';
        
        const swayX = (Math.random() * 80 - 40) + 'px';
        const rotation = (Math.random() * 360 - 180) + 'deg';
        heart.style.setProperty('--sway-x', swayX);
        heart.style.setProperty('--rotation', rotation);
        
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }, 80);
}

musicToggle.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        musicToggle.textContent = "⏸ Остановить музыку";
    } else {
        music.pause();
        musicToggle.textContent = "🎵 Включить музыку";
    }
});
