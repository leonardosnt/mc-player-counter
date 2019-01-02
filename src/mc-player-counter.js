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
      const data = JSON.parse(request.responseText);
      //console.log(data.offline ? 'offline' : 'online');
      const displayStatus = this.element.getAttribute('data-playercounter-status');
      // Display server status.
      // offline/online
      if (displayStatus !== null) {
        this.element.innerText = data.offline ? 'offline' : 'online';
        return;
      }

      // Display online players
      // Make sure server is online
      if (!data.offline) {
        const text = data.players.online;
        this.element.innerHTML = text;
      }
    };
    request.open('GET', `https://api.mcsrvstat.us/1/${this.ip}`);
    request.send();
  }
}

const onDomLoad = function() {
  const elements = document.querySelectorAll('[data-playercounter-ip]');

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
