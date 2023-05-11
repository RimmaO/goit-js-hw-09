// підключення та імпорт бібліотек
import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
// додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// отримуємо елементи
const dateTimePickerRef = document.getElementById('datetime-picker');
const startBtnRef = document.querySelector('[data-start]');

const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

let timerId = null;

startBtnRef.addEventListener('click', onBtnStart);

// Бібліотека flatpickr(selector, options) та Бібліотека повідомлень Notiflix
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    dateChecking(selectedDates[0]);
  },
};

flatpickr(dateTimePickerRef, options);

// Вибір дати
function dateChecking(selectedDates) {
  const currentDate = new Date(); //ms
  console.log(currentDate);
  if (selectedDates < currentDate) {
    startBtnRef.setAttribute('disabled', true);
    return Notiflix.Notify.failure('Please choose a date in the future');
  }
  startBtnRef.removeAttribute('disabled');
}

// Відлік часу
function onBtnStart() {
  timerId = setInterval(timerStart, 1000);
}

function timerStart() {
  startBtnRef.setAttribute('disabled', true);
  dateTimePickerRef.setAttribute('disabled', true);

  const startTime = new Date();
  const targetTime = new Date(dateTimePickerRef.value);
  const differenceTime = targetTime - startTime;
  const time = convertMs(differenceTime);
  createMarkup(time);

  if (differenceTime <= 1000) {
    clearInterval(timerId);
    startBtnRef.removeAttribute('disabled');
    dateTimePickerRef.removeAttribute('disabled');
    Notiflix.Notify.success('Timer stopped');
  }
}
// функція, яка встановлює textContent днів годин хвилин секунд на сторінку
function createMarkup({ days, hours, minutes, seconds }) {
  daysRef.textContent = days;
  hoursRef.textContent = hours;
  minutesRef.textContent = minutes;
  secondsRef.textContent = seconds;
}
// Для підрахунку значень - функція convertMs, де ms - різниця між кінцевою і поточною датою в мілісекундах.
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
// Форматування часу
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// -----examples----
// const date = new Date();
// const date1 = Date.now();

// console.log('Date: ', date); //Date:  Thu May 11 2023 12:43:44 GMT+0300 (Восточная Европа, летнее время)
// console.log('Date: ', date1); //Date:  1683798237850 //ms
