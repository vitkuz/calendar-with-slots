//converter function

function convertmonth_ddToDDD(thismonth) {
  var month = parseInt(thismonth, 10);
  
  switch (month) {
    case 0:
      return "January";
      break;
    case 1:
      return "February";
      break;
    case 2:
      return "March";
      break;
    case 3:
      return "April";
      break;
    case 4:
      return "May";
      break;
    case 5:
      return "June";
      break;
    case 6:
      return "July";
      break;
    case 7:
      return "August";
      break;
    case 8:
      return "September";
      break;
    case 9:
      return "October";
      break;
    case 10:
      return "November";
      break;
    case 11:
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

function convertDayNumber_to_shortDayName(dayNo) {
  dayNo = parseInt(dayNo, 10);
  switch (dayNo) {
    case 0:
      return "Sun";
      break;
    case 1:
      return "Mon";
      break;
    case 2:
      return "Tue";
      break;
    case 3:
      return "Wed";
      break;
    case 4:
      return "Thu";
      break;
    case 5:
      return "Fri";
      break;
    case 6:
      return "Sat";
      break;
    default:
      return "UnknownDay";
      break;
  }
}

function convertSlotNo_to_label(slotNo) {
  slotNo = parseInt(slotNo, 10);
  switch (slotNo) {
    case 0:
      return "12:00 a.m.";
      break;
    case 1:
      return "1:00 a.m.";
      break;
    case 2:
      return "2:00 a.m.";
      break;
    case 3:
      return "3:00 a.m.";
      break;
    case 4:
      return "4:00 a.m.";
      break;
    case 5:
      return "5:00 a.m.";
      break;
    case 6:
      return "6:00 a.m.";
      break;
    case 7:
      return "7:00 a.m.";
      break;
    case 8:
      return "8:00 a.m.";
      break;
    case 9:
      return "9:00 a.m.";
      break;
    case 10:
      return "10:00 a.m.";
      break;
    case 11:
      return "11:00 a.m.";
      break;
    case 12:
      return "12:00 p.m.";
      break;
    case 13:
      return "1:00 p.m.";
      break;
    case 14:
      return "2:00 p.m.";
      break;
    case 15:
      return "3:00 p.m.";
      break;
    case 16:
      return "4:00 p.m.";
      break;
    case 17:
      return "5:00 p.m.";
      break;
    case 18:
      return "6:00 p.m.";
      break;
    case 19:
      return "7:00 p.m.";
    case 20:
      return "8:00 p.m.";
    case 21:
      return "9:00 p.m.";
    case 22:
      return "10:00 p.m.";
    case 23:
      return "11:00 p.m.";
      break;
      return "UnknownSlotNo";
      break;
  }
}

var controller = {
  firstSlot: true,
  today: new Date(),
  selectedDay: new Date(),
  selectedSlot: null,
  days: null,
  messages: []
}

var day = controller.today.getDate();
var month = controller.today.getMonth();
var week = controller.today.getDay(); // ==> 5
var year = controller.today.getFullYear();

var CalendarCtrl = (function () {
  
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  
  var selected = new Date();
  selected.setHours(0, 0, 0, 0);
  
  var state = {
    selectFirstSlot: true,
    today: today,
    selectedDay: selected,
    selectedSlot: null,
    days: null,
    messages: [
      {
        id: 1,
        text: 'lorem 1',
      }
    ]
  };
  
  var uiElements = {
    calendar: document.getElementById("calendar"),
    prev: document.getElementById("prev"),
    next: document.getElementById("next"),
    calendarTitle: document.getElementById("calendar-title"),
    weekRow: document.getElementById("weekRow"),
    slots: document.getElementById("slots"),
    confirm: document.getElementById("confirm"),
    hideCalendarBtn: document.getElementById("hide-calendar"),
    showCalendarBtn: document.getElementById("show-calendar"),
    toggleCalendarBtn: document.getElementById("toggle-calendar"),
  };
  
  function init() {
    
    // Step 1: Show loading gif and ask for available slots for next 7 days
    uiElements.weekRow.innerHTML = '<img src="./loading_spinner.gif" />';
    
    //Step 2: Generate
    getAvailableSlots(function (days) {
      state.days = days;
      printCalendarRow();
      attachEventListeners();
      
    });
    
    // printCalendarRow(selected);
    //
    // uiElements.next.addEventListener('click', selectNext);
    // uiElements.prev.addEventListener('click', selectPrev);
    // uiElements.confirm.addEventListener('click', reserveSlot);
    //
    // uiElements.hideCalendarBtn.addEventListener('click', hideCalendar);
    // uiElements.showCalendarBtn.addEventListener('click', showCalendar);
    // uiElements.toggleCalendarBtn.addEventListener('click', toggleCalendar);
    //
    // uiElements.weekRow.addEventListener('click', function (e) {
    //
    //   if (e.target && e.target.nodeName == "TD") {
    //     selectDay(new Date(e.target.getAttribute('data-date')));
    //   }
    //
    // });
    //
    // uiElements.slots.addEventListener('change', function (e) {
    //
    //   if (e.target) {
    //     selectSlot({date:selected, slot: e.target.value});
    //   }
    // });
    //
    // selectDay(today);
    
  }
  
  function attachEventListeners() {
    uiElements.next.addEventListener('click', selectNext);
    uiElements.prev.addEventListener('click', selectPrev);
    
    uiElements.weekRow.addEventListener('click', function (e) {
      
      if (e.target && e.target.nodeName == "TD") {
        var selectedDate = new Date(e.target.getAttribute('data-date'))
        selectDay(selectedDate);
      }
      
    });
    
    uiElements.slots.addEventListener('change', function (e) {
      if (e.target) {
        var date = new Date(e.target.getAttribute('data-date'));
        selectSlot({date: date, slotId: e.target.value});
      }
    });
    
  }
  
  function printCalendarRow() {
    
    renderCalendarTitle(state.selectedDay);
    
    var diff = state.selectedDay.getDate() - state.today.getDate();
    
    console.log('DIFFFFFFF', diff);
    
    if (diff > 5) {
      disableButton(uiElements.next);
    } else if (diff <= 0) {
      disableButton(uiElements.prev);
    } else {
      enableButton(uiElements.next);
      enableButton(uiElements.prev);
    }
    
    // days = _getNext7Days(controller.today);
    
    var table = '<table>{{row}}</table>';
    var th = '<tr>{{cells}}</tr>';
    var tr = '<tr>{{cells}}</tr>';
    
    var thtd = '';
    var trtd = '';
    
    state.days.forEach(function (day) {
      var classes = state.selectedDay.getDate() === day.date.getDate() ? 'active' : '';
      
      thtd += '<td  class="' + classes + '">' + convertDayNumber_to_shortDayName(day.date.getDay()) + '</td>';
      trtd += '<td data-date="' + day.date + '" class="' + classes + '">' + day.date.getDate() + '</td>';
    })
    
    th = th.replace('{{cells}}', thtd);
    
    tr = tr.replace('{{cells}}', trtd);
    
    document.getElementById("weekRow").innerHTML = table.replace('{{row}}', th + tr);
    
    var slotsStr = '';
    
    state.days.forEach(function (day) {
      
      var slots = day.slots;
      
      slotsStr += '<div class="slots-container" id="day-' + day.date.getDate() + '">' + renderSlots(slots) + '</div>';
      
    })
    
    uiElements.slots.innerHTML = slotsStr;
    
    selectSlotsContainer('day-' + state.selectedDay.getDate()); //select first day
    
    // selectDay(days[0].date);
  }
  
  function selectSlotsContainer(element) {
    
    state.days.forEach(function (day) {
      
      if ('day-' + day.date.getDate() === element) {
        document.getElementById(element).classList.add('slots-container--active')
      } else {
        document.getElementById('day-' + day.date.getDate()).classList.remove('slots-container--active');
      }
      
    });
    
  }
  
  function renderCalendarTitle() {
    
    console.log(state.selectedDay);
    
    var day = state.selectedDay.getDate();
    var month = state.selectedDay.getMonth();
    var week = state.selectedDay.getDay(); // ==> 5
    var year = state.selectedDay.getFullYear();
    
    document.getElementById("calendar-title").innerHTML = convertDayNumber_to_dayName(week) + ' ' + day + ' ' + convertmonth_ddToDDD(month) + ' ' + year;
  }
  
  function disableButton(element) {
    element.classList.add("disable");
  }
  
  function enableButton(element) {
    element.classList.remove("disable");
  }
  
  function selectPrev(e) {
    e.preventDefault();
    if (e.target) {
      state.selectedDay.setDate(state.selectedDay.getDate() - 1);
      selectDay(state.selectedDay);
    }
  }
  
  function selectNext(e) {
    e.preventDefault();
    if (e.target) {
      state.selectedDay.setDate(state.selectedDay.getDate() + 1);
      selectDay(state.selectedDay);
      
    }
  }
  
  function hideCalendar() {
    console.log('Hide calendar');
    document.getElementById('calendar').classList.remove('open');
  }
  
  function showCalendar() {
    console.log('Show calendar');
    document.getElementById('calendar').classList.add('open');
  }
  
  function toggleCalendar() {
    console.log('Toggle calendar');
    document.getElementById('calendar').classList.toggle('open');
  }
  
  function selectDay(date) {
    
    if (date <= today) {
      date = today;
      disableButton(uiElements.prev);
    } else if (date > today) {
      enableButton(uiElements.prev);
    }
    
    state.selectedDay = date;
    
    renderMessage(3, state.selectedDay);
    
    printCalendarRow();
    // renderSelectedDay(selected);
    selectSlotsContainer('day-' + state.selectedDay.getDate());
    // getAvailableSlots(selected, renderSlots);
    
  }
  
  function getAvailableSlots(cb) {
    
    var randomTimeResponse = Math.random() * 5000;
    var response = [];
    uiElements.slots.innerHTML = '<img src="./loading_spinner.gif" />';
    
    setTimeout(function () {
      
      var day = state.today.getDate();
      var month = state.today.getMonth();
      var week = state.today.getDay(); // ==> 5
      var year = state.today.getFullYear();
      
      for (var d = 0; d < 7; d++) {
        
        // generate random slots data
        var demoSlots = [];
        for (var i = 0; i < 24; i++) {
          demoSlots.push({date: new Date(year, month, day + d), slotId: i, label: convertSlotNo_to_label(i), available: Math.random() >= 0.5})
        }
        
        //filter available dates
        
        var onlyAvailable = [];
        for (var i = 0; i < 24; i++) {
          if (demoSlots[i].available === true) {
            onlyAvailable.push(demoSlots[i]);
          }
        }
        
        response.push({date: new Date(year, month, day + d), slots: onlyAvailable});
      }
      
      cb(response);
      
    }, randomTimeResponse);
  }
  
  function selectSlot(selectedSlot) {
    console.log(selectedSlot);
    state.selectedSlot = selectedSlot;
    renderMessage(4, controller.selectedSlot);
  }
  
  function renderSlots(slots) {
    
    console.log('try to render', slots);
    
    var template = '<fieldset class="timeslot-picker"><legend class="timeslot-picker__label">Choose a time slot</legend><div class="timeslot-picker__list">{{slots}}</div></fieldset>';
    
    var slotsStr = '';
    var len = slots.length;
    
    for (var i = 0; i < len; i++) {
      
      //var checked = state.selectedSlot.date === slots[i].date && state.selectedSlot.slotId === slots[i].id ? 'checked' : '';
  
      var checked = '';
      
      if (state.selectedSlot) {
        if (state.selectedSlot.date.getDate() === slots[i].date.getDate()) {
          if (state.selectedSlot.slotId == slots[i].slotId) {
            checked = 'checked';
          }
        }
      }
      
      slotsStr += '<label class="timeslot-picker__item">' +
          '<input data-date="'+slots[i].date+'" class="timeslot-picker__check" type="radio" name="timeslotradio" id="radio-' + slots[i].slotId + '" value="' +
          slots[i].slotId +
          '" '+ checked +'>' +
          '<span data-slot="' + slots[i].slotId +
          '" class="timeslot-picker__time">' +
          slots[i].label +
          '</span>' +
          '</label>';
    }
    
    // uiElements.slots.innerHTML = template.replace('{{slots}}', slots);
    
    return template.replace('{{slots}}', slotsStr);
    
    // slotsAreRendered();
  }
  
  // function slotsAreRendered() {
  //
  //   if (controller.firstSlot) {
  //     // select first available slot onece
  //     document.querySelectorAll(".timeslot-picker__item > input")[0].click();
  //     controller.firstSlot = false;
  //   }
  //
  // }
  
  function dateReservationConfirmed(slot) {
    console.log('dateReservationConfirmed', state.selectedSlot);
    renderMessage(1);
    hideCalendar();
    // showChangeButton();
  }
  
  function dateReservationRejected(slot) {
    console.log('dateReservationFail', state.selectedSlot);
    renderMessage(2);
  }
  
  function renderMessage(msgId, data) {
    
    var msg;
    
    console.log(data);
    
    switch (msgId) {
      case 1:
        msg = '<div class="success">It is ok, slot with this date reserved</div>';
        break;
      case 2:
        msg = '<div class="error">You cant reserved this slot, try another one</div>';
        break;
      case 3:
        msg = '<div class="info">Wait, slots are loading for' + data + '</div>';
        break;
      case 4:
        msg = '<div class="info">You\'ve selected' + state.selectedSlot + ' ' + convertSlotNo_to_label(state.selectedSlot.id) + '</div>';
        break;
      case 5:
        msg = '<div class="warning">Confirmation request is sent</div>';
        break;
    }
    
    console.log(msg);
    
    document.getElementById("msg").innerHTML = msg;
  }
  
  function reserveSlot(e) {
    
    console.log('Reserve slot. Send AJAX request to...');
    
    renderMessage(5)
    
    // put loading spinner
    
    setTimeout(function () {
      
      if (Math.random() > .5) {
        console.log('dateReservationConfirmed', state.selectedSlot);
        dateReservationConfirmed(state.selectedSlot);
        
      } else {
        console.log('dateReservationRejected', state.selectedSlot);
        dateReservationRejected(state.selectedSlot);
        getAvailableSlots(function (days) {
          state.selectedSlot = days;
          printCalendarRow();
        });
      }
      
    }, 5000)
    
  }
  
  // init();
  
  return {
    init: init,
  }
  
}());

document.getElementById("show-calendar").addEventListener('click', function (e) {
  document.getElementById('calendar').classList.add('open');
  CalendarCtrl.init();
})