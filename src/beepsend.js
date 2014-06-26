/**
 * Beepsend JavaScript Library
 * @version 0.1
 * @param {object} params - initialization parameters
 * @author Miroslav Milosevic <miroslav.milosevic@htec.rs>
 */

var beepsend = function(params) {
    /* Default parameters */
    this.parameters = {
        'api_token' : '',
        'api_hlr_token': '',
        'api_url' : 'api.beepsend.com',
        'api_protocol' : 'http://',
        'api_port' : '80',
        'api_version' : '2',
    };
    
    this.initialize(params);
};

beepsend.prototype = (function() {
    
    /**
     * Function for extending object properties
     * @param {object} def
     * @param {object} params
     * @returns object default params
     */
    var extend = function(def, params) {
        for(var key in params) {
            if(params.hasOwnProperty(key)) {
                def[key] = params[key];
            }
        }
        return def;
    };
        
    return {
        /**
         * Function for seting api params 
         * @param {object} params - initialization parameters
         */
        initialize: function(params)
        {
            if(typeof $ == 'undefined') {
                throw new Error('beepsend plug-in requires jQuery');
            }
            params = params || {};
            /* Extending default parameters with passed in Library initialization */
            this.parameters = extend(this.parameters, params);
            
            /* Get api instance */
            this.api = new beepsend.api(this.parameters);
        },
        
        /**
         * Customer call
         * @link http://api.beepsend.com/docs.html#customer
         */
        customer: function(success, error) {
            this.api.resource('/customer/', 'GET', {}, success, error);
        },
        
        /**
         * Receive the connection object for given API-token. 
         * @param {function} success
         * @param {function} error
         * @returns {object} connection object for given API-token
         * @link http://api.beepsend.com/docs.html#connection
         */
        getUserConnections: function(success, error) 
        {
            this.api.resource('/connections/me', "GET", {}, success, error);
        },
        
        /**
         * Returns all connection for given API-token. 
         * @param {function} success
         * @param {function} error
         * @returns {object} connection objects for given API-token
         * @link http://api.beepsend.com/docs.html#connection
         */
        getConnections: function(success, error) 
        {
            this.api.resource('/connections/', "GET", {}, success, error);
        },
        
        /**
         * Update connection by connection id
         * @param {int} connectionId - id of connection that we want to update
         * @param {object} data - connection data that we want to update
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object} connection object of connection that we updated
         * @link http://api.beepsend.com/docs.html#connection-update
         */
        updateConnection: function(connectionId, data, success, error)
        {
            this.api.resource('/connections/'+connectionId, "PUT", data, success, error);
        },
        
        /**
         * Update connection for api_key
         * @param {int} connectionId - id of connection that we want to update
         * @param {object} data - connection data that we want to update
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object} connection object of connection that we updated
         * @link http://api.beepsend.com/docs.html#connection-update
         */
        updateMyConnection: function(data, success, error)
        {
            this.api.resource('/connections/me', "PUT", data, success, error);
        },
        
        /**
         * Reset api_token for provided connectionId
         * @param {int} connectionId - id of connection that we want to reset api token
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object} - object with new api_token
         * @link http://api.beepsend.com/docs.html#connection-tokenreset
         */
        resetConnectionToken: function(connectionId, success, error)
        {
            this.api.resource('/connections/'+connectionId+'/tokenreset', "GET", {}, success, error);
        },
        /**
         * Reset connection password for provided connectionId
         * @param {int} connectionId - id of connection that we want to reset api token
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object} - object with new api_token
         * @link http://api.beepsend.com/docs.html#connection-passwordreset
         */
        resetConnectionPassword: function(connectionId, success, error)
        {
            this.api.resource('/connections/'+connectionId+'/passwordreset', "GET", {}, success, error);
        },
        
        /**
         * Connection Price Lists
         * @param {int} connectionId - set value of this param null if you want to get pricelist for current connection, or you can pass connectionId
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object} connection current pricelist
         * @link http://api.beepsend.com/docs.html#pricelist
         */
        getConnectionCurrentPricelist: function(connectionId, success, error) 
        {
            if(connectionId == null) {
                this.api.resource('/connections/me/pricelists/current', 'GET', {}, success, error);
            }
            else {
                this.api.resource('/connections/'+connectionId+'/pricelists/current', "GET", {}, success, error);
            }
        },
        
        /**
         * Get CSV pricelist for provided connection_id
         * @param {int} connectionId
         * @param {object} data - data object
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {csv} csv output
         * @link http://api.beepsend.com/docs.html#pricelists
         */
        getConnectionPricelistCSVByConnectionId: function(connectionId, data, success, error)
        {
            data = data || {};
            this.api.resource('/pricelists/'+connectionId+'.csv', "GET", data, success, error);
        },
        
        /**
         * Get CSV pricelist for provided connection_label
         * @param {int} connectionLabel
         * @param {object} data - data object
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {csv} csv output
         * @link http://api.beepsend.com/docs.html#pricelists
         */
        getConnectionPricelistCSVByConnectionLabel: function(connectionLabel, data, success, error)
        {
            data = data || {};
            this.api.resource('/pricelists/'+connectionLabel+'.csv', "GET", data, success, error);
        },
        
        /**
         * Get details regarding your user
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object} json response user object
         * @link http://api.beepsend.com/docs.html#users
         */
        getUser: function(success, error) 
        {
            this.api.resource('/users/me', "GET", {}, success, error);
        },
        
        /**
         * Update user
         * @param {object} data - that we want to update
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object} json response user object
         * @link http://api.beepsend.com/docs.html#user-update
         */
        updateUser: function(data, success, error)
        {
            this.api.resource('/users/me', "PUT", data, success, error);
        },
        
        /**
         * Update User email address
         * @param {type} data - { "email" : "you@domain.com", "password" : "your_password" }
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {status} 204 - No Content
         * @link http://api.beepsend.com/docs.html#user-update-email
         */
        updateUserEmail: function(data, success, error)
        {
            this.api.resource('/users/me/email', "PUT", data, success, error);
        },
        
        /**
         * Update User password
         * @param {type} data - { "passoword" : "oldpassword", "new_password" : "newpassword" }
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {status} 204 - No Content
         * @link http://api.beepsend.com/docs.html#user-update-password
         */
        updateUserPassword: function(data, success, error)
        {
            this.api.resource('/users/me/password', "PUT", data, success, error);
        },
        
        /**
         * Reset User password
         * @param {string} email - for sending password reset request
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {status} 204 - No Content
         * @link http://api.beepsend.com/docs.html#user-passwordreset
         */
        resetUserPassword: function(email, success, error)
        {
            this.api.resource('/users/passwordreset?email='+email, "GET", {}, success, error);
        },
        
        /**
         * Reset User Token
         * @param {type} id - of user that we want to reset token
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object} json - with new generated api_token
         * @link http://api.beepsend.com/docs.html#user-tokenreset
         */
        resetUserToken: function(id, success, error) 
        {   
            if(id != null) {
                this.api.resource('/users/'+id+'/tokenreset', "GET", {}, success, error);
            }
            else {
                this.api.resource('/users/me/tokenreset', "GET", {}, success, error);
            }
        },
        
        /**
         * Send sms message
         * @param {object} message object
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {obejct} status - message status or error
         * @link http://api.beepsend.com/docs.html#send-sms
         * @see for sending binary messages you need to specify message type, please read documentation on next link
         * @link http://api.beepsend.com/docs.html#send-sms-binary
         */
        sendSMS: function(message, success, error) 
        {
            var msgDef = {};
            var msg = extend(msgDef, message);
            this.api.resource('/sms/', 'POST', msg, success, error);
        },
        
        /**
         * Specify which connection to use for sending this message. 
         * This can be useful if you are authenticating with a User token and do not want to send with your default connection.
         * @param {type} connectionId - connection id for connection that we want to use for sending sms message
         * @param {object} message object
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {obejct} status - message status or error
         * @link http://api.beepsend.com/docs.html#send-sms
         * @see for sending binary messages you need to specify message type, please read documentation on next link
         * @link http://api.beepsend.com/docs.html#send-sms-binary
         */
        sendSMSWithConnectionId: function(connectionId, message, success, error)
        {
            var msgDef = {};
            var msg = extend(msgDef, message);
            this.api.resource('/sms/'+connectionId, "POST", msg, success, error);
        },
        
        /**
         * Specify which connection to use for sending this message. 
         * This can be useful if you are authenticating with a User token and do not want to send with your default connection.
         * @param {type} connectionLabel - connectionLabel for connection that we want to use for sending sms message
         * @param {object} message object
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {obejct} status - message status or error
         * @link http://api.beepsend.com/docs.html#send-sms
         * @see for sending binary messages you need to specify message type, please read documentation on next link
         * @link http://api.beepsend.com/docs.html#send-sms-binary 
         */
        sendSMSWithConnectionLabel: function(connectionLabel, message, success, error)
        {
            var msgDef = {};
            var msg = extend(msgDef, message);
            this.api.resource('sms'+connectionLabel, "POST", msg, success, error);
        },
        
        /**
         * Sending to imported groups of numbers
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object} status for sended messages
         * @link http://api.beepsend.com/docs.html#send-sms-groups
         */
        sendGroupSMS: function(data, success, error) 
        {
            this.api.resource('/batches/', "POST", data, success, error);
        },
        
        /**
         * SMS Lookup
         * @param {int} smsId - id of sms that we want to find
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object} response object with all details about sms
         * @link http://api.beepsend.com/docs.html#sms-lookup-multiple
         */
        findSMSById: function(smsId, success, error)
        {
            this.api.resource('/sms/'+smsId, "GET", {}, success, error);
        },
        
        /**
         * Multiple messages
         * Get details regarding multiple sent messages with filters.
         * @param {type} params - params for search criteria
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object} collection object with multiple messages
         * @link http://api.beepsend.com/docs.html#sms-lookup-multiple
         */
        findMultipleMessages: function(params, success, error)
        {
            this.api.resource('/sms/', "GET", params, success, error);
        },
        
        /**
         * HLR
         * @param {string} phoneNum
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object} hlr response
         * @link http://api.beepsend.com/docs.html#hlr
         */
        hrl: function(phoneNum, success, error)
        {
            var hlrApi = new beepsend.api(this.parameters, true);
            hlrApi.resource('/hlr/'+phoneNum, "GET", {}, success, error);
        },
        
        /**
         * Bulk HLR
         * @param {string} phoneNumbers, collection of phone numbers {"msisdn" : ["46736007518", "46736007505", "046736007512"]}
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object} hlr response
         * @link http://api.beepsend.com/docs.html#hlr-bulk
         * @todo - we need to find solution how to solve callback url in javascript sdk.
         * @description this action requires callback url for receiving bulk hlr response
         */
        hlrBulk: function(phoneNumbers, success, error)
        {
            var hlrApi = new beepsend.api(this.parameters, true);
            hlrApi.resource('/hlr/', "GET", phoneNumbers, success, error);
        },
        
        /**
         * Validate sms
         * @param {object} message object
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object} validation object with errors if exists
         * @link http://api.beepsend.com/docs.html#validation-sms
         */
        validateSMS: function(message, success, error) 
        {
            var msgDef = {};
            var msg = extend(msgDef, message);
            this.api.resource('/sms/validate/', 'POST', msg, success, error);
        },
        
        /**
         * HLR validation
         * @param {string} phoneNum - phone number
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object} hlr validation response
         * @link http://api.beepsend.com/docs.html#validation-hlr
         */
        validateHLR: function(phoneNum, success, error)
        {
            var hlrApi = new beepsend.api(this.parameters, true);
            hlrApi.resource('/hlr/validate/', 'POST', {}, success, error);
        },
        
        /**
         * Get all batches
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object} json response object with all batches
         * @link http://api.beepsend.com/docs.html#batches
         */
        batchesGetAll: function(success, error)
        {
            this.api.resource('/batches', "GET", {}, success, error);
        },
        
        /**
         * Get specific batch
         * @param {type} batchId - id of batch that we want to get
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object} response json with specific batch
         * @link http://api.beepsend.com/docs.html#batches
         */
        batchesGetById: function(batchId, success, error)
        {
            this.api.resource('/batches/'+batchId, "GET", {}, success, error);
        },
        
        /**
         * Accumulated statistic
         * @param {object} params - search criteria params  
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {collection} collection of json objects with statistics for all user accounts
         * @link http://api.beepsend.com/docs.html#analytics-summary
         */
        accumulatedStatisticForMe: function(params, success, error)
        {
            params = params || {};
            this.api.resource('/analytics/summary/', "GET", params, success, error);
        },
        
        /**
         * Network details analytics
         * @param {object} query - json object with for specifing criteria
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {collection} collection of json objects
         * @link http://api.beepsend.com/docs.html#analytics-network
         */
        networkDetails: function(query, success, error)
        {
            query = query || {};
            this.api.resource('/analytics/network/', "GET", query, success, error);
        },       
        
        /**
         * Batch analytics
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {collection} collection of json objects with batch details
         * @link http://api.beepsend.com/docs.html#analytics-batch
         */
        batchAnalytics: function(success, error)
        {
            this.api.resource('/analytics/batches/', "GET", {}, success, error);
        },
        
        /**
         * Batch analytics for specific batch
         * @param {int} batchId - id of batch that we want to fetch details
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {collection} collection of json objects with batch details
         * @link http://api.beepsend.com/docs.html#analytics-batch
         */
        batchAnalyticsById: function(batchId, success, error)
        {
            this.api.resource('/analytics/batches/'+batchId, "GET", {}, success, error);
        },
        
        /**
         * Get all contacts
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {collection} collection with all contact json objects
         * @link http://api.beepsend.com/docs.html#contacts
         */
        contactsGetAll: function(query, success, error)
        {
            query = query || {};
            this.api.resource('/contacts/', "GET", query, success, error);
        },
        
        /**
         * Get single contact object
         * @param {int} contactId - id of contact that we want to find
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object} contact json object
         * @link http://api.beepsend.com/docs.html#contacts
         */
        contactsGet: function(contactId, success, error)
        {
            this.api.resource('/contacts/'+contactId, "GET", {}, success, error);
        },
        
        /**
         * Add new contact
         * @param {object} data - json object with all contact data
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object} created contact object
         * @link http://api.beepsend.com/docs.html#contacts-add
         */
        contactsAddNew: function(data, success, error)
        {
            this.api.resource('/contacts/', "POST", data, success, error);
        },
        
        /**
         * Update existing contact
         * @param {int} contactId - id of contact that we want to update
         * @param {object} data - updated contact object
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object} updated contact object
         * @link http://api.beepsend.com/docs.html#contacts-update
         */
        contactsUpdate: function(contactId, data, success, error)
        {
            data = data || {};
            this.api.resource('/contacts/'+contactId, "PUT", data, success, error);
        },
        
        /**
         * Delete contact
         * @param {int} contactId - id of contact that we want to delete
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {http header} returns http 204 no content header
         * @link http://api.beepsend.com/docs.html#contacts-delete
         */        
        contactsDelete: function(contactId, success, error)
        {
            this.api.resource('/contacts/'+contactId, "DELETE", {}, success, error);
        },
        
        /**
         * Get all contacts groups for authorized connection
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {collection} collection of contact groups objects
         * @link http://api.beepsend.com/docs.html#contacts-groups
         */
        contactsGroupGetAll: function(success, error)
        {
            this.api.resource('/contacts/groups/', "GET", {}, success, error);
        },
        
        /**
         * Get single contact group for specified group id
         * @param {int} groupId - id of group that we want to fetch from api
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object} json object of contact group
         * @link http://api.beepsend.com/docs.html#contacts-groups
         */
        contactsGroupGetById: function(groupId, success, error)
        {
            this.api.resource('/contacts/groups/'+groupId, "GET", {}, success, error);
        },
        
        /**
         * Get contacts groups by specified criteria
         * @param {type} groupId - id of group that we want to fetch, if we dont want to specify group we just pass null for this param 
         * @param {type} params - params for search criteria, this is also optional if you dont want to skip it just pass {} to function
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {collection} json groups object
         * @link http://api.beepsend.com/docs.html#contacts-groups
         */
        contactsGroupGetByCriteria: function(groupId, params, success, error)
        {
            groupId = groupId || null;
            params = params || {};
            var path = (groupId != null) ? '/contacts/groups/'+groupId : '/contacts/groups/';
            this.api.resource(path, "GET", params, success, error);
        },
        
        /**
         * Add contact group
         * @param {object} group object
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object} created group json object
         * @link http://api.beepsend.com/docs.html#contacts-groups-add
         */
        contactsGroupCreateNew: function(group, success, error)
        {
            this.api.resource('/contacts/groups/', "POST", group, success, error);
        },

        getUserWallets: function(success, error)
        {
            this.api.resource('/wallets/', "GET", {}, success, error);
        },
        
    };
    
    
})();

/**
 * Beepsend api communication class
 * @param {object} params - configuration object
 * @param {boolean} hlr - this is fix because we have different api_token for hlr request, we must use HLR account api_token
 * @returns {beepsend.api}
 */
beepsend.api = function(params, hlr) {
    /* HLR fix */
    this.hlr = hlr || false;
    this.parameters = params;
};

beepsend.api.prototype = {
    
    /**
     * This function is used for generating url for api calls
     * @param {type} path
     * @param {type} bs
     * @returns {String}
     */
    buildRequestUrl: function(path) {
        path = path || '';
        var apiToken = (this.hlr) ? this.parameters.api_hlr_token : this.parameters.api_token;
        var url = this.parameters.api_protocol+this.parameters.api_url/*+":"+this.parameters.api_port*/+'/'+this.parameters.api_version+path+"?api_token="+apiToken;
        return url;
    },
    
    /**
     * Resource function
     * @param {string} resource - this is resource string
     * @param {string} type - type of request, GET, POST, etc...
     * @param {json} data
     * @param {string} callback - this is name of success callback function to process received data
     * @param {string} error - this is name of error callback function to process errors on requests
     */
    resource: function(resource, type, data, callback, error) {
        /* Set default handler functions */
        callback = callback || this.successCallback;
        error = error || this.errorCallback;
        
        /* Generate full url for api call */
        var fullResourceUrl = this.buildRequestUrl(resource);
        
        /* Execute ajax call */
        $.ajax({
            type: type,
            url: fullResourceUrl,
            crossDomain: true,
            dataType: 'json',
            async: true,
            data: data,
            success: callback,
            error: error
        });
    },
    
    /**
     * Default success callback function
     * @param {object} data - response data
     */
    successCallback: function(data) {
        console.log(data);
    },
    
    /**
     * Default error callback function
     * @param {object} error - error object
     */
    errorCallback: function(xhr, status) {
        switch (xhr.status) {
            case 404:
                console.log('Error: Not found');
                break;
            case 500:
                console.log('Error: Server error');
                break;
            case 0:
                console.log('Error: Request aborted');
                break;
            default:
                console.log('Error: Unknown error ' + (typeof xhr.responseJSON.errors != "undefined") ? xhr.responseJSON.errors.toString() : status);
                
        } 
    },
    
};