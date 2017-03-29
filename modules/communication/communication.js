(function () {
    'use strict';
    /**
     * Class representing a connection
     * @this  {Communication}
     * @param {object} baseUrl - base Url to connection on DB (BAAS fireBase)
     */

    class Communication {
        constructor({baseUrl}) {
            this.baseUrl = baseUrl;

        }
        /**
         * @description Create connection and send or receive messages to DB
         * @protected
         * @param {function(object)} cb - A callback to run
         * @param {string} [type=GET] - request type
         * @param {object} data - ChatData
         */
        _makeRequest(cb, type = 'GET', data = {}) {
            let xhr = new XMLHttpRequest();
            xhr.open(type, this.baseUrl, true);

            xhr.onload = () => {
                console.log('onload DATA:', JSON.parse(xhr.responseText));
                cb(JSON.parse(xhr.responseText));
            };
            xhr.send(JSON.stringify(data));
            console.log('after send DATA:', xhr.responseText);
        }

        /**
         * @description receive messages from DB, and pulls out an array of messages from the object
         * @public
         * @param {function(object)} cb - A callback to run
         */
        getMessages(cb) {
            this._makeRequest(messages => cb(Object.values(messages)));
            console.log('getMessages (cb)-' + cb);

        }
        /**
         * @description send messages to the DB, request type - POST
         * @public
         * @param {object} data - messages body
         * @param {function()} cb - A callback to run
         */
        sendMessage(data, cb) {
            console.log('sendMessage' + data);
            this._makeRequest(cb, 'POST', data);
            console.log('sendMessage' + cb);
        }

    }

    //export
    window.Communication = Communication;
})();
