'use strict';


let catalogueTemplate = document.getElementById('phone-catalogue-template').innerHTML;
let compiledCatalogueTemplate = _.template(catalogueTemplate);

console.log(compiledCatalogueTemplate);

class PhoneCatalogue {
  constructor(options) {
    this._el = options.element;

    this._render(options.phones);

    this._el.addEventListener('click', function(event) {
      if (!event.target.closest('[data-element="phoneLink"]')) {
        return;
      }

      let phoneContainer = event.target.closest('[data-element="phone"]');

      event.preventDefault();

      let customEvent = new CustomEvent('phoneSelected', {
        detail: phoneContainer.dataset.phoneId
      });

      this._el.dispatchEvent(customEvent);
    }.bind(this));
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

  _render(phones) {
    this._el.innerHTML = compiledCatalogueTemplate({
      phones: phones
    });
  }
}