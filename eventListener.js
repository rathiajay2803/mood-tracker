// import EmojiFormHandler from './ui/form.js';

const emojiMoodForm = document.querySelector('.mood-form');
const emojisMoodContainer = emojiMoodForm.querySelector(
  '.mood-emojis-container'
);

const calenderContainer = document.querySelector('.calender-container');

class eventListenerHandler {
  constructor(calenderObj, emojiObj) {
    this.calenderObj = calenderObj;
    this.emojiObj = emojiObj;
  }

  applyFormEventListener() {
    emojisMoodContainer.addEventListener(
      'click',
      this.emojiObj.selectEmoji.bind(this.emojiObj)
    );
    emojiMoodForm.addEventListener(
      'submit',
      this.emojiObj.submitEmojiForm.bind(this.emojiObj)
    );
  }

  applyCalenderEventListner() {
    const yearElement = calenderContainer.querySelector('#years');
    const monthElement = calenderContainer.querySelector('#months');
    const prev = calenderContainer.querySelector('.prev-month');
    const next = calenderContainer.querySelector('.next-month');

    yearElement.addEventListener('change', (e) => {
      this.calenderObj.displayCalender(monthElement.value, e.target.value);
    });

    monthElement.addEventListener('input', (e) => {
      this.calenderObj.displayCalender(e.target.value, yearElement.value);
    });

    prev.addEventListener('click', (e) => {
      this.calenderObj.previousMonth();
    });

    next.addEventListener('click', (e) => {
      this.calenderObj.nextMonth();
    });
  }
}

export default eventListenerHandler;
