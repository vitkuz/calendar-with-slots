var messages = [
  {id:0, message: ''}
]

var controller = {
  autoshow: true,
  today: returnToday(),
  todayToString: function () {
    return this.today.month + '/' + this.today.day + '/' + this.today.year
  },
  // by default will be selected Today
  selected: {
    day: returnToday().day,
    month: returnToday().month,
    year: returnToday().year,
  },
  selectedToString: function () {
    return this.today.day + '/' + this.today.month + '/' + this.today.year
  },
  dates: []
};

//-------------------------------------
//-------------------------------------
//-------------------------------------
//-------------------------------------
//-------------------------------------

createCalenderRow(controller.today.month, controller.today.year);

function previous() {
  // var curmonth = parseInt(document.getElementById("ContentPlaceHolder1_lblmonth").innerText);
  // var curYear = parseInt(document.getElementById("ContentPlaceHolder1_lblYear").innerText)
  
  var prevmonth = getPreviousmonth(curmonth, curYear);
  var prevYear = getPreviousYear(curmonth, curYear);
  
  document.getElementById("ContentPlaceHolder1_lblmonth").innerText = prevmonth;
  document.getElementById("ContentPlaceHolder1_lblmonthDDD").innerText = convertmonth_ddToDDD(prevmonth);
  document.getElementById("ContentPlaceHolder1_lblYear").innerText = prevYear;
  
  createCalenderTable(prevmonth, prevYear);
  createCalenderRow(prevmonth, prevYear);
  
  return false;
}

function next() {
  
  // var curmonth = parseInt(document.getElementById("ContentPlaceHolder1_lblmonth").innerText);
  // var curYear = parseInt(document.getElementById("ContentPlaceHolder1_lblYear").innerText)
  
  var nextmonth = getNextmonth(curmonth, curYear);
  var nextYear = getNextYear(curmonth, curYear);
  
  document.getElementById("ContentPlaceHolder1_lblmonth").innerText = nextmonth;
  document.getElementById("ContentPlaceHolder1_lblmonthDDD").innerText = convertmonth_ddToDDD(nextmonth);
  document.getElementById("ContentPlaceHolder1_lblYear").innerText = nextYear;
  
  createCalenderTable(nextmonth, nextYear);
  createCalenderRow(nextmonth, nextYear);
  return false;
}

function getPreviousmonth(curmonth, curYear) {
  //alert("current: "+ curmonth +" "+curYear);
  var prevmonth;
  //for month: ...3, 2, 1, 12, 11, 10...
  if (curmonth == 1) {
    prevmonth = 12;
  } else {
    prevmonth = curmonth - 1;
  }
  
  //alert(prevmonth + " " + prevYear);
  
  return prevmonth;
}

function getNextmonth(curmonth, curYear) {
  //alert("current: "+ curmonth +" "+curYear);
  var nextmonth;
  //for month: ...3, 2, 1, 12, 11, 10...
  if (curmonth == 12) {
    nextmonth = 1;
  } else {
    nextmonth = curmonth + 1;
  }
  
  //alert(prevmonth + " " + prevYear);
  
  return nextmonth;
}

function getPreviousYear(curmonth, curYear) {
  //alert("current: " + curmonth + " " + curYear);
  //var prevmonth;
  var prevYear;
  
  //for prev year if month==12 the decrement
  if (curmonth == 1) {
    prevYear = curYear - 1;
  } else {
    prevYear = curYear;
  }
  
  return prevYear;
}

function getNextYear(curmonth, curYear) {
  //alert("current: " + curmonth + " " + curYear);
  //var prevmonth;
  var nextYear;
  
  //for prev year if month==12 the decrement
  if (curmonth == 12) {
    nextYear = curYear + 1;
  } else {
    nextYear = curYear;
  }
  
  return nextYear;
}

function isThisLeapYear(year) {
  
  //temporary taken static
  if (year % 4 == 0 || year % 100 == 100) {
    return true;
  } else {
    return false;
  }
}

function createCalenderRow(monthNo, year) {
  
  
  var totalDays = getTotalDaysForThismonth(monthNo, year);
  var firstDateDayNo = getmonthFirstDate_DayNo(monthNo, year);
  
  console.log('total days = %d, first date= %d', totalDays, firstDateDayNo)
  
  var tableHeader = "<table  style='box-shadow:3px 3px 24px 1px gray' cellPadding='10' border='1px solid black'>";
  
  // tableHeader += "<tr style='background-color:lightgray;'><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>" + trEnd;
  
  var trStart = "<tr>";
  var trEnd = "</tr>";
  var tableEnd = "</table>";
  var datesInRow = "";
  var rowContent = "";
  
  var countRows = 0;
  
  var i = 1;
  
  //week
  rowContent += trStart;
  while (i <= totalDays) {
    
    for (var j = 0; j <= 6 && i <= totalDays; j++, i++) {
      
      while (firstDateDayNo > 0) {
        rowContent += "<td id='0'></td>";
        firstDateDayNo--;
        j++;
      }
      
      var classes = '';
      
      if (i === parseInt(controller.selected.day, 10)) {
        classes += 'selected ';
      }
      
      if (i === parseInt(controller.today.day, 10)) {
        classes += 'today ';
      }
      
      var tdDateString = i + '/' + monthNo + '/' + year;
      
      rowContent += "<td data-date=\"" + tdDateString + "\" id='" + i + "' class=\"" + classes + "\">" + i + "</td>";
    }
    countRows++;
  }
  rowContent += trEnd;
  
  tableHeader += trStart;
  for (var h = 0; h < countRows; h++) {
    tableHeader += '<th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>'
  }
  tableHeader += trEnd;
  
  //var tableOuter = "<table><tr><td>"+"</td></tr></table>";
  document.getElementById("rowCal").innerHTML = tableHeader + rowContent + tableEnd;
}

function getmonthFirstDate_DayNo(monthNo, year) {
  monthNo = parseInt(monthNo, 10);
  year = parseInt(year, 10);
  var dt = new Date(year, monthNo - 1, 1);
  return dt.getDay();
}

function getTotalDaysForThismonth(monthNo, year) {
  monthNo = parseInt(monthNo, 10);
  year = parseInt(year, 10);
  switch (monthNo) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
      break;
    
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
      break;
      
      //for february
    case 2:
      if (isThisLeapYear(year)) {
        return 29
      } else {
        return 28;
      }
    
    default:
      return 99;
      break;
    
  }
  
}

function convertmonth_ddToDDD(thismonth) {
  var month = parseInt(thismonth, 10);
  
  switch (month) {
    case 1:
      return "January";
      break;
    case 2:
      return "February";
      break;
    case 3:
      return "March";
      break;
    case 4:
      return "April";
      break;
    case 5:
      return "May";
      break;
    case 6:
      return "June";
      break;
    case 7:
      return "July";
      break;
    case 8:
      return "August";
      break;
    case 9:
      return "September";
      break;
    case 10:
      return "October";
      break;
    case 11:
      return "November";
      break;
    case 12:
      return "December";
      break;
    
    default:
      return "Unknown";
      break;
  }
}

function convertDayNumber_to_dayName(dayNo) {
  dayNo = parseInt(dayNo, 10);
  switch (dayNo) {
    case 0:
      return "Sunday";
      break;
    case 1:
      return "Monday";
      break;
    case 2:
      return "Tuesday";
      break;
    case 3:
      return "Wednesday";
      break;
    case 4:
      return "Thursday";
      break;
    case 5:
      return "Friday";
      break;
    case 6:
      return "Saturday";
      break;
    default:
      return "UnknownDay";
      break;
  }
}

function getSlotsForDate(date, renderSlotsFn) {
  
  // first step to add gif
  document.getElementById("result").innerHTML = '<img src="./loading_spinner.gif" />';
  
  //todo add ajax request function for date
  
  // generate random slots data
  var demoSlots = [];
  for (var i = 0; i < 12; i++) {
    demoSlots.push({id: i, label: i + '00:pm', available: Math.random() >= 0.5})
  }
  
  //filter available dates
  var onlyAvailable = [];
  for (var i = 0; i < 12; i++) {
    if (demoSlots[i].available === true) {
      onlyAvailable.push(demoSlots[i]);
    }
  }
  
  setTimeout(function () {
    renderSlotsFn(onlyAvailable);
  }, 1000)
  
  // return demoSlots;
}

function returnToday() {
  var today = new Date();
  console.log(today, today.getDate(), today.getMonth()+1, today.getFullYear());
  return {
    month: today.getMonth()+1,
    day: today.getDate(),
    year: today.getFullYear(),
  }
}

function selectDate(date) {
  
  var selectedDay,
      selectedMonth,
      selectedYear;
  
  console.log(typeof date);
  
  switch (typeof date) {
    case 'string':
      date = date.split('/');
      selectedDay = date[0];
      selectedMonth = date[1];
      selectedYear = date[2];
      break;
    case 'object':
      selectedDay = date.day;
      selectedMonth = date.month;
      selectedYear = date.year;
      break;
    default:
      throw new Error('unknown format of the date', date);
  }
  
  var selectedDate = {
    day: selectedDay,
    month: selectedMonth,
    year: selectedYear
  };
  
  controller.selected = selectedDate;
  
  document.getElementById("current-date").innerHTML = ' ' +
      convertDayNumber_to_dayName(new Date(controller.selected.year,controller.selected.month - 1, controller.selected.day).getDay()) +
      ' ' +
      controller.selected.day +
      ' ' +
      convertmonth_ddToDDD(controller.selected.month) +
      ' ' +
      controller.selected.year;
  
  
  
  createCalenderRow(controller.selected.month, controller.selected.year);
  
  getSlotsForDate(controller.selected, function (data) {
    console.log('print data...', data);
    document.getElementById("result").innerHTML = tmpl("available-slots", data);
  });
  
  // todo: wrap below in a function
  // console.log('Asking for slots...',controller.selected);
  // console.log('Show spinner');
  // document.getElementById("daySlots").innerHTML = '<img src="./loading_spinner.gif" />';
  
  // fakeAjaxResponce_giveMeAvalibleSlotsFoDate(function () {
  //   var fakeAjaxSuccess = {date:controller.selected, slots:getSlotsForDate()};
  //
  //   console.log('Hide spinner and render slots');
  //   document.getElementById("daySlots").innerHTML = '';
  //   console.log(fakeAjaxSuccess);
  //   controller.dates.push(fakeAjaxSuccess);
  //   renderSlots(fakeAjaxSuccess);
  // });
  
}

function reserveSlot(i) {
  console.log('Send request to reserve slot' + i);
}

document.getElementById("daySlots").addEventListener('click', function (e) {
  
  if (e.target && e.target.nodeName == "TD") {
    console.log('td is clicked', e.target);
  }
  
});

document.getElementById("rowCal").addEventListener('click', function (e) {
  
  if (e.target && e.target.nodeName == "TD") {
    console.log('td is clicked', e.target);
    selectDate(e.target.getAttribute('data-date'));
  }
  
});

document.getElementById("nextDay").addEventListener('click', function (e) {
  
  console.log('current SELECTED date', controller.selected);
  
  controller.selected.day++;
  
  if (e.target) {
    selectDate(controller.selected);
  }
  
});

document.getElementById("prevDay").addEventListener('click', function (e) {
  
  console.log('current SELECTED date', controller.selected);
  
  controller.selected.day--;
  
  if (e.target) {
    selectDate(controller.selected);
  }
  
});

document.getElementById("result").addEventListener('click', function (e) {
  
  if (e.target && e.target.nodeName == "SPAN") {
    console.log('slot selected is clicked', e.target);
    // selectDate(e.target.getAttribute('data-date'));
  
    
    document.getElementById("messages").innerHTML = 'You\'ve selected ' +
                                                      controller.selectedToString() +
                                                      ' <strong>' +
                                                      e.target.innerHTML +
                                                      '</strong><br/> Success message goes here';
    
  }
  
  // send request to reserve slot
  
});

getSlotsForDate(controller.today, renderSlots);

function renderSlots(slots) {
  
  var renderInputs = function () {
    var str = '';
    for (var i = 0; i < slots.length; i++) {
      str += '<label class="timeslot-picker__item">' +
                '<input class="timeslot-picker__check" type="radio" name="timeslotradio" id="radio1" value="' +
                  slots[i].id +
                '" >' +
                '<span class="timeslot-picker__time">' +
                  slots[i].label +
                '</span>' +
              '</label>'
    }
    return str;
  }
  
  var htmlToRender = "<fieldset class=\"timeslot-picker\">" +
                        "<legend class=\"timeslot-picker__label\">" +
                          "Choose a time slot" +
                        "</legend>" +
                        "<div class=\"timeslot-picker__list\">" +
                          renderInputs() +
                        "</div>" +
                      "</fieldset>";
  
  console.log('print data...', slots);
  document.getElementById("result").innerHTML = htmlToRender;
  selectFirstAvailableSlot();
}

function selectFirstAvailableSlot() {
  document.querySelector("#radio1 + span").click();
}