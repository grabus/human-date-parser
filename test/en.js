/**
 * Module Dependencies
 */

var HumanDateParser = require('../human-date-parser');
var assert = require('better-assert');

/**
 * Some predefined dates
 */

var mon = new Date('May 13, 2013 01:30:00');

/**
 * Test parser
 */

/**
 * Minutes
 */

describe('minutes', function () {
  it('10m', function () {
    var date = HumanDateParser('10m', mon, 'en').parse();
    assert('1:40:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('10min', function () {
    var date = HumanDateParser('10min', mon, 'en').parse();
    assert('1:40:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('10 minutes', function () {
    var date = HumanDateParser('10 minutes', mon, 'en').parse();
    assert('1:40:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('10 minutes from now', function () {
    var date = HumanDateParser('10 minutes from now', mon, 'en').parse();
    assert('1:40:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('10 minutes starting tomorrow', function () {
    var date = HumanDateParser('10 minutes starting tomorrow', mon, 'en').parse();
    assert('1:40:00' == t(date));
    assert('5/14/13' == d(date));
  });
});

/**
 * Hours
 */

describe('hours', function() {
  it('in 5 hours', function () {
    var date = HumanDateParser('in 5 hours', mon, 'en').parse();
    assert('6:30:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('at 5am', function () {
    var date = HumanDateParser('5am', mon, 'en').parse();
    assert('5:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('at 5pm', function () {
    var date = HumanDateParser('5pm', mon, 'en').parse();
    assert('17:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('at5', function () {
    var date = HumanDateParser('at5', mon, 'en').parse();
    assert('5:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('at 17', function () {
    var date = HumanDateParser('at 17', mon, 'en').parse();
    assert('17:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('at 12:30', function () {
    var date = HumanDateParser('at 12:30', mon, 'en').parse();
    assert('12:30:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('at 12.30', function () {
    var date = HumanDateParser('at 12.30', mon, 'en').parse();
    assert('12:30:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('at 23:35', function () {
    var date = HumanDateParser('at 23:35', mon, 'en').parse();
    assert('23:35:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('at 0:30', function () {
    var date = HumanDateParser('at 0:30', mon, 'en').parse();
    assert('0:30:00' == t(date));
    assert('5/14/13' == d(date));
  });
});

/**
 * Days
 */

describe('days', function () {
  it('in 2 days', function () {
    var date = HumanDateParser('in 2 days', mon, 'en').parse();
    assert('1:30:00' == t(date));
    assert('5/15/13' == d(date));
  });

  it('in 2d', function () {
    var date = HumanDateParser('in 2d', mon, 'en').parse();
    assert('1:30:00' == t(date));
    assert('5/15/13' == d(date));
  });
});

/**
 * Dates
 */

describe('dates', function () {
  it('tuesday at 9am', function () {
    var date = HumanDateParser('tuesday at 9am', mon, 'en').parse();
    assert('9:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('monday at 9am', function () {
    var date = HumanDateParser('monday at 9am', mon, 'en').parse();
    assert('9:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('Monday at 9am', function () {
    var date = HumanDateParser('Monday at 9am', mon, 'en').parse();
    assert('9:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('monday at 9', function () {
    var date = HumanDateParser('monday at 9', mon, 'en').parse();
    assert('9:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('monday at 21', function () {
    var date = HumanDateParser('monday at 21', mon, 'en').parse();
    assert('21:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('monday at 1:00am', function () {
    var date = HumanDateParser('monday at 1:00am', mon, 'en').parse();
    assert('1:00:00' == t(date));
    assert('5/20/13' == d(date));
  });

  it('next monday at 1:00am', function () {
    var date = HumanDateParser('next monday at 1:00am', mon, 'en').parse();
    assert('1:00:00' == t(date));
    assert('5/20/13' == d(date));
  });

  it('last monday at 1:00am', function () {
    var date = HumanDateParser('last monday at 1:00am', mon, 'en').parse();
    assert('1:00:00' == t(date));
    assert('5/6/13' == d(date));
  });
});

/**
 * Tomorrow
 */

describe('tomorrow', function () {
  it('tomorrow at 3pm', function () {
    var date = HumanDateParser('tomorrow at 3pm', mon, 'en').parse();
    assert('15:00:00' == t(date));
    assert('5/14/13' == d(date));
  });
});

/**
 * Yesterday
 */

describe('yesterday', function () {
  it('yesterday at 3pm', function () {
    var date = HumanDateParser('yesterday at 3pm', mon, 'en').parse();
    assert('15:00:00' == t(date));
    assert('5/12/13' == d(date));
  });

  it('yesterday at 15', function () {
    var date = HumanDateParser('yesterday at 15', mon, 'en').parse();
    assert('15:00:00' == t(date));
    assert('5/12/13' == d(date));
  });

  it('yesterday at 12:30am', function () {
    var date = HumanDateParser('yesterday at 12:30am', mon, 'en').parse();
    assert('0:30:00' == t(date));
    assert('5/12/13' == d(date));
  });
});

/**
 * Tonight
 */

describe('tonight', function () {
  it('5pm tonight', function () {
    var date = HumanDateParser('5pm tonight', mon, 'en').parse();
    assert('17:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('tonight at 5pm', function () {
    var date = HumanDateParser('tonight at 5pm', mon, 'en').parse();
    assert('17:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('tonight at 5', function () {
    var date = HumanDateParser('tonight at 5', mon, 'en').parse();
    assert('17:00:00' == t(date));
    assert('5/13/13' == d(date));
  });
});

/**
 * Midnight
 */
describe('mightnight', function () {
  it('midnight', function () {
    var date = HumanDateParser('midnight', mon, 'en').parse();

    assert('0:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('tomorrow at midnight', function () {
    var date = HumanDateParser('tomorrow at midnight', mon, 'en').parse();
    assert('0:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('midnight (@ 1:30pm)', function () {
    var afternoon = new Date('May 13, 2013 13:30:00')
    var date = HumanDateParser('midnight', afternoon, 'en').parse();
    assert('0:00:00' == t(date));
    assert('5/14/13' == d(date));
  });
});

/**
 * Noon
 */

describe('noon', function () {
  it('noon', function () {
    var date = HumanDateParser('noon', mon, 'en').parse();
    assert('12:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('tomorrow at noon', function () {
    var date = HumanDateParser('tomorrow at noon', mon, 'en').parse();
    assert('12:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('noon (@ 1:30pm)', function () {
    var afternoon = new Date('May 13, 2013 13:30:00')
    var date = HumanDateParser('noon', afternoon, 'en').parse();
    assert('12:00:00' == t(date));
    assert('5/14/13' == d(date));
  });
});

/**
 * Weeks
 */

describe('weeks', function () {
  it('next week tuesday', function () {
    var date = HumanDateParser('next week tuesday', mon, 'en').parse();
    assert('1:30:00' == t(date));
    assert('5/21/13' == d(date));
  });

  it('next wk tuesday', function () {
    var date = HumanDateParser('next week tuesday', mon, 'en').parse();
    assert('1:30:00' == t(date));
    assert('5/21/13' == d(date));
  });

  it('next week tuesday at 4:30pm', function () {
    var date = HumanDateParser('next week tuesday at 4:30pm', mon, 'en').parse();
    assert('16:30:00' == t(date));
    assert('5/21/13' == d(date));
  });

  it('2 weeks from wednesday', function () {
    var date = HumanDateParser('2 weeks from wednesday', mon, 'en').parse();
    assert('1:30:00' == t(date));
    assert('5/29/13' == d(date));
  });
});

/**
 * Night
 */

describe('night', function() {
  it('night', function () {
    var date = HumanDateParser('night', mon, 'en').parse();
    assert('19:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('tomorrow night', function () {
    var date = HumanDateParser('tomorrow night', mon, 'en').parse();
    assert('19:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('tomorrow night at 9', function () {
    var date = HumanDateParser('tomorrow night at 9', mon, 'en').parse();
    assert('21:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('last night', function () {
    var date = HumanDateParser('last night', mon, 'en').parse();
    assert('19:00:00' == t(date));
    assert('5/12/13' == d(date));
  });
})

/**
 * Evening
 */

describe('evening', function() {
  it('evening', function () {
    var date = HumanDateParser('evening', mon, 'en').parse();
    assert('17:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('tomorrow evening', function () {
    var date = HumanDateParser('tomorrow evening', mon, 'en').parse();
    assert('17:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('tomorrow evening at 9', function () {
    var date = HumanDateParser('tomorrow evening at 9', mon, 'en').parse();
    assert('21:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('last evening', function () {
    var date = HumanDateParser('last evening', mon, 'en').parse();
    assert('17:00:00' == t(date));
    assert('5/12/13' == d(date));
  });
})

/**
 * Afternoon
 */

describe('afternoon', function() {
  it('afternoon', function () {
    var date = HumanDateParser('afternoon', mon, 'en').parse();
    assert('14:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('tomorrow afternoon', function () {
    var date = HumanDateParser('tomorrow afternoon', mon, 'en').parse();
    assert('14:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('last afternoon', function () {
    var date = HumanDateParser('last afternoon', mon, 'en').parse();
    assert('14:00:00' == t(date));
    assert('5/12/13' == d(date));
  });
})

/**
 * Morning
 */

describe('morning', function() {
  it('morning', function () {
    var date = HumanDateParser('morning', mon, 'en').parse();
    assert('8:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('tomorrow morning', function () {
    var date = HumanDateParser('tomorrow morning', mon, 'en').parse();
    assert('8:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('last morning', function () {
    var date = HumanDateParser('last morning', mon, 'en').parse();
    assert('8:00:00' == t(date));
    assert('5/12/13' == d(date));
  });

  it('this morning at 9', function () {
    var date = HumanDateParser('this morning at 9', mon, 'en').parse();
    assert('9:00:00' == t(date));
    assert('5/13/13' == d(date));
  });
})

/**
 * Months
 */

describe('months', function () {
  it('this month', function () {
    var date = HumanDateParser('this month', mon, 'en').parse();
    assert('1:30:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('next month', function () {
    var date = HumanDateParser('next month', mon, 'en').parse();
    assert('1:30:00' == t(date));
    assert('6/13/13' == d(date));
  });

  it('last month', function () {
    var date = HumanDateParser('last month', mon, 'en').parse();
    assert('1:30:00' == t(date));
    assert('4/13/13' == d(date));
  });

  it('2 months from tomorrow', function () {
    var date = HumanDateParser('2 months from tomorrow', mon, 'en').parse();
    assert('1:30:00' == t(date));
    assert('7/14/13' == d(date));
  });

  it('2 monthes from tomorrow (misspelling)', function () {
    var date = HumanDateParser('2 monthes from tomorrow', mon, 'en').parse();
    assert('1:30:00' == t(date));
    assert('7/14/13' == d(date));
  });

  it('should handle months with less days', function () {
    var date = HumanDateParser('1 month', new Date('01/31/2011'), 'en').parse();
    assert('2/28/11' == d(date))
  });

  it('should handle leap year', function () {
    var date = HumanDateParser('1 month', new Date('01/31/2012'), 'en').parse();
    assert('2/29/12' == d(date));
  });

  it('tomorrow afternoon at 4:30pm 1 month from now', function () {
    var date = HumanDateParser('tomorrow afternoon at 4:30pm 1 month from now', mon, 'en').parse();
    assert('16:30:00' == t(date));
    assert('6/14/13' == d(date));
  });
});

/**
 * Year
 */

describe('year', function() {
  it('this year', function() {
    var date = HumanDateParser('year', mon, 'en').parse();
    assert('1:30:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('next year', function () {
    var date = HumanDateParser('next year', mon, 'en').parse();
    assert('1:30:00' == t(date));
    assert('5/13/14' == d(date));
  });

  it('last year', function () {
    var date = HumanDateParser('last year', mon, 'en').parse();
    assert('1:30:00' == t(date));
    assert('5/13/12' == d(date));
  });

  it('2 years from yesterday at 5pm', function () {
    var date = HumanDateParser('2 years from yesterday at 5pm', mon, 'en').parse();
    assert('17:00:00' == t(date));
    assert('5/12/15' == d(date));
  });

  it('2 years ago', function() {
    var date = HumanDateParser('2 years ago', mon, 'en').parse();
    assert('1:30:00' == t(date));
    assert('5/13/11' == d(date));
  })

  it('2 years ago tomorrow', function() {
    var date = HumanDateParser('2 years ago tomorrow', mon, 'en').parse();
    assert('1:30:00' == t(date));
    assert('5/14/11' == d(date));
  })
});

/**
 * Dates in the past
 */

describe('dates in the past', function() {
  var past = new Date('May 13, 2013 18:00:00')

  it('tomorrow afternoon', function() {
    var date = HumanDateParser('tomorrow afternoon', past, 'en').parse();
    assert('14:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('tomorrow afternoon at 3pm', function() {
    var date = HumanDateParser('tomorrow afternoon at 3pm', past, 'en').parse();
    assert('15:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  // Need to place .nextTime() at the end

  it('3pm tomorrow afternoon', function () {
    var date = HumanDateParser('3pm tomorrow afternoon', past, 'en').parse();
    assert('15:00:00' == t(date));
    assert('5/14/13' == d(date));
  });
});

/**
 * Times
 */
describe('times', function() {
  it('1:30', function () {
    var date = HumanDateParser('1:30', mon, 'en').parse();
    assert('1:30:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('2:31', function () {
    var date = HumanDateParser('2:31', mon, 'en').parse();
    assert('2:31:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('00:28', function () {
    // past time will result in tomorrow
    var date = HumanDateParser('00:28', mon, 'en').parse();
    assert('0:28:00' == t(date));
    assert('5/14/13' == d(date));
  });
});

/**
 * Ignore other input
 */

describe('other inputs', function () {
  it('yesterday, 2 years ago--.', function() {
    var date = HumanDateParser('yesterday, 2 years ago--.', mon, 'en').parse();
    assert('1:30:00' == t(date));
    assert('5/12/11' == d(date))
  });

  it('invalid', function() {
    var date = HumanDateParser('invalid', mon, 'en').parse();
    assert(d(mon) == d(date));
  });

  it('empty', function() {
    var date = HumanDateParser('', mon, 'en').parse();
    assert(false == date);
  });
});

/**
 * Bug fixes
 */

describe('bug fixes', function () {
  it('at 12:30pm (fixes: #6)', function () {
    var after = new Date('May 13, 2013 13:30:00');
    var date = HumanDateParser('at 12:30pm', after, 'en').parse();
    assert('12:30:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('at X in the morning (fixes: #36)', function() {
    var past = new Date('May 13, 2013 18:00:00')
    var date = HumanDateParser('tomorrow at 9 in the morning', past, 'en').parse();
    assert('9:00:00' == t(date));
    assert('5/14/13' == d(date));
  })
});

/**
 * If context is a string parse it as date
 */

describe('parse context if its a string (fixes: #38)', function () {
  it('string context', function () {
    var today = new Date();
    today.setDate(today.getDate() - 1);
    var date = HumanDateParser('today at 11am', 'yesterday at 12:30am', 'en').parse();

    assert(d(date) == d(today));
    assert('11:00:00' == t(date));
  });
});


/**
 * Support for dates with months
 */

describe('months (fixes: #10)', function (){
  var after = new Date('May 13, 2013 13:30:00');
  it('2nd of January', function () {
    var date = HumanDateParser('2nd of January 12:30', after, 'en').parse();
    assert('12:30:00' == t(date));
    assert('1/2/13' == d(date));
  });

  it('1st of March', function () {
    var date = HumanDateParser('1st of March', after, 'en').parse();
    assert('13:30:00' == t(date));
    assert('3/1/13' == d(date));
  });

  it('31st of September 4:00am', function () {
    var date = HumanDateParser('31st of September 4:00am', after, 'en').parse();
    assert('4:00:00' == t(date));
    assert('9/31/13' != d(date));
    assert('9/30/13' == d(date));
  });

  it('1st of January 4:00am', function(){
    var date = HumanDateParser('1st of January 4:00am', after, 'en').parse();
    assert('4:00:00' == t(date));
    assert('1/1/13' == d(date));
  })
});

/**
 * Support 'ago' modifier
 */

describe('support "ago" modifier (fixes: #20)', function (){
  var after = new Date('May 13, 2013 13:30:00');

  it('x seconds ago', function () {
    var date = HumanDateParser('10 seconds ago', after, 'en').parse();
    assert('13:29:50' == t(date));
    assert('5/13/13' == d(date));
  });

  it('x minutes ago', function () {
    var date = HumanDateParser('5 minutes ago', after, 'en').parse();
    assert('13:25:00' == t(date));
    assert('5/13/13' == d(date));
  });


  it('x minute ago', function () {
    var date = HumanDateParser('1 minutes ago', after, 'en').parse();
    assert('13:29:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('x hours ago', function () {
    var date = HumanDateParser('5 hours ago', after, 'en').parse();
    assert('8:30:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('x days ago', function () {
    var date = HumanDateParser('5 day ago', after, 'en').parse();
    assert('13:30:00' == t(date));
    assert('5/8/13' == d(date));
  });

  it('x week ago', function () {
    var date = HumanDateParser('2 week ago', after, 'en').parse();
    assert('13:30:00' == t(date));
    assert('4/29/13' == d(date));
  });

  it('x months ago', function () {
    var date = HumanDateParser('10 months ago', after, 'en').parse();
    assert('13:30:00' == t(date));
    assert('7/13/12' == d(date));
  });

  it('x year ago', function () {
    var date = HumanDateParser('10 year ago', after, 'en').parse();
    assert('13:30:00' == t(date));
    assert('5/13/03' == d(date));
  });

});


/**
 * Time helper function
 */

function t(date) {
  var t = date.toTimeString().split(' ')[0];
  t = ('0' == t[0]) ? t.slice(1) : t;
  return t;
}

/**
 * Date helper function
 */

function d(date) {
  var d = date.toString();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = '' + date.getFullYear();
  return [month, day, year.slice(2)].join('/');
}
