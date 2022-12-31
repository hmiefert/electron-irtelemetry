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
            // console.log("iRacing telemetryData received")
            // console.log(payload.telemetryData)
            let telemetry = {
                airTemp: payload.telemetryData.values.AirTemp,
                trackTemp: payload.telemetryData.values.TrackTemp,
                
                steeringWheelAngle: payload.telemetryData.values.steeringWheelAngle,
                throttle: payload.telemetryData.values.Throttle,
                brake: payload.telemetryData.values.Brake,
                gear: payload.telemetryData.values.Gear,

                rpm: payload.telemetryData.values.RPM,
                speed: payload.telemetryData.values.Speed,
                
                sessionUID: payload.telemetryData.values.SessionUniqueID,
                sessionTime: payload.telemetryData.values.SessionTime,
                sessionTimeRemail: payload.telemetryData.values.SessionTimeRemail,
                sessionTimeTotal: payload.telemetryData.values.SessionTimeTotal,
            }
            liveTelemetryElement.innerText = JSON.stringify(telemetry, null, 2)
        }
    }
    
    window.iRacing.init(handleUpdate)
})()