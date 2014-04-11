module.exports = HumanDateParser

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
     * @return {Object} token
     * @api private
     */

    peek: function () {
        return this.lookahead(1)
    },

    /**
     * Fetch next token including those stashed by peek.
     *
     * @return {Object} token
     * @api private
     */

    next: function () {
        return this.stashed() || this.advance()
    },

    /**
     * Return the next possibly stashed token.
     *
     * @return {Object} token
     * @api private
     */

    stashed: function () {
        return this.stash.shift()
    },

    /**
     * Consume the given `len`.
     *
     * @param {Number|Array} captures
     * @param {String} key
     * @api private
     */

    skip: function (captures, key) {
        this.str = this.str.substr(captures[0].length)

        if (key != 'other' && key != 'space')
            this.marks.push({
                key: key,
                value: captures[0],
                index: this.index,
                length: captures[0].length
            })

        this.index += captures[0].length
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
            this.skip(captures, 'space')
            return this.advance()
        }
    },

    /**
     * Second
     */

    second: function () {
        var captures
        if (captures = this.r.second.exec(this.str)) {
            this.skip(captures, 'second')
            return 'second'
        }
    },

    /**
     * Minute
     */

    minute: function () {
        var captures
        if (captures = this.r.minute.exec(this.str)) {
            this.skip(captures, 'minute')
            return 'minute'
        }
    },

    /**
     * Hour
     */

    hour: function () {
        var captures
        if (captures = this.r.hour.exec(this.str)) {
            this.skip(captures, 'hour')
            return 'hour'
        }
    },

    /**
     * Day
     */

    day: function () {
        var captures
        if (captures = this.r.day.exec(this.str)) {
            this.skip(captures, 'day')
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
                this.skip(captures, 'dayByName')
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
            this.skip(captures, 'monthByName')
            return captures[0]
        }
    },

    timeAgo: function () {
        var captures
        if (captures = this.r.findAgo(this.str)) {
            var num = captures[1]
            var mod = captures[2]
            this.date[mod](-num)
            this.skip(captures, 'timeAgo')
            return 'timeAgo'
        }
    },

    /**
     * Week
     */

    week: function () {
        var captures
        if (captures = this.r.week.exec(this.str)) {
            this.skip(captures, 'week')
            return 'week'
        }
    },

    /**
     * Month
     */

    month: function () {
        var captures
        if (captures = this.r.month.exec(this.str)) {
            this.skip(captures, 'month')
            return 'month'
        }
    },

    /**
     * Week
     */

    year: function () {
        var captures
        if (captures = this.r.year.exec(this.str)) {
            this.skip(captures, 'year')
            return 'year'
        }
    },

    /**
     * Meridiem am/pm
     */

    meridiem: function () {
        var captures
        if (captures = this.r.meridiem.exec(this.str)) {
            this.skip(captures, 'meridiem')
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
            this.skip(captures, 'hourminute')
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
            this.skip(captures, 'athour')
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
            this.skip(captures, 'yesterday')
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
            this.skip(captures, 'tomorrow')
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
            this.skip(captures, 'noon')
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
            this.skip(captures, 'midnight')
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
            this.skip(captures, 'night')
            this._meridiem = 'pm'
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
            this.skip(captures, 'evening')
            this._meridiem = 'pm'
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
            this.skip(captures, 'afternoon')
            this._meridiem = 'pm'

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
            this.skip(captures, 'morning')
            this._meridiem = 'am'
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
            this.skip(captures, 'tonight')
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
            this.skip(captures, 'next')
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
            this.skip(captures, 'last')
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
            this.skip(captures, 'ago')
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
            this.skip(captures, 'number')
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
            this.skip(captures, 'string')
            return 'string'
        }
    },

    /**
     * Other
     */

    other: function () {
        var captures
        if (captures = this.r.other.exec(this.str)) {
            this.skip(captures, 'other')
            return 'other'
        }
    }
}
