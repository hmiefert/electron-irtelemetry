# electron-irtelemetry
Barebones Electron iRacing telemetry project using [node-irsdk-2023](https://github.com/hmiefert/node-irsdk-2023).

# get it up and running
Clone the repo and install dependencies
```
git clone https://github.com/hmiefert/electron-irtelemetry
cd electron-irtelemetry
npm install
```

Recompile node-irsdk-2023 to match electrons NodeJS module version.<br />
```
npm run recompile
```

Finally start the app
```
npm run start
```

# possible errors
If you get errors running `npm install` or `npm run recompile` read [this](https://github.com/hmiefert/node-irsdk-2023#prerequesites) and [this](https://github.com/hmiefert/node-irsdk-2023#using-with-electron)

# screenshots
![Screenshot disconnected](https://github.com/hmiefert/electron-irtelemetry/blob/main/screenshot_disconnected.png?raw=true)
![Screenshot connected](https://github.com/hmiefert/electron-irtelemetry/blob/main/screenshot_connected.png?raw=true)
