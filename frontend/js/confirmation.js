'use strict';

const BaseComponent = require('./baseComponent');

class Confirmation extends BaseComponent {
  constructor(options) {
    super(options.element);

    this.on('click', this._onSubmit.bind(this), '[data-element="submit"]');
    this.on('click', this._onReset.bind(this), '[data-element="reset"]');
  }

  _onSubmit() {
    this.trigger('submit');
  }

  _onReset() {
    this.trigger('reset');
  }
}

module.exports = Confirmation;