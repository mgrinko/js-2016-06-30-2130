'use strict';

const AjaxService = require('./ajaxService');

const Filter = require('./filter');
const Sorter = require('./sorter');
const PhoneCatalogue = require('./phoneCatalogue');
const PhoneViewer = require('./phoneViewer');
const Confirmation = require('./confirmation');

class Page {
  constructor(options) {
    this._el = options.element;

    this._filter = new Filter({
      element: this._el.querySelector('[data-component="filter"]')
    });

    this._sorter = new Sorter({
      element: this._el.querySelector('[data-component="sorter"]')
    });

    this._confirmation = new Confirmation({
      element: this._el.querySelector('[data-component="confirmation"]')
    });

    this._catalogue = new PhoneCatalogue({
      element: this._el.querySelector('[data-component="phoneCatalogue"]'),
    });


    this._viewer = new PhoneViewer({
      element: this._el.querySelector('[data-component="phoneViewer"]')
    });

    this._catalogue.on('phoneSelected', this._onPhoneSelected.bind(this));
    this._filter.on('filterChanged', this._onFilterChanged.bind(this));
    this._viewer.on('back', this._onBackFromViewer.bind(this));


    this._loadPhones();
  }

  _onBackFromViewer() {
    let query = this._filter.getValue();

    this._loadPhones(query);
  }

  _onPhoneSelected(event) {
    let phoneId = event.detail;

    let loadPhonePromise = this._loadPhoneById(phoneId);
    let confirmationPromise = this._getConfirmationPromise();

    loadPhonePromise
      .catch(this._onError.bind(this));

    this._confirmation.show();

    Promise.all([loadPhonePromise, confirmationPromise])
      .then(function(results) {
        this._showPhone(results[0]);

        this._confirmation.hide();
      }.bind(this))

      .catch(this._onError.bind(this));
  }

  _getConfirmationPromise() {
    return new Promise(function(resolve, reject) {
      this._confirmation.on('submit', function() {
        resolve();
      }.bind(this));

      this._confirmation.on('reset', function() {
        reject();
      }.bind(this));
    }.bind(this));
  }

  _onPhoneLoaded(phoneDetails) {

  }

  _showPhone(phoneDetails) {
    this._catalogue.hide();

    this._viewer.render(phoneDetails);
    this._viewer.show();
  }

  _loadPhoneById(phoneId) {
    return AjaxService.loadJSON(`/data/${phoneId}.json`);
  }

  _onError(error) {
    console.error(error);
  }

  _onFilterChanged(event) {
    let query = event.detail;

    this._loadPhones(query);
  }

  _loadPhones(query) {
    let url = '/data/phones.json';

    if (query) {
      url += '?query=' + query;
    }

    AjaxService.loadJSON(url)
      .then(function(phones) {

        // should be removed after server fix
        if (query) {
          let pattern = query.toLowerCase();

          phones = phones.filter(function(phone) {
            return phone.name.toLowerCase().includes(pattern);
          });
        }

        this._catalogue.render(phones);
        this._catalogue.show();

        this._viewer.hide();
      }.bind(this))

      .catch(this._onError.bind(this));
  }
}

module.exports = Page;