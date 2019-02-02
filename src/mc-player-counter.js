/*!
 * https://github.com/leonardosnt/mc-player-counter
 *
 * Copyright (C) 2017 leonardosnt
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

class PlayerCounter {
  constructor({ ip, element, format, refreshRate }) {
    format = format || '{online}';
    refreshRate = refreshRate || 60 * 1000;

    if (!ip) {
      throw TypeError('ip cannot be null or undefined');
    }

    if (!element) {
      throw TypeError('element cannot be null or undefined');
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
      const response = JSON.parse(request.responseText);
      const displayStatus = this.element.getAttribute('data-playercounter-status');

      // Display server status.
      // offline/online
      if (displayStatus !== null) {
        this.element.innerText = response.online ? 'online' : 'offline';
        return;
      }

      // Display online players
      // Make sure server is online
      if (response.online) {
        this.element.innerHTML = this.format.replace(FORMAT_REGEX, (_, group) => (
          // Change 'online' to 'now' to keep backward compatibility
          response.players[group === 'online' ? 'now' : group])
        );
      }
    };
    request.open('GET', `https://mcapi.us/server/status?ip=${this.ip}`);
    request.send();
  }
}

const onDomLoad = function() {
  const elements = document.querySelectorAll('[data-playercounter-ip]');

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    new PlayerCounter({
      element: element,
      ip: element.getAttribute('data-playercounter-ip'),
      format: element.getAttribute('data-playercounter-format'),
      refreshRate: element.getAttribute('data-playercounter-refreshRate')
    });
  }
};

if (document.readyState === 'complete') {
  onDomLoad();
} else {
  window.onload = onDomLoad;
}

window.PlayerCounter = PlayerCounter;