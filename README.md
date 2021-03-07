# mc-player-counter

Displays the number of online players in your Minecraft Server on your website using 2 lines of HTML.

The only two lines needed are the script tag and the element that will display the number. Example:
```html
<script src="https://cdn.jsdelivr.net/gh/leonardosnt/mc-player-counter/dist/mc-player-counter.min.js"></script>

There are <span data-playercounter-ip="mc.hypixel.net">0</span> players on Hypixel right now.
```

## Options
  - refreshRate - The rate that the counter will refresh (1m by default. Note that https://mcstatus.snowdev.com.br/ has a 30 seconds cache.)
  - format - Format that the counter will be displayed
    - `{max}` - Maximum players
    - `{online}` - Online players
  - ip - Server IP. E.g (`mc.hypixel.net`), with port (`mc.hypixel.net:25565`)
  - element - Element that the counter will be rendered in.

In HTML, the attributes should be prefixed with `data-playercounter-`. E.g (`data-playercounter-ip`)

It's also possible to display the server status by adding the attribute `data-playercounter-status`. It will display "online" or "offline".
See [example](examples/index.html#L12)

## Demo
- https://leonardosnt.github.io/mc-player-counter/examples/ ([Source](https://github.com/leonardosnt/mc-player-counter/blob/master/examples/index.html#L10-L12))

## Example (including HTML template):

HTML
```html
<!DOCTYPE html>
<html>
  <head>
    <!-- ... -->
    <script src="https://cdn.jsdelivr.net/gh/leonardosnt/mc-player-counter/dist/mc-player-counter.min.js"></script>
  </head>
  <body>
    There are <span data-playercounter-ip="my.server.ip">0</span> players online on my server.
  </body>
</html>
```

JS ("API")
```javascript
new PlayerCounter({
  element: element,
  ip: 'server ip',
  format: '{online}/{max}' // default {online}
  refreshRate: 60 * 1000 // default 1m
});
```

## License

Copyright (C) 2017-2021 leonardosnt <leonrdsnt@gmail.com>  
Licensed under the MIT License. See LICENSE file in the project root for full license information.
