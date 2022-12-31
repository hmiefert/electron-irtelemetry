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
If you get errors running this command read [this](https://github.com/hmiefert/node-irsdk-2023#prerequesites) and [this](https://github.com/hmiefert/node-irsdk-2023#using-with-electron)
```
npm run recompile
```

Finally start the app
```
npm run start
```
# screenshots
![Screenshot disconnected](https://github.com/hmiefert/electron-irtelemetry/blob/main/screenshot_disconnected.png?raw=true)
![Screenshot connected](https://github.com/hmiefert/electron-irtelemetry/blob/main/screenshot_connected.png?raw=true)