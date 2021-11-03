const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};

// Класс ColorSwitcher, мне просто надо было вспомнить что такое классы :)))
class ColorSwitcher {
  constructor({ refs, color }) {
    const { body, btnStart, btnStop } = refs;

    this.body = body;
    this.btnStart = btnStart;
    this.btnStop = btnStop;
    this.intervalId = null;
    this.btnStart.disabled = false;
    this.btnStop.disabled = false;
    this.color = color;
  }

  start() {
    if (this.btnStop.disabled) {
      this.btnStop.disabled = false;
    }

    this.btnStart.disabled = true;
    this.body.style.backgroundColor = this.color();

    this.intervalId = setInterval(() => {
      this.body.style.backgroundColor = this.color();
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.btnStop.disabled = true;
    this.btnStart.disabled = false;
  }
}

// создание экземпляра класса
const colorSwitcher = new ColorSwitcher({
  refs,
  color: getRandomHexColor,
});

// Слушатели на кнопках
refs.btnStart.addEventListener('click', colorSwitcher.start.bind(colorSwitcher));
refs.btnStop.addEventListener('click', colorSwitcher.stop.bind(colorSwitcher));

// Вспомогательная функция для рандомной смены цвета
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
