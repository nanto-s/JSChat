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
                <input name="message" type="text" class="textA" id="textAr">
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

        setFocus(){
        document.getElementById('textAr').focus();
    }

        // form subscribe on event - press 'enter' - call function _onSubmit
        _initEvents () {
           this.el.addEventListener('keypress', this._onSubmit.bind(this));
        }
        /**
         * get new event and create event with name 'message' (function trigger)
         * take data through call _getFormData()
         * param {event} - press 'enter'
         */
        _onSubmit (e) {
            if (e.keyCode!=13) return;
            {
                event.preventDefault();
                let formData = this._getFormData();
                trigger.apply(this, ['message', formData]);
            }
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
                 };
              }
            });
            return formData;
        }

    }

    //export
    window.Form = Form;
})();
