;(function() {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * https://github.com/leonardosnt/mc-player-counter
 *
 * Copyright (C) 2017 leonardosnt
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

var PlayerCounter = function () {
  function PlayerCounter(_ref) {
    var ip = _ref.ip,
        element = _ref.element,
        _ref$format = _ref.format,
        format = _ref$format === undefined ? '{online}' : _ref$format,
        _ref$refreshRate = _ref.refreshRate,
        refreshRate = _ref$refreshRate === undefined ? 5e3 : _ref$refreshRate;

    _classCallCheck(this, PlayerCounter);

    if (ip == undefined) {
      throw TypeError('ip cannot be null or undefined');
    }

    if (element == undefined) {
      throw TypeError('element cannot be null or undefiend');
    }

    this.ip = ip;
    this.format = format;
    this.element = typeof element === 'string' ? document.querySelector(element) : element;

    this.runQuery();
    this.timerId = setInterval(this.runQuery.bind(this), refreshRate);
  }

  _createClass(PlayerCounter, [{
    key: 'runQuery',
    value: function runQuery() {
      var _this = this;

      // I'll use XMLHttpRequest because it has a better browser support
      // than fetch & Promise.
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState !== 4 || request.status !== 200) return;

        var FORMAT_REGEX = /{\b(online|max)\b}/ig;
        var data = JSON.parse(request.responseText);
        var displayStatus = _this.element.getAttribute('data-playercounter-status');

        // Display server status.
        // offline/online
        if (displayStatus !== null) {
          _this.element.innerText = data.status ? 'online' : 'offline';
          return;
        }

        // Display online players
        // Make sure server is online
        if (data.status) {
          var text = _this.format.replace(FORMAT_REGEX, function (match, group) {
            return data.players[group];
          });
          _this.element.innerHTML = text;
        }
      };
      request.open('GET', 'https://mcapi.ca/query/' + this.ip + '/players');
      request.send();
    }
  }]);

  return PlayerCounter;
}();

var onDomLoad = function onDomLoad() {
  var elements = document.querySelectorAll('[data-playercounter-ip]');

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

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
}());
