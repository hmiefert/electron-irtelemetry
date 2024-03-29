(function(){
    let globalPayload = {}
    function handleUpdate (payload) {
        globalPayload = payload

        const connectionStatusElement = document.getElementById("connectionStatus")
        const liveTelemetryElement = document.getElementById("liveTelemetry")
        const sessionInfoElement = document.getElementById("sessionInfo")

        const saveToDesktopBtn = document.getElementById("saveToDesktop")
        saveToDesktopBtn.addEventListener('click', saveToDesktop)

        if (payload.connected) {
            // console.log("iRacing connected")
            connectionStatusElement.innerText = "connected"
        } else {
            // console.log("iRacing disconnected")
            connectionStatusElement.innerText = "disconnected"
            liveTelemetryElement.innerText = ""
            sessionInfoElement.innerText = ""
        }
        
        if (payload.sessionInfo) {
            // console.log("iRacing sessionInfo received")
            // console.log(payload.sessionInfo)
            let sessionInfo = {
                trackDisplayName: payload.sessionInfo.data.WeekendInfo.TrackDisplayName,
                trackCountry: payload.sessionInfo.data.WeekendInfo.TrackCountry,
                trackLength: payload.sessionInfo.data.WeekendInfo.TrackLength,
                
                trackWeatherType: payload.sessionInfo.data.WeekendInfo.TrackWeatherType,
                trackSkies: payload.sessionInfo.data.WeekendInfo.TrackSkies,

                driverUserID: payload.sessionInfo.data.DriverInfo.DriverUserID,
                driverCarIdx: payload.sessionInfo.data.DriverInfo.DriverCarIdx,
                driverSetupName: payload.sessionInfo.data.DriverInfo.DriverSetupName,
            }
            sessionInfo.driversCarIdxUserName = payload.sessionInfo.data.DriverInfo.Drivers[sessionInfo.driverCarIdx].UserName,
            sessionInfo.driversCarIdxIRating = payload.sessionInfo.data.DriverInfo.Drivers[sessionInfo.driverCarIdx].IRating,
            sessionInfo.driversCarIdxLicString = payload.sessionInfo.data.DriverInfo.Drivers[sessionInfo.driverCarIdx].LicString,
            sessionInfo.driversCarIdxCurDriverIncidentCount = payload.sessionInfo.data.DriverInfo.Drivers[sessionInfo.driverCarIdx].CurDriverIncidentCount,
            

            sessionInfoElement.innerText = JSON.stringify(sessionInfo, null, 2)
        }

        if (payload.telemetryData) {
            // console.log("iRacing sessionInfo received")
            // console.log(payload.telemetryData)
            let telemetry = {}
            telemetry.frameRate = numToFixed(payload.telemetryData.values.FrameRate, 1) + " FPS"
            telemetry.gpuUsageForeground = numToFixed(payload.telemetryData.values.GpuUsage * 100, 0) + " %"
            telemetry.cpuUsageForeground = numToFixed(payload.telemetryData.values.CpuUsageFG * 100, 0) + " %"
            telemetry.cpuUsageBackground = numToFixed(payload.telemetryData.values.CpuUsageBG * 100, 0) + " %"
            telemetry.connectionQuality = numToFixed(payload.telemetryData.values.ChanQuality * 100, 0) + " %"
            telemetry.connectionLatency = numToFixed(payload.telemetryData.values.ChanLatency * 1000, 0) + " ms"
            telemetry.connectionAvgLatency = numToFixed(payload.telemetryData.values.ChanAvgLatency * 1000, 0) + " ms"

            telemetry.airTemp = numToFixed(payload.telemetryData.values.AirTemp, 1) + " C"
            telemetry.trackTemp = numToFixed(payload.telemetryData.values.TrackTemp, 1) + " C"
                
            telemetry.steeringWheelAngle = numToFixed(radToDegree(payload.telemetryData.values.SteeringWheelAngle), 0) + " °"
            telemetry.throttle = numToFixed(payload.telemetryData.values.Throttle * 100, 0) + " %"
            telemetry.brake = numToFixed(payload.telemetryData.values.Brake * 100, 0) + " %"
            telemetry.clutch = numToFixed(payload.telemetryData.values.Clutch * 100, 0) + " %"
            telemetry.gear = payload.telemetryData.values.Gear

            telemetry.rpm = numToFixed(payload.telemetryData.values.RPM, 0)
            telemetry.speed = numToFixed(metersPerSecondToKilometersPerHour(payload.telemetryData.values.Speed), 0) + " km/h"
                
            telemetry.sessionTime = displayTime(payload.telemetryData.values.SessionTime)
            telemetry.sessionTimeRemain = displayTime(payload.telemetryData.values.SessionTimeRemain)
            telemetry.sessionTimeTotal = displayTime(payload.telemetryData.values.SessionTimeTotal)

            liveTelemetryElement.innerText = JSON.stringify(telemetry, null, 2)
        }
    }
    
    window.iRacing.init(handleUpdate)

    function saveToDesktop(){
        window.iRacing.saveToDesktop(globalPayload)
    }

    function numToFixed(n, d=2) {
        return n.toFixed(d)
    }

    function displayTime(seconds, showDecimals=false) {
        let h = 0
        let m = 0
        let s = 0
        let ms = 0
        const sec = seconds

        if ((sec / 3600) >= 1) {
            h = Math.trunc(sec / 3600)
            s = sec % 3600
        } else {
            s = sec
        }

        if ((s / 60) >= 1) {
            m = Math.trunc(s / 60)
            s = s % 60
        }

        if (showDecimals) {
            ms = s - Math.trunc(s)
            s = Math.trunc(s)
            
            return h + 'h ' + m + "m " + s + "s " + ms.toFixed(3) * 1000 + "ms"
        }

        s = Math.trunc(s)

        return h + 'h ' + m + "m " + s + "s"
    }

    function radToDegree(n) {
        return n * 180 / Math.PI
    }

    function metersPerSecondToKilometersPerHour(n) {
        return n * 3.6
    }
})()