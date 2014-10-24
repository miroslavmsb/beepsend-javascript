/**
 * Beepsend JavaScript Library
 * @version 1.0.0
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
        'api_port' : '443',
        'api_version' : '2'
    };
    
    this.initialize(params);
};

beepsend.prototype = (function() {
            
    return {
        /**
         * Function for seting api params 
         * @param {object} params - initialization parameters
         */
        initialize: function(params)
        {
            params = params || {};
            /* Extending default parameters with passed in Library initialization */
            this.parameters = beepsend.extend(this.parameters, params);
            
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
         * @returns {beepsend.contacts}
         */
        contacts: function()
        {
            return new beepsend.contacts(this);
        },
        
        /**
         * Get customer resource
         * @returns {beepsend.customer}
         */
        customer: function()
        {
            return new beepsend.customer(this);
        },
        
        /**
         * Get connection resource
         * @returns {beepsend.connection}
         */
        connection: function()
        {
            return new beepsend.connection(this);
        },
        
        /**
         * Get HLR resource
         * @returns {beepsend.hlr}
         */
        hlr: function()
        {
            return new beepsend.hlr(this);
        },
        
        /**
         * Get message resource
         * @returns {beepsend.messages}
         */
        messages: function()
        {
            return new beepsend.messages(this);
        },
        
        /**
         * Get pricelist resource
         * @returns {beepsend.pricelist}
         */
        pricelist: function()
        {
            return new beepsend.pricelist(this);
        },
        
        /**
         * Get search resource
         * @returns {beepsend.search}
         */
        search: function()
        {
            return new beepsend.search(this);
        },
        
        /**
         * Get wallet resource
         * @returns {beepsend.wallet}
         */
        wallet: function()
        {
            return new beepsend.wallet(this);
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
};

beepsend.user.prototype = {
    
    /**
     * Get user details
     * @returns {object} - user object
     */
    get: function()
    {
        return this.api.execute(this.actions.users+this.user, "GET", {});
    },
    
    /**
     * Update user
     * @param {object} options object for user that we want to update
     * @returns {object} updated user object
     * @link http://api.beepsend.com/docs.html#user-update
     */
    update: function(options)
    {
        return this.api.execute(this.actions.users+this.user, "PUT", options);
    },
    
    /**
     * Update user email
     * @param {string} email - new email address
     * @param {string} password - password of user account
     * @returns {object}
     */
    updateEmail: function(email, password)
    {
        var data = {
            "email" : email,
            "password" : password
        };
        return this.api.execute(this.actions.users+this.user+'/'+this.actions.email, "PUT", data);
    },
    
    /**
     * Update user password
     * @param {string} oldPassword
     * @param {string} newPassword
     * @returns {object}
     */
    updatePassword: function(oldPassword, newPassword)
    {
        var data = {
            'password' : oldPassword,
            'new_password' : newPassword
        };
        return this.api.execute(this.actions.users+this.user+'/'+this.actions.password, "PUT", data);
    },
    
    /**
     * Reset user password
     * @param {string} email - email for password reset
     * @returns {object} user object
     */
    resetUserPassword: function(email)
    {
        var data = {
            "email" : email
        };
        return this.api.execute(this.actions.users+this.actions.passwordreset, "GET", data);
    },
    
    /**
     * Set new password
     * @param {string} hash - is sent to you by email address
     * @param {string} password - new password
     * @returns {object} user object
     */
    setNewPassword: function(hash, password)
    {
        var data = {
            'password' : password
        };
        return this.api.execute(this.actions.users+this.actions.password+'/'+hash, "PUT", data);
    },
    
    /**
     * Reset user token
     * @param {string} password - user password
     * @returns {object} new user token
     */
    resetUserToken: function(password)
    {
        var data = {
            'password' : password
        };
        return this.api.execute(this.actions.users+this.user+this.actions.tokenreset, "GET", data);
    },
    
    /**
     * Verify email address
     * @param {string} hash - is sent to you via email
     * @returns {object}
     */
    verifyEmail: function(hash)
    {
        return this.api.execute(this.actions.users+this.actions.email+'/'+hash, "GET", {});
    },
    
    /**
     * Verify phone number
     * @param {type} hash - has from sms message
     * @returns {object}
     */
    verifyPhone: function(hash)
    {
        return this.api.execute(this.actions.users+this.actions.phone+'/'+hash, "GET", {});
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
     * @returns {object}
     */
    summary: function(connection, fromDate, toDate)
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
        
        return this.api.execute(this.actions.summary+connection, "GET", data);
    },
    
    /**
     * This call will give you granular delivery statistics for all messages sorted by each recipient network between two specified dates.
     * @param {sring} connection - connection id
     * @param {int} fromDate - Unix time
     * @param {int} toDate - Unix time
     * @param {string} MCC - Mobile country code
     * @param {string} MNC - Mobile network code
     * @returns {object}
     */
    network: function(connection, fromDate, toDate, MCC, MNC)
    {
        connection = connection || "";
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
            data.mcc = MCC;
        }
        
        if(MNC !== null) {
            data.mnc = MNC;
        }
        
        return this.api.execute(this.actions.network+connection, "GET", data);
        
    },
    
    /**
     * This call will give you delivery statistics for a whole batch
     * @param {int} batchId - batch id
     * @returns {undefined}
     */
    batch: function(batchId)
    {
        batchId = batchId || null;
        return this.api.execute(this.actions.batch+batchId, "GET", {});
    }
    
};

beepsend.connection = function(bs)
{
    this.parameters = bs.parameters;
    this.api = bs.api;
    
    this.actions = {
        'connections' : '/connections/',
        'tokenreset' : '/tokenreset',
        'passwordreset' : '/passwordreset',
        'recipientnumbers' : '/numbers/'
    };
    
};

beepsend.connection.prototype = {
    
    /**
     * Get all connections
     * @returns {collection} collection with all connection objects
     */
    all: function() 
    {
        return this.api.execute(this.actions.connections, "GET", {});
    },
    
    /**
     * Get data for single connection
     * @param {string} connection - connection id or "me" string
     * @returns {undefined}
     */
    get: function(connection)
    {
        connection = connection || 'me';
        return this.api.execute(this.actions.connections+connection, "GET", {});
    },
    
    /**
     * Update connection
     * @param {string} connection - connection id or "me" string if we want to update authorized user connection
     * @param {type} options - options that we want to update
     * @returns {object}
     * @description for details about available options for updating see api documentation
     * @link http://api.beepsend.com/docs.html#connection-update
     */
    update: function(connection, options)
    {
        connection = connection || 'me';
        return this.api.execute(this.actions.connections+connection, "PUT", options);
    },
    
    /**
     * Reset connection token, need to use user token to perform this action
     * @param {string} connection - connection id or "me" string
     * @returns {object} json response with new token
     */
    resetToken: function(connection)
    {
        return this.api.execute(this.actions.connections+connection+this.actions.tokenreset, "GET", {});
    },
    
    /**
     * Reset connection password
     * @param {type} connection - connection id or "me" string
     * @returns {object}
     */
    resetPassword: function(connection)
    {
        connection = connection || "me";
        return this.api.execute(this.actions.connection+connection+this.actions.passwordreset, "GET", {});
    },
    
    /**
     * Recipient numbers for default connection
     * @returns {beepsend.connection.prototype@pro;api@call;execute}
     */
    recipientNumbers: function()
    {
        return this.api.execute(this.actions.recipientnumbers, "GET", {});
    }
    
};

beepsend.contacts = function(bs)
{
    this.parameters = bs.parameters;
    this.api = bs.api;
    
    this.actions = {
        'contacts' : '/contacts/',
        'groups' : '/contacts/groups/',
        'upload' : '/upload/'
    };
    
};

beepsend.contacts.prototype = {
    
    /**
     * Get all contact belonging to your user
     * @param {string} group - group id or name
     * @param {type} sort - Sorting of the collection. Available keys are: name, id. Can be prepended with + or - to change the sorting direction (+ ASC, - DESC).
     * @param {int} sinceId - Returns results more recent than the specified ID
     * @param {string} maxId - Returns results with an ID older than or equal to the specified ID
     * @returns {collection} collection of contacts objects
     */
    all: function(group, sort, sinceId, maxId)
    {
        group = group || null;
        sort = sort || null;
        sinceId = sinceId || null;
        maxId = maxId || null;
        
        var data = {};
        
        if(group !== null) {
            data.group = group;
        }
        
        if(sort !== null) {
            data.sort = sort;
        }
        
        if(sinceId !== null) {
            data.since_id = sinceId;
        }
        
        if(maxId !== null) {
            data.max_id = maxId;
        }
        
        return this.api.execute(this.actions.contacts, "GET", data);
        
    },
    
    /**
     * Create new contact
     * @param {string} msisdn
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} groupId
     * @returns {object} created contact object
     */
    add: function(msisdn, firstName, lastName, groups)
    {
        firstName = firstName || null;
        lastName = lastName || null;
        groups = groups || null;
        
        var data = {
            'msisdn' : msisdn
        };
        
        if(firstName !== null) {
            data.firstname = firstName;
        }
        
        if(lastName !== null) {
            data.lastname = lastName;
        }
        
        if(groups !== null) {
            data.groups = groups;
        }
        
        return this.api.execute(this.actions.contacts, "POST", data);
        
    },
    
    /**
     * Update existing contact
     * @param {string} contactId - id of contact that we want to update
     * @param {object} options - Available keys: msisdn, firstname, lastname, group_id
     * @returns {object} updated contact object
     */
    update: function(contactId, options)
    {
        return this.api.execute(this.actions.contacts+contactId, "PUT", options);
    },
    
    /**
     * Delete contact
     * @param {string} contactId - id of contact that we want to delete
     * @returns {object}
     */
    delete: function(contactId)
    {
        return this.api.execute(this.actions.contacts+contactId, "DELETE", {});
    },
    
    /**
     * Get all contact groups belonging to your user
     * @returns {collection} collection of contact groups objects
     */
    groups: function()
    {
        return this.api.execute(this.actions.groups, "GET", {});
    },
    
    /**
     * Get content of specific group
     * @param {string} groupId - id of group that we want to get
     * @param {int} sinceId - Returns results more recent than the specified ID
     * @param {string} maxId - Returns results with an ID older than or equal to the specified ID
     * @param {string} count - How many objects to fetch. Maximum 200, default 200
     * @returns {object}
     */
    group: function(groupId, sinceId, maxId, count)
    {
        sinceId = sinceId || null;
        maxId = maxId || null;
        count = count || null;
        
        var data = {};
        
        if(sinceId !== null) {
            data.since_id = sinceId;
        }
        
        if(maxId !== null) {
            data.max_id = maxId;
        }
        
        if(count !== null) {
            data.count = count;
        }
        
        return this.api.execute(this.actions.groups+groupId, "GET", data);
    },
    
    /**
     * Create new contacts group
     * @param {string} groupName - name of group that we want to create
     * @returns {object} object of created contact group
     */
    addGroup: function(groupName)
    {
        var data = {
            "name" : groupName
        };
        return this.api.execute(this.actions.groups, "POST", data);
    },
    
    /**
     * Update contact group
     * @param {int} groupId - id of group that we want to update
     * @param {string} groupName - new name for group
     * @returns {object} object of updated contacts group
     */
    updateGroup: function(groupId, groupName)
    {
        var data = {
            "name" : groupName
        };
        return this.api.execute(this.actions.groups+groupId, "PUT", data);
    },
    
    /**
     * Delete contact group
     * @param {int} groupId - id of group that we want to delete
     * @returns {object}
     */
    deleteGroup: function(groupId) 
    {
        return this.api.execute(this.actions.groups+groupId, "DELETE", {});
    },
    
    /**
     * Import contacts to group from .csv file
     * @param {string} file - html5 file object
     * @param {int} groupId - id of group that we want import contacts from csv
     * @returns {object}
     * @todo need to check this function, when we get CORS for POST and PUT request enabled on API
     */
    upload: function(file, groupId)
    {
        var that = this;
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(event) {
           var fileContent = event.target.result;
           return that.api.fileUpload(that.actions.groups+groupId+that.actions.upload, "POST", fileContent);
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
};

beepsend.customer.prototype = {
    
    /**
     * Get customer informations
     * @returns {object}
     */
    get: function()
    {
        return this.api.execute(this.actions.data, "GET", {});
    }
    
};

beepsend.hlr = function(bs)
{
    this.parameters = bs.parameters;
    this.api = bs.api;
    
    this.actions = {
        'hlr' : '/hlr/',
        'validate' : '/hlr/validate/'
    };
};

beepsend.hlr.prototype = {
    
    /**
     * Intermediate HLR call
     * @param {int} msisdn - that we are looking HLR request
     * @param {string} connection - connection id of HLR connection
     * @returns {object}
     */
    intermediate: function(msisdn, connection)
    {
        connection = connection || "me";
        return this.api.execute(this.actions.hlr+msisdn, "GET", {"connection" : connection});
    },
    
    /**
     * Bulk HLR request
     * @param {type} msisdns - array of msisdns ["12212123", "123125344"]
     * @param {type} connection - connection id of HLR connection
     * @returns {object}
     * @description This method requires callback url on application to deliver hlr result response
     */
    bulk: function(msisdns, connection)
    {
        var data = {
            "msisdn" : msisdns,
            "connection" : (connection) ? connection : "me"
        };
        return this.api.execute(this.actions.hlr, "POST", data);
    },
    
    /**
     * Validate HLR request
     * @param {int} msisdn - that we are looking HLR request
     * @returns {object}
     */
    validate: function(msisdn)
    {
        var data = {
            "msisdn" : msisdn,
        };
        
        return this.api.execute(this.actions.validate, "POST", data);
    }
    
};

beepsend.messages = function(bs)
{
    this.parameters = bs.parameters;
    this.api = bs.api;
    
    this.actions = {
        'sms' : '/sms/',
        'validate' : '/sms/validate/',
        'batches' : '/batches/',
        'estimation' : 'costestimate/',
        'messages' : '/messages/',
        'conversations' : '/conversations/'
    };
};

beepsend.messages.prototype = {
    
        /**
         * Send SMS message
         * @param {int|string} from - phone number we are sending from or text 
         * @param {int|array} to - Number of recipient or array with recipient numbers
         * @param {string} message - text message
         * @param {string} connection - Connection id to use for sending sms
         * @param {string} encoding - Encoding of message UTF-8, ISO-8859-15 or Unicode
         * @param {object} options - object of aditional options for sending sms. More info on: http://api.beepsend.com/docs.html#send-sms
         * @returns {object}
         */        
        send: function(from, to, message, connection, encoding, options)
        {
            connection = connection || "";
            encoding = encoding || "UTF-8";
            var data = {
                'from' : from,
                'to' : to,
                'message' : message,
                'encoding' : encoding
            };
            
            /* extend data object with aditional options for sending sms */
            data = beepsend.extend(data, options);
            
            return this.api.execute(this.actions.sms+connection, "POST", data);
        },
        
        /**
         * Send multiple messages to one or more receivers
         * @param {type} messages - beepsend.messagesHelper
         * @param {type} connection - Connection id to use for sending sms
         * @returns {beepsend.messages.prototype@pro;api@call;execute}
         */
        multiple: function(messages, connection)
        {
            connection = connection || "";
            return this.api.execute(this.actions.sms+connection, "POST", messages.get());
        },
        
        /**
         * Send Binary SMS
         * @param {int|string} from - phone number we are sending from or text 
         * @param {int|array} to - Number of recipient or array with recipient numbers
         * @param {string} message - text message
         * @param {string} connection - Connection id to use for sending sms
         * @param {string} encoding - Encoding of message UTF-8, ISO-8859-15 or Unicode
         * @param {object} options - object of aditional options for sending sms. More info on: http://api.beepsend.com/docs.html#send-sms
         * @returns {object}
         */
        binary: function(from, to, message, connection, encoding, options)
        {
            connection = connection || "";
            encoding = encoding || "UTF-8";
            var data = {
                'from' : from,
                'to' : to,
                'message' : message,
                'encoding' : encoding,
                'message_type' : 'binary'
            };
            
            /* extend data object with aditional options for sending sms */
            data = beepsend.extend(data, options);
            
            return this.api.execute(this.actions.sms+connection, "POST", data);
        },
        
        /**
         * Send SMS to group of contacts
         * @param {int|string} from - phone number we are sending from or text 
         * @param {int|array} groups - id of group or array with groups ids
         * @param {string} message - text message
         * @param {string|int} connection - Connection id to use for sending sms
         * @param {string} encoding - Encoding of message UTF-8, ISO-8859-15 or Unicode
         * @param {object} options - object of aditional options for sending sms. More info on: http://api.beepsend.com/docs.html#send-sms
         * @returns {object}
         */
        groupSending: function(from, groups, message, connection, encoding, options)
        {
            connection = connection || "";
            encoding = encoding || "UTF-8";
            var data = {
                'from' : from,
                'groups' : groups,
                'message' : message,
                'encoding' : encoding
            };
            
            /* extend data object with adtitional options for sending group sms */
            data = beepsend.extend(data, options);
            
            return this.api.execute(this.actions.batches+connection, "POST", data);
        },
        
        /**
         * Get message details of sent messages through Beepsend
         * @param {int} messageId - id of message
         * @returns {object}
         */
        lookup: function(messageId)
        {
            return this.api.execute(this.actions.sms+messageId, "GET", {});
        },
        
        /**
         * Get messages details of sent messages through Beepsend
         * @param {object} options - options to fetch messages. More info on: http://api.beepsend.com/docs.html#sms-lookup-multiple
         * @returns {object}
         */
        multipleLookup: function(options)
        {
            options = options || {};
            return this.api.execute(this.actions.sms, "GET", options);
        },
        
        /**
         * Validate SMS
         * @param {int|string} from - phone number we are sending from or text 
         * @param {int|array} to - Number of recipient or array with recipient numbers
         * @param {string} message - text message
         * @param {string} encoding - Encoding of message UTF-8, ISO-8859-15 or Unicode
         * @param {object} options - object of aditional options for sending sms. More info on: http://api.beepsend.com/docs.html#send-sms
         * @returns {object}
         */
        validate: function(from, to, message, encoding, options)
        {
            encoding = encoding || "UTF-8";
            var data = {
                'from' : from,
                'to' : to,
                'message' : message,
                'encoding' : encoding
            };
            
            /* extend data object with adtitional options for validating sms */
            data = beepsend.extend(data, options);
            
            return this.api.execute(this.actions.validate, "POST", data);
        },
        
        /**
         * Get previous batches
         * @returns {object}
         */
        batches: function()
        {
            return this.api.execute(this.actions.batches, "GET", {});
        },
        
        /**
         * Get two way batch
         * @param {int|string} batchId - id of messages batch
         * @param {object} - options object
         * @returns {object}
         */
        twoWayBatch: function(batchId, options)
        {
            batchId = batchId || '';
            options = options || {};
            return this.api.execute(this.actions.batches+batchId+this.actions.messages, "GET", options);
        },
        
        /**
         * Estimate SMS cost
         * @param {int|array} to - Number of recipient or array with recipient numbers
         * @param {string} message - text message
         * @param {string} connection - Connection id to use for sending sms
         * @param {string} encoding - Encoding of message UTF-8, ISO-8859-15 or Unicode
         * @returns {object}
         */
        estimateCost: function(to, message, connection, encoding)
        {
            connection = connection || "";
            encoding = encoding || "UTF-8";
            var data = {
                'to' : to,
                'message' : message,
                'encoding' : encoding
            };
            return this.api.execute(this.actions.sms+this.actions.estimation+connection, "POST", data);
        },
        
        /**
         * Estimate SMS cost for group
         * @param {int|array} groups - group id or array with group ids
         * @param {string} message - text message
         * @param {string} connection - Connection id to use for sending sms
         * @param {string} encoding - Encoding of message UTF-8, ISO-8859-15 or Unicode
         * @returns {object}
         */
        estimateCostGroup: function(groups, message, connection, encoding)
        {
            connection = connection || "";
            encoding = encoding || "UTF-8";
            var data = {
                'groups' : groups,
                'message' : message,
                'encoding' : encoding
            };
            
            return this.api.execute(this.actions.sms+this.actions.estimation+connection, "POST", data);
        },
        
        /**
         * Get all conversations
         * @returns {object}
         */
        conversations: function() 
        {
            return this.api.execute(this.actions.conversations, "GET", {});
        },
        
        /**
         * Get specific conversation
         * @param {int|string} conversationId - id of conversation
         * @param {options} - aditional options
         * @returns {object}
         */
        conversation: function(conversationId, options)
        {
            conversationId = conversationId || "";
            options = options || {};
            return this.api.execute(this.actions.conversations+conversationId, "GET", options);
        }
    
};

beepsend.pricelist = function(bs)
{
    this.parameters = bs.parameters;
    this.api = bs.api;
    
    this.actions = {
        'connections' : '/connections/',
        'pricelists' : '/pricelists/current',
        'download' : '/pricelists/',
        'diff' : '/diff'        
    };
};

beepsend.pricelist.prototype = {
    
    /**
     * Get customer data
     * @param {int} connection - id of connection
     * @returns {object}
     */
    get: function(connection)
    {
        connection = connection || "me";
        return this.api.execute(this.actions.connections+connection+this.actions.pricelists, "GET", {});
    },
    
    /**
     * Get pricelist revisions
     * @param {type} connection
     * @returns {beepsend.pricelist.prototype@pro;api@call;execute}
     */
    getRevisions: function(connection)
    {
        connection = connection || "me";
        return this.api.execute(this.actions.connections+connection+this.actions.download, "GET", {});
    },
    
    /**
     * Download pricelist for provided connection id
     * @param {type} connection - id of connection
     * @param {string} delimiter
     * @param {string} fields - fields that we want to have in downloaded pricelist csv
     * @returns {beepsend.pricelist.prototype@pro;api@call;execute}
     */
    download: function(connection, delimiter, fields)
    {
        connection = connection || "";
        delimiter = delimiter || null;
        fields = fields || null;
        var params = {};
        
        if(delimiter !== null) {
            params.delimiter = delimiter;
        }
        
        if(fields !== null) {
            params.fields = fields;
        }

        var url = this.api.buildRequestUrlWithParams(this.actions.download+connection+'.csv', params);
        
        window.location.assign(url);
    },
    
    /**
     * Compare differences from 2 pricelists
     * @param {type} connection - connection id
     * @param {type} rev1 - id of first pricelist to compare
     * @param {type} rev2 - id of second pricelist to compare
     * @returns {beepsend.pricelist.prototype@pro;api@call;execute}
     */
    diff: function(connection, rev1, rev2)
    {
        connection = connection || "";
        rev1 = rev1 || "";
        rev2 = rev2 || "";
        return this.api.execute(this.actions.download+connection+'/'+rev1+'..'+rev2+this.actions.diff, "GET");
    },
    
    /**
     * Download differences of compared pricelists
     * @param {type} connection - connection id
     * @param {type} rev1 - id of first pricelist to compare
     * @param {type} rev2 - id of second pricelist to compare
     * @param {string} delimiter
     * @param {string} fields - fields that we want to have in downloaded pricelist csv
     */
    diffDownload: function(connection, rev1, rev2, delimiter, fields)
    {
        connection = connection || "";
        rev1 = rev1 || "";
        rev2 = rev2 || "";
        delimiter = delimiter || null;
        fields = fields || null;
        var params = {};
        
        if(delimiter !== null) {
            params.delimiter = delimiter;
        }
        
        if(fields !== null) {
            params.fields = fields;
        }
        
        var url = this.api.buildRequestUrlWithParams(this.actions.download+connection+'/'+rev1+'..'+rev2+this.actions.diff+'.csv', params);
        
        window.location.assign(url);
        
    }
    
};

beepsend.search = function(bs)
{
    this.parameters = bs.parameters;
    this.api = bs.api;
    
    this.actions = {
        'contacts' : '/search/contacts/',
        'groups' : '/search/contact_groups/'
    };
};

beepsend.search.prototype = {
    
    /**
     * Search for contacts
     * @param {string} query - will search entries matching on id, msisdn, firstname and lastname
     * @param {int} groupId - id of group, this is optional parameter, if we want search in group just pass null as value for this param
     * @returns {object}
     */
    contacts: function(query, groupId)
    {
        groupId = groupId || null;
        
        var data = {
            'query' : query
        };
        
        if(groupId !== null)
        {
            data.group_id = groupId;
        }
        
        return this.api.execute(this.actions.contacts, "GET", data);
    },
    
    /**
     * Search for groups
     * @param {string} query - will search entries with matching name
     * @returns {object}
     */
    groups: function(query)
    {
        var data = {
            'query' : query
        };
        
        return this.api.execute(this.actions.groups, "GET", data);
    }
    
};

beepsend.wallet = function(bs)
{
    this.parameters = bs.parameters;
    this.api = bs.api;
    
    this.actions = {
        'wallets' : '/wallets/',
        'transactions' : '/transactions/',
        'transfer' : '/transfer/',
        'notifications' : '/emails/',
        'topup' : '/topup/paypal/'
    };
};

beepsend.wallet.prototype = {
    
    /**
     * Get all wallets that are connected to this user
     * @returns {object}
     */
    all: function()
    {
        return this.api.execute(this.actions.wallets, "GET", {});
    },
    
    /**
     * Get wallet details
     * @param {int} walletId - id of wallet that we want to get
     * @returns {object}
     */
    get: function(walletId)
    {
        return this.api.execute(this.actions.wallets+walletId, "GET", {});
    },
    
    /**
     * Update wallet
     * @param {int} walletId - id of wallet that we want to update
     * @param {type} name - name of wallet
     * @param {type} notifyLimit - email notification limit
     * @returns {object}
     */
    update: function(walletId, name, notifyLimit)
    {
        name = name || null;
        notifyLimit = notifyLimit || null;
        var data = {};
        
        if(name !== null)
        {
            data.name = name;
        }
        
        if(notifyLimit !== null) 
        {
            data.notify_limit = notifyLimit;
        }
        
        return this.api.execute(this.actions.wallets+walletId, "PUT", data);
    },
    
    
    /**
     * Add credit to wallet
     * @param {type} walletId - id of wallet that we want to add credit
     * @param {type} amount - amoutn of money that we want to add
     * @param {type} returnUrl - The URL to redirect a user when a payment is complete and successful. Default: https://beepsend.com/success.html
     * @param {type} cancelUrl - The URL to redirect a user when a payment is aborted. Default: https://beepsend.com/cancel.html
     * @returns {object}
     */
    topup: function(walletId, amount, returnUrl, cancelUrl)
    {
        returnUrl = returnUrl || null;
        cancelUrl = cancelUrl || null;
        
        var data = {
            "amount" : amount
        };
        
        if(returnUrl !== null) {
            data.url.return = returnUrl;
        }
        
        if(cancelUrl !== null) {
            data.url.cancel = cancelUrl;
        }
        
        return this.api.execute(this.actions.wallets+walletId+this.actions.topup, "POST", data); 
        
    },
    
    /**
     * Returns all transaction of wallet
     * @param {int} walletId - id of wallet
     * @param {int} sinceId - Returns results more recent than the specified ID
     * @param {string} maxId - Returns results with an ID older than or equal to the specified ID
     * @param {string} count - How many transactions to fetch. Maximum 200, default 50
     * @returns {object}
     */
    transactions: function(walletId, sinceId, maxId, count)
    {
        sinceId = sinceId || null;
        maxId = maxId || null;
        count = count || null;
        
        var data = {};
        
        if(sinceId !== null) {
            data.since_id = sinceId;
        }
        
        if(maxId !== null) {
            data.max_id = maxId;
        }
        
        if(count !== null) {
            data.count = count;
        }
        
        return this.api.execute(this.actions.wallets+walletId+this.actions.transactions, "GET", data);
    },
    
    /**
     * Transfer credits between your connection wallets
     * @param {int} sourceId - wallet id of source wallet
     * @param {int} targetId - wallet id of target wallet
     * @param {float} amount - amount of credit that we want to transfer
     * @returns {object}
     */
    transfer: function(sourceId, targetId, amount)
    {
        var data = {
            'amount' : amount
        };
        
        return this.api.execute(this.actions.wallets+sourceId+this.actions.transfer+targetId+"/", "POST", data);
    },
    
    /**
     * Get a list of your external emails
     * @param {int} walletId - id of wallet
     * @returns {object}
     */
    notifications: function(walletId)
    {
        return this.api.execute(this.actions.wallets+walletId+this.actions.notifications, "GET", {});
    },
    
    /**
     * Add external email for notifications to wallet
     * @param {int} walletId - id of wallet
     * @param {string} email - email address
     * @returns {object}
     */
    addNotificationEmail: function(walletId, email)
    {
        var data = {
            'email' : email
        };
        
        return this.api.execute(this.actions.wallets+walletId+this.actions.notifications, 'POST', data);
    },
    
    /**
     * Delete external email for notifications to wallet
     * @param {type} walletId - id of wallet
     * @param {type} emailId - email id
     * @returns {object}
     */
    deleteNotificationEmail: function(walletId, emailId)
    {
        return this.api.execute(this.actions.wallets+walletId+this.actions.notifications+emailId, 'DELETE', {});
    }
    
};

/**
 * Function for extending object properties
 * @param {object} def
 * @param {object} params
 * @returns object default params
 */
beepsend.extend = function(def, params)
{
    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            def[key] = params[key];
        }
    }
    return def;
};

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
     * @returns {String}
     */
    buildRequestUrl: function(path) {
        path = path || '';
        var url = this.parameters.api_protocol+this.parameters.api_url+":"+this.parameters.api_port+'/'+this.parameters.api_version+path;
        return url;
    },
    
    buildRequestUrlWithParams: function(path, params)
    {
        path = path || '';
        params = params || {};
        
        var url = this.parameters.api_protocol+this.parameters.api_url+'/'+this.parameters.api_version+path+"?api_token="+this.parameters.api_token;
        
        if(this.serialize(params).length > 0) {
            url = url+"&"+this.serialize(params);
        }
        
        return url;
    },
    
    execute: function(resource, type, data)
    {
        if(typeof $ == 'undefined') {
            return this.resourceHandler(resource, type, data);
        }
        else {
            return this.resourceJquery(resource, type, data);
        }
    },
    
    /**
     * Resource function
     * @param {string} resource - this is resource string
     * @param {string} type - type of request, GET, POST, etc...
     * @param {json} data
     * @returns {beepsend.Deferred.prototype.promise}
     */
    resourceHandler: function(resource, type, data)
    {
        if (window.XMLHttpRequest){
            var xhr = new XMLHttpRequest();   
        } else {
            var xhr = new ActiveXObject("Microsoft.XMLHTTP");
        };
        
        var deferred = new beepsend.Deferred();
        
        var fullResourceUrl = this.buildRequestUrl(resource);
        
        if(type == "GET") {
            var qs = (this.serialize(data).length > 0) ? '?'+this.serialize(data) : this.serialize(data);
            fullResourceUrl = fullResourceUrl+qs;
        }
                
        xhr.open(type, fullResourceUrl, true);
        
        xhr.setRequestHeader('Authorization', 'Token '+this.parameters.api_token);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');

        if(type == "POST" || type == "PUT" || type == "DELETE") {
            xhr.send(JSON.stringify(data));
        }
        
        else {
            xhr.send();
        }       
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                if(xhr.status == 200 || xhr.status == 201 || xhr.status == 204) {
                    switch(xhr.status) {
                        case 200:
                        case 201:
                            deferred.resolve(JSON.parse(xhr.response));
                            break;
                        case 204:
                            deferred.resolve({});
                            break;
                        default:
                            deferred.resolve(JSON.parse(xhr.response));
                    }
                } else {
                    deferred.reject(xhr);
                }
            }            
        };
        return deferred.promise;
    },
    
    fileUpload: function(resource, type, data)
    {
        if (window.XMLHttpRequest){
            var xhr = new XMLHttpRequest();   
        } else {
            var xhr = new ActiveXObject("Microsoft.XMLHTTP");
        };
        
        var deferred = new beepsend.Deferred();
        
        var fullResourceUrl = this.buildRequestUrl(resource);
        
        if(type == "GET") {
            var qs = (this.serialize(data).length > 0) ? '?'+this.serialize(data) : this.serialize(data);
            fullResourceUrl = fullResourceUrl+qs;
        }
                
        xhr.open(type, fullResourceUrl, true);
        
        xhr.setRequestHeader('Authorization', 'Token '+this.parameters.api_token);

        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
        
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                if(xhr.status == 200 || xhr.status == 201 || xhr.status == 204) {
                    switch(xhr.status) {
                        case 200:
                        case 201:
                            deferred.resolve(JSON.parse(xhr.response));
                            break;
                        case 204:
                            deferred.resolve({});
                            break;
                        default:
                            deferred.resolve(JSON.parse(xhr.response));
                    }
                    
                } else {
                    deferred.reject(xhr);
                }
            }            
        };
        return deferred.promise;
    },
    
    /**
     * jQuery resource
     * @param {string} resource - this is resource string
     * @param {string} type - type of request, GET, POST, etc...
     * @param {json} data
     * @return {object} promise object
     * @returns {beepsend.Deferred.prototype.promise}
     */
    resourceJquery: function(resource, type, data) {
       
        var deferred = new beepsend.Deferred();
        /* Generate full url for api call */
        var fullResourceUrl = this.buildRequestUrl(resource);
        var processData = (type == "GET") ? true : false;
        if(type == "GET") {
            data = data;
        } else {
            data = JSON.stringify(data);
        }
        
        /* Execute ajax call */
        $.ajax({
            type: type,
            url: fullResourceUrl,
            headers: {
                'Authorization': 'Token '+this.parameters.api_token,
                'Content-type' : 'application/json; charset=utf-8'
            },
            crossDomain: true,
            processData: processData,
            dataType: 'json',
            async: true,
            data: data,
            success: $.proxy(deferred.resolve, deferred),
            error: $.proxy(deferred.reject, deferred)
        });
        
        return deferred.promise;
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
    }
    
};

beepsend.Promise = function()
{
    this.successCallbacks = [];
    this.errorCallbacks = [];
};

beepsend.Promise.prototype = {
    successCallbacks: null,
    errorCallbacks: null,
    then: function (successCallback, errorCallback) {
        this.successCallbacks.push(successCallback);
        if (errorCallback) {
            this.errorCallbacks.push(errorCallback);
        }
    }
};

beepsend.Deferred = function()
{
    this.promise = new beepsend.Promise();
};

beepsend.Deferred.prototype = {
    promise: null,
    resolve: function (data) {
        if(this.promise.successCallbacks.length > 0) {
            this.promise.successCallbacks.forEach(function(callback) {
                window.setTimeout(function () {
                    callback(data);
                }, 0);
            });
        } else {
            this.successCallback(data);
        }
    },

    reject: function (error) {
        if(this.promise.errorCallbacks.length > 0) {
            this.promise.errorCallbacks.forEach(function(callback) {
                window.setTimeout(function () {
                    callback(error);
                }, 0);
            });
        } else {
            this.errorCallback(error);
        }
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
     * @param {object} xhr response
     */
    errorCallback: function(xhr) {
        switch (xhr.status) {
            case 401:
                throw new beepsend.InvalidToken("A valid user API-token is required.");
            case 403:
                throw new beepsend.InvalidRequest(beepsend.parseError(xhr));
                break;
            case 404:
                throw new beepsend.NotFound("Call you are looking for not existing, this means that something is wrong with API or this SDK.");
                break;
            case 500:
                throw new beepsend.InternalError("Something is wrong with API, please try again later.");
                break;
                
        } 
    }
    
};

beepsend.parseError = function(xhr)
{
    if(xhr.response !== '') {
        var errors = [];
        var response = JSON.parse(xhr.response);
        if(typeof response.errors !== "undefined") {
            for(var i in response.errors) {
                errors.push(response.errors[i].description);
            }
            return errors.toString();
        }
        else if(typeof response[0].errors !== "undefined") {
            return response[0].errors;
            for(var i in response[0].errors) {
                errors.push(response[0].errors[i].description);
            }
            return errors.toString();
        }
    }
    else {
        return "Unknown error has occurred!";
    }
};

beepsend.InvalidToken = function(msg) 
{
    return { 
        name:        "Application Error", 
        level:       "Show Stopper", 
        message:     msg, 
        toString:    function(){return this.name + ": " + this.message;} 
    }; 
};

beepsend.InvalidRequest = function(msg)
{
    return {
        name:        "Invalid request", 
        level:       "Show Stopper", 
        message:     msg, 
        toString:    function(){return this.name + ": " + this.message;}
    };
};

beepsend.NotFound = function(msg) 
{
    return { 
        name:        "Not Found", 
        level:       "Show Stopper", 
        message:     msg, 
        toString:    function(){return this.name + ": " + this.message;} 
    }; 
};

beepsend.InternalError = function(msg) 
{
    return { 
        name:        "System Error", 
        level:       "Show Stopper", 
        message:     msg, 
        toString:    function(){return this.name + ": " + this.message;} 
    }; 
};

beepsend.messagesHelper = function() {
    
    this.messagesBuffer = [];
    
};

beepsend.messagesHelper.prototype = {
    message: function(from, to, message, encoding, options)
    {
        encoding = encoding || "UTF-8";
        options = options || {};
        var data = {
            'from' : from,
            'to' : to,
            'message' : message,
            'encoding' : encoding
        };

        /* extend data object with aditional options for sending sms */
        data = beepsend.extend(data, options);

        this.messagesBuffer.push(data);
    },

    get: function()
    {
        return this.messagesBuffer;
    }
};