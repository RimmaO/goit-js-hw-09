// підключення та імпорт бібліотек
import Notiflix from 'notiflix';

// отриммуємо елементи
const formRef = document.querySelector('.form');
const delayRef = document.querySelector('[name="delay"]');
const stepRef = document.querySelector('[name="step"]');
const amountRef = document.querySelector('[name="amount"]');

formRef.addEventListener('click', onFormSubmit);

//function createPromise(position, delay) повинна повертати проміс, тобто return new Promise. Усередині промісу має бути setTimeout з часом delay
// Fulfill - проміс, який виконується
// Reject - проміс, який відхиляється
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

// запускаємо цикл (Лічильник починаємо з 1, цикл виконується поки i менше або дорівнює значенню з поля amount).І всередині циклу запускаємо функцію створення промісів
function onFormSubmit(event) {
  event.preventDefault();

  let delay = Number(delayRef.value);
  let step = Number(stepRef.value);
  let amount = Number(amountRef.value);

  for (let i = 0; i <= amount; i += 1) {
    let promiseDelay = delay + step * i;
    createPromise(i, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}
