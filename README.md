# history

> History manager for the web inspired by YUI3

## Getting Started
Before anything taking its part, you should install [node](http://nodejs.org) and "cortex".

#### Install Node

Visit [http://nodejs.org](http://nodejs.org), download and install the proper version of nodejs.

#### Install Cortex

    # maybe you should use `sudo`
    npm install -g cortex

## Using history In Your Project

First, install 'history' directly with `cortex install` (recommended)

	cortex install history --save

or, you could update your package.json manually

    dependencies: {
        'history': '<version-you-want>'
    }

and install dependencies

	cortex install

Then, use `require` method in your module

    var history = require('history');

Finally, start cortex server

    cortex server

Then cortex will care all the rest.


## API Documentation

### history: constructor
': constructor' means the `module.exports` of module 'history' is a constructor that we should use it with the `new` keyword

	new history(options)

#### options
- options.name {String}



### history.\<method-name\>(arguments)
Means this is a static method of `module.exports`

#### arguments
// arguments description here

### .\<method-name\>(arguments)
Mean this is a method of the instance

#### arguments
// arguments description here