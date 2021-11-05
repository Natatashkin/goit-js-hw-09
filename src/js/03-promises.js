import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  let {
    elements: { delay, step, amount },
  } = e.currentTarget;

  delay = Number(delay.value);
  step = Number(step.value);
  amount = Number(amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay).then({ position, delay }).catch({ position, delay });
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      setTimeout(() => {
        resolve(
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, { useIcon: false }),
        );
      }, delay);
    } else {
      setTimeout(() => {
        reject(Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, { useIcon: false }));
      }, delay);
    }
  });
}
