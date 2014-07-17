beepsend-javascript
===================

A JavaScript helper library to connect to Beepsend API

####Initialization

```javascript
var beepsend = new beepsend({
    "api_token" : "enter your api_token here"
});
```

####Example how we can get all information about user

```javascript
beepsend.user().data().then(
    function(user) {
        //this is success function
    },
    function(error) {
        //here you can handle errors
    }
)
```

####Example for sending message

```javascript
beepsend.message().send(from, to, message).then(
    function(response) {
        //handle success response
    },
    function(error) {
        //handle error - if you don't write your own error handler, library will use default error handler
    }
);
```
