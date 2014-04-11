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
     * @param {Number} h
     * @param {Number} m
     * @param {Number} s
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
