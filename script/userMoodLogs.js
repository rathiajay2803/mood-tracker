// userMoodLogs.js - Handles storing and retrieving mood logs
class UserMoodLogs {
  // Initial default data structure
  #initialData = [
    {
      year: 2025,
      months: {
        2: {
          0: 'excited',
          1: 'happy',
          2: 'happy',
          3: 'sad',
          4: 'neutral',
          6: 'excited',
          7: 'sad',
          8: 'happy',
        },
      },
    },
  ];

  // Stores user mood logs in memory
  #userlogs = [
    {
      year: 2025,
      months: {
        2: {
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

  constructor() {}

  // Fetches mood logs from localStorage or initializes with default data
  fetchUserMoodLogs() {
    const storedData = localStorage.getItem('userlogs');

    if (!storedData) {
      this.#userlogs = this.#initialData;
      localStorage.setItem('userlogs', JSON.stringify(this.#userlogs));
    } else {
      this.#userlogs = JSON.parse(storedData);
    }
  }

  // Retrieves user logs for a given month and year
  getselectedMonthUserLogs(month, year) {
    const userLogsforMentionedyear = this.#userlogs.filter(
      (logs) => logs.year == year
    );

    return userLogsforMentionedyear.length === 0 ||
      !userLogsforMentionedyear[0]['months'][month]
      ? []
      : userLogsforMentionedyear[0]['months'][month];
  }

  // Updates mood logs and saves to localStorage
  updateUserMoodLogs(year, month, date, emojiName) {
    const userLogsforMentionedyear = this.#userlogs.filter(
      (logs) => logs.year == year
    );

    if (userLogsforMentionedyear.length == 0) {
      this.#userlogs.push({
        year: year,
        months: {
          [month]: {
            [date]: emojiName,
          },
        },
      });

      localStorage.setItem('userlogs', JSON.stringify(this.#userlogs));
      return;
    }

    if (userLogsforMentionedyear[0]['months'][month] === undefined) {
      userLogsforMentionedyear[0]['months'][month] = {
        [date]: emojiName,
      };
    } else {
      userLogsforMentionedyear[0]['months'][month][date] = emojiName;
    }
    localStorage.setItem('userlogs', JSON.stringify(this.#userlogs));
  }
}

export default UserMoodLogs;
