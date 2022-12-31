(function(){
    function handleUpdate (payload) {
        const connectionStatusElement = document.getElementById("connectionStatus")
        const liveTelemetryElement = document.getElementById("liveTelemetry")
        const sessionInfoElement = document.getElementById("sessionInfo")

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
            telemetry.frameRate = numToFixed(payload.telemetryData.values.FrameRate, 1)
            telemetry.cpuUsageForeground = numToFixed(payload.telemetryData.values.CpuUsageFG, 3)
            telemetry.cpuUsageBackground = numToFixed(payload.telemetryData.values.CpuUsageBG, 3)
            telemetry.connectionQuality = numToFixed(payload.telemetryData.values.ChanQuality, 3)
            telemetry.connectionLatency = numToFixed(payload.telemetryData.values.ChanLatency, 3),
            telemetry.connectionAvgLatency = numToFixed(payload.telemetryData.values.ChanAvgLatency, 3)

            telemetry.airTemp = numToFixed(payload.telemetryData.values.AirTemp, 1)
            telemetry.trackTemp = numToFixed(payload.telemetryData.values.TrackTemp, 1)
                
            telemetry.steeringWheelAngle = numToFixed(payload.telemetryData.values.SteeringWheelAngle)
            telemetry.throttle = numToFixed(payload.telemetryData.values.Throttle)
            telemetry.brake = numToFixed(payload.telemetryData.values.Brake)
            telemetry.clutch = numToFixed(payload.telemetryData.values.Clutch)
            telemetry.gear = payload.telemetryData.values.Gear

            telemetry.rpm = numToFixed(payload.telemetryData.values.RPM)
            telemetry.speed = numToFixed(payload.telemetryData.values.Speed)
                
            telemetry.sessionTime = numToFixed(payload.telemetryData.values.SessionTime, 1)
            telemetry.sessionTimeRemain = numToFixed(payload.telemetryData.values.SessionTimeRemain, 1)
            telemetry.sessionTimeTotal = numToFixed(payload.telemetryData.values.SessionTimeTotal, 1)

            liveTelemetryElement.innerText = JSON.stringify(telemetry, null, 2)
        }
    }
    
    window.iRacing.init(handleUpdate)

    function numToFixed(n, d=2) {
        return n.toFixed(d)
    }
})()