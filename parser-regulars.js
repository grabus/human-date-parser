module.exports = ParserRegulars

function ParserRegulars (lang) {
    var obj = ParserRegularsLocales[lang] || ParserRegularsLocales['en']
    for (var prop in obj)
        if (obj.hasOwnProperty(prop))
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
    // we use /^[а-яА-Я0-9_]+/ instead of \w the same cause
    ru: {
        at:         'в',
        space:      /^([ \t]+)/,
        number:     /^(\d+)/,
        string:     /^[а-яА-Я0-9_]+/,
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
        evening:    /^вечер(ом|а)?(?=\s|$)/,
        afternoon:  /^днем(?=\s|$)/,
        morning:    /^утр(о|а|ом)(?=\s|$)/,
        tonight:    /^сегодня\sвечером(?=\s|$)/,
        next:       /^след(ующ(ая|ий|ие|ее))?/,
        last:       /^прошл(ый|ое|ая|ой|ым)/,
        ago:        /^назад(?=\s|$)/,

        // 5, 05, 5:30, 5.30, 05:30:10, 05:30.10, 05.30.10, в 5
        meridiem:   /^в?\s?(\d{1,2})([:.](\d{1,2}))?([:.](\d{1,2}))?\s*([ap]m)/,
        hourMinute: /^в?\s?(\d{1,2})([:.](\d{1,2}))([:.](\d{1,2}))?/,
        atHour:     /^в\s?(\d{1,2})\s?(час(ов|а)?)?/,

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
        meridiem:   /^(?:at)?\s?(\d{1,2})([:.](\d{1,2}))?([:.](\d{1,2}))?\s*([ap]m)/,
        hourMinute: /^(?:at)?\s?(\d{1,2})([:.](\d{1,2}))([:.](\d{1,2}))?/,
        atHour:     /^at\s?(\d{1,2})/,

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
