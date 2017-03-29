(function () {
	'use strict';
    /**
     * Class create chatForm to enter messages
     * @this  {Form}
     * @param {object} options
     * @param {HTMLElement} options.el
     */
	class Form {
		constructor(options) {
			this.el = options.el;
            this._initEvents();

		}
        //Draws elements on the page
		render () {
            this.el.innerHTML = `
                <div class="form">
                <form>
                <textarea name="message" type="text" autofocus></textarea>
                <input type="submit" value="Отправить"/>
                </form>
                </div>`;
        // save  elements for cleaning
            this.formEl = this.el.querySelector('form');
        }
        //  forms cleaning
        reset () {
            this.formEl.reset();
        }
        // form subscribe on event - press submit - call function _onSubmit
        _initEvents () {
            this.el.addEventListener('submit', this._onSubmit.bind(this));
        }
        /**
         * get new event and create event with name 'message' (function trigger)
         * take data through call _getFormData()
         * param {event} - press submit
         */
        _onSubmit (event) {
            event.preventDefault();
            let formData = this._getFormData();
            trigger.apply(this, ['message',formData]);
        }
        /**
         * Gets page elements
         * @returns {HTMLElement} forms elements
         * */
        _getInputs () {
            return this.el.querySelectorAll('input, textarea');
                }
        /**
         * get all events from forms elements, check event from input.name=message,
         * create object with input value
         * @returns {object} formData
         * */
        _getFormData () {
            let formData = {};
              [...this._getInputs()].forEach(input => {
                  if(input.name!='message')return;
              {
                 formData[input.name] = {
                     value: input.value
                 }
              }
            });
            return formData;
        }

    }

    //export
    window.Form = Form;
})();
