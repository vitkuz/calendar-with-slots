var slotObject = {
  autoshow:true,
  today: returnToday(),
  todayToString: function () {
    return this.today.day+'/'+this.today.month+'/'+this.today.year
  },
  // by default will be selected Today
  selected: {
    day:returnToday().day,
    month:returnToday().month,
    year:returnToday().year,
  },
  selectedToString: function () {
    return this.today.day+'/'+this.today.month+'/'+this.today.year
  },
  dates: []
};

console.log('today',slotObject.today);
console.log('todayToString',slotObject.todayToString());
console.log('selected',slotObject.selected);
console.log('selectedToString',slotObject.selectedToString());
//-------------------------------------
//-------------------------------------
//-------------------------------------
//-------------------------------------
//-------------------------------------


// createCalenderTable(slotObject.selected.month, slotObject.selected.year);
// createCalenderRow(slotObject.selected.month, slotObject.selected.year);


// var curmonth = parseInt(document.getElementById("ContentPlaceHolder1_lblmonth").innerText);
// document.getElementById("ContentPlaceHolder1_lblmonthDDD").innerText = convertmonth_ddToDDD(curmonth);

// createCalenderTable(slotObject.today.month, slotObject.today.year);
createCalenderRow(slotObject.today.month, slotObject.today.year);

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

function createCalenderTable(monthNo, year) {
  
  console.log('createCalenderTable ',monthNo, year)
  
  var totalDays = getTotalDaysForThismonth(monthNo, year);
  var firstDateDayNo = getmonthFirstDate_DayNo(monthNo, year);
  
  var tableHeader = "<table  style='box-shadow:3px 3px 24px 1px gray' cellPadding='10' border='1px solid black'>";
  tableHeader += "<tr style='background-color:lightgray;'><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>" + trEnd;
  var trStart = "<tr>";
  var trEnd = "</tr>";
  var tableEnd = "</table>";
  var datesInRow = "";
  var rowContent = "";
  
  var i = 1;
  //alert(totalDays);
  while (i <= totalDays) {
    
    //week
    rowContent += trStart;
    for (var j = 0; j <= 6 && i <= totalDays; j++, i++) {
      
      while (firstDateDayNo > 0) {
        rowContent += "<td id='0'></td>";
        firstDateDayNo--;
        j++;
      }
      
      var classes ='';
  
      if (i === slotObject.selected.day) {
        classes += 'selected ';
      }
  
      if (i === slotObject.today.day) {
        classes += 'today ';
      }
      
      var tdDate = {
        day: i,
        mount: monthNo,
        year: year,
      }
      
      rowContent += "<td id='" + i + "' onclick='return selectDate(" + tdDate + ");' class='"+classes+"'>" + i + "</td>";
    }
    rowContent += trEnd;
    //i+=7;
  }
  
  //var tableOuter = "<table><tr><td>"+"</td></tr></table>";
  document.getElementById("divCal").innerHTML = tableHeader + rowContent + tableEnd;
  
  if (slotObject.autoshow) {
    selectDate(slotObject.selectedToString());
  }
}

function createCalenderRow(monthNo, year) {
  
  console.log('createCalenderRow ', monthNo, year);
  console.log('selected:', slotObject.selected.month, slotObject.selected.year);
  
  var totalDays = getTotalDaysForThismonth(monthNo, year);
  var firstDateDayNo = getmonthFirstDate_DayNo(monthNo, year);
  
  console.log('total days = %d, first date= %d',totalDays,firstDateDayNo)
  
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
      
      if (i === parseInt(slotObject.selected.day,10)) {
        classes += 'selected ';
      }
      
      if (i === parseInt(slotObject.today.day,10)) {
        classes += 'today ';
      }
      
      var tdDateString = i + '/' + monthNo + '/' +year;

      rowContent += "<td data-date=\""+tdDateString+"\" id='" + i + "' class=\""+classes+"\">" + i + "</td>";
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
  monthNo = parseInt(monthNo,10);
  year = parseInt(year,10);
  var dt = new Date(year, monthNo - 1, 1);
  return dt.getDay();
}

function getTotalDaysForThismonth(monthNo, year) {
  monthNo = parseInt(monthNo,10);
  year = parseInt(year,10);
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
  var month = parseInt(thismonth,10);
  
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
  dayNo = parseInt(dayNo,10);
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

function giveMeDemoSlotsForThisDay() {
  var slots = [
    {
      id: 1,
      taken: Math.random() >= 0.5,
      confirmed: Math.random() >= 0.5
    },
    {
      id: 2,
      taken: Math.random() >= 0.5,
      confirmed: Math.random() >= 0.5
    },
    {
      id: 8,
      taken: Math.random() >= 0.5,
      confirmed: Math.random() >= 0.5
    },
    {
      id: 9,
      taken: Math.random() >= 0.5,
      confirmed: Math.random() >= 0.5
    },
    {
      id: 10,
      taken: Math.random() >= 0.5,
      confirmed: Math.random() >= 0.5
    },
    {
      id: 11,
      taken: Math.random() >= 0.5,
      confirmed: Math.random() >= 0.5
      
    }
  ]
  
  return slots;
}

function returnToday() {
  var today = new Date();
  
  return {
    day: today.getDay(),
    month: today.getDate(),
    year: today.getFullYear(),
  }
}

function selectDate(date) {
  
  console.log(this.event);
  
  date = date.split('/');
  var selectedDay = date[0];
  var selectedMonth = date[1];
  var selectedYear = date[2];
  
  var selectedDate = {
    day:selectedDay,
    month:selectedMonth,
    year:selectedYear
  };
  
  slotObject.selected = selectedDate;
  
  createCalenderRow(slotObject.selected.month, slotObject.selected.year);
  
  
  // todo: wrap below in a function
  console.log('Asking for slots...',slotObject.selected);
  console.log('Show spinner');
  document.getElementById("daySlots").innerHTML = '<img src="./loading_spinner.gif" />';
  
  fakeAjaxResponce_giveMeAvalibleSlotsFoDate(function () {
    var fakeAjaxSuccess = {date:slotObject.selected, slots:giveMeDemoSlotsForThisDay()};
    
    console.log('Hide spinner and render slots');
    document.getElementById("daySlots").innerHTML = '';
    console.log(fakeAjaxSuccess);
    slotObject.dates.push(fakeAjaxSuccess);
    renderSlots(fakeAjaxSuccess);
  });
  
}

function updateSlotObject(selectedDate) {
  // var curmonth = document.getElementById("ContentPlaceHolder1_lblmonth").innerText;
  // var curYear = document.getElementById("ContentPlaceHolder1_lblYear").innerText;
  
  // var curmonth = slotObject.
  //
  // slotObject.selected = selectedDate;
  // slotObject.dates.push({date: selectedDate, slots: giveMeDemoSlotsForThisDay()});
  // renderSlots(slotObject, selectedDate);

}

function fakeAjaxResponce_giveMeAvalibleSlotsFoDate (cb) {
  setTimeout(cb, 1000);
}

function reserveSlot(i) {
  console.log('Send request to reserve slot'+i);
}

function renderSlots({ date, slots}) {
  
  // var day = getDayWithSlots(slotObject.selected);
  // console.log(day);
  // var slots = day.slots;
  //
  var len = slots.length;

  var slotsStartStr = '<div class="slots">';
  var slotsStr = '';
  var slotsEndStr = '</div>';

  for (var i =0; i < len; i++) {

    var clases = slots[i].taken ? 'slot--selected' : 'slot';

    slotsStr += '<div class="'+clases+'" onclick="return reserveSlot(' + i + ');">'+slots[i].id+'</div>';
  }

  document.getElementById("daySlotsTitle").innerHTML = 'Slots for '+date.day;
  document.getElementById("daySlots").innerHTML = slotsStartStr + slotsStr + slotsEndStr;
}

document.getElementById("daySlots").addEventListener('click', function (e) {

  if(e.target && e.target.nodeName == "TD") {
    console.log('td is clicked',e.target);
  }
  
});

document.getElementById("rowCal").addEventListener('click', function (e) {

  if(e.target && e.target.nodeName == "TD") {
    console.log('td is clicked',e.target);
    selectDate(e.target.getAttribute('data-date'));
  }
  
});

document.getElementById("nextDay").addEventListener('click', function (e) {
  
  if(e.target) {
    // selectDate(e.target.getAttribute('data-date'));
  }
  
});

document.getElementById("previousDay").addEventListener('click', function (e) {
  
  if(e.target) {
    // selectDate(e.target.getAttribute('data-date'));
  }
  
});


var data = {
  title: "JavaScript Templates",
  license: {
    "name": "MIT license",
    "url": "https://opensource.org/licenses/MIT"
  },
  features: [
    "lightweight & fast",
    "powerful",
    "zero dependencies"
  ]
};

document.getElementById("result").innerHTML = tmpl("tmpl-demo", data);