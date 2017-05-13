/*!
 * https://github.com/leonardosnt/mc-player-counter
 *
 * Copyright (C) 2017 leonardosnt
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

class PlayerCounter {
  constructor({ ip, element, format = '{online}' , refreshRate = 5e3 }) {
    if (ip == undefined) {
      throw TypeError('ip cannot be null or undefined');
    }

    if (element == undefined) {
      throw TypeError('element cannot be null or undefiend');
    }

    this.ip = ip;
    this.format = format;
    this.element = typeof element === 'string'
      ? document.querySelector(element)
      : element;

    this.runQuery();
    this.timerId = setInterval(this.runQuery.bind(this), refreshRate);
  }

  runQuery() {
    // I'll use XMLHttpRequest because it has a better browser support
    // than fetch & Promise.
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState !== 4 || request.status !== 200) return;

      const FORMAT_REGEX = /{\b(online|max)\b}/ig;
      const data = JSON.parse(request.responseText);
      const text = this.format.replace(FORMAT_REGEX, (match, group) => data.players[group]);

      this.element.innerHTML = text;
    };
    request.open('GET', `https://mcapi.ca/query/${this.ip}/players`);
    request.send();
  }
}

const onDomLoad = function() {
  const  elements = document.querySelectorAll('[data-playercounter-ip]');

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    new PlayerCounter({
      element: element,
      ip: element.getAttribute('data-playercounter-ip') || undefined,
      format: element.getAttribute('data-playercounter-format') || undefined,
      refreshRate: element.getAttribute('data-playercounter-refreshRate') || undefined
    });
  }
};

if (document.readyState === 'complete') {
  onDomLoad();
} else {
  window.onload = onDomLoad;
}

window.PlayerCounter = PlayerCounter;