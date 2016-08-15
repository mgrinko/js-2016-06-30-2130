'use strict';

class PhoneCatalogue {
  constructor(options) {
    this._el = options.element;

    this._render(options.phones);
  }

  _render(phones) {
    let html = '<ul class="phones">';

    phones.forEach(function(phone) {
      html += `
        <li class="thumbnail">
          <a href="#!/phones/${phone.id}" class="thumb">
            <img alt="${phone.name}" src="${phone.imageUrl}">
          </a>
          <a href="#!/phones/${phone.id}">${phone.name}</a>
          <p>${phone.snippet}</p>
        </li>
      `;
    }.bind(this));

    html += '</ul>';

    this._el.innerHTML = html;
  }
}