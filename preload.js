const { contextBridge, ipcRenderer } = require('electron')
const irsdk = require('node-irsdk-2023')

contextBridge.exposeInMainWorld('iRacing', {
    init: () => {
        const ir = irsdk.init({
            telemetryUpdateInterval: 500,
            sessionInfoUpdateInterval: 5000
        })
        ir.on('Connected', function () {
            console.log('iRacing telemetry connected')
            ipcRenderer.send('{"connected": true}')
        })
        
        ir.on('Disconnected', function () {
            console.log('iRacing telemetry disconnected')
            ipcRenderer.send('{"connected": false}')
        })
    }
})