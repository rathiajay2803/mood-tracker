const emojiMoodForm = document.querySelector('.mood-form');
const emojisMoodContainer = emojiMoodForm.querySelector(
  '.mood-emojis-container'
);

// Class to handle form interactions
class EmojiFormHandler {
  constructor(calenderObj, userMoodObj) {
    this.calenderObj = calenderObj;
    this.userMoodObj = userMoodObj;
  }

  // Reset the selected emoji radio button
  resetRadioInput() {
    emojisMoodContainer
      .querySelectorAll('input[type="radio"]')
      .forEach((emoji) => {
        if (emoji.checked) {
          emoji.checked = false;
        }
      });
  }

  // Reset the selected emoji label styling
  resetLabels() {
    emojisMoodContainer.querySelectorAll('label').forEach((emojiLabel) => {
      if (emojiLabel.classList.contains('selected')) {
        emojiLabel.classList.remove('selected');
      }
    });
  }

  // Completely reset the mood form inputs and UI selection
  resetForm() {
    emojiMoodForm.querySelector('#moodDate').value = '';
    this.resetLabels();
    this.resetRadioInput();
  }

  // Handles emoji selection when clicked
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

  // Handles form submission (saving mood data)
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

    this.calenderObj.displayCalender(selectedmonth, selectedyear);
    this.resetForm();
  }
}

export default EmojiFormHandler;
