const { contextBridge } = require('electron')
const irsdk = require('node-irsdk-2023')

contextBridge.exposeInMainWorld('iRacing', {
    init: (handleUpdateFunction) => {
        const ir = irsdk.init({
            telemetryUpdateInterval: 50,
            sessionInfoUpdateInterval: 2000
        })

        // init
        let payload = initPayload()
        handleUpdateFunction(payload)

        // events
        ir.on('Connected', function () {
            payload.connected = true
            handleUpdateFunction(payload)
        })
        
        ir.on('Disconnected', function () {
            payload = initPayload()
            handleFunction(payload)
        })

        ir.on('SessionInfo', function (sessionInfo) {
            payload.sessionInfo = sessionInfo
            handleUpdateFunction(payload)
        })

        ir.on('Telemetry', function (telemetryData) {
            payload.telemetryData = telemetryData
            handleUpdateFunction(payload)
        })
    }
})

function initPayload() {
    return {
        "connected": false,
        "sessionInfo": null,
        "telemetryData": null,
    }
}
