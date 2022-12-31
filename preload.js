const { contextBridge } = require('electron')
const irsdk = require('node-irsdk-2023')

contextBridge.exposeInMainWorld('iRacing', {
    init: (handleUpdate) => {
        const ir = irsdk.init({
            telemetryUpdateInterval: 1/60,
            sessionInfoUpdateInterval: 1000
        })

        // init
        let payload = initPayload()
        handleUpdate(payload)

        // events
        ir.on('Connected', function () {
            payload.connected = true
            handleUpdate(payload)
        })
        
        ir.on('Disconnected', function () {
            payload = initPayload()
            handleUpdate(payload)
        })

        ir.on('SessionInfo', function (sessionInfo) {
            payload.sessionInfo = sessionInfo
            handleUpdate(payload)
        })

        ir.on('Telemetry', function (telemetryData) {
            payload.telemetryData = telemetryData
            handleUpdate(payload)
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
