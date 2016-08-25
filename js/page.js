'use strict';

const AjaxService = require('./ajaxService');

const Filter = require('./filter');
const Sorter = require('./sorter');
const PhoneCatalogue = require('./phoneCatalogue');
const PhoneViewer = require('./phoneViewer');

class Page {
  constructor(options) {
    this._el = options.element;

    this._filter = new Filter({
      element: this._el.querySelector('[data-component="filter"]')
    });

    this._sorter = new Sorter({
      element: this._el.querySelector('[data-component="sorter"]')
    });

    this._catalogue = new PhoneCatalogue({
      element: this._el.querySelector('[data-component="phoneCatalogue"]'),
    });

    this._loadPhones();

    this._viewer = new PhoneViewer({
      element: this._el.querySelector('[data-component="phoneViewer"]')
    });

    this._viewer.hide();

    this._catalogue.getElement().addEventListener('phoneSelected', this._onPhoneSelected.bind(this));
    this._filter.getElement().addEventListener('filterChanged', this._onFilterChanged.bind(this));
  }

  _onPhoneSelected(event) {
    let phoneId = event.detail;

    this._loadPhoneById(phoneId);
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

    AjaxService.loadJSON(url, {
      success: function(phones) {

        // should be removed after server fix
        if (query) {
          let pattern = query.toLowerCase();

          phones = phones.filter(function(phone) {
            return phone.name.toLowerCase().includes(pattern);
          });
        }

        this._catalogue.render(phones);
      }.bind(this),

      error: function(error) {
        console.error(error);
      }.bind(this)
    });
  }

  _loadPhoneById(phoneId) {
    AjaxService.loadJSON(`/data/${phoneId}.json`, {
      method: 'GET',

      success: function(phoneDetails) {
        this._catalogue.hide();

        this._viewer.render(phoneDetails);
        this._viewer.show();
      }.bind(this),

      error: function(error) {
        console.error(error);
      }.bind(this)
    });
  }
}

module.exports = Page;