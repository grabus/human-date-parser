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

describe('минуты', function () {
  //it('10м', function () {
  //  var date = HumanDateParser(mon, 'ru').parse('10м');
  //  assert('1:40:00' == t(date));
  //  assert('5/13/13' == d(date));
  //});

  it('10мин', function () {
    var date = HumanDateParser(mon, 'ru').parse('10мин');
    assert('1:40:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('10 минут', function () {
    var date = HumanDateParser(mon, 'ru').parse('10 минут');
    assert('1:40:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('через 10 минут', function () {
    var date = HumanDateParser(mon, 'ru').parse('через 10 минут');
    assert('1:40:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('через 10 минут начиная с завтра', function () {
    var date = HumanDateParser(mon, 'ru').parse('через 10 минут начиная с завтра');
    assert('1:40:00' == t(date));
    assert('5/14/13' == d(date));
  });
});

/**
 * Hours
 */

describe('часы', function() {
  it('в 5 часов', function () {
    var date = HumanDateParser(mon, 'ru').parse('в 5 часов');
    assert('6:30:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('в 5am', function () {
    var date = HumanDateParser(mon, 'ru').parse('в 5am');
    assert('5:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('в 5pm', function () {
    var date = HumanDateParser(mon, 'ru').parse('в 5pm');
    assert('17:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('в5', function () {
    var date = HumanDateParser(mon, 'ru').parse('в5');
    assert('5:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('в 17', function () {
    var date = HumanDateParser(mon, 'ru').parse('в 17');
    assert('17:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('в 12:30', function () {
    var date = HumanDateParser(mon, 'ru').parse('в 12:30');
    assert('12:30:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('в 12.30', function () {
    var date = HumanDateParser(mon, 'ru').parse('в 12.30');
    assert('12:30:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('в 23:35', function () {
    var date = HumanDateParser(mon, 'ru').parse('в 23:35');
    assert('23:35:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('в 0:30', function () {
    var date = HumanDateParser(mon, 'ru').parse('в 0:30');
    assert('0:30:00' == t(date));
    assert('5/14/13' == d(date));
  });
});

/**
 * Days
 */

describe('дни', function () {
  it('через 2 дня', function () {
    var date = HumanDateParser(mon, 'ru').parse('через 2 дня');
    assert('1:30:00' == t(date));
    assert('5/15/13' == d(date));
  });

  it('через 2д', function () {
    var date = HumanDateParser(mon, 'ru').parse('через 2д');
    assert('1:30:00' == t(date));
    assert('5/15/13' == d(date));
  });
});

/**
 * Dates
 */

describe('даты', function () {
  it('во вторник в 9am', function () {
    var date = HumanDateParser(mon, 'ru').parse('во вторник в 9am');
    assert('9:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('в понедельник в 9am', function () {
    var date = HumanDateParser(mon, 'ru').parse('в понедельник в 9am');
    assert('9:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('Понедельник 9am', function () {
    var date = HumanDateParser(mon, 'ru').parse('Понедельник 9am');
    assert('9:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('в понедельник в 9', function () {
    var date = HumanDateParser(mon, 'ru').parse('в понедельник в 9');
    assert('9:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('в понедельник в 21', function () {
    var date = HumanDateParser(mon, 'ru').parse('в понедельник в 21');
    assert('21:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('в понедельник в 1:00am', function () {
    var date = HumanDateParser(mon, 'ru').parse('в понедельник в 1:00am');
    assert('1:00:00' == t(date));
    assert('5/20/13' == d(date));
  });

  it('в следующий понедельник в 1:00am', function () {
    var date = HumanDateParser(mon, 'ru').parse('в следующий понедельник в 1:00am');
    assert('1:00:00' == t(date));
    assert('5/20/13' == d(date));
  });

  it('в прошлый понедельник в 1:00am', function () {
    var date = HumanDateParser(mon, 'ru').parse('в прошлый понедельник в 1:00am');
    assert('1:00:00' == t(date));
    assert('5/6/13' == d(date));
  });
});

/**
 * Tomorrow
 */

describe('завтра', function () {
  it('завтра в 3pm', function () {
    var date = HumanDateParser(mon, 'ru').parse('завтра в 3pm');
    assert('15:00:00' == t(date));
    assert('5/14/13' == d(date));
  });
});

/**
 * Yesterday
 */

describe('вчера', function () {
  it('вчера в 3pm', function () {
    var date = HumanDateParser(mon, 'ru').parse('вчера в 3pm');
    assert('15:00:00' == t(date));
    assert('5/12/13' == d(date));
  });

  it('вчера в 15', function () {
    var date = HumanDateParser(mon, 'ru').parse('вчера в 15');
    assert('15:00:00' == t(date));
    assert('5/12/13' == d(date));
  });

  it('вчера в 12:30am', function () {
    var date = HumanDateParser(mon, 'ru').parse('вчера в 12:30am');
    assert('0:30:00' == t(date));
    assert('5/12/13' == d(date));
  });
});

/**
 * Tonight
 */

describe('сегодня вечером', function () {
  it('5pm сегодня вечером', function () {
    var date = HumanDateParser(mon, 'ru').parse('5pm сегодня вечером');
    assert('17:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('сегодня вечером в 5pm', function () {
    var date = HumanDateParser(mon, 'ru').parse('сегодня вечером в 5pm');
    assert('17:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('сегодня вечером в 5', function () {
    var date = HumanDateParser(mon, 'ru').parse('сегодня вечером в 5');
    assert('17:00:00' == t(date));
    assert('5/13/13' == d(date));
  });
});

/**
 * Midnight
 */
describe('полночь', function () {
  it('полночь', function () {
    var date = HumanDateParser(mon, 'ru').parse('полночь');

    assert('0:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('завтра в полночь', function () {
    var date = HumanDateParser(mon, 'ru').parse('завтра в полночь');
    assert('0:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('полночь (@ 1:30pm)', function () {
    var afternoon = new Date('May 13, 2013 13:30:00')
    var date = HumanDateParser(afternoon, 'ru').parse('полночь');
    assert('0:00:00' == t(date));
    assert('5/14/13' == d(date));
  });
});

/**
 * Noon
 */

describe('полдень', function () {
  it('полдень', function () {
    var date = HumanDateParser(mon, 'ru').parse('полдень');
    assert('12:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('завтра в полдень', function () {
    var date = HumanDateParser(mon, 'ru').parse('завтра в полдень');
    assert('12:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('полдень (@ 1:30pm)', function () {
    var afternoon = new Date('May 13, 2013 13:30:00')
    var date = HumanDateParser(afternoon, 'ru').parse('полдень');
    assert('12:00:00' == t(date));
    assert('5/14/13' == d(date));
  });
});

/**
 * Weeks
 */

describe('недели', function () {
  it('следующая неделя вторник', function () {
    var date = HumanDateParser(mon, 'ru').parse('следующая неделя вторник');
    assert('1:30:00' == t(date));
    assert('5/21/13' == d(date));
  });

  it('следующая нед вторник', function () {
    var date = HumanDateParser(mon, 'ru').parse('следующая нед вторник');
    assert('1:30:00' == t(date));
    assert('5/21/13' == d(date));
  });

  it('следующая неделя вторник в 4:30pm', function () {
    var date = HumanDateParser(mon, 'ru').parse('следующая неделя вторник в 4:30pm');
    assert('16:30:00' == t(date));
    assert('5/21/13' == d(date));
  });

  it('2 недели от среды', function () {
    var date = HumanDateParser(mon, 'ru').parse('2 недели от среды');
    assert('1:30:00' == t(date));
    assert('5/29/13' == d(date));
  });
});

/**
 * Night
 */

describe('ночь', function() {
  it('ночь', function () {
    var date = HumanDateParser(mon, 'ru').parse('ночь');
    assert('19:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('завтра ночью', function () {
    var date = HumanDateParser(mon, 'ru').parse('завтра ночью');
    assert('19:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('завтра ночью в 9', function () {
    var date = HumanDateParser(mon, 'ru').parse('завтра ночью в 9');
    assert('21:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('прошлой ночью', function () {
    var date = HumanDateParser(mon, 'ru').parse('прошлой ночью');
    assert('19:00:00' == t(date));
    assert('5/12/13' == d(date));
  });
})

/**
 * Evening
 */

describe('вечер', function() {
  it('вечер', function () {
    var date = HumanDateParser(mon, 'ru').parse('вечер');
    assert('17:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('завтра вечером', function () {
    var date = HumanDateParser(mon, 'ru').parse('завтра вечером');
    assert('17:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('завтра вечером в 9', function () {
    var date = HumanDateParser(mon, 'ru').parse('завтра вечером в 9');
    assert('21:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('прошлым вечером', function () {
    var date = HumanDateParser(mon, 'ru').parse('прошлым вечером');
    assert('17:00:00' == t(date));
    assert('5/12/13' == d(date));
  });
})

/**
 * Afternoon
 */

describe('днем', function() {
  it('днем', function () {
    var date = HumanDateParser(mon, 'ru').parse('днем');
    assert('14:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('завтра днем', function () {
    var date = HumanDateParser(mon, 'ru').parse('завтра днем');
    assert('14:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  // todo: I don't know how can I translate it
  //it('last afternoon', function () {
  //  var date = HumanDateParser(mon, 'ru').parse('last afternoon');
  //  assert('14:00:00' == t(date));
  //  assert('5/12/13' == d(date));
  //});
})

/**
 * Morning
 */

describe('утро', function() {
  it('утро', function () {
    var date = HumanDateParser(mon, 'ru').parse('утро');
    assert('8:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('завтра утром', function () {
    var date = HumanDateParser(mon, 'ru').parse('завтра утром');
    assert('8:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('прошлым утром', function () {
    var date = HumanDateParser(mon, 'ru').parse('прошлым утром');
    assert('8:00:00' == t(date));
    assert('5/12/13' == d(date));
  });

  it('этим утром в 9', function () {
    var date = HumanDateParser(mon, 'ru').parse('этим утром в 9');
    assert('9:00:00' == t(date));
    assert('5/13/13' == d(date));
  });
})

/**
 * Months
 */

describe('месяцы', function () {
  it('этот месяц', function () {
    var date = HumanDateParser(mon, 'ru').parse('этот месяц');
    assert('1:30:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('следующий месяц', function () {
    var date = HumanDateParser(mon, 'ru').parse('следующий месяц');
    assert('1:30:00' == t(date));
    assert('6/13/13' == d(date));
  });

  it('прошлый месяц', function () {
    var date = HumanDateParser(mon, 'ru').parse('прошлый месяц');
    assert('1:30:00' == t(date));
    assert('4/13/13' == d(date));
  });

  it('2 месяца от завтра', function () {
    var date = HumanDateParser(mon, 'ru').parse('2 месяца от завтра');
    assert('1:30:00' == t(date));
    assert('7/14/13' == d(date));
  });

  // todo: ???
  //it('2 monthes from tomorrow (misspelling)', function () {
  //  var date = HumanDateParser(mon, 'ru').parse('2 monthes from tomorrow');
  //  assert('1:30:00' == t(date));
  //  assert('7/14/13' == d(date));
  //});

  it('should handle months with less days', function () {
    var date = HumanDateParser(new Date('01/31/2011'), 'ru').parse('1 месяц');
    assert('2/28/11' == d(date))
  });

  it('should handle leap year', function () {
    var date = HumanDateParser(new Date('01/31/2012'), 'ru').parse('1 месяц');
    assert('2/29/12' == d(date));
  });

  it('завтра после полудня в 4:30pm 1 месяц спустя', function () {
    var date = HumanDateParser(mon, 'ru').parse('завтра после полудня в 4:30pm через 1 месяц');
    assert('16:30:00' == t(date));
    assert('6/14/13' == d(date));
  });
});

/**
 * Year
 */

describe('год', function() {
  it('этот год', function() {
    var date = HumanDateParser(mon, 'ru').parse('этот год');
    assert('1:30:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('следующий год', function () {
    var date = HumanDateParser(mon, 'ru').parse('следующий год');
    assert('1:30:00' == t(date));
    assert('5/13/14' == d(date));
  });

  it('прошлый год', function () {
    var date = HumanDateParser(mon, 'ru').parse('прошлый год');
    assert('1:30:00' == t(date));
    assert('5/13/12' == d(date));
  });

  it('2 года от вчера в 5pm', function () {
    var date = HumanDateParser(mon, 'ru').parse('2 года от вчера в 5pm');
    assert('17:00:00' == t(date));
    assert('5/12/15' == d(date));
  });

  // todo: we have todo for russian 'ago'
  //it('2 года назад', function() {
  //  var date = HumanDateParser(mon, 'ru').parse('2 года назад');
  //  assert('1:30:00' == t(date));
  //  assert('5/13/11' == d(date));
  //})
  //
  //it('2 года назад с завтра', function() {
  //  var date = HumanDateParser(mon, 'ru').parse('2 года назад с завтра');
  //  assert('1:30:00' == t(date));
  //  assert('5/14/11' == d(date));
  //})
});

/**
 * Dates in the past
 */

describe('даты в прошлом', function() {
  var past = new Date('May 13, 2013 18:00:00')

  // todo: полдень = днем
  it('завтра днем', function() {
    var date = HumanDateParser(past, 'ru').parse('завтра днем');
    assert('14:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('завтра днем в 3pm', function() {
    var date = HumanDateParser(past, 'ru').parse('завтра днем в 3pm');
    assert('15:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  // Need to place .nextTime() at the end

  it('3pm завтра днем', function () {
    var date = HumanDateParser(past, 'ru').parse('3pm завтра днем');
    assert('15:00:00' == t(date));
    assert('5/14/13' == d(date));
  });
});

/**
 * Times
 */
describe('время', function() {
  it('1:30', function () {
    var date = HumanDateParser(mon, 'ru').parse('1:30');
    assert('1:30:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('2:31', function () {
    var date = HumanDateParser(mon, 'ru').parse('2:31');
    assert('2:31:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('00:28', function () {
    // past time will result in tomorrow
    var date = HumanDateParser(mon, 'ru').parse('00:28');
    assert('0:28:00' == t(date));
    assert('5/14/13' == d(date));
  });
});

/**
 * Ignore other input
 */

describe('other inputs', function () {
  // todo: see last todo about ago
  //it('вчера, 2 года назад--.', function() {
  //  var date = HumanDateParser(mon, 'ru').parse('вчера, 2 года назад--.');
  //  assert('1:30:00' == t(date));
  //  assert('5/12/11' == d(date))
  //});

  it('invalid', function() {
    var date = HumanDateParser(mon, 'ru').parse('invalid');
    assert(false == date);
  });

  it('empty', function() {
    var date = HumanDateParser(mon, 'ru').parse('');
    //assert(d(mon) == d(date));
    assert(false == date);
  });
});

/**
 * Bug fixes
 */

describe('bug fixes', function () {
  it('в 12:30pm (fixes: #6)', function () {
    var after = new Date('May 13, 2013 13:30:00');
    var date = HumanDateParser(after, 'ru').parse('в 12:30pm');
    assert('12:30:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('в X утра (fixes: #36)', function() {
    var past = new Date('May 13, 2013 18:00:00')
    var date = HumanDateParser(past, 'ru').parse('завтра в 9 утра');
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
    var date = HumanDateParser('вчера в 12:30am', 'ru').parse('сегодня в 11am');

    assert(d(date) == d(today));
    assert('11:00:00' == t(date));
  });
});


/**
 * Support for dates with months
 */

describe('months (fixes: #10)', function (){
  var after = new Date('May 13, 2013 13:30:00');
  it('2 января', function () {
    var date = HumanDateParser(after, 'ru').parse('2 января 12:30');
    assert('12:30:00' == t(date));
    assert('1/2/13' == d(date));
  });

  it('1 марта', function () {
    var date = HumanDateParser(after, 'ru').parse('1 марта');
    assert('13:30:00' == t(date));
    assert('3/1/13' == d(date));
  });

  it('31 сентября 4:00am', function () {
    var date = HumanDateParser(after, 'ru').parse('31 сентября 4:00am');
    assert('4:00:00' == t(date));
    assert('9/31/13' != d(date));
    assert('9/30/13' == d(date));
  });

  it('1 января 4:00am', function(){
    var date = HumanDateParser(after, 'ru').parse('1 января 4:00am');
    assert('4:00:00' == t(date));
    assert('1/1/13' == d(date));
  })
});

/**
 * Support 'ago' modifier
 */

describe('support "ago" modifier (fixes: #20)', function (){
  var after = new Date('May 13, 2013 13:30:00');

  it('x секунд назад', function () {
    var date = HumanDateParser(after, 'ru').parse('10 секунд назад');
    assert('13:29:50' == t(date));
    assert('5/13/13' == d(date));
  });

  it('x минут назад', function () {
    var date = HumanDateParser(after, 'ru').parse('5 минут назад');
    assert('13:25:00' == t(date));
    assert('5/13/13' == d(date));
  });


  it('x минут назад (2)', function () {
    var date = HumanDateParser(after, 'ru').parse('1 минуту назад');
    assert('13:29:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('x часов назад', function () {
    var date = HumanDateParser(after, 'ru').parse('5 часов назад');
    assert('8:30:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('x дней назад', function () {
    var date = HumanDateParser(after, 'ru').parse('5 дней назад');
    assert('13:30:00' == t(date));
    assert('5/8/13' == d(date));
  });

  it('x недель назад', function () {
    var date = HumanDateParser(after, 'ru').parse('2 недель назад');
    assert('13:30:00' == t(date));
    assert('4/29/13' == d(date));
  });

  it('x месяцев назад', function () {
    var date = HumanDateParser(after, 'ru').parse('10 месяцев назад');
    assert('13:30:00' == t(date));
    assert('7/13/12' == d(date));
  });

  it('x лет назад', function () {
    var date = HumanDateParser(after, 'ru').parse('10 лет назад');
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
  //var d = date.toString();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = '' + date.getFullYear();
  return [month, day, year.slice(2)].join('/');
}
