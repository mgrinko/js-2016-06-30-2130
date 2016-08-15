'use strict';

class PhoneCatalogue {
  constructor(options) {
    this._el = options.element;

    this._render(options.phones);

    this._el.addEventListener('click', function(event) {
      if (!event.target.closest('[data-element="phoneLink"]')) {
        return;
      }

      event.preventDefault();

      let customEvent = new CustomEvent('phoneSelected', {
        detail: 'phoneId'
      });

      this._el.dispatchEvent(customEvent);
    }.bind(this));
  }

  getElement() {
    return this._el;
  }

  _render(phones) {
    let html = '<ul class="phones">';

    phones.forEach(function(phone) {
      html += `
        <li class="thumbnail">
          <a href="#!/phones/${phone.id}" class="thumb" data-element="phoneLink">
            <img alt="${phone.name}" src="${phone.imageUrl}">
          </a>
          <a href="#!/phones/${phone.id}" data-element="phoneLink">${phone.name}</a>
          <p>${phone.snippet}</p>
        </li>
      `;
    }.bind(this));

    html += '</ul>';

    this._el.innerHTML = html;
  }
}