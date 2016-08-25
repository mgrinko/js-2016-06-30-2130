'use strict';

let _ = require('lodash');

let compiledTemplate = require('../templates/phone-catalogue-template.hbs');

class PhoneCatalogue {
  constructor(options) {
    this._el = options.element;

    this._el.addEventListener('click', this._onPhoneLinkClick.bind(this));
  }

  getElement() {
    return this._el;
  }

  show() {
    this._el.classList.remove('js-hidden')
  }

  hide() {
    this._el.classList.add('js-hidden')
  }

  render(phones) {
    this._el.innerHTML = compiledTemplate({
      phones: phones
    });
  }

  _onPhoneLinkClick(event) {
    if (!event.target.closest('[data-element="phoneLink"]')) {
      return;
    }

    let phoneContainer = event.target.closest('[data-element="phone"]');

    //event.preventDefault();

    this._triggerPhoneSelectedEvent(phoneContainer.dataset.phoneId);
  }

  _triggerPhoneSelectedEvent(phoneId) {
    let customEvent = new CustomEvent('phoneSelected', {
      detail: phoneId
    });

    this._el.dispatchEvent(customEvent);
  }
}

module.exports = PhoneCatalogue;