Beepsend helper library for JavaScript
======================================

This repository contains source code of JavaScript helper library, that allows you to easily integrate Beepsend platform in your JavaScript application.

## Installation

Instalation of this library is available trough [Bower](http://bower.io/ 'Bower is a package manager for the web') package manager.

    bower install beepsend-javascript --save

or you can clone it with [git](http://git-scm.com/) from our repository

    git clone git@github.com:beepsend/beepsend-javascript.git

or download .zip archive

[Zip archive](https://github.com/beepsend/beepsend-javascript/archive/master.zip)

After that you need to include beepsend JavaScript library to your project

    <script type="text/javascript" src="src/beepsend.js"></script>

And you're ready to go!

## Usage

### Plugin initialization

For initialization of beepsend library, you only need to provide valid api token. 
To find your API token, visit the [Beepsend Customer Portal](http://connect.beepsend.com/ "Beepsend Customer Portal") or contact your account manager.

```javascript
var beepsend = new beepsend({
    "api_token" : "enter your api_token here"
});
```

Now you can start to use our library.

Here bellow is examples how you can use library.

### Send SMS

To send sms you need write couple lines of code:

```javascript
    beepsend.messages().send("Beepsend", 46769432494, "Hello World!!!").then(
        function(success) {
            //here you can write your success handler function
        },
        function(error) {
            //here you can write your own error handling function
        }
    );
```

### Get customer data

```javascript
    beepsend.connection().get().then(
        function(success) {
            //here you can write your success handler function
        },
        function(error) {
            //here you can write your own error handling function
        }
    );
```

### Get user data

```javascript
    beepsend.user().get().then(
        function(success) {
            //here you can write your success handler function
        },
        function(error) {
            //here you can write your own error handling function
        }
    );
```