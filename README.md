# mc-player-counter

Displays the number of online players of your Minecraft Server in your site with 2 lines of HTML.

## Options
  - refreshRate - Rate that the counter will refresh.
  - format - Format that the counter will be displayed
    - `{max}` - Maximum players
    - `{online}` - Online players
  - ip - Server IP. E.g (`mc.hypixel.net`), with port (`mc.hypixel.net:25565`)
  - element - Element that the counter will be rendered in.

In HTML, should be prefixed with `data-playercounter-`. E.g (`data-playercounter-ip`)

## Usage:

HTML
```html
<!DOCTYPE html>
<html>
  <head>
    <!-- ... -->
    <script src="https://cdn.rawgit.com/leonardosnt/mc-player-counter/1.0.0/dist/mc-player-counter.min.js"></script>
  </head>
  <body>
    There are <span data-playercounter-ip="my.server.ip">0</span> players online on my server.
  </body>
</html>
```

JS
```javascript
new PlayerCounter({
  element: element,
  ip: 'server ip',
  format: '{online}/{max}' // default {online}
  refreshRate: 1000 // default 5s (5000)
});
```

## License

Copyright (C) 2017 leonardosnt <leonrdsnt@gmail.com>  
Licensed under the MIT License. See LICENSE file in the project root for full license information.