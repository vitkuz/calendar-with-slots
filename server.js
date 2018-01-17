const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const chalk = require('chalk');
const path = require('path');

const cookieParser = require('cookie-parser')
const session = require('express-session');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

/**
 * Express configuration.
 */

app.use(express.static('public'));

app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 5000);

app.use(cors());
app.use(cookieParser());

app.use('/slots', (req,res,next) => {
  
  var randomTimeResponse = Math.random() * 5000;
  var response = [];
  
  setTimeout(function () {
    
    var today = new Date();
    today.setHours(0,0,0,0);
    
    var day = today.getDate();
    var month = today.getMonth();
    var week = today.getDay(); // ==> 5
    var year = today.getFullYear();
    
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
  
    res.json(response);
    
  }, randomTimeResponse);
  
  
});

/**
 * Error Handler.
 */
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  if (err.status === 404) {
    res.json('404', { title: 'Page Not Found'});
  } else {
    res.send(err.message);
  }
  
});

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;