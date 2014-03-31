/**
 * if node
 */

if (typeof module == 'undefined')
    var module = {}

module.exports = ParserDate

/**
 * Time constants
 */

var _second = 1000
var _minute = 60 * _second
var _hour = 60 * _minute
var _day = 24 * _hour
var _week = 7 * _day
var _year = 56 * _week
var _daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

/**
 * Initialize `ParserDate`
 *
 * @param {Date} offset (optional)
 * @return {Date|ParserDate}
 * @api public
 */

function ParserDate (offset) {
    if (!(this instanceof ParserDate)) return new ParserDate(offset)
    this._changed = {}
    this.date = new Date(offset)
}

/**
 * Clone the current date
 */

ParserDate.prototype = {
    clone: function () {
        return new Date(this.date)
    },

    /**
     * Has changed
     *
     * @param {String} str
     * @return {Boolean}
     */

    changed: function (str) {
        if (this._changed[str] === undefined) return false
        return this._changed[str]
    },

    /**
     * add or subtract seconds
     *
     * @param {Number} n
     * @return {ParserDate}
     */

    second: function (n) {
        var seconds = +n * _second
        this.update(seconds)
        this._changed['seconds'] = true
        return this
    },

    /**
     * add or subtract minutes
     *
     * @param {Number} n
     * @return {ParserDate}
     */

    minute: function (n) {
        var minutes = +n * _minute
        this.update(minutes)
        this._changed['minutes'] = true
        return this
    },

    /**
     * add or subtract hours
     *
     * @param {Number} n
     * @return {ParserDate}
     */

    hour: function (n) {
        var hours = +n * _hour
        this.update(hours)
        this._changed['hours'] = true
        return this
    },

    /**
     * add or subtract days
     *
     * @param {Number} n
     * @return {ParserDate}
     */

    day: function (n) {
        var days = +n * _day
        this.update(days)
        this._changed['days'] = true
        return this
    },

    /**
     * add or subtract weeks
     *
     * @param {Number} n
     * @return {ParserDate}
     */

    week: function (n) {
        var weeks = +n * _week
        this.update(weeks)
        this._changed['weeks'] = true
        return this
    },

    /**
     * add or subtract months
     *
     * @param {Number} n
     * @return {ParserDate}
     */

    month: function (n) {
        var d = this.date
        var day = d.getDate()
        d.setDate(1)
        var month = +n + d.getMonth()
        d.setMonth(month)

        // Handle dates with less days
        var dim = this.daysInMonth(month)
        d.setDate(Math.min(dim, day))
        return this
    },

    /**
     * get the days in the month
     */

    daysInMonth: function (m) {
        var dim = _daysInMonth[m]
        var leap = leapyear(this.date.getFullYear())
        return (1 == m && leap) ? 29 : 28
    },

    /**
     * add or subtract years
     *
     * @param {Number} n
     * @return {ParserDate}
     */

    year: function (n) {
        var yr = this.date.getFullYear()
        yr += +n
        this.date.setFullYear(yr)
        this._changed['years'] = true
        return this
    },

    /**
     * Set the time
     *
     * @param {String} h
     * @param {String} m
     * @param {String} s
     * @return {ParserDate}
     */

    time: function (h, m, s, meridiem) {
        if (h === false) {
            h = this.date.getHours()
        } else {
            h = +h || 0
            this._changed['hours'] = h
        }

        if (m === false) {
            m = this.date.getMinutes()
        } else {
            m = +m || 0
            this._changed['minutes'] = m
        }

        if (s === false) {
            s = this.date.getSeconds()
        } else {
            s = +s || 0
            this._changed['seconds'] = s
        }

        this.date.setHours(h, m, s)
        return this
    },

    /**
     * go to day of week
     *
     * @param {Number} d
     * @param {Number} n
     * @return {ParserDate}
     */

    updateDay: function (d, n) {
        n = +(n || 1)
        var diff = (d - this.date.getDay() + 7) % 7
        if (n > 0) --n
        diff += (7 * n)
        this.update(diff * _day)
        return this
    },

    /**
     * Update the date
     *
     * @param {Number} ms
     * @return {ParserDate}
     * @api private
     */

    update: function (ms) {
        this.date = new Date(this.date.getTime() + ms)
        return this
    }
}

/**
 * Dynamically create day functions (sunday(n), monday(n), etc.)
 */

var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
days.forEach(function (day, i) {
    ParserDate.prototype[days[i]] = function (n) {
        this._changed['days'] = true
        this.updateDay(i, n)
    }
})

/**
 * leap year
 *
 * @param {Number} yr
 * @return {Boolean}
 */

function leapyear (yr) {
    return (yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0
}

/**
 * if node
 */

if (typeof module !== 'undefined')
    module.exports = ParserRegulars


function ParserRegulars (lang) {
    var obj = ParserRegularsLocales[lang] || ParserRegularsLocales['en']
    for(var prop in obj)
        this[prop] = obj[prop]
}

ParserRegulars.prototype = {
    // do not translate it
    dayMod: /\b(morning|noon|afternoon|night|evening|midnight)\b/,
    pastTest: function (string) {
        return this.past.some(function(item) {
            return item.r.test(string)
        })
    },
    weekDaysTest: function (string) {
        return this.weekDays.some(function(item) {
            return new RegExp(item.r).test(string)
        })
    },
    findMonths: function (string) {
        for (var i = 0, il = this.months.length; i < il; i++ ) {
            var month = this.months[i], captures
            if (captures = month.r.exec(string)) {
                return [captures[0], captures[2], month.name]
            }
        }
    },
    findAgo: function (string) {
        for (var i = 0, il = this.agos.length; i < il; i++ ) {
            var ago = this.agos[i], captures
            if (captures = ago.r.exec(string)) {
                return [captures[0], captures[1], ago.name]
            }
        }
    }
}


var ParserRegularsLocales = {
    // we use /(?:^|\s)( ... )(?=\s|$)/ instead of /b because unicode
    // http://stackoverflow.com/questions/2881445/utf-8-word-boundary-regex-in-javascript
    ru: {
        at:         'в',
        space:      /^([ \t]+)/,
        number:     /^(\d+)/,
        string:     /^\w+/,
        other:      /^./,
        second:     /^сек(унд(а|ы|у)?)/,
        minute:     /^мин(ут(а|у)?)?/,
        hour:       /^ч(ас|асов)?/,
        day:        /^д(ень|ня|ней)?/,
        week:       /^нед(ел(я|и|ь))?/,
        month:      /^месяц(ев|а)?(?=\s|$)/,
        year:       /^(г(од(а|у|ами)?)?|лет)/,
        yesterday:  /^вчера/,
        tomorrow:   /^завтра/,
        noon:       /^полдень(?=\s|$)/,
        midnight:   /^полночь(?=\s|$)/,
        night:      /^ночь(ю)?(?=\s|$)/,
        evening:    /^вечер(ом)?(?=\s|$)/,
        afternoon:  /^днем(?=\s|$)/,
        morning:    /^утр(о|а|ом)(?=\s|$)/,
        tonight:    /^сегодня\sвечером(?=\s|$)/,
        next:       /^след(ующ(ая|ий|ие|ее))?/,
        last:       /^прошл(ый|ое|ая|ой|ым)/,
        ago:        /^назад(?=\s|$)/,

        // 5, 05, 5:30, 5.30, 05:30:10, 05:30.10, 05.30.10, в 5
        meridiem:   /^(\d{1,2})([:.](\d{1,2}))?([:.](\d{1,2}))?\s*([ap]m)/,
        hourMinute: /^(\d{1,2})([:.](\d{1,2}))([:.](\d{1,2}))?/,
        atHour:     /^в\s?(\d{1,2})$/,

        past: [
            { name: 'last',      r: /(?:^|\s)(прошл(ый|ое|ая|ой|ым))(?=\s|$)/ },
            { name: 'yesterday', r: /(?:^|\s)(вчера)(?=\s|$)/                 },
            { name: 'ago',       r: /(?:^|\s)(назад)(?=\s|$)/                 }
        ],

        weekDays: [
            { name: 'sunday',    r: '(?:^|\\s)(вс|воскресень(е|я|ю|и))(?=\\s|$)'  },
            { name: 'monday',    r: '(?:^|\\s)(пн|понедельник(а|у|и)?)(?=\\s|$)'  },
            { name: 'tuesday',   r: '(?:^|\\s)(вт|вторник(а|у|и)?)(?=\\s|$)'      },
            { name: 'wednesday', r: '(?:^|\\s)(ср|сред(а|у|ы)?)(?=\\s|$)'         },
            { name: 'thursday',  r: '(?:^|\\s)(чт|четверг(у|а|и)?)(?=\\s|$)'      },
            { name: 'friday',    r: '(?:^|\\s)(пт|пятниц(а|у|е|ы)?)(?=\\s|$)'     },
            { name: 'saturday',  r: '(?:^|\\s)(сб|суббот(а|у|е|ы)?)(?=\\s|$)'     }
        ],

        months: [
            { name: 'january',   r: /^(\d{1,2})\s(январ(ь|я|е|ю))/   },
            { name: 'february',  r: /^(\d{1,2})\s(феврал(ь|я|е|ю))/  },
            { name: 'march',     r: /^(\d{1,2})\s(март(а|е)?)/       },
            { name: 'april',     r: /^(\d{1,2})\s(апрел(ь|я|е|ю))/   },
            { name: 'may',       r: /^(\d{1,2})\s(ма(й|я|е))/        },
            { name: 'june',      r: /^(\d{1,2})\s(июн(ь|я|е|ю))/     },
            { name: 'july',      r: /^(\d{1,2})\s(июл(ь|я|е|ю))/     },
            { name: 'august',    r: /^(\d{1,2})\s(август(а|е)?)/     },
            { name: 'september', r: /^(\d{1,2})\s(сентябр(ь|я|е|ю))/ },
            { name: 'october',   r: /^(\d{1,2})\s(октябр(ь|я|е|ю))/  },
            { name: 'november',  r: /^(\d{1,2})\s(ноябр(ь|я|е|ю))/   },
            { name: 'december',  r: /^(\d{1,2})\s(декабр(ь|я|е|ю))/  }
        ],
        // we are redefining method because regulars are differ in russian
        findMonths: function (string) {
            for (var i = 0, il = this.months.length; i < il; i++ ) {
                var month = this.months[i], captures
                if (captures = month.r.exec(string)) {
                    return [captures[0], captures[1], month.name]
                }
            }
        },

        agos: [
            { name: 'second',    r: /^(\d*)\s?(?:^|\s)(секунд(а|ы|у)?)(?=\s|$)\s?назад$/ },
            { name: 'minute',    r: /^(\d*)\s?(?:^|\s)(минут(а|ы|у)?)(?=\s|$)\s?назад$/  },
            { name: 'hour',      r: /^(\d*)\s?(?:^|\s)(час(ов|а)?)(?=\s|$)\s?назад$/     },
            { name: 'day',       r: /^(\d*)\s?(?:^|\s)(день|дня|дней)(?=\s|$)\s?назад$/  },
            { name: 'week',      r: /^(\d*)\s?(?:^|\s)(недел(я|и|ь|ю))(?=\s|$)\s?назад$/ },
            { name: 'month',     r: /^(\d*)\s?(?:^|\s)(месяц(а|ев)?)(?=\s|$)\s?назад$/   },
            { name: 'year',      r: /^(\d*)\s?(?:^|\s)(год(а)?|лет)(?=\s|$)\s?назад$/    }
        ]
    },

    en: {
        at:         'at',
        space:      /^([ \t]+)/,
        number:     /^(\d+)/,
        string:     /^\w+/,
        other:      /^./,
        second:     /^s(ec|econd)?s?/,
        minute:     /^m(in|inute)?s?/,
        hour:       /^h(r|our)s?/,
        day:        /^d(ay)?s?/,
        week:       /^w(k|eek)s?/,
        month:      /^mon(th)?(es|s)?\b/,
        year:       /^y(r|ear)s?/,
        yesterday:  /^(yes(terday)?)/,
        tomorrow:   /^tom(orrow)?/,
        noon:       /^noon\b/,
        midnight:   /^midnight\b/,
        night:      /^night\b/,
        evening:    /^evening\b/,
        afternoon:  /^afternoon\b/,
        morning:    /^morning\b/,
        tonight:    /^tonight\b/,
        next:       /^next/,
        last:       /^last/,
        ago:        /^ago\b/,

        // 5, 05, 5:30, 5.30, 05:30:10, 05:30.10, 05.30.10, at 5
        meridiem:   /^(\d{1,2})([:.](\d{1,2}))?([:.](\d{1,2}))?\s*([ap]m)/,
        hourMinute: /^(\d{1,2})([:.](\d{1,2}))([:.](\d{1,2}))?/,
        atHour:     /^at\s?(\d{1,2})$/,

        past: [
            { name: 'last',      r: /\b(last)\b/      },
            { name: 'yesterday', r: /\b(yesterday)\b/ },
            { name: 'ago',       r: /\b(ago)\b/       }
        ],

        weekDays: [
            { name: 'sunday',    r: '\\b(sun(day)?)s?\\b'     },
            { name: 'monday',    r: '\\b(mon(day)?)s?\\b'     },
            { name: 'tuesday',   r: '\\b(tues(day)?)s?\\b'    },
            { name: 'wednesday', r: '\\b(wed(nesday)?)s?\\b'  },
            { name: 'thursday',  r: '\\b(thur(sday|s)?)s?\\b' },
            { name: 'friday',    r: '\\b(fri(day)?)s?\\b'     },
            { name: 'saturday',  r: '\\b(sat(urday)?)s?\\b'   }
        ],

        months: [
            { name: 'january',   r: /^((\d{1,2})(st|nd|rd|th))\sof\s(january)/   },
            { name: 'february',  r: /^((\d{1,2})(st|nd|rd|th))\sof\s(february)/  },
            { name: 'march',     r: /^((\d{1,2})(st|nd|rd|th))\sof\s(march)/     },
            { name: 'april',     r: /^((\d{1,2})(st|nd|rd|th))\sof\s(april)/     },
            { name: 'may',       r: /^((\d{1,2})(st|nd|rd|th))\sof\s(may)/       },
            { name: 'june',      r: /^((\d{1,2})(st|nd|rd|th))\sof\s(june)/      },
            { name: 'july',      r: /^((\d{1,2})(st|nd|rd|th))\sof\s(july)/      },
            { name: 'august',    r: /^((\d{1,2})(st|nd|rd|th))\sof\s(august)/    },
            { name: 'september', r: /^((\d{1,2})(st|nd|rd|th))\sof\s(september)/ },
            { name: 'october',   r: /^((\d{1,2})(st|nd|rd|th))\sof\s(october)/   },
            { name: 'november',  r: /^((\d{1,2})(st|nd|rd|th))\sof\s(november)/  },
            { name: 'december',  r: /^((\d{1,2})(st|nd|rd|th))\sof\s(december)/  }
        ],

        agos: [
            { name: 'second',    r: /^(\d*)\s?\b(second)[s]?\b\s?ago$/ },
            { name: 'minute',    r: /^(\d*)\s?\b(minute)[s]?\b\s?ago$/ },
            { name: 'hour',      r: /^(\d*)\s?\b(hour)[s]?\b\s?ago$/   },
            { name: 'day',       r: /^(\d*)\s?\b(day)[s]?\b\s?ago$/    },
            { name: 'week',      r: /^(\d*)\s?\b(week)[s]?\b\s?ago$/   },
            { name: 'month',     r: /^(\d*)\s?\b(month)[s]?\b\s?ago$/  },
            { name: 'year',      r: /^(\d*)\s?\b(year)[s]?\b\s?ago$/   }
        ]
    }
}

/**
 * if node
 */

if (typeof module !== 'undefined')
    module.exports = HumanDateParser

if (typeof require != 'undefined') {
    var ParserDate = require('./parser-date')
    var ParserRegulars = require('./parser-regulars')
}

// todo: make build system with grunt
// todo: fix or remove docs


/**
 * Initialize `HumanDateParser`
 *
 * @param {String} str
 * @return {Boolean|Date|HumanDateParser}
 * @api public
 */

function HumanDateParser (str, offset, lang) {
    if (!(this instanceof HumanDateParser)) return new HumanDateParser(str, offset, lang)
    this.r = new ParserRegulars(lang)
    if (typeof offset == 'string') offset = new HumanDateParser(offset, null, lang).parse()
    this.d = offset || new Date
    this.date = new ParserDate(this.d)
    this.original = str
    this.str = str.toLowerCase()
    this.stash = []
    this.tokens = []
}

HumanDateParser.prototype = {
    parse: function () {
        while (this.advance() !== 'eos');
        this.nextTime(this.d)
        if (this.date.date == this.d) throw new Error('Invalid date')
        var foundDate = !this.tokens.every(function (token) {
            return token == 'other' || token == 'eos'
        })
        if (!foundDate) return false
        return this.date.date
    },

    /**
     * Days
     * it needs for month.indexOf('march')
     */

    months: ['january', 'february', 'march', 'april', 'may',
        'june', 'july', 'august', 'september',
        'october', 'november', 'december'],

    /**
     * Advance a token
     */

    advance: function () {
        var tok = this.eos()
            || this.space()
            || this._next()
            || this.last()
            || this.dayByName()
            || this.monthByName()
            || this.timeAgo()
            || this.ago()
            || this.yesterday()
            || this.tomorrow()
            || this.noon()
            || this.midnight()
            || this.night()
            || this.evening()
            || this.afternoon()
            || this.morning()
            || this.tonight()
            || this.meridiem()
            || this.hourminute()
            || this.athour()
            || this.week()
            || this.month()
            || this.year()
            || this.second()
            || this.minute()
            || this.hour()
            || this.day()
            || this.number()
            || this.string()
            || this.other()

        this.tokens.push(tok)
        return tok
    },

    /**
     * Lookahead `n` tokens.
     *
     * @param {Number} n
     * @return {Object}
     * @api private
     */

    lookahead: function (n) {
        var fetch = n - this.stash.length
        if (fetch == 0) return this.lookahead(++n)
        while (fetch-- > 0) this.stash.push(this.advance())
        return this.stash[--n]
    },

    /**
     * Lookahead a single token.
     *
     * @return {Token}
     * @api private
     */

    peek: function () {
        return this.lookahead(1)
    },

    /**
     * Fetch next token including those stashed by peek.
     *
     * @return {Token}
     * @api private
     */

    next: function () {
        return this.stashed() || this.advance()
    },

    /**
     * Return the next possibly stashed token.
     *
     * @return {Token}
     * @api private
     */

    stashed: function () {
        return this.stash.shift()
    },

    /**
     * Consume the given `len`.
     *
     * @param {Number|Array} len
     * @api private
     */

    skip: function (len) {
        this.str = this.str.substr(Array.isArray(len) ? len[0].length : len)
    },

    /**
     * EOS
     */

    eos: function () {
        if (this.str.length) return
        return 'eos'
    },

    /**
     * Space
     */

    space: function () {
        var captures
        if (captures = this.r.space.exec(this.str)) {
            this.skip(captures)
            return this.advance()
        }
    },

    /**
     * Second
     */

    second: function () {
        var captures
        if (captures = this.r.second.exec(this.str)) {
            this.skip(captures)
            return 'second'
        }
    },

    /**
     * Minute
     */

    minute: function () {
        var captures
        if (captures = this.r.minute.exec(this.str)) {
            this.skip(captures)
            return 'minute'
        }
    },

    /**
     * Hour
     */

    hour: function () {
        var captures
        if (captures = this.r.hour.exec(this.str)) {
            this.skip(captures)
            return 'hour'
        }
    },

    /**
     * Day
     */

    day: function () {
        var captures
        if (captures = this.r.day.exec(this.str)) {
            this.skip(captures)
            return 'day'
        }
    },

    /**
     * Day by name
     */

    dayByName: function () {
        for (var i = 0; i < this.r.weekDays.length; i++) {
            var item = this.r.weekDays[i], captures
            var re = new RegExp('^' + item.r)
            if (captures = re.exec(this.str)) {
                var day = item.name
                this.skip(captures)
                this.date[day](1)
                return day
            }
        }
    },

    /**
     * Month by name
     */

    monthByName: function () {
        var captures
        if (captures = this.r.findMonths(this.str)) {
            var day = captures[1]
            var month = captures[2]
            this.date.date.setMonth((this.months.indexOf(month)))
            if (day) this.date.date.setDate(parseInt(day) - 1)
            this.skip(captures)
            return captures[0]
        }
    },

    timeAgo: function () {
        var captures
        if (captures = this.r.findAgo(this.str)) {
            var num = captures[1]
            var mod = captures[2]
            this.date[mod](-num)
            this.skip(captures)
            return 'timeAgo'
        }
    },

    /**
     * Week
     */

    week: function () {
        var captures
        if (captures = this.r.week.exec(this.str)) {
            this.skip(captures)
            return 'week'
        }
    },

    /**
     * Month
     */

    month: function () {
        var captures
        if (captures = this.r.month.exec(this.str)) {
            this.skip(captures)
            return 'month'
        }
    },

    /**
     * Week
     */

    year: function () {
        var captures
        if (captures = this.r.year.exec(this.str)) {
            this.skip(captures)
            return 'year'
        }
    },

    /**
     * Meridiem am/pm
     */

    meridiem: function () {
        var captures
        if (captures = this.r.meridiem.exec(this.str)) {
            this.skip(captures)
            this.time(captures[1], captures[3], captures[5], captures[6])
            return 'meridiem'
        }
    },

    /**
     * Hour Minute (ex. 12:30)
     */

    hourminute: function () {
        var captures
        if (captures = this.r.hourMinute.exec(this.str)) {
            this.skip(captures)
            this.time(captures[1], captures[3], captures[5])
            return 'hourminute'
        }
    },

    /**
     * At Hour (ex. at 5)
     */

    athour: function () {
        var captures
        if (captures = this.r.atHour.exec(this.str)) {
            this.skip(captures)
            this.time(captures[1], 0, 0, this._meridiem)
            this._meridiem = null
            return 'athour'
        }
    },

    /**
     * Time set helper
     */

    time: function (h, m, s, meridiem) {
        var d = this.date
        var before = d.clone()

        if (meridiem) {
            // convert to 24 hour
            h = ('pm' == meridiem && 12 > h) ? +h + 12 : h // 6pm => 18
            h = ('am' == meridiem && 12 == h) ? 0 : h // 12am => 0
        }

        m = (!m && d.changed('minutes')) ? false : m
        s = (!s && d.changed('seconds')) ? false : s
        d.time(h, m, s)
    },

    /**
     * Best attempt to pick the next time this date will occur
     *
     * TODO: place at the end of the parsing
     */

    nextTime: function (before) {
        var d = this.date
        var orig = this.original
        if (before <= d.date || this.r.pastTest(orig)) return this

        // If time is in the past, we need to guess at the next time
        if (this.r.weekDaysTest(orig)) d.day(7)
        else if ((before - d.date) / 1000 > 60) d.day(1)

        return this
    },

    /**
     * Yesterday
     */

    yesterday: function () {
        var captures
        if (captures = this.r.yesterday.exec(this.str)) {
            this.skip(captures)
            this.date.day(-1)
            return 'yesterday'
        }
    },

    /**
     * Tomorrow
     */

    tomorrow: function () {
        var captures
        if (captures = this.r.tomorrow.exec(this.str)) {
            this.skip(captures)
            this.date.day(1)
            return 'tomorrow'
        }
    },

    /**
     * Noon
     */

    noon: function () {
        var captures
        if (captures = this.r.noon.exec(this.str)) {
            this.skip(captures)
            var before = this.date.clone()
            this.date.date.setHours(12, 0, 0)
            return 'noon'
        }
    },

    /**
     * Midnight
     */

    midnight: function () {
        var captures
        if (captures = this.r.midnight.exec(this.str)) {
            this.skip(captures)
            var before = this.date.clone()
            this.date.date.setHours(0, 0, 0)
            return 'midnight'
        }
    },

    /**
     * Night (arbitrarily set at 7pm)
     * todo: russian night is much later than 19:00
     */

    night: function () {
        var captures
        if (captures = this.r.night.exec(this.str)) {
            this.skip(captures)
            this._meridiem = 'pm'
            var before = this.date.clone()
            this.date.date.setHours(19, 0, 0)
            return 'night'
        }
    },

    /**
     * Evening (arbitrarily set at 5pm)
     */

    evening: function () {
        var captures
        if (captures = this.r.evening.exec(this.str)) {
            this.skip(captures)
            this._meridiem = 'pm'
            var before = this.date.clone()
            this.date.date.setHours(17, 0, 0)
            return 'evening'
        }
    },

    /**
     * Afternoon (arbitrarily set at 2pm)
     */

    afternoon: function () {
        var captures
        if (captures = this.r.afternoon.exec(this.str)) {
            this.skip(captures)
            this._meridiem = 'pm'
            var before = this.date.clone()

            if (this.date.changed('hours'))
                return 'afternoon'

            this.date.date.setHours(14, 0, 0)
            return 'afternoon'
        }
    },


    /**
     * Morning (arbitrarily set at 8am)
     */

    morning: function () {
        var captures
        if (captures = this.r.morning.exec(this.str)) {
            this.skip(captures)
            this._meridiem = 'am'
            var before = this.date.clone()
            if (!this.date.changed('hours')) this.date.date.setHours(8, 0, 0)
            return 'morning'
        }
    },

    /**
     * Tonight
     */

    tonight: function () {
        var captures
        if (captures = this.r.tonight.exec(this.str)) {
            this.skip(captures)
            this._meridiem = 'pm'
            return 'tonight'
        }
    },

    /**
     * Next time
     */

    _next: function () {
        var captures
        if (captures = this.r.next.exec(this.str)) {
            this.skip(captures)
            var d = new Date(this.date.date)
            var mod = this.peek()

            // If we have a defined modifier, then update
            if (this.date[mod]) {
                this.next()
                // slight hack to modify already modified
                this.date = ParserDate(d)
                this.date[mod](1)
            } else if (this.r.dayMod.test(mod)) {
                this.date.day(1)
            }

            return 'next'
        }
    },

    /**
     * Last time
     */

    last: function () {
        var captures
        if (captures = this.r.last.exec(this.str)) {
            this.skip(captures)
            var d = new Date(this.date.date)
            var mod = this.peek()

            // If we have a defined modifier, then update
            if (this.date[mod]) {
                this.next()
                // slight hack to modify already modified
                this.date = ParserDate(d)
                this.date[mod](-1)
            } else if (this.r.dayMod.test(mod)) {
                this.date.day(-1)
            }

            return 'last'
        }
    },

    /**
     * Ago
     */

    ago: function () {
        var captures
        if (captures = this.r.ago.exec(this.str)) {
            this.skip(captures)
            return 'ago'
        }
    },

    /**
     * Number
     */

    number: function () {
        var captures
        if (captures = this.r.number.exec(this.str)) {
            var n = captures[1]
            this.skip(captures)
            var mod = this.peek()

            // If we have a defined modifier, then update
            if (this.date[mod]) {
                if ('ago' == this.peek()) n = -n
                this.date[mod](n)
            } else if (this._meridiem) {
                // when we don't have meridiem, possibly use context to guess
                this.time(n, 0, 0, this._meridiem)
                this._meridiem = null
            } else if (this.original.indexOf(this.r.at) > -1) {
                this.time(n, 0, 0, this._meridiem)
                this._meridiem = null
            }

            return 'number'
        }
    },

    /**
     * String
     */

    string: function () {
        var captures
        if (captures = this.r.string.exec(this.str)) {
            this.skip(captures)
            return 'string'
        }
    },

    /**
     * Other
     */

    other: function () {
        var captures
        if (captures = this.r.other.exec(this.str)) {
            this.skip(captures)
            return 'other'
        }
    }
}
