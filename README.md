ADRSIR-UI
=========

User Interface for the [ADRSIR-API](https://gitlab.com/yano404/adrsir-api).

## Usage

### Simplest way
1. Edit config files (`src/config/apiconfig.js` and `src/config/uiconfig.js`)
```js
/*
    src/config/apiconfig.js
*/
// API URL
// Change API_URL to your environment.
export const API_URL = "http://raspberrypi.local:8000"
```
```js
/*
    src/config/uiconfig.js
*/
// Site title
// You can chenge the site title.
export const siteTitle = "ADRSIR-UI"
// Sidebar width
export const drawerWidth = 240;
```

2. Run the app with npm
```
$ npm start
```

### Deploy with nginx
1. Edit config files (`src/config/apiconfig.js` and `src/config/uiconfig.js`)
```js
/*
    src/config/apiconfig.js
*/
// API URL
// Change API_URL to your environment.
export const API_URL = "http://raspberrypi.local:8000"
```
```js
/*
    src/config/uiconfig.js
*/
// Site title
// You can chenge the site title.
export const siteTitle = "ADRSIR-UI"
// Sidebar width
export const drawerWidth = 240;
```

2. Build app
```
$ npm run build
```

3. Edit `adrsir-ui.conf` to suite your environments.
It will be necessary to change `server_name` and `root`.
```
# This is the Nginx configulation file
# Place this file /etc/nginx/conf.d
server {
    listen 80;
    listen [::]:80;
    # your Raspberry Pi's IP
    server_name raspberrypi.local;
    location / {
        # path to build directory
        root /home/pi/adrsir-ui/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

4. Move `adrsir-ui.conf` to /etc/nginx/conf.d and restart nginx.
```
$ systemctl restart nginx
```
Visit `http://<your raspberry pi IP>` in your web browser.
You will see the App.

## License
Copyright (c) 2021 Takayuki YANO
The source code is licensed under the MIT License, see LICENSE.