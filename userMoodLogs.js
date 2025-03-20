class UserMoodLogs {
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

  fetchUserMoodLogs() {
    const storedData = localStorage.getItem('userlogs');

    if (!storedData) {
      this.#userlogs = this.#initialData;
      localStorage.setItem('userlogs', JSON.stringify(this.#userlogs));
    } else {
      this.#userlogs = JSON.parse(storedData);
    }
  }

  getselectedMonthUserLogs(month, year) {
    const userLogsforMentionedyear = this.#userlogs.filter(
      (logs) => logs.year == year
    );

    return userLogsforMentionedyear.length === 0 ||
      !userLogsforMentionedyear[0]['months'][month]
      ? []
      : userLogsforMentionedyear[0]['months'][month];
  }

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
