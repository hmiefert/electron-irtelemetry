const fs = require('fs')
const os = require("os")
const path = require("path")

const { contextBridge } = require('electron')
const irsdk = require('node-irsdk-2023')


contextBridge.exposeInMainWorld('iRacing', {
    init: (handleUpdate) => {
        const ir = irsdk.init({
            telemetryUpdateInterval: 1/30, // 30Hz instead of max. 60Hz
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
    },
    saveToDesktop: (data) => {
        const userHomeDir = os.homedir()
        const dateTimeString = getFormattedDateTime()
        const telemetryFilePath = path.join(userHomeDir, "Desktop", "telemetry_" + dateTimeString + ".json")

        fs.writeFile(telemetryFilePath, JSON.stringify(data, null, 2), (err) =>{
            if (err) return console.log(err)
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

function getFormattedDateTime() {
    var date = new Date();

    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var min = date.getMinutes()
    var sec = date.getSeconds()
    var mil = date.getMilliseconds()

    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;
    sec = (sec < 10 ? "0" : "") + sec;

    var str = date.getFullYear() + month + day + "_" +  hour + min + sec + mil;

    return str;
}
