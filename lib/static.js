'use strict';

var hashState = require('./hashstate');

var OPTIONS = {
  prefix: '!',

  // For some kind of broken webviews, such as wechat,
  // ampersand(`&`) might be improperly encoded,
  // so use `,` instead by default.
  split: ',',
  divide: '='
};


var STR_HASH = '#';

hashState.config = function (options) {
  mix(OPTIONS, options);
  hashState.config = function () {
    throw new Error('never config hash options more than once.')
  };
};


// {a: 1, b: 'c'} -> 'a=1,b=c'
hashState.stringify = function (object) {
  options = OPTIONS;
  var pairs = [];
  var key;
  var value;
  for (key in object) {
    value = object[key];
    pairs.push(key + options.divide + value);
  }
  return pairs.join(options.split);
};


// '#!a=1,b=c' -> {a: '1', b: 'c'}
// '!a=1,b=c' -> {a: '1', b: 'c'}
// '#a=1,b=c' -> {a: '1', b: 'c'}
hashState.objectify = function (str) {
  options = OPTIONS;
  var object = {};
  str = removeLeading(removeLeading(str, STR_HASH), options.prefix);
  str.split(options.split).forEach(function (pair) {
    var split = pair.split(options.divide);
    object[split[0]] = split[1];
  });
  return object;
};


function removeLeading (str, leading) {
  // 'abc'.indexOf('') === 0
  return leading && str.indexOf(leading) === 0
    ? str.substr(leading.length)
    : str;
}


// Sets the browser's location hash
// @param {string} hash New location hash
hashState.setHash = function (hash) {
  hash = removeLeading(hash, STR_HASH);

  location.hash = (OPTIONS.prefix || '') + hash;
};


/**
     * Replaces the browser's current location hash with the specified hash
     * and removes all forward navigation states, without creating a new browser
     * history entry. Automatically prepends the <code>hashPrefix</code> if one
     * is set.
     *
     * @method replaceHash
     * @param {String} hash new location hash
     * @static
     */
hashState.replaceHash = function (hash) {
    var base = location.href.replace(/#.*$/, '');
    hash = removeLeading(hash, STR_HASH);

    location.replace(base + STR_HASH + (OPTIONS.prefix || '') + hash);
};


hashState.getHash = function () {
  // From YUI3
  // > Gecko's window.location.hash returns a decoded string and we want all
  // > encoding untouched, so we need to get the hash value from
  // > window.location.href instead. We have to use UA sniffing rather than
  // > feature detection, since the only way to detect this would be to
  // > actually change the hash.
  var matches  = /#(.*)$/.exec(location.href);
  var hash     = matches && matches[1] || '';

  return removeLeading(hash, OPTIONS.prefix);
};

