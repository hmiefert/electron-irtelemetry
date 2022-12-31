const { contextBridge, ipcRenderer } = require('electron')
const irsdk = require('node-irsdk-2023')

contextBridge.exposeInMainWorld('iRacing', {
    init: (handleUpdateFunction) => {
        const ir = irsdk.init({
            telemetryUpdateInterval: 500,
            sessionInfoUpdateInterval: 1000
        })
        ir.on('Connected', function () {
            const payload = {
                "connected": true,
            }
            handleUpdateFunction(payload)
        })
        
        ir.on('Disconnected', function () {
            const payload = {
                "connected": false,
            }
            handleFunction(payload)
        })

        ir.on('SessionInfo', function (sessionInfo) {
            const payload = {
                "connected": true,
                "sessionInfo": sessionInfo,
            }
            handleUpdateFunction(payload)
        })
    }
})