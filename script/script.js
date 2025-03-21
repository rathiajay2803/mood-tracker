import CalenderUIHandler from '../ui/calender.js';
import EmojiFormHandler from '../ui/form.js';
import eventListenerHandler from './eventListener.js';
import UserMoodLogs from './userMoodLogs.js';

// Main function to initialize the application
function init(e) {
  const userMoodObj = new UserMoodLogs();
  const calendarObj = new CalenderUIHandler(userMoodObj);
  const emojiObj = new EmojiFormHandler(calendarObj, userMoodObj);
  const eventListenerObj = new eventListenerHandler(calendarObj, emojiObj);

  userMoodObj.fetchUserMoodLogs(); // Load stored mood logs

  calendarObj.init(); // Render calenda
  eventListenerObj.applyFormEventListener(); // Activate form listeners
  eventListenerObj.applyCalenderEventListner(); // Activate calendar listeners
}

document.addEventListener('DOMContentLoaded', init);
