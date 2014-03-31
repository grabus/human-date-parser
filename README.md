# HumanDateParser.js [![Build Status](https://travis-ci.org/grabus/human-date-parser.svg?branch=master)](https://travis-ci.org/grabus/human-date-parser)

HumanDateParser is an multi language date parser for the browser. For examples and demos, see: [http://grabus.github.io/human-date-parser/](http://grabus.github.io/human-date-parser/) (soon...)

## Installation

### In the browser:

#### Using bower:

    bower install grabus/human-date-parser

#### Standalone:

* development: [human-date-parser.js](https://raw.github.com/grabus/human-date-parser/master/build/human-date-parser.js)
* minified: [human-date-parser.min.js](https://raw.github.com/grabus/human-date-parser/master/build/human-date-parser.min.js)

## Examples

```js
HumanDateParser('10 minutes from now').parse()
HumanDateParser('in 5 hours').parse()
HumanDateParser('at 5pm').parse()
HumanDateParser('at 12:30').parse()
HumanDateParser('at 23:35').parse()
HumanDateParser('in 2 days').parse()
HumanDateParser('tuesday at 9am').parse()
HumanDateParser('monday at 1:00am').parse()
HumanDateParser('last monday at 1:00am').parse()
HumanDateParser('tomorrow at 3pm').parse()
HumanDateParser('yesterday at 12:30am').parse()
HumanDateParser('5pm tonight').parse()
HumanDateParser('tomorrow at noon').parse()
HumanDateParser('next week tuesday').parse()
HumanDateParser('next week tuesday at 4:30pm').parse()
HumanDateParser('2 weeks from wednesday').parse()
HumanDateParser('tomorrow night at 9').parse()
HumanDateParser('tomorrow afternoon').parse()
HumanDateParser('this morning at 9').parse()
HumanDateParser('2 years from yesterday at 5pm').parse()
HumanDateParser('last month').parse()
HumanDateParser('tomorrow afternoon at 4:30pm 1 month from now').parse()

HumanDateParser('at 12:30').parse()
HumanDateParser('at 12.30').parse()
HumanDateParser('tuesday at 9').parse()
HumanDateParser('tomorrow at 15').parse()
```

## API

### HumanDateParser(string[, offset[, language]]).parse()

Create a `Date` from a `string`. You may also supply an optional `offset` to the starting date. `offset` defaults to the current date and time.
Language can be `en` or `ru`, feel free to add new languages.

## Tests

To run the tests, you'll need node.js:

    npm install
    grunt


## License

(The MIT License)

Copyright (c) 2014 Grabov Alexey <grabovalex@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
