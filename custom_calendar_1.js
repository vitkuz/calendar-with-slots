var curMonth = parseInt(document.getElementById("ContentPlaceHolder1_lblMonth").innerText);
document.getElementById("ContentPlaceHolder1_lblMonthDDD").innerText = convertMonth_ddToDDD(curMonth);
previous();

function previous() {
  var curMonth = parseInt(document.getElementById("ContentPlaceHolder1_lblMonth").innerText);
  var curYear = parseInt(document.getElementById("ContentPlaceHolder1_lblYear").innerText)
  
  var prevMonth = getPreviousMonth(curMonth, curYear);
  var prevYear = getPreviousYear(curMonth, curYear);
  
  document.getElementById("ContentPlaceHolder1_lblMonth").innerText = prevMonth;
  document.getElementById("ContentPlaceHolder1_lblMonthDDD").innerText = convertMonth_ddToDDD(prevMonth);
  document.getElementById("ContentPlaceHolder1_lblYear").innerText = prevYear;
  
  createCalenderTable(prevMonth, prevYear);
  
  return false;
}

function next() {
  
  var curMonth = parseInt(document.getElementById("ContentPlaceHolder1_lblMonth").innerText);
  var curYear = parseInt(document.getElementById("ContentPlaceHolder1_lblYear").innerText)
  
  var nextMonth = getNextMonth(curMonth, curYear);
  var nextYear = getNextYear(curMonth, curYear);
  
  document.getElementById("ContentPlaceHolder1_lblMonth").innerText = nextMonth;
  document.getElementById("ContentPlaceHolder1_lblMonthDDD").innerText = convertMonth_ddToDDD(nextMonth);
  document.getElementById("ContentPlaceHolder1_lblYear").innerText = nextYear;
  
  createCalenderTable(nextMonth, nextYear);
  return false;
}

function getPreviousMonth(curMonth, curYear) {
  //alert("current: "+ curMonth +" "+curYear);
  var prevMonth;
  //for month: ...3, 2, 1, 12, 11, 10...
  if (curMonth == 1) {
    prevMonth = 12;
  } else {
    prevMonth = curMonth - 1;
  }
  
  //alert(prevMonth + " " + prevYear);
  
  return prevMonth;
}

function getNextMonth(curMonth, curYear) {
  //alert("current: "+ curMonth +" "+curYear);
  var nextMonth;
  //for month: ...3, 2, 1, 12, 11, 10...
  if (curMonth == 12) {
    nextMonth = 1;
  } else {
    nextMonth = curMonth + 1;
  }
  
  //alert(prevMonth + " " + prevYear);
  
  return nextMonth;
}

function getPreviousYear(curMonth, curYear) {
  //alert("current: " + curMonth + " " + curYear);
  //var prevMonth;
  var prevYear;
  
  //for prev year if month==12 the decrement
  if (curMonth == 1) {
    prevYear = curYear - 1;
  } else {
    prevYear = curYear;
  }
  
  return prevYear;
}

function getNextYear(curMonth, curYear) {
  //alert("current: " + curMonth + " " + curYear);
  //var prevMonth;
  var nextYear;
  
  //for prev year if month==12 the decrement
  if (curMonth == 12) {
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

function createCalenderTable(monthNo = 12, year = 2017) {
  
  var totalDays = getTotalDaysForThisMonth(monthNo, year);
  var firstDateDayNo = getMonthFirstDate_DayNo(monthNo, year);
  
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
      rowContent += "<td id='" + i + "' onclick='return setThisSelectedDateToTextBox(" + i + ");'>" + i + "</td>";
    }
    rowContent += trEnd;
    //i+=7;
  }
  
  //var tableOuter = "<table><tr><td>"+"</td></tr></table>";
  document.getElementById("divCal").innerHTML = tableHeader + rowContent + tableEnd;
}


function createCalenderRow(monthNo = 12, year = 2017) {
  
  var totalDays = getTotalDaysForThisMonth(monthNo, year);
  var firstDateDayNo = getMonthFirstDate_DayNo(monthNo, year);
  
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
      rowContent += "<td id='" + i + "' onclick='return setThisSelectedDateToTextBox(" + i + ");'>" + i + "</td>";
    }
    countRows++;
  }
  rowContent += trEnd;
  
  tableHeader += trStart;
  for (var h = 0 ; h < countRows; h++) {
    tableHeader += '<th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>'
  }
  tableHeader += trEnd;
  
  //var tableOuter = "<table><tr><td>"+"</td></tr></table>";
  document.getElementById("rowCal").innerHTML = tableHeader + rowContent + tableEnd;
}

function getMonthFirstDate_DayNo(monthNo, year) {
  
  var dt = new Date(year, monthNo - 1, 1);
  // alert(dt+"----"+dt.getDay());
  return dt.getDay();
}

function getTotalDaysForThisMonth(monthNo, year) {
  
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

function convertMonth_ddToDDD(thisMonth) {
  var month = thisMonth;
  
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

function setThisSelectedDateToTextBox(selectedDate) {
  
  updateSlotObject(selectedDate)
  
  var curMonth = document.getElementById("ContentPlaceHolder1_lblMonth").innerText;
  var curYear = document.getElementById("ContentPlaceHolder1_lblYear").innerText;
  document.getElementById("txtDate").value = selectedDate + "/" + curMonth + "/" + curYear;
  //alert(selectedDate + "/" + curMonth + "/" + curYear);
}

var slotObject = {selectedDates:[]}

function updateSlotObject(selectedDate) {
  var curMonth = document.getElementById("ContentPlaceHolder1_lblMonth").innerText;
  var curYear = document.getElementById("ContentPlaceHolder1_lblYear").innerText;
  
  slotObject.selectedDates.push({date:selectedDate + "/" + curMonth + "/" + curYear, slots: []});
  console.log(slotObject);
}