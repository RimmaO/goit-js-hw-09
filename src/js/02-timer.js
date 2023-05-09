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
  },
};

flatpickr(dateTimePickerRef, options);

// Вибір дати
function dateChecking(selectedDates) {
  const selectedDate = selectedDates[0].getTime(); //ms
  const currentDate = new Date().getTime(); //ms
  if (selectedDate < currentDate) {
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
  if (
    !daysRef.textContent &&
    !hoursRef.textContent &&
    !minutesRef.textContent &&
    !secondsRef.textContent
  ) {
    Notiflix.Notify.success('Timer stopped');
  }
}

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
  return value.padStart(2, '0');
}
