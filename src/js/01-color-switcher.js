// отриммуємо елементи
const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const body = document.body;

let timerId = null;

buttonStart.addEventListener('click', onStartChangeColor);
buttonStop.addEventListener('click', onStopChangeColor);

//  Після натискання кнопки «Start», раз на секунду змінює колір фону <body> на випадкове значення, використовуючи інлайн стиль. на кнопку «Start» можна натиснути нескінченну кількість разів. тому, щоб доки зміна теми запущена, кнопка «Start» була неактивною ставимо атрибут disabled.і відповідно кнопку «Stop» активуєм.
function onStartChangeColor() {
  buttonStart.setAttribute('disabled', true);
  buttonStop.removeAttribute('disabled');

  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
// Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.
function onStopChangeColor() {
  buttonStart.removeAttribute('disabled');
  buttonStop.setAttribute('disabled', true);

  clearInterval(timerId);
}

// Для генерування випадкового кольору використовуй функцію getRandomHexColor.
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
