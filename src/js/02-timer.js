import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEAD_LINE = 1000;

const refs = {
  checkDate: document.querySelector('input[type="text"]'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  selectedDate: null,
  intervalID: null,
};

// блокируем кнопку при загрузке страницы
refs.startBtn.disabled = true;

// объект настроек для календаря
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
      refs.selectedDate = selectedDates[0].getTime();
    }
  },
};

const calendar = flatpickr(refs.checkDate, options);

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  refs.startBtn.disabled = true;
  refs.checkDate.disabled = true;
  getTimerTime();
  refs.intervalID = setInterval(getTimerTime, 1000);
}

// получение разницы времени
function getTimerTime() {
  const targetTime = refs.selectedDate;
  const currentTime = Date.now();
  const deltaTime = targetTime - currentTime;
  const timeOptions = convertMs(deltaTime);

  if (deltaTime < DEAD_LINE) {
    clearInterval(refs.intervalID);
  }
  updateTimerInterface(timeOptions);
}

// Вывод в интерфейс чисел
function updateTimerInterface({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

// Функция, добавляющая '0'
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
// Конвертируем время
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
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
