const calenderContainer = document.querySelector('.calender-container');
const calenderHeader = calenderContainer.querySelector('.calender-header');
const calenderBody = calenderContainer.querySelector('.calender-body');

class Calender {
  #months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  #days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  #daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  constructor() {}

  get getWeekday() {
    return this.#days;
  }

  getMonthsTotalDays(month, year) {
    if (month === 'February') {
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
    }
    return this.#daysInMonths[month];
  }

  getMonth(month) {
    return this.#months[month];
  }
}

class CalenderUIHandler {
  #totalColumns = 7;
  #totalRows = 6;
  #monthStartDate = -1;
  constructor(userMoodObj) {
    this.constructorObj = new Calender();
    this.userMoodObj = userMoodObj;

    this.today = new Date();
    this.currentDate = this.today.getDate();
    this.currentDay = this.today.getDay();
    this.currentYear = this.today.getFullYear();
    this.currentMonth = this.today.getMonth();
  }

  previousMonth() {
    this.currentYear =
      this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
    this.currentMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
    this.displayCalender(this.currentMonth, this.currentYear);
  }

  nextMonth() {
    this.currentYear =
      this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;
    this.currentMonth = (this.currentMonth + 1) % 12;
    this.displayCalender(this.currentMonth, this.currentYear);
  }

  getUserMood(mood) {
    switch (mood) {
      case 'excited':
        return '<div class="mood-icon excited selected resize-icon"></div>';

      case 'happy':
        return '<div class="mood-icon happy selected resize-icon"></div>';

      case 'neutral':
        return '<div class="mood-icon neutral selected resize-icon"></div>';

      case 'sad':
        return '<div class="mood-icon sad selected resize-icon"></div>';
    }
  }

  displayWeekdays() {
    let calenderWeekdays = calenderBody.querySelector('.calender-weekdays');
    let weekdays = this.constructorObj.getWeekday;

    for (let weekday of weekdays) {
      const div = document.createElement('div');
      div.classList.add('weekday');
      div.innerText = weekday;
      calenderWeekdays.appendChild(div);
    }
  }

  displayCalenderFooter(month, year) {
    const yearsElement = calenderContainer.querySelector('#years');
    const monthElement = calenderContainer.querySelector('#months');

    for (
      let startYear = 2000;
      startYear <= this.today.getFullYear();
      startYear++
    ) {
      const option = document.createElement('option');
      option.value = startYear;
      option.innerText = startYear;
      yearsElement.appendChild(option);
    }

    yearsElement.value = !year ? this.today.getFullYear() : year;

    monthElement.value = !month ? this.today.getMonth() : month;
  }

  displayCalender(month, year) {
    const calenderDaysELement = calenderBody.querySelector('.calender-days');
    const currentMonth = calenderHeader.querySelector('.current-month');

    calenderDaysELement.innerHTML = '';
    currentMonth.innerHTML = `${this.constructorObj.getMonth(month)} ${year}`;

    const monthTotaldays = this.constructorObj.getMonthsTotalDays(month, year);
    const monthsLogs = this.userMoodObj.getselectedMonthUserLogs(month, year);

    this.#monthStartDate = new Date(year, month, 1);
    this.currentDate = this.#monthStartDate.getDate();
    this.currentDay = this.#monthStartDate.getDay();
    this.currentYear = year;
    this.currentMonth = month;
    let day = 1;
    let passedTodayDate = false;

    for (let row = 0; row < this.#totalRows; row++) {
      for (let col = 0; col < this.#totalColumns; col++) {
        const div = document.createElement('div');
        div.classList.add('days');

        if (row === 0 && col < this.currentDay) {
          const text = document.createTextNode('');
          div.appendChild(text);
        } else {
          if (day <= monthTotaldays) {
            div.innerHTML = `
            <div>${day.toString().trim().padStart(2, '0')}</div>
            ${
              !passedTodayDate
                ? `<div class="faces">${
                    monthsLogs[day] !== undefined
                      ? this.getUserMood(monthsLogs[day])
                      : ''
                  }</div>`
                : ''
            }`;

            if (
              day == this.today.getDate() &&
              this.currentMonth == this.today.getMonth() &&
              this.currentYear == this.today.getFullYear()
            ) {
              div.classList.add('todays-date');
              passedTodayDate = true;
            }
            day++;
          } else {
            break;
          }
        }
        calenderDaysELement.appendChild(div);
      }
    }

    this.displayCalenderFooter(month, year);
    localStorage.setItem('month', JSON.stringify(month));
    localStorage.setItem('year', JSON.stringify(year));
  }

  init() {
    let selectedMonth = this.today.getMonth();
    let selectedYear = this.today.getFullYear();

    const storeMonth = localStorage.getItem('month');
    const storeYear = localStorage.getItem('year');

    if (!storeMonth || !storeYear) {
      localStorage.setItem('month', JSON.stringify(selectedMonth));
      localStorage.setItem('year', JSON.stringify(selectedYear));
    } else {
      selectedMonth = JSON.parse(storeMonth);
      selectedYear = JSON.parse(storeYear);
    }

    this.displayWeekdays();
    this.displayCalender(selectedMonth, selectedYear);
  }
}

export default CalenderUIHandler;
