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
  date = new Date(date);
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
    today: today,
    selectedDay: selected,
    selectedSlot: null,
    confirmedSlot: null,
    messages:[],
    calendarOpen: true,
    days: null,
    min: min,
    max: max,
  };
  
  function selectDay(e) {
    
    if (e.target) {
      var date = new Date(e.target.getAttribute('data-date'));
      state.selectedDay = date;
      renderCalendar();
    }
    
    // console.log(elem);
    //
    // state.days.forEach(function (day) {
    //
    //   if ('day-' + new Date(day.date).getDate() === elem) {
    //     document.getElementById('slots-'+new Date(day.date).getDate()).classList.add('calendar__slot-container--active')
    //   } else {
    //     document.getElementById('slots-'+new Date(day.date).getDate()).classList.remove('calendar__slot-container--active');
    //   }
    //
    // });
    
  }
  
  function reserveSlot(e) {
    
    console.log('Reserve slot. Send AJAX request to...');
  
    // document.getElementById('confirm').classList.add('calendar__btn--disabled');
    document.getElementById('confirm').innerHTML = '<img src="./loading_spinner.gif" width="20" height="20"/>';
    
    // put loading spinner
    
    setTimeout(function () {
      
      if (Math.random() > .5) {
        dateReservationConfirmed(state.selectedSlot);
        
      } else {
        dateReservationRejected(state.selectedSlot);
        
      }
      
    }, 1000)
    
  }
  
  function dateReservationConfirmed() {
    state.confirmedSlot = state.selectedSlot;
    state.selectedSlot = null;
    state.calendarOpen = false;
    renderCalendar();
  }
  
  function dateReservationRejected() {
    state.selectedSlot = null;
    state.messages.push('<div class="error">Selected slot no longer avalible. ' +
        '<a href="#" id="calendar-reload">Reload</div>');
    renderCalendar();
    // getData();
  }
  
  function changeSlot() {
    state.calendarOpen = true;
    renderCalendar();
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
          if (new Date(state.selectedSlot.date).getDate() === new Date(slots[i].date).getDate()) {
            if (state.selectedSlot.slotId == slots[i].slotId) {
              checked = 'checked';
            }
          }
        }
        
        var slotUID = 'slot-' + new Date(slots[i].date).getDate() +'-' +slots[i].slotId;
        
        slotsStr += '<label class="timeslot-picker__item">' +
            '<input data-date="'+slots[i].date+'" data-slotId="' + slots[i].slotId +'" class="timeslot-picker__check" type="radio" name="timeslotradio" id="radio-' + slotUID + '" value="' +
            slots[i].slotId +
            '" '+ checked +'>' +
            '<span data-slotId="' + slots[i].slotId +
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
    
    var selectedDay = date || state.selectedDay;
    // selectedDay.setHours(0,0,0,0);
    
    var nextBtnClasses = '';
    var prevBtnClasses = '';
    
    if (selectedDay.getDate() >= max.getDate()) {
      nextBtnClasses += 'calendar__btn--disabled '
    }
  
    if (selectedDay.getDate() <= min.getDate()) {
      prevBtnClasses += 'calendar__btn--disabled '
    }
    
    var calendarTitleStr = convertDateToString(selectedDay);
    
    var calendarPrevBtn = '<div><a href="#" id="calendar-prev" class="calendar__btn '+prevBtnClasses+'">Prev</a></div>';
    var calendarNextBtn = '<div><a href="#" id="calendar-next" class="calendar__btn '+nextBtnClasses+'">Next</a></div>';
    var calendarTitle = '<div>' + calendarTitleStr + '</div>';
  
    var calendarHeader = '<div class="calendar__header">' + calendarPrevBtn + calendarTitle + calendarNextBtn + '</div>';
  
    document.getElementById('calendar').innerHTML = calendarHeader;
    
    var calendarDates = '<div class="calendar__days">{{days}}</div>';
    var days = '';
    
    state.days.forEach(function (day) {
      console.log(day);
      
      var classes = '';
  
      if (state.today.getDate() === new Date(day.date).getDate()) {
        classes += 'calendar__slot-container--today ';
      }
      
      classes += selectedDay.getDate() === new Date(day.date).getDate() ? 'calendar__week-day-number--selected ' : '';
  
      if (day.slots.length === 0) {
        classes += 'calendar__week-day-number--disabled '
      }
  
      days += '<div><div class="calendar__week-day-name '+classes+'">' +
          convertDayNumber_to_shortDayName(new Date(day.date).getDay()) +
          '</div><div data-date="'+ new Date(day.date) +'" class="calendar__week-day-number '+classes+'" id="day-' + new Date(day.date).getDate() + '">'+
          new Date(day.date).getDate() +'</div></div>'
      
    })
  
    calendarDates = calendarDates.replace('{{days}}', days);
  
    var calendarSlots = '<div class="calendar__slots">{{slots}}</div>';
    var slots = '';
    
    state.days.forEach(function (day) {
      
      var classes = '';
      
      if (state.selectedDay.getDate() === new Date(day.date).getDate()) {
        classes += 'calendar__slot-container--active';
      }
      
      slots += '<div class="calendar__slots-container '+classes+'" id="slots-'+ new Date(day.date).getDate() +'">'+renderSlots(day.slots)+'</div>';
    });
  
    calendarSlots = calendarSlots.replace('{{slots}}', slots);
    
    
    
    
    var calendarFooter = '<div class="calendar__footer">' +
        '<div id="messages" class="calendar__messages">{{messages}}</div>' +
        '<div>{{buttons}}</div></div>';
    
    var buttons = '';
    
    if (state.confirmedSlot && state.selectedSlot) {
      state.messages.push('<div class="info">New selected slot ' + convertDateToString(state.selectedSlot.date) + ' ' + convertSlotNo_to_label(state.selectedSlot.slotId) +'</div>')
      state.messages.push('<div class="info">Confirmed slot ' + convertDateToString(state.selectedSlot.date) + ' ' + convertSlotNo_to_label(state.selectedSlot.slotId) + '</div>')
      buttons += '<a href="#" class="calendar__btn" id="confirm">Confirm</a>';
    } else if (state.confirmedSlot ) {
      state.messages.push('<div class="info">Confirmed slot ' + convertDateToString(state.confirmedSlot.date) + ' ' + convertSlotNo_to_label(state.confirmedSlot.slotId)+'</div>')
      buttons += '<a href="#" class="calendar__btn" id="change">Change</a>';
    } else {
      if (state.selectedSlot) {
        state.messages.push('<div class="info">Selected slot ' + convertDateToString(state.selectedSlot.date) + ' ' + convertSlotNo_to_label(state.selectedSlot.slotId)+'</div>');
        state.messages.push('<div class="warning">You need to confirm it</div>');
        buttons += '<a href="#" class="calendar__btn" id="confirm">Confirm</a>';
      } else {
        state.messages.push('<div class="info">You need to select slot</div>');
        buttons += '<a href="#" class="calendar__btn calendar__btn--disabled" id="confirm">Confirm</a>';
      }
    }
    
    calendarFooter = calendarFooter.replace('{{buttons}}', buttons);
    
    var messageStr = '';
  
    if (state.messages.length > 0) {
      state.messages.forEach(function (msg) {
        messageStr += msg;
      })
    }
    
    calendarFooter = calendarFooter.replace('{{messages}}', messageStr);
    
    if (state.calendarOpen) {
      document.getElementById('calendar').innerHTML ='<div id="calendar-selected" class="open">' + calendarHeader + calendarDates + calendarSlots + '</div>' + calendarFooter;
    } else {
      document.getElementById('calendar').innerHTML ='<div id="calendar-selected" class="close">' + calendarHeader + calendarDates + calendarSlots + '</div>' + calendarFooter;
    }
    
    
    state.messages = [];
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
  
  function selectPrev(e) {
    e.preventDefault();
    if (e.target) {
      state.selectedDay.setDate(state.selectedDay.getDate() - 1);
      if (state.selectedDay < min) {
        state.selectedDay = new Date(state.days[0].date);
      }
      renderCalendar()
    }
  }
  
  function selectNext(e) {
    e.preventDefault();
    if (e.target) {
      state.selectedDay.setDate(state.selectedDay.getDate() + 1);
      if (state.selectedDay > max) {
        state.selectedDay = new Date(state.days[state.days.length - 1].date);
      }
      renderCalendar()
    }
  }
  
  function selectFirstAvailableSlot() {
    
    for (var i = 0; i < state.days.length; i++) {
      if (state.days[i].slots.length > 0) {
        state.selectedDay = new Date(state.days[i].date);
        state.selectedSlot = {
          date: state.days[i].slots[0].date,
          slotId: state.days[i].slots[0].slotId,
        }
        renderCalendar();
        break;
      }
    }
  }
  
  function getData() {
    
    document.getElementById('calendar').innerHTML = '<img src="./loading_spinner.gif" />';
    
    $.ajax({
      url: 'http://localhost:5000/slots',
      timeout: 2000 //2 second timeout
    }).done(function(data){
      
      state.days = data;
      selectFirstAvailableSlot();
      //renderCalendar();
      
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
  
    document.getElementById('calendar').addEventListener('change',function (e) {
      state.selectedSlot = {
        date: new Date(e.target.getAttribute('data-date')),
        slotId: e.target.getAttribute('data-slotId'),
      };
      renderCalendar();
    });
    
    document.getElementById('calendar').addEventListener('click',function (e) {
      console.log(e.target.getAttribute('id'));
      
      var buttonClicked = e.target.getAttribute('id');
      
      if (!buttonClicked) return;
      
      console.log('/day/',buttonClicked.search(/day/));
      console.log('/slot/',buttonClicked.search(/slot/));
      
      if ( buttonClicked === 'calendar-retry') {
        retry();
        
      } else if (buttonClicked === 'calendar-reload') {
        
        retry();
        
      } else if (buttonClicked.search(/day/) >= 0) {
        
        selectDay(e);
   
      } else if (buttonClicked.search(/slot/) >= 0) {
        
        // selectSlot();
        
      } else if (buttonClicked === 'calendar-next') {
        
        selectNext(e);
      } else if (buttonClicked === 'calendar-prev') {
        selectPrev(e);
      } else if (buttonClicked === 'confirm') {
        reserveSlot()
      }
      else if (buttonClicked === 'change') {
        changeSlot();
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
