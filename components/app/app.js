(function () {
    'use strict';

    //import
    /**
     @constant
     @type {Communication}
     @param {object} default base URL
     */
    const Chat = window.Chat;
    const Form = window.Form;
    const Communication = window.Communication;
    const comm = new Communication({
        baseUrl: 'https://firstchat-637f0.firebaseio.com/messages.json'
    });

    /**
     Class Mediator, run the application
     @this  {App}
     @param {object} options
     @param {HTMLElement} options.el - (el: document.querySelector('.app'))
     */

    class App {
        constructor(options) {
            this.el = options.el;
            this._createComponents();
            this._initMediate();

            // добавляем элементы чата и формы , к  текущему div
            this.el.appendChild(this.chat.el);
            this.el.appendChild(this.form.el);

            this.render();

        }

        render() {
            this.chat.render();
            this.form.render();
        }
   /**
    * @description Create Components of the chat
    * @protected
    */
         _createComponents() {
       // новый экземпляр класса чат, передаем в конструктор ссылку на элемент DOM,
       // экземпляр communication ( для метода получения сообщений с БД, обьект - массив сообщений
       // username=null, реальное имя будет из метода getUserName, после ввода пользователем
            this.chat = new Chat({
                el: document.createElement('div'),
                comm,
                data: {
                    messages: [],
                    user: null
                }
            });

            this.form = new Form({
                el: document.createElement('div')
            });
         }

        /**
         * @description Start-up of the chat
         * @protected
         */
        _initMediate() {
            /** call method on - subscribed on  event with name 'message', listen form */
            on.apply(this.form, ['message', (event) => {
                let data = event.detail;
            // Form from event.detail - a new message with dataText
                data = {
                    name: this.chat._getUserName(),
                    text: data.message.value,
                    date: timestump.apply(this)
                };
            // send message to the DB, through method sendMessage(data, cb)
                comm.sendMessage(data, () => {
                    console.log('NEW MSG' + data);
                });

                this.chat.addMessage(data);
                this.chat.render();
                this.form.reset();
            }]);
        }
         // for console testing
        addMessage(data) {
         this.chat.addMessage(data);
         }
    }

    //export
    window.App = App;
})();
