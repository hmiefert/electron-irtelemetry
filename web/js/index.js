(function(){
    function handleUpdate (payload) {
        const connectionStatusElement = document.getElementById("connectionStatus")
        const sessionInfoElement = document.getElementById("sessionInfo")

        if (payload.connected) {
            // console.log("iRacing connected")
            connectionStatusElement.innerText = "connected"
        }

        if (!payload.connected){
            // console.log("iRacing disconnected")
            connectionStatusElement.innerText = "disconnected"
        }
        
        if (payload.sessionInfo) {
            // console.log("iRacing sessionInfo received")
            sessionInfoElement.innerText = JSON.stringify(payload.sessionInfo, null, 2)
        }
    }
    
    window.iRacing.init(handleUpdate)
})()