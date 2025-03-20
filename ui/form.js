const emojiMoodForm = document.querySelector('.mood-form');
const emojisMoodContainer = emojiMoodForm.querySelector(
  '.mood-emojis-container'
);

let userMoodLogs = [
  {
    year: 2025,
    months: {
      March: {
        0: 'excited',
        1: 'happy',
        2: 'happy',
        3: 'sad',
        4: 'neutral',
        6: 'neutral',
        7: 'sad',
        8: 'happy',
      },
    },
  },
];

class EmojiFormHandler {
  constructor(calenderObj, userMoodObj) {
    this.calenderObj = calenderObj;
    this.userMoodObj = userMoodObj;
  }

  resetRadioInput() {
    emojisMoodContainer
      .querySelectorAll('input[type="radio"]')
      .forEach((emoji) => {
        if (emoji.checked) {
          emoji.checked = false;
        }
      });
  }

  resetLabels() {
    emojisMoodContainer.querySelectorAll('label').forEach((emojiLabel) => {
      if (emojiLabel.classList.contains('selected')) {
        emojiLabel.classList.remove('selected');
      }
    });
  }

  resetForm() {
    emojiMoodForm.querySelector('#moodDate').value = '';
    this.resetLabels();
    this.resetRadioInput();
  }
  selectEmoji(e) {
    e.preventDefault();

    const emojiWrapper = e.target.closest('.emoji-wrapper');

    if (!emojiWrapper) return;

    const radioInput = emojiWrapper.querySelector('input[type="radio"]');

    if (radioInput) {
      this.resetRadioInput();

      radioInput.checked = true;
    }

    const emojiLabel = emojiWrapper.querySelector('label');
    this.resetLabels();

    emojiLabel.classList.toggle('selected');
  }

  submitEmojiForm(e) {
    e.preventDefault();
    let selectedFormDate = emojiMoodForm.querySelector('#moodDate').value;
    const selectedEmoji = emojiMoodForm.querySelector(
      'input[name="todays-mood"]:checked'
    )?.value;

    if (!selectedFormDate || !selectedEmoji) {
      alert('Please enter date as well as select mood');
      return;
    }

    const temp = selectedFormDate.split('-');
    const selectedyear = Number(temp[0]);
    const selectedmonth = Number(temp[1] - 1);
    const selectedDate = Number(temp[2]);
    const today = new Date();

    if (
      selectedyear === today.getFullYear() &&
      selectedmonth === today.getMonth() &&
      selectedDate > today.getDate()
    ) {
      alert('Can not enter moods for future dates');
      this.resetForm();
      return;
    }

    this.userMoodObj.updateUserMoodLogs(
      selectedyear,
      selectedmonth,
      selectedDate,
      selectedEmoji
    );

    console.log(this.userMoodObj);
    // const monthsLogs = this.userMoodObj.getselectedMonthUserLogs(
    //   selectedmonth,
    //   selectedyear
    // );
    // console.log(monthsLogs);
    this.calenderObj.displayCalender(selectedmonth, selectedyear);
    this.resetForm();
  }
}

export default EmojiFormHandler;
