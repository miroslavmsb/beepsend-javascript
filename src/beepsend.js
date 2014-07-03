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
        'api_protocol' : 'https://',
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
         * Get user resource
         * @returns {beepsend.user}
         */
        user: function()
        {
            return new beepsend.user(this);
        },
        
        /**
         * Get analytic resource
         * @returns {beepsend.analytic}
         */
        analytic: function()
        {
            return new beepsend.analytic(this);
        },
        
        /**
         * Get contact resource
         * @returns {beepsend.contact}
         */
        contact: function()
        {
            return new beepsend.contact(this);
        },
        
        customer: function()
        {
            return new beepsend.customer(this);
        },
        
        connection: function()
        {
            return new beepsend.connection(this);
        },
        
        hlr: function()
        {
            return new beepsend.hlr(this);
        },
        
        message: function()
        {
            return new beepsend.message(this);
        }
        
    };
    
    
})();

beepsend.user = function(bs)
{
    this.parameters = bs.parameters;
    this.api = bs.api;
    
    this.user = "me";
    
    this.actions = {
        'users' : '/users/',
        'email' : 'email',
        'phone' : 'phone',
        'password' : 'password',
        'passwordreset' : 'passwordreset',
        'tokenreset' : '/tokenreset'
    };
}

beepsend.user.prototype = {
    
    /**
     * Get user details
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {object} - user object
     */
    data: function(success, error)
    {
        this.api.resource(this.actions.users+this.user, "GET", {}, success, error);
    },
    
    /**
     * Update user
     * @param {object} options object for user that we want to update
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {object} updated user object
     * @link http://api.beepsend.com/docs.html#user-update
     */
    update: function(options, success, error)
    {
        this.api.resource(this.actions.users+this.user, "PUT", options, success, error);
    },
    
    /**
     * Update user email
     * @param {string} email - new email address
     * @param {string} password - password of user account
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {object}
     */
    updateEmail: function(email, password, success, error)
    {
        var data = {
            "email" : email,
            "password" : password
        };
        this.api.resource(this.actions.users+this.user+'/'+this.actions.email, "PUT", data, success, error);
    },
    
    /**
     * Update user password
     * @param {string} oldPassword
     * @param {string} newPassword
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {object}
     */
    updatePassword: function(oldPassword, newPassword, success, error)
    {
        var data = {
            'password' : oldPassword,
            'new_password' : newPassword
        };
        this.api.resource(this.actions.users+this.user+'/'+this.actions.password, "PUT", data, success, error);
    },
    
    /**
     * Reset user password
     * @param {string} email - email for password reset
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {object} user object
     */
    resetUserPassword: function(email, success, error)
    {
        var data = {
            "email" : email
        };
        this.api.resource(this.actions.users+this.actions.passwordreset, "GET", data, success, error);
    },
    
    /**
     * Set new password
     * @param {string} hash - is sent to you by email address
     * @param {string} password - new password
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {object} user object
     */
    setNewPassword: function(hash, password, success, error)
    {
        var data = {
            'password' : password
        };
        this.api.resource(this.actions.users+this.actions.password+'/'+hash, "PUT", data, success, error);
    },
    
    /**
     * Reset user token
     * @param {string} password - user password
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {object} new user token
     */
    resetUserToken: function(password, success, error)
    {
        var data = {
            'password' : password
        };
        this.api.resource(this.actions.users+this.user+this.actions.tokenreset, "GET", data, success, error);
    },
    
    /**
     * Verify email address
     * @param {string} hash - is sent to you via email
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {object}
     */
    verifyEmail: function(hash, success, error)
    {
        this.api.resource(this.actions.users+this.actions.email+'/'+hash, "GET", {}, success, error);
    },
    
    /**
     * Verify phone number
     * @param {type} hash - has from sms message
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {object}
     */
    verifyPhone: function(hash, success, error)
    {
        this.api.resource(this.actions.users+this.actions.phone+'/'+hash, "GET", {}, success, error);
    }
    
};


beepsend.analytic = function(bs)
{
    this.parameters = bs.parameters;
    this.api = bs.api;
    
    
    this.actions = {
        'summary' : '/analytics/summary/',
        'network' : '/analytics/network/',
        'batch' : '/analytics/batches/'
    };
};

beepsend.analytic.prototype = {
    
    /**
     * Get accumulated Statistics, need to set connection id for this
     * @param {string} connection - connection id or string "me"
     * @param {int} fromDate - Unix time
     * @param {int} toDate - Unix time
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {object}
     */
    summary: function(connection, fromDate, toDate, success, error)
    {
        connection = connection || '';
        fromDate = fromDate || null;
        toDate = toDate || null;
        
        var data = {};
        
        if(fromDate !== null) {
            data.from_date = fromDate;
        }
        
        if(toDate !== null) {
            data.to_date = toDate;
        }
        
        this.api.resource(this.actions.summary+connection, "GET", data, success, error);
    },
    
    /**
     * This call will give you granular delivery statistics for all messages sorted by each recipient network between two specified dates.
     * @param {sring} connection - connection id
     * @param {int} fromDate - Unix time
     * @param {int} toDate - Unix time
     * @param {string} MCC - Mobile country code
     * @param {string} MNC - Mobile network code
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {object}
     */
    network: function(connection, fromDate, toDate, MCC, MNC, success, error)
    {
        connection = connection || null;
        fromDate = fromDate || null;
        toDate = toDate || null;
        MCC = MCC || null;
        MNC = MNC || null;
        
        var data = {};
        
        if(fromDate !== null) {
            data.from_date = fromDate;
        }
        
        if(toDate !== null) {
            data.to_date = toDate;
        }
        
        if(MCC !== null) {
            data.MCC = MCC;
        }
        
        if(MNC !== null) {
            data.MNC = MNC;
        }
        
        this.api.resource(this.actions.network+connection, "GET", data, success, error);
        
    },
    
    /**
     * This call will give you delivery statistics for a whole batch
     * @param {int} batchId - batch id
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {undefined}
     */
    batch: function(batchId, success, error)
    {
        batchId = batchId || null;
        this.api.resource(this.actions.batch+batchId, "GET", {}, success, error);
    }
    
};

beepsend.connection = function(bs)
{
    this.parameters = bs.parameters;
    this.api = bs.api;
    
    this.actions = {
        'connections' : '/connections/',
        'tokenreset' : '/tokenreset',
        'passwordreset' : '/passwordreset'
    };
    
};

beepsend.connection.prototype = {
    
    /**
     * Get all connections
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {collection} collection with all connection objects
     */
    all: function(success, error) 
    {
        this.api.resource(this.actions.connections, "GET", {}, success, error);
    },
    
    /**
     * Get data for single connection
     * @param {string} connection - connection id or "me" string
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {undefined}
     */
    data: function(connection, success, error)
    {
        connection = connection || 'me';
        this.api.resource(this.actions.connections+connection, "GET", {}, success, error);
    },
    
    /**
     * Update connection
     * @param {string} connection - connection id or "me" string if we want to update authorized user connection
     * @param {type} options - options that we want to update
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {undefined}
     * @description for details about available options for updating see api documentation
     * @link http://api.beepsend.com/docs.html#connection-update
     */
    update: function(connection, options, success, error)
    {
        connection = connection || 'me';
        this.api.resource(this.actions.connections+connection, "PUT", options, success, error);
    },
    
    /**
     * Reset connection token, need to use user token to perform this action
     * @param {string} connection - connection id or "me" string
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {object} json response with new token
     */
    resetToken: function(connection, success, error)
    {
        this.api.resource(this.actions.connections+connection+this.actions.tokenreset, "GET", {}, success, error);
    },
    
    /**
     * Reset connection password
     * @param {type} connection - connection id or "me" string
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {object}
     */
    resetPassword: function(connection, success, error)
    {
        connection = connection || "me";
        this.api.resource(this.actions.connection+connection+this.actions.passwordreset, "GET", {}, success, error);
    }
    
};

beepsend.contact = function(bs)
{
    this.parameters = bs.parameters;
    this.api = bs.api;
    
    this.actions = {
        'contacts' : '/contacts/',
        'groups' : '/contacts/groups/',
        'upload' : '/upload/'
    };
    
};

beepsend.contact.prototype = {
    
    /**
     * Get all contact belonging to your user
     * @param {string} group - group id or name
     * @param {type} sort - Sorting of the collection. Available keys are: name, id. Can be prepended with + or - to change the sorting direction (+ ASC, - DESC).
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {collection} collection of contacts objects
     */
    all: function(group, sort, success, error)
    {
        group = group || null;
        sort = sort || null;
        
        var data = {};
        
        if(group !== null) {
            data.group = group;
        }
        
        if(sort !== null) {
            data.sort = sort;
        }
        
        this.api.resource(this.actions.contacts, "GET", data, success, error);
        
    },
    
    /**
     * Create new contact
     * @param {string} msisdn
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} groupId
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {object} created contact object
     */
    add: function(msisdn, firstName, lastName, groupId, success, error)
    {
        firstName = firstName || null;
        lastName = lastName || null;
        groupId = groupId || null;
        
        var data = {
            'msisdn' : msisdn
        };
        
        if(firstName !== null) {
            data.firstname = firstName;
        }
        
        if(lastName !== null) {
            data.lastname = lastName;
        }
        
        if(groupId !== null) {
            data.group_id = groupId;
        }
        
        this.api.resource(this.actions.contacts, "POST", data, success, error);
        
    },
    
    /**
     * Update existing contact
     * @param {string} contactId - id of contact that we want to update
     * @param {object} options - Available keys: msisdn, firstname, lastname, group_id
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {object} updated contact object
     */
    update: function(contactId, options, success, error)
    {
        this.api.resource(this.actions.contacts+contactId, "PUT", options, success, error);
    },
    
    /**
     * Delete contact
     * @param {string} contactId - id of contact that we want to delete
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {object}
     */
    delete: function(contactId, success, error)
    {
        this.api.resource(this.actions.contacts+contactId, "DELETE", {}, success, error);
    },
    
    /**
     * Get all contact groups belonging to your user
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {collection} collection of contact groups objects
     */
    groups: function(success, error)
    {
        this.api.resource(this.actions.groups, "GET", {}, success, error);
    },
    
    /**
     * Get content of specific group
     * @param {string} groupId - id of group that we want to get
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {undefined}
     */
    group: function(groupId, success, error)
    {
        this.api.resource(this.actions.groups+groupId, "GET", {}, success, error);
    },
    
    /**
     * Create new contacts group
     * @param {string} groupName - name of group that we want to create
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {object} object of created contact group
     */
    addGroup: function(groupName, success, error)
    {
        var data = {
            "name" : groupName
        };
        this.api.resource(this.actions.groups, "POST", data, success, error);
    },
    
    /**
     * Update contact group
     * @param {int} groupId - id of group that we want to update
     * @param {string} groupName - new name for group
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {object} object of updated contacts group
     */
    updateGroup: function(groupId, groupName, success, error)
    {
        var data = {
            "name" : groupName
        };
        this.api.resource(this.actions.groups+groupId, "PUT", data, success, error);
    },
    
    /**
     * Delete contact group
     * @param {int} groupId - id of group that we want to delete
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {object}
     */
    deleteGroup: function(groupId, success, error) 
    {
        this.api.resource(this.actions.groups+groupId, "DELETE", {}, success, error);
    },
    
    /**
     * Import contacts to group from .csv file
     * @param {string} file - html5 file object
     * @param {int} groupId - id of group that we want import contacts from csv
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {object}
     * @todo need to check this function, when we get CORS for POST and PUT request enabled on API
     */
    upload: function(file, groupId, success, error)
    {
        var that = this;
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(event) {
           var fileContent = event.target.result;
           that.api.resourceRaw(that.actions.groups+groupId+that.actions.upload, "POST", fileContent, success, error);
        };
    }
    
};

beepsend.customer = function(bs)
{
    this.parameters = bs.parameters;
    this.api = bs.api;
    
    this.actions = {
        'data' : '/customer/'
    };
}

beepsend.customer.prototype = {
    
    /**
     * Get customer informations
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {object}
     */
    data: function(success, error)
    {
        this.api.resource(this.actions.data, "GET", {}, success, error);
    }
    
};

beepsend.hlr = function(bs)
{
    this.parameters = bs.parameters;
    this.api = bs.api;
    
    this.actions = {
        'hlr' : '/hlr/',
        'validate' : '/hlr/validate'
    };
};

beepsend.hlr.prototype = {
    
    /**
     * Intermediate HLR call
     * @param {int} msisdn - that we are looking HLR request
     * @param {string} connection - connection id of HLR connection
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {object}
     */
    intermediate: function(msisdn, connection, success, error)
    {
        connection = connection || "me";
        this.api.resource(this.actions.hlr+msisdn, "GET", {"connection" : connection}, success, error);
    },
    
    /**
     * Bulk HLR request
     * @param {type} msisdns - array of msisdns ["12212123", "123125344"]
     * @param {type} connection - connection id of HLR connection
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {object}
     * @description This method requires callback url on application to deliver hlr result response
     */
    bulk: function(msisdns, connection, success, error)
    {
        var data = {
            "msisdn" : msisdns,
            "connection" : (connection) ? connection : "me"
        };
        this.api.resource(this.actions.hlr, "POST", data, success, error);
    },
    
    /**
     * Validate HLR request
     * @param {int} msisdn - that we are looking HLR request
     * @param {string} connection - connection id of HLR connection
     * @param {function} success - callback function for handling success response
     * @param {function} error - callback function for handling error
     * @returns {object}
     */
    validate: function(msisdn, connection, success, error)
    {
        connection = connection || "me";
        var data = {
            "msisdn" : msisdn,
            "connection" : (connection) ? connection : "me"
        };
        this.api.resource(this.actions.validate, "POST", data, success, error);
    }
    
};

beepsend.message = function(bs)
{
    this.parameters = bs.parameters;
    this.api = bs.api;
    
    this.actions = {
        'sms' : '/sms/',
        'validate' : '/sms/validate/',
        'batches' : '/batches/',
        'estimation' : 'costestimate/'
    };
};

beepsend.message.prototype = {
    
        /**
         * Send SMS message
         * @param {int|string} from - phone number we are sending from or text 
         * @param {int|array} to - Number of recipient or array with recipient numbers
         * @param {string} message - text message
         * @param {string} connection - Connection id to use for sending sms
         * @param {string} encoding - Encoding of message UTF-8, ISO-8859-15 or Unicode
         * @param {object} options - object of aditional options for sending sms. More info on: http://api.beepsend.com/docs.html#send-sms
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object}
         */        
        send: function(from, to, message, connection, encoding, options, success, error)
        {
            connection = connection || "";
            encoding = encoding || "UTF-8";
            var data = {
                'from' : from,
                'to' : to,
                'message' : message,
                'encoding' : encoding,
                'receive_dlr' : 0
            };
            
            /* extend data object with aditional options for sending sms */
            data = beepsend.extend(data, options);
            
            this.api.resource(this.actions.sms+connection, "POST", data, success, error);
        },
        
        /**
         * Send SMS to group of contacts
         * @param {int|string} from - phone number we are sending from or text 
         * @param {int|array} groups - id of group or array with groups ids
         * @param {string} message - text message
         * @param {string|int} connection - Connection id to use for sending sms
         * @param {string} encoding - Encoding of message UTF-8, ISO-8859-15 or Unicode
         * @param {object} options - object of aditional options for sending sms. More info on: http://api.beepsend.com/docs.html#send-sms
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object}
         */
        groupSending: function(from, groups, message, connection, encoding, options, success, error)
        {
            connection = connection || "";
            encoding = encoding || "UTF-8";
            var data = {
                'from' : from,
                'groups' : groups,
                'message' : message,
                'encoding' : encoding,
                'receive_dlr' : 0
            };
            
            /* extend data object with adtitional options for sending group sms */
            data = beepsend.extend(data, options);
            
            this.api.resource(this.actions.batches+connection, "POST", data, success, error);
        },
        
        /**
         * Get message details of sent messages through Beepsend
         * @param {int} messageId - id of message
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object}
         */
        lookup: function(messageId, success, error)
        {
            this.api.resource(this.actions.sms+messageId, "GET", {}, success, error);
        },
        
        /**
         * Get messages details of sent messages through Beepsend
         * @param {object} options - options to fetch messages. More info on: http://api.beepsend.com/docs.html#sms-lookup-multiple
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object}
         */
        multipleLookup: function(options, success, error)
        {
            options = options || {};
            this.api.resource(this.actions.sms, "GET", options, success, error);
        },
        
        /**
         * Validate SMS
         * @param {int|string} from - phone number we are sending from or text 
         * @param {int|array} to - Number of recipient or array with recipient numbers
         * @param {string} message - text message
         * @param {string} connection - Connection id to use for sending sms
         * @param {string} encoding - Encoding of message UTF-8, ISO-8859-15 or Unicode
         * @param {object} options - object of aditional options for sending sms. More info on: http://api.beepsend.com/docs.html#send-sms
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object}
         */
        validate: function(from, to, message, connection, encoding, options, success, error)
        {
            connection = connection || "";
            encoding = encoding || "UTF-8";
            var data = {
                'from' : from,
                'to' : to,
                'message' : message,
                'encoding' : encoding,
                'receive_dlr' : 0
            };
            
            /* extend data object with adtitional options for validating sms */
            data = beepsend.extend(data, options);
            
            this.api.resource(this.actions.validate+connection, "POST", data, success, error);
        },
        
        /**
         * Get previous batches
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object}
         */
        batches: function(success, error)
        {
            this.api.resource(this.actions.batches, "GET", {}, success, error);
        },
        
        /**
         * Estimate SMS cost
         * @param {int|array} to - Number of recipient or array with recipient numbers
         * @param {string} message - text message
         * @param {string} connection - Connection id to use for sending sms
         * @param {string} encoding - Encoding of message UTF-8, ISO-8859-15 or Unicode
         * @param {function} success - callback function for handling success response
         * @param {function} error - callback function for handling error
         * @returns {object}
         */
        estimateCost: function(to, message, connection, encoding, success, error)
        {
            connection = connection || "";
            encoding = encoding || "UTF-8";
            var data = {
                'to' : to,
                'message' : message,
                'encoding' : encoding
            };
            this.api.resource(this.actions.sms+this.actions.estimation+connection, "POST", data, success, error);
        },
        
        estimateCostGroup: function(groups, message, connection, encoding, success, error)
        {
            connection = connection || "";
            encoding = encoding || "UTF-8";
            var data = {
                'groups' : groups,
                'message' : message,
                'encoding' : encoding
            };
            
            this.api.resource(this.actions.sms+this.actions.estimation+connection, "POST", data, success, error);
        }
        
};

beepsend.extend = function(def, params)
{
    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            def[key] = params[key];
        }
    }
    return def;
}

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
    
    resource: function(resource, type, data, callback, error)
    {
//        if(typeof $ == 'undefined') {
            this.resourceHandler(resource, type, data, callback, error);
//        }
//        else {
//            this.resourceJquery(resource, type, data, callback, error);
//        }
    },
    
    /**
     * Resource function
     * @param {string} resource - this is resource string
     * @param {string} type - type of request, GET, POST, etc...
     * @param {json} data
     * @param {string} callback - this is name of success callback function to process received data
     * @param {string} error - this is name of error callback function to process errors on requests
     */
    resourceHandler: function(resource, type, data, callback, error)
    {
        if (window.XMLHttpRequest){
            var xhr = new XMLHttpRequest();   
        } else {
            var xhr = new ActiveXObject("Microsoft.XMLHTTP");
        };
        
        callback = callback || this.successCallback;
        error = error || this.errorCallback;
        
        var fullResourceUrl = this.buildRequestUrl(resource);
        
        if(type== "GET") {
            var qs = (this.serialize(data).length > 0) ? '&'+this.serialize(data) : this.serialize(data);
            fullResourceUrl = fullResourceUrl+qs;
        }
        
        xhr.open(type, fullResourceUrl, true);
        
        if(type == "POST" || type == "PUT" || type == "DELETE") {
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//            xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
//            xhr.setRequestHeader("Content-length", data.length);
//            xhr.setRequestHeader("Connection", "close");
            xhr.send(this.serialize(data));
        }
        
        else {
            xhr.send();
        }       
        
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                callback(JSON.parse(xhr.responseText));
            }
            else {
//                error(xhr, xhr.status, resource);
            }
        }
        
    },
    
    resourceJquery: function(resource, type, data, callback, error) {
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
    
    resourceRaw: function(resource, type, data, callback, error) {
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
            data: {"raw" : data},
//            processData: false,
            success: callback,
            error: error
        });
    },
    
    /**
     * Function for serializing json object to query string
     * @param {object} obj - object that we want to serialize
     * @param {string} prefix for all object keys
     * @returns {String} query string
     */
    serialize: function(obj, prefix) {
        var str = [];
        for(var p in obj) {
          var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
          str.push(typeof v == "object" ?
            this.serialize(v, k) :
            encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
        return str.join("&");
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
    errorCallback: function(xhr, status, resource) {
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
                console.log('Error: Unknown error ' + status);
                
        } 
    },
    
};