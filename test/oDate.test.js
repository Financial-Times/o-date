/*global describe, it*/
'use strict';

var expect = require('expect.js');

var oDate = require('./../src/js/oDate');

describe('oDate', function() {

  describe('.format', function() {
    it('silently fails when given an invalid date', function() {
      expect(oDate.format('not a date')).to.be.undefined;
    });

    it('formats dates using standard formats', function() {
      var date = new Date(2000, 5, 15, 6, 37, 22, 499);
      var expected = 'June 15, 2000 6:37 am';
      var isoDate = date.toISOString();

      expect(oDate.format(date)).to.be(expected);
      expect(oDate.format(isoDate)).to.be(expected);
      expect(oDate.format(date, 'datetime')).to.be(expected);
      expect(oDate.format(date, 'date')).to.be(expected.replace(' 6:37 am', ''));
      // testing padding
      expect(oDate.format(new Date(2000, 5, 15, 6, 7), 'datetime')).to.be('June 15, 2000 6:07 am');
    });

    it('formats dates using custom formats', function() {
      var date = new Date(2000, 1, 5, 6, 7, 22, 499);

      expect(oDate.format(date, 'yyyy yy')).to.be('2000 00');
      expect(oDate.format(date, 'MMMM MMM MM M')).to.be('February Feb 02 2');
      expect(oDate.format(date, 'EEEE EEE')).to.be('Saturday Sat');
      expect(oDate.format(date, 'd dd')).to.be('5 05');
      expect(oDate.format(date, 'h hh')).to.be('6 06');
      expect(oDate.format(date, 'm mm')).to.be('7 07');
      expect(oDate.format(date, 'a')).to.be('am');
      expect(oDate.format(date, 'This is \\a co\\mmon string mm')).to.be('This is a common string 07');
    });

    it('formats hours', function() {
      var date;

      date = new Date(2000, 1, 5, 0, 7, 22, 499);
      expect(oDate.format(date, 'h')).to.be('12');
      expect(oDate.format(date, 'hh')).to.be('12');
      expect(oDate.format(date, 'H')).to.be('0');
      expect(oDate.format(date, 'HH')).to.be('00');

      date = new Date(2000, 1, 5, 1, 7, 22, 499);
      expect(oDate.format(date, 'h')).to.be('1');
      expect(oDate.format(date, 'hh')).to.be('01');
      expect(oDate.format(date, 'H')).to.be('1');
      expect(oDate.format(date, 'HH')).to.be('01');

      date = new Date(2000, 1, 5, 10, 7, 22, 499);
      expect(oDate.format(date, 'h')).to.be('10');
      expect(oDate.format(date, 'hh')).to.be('10');
      expect(oDate.format(date, 'H')).to.be('10');
      expect(oDate.format(date, 'HH')).to.be('10');

      date = new Date(2000, 1, 5, 12, 7, 22, 499);
      expect(oDate.format(date, 'h')).to.be('12');
      expect(oDate.format(date, 'hh')).to.be('12');
      expect(oDate.format(date, 'H')).to.be('12');
      expect(oDate.format(date, 'HH')).to.be('12');

      date = new Date(2000, 1, 5, 13, 7, 22, 499);
      expect(oDate.format(date, 'h')).to.be('1');
      expect(oDate.format(date, 'hh')).to.be('01');
      expect(oDate.format(date, 'H')).to.be('13');
      expect(oDate.format(date, 'HH')).to.be('13');

      date = new Date(2000, 1, 5, 23, 7, 22, 499);
      expect(oDate.format(date, 'h')).to.be('11');
      expect(oDate.format(date, 'hh')).to.be('11');
      expect(oDate.format(date, 'H')).to.be('23');
      expect(oDate.format(date, 'HH')).to.be('23');
    })
  });

  describe('.timeAgo', function() {
    it('silently fails when given an invalid date', function() {
      expect(oDate.timeAgo('not a date')).to.be.undefined;
    });

    function secondsInMilliseconds(i) {
      return i * 1000
    }

    var oneSecond = secondsInMilliseconds(1);
    var twoSeconds = secondsInMilliseconds(2);
    var fourtyFiveSeconds = secondsInMilliseconds(45);
    var ninetySeconds = secondsInMilliseconds(90);
    var fourtyFiveMinutes = secondsInMilliseconds(45 * 60);
    var ninetyMinutes = secondsInMilliseconds(90 * 60);
    var twentyTwoHours = secondsInMilliseconds(22 * 60 * 60);
    var thirtySixHours = secondsInMilliseconds(36 * 60 * 60);
    var twentyFiveDays = secondsInMilliseconds(25 * 60 * 60 * 24);
    var fourtyFiveDays = secondsInMilliseconds(45 * 60 * 60 * 24);
    var threeHundredFourtyFiveDays = secondsInMilliseconds(345 * 60 * 60 * 24);
    var fiveHundredFourtySevenDays = secondsInMilliseconds(547 * 60 * 60 * 24);

    describe('lower bounds', function() {
      it('displays human-friendly timestamps', function() {
        expect(oDate.timeAgo(Date.now() - twoSeconds)).to.be('2 seconds ago');
        expect(oDate.timeAgo(Date.now() - fourtyFiveSeconds)).to.be('a minute ago');
        expect(oDate.timeAgo(Date.now() - ninetySeconds)).to.be('2 minutes ago');
        expect(oDate.timeAgo(Date.now() - fourtyFiveMinutes)).to.be('an hour ago');
        expect(oDate.timeAgo(Date.now() - ninetyMinutes)).to.be('2 hours ago');
        expect(oDate.timeAgo(Date.now() - twentyTwoHours)).to.be('a day ago');
        expect(oDate.timeAgo(Date.now() - thirtySixHours)).to.be('2 days ago');
        expect(oDate.timeAgo(Date.now() - twentyFiveDays)).to.be('a month ago');
        expect(oDate.timeAgo(Date.now() - fourtyFiveDays)).to.be('2 months ago');
        expect(oDate.timeAgo(Date.now() - threeHundredFourtyFiveDays)).to.be('a year ago');
        expect(oDate.timeAgo(Date.now() - fiveHundredFourtySevenDays)).to.be('2 years ago');
      });
    });

    describe('higher bounds', function() {
      it('displays human-friendly timestamps', function() {
        expect(oDate.timeAgo(Date.now() - (fourtyFiveSeconds - oneSecond))).to.be('44 seconds ago');
        expect(oDate.timeAgo(Date.now() - (ninetySeconds - oneSecond))).to.be('a minute ago');
        expect(oDate.timeAgo(Date.now() - (fourtyFiveMinutes - oneSecond))).to.be('45 minutes ago');
        expect(oDate.timeAgo(Date.now() - (ninetyMinutes - oneSecond))).to.be('an hour ago');
        expect(oDate.timeAgo(Date.now() - (twentyTwoHours - oneSecond))).to.be('22 hours ago');
        expect(oDate.timeAgo(Date.now() - (thirtySixHours - oneSecond))).to.be('a day ago');
        expect(oDate.timeAgo(Date.now() - (twentyFiveDays - oneSecond))).to.be('25 days ago');
        expect(oDate.timeAgo(Date.now() - (fourtyFiveDays - oneSecond))).to.be('a month ago');
        expect(oDate.timeAgo(Date.now() - (threeHundredFourtyFiveDays - oneSecond))).to.be('11 months ago');
        expect(oDate.timeAgo(Date.now() - (fiveHundredFourtySevenDays - oneSecond))).to.be('a year ago');
      });
    });
  });

  describe('instantiation', function() {
    it('assigns correct prototype', function() {
      var date = new oDate.ODate();
      expect(Object.getPrototypeOf(date)).to.be(oDate.ODate.prototype);
    });

    it('assigns correct constructor', function() {
      var date = new oDate.ODate();
      expect(date.constructor).to.be(oDate.ODate);
    });

    describe('finding element', function() {
      it('assigns the first element that has the attribute \'data-o-component\' with value \'o-date\' to el', function() {
        var d = document.createElement('div');
        d.setAttribute('data-o-component', 'o-date');
        document.body.appendChild(d);
        var date = new oDate.ODate(d);
        expect(date.el).to.be(d);
        document.body.removeChild(d);
      });

      it('searches from document\'s body by default if no selector/element is passed', function() {
        var d = document.createElement('div');
        d.setAttribute('data-o-component', 'o-date');
        document.body.appendChild(d);
        var date = new oDate.ODate();
        expect(date.el).to.be(d);
        document.body.removeChild(d);
      });

      it('searches from the dom node that is passed in', function() {
        var d = document.createElement('div');
        d.setAttribute('data-o-component', 'o-date');
        document.body.appendChild(d);
        var date = new oDate.ODate(d);
        expect(date.el).to.be(d);
        document.body.removeChild(d);
      });

      it('searches from the first dom node that the passed in selector corresponds to', function() {
        var d = document.createElement('div');
        d.setAttribute('data-o-component', 'o-date');
        var c = document.createElement('div');
        c.setAttribute('data-o-component', 'o-date');

        document.body.appendChild(d);
        document.body.appendChild(c);
        var date = new oDate.ODate('[data-o-component~=o-date]');
        expect(date.el).to.be(d);
        expect(date.el).to.not.be(c);
        document.body.removeChild(d);
        document.body.removeChild(c);
      });

      it('adds human-friendly text to the element\'s text-node, which represents the elements datetime', function() {
        describe('dates over a year ago', function() {
          it('display human-friendly absolute timestamp', function() {
            var d = document.createElement('time');
            d.setAttribute('data-o-component', 'o-date');
            d.setAttribute('datetime', '2000-06-14T23:00:00.000Z');
            document.body.appendChild(d);
            var date = new oDate.ODate(d);
            expect(d.textContent).to.be('June 15, 2000');
          });
        });

        describe('dates under a year ago', function() {
          it('displays a human-friendly relative timestamp', function() {
            var e = document.createElement('time');
            e.setAttribute('data-o-component', 'o-date');
            e.setAttribute('datetime', new Date(Date.now() - (1000 * 60 * 5)).toISOString());
            document.body.appendChild(e);
            var date = new oDate.ODate(e);
            expect(e.textContent).to.be('5 minutes ago');

            var f = document.createElement('time');
            f.setAttribute('data-o-component', 'o-date');
            document.body.appendChild(f);
            var date = new oDate.ODate(f);
            expect(f.textContent).to.be('0 seconds ago');
          });
        });
      })

    });
  });
});
