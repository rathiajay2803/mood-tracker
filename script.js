import CalenderUIHandler from './ui/calender.js';
import EmojiFormHandler from './ui/form.js';
import eventListenerHandler from './eventListener.js';
import UserMoodLogs from './userMoodLogs.js';

function init(e) {
  const userMoodObj = new UserMoodLogs();
  const calenerObj = new CalenderUIHandler(userMoodObj);
  const emojiObj = new EmojiFormHandler(calenerObj, userMoodObj);
  const eventListenerObj = new eventListenerHandler(calenerObj, emojiObj);

  userMoodObj.fetchUserMoodLogs();

  calenerObj.init();
  // calenerObj.displayWeekdays();
  // calenerObj.displayCalender(2, 2025);

  eventListenerObj.applyFormEventListener();
  eventListenerObj.applyCalenderEventListner();
}

document.addEventListener('DOMContentLoaded', init);
