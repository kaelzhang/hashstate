'use strict';

var hashState = require('../index');
var assert = require('assert');
var async = require('async');

function randomHash () {
  return 'a=' + randomNum(10) + ',b=' + randomNum(1000);
}

function randomNum (max) {
  return parseInt(Math.random() * max);
}

var cases = [
{
  d: '.parse()',
  e: function (h, next) {
    var obj = h.parse('a=1,b=2');
    assert.deepEqual(obj, {a: '1', b: '2'});
    next();
  }
},
{
  d: '.parse(), dealing with prefixs',
  e: function (h, next) {
    var obj = h.parse('!a=1,b=b');
    assert.deepEqual(obj, {a: 1, b: 'b'});

    var obj2 = h.parse('#!c=c,d=8');
    assert.deepEqual(obj2, {c: 'c', d: '8'});
    next();
  }
},
{
  d: '.stringify()',
  e: function (h, next) {
    var str = h.stringify({a: 1, b: 2});
    assert.ok(str === 'a=1,b=2');
    next();
  }
},
{
  d: '.stringfy() a undefined property',
  e: function (h, next) {
    var str = h.stringify({a: undefined, b: 2});
    assert.ok(str === 'a=,b=2');
    next();
  }
},
{
  d: '.setHash <-> .getHash',
  e: function (h, next) {
    var hash = randomHash();
    h.setHash('#!' + hash);
    assert.ok(h.getHash() === hash);
    h.setHash('#' + hash);
    assert.ok(h.getHash() === hash);
    h.setHash('!' + hash);
    assert.ok(h.getHash() === hash);
    next();
  }
},
{
  d: 'event: hashchange',
  e: function (h, next) {
    function handler (e) {
      assert.strictEqual(e.newHash, newHash);
      assert.strictEqual(e.oldHash, oldHash);
      h.removeListener('hashchange', handler);
      next();
    }

    var oldHash = h.getHash();
    var newHash = randomHash();
    h.on('hashchange', handler);
    h.setHash(newHash);
  }
},
{
  d: '.setHash() mute',
  e: function (h, next) {
    function handler (e) {
      assert.strictEqual(e.newHash, hash2);
      assert.strictEqual(e.oldHash, hash1);
      h.removeListener('hashchange', handler);
      next();
    }

    var hash0 = h.getHash();
    var hash1 = randomHash();
    var hash2 = randomHash();
    h.on('hashchange', handler);
    h.setHash(hash1, {mute: true});
    h.setHash(hash2);
  }
},
{
  d: '.replaceHash()',
  e: function (h, done) {
    var hash = randomHash();
    var length = window.history.length;
    h.replaceHash(hash);
    assert.strictEqual(length, window.history.length);
    assert.strictEqual(hash, h.getHash());
    done();
  }
}
];

describe("hashstate", function(){
  var h = hashState();
  async.each(cases, function (c, next) {
    it(c.d, function(done){
      c.e(h, function () {
        done();
        next();
      });
    });

  }, function () {
  });
});