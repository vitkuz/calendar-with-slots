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

function convertDateToString(date) {
  
  var day = date.getDate();
  var month = date.getMonth();
  var week = date.getDay();
  var year = date.getFullYear();
  
  return convertDayNumber_to_dayName(week) + ' ' + day + ' ' + convertmonth_ddToDDD(month) + ' ' + year;
  
}

//----------------------------------------------

var EE = EE || {};

EE.slotsCalendar = (function(window, $) {
  
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  
  var selected = new Date();
  selected.setHours(0, 0, 0, 0);
  
  var min = new Date();
  min.setHours(0, 0, 0, 0);
  
  var max = new Date();
  max.setHours(0, 0, 0, 0);
  max.setDate(max.getDate()+6);
  
  var state = {
    errorThreshold:3,
    errorCount:0,
    days: null,
    today: today,
    selected: selected,
    min: min,
    max: max,
  };
  
  function selectDay(elem) {
    
    console.log(elem);
  
    state.days.forEach(function (day) {

      if ('day-' + new Date(day.date).getDate() === elem) {
        document.getElementById('slots-'+new Date(day.date).getDate()).classList.add('calendar__slot-container--active')
      } else {
        document.getElementById('slots-'+new Date(day.date).getDate()).classList.remove('calendar__slot-container--active');
      }

    });
    
  }
  
  function selectSlot(elem) {
  
    console.log(elem);
    
  }
  
  function renderSlots(slots) {
    
    var template = '<fieldset class="timeslot-picker"><legend class="timeslot-picker__label">Choose a time slot</legend><div class="timeslot-picker__list">{{slots}}</div></fieldset>';
    
    var slotsStr = '';
    var len = slots.length;
    
    if (len > 0) {
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
    } else {
      slotsStr += '<div>No slots in this day</div>'
    }
    
    return template.replace('{{slots}}', slotsStr);
  }
  
  function renderCalendar(date) {
    
    var selectedDay = date || today;
    // selectedDay.setHours(0,0,0,0);
    
    var calendarTitleStr = convertDateToString(selectedDay);
    
    var calendarPrevBtn = '<div><a href="#" id="calendar-prev" class="">Prev</a></div>';
    var calendarNextBtn = '<div><a href="#" id="calendar-next" class="">Next</a></div>';
    var calendarTitle = '<div>' + calendarTitleStr + '</div>';
  
    var calendarHeader = '<div class="calendar__header">' + calendarPrevBtn + calendarTitle + calendarNextBtn + '</div>';
  
    document.getElementById('calendar').innerHTML = calendarHeader;
    
    var calendarDates = '<div class="calendar__days">{{days}}</div>';
    var days = '';
    
    state.days.forEach(function (day) {
      console.log(day);
      
      var classes = '';
      classes += selectedDay.getDate() === new Date(day.date).getDate() ? 'active ' : '';
  
      if (day.slots.length === 0) {
        classes += 'disabled '
      }
  
      days += '<div><div class="'+classes+'">'+ convertDayNumber_to_shortDayName(new Date(day.date).getDay()) +'</div><div class="'+classes+'" id="day-'+new Date(day.date).getDate()+'">'+ new Date(day.date).getDate() +'</div></div>'
      
      console.log(day);
    })
  
    calendarDates = calendarDates.replace('{{days}}', days);
  
    var calendarSlots = '<div class="calendar__slots">{{slots}}</div>';
    var slots = '';
    
    state.days.forEach(function (day) {
      slots += '<div class="calendar__slots-container" id="slots-'+ new Date(day.date).getDate() +'">'+renderSlots(day.slots)+'</div>';
    });
  
    calendarSlots = calendarSlots.replace('{{slots}}', slots);
    
    document.getElementById('calendar').innerHTML = calendarHeader + calendarDates + calendarSlots;
  }
  
  function renderTimeoutError() {
    document.getElementById('calendar').innerHTML = '<div>Timeout. Please retry <br/><a href="#" id="calendar-retry">> Do again</a></div>'
  }
  
  function renderAPIError() {
    document.getElementById('calendar').innerHTML = '<div>We cant give you slot due to API error <br/><a href="#" id="calendar-reload">> Reload calendar</a></div>'
  }
  
  function retry() {
    getData()
  }
  
  function getData() {
    
    document.getElementById('calendar').innerHTML = '<img src="./loading_spinner.gif" />';
    
    $.ajax({
      url: 'http://localhost:5000/slots',
      timeout: 2000 //2 second timeout
    }).done(function(data){
      
      state.days = data;
      renderCalendar();
      
    }).fail(function(jqXHR, textStatus){
      
      if(textStatus === 'timeout')
      {
        if (state.errorCount > state.errorThreshold) {
          renderAPIError()
        } else {
          state.errorCount ++;
          console.log('Timeout error happened:', state.errorCount);
          renderTimeoutError()
        }

      } else {
        console.log('Cant reach API:', textStatus);
        renderAPIError()
      }
      
    })
    
  }
  
  function init(options) {
    
    document.getElementById('calendar').addEventListener('click',function (e) {
      console.log(e.target.getAttribute('id'));
      
      var buttonClicked = e.target.getAttribute('id');
      
      if (!buttonClicked) return;
      
      console.log(buttonClicked.search(/day/));
      console.log(buttonClicked.search(/slot/));
      
      if ( buttonClicked === 'calendar-retry') {
        retry();
      } else if (buttonClicked === 'calendar-reload') {
        retry();
      } else if (buttonClicked.search(/day/) === 0) {
        
        selectDay(buttonClicked);
        // console.log('Select day',buttonClicked)
      } else if (buttonClicked.search(/slot/) === 0) {
        
        selectSlot(buttonClicked);
        // console.log('Select slot',buttonClicked)
      }
      
    });
    
    getData(function(data) {
      console.log(data);
    });
    
    return {
      name: options.name,
      ajaxUrl: '',
      delay: '',
      errorCount: 0,
      retry: retry
    }
  }
  
  return init;
  
}(window, jQuery));

var calendar1 = EE.slotsCalendar({
  name:1
});

console.log(calendar1)



var CalendarCtrl = (function () {
  
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  
  var selected = new Date();
  selected.setHours(0, 0, 0, 0);
  
  var min = new Date();
  min.setHours(0, 0, 0, 0);
  
  var max = new Date();
  max.setHours(0, 0, 0, 0);
  max.setDate(max.getDate()+6);
  
  var state = {
    selectFirstSlot: true,
    today: today,
    min:min,
    max:max,
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
    change: document.getElementById("change-reservation"),
    calendarHeader: document.getElementById("calendarHeader"),
  };
  
  function init() {
    
    uiElements.weekRow.innerHTML = '<img src="./loading_spinner.gif" />';
    
    getAvailableSlots(function (days) {
      state.days = days;
      printCalendarRow();
      attachEventListeners();
      selectFirstAvailableSlot();
    });
    
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
    
    uiElements.change.addEventListener('click', showCalendar);
    uiElements.confirm.addEventListener('click', reserveSlot);
    
  }
  
  function printCalendarRow() {
    
    renderCalendarTitle(state.selectedDay);
    
    var diff = state.selectedDay.getDate() - state.today.getDate();
    
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
      var classes = state.selectedDay.getDate() === day.date.getDate() ? 'active ' : '';
      
      if (day.slots.length === 0) {
        classes += 'disabled '
      }
      
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
    var week = state.selectedDay.getDay();
    var year = state.selectedDay.getFullYear();
    
    document.getElementById("calendar-title").innerHTML = convertDayNumber_to_dayName(week) + ' ' + day + ' ' + convertmonth_ddToDDD(month) + ' ' + year;
  }
  
  function dateToFormatedString(date) {
    
    var day = date.getDate();
    var month = date.getMonth();
    var week = date.getDay();
    var year = date.getFullYear();
    
    return convertDayNumber_to_dayName(week) + ' ' + day + ' ' + convertmonth_ddToDDD(month) + ' ' + year;
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
    uiElements.calendarHeader.classList.add('hidden');
  }
  
  function showCalendar() {
    console.log('Show calendar');
    uiElements.calendarHeader.classList.remove('hidden');
  }
  
  function toggleCalendar() {
    console.log('Toggle calendar');
    uiElements.calendarHeader.classList.toggle('hidden');
  }
  
  function selectDay(date) {
    
    if (date < state.min) {
      state.selectedDay = state.min;
    } else if (date > state.max) {
      state.selectedDay = state.max;
    } else {
      state.selectedDay = date;
    }
    
    renderMessage(3, state.selectedDay);
    
    printCalendarRow();
    selectSlotsContainer('day-' + state.selectedDay.getDate());

    
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
        
        if (Math.random() >= 0.5) {
          demoSlots = [];
        }
        
        //filter available dates
        var onlyAvailable = [];
        if (demoSlots.length > 0) {
          for (var i = 0; i < 24; i++) {
            if (demoSlots[i].available === true) {
              onlyAvailable.push(demoSlots[i]);
            }
          }
        }
        
        response.push({date: new Date(year, month, day + d), slots: onlyAvailable});
      }
      
      cb(response);
      
    }, randomTimeResponse);
  }
  
  function selectSlot(selectedSlot) {
    state.selectedSlot = selectedSlot;
    renderMessage(4);
  }
  
  function renderSlots(slots) {
    
    var template = '<fieldset class="timeslot-picker"><legend class="timeslot-picker__label">Choose a time slot</legend><div class="timeslot-picker__list">{{slots}}</div></fieldset>';
    
    var slotsStr = '';
    var len = slots.length;
    
    if (len > 0) {
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
    } else {
      slotsStr += '<div>No slots in this day</div>'
    }
    
   
    
    return template.replace('{{slots}}', slotsStr);
  }
  
  
  function dateReservationConfirmed() {
    console.log('dateReservationConfirmed', state.selectedSlot);
    renderMessage(1);
    hideCalendar();
    // showChangeButton();
  }
  
  function dateReservationRejected() {
    console.log('dateReservationFail', state.selectedSlot);

    
    renderMessage(2);
  
    getAvailableSlots(function (days) {
      state.selectedSlot = null;
      state.days = days;
      printCalendarRow();
      attachEventListeners();
      selectFirstAvailableSlot();
    });
  }
  
  function selectFirstAvailableSlot() {
    
    for (var i=0; i < state.days.length; i++) {
      if (state.days[i].slots.length > 0) {
        selectSlot(state.days[i].slots[0]);
        break;
      }
    }
    
  }
  
  function renderMessage(msgId, data) {
    
    var msg ='';
    
    switch (msgId) {
      case 1:
        msg += '<div class="success">Slot with this date reserved!</div>';
        break;
      case 2:
        msg += '<div class="error">This slot is no longer available. Try different one</div>';
        break;
      case 3:
        msg += '<div class="info">Day: ' + dateToFormatedString(state.selectedDay) + '</div>';
        break;
      case 4:
        msg += '<div class="info">Slot: ' + dateToFormatedString(state.selectedSlot.date) + ' ' + convertSlotNo_to_label(state.selectedSlot.slotId) + '</div>';
        break;
      case 5:
        msg += '<div class="warning">Confirmation request is sent</div>';
        break;
    }
    
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
        
      }
      
    }, 5000)
    
  }
  
  // init();
  
  return {
    init: init,
  }
  
}());

document.getElementById("show-calendar").addEventListener('click', function (e) {
  CalendarCtrl.init();
})