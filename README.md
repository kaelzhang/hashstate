# hashstate

Location hash manager for the web inspired by [YUI3](http://yuilibrary.com/yui/docs/history/).

## Installation

```js
cortex install hashstate --save
```

## Usage

```js
var hashState = require('hashstate')(options);
```

- options `Object`
	- prefix `String='!'` Prefix to prepend when setting the hash fragment. Default to `'!'`
	- split `String=','` String to split the key-value pairs.
	- assign `String='='` String to join key and value of a key-value pair.
	- window `Window`
	
The instance of `hashState` is an [EventEmitter](http://search.cortexjs.org/package/events).

### .stringify(object)

Returns `String` , **excluding** `options.prefix`.

```js
hashState.stringify({a: 1, b: 'c'}); // 'a=1,b=c'
```

### .parse(string)

Parses the given `string` and returns `Object` the parsed object according to `options.split` and `options.assign`.

```js
// Will deal with the leading '#!'
hashState.parse('#!a=1,b=c'); // {a: '1', b: 'c'}
hashState.parse('!a=1,b=c'); // {a: '1', b: 'c'}
hashState.parse('#a=1,b=c'); // {a: '1', b: 'c'}

hashState.parse('a=1,b=c'); // {a: '1', b: 'c'}
```

### .setHash(hash)

- hash `String` hash string.

Changes the current location hash, which will add a new history entry.

### .replaceHash(hash)

- hash `String` hash string.

Changes location hash and replaces the current history  entry instead of adding a new entry.

### .getHash()

Returns the current hash string, excluding the leading `'#'` and `options.prefix`.


### Event: hashchange

- e `Object` 
  - prev `Object` the previous hash object.
  - current `Object` the current hash object.
  - hash `String` the current hash string.

Emitted when hash changes.

```js
hashState.on('hashchange', function(e){
    console.log('hashchange:', e.current);
});
```