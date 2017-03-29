(function () {
    'use strict';
    /**
     * Class create chat window
     * @this  {Chat}
     * @param {object} options
     * @param {HTMLElement} options.el
     * @param {object} options.comm - Communications class instance
     * @typedef {Object} data (ChatData)
     * @property {string} data.user - current user - name
     * @property {Array<messages>} data.messages - Array of the messages
     * @typedef {Object} messages (ChatMessage)
     * @property {string} text - messages text
     * @property {string} name - user name
     */

    class Chat {
        constructor({el, comm, data = {messages: []}}) {
            this.el = el;
            this.data = data;
            this._getUserName();

            this.comm = comm;
            this._init();
            this._initEvents();
        }
        /**
         * Listen event from input 'user' - UserName
         * set UserName - call _setUser(name)
         * */
        _initEvents () {
            this.el.addEventListener('change', (event) => {
                if (event.target.classList.contains('user')) {
                    this._setUser(event.target.value);
                    this.render();
                }
            })
        }

        _init() {
            this.startPolling();

        }
        /**
         * server polling (If there is a username)through each 3 sec,
         * call function comm.getMessages and send cb, and Puts the data - data.messages
         */
        startPolling(){
            setInterval(()=> {
                if (!this.data.user) {
                    return;
                }
                this.comm.getMessages(data => {
                console.log('getMessages', data);
                this.data.messages = data;
                this.render();

            })},3000);

        }
        // Draws each message
        render() {

            let usr;
            if (!this.data.user) {
                usr = `<input type="text" class="user" placeholder=" Please, insert name_">`;
            } else usr = `<div class="header">Chat : ${this.data.user} ...</div>`;
            this._saveScrollTop();
            this.el.innerHTML = `
			<div class="container">
                         ${usr}
				  <div class="chat__box">
				    ${this._generateMessages()}
				  </div>
			</div>
			`;
            this._restoreScrollTop();
        }
        //Get current scrolling and save to ScrollTop variable
        _saveScrollTop () {
            let chatBox = this.el.querySelector('.container');

            if (chatBox) {
                this.ScrollTop= chatBox.scrollTop+30;
            }
        }
        //Set  current scrolling  on ScrollTop variable
        _restoreScrollTop () {
            let chatBox = this.el.querySelector('.container');

            if (chatBox) {
                chatBox.scrollTop = this.ScrollTop;
            }
        }

        /**
         * Add new message to the chat
         * @param {object} data
         * @property {string} data.user - current user - name
         * @property {string} data.avatar- user avatar
         * @property {string} data.text - messages text
         * @property {date} data.date - send message date
         */
        addMessage(data) {
            this.data.messages.push({
                avatar: 'http://i.imgur.com/FHMnsVNt.jpg',
                name: data.name || this.data.user,
                text: data.text,
                date: data.date
            });
        }
        // Drows messages to the chat
        _generateMessages() {
            let data = this.data.messages;
            let s;
            if (!data.length) {
                return `Сообщений нет`;
            }
            return data.map(item => {
                if (item.text)
                    if (item.name != 'Tal') {
                        s = 'auser_color';
                    } else s = 'user_color';
                return `<div class=container_msg>
                            <div> <span class=${s}>${item.name}&gt;_</span> 
                                 ${item.text}
                               <span class="time">${item.date || timestump.apply(this)} 
                            </div>
                         </div>
				`
            }).join('');

        }
        /**
         * get user name
         * @returns {string} user name
         * */
        _getUserName() {
            return this.data.user;
        }
        /**
         * set user name
         * @param {string} name
         * */
        _setUser(name) {
            this.data.user = name;
        }

    }


    //export
    window.Chat = Chat;
})();
