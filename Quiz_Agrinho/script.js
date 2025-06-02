const fullQuestionPool = [
  {
    question: "O que é o Agrinho 2025?",
    options: [
      "Um programa de educação ambiental para crianças",
      "Uma feira de agricultura tecnológica",
      "Um evento de esportes rurais",
      "Uma campanha de vacinação para animais"
    ],
    answer: 0
  },
  {
    question: "Qual o principal foco do Agrinho 2025?",
    options: [
      "Tecnologia agrícola avançada",
      "Conscientização sobre sustentabilidade e meio ambiente",
      "Comercialização de produtos rurais",
      "Promoção de esportes rurais"
    ],
    answer: 1
  },
  {
    question: "Quem pode participar do Agrinho 2025?",
    options: [
      "Somente agricultores profissionais",
      "Estudantes do ensino fundamental e médio",
      "Somente professores",
      "Agricultores e veterinários"
    ],
    answer: 1
  },
  {
    question: "Qual a importância do Agrinho para a comunidade?",
    options: [
      "Promove o desenvolvimento da indústria",
      "Fomenta o consumo de alimentos industrializados",
      "Estimula a responsabilidade ambiental e cidadania nas crianças",
      "Foca exclusivamente em produção animal"
    ],
    answer: 2
  },
  {
    question: "Qual das ações abaixo é relacionada ao Agrinho 2025?",
    options: [
      "Plantio de árvores e educação ambiental nas escolas",
      "Competições de tratores",
      "Venda de produtos agrícolas em feiras livres",
      "Eventos de música sertaneja"
    ],
    answer: 0
  },
  {
    question: "Qual instituição organiza o programa Agrinho?",
    options: [
      "Secretaria de Agricultura",
      "Sociedade Rural Brasileira",
      "Sistema Faemg (Federação da Agricultura e Pecuária de Minas Gerais)",
      "Ministério da Educação"
    ],
    answer: 2
  },
  {
    question: "Qual benefício o Agrinho traz para as escolas?",
    options: [
      "Distribuição de equipamentos agrícolas",
      "Estimula práticas sustentáveis e educação ambiental",
      "Redução do horário escolar",
      "Cursos de agricultura para professores"
    ],
    answer: 1
  },
  {
    question: "Em que área o Agrinho incentiva trabalhos escolares?",
    options: [
      "Ciências ambientais e cidadania",
      "Matemática avançada",
      "Tecnologia da informação",
      "História do Brasil Colonial"
    ],
    answer: 0
  },
  {
    question: "Agrinho promove entre os estudantes:",
    options: [
      "Consumo de alimentos industrializados",
      "Conscientização sobre agricultura sustentável",
      "Apenas esportes rurais",
      "Festas típicas"
    ],
    answer: 1
  },
  {
    question: "Como o Agrinho contribui para o futuro dos jovens?",
    options: [
      "Incentiva o consumo de agrotóxicos",
      "Desenvolve valores de responsabilidade e preservação ambiental",
      "Foca só na produção animal",
      "Promove apenas atividades culturais"
    ],
    answer: 1
  }
];

// Helper: Shuffle array
function shuffleArray(array) {
  const newArray = array.slice();
  for (let i = newArray.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Select 5 random questions without repetition from pool
function selectRandomQuestions(pool, count) {
  const shuffledPool = shuffleArray(pool);
  return shuffledPool.slice(0, count);
}

let quizData = [];
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const scoreSection = document.getElementById('score-section');
const questionContainer = document.getElementById('question-container');

let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

function initializeQuiz() {
  quizData = selectRandomQuestions(fullQuestionPool, 5);
  currentQuestionIndex = 0;
  score = 0;
  selectedOption = null;
  scoreSection.style.display = 'none';
  questionContainer.style.display = 'block';
  nextBtn.textContent = 'Próxima';
  loadQuestion();
  nextBtn.style.display = 'inline-block';
  const restartBtn = document.getElementById('restart-btn');
  if (restartBtn) {
    restartBtn.remove();
  }
}

function loadQuestion() {
  nextBtn.disabled = true;
  selectedOption = null;
  optionsEl.innerHTML = '';
  const currentQ = quizData[currentQuestionIndex];
  questionEl.textContent = currentQ.question;
  currentQ.options.forEach((optionText, index) => {
    const optionDiv = document.createElement('div');
    optionDiv.classList.add('option');
    optionDiv.textContent = optionText;
    optionDiv.dataset.index = index;
    optionDiv.addEventListener('click', () => {
      selectOption(optionDiv);
    });
    optionsEl.appendChild(optionDiv);
  });
  if (currentQuestionIndex === quizData.length - 1) {
    nextBtn.textContent = 'Finalizar';
  } else {
    nextBtn.textContent = 'Próxima';
  }
}

function selectOption(optionDiv) {
  if(selectedOption) {
    selectedOption.classList.remove('selected');
  }
  optionDiv.classList.add('selected');
  selectedOption = optionDiv;
  nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
  if(selectedOption === null) return;
  const answerIndex = parseInt(selectedOption.dataset.index);
  if(answerIndex === quizData[currentQuestionIndex].answer) {
    score++;
  }
  currentQuestionIndex++;
  if(currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  questionContainer.style.display = 'none';
  scoreSection.style.display = 'block';
  scoreSection.textContent = `Você acertou ${score} de ${quizData.length} perguntas!`;
  nextBtn.style.display = 'none';

  const restartBtn = document.createElement('button');
  restartBtn.id = 'restart-btn';
  restartBtn.className = 'button';
  restartBtn.textContent = 'Reiniciar Quiz';
  restartBtn.addEventListener('click', () => {
    initializeQuiz();
  });

  scoreSection.appendChild(document.createElement('br'));
  scoreSection.appendChild(document.createElement('br'));
  scoreSection.appendChild(restartBtn);
}

initializeQuiz();

