const chronometer = document.querySelector('.chronometer');
const startButton = document.querySelector('.start-button');
const stopButton = document.querySelector('.stop-button');
const resetButton = document.querySelector('.reset-button');
const emailInput = document.getElementById('email');
const emailMessage = document.querySelector('.email-message');
const passwordInput = document.getElementById('password');
const submitButton = document.querySelector('.submit-button');
const instructions = document.querySelector('.instructions');
const instructionsButton = document.querySelector('.instructions-button');
const closeButton = document.querySelector('.close-button');


/*
functions Instructions/InstructionsButton
*/

function showInstructions() {
  instructions.style.display = 'block';
  instructionsButton.disabled = true;
}

function hideInstructions() {
  instructions.style.display = 'none';
  instructionsButton.disabled = false;
}

/*
functions chronometer, startButton, stopButton, resetButton
*/

let seconds = 0;
let minutes = 0;
let hours = 0;
let interval;
let firstTime = true;

function startChronometer() {
  if (firstTime === true) {
    firstTime = false;
    interval = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
      chronometer.innerHTML = `<span>${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2,
        '0')}:${seconds.toString().padStart(2, '0')}</span>`;
    }
      , 1000);
    startButton.disabled = true;
  }
}

function stopChronometer() {
  clearInterval(interval);
  passwordInput.disabled = true;
  startButton.disabled = true;
}

/*
functions validateEmail
*/

function validateEmail() {
  const email = emailInput.value;
  // const emailPattern = /^n[\d{6}.-]+@gruposantander.com$/; // n123456@gruposantander.com
  const emailPattern = /^[a-z]+\.[a-z]+@(servexternos\.)?pagonxt\.com$/ //user.user@pagonxt.com user.user@servexternos.pagonxt.com

  if (emailPattern.test(email)) {
    emailMessage.style.display = 'block';
    passwordInput.disabled = false;
    return true;
  } else {
    passwordInput.disabled = true;
    emailMessage.style.display = 'none';
    startButton.disabled = true;
    submitButton.disabled = true;
    return false;
  }
}

/*
validationsObject
*/

const cases = 2;
const length = 26
const validationsObject = {
  length: {
    message: "Tem pelo menos 26 caracteres",
    function: () => (passwordInput.value.length >= length) ?? false,
  },
  specialCharacter: {
    message: "Comece com caracteres especiais",
    function: () => {
      const specialCases = passwordInput.value.match(/^[^\w\d]{1,}/);
      return specialCases !== null && specialCases[0].length === cases;
    }
  },
  slogan: {
    message: "SloganDaCampanha do Dia do Profissional de TI",
    function: () => {
      const slogan = passwordInput.value.match('JuntosSomosMaisTech');
      return slogan !== null;
    },
  },
  specialCharacter2: {
    message: "Caractere usado para dinheiro",
    function: () => {
      const specialCases = passwordInput.value.match(/\$/);
      return specialCases !== null && specialCases.length === 1;
    }
  },
  oneBrandYear: {
    message: "Ano da OneBrand",
    function: () => {
      const ano = passwordInput.value.match(/2024$/);
      return ano !== null;
    }
  }
};

function validatePassword() {
  const restrictionsSection = document.querySelector('.validations');
  restrictionsSection.innerHTML = '';

  // chaves na ordem das validações de senha.
  const validationOrder = [
    'specialCharacter',
    'slogan',
    'specialCharacter2',
    'oneBrandYear',
    'length'
  ];
  
  // Verificar cada restrição em ordem
  let completedValidations = 0; // Contador de validações completadas
  
  // Vai percorrer validationOrder buscando em ValidationsObject a função de mesmo nome.
  for (const restriction of validationOrder) {
    const isValid = validationsObject[restriction].function();

    if (isValid) {
      completedValidations++;

      // Cria e exibe a mensagem de dica para validações completadas
      let validationElement = document.createElement('span');
      validationElement.classList.add('validation');
      validationElement.innerHTML = `<span class="check">✔</span> ${validationsObject[restriction].message}`;
      restrictionsSection.appendChild(validationElement);
    } else {
      // Exibe a próxima dica a ser verificada
      let nextValidationMessage = validationsObject[restriction].message;
      let nextValidtionElement = document.createElement('span');
      nextValidtionElement.classList.add('validation');
      nextValidtionElement.innerHTML = `<span class="check">❌</span> ${nextValidationMessage}`; // Exibindo como não atendida
      restrictionsSection.appendChild(nextValidtionElement);
      break; // Sai do loop após exibir a próxima dica não atendida.
    }
  }

  // Se todas as validações forem atendidas, habilita submitButton
  if (completedValidations === validationOrder.length && validateEmail()) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }

} // fim validatePassword


function submitPassword() {
  let time = chronometer.innerText;
  let email = emailInput.value.toString();
  let password = passwordInput.value;
  console.log(time);
  console.log(email);
  console.log(password);
  stopChronometer();
  startButton.disabled = true;
  emailInput.disabled = true;
  passwordInput.disabled = true;
  submitButton.disabled = true;
  // resetButton.disabled = true;
}

/*
eventListeners
*/

emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);
submitButton.addEventListener('click', submitPassword);
closeButton.addEventListener('click', hideInstructions);
instructionsButton.addEventListener('click', showInstructions);