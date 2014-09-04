'use strict';

var jsdom = require('jsdom');
var test = require("tape").test;
var oDate = require('../main');//.readFileSync("../main.js", "utf-8");

test('formatting dates using standard formats', function (t) {
    var date = new Date(2000, 5, 15, 6, 37, 22, 499);
    var expected = 'June 15, 2000 6:37 am';
    var isoDate = date.toISOString();
    
    t.plan(5);
    t.equal(oDate.format(date), expected);
    t.equal(oDate.format(isoDate), expected);
    t.equal(oDate.format(date, 'datetime'), expected);
    t.equal(oDate.format(date, 'date'), expected.replace(' 6:37 am', ''));
    // testing padding
    t.equal(oDate.format(new Date(2000, 5, 15, 6, 7), 'datetime'), 'June 15, 2000 6:07 am');
});

test('formatting dates using custom formats', function (t) {
    var date = new Date(2000, 1, 5, 6, 7, 22, 499);
    
    t.plan(8);

    t.equal(oDate.format(date, 'yyyy yy'), '2000 00'); 
    t.equal(oDate.format(date, 'MMMM MMM MM M'), 'February Feb 02 2');
    t.equal(oDate.format(date, 'EEEE EEE'), 'Saturday Sat');
    t.equal(oDate.format(date, 'd dd'), '5 05');
    t.equal(oDate.format(date, 'h hh'), '6 06');
    t.equal(oDate.format(date, 'm mm'), '7 07');
    t.equal(oDate.format(date, 'a'), 'am');
    t.equal(oDate.format(date, 'This is \\a co\\mmon string mm'), 'This is a common string 07');
});

test('getting time ago', function (t) {
    var formatsLow = {
        '2 seconds ago': 2,
        'A minute ago': 45,
        '2 minutes ago': 90,
        'An hour ago': 45 * 60,
        '2 hours ago': 90 * 60,
        'A day ago': 22 * 60 * 60,
        '2 days ago': 36 * 60 * 60,
        'A month ago': 25 * 60 * 60 * 24,
        '2 months ago': 45 * 60 * 60 * 24,
        'A year ago': 345 * 60 * 60 * 24,
        '2 years ago': 547 * 60 * 60 * 24,
    };
    var formatsHigh = {
        '44 seconds ago': (45) - 1,
        'A minute ago': (90) - 1,
        '45 minutes ago': (45 * 60) - 1,
        'An hour ago': (90 * 60) - 1,
        '22 hours ago': (22 * 60 * 60) - 1,
        'A day ago': (36 * 60 * 60) - 1,
        '25 days ago': (25 * 60 * 60 * 24) - 1,
        'A month ago': (45 * 60 * 60 * 24) - 1,
        '11 months ago': (345 * 60 * 60 * 24) - 1,
        'A year ago': (547 * 60 * 60 * 24) - 1,
    };
    t.plan(Object.keys(formatsLow).length + Object.keys(formatsHigh).length);

    Object.keys(formatsLow).forEach(function (format) {
        var date = new Date();
        date = date - (formatsLow[format] * 1000);
        t.equal(oDate.timeAgo(date), format);
    });

    Object.keys(formatsHigh).forEach(function (format) {
        var date = new Date();
        date = date - (formatsHigh[format] * 1000);
        t.equal(oDate.timeAgo(date), format);
    });
});


// Commented out as can't get jsdom to exit
// May need to set up a proper test harness and trun in phantomjs... grrr!!!
// test('writing to the DOM', function (t) {

//     var date1 = new Date((new Date()) - (new Date(50 * 24 * 60 * 60 * 1000)));
//     var isoDate1 = date1.toISOString();

//     t.plan(9);

//     var exitCount = 0;

//     function exit () {
//         if (exitCount === 2) {
//             return process.exit();
//         }
//         exitCount++;
//     }


//     jsdom.env('<time class="o-date"  datetime="' + isoDate1 + '"><span>dummy stuff</span><span class="o-date__printer"></span></time>', ['./classlist.js'], function (errors, window) {
//         oDate.init(window.document);
//         var el = window.document.querySelector('time');
//         t.equal(el.querySelector('.o-date__printer').innerHTML, oDate.timeAgo(date1));
//         t.equal(el.textContent, 'dummy stuff' + oDate.timeAgo(date1));
//         window.close();
//         exit();

//     });

//     var date = new Date(2000, 5, 15, 6, 37, 22, 499);
//     var expected = 'June 15, 2000 6:37 am';
//     var isoDate = date.toISOString();

//     jsdom.env('<time class="o-date" datetime="' + isoDate + '">dummy stuff</time>', ['./classlist.js'], function (errors, window) {
//         // function mockTimeout (window) {
//         //     var toCall;
//         //     window.setTimeout = function (func) {
//         //         toCall = func;
//         //     };

//         //     return function () {
//         //         toCall();
//         //     };
//         // }

//         // var tick = mockTimeout(window);
//         var el = window.document.querySelector('time');
//         oDate.init(el);
//         t.equal(el.getAttribute('datetime'), isoDate);
//         t.equal(el.innerHTML, oDate.format(date, 'date'));
//         t.equal(el.title, oDate.format(date));
//         el.datetime = (new Date()).toISOString();
//         // tick();
//         // t.ok(el.innerHTML.indexOf('seconds ago') > -1);
//         window.close();
//         exit();

//     });



//     jsdom.env('<time class="o-date" datetime="' + isoDate + '"></time><div>' +
//         '<time datetime="' + isoDate + '"></time>' +
//         '<span class="o-date" datetime="' + isoDate + '"></span>' +
//         '<time class="o-date" datetime="' + isoDate.replace('2000-06-15', '2014-05-20') + '"></time>' +
//         '<time class="o-date" datetime="' + isoDate + '"></time>' +
//         '</div>', ['./classlist.js'], function (errors, window) {
//         oDate.init(window.document.querySelector('div'));
//         var times = window.document.querySelectorAll('time');
//         t.notOk(times[0].textContent, 'no update outside of scanned area');
//         t.notOk(times[1].textContent, 'no update if has no o-date class');
//         t.notOk(window.document.querySelector('span.o-date').textContent, 'no update if not a <time> el');
//         t.notEqual(times[2].title, times[3].title);
//         window.close();
//         exit();

//     });




// });
