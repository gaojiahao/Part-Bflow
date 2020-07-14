
let  msgVoice = {};

let msgAudio = new Audio();

msgAudio.setAttribute('src',require("@/assets/rtmsg.mp3"));

msgVoice.success = function(){
    msgAudio.currentTime = 0;
    msgAudio.play();
    setTimeout(() => {
        msgAudio.pause();
    }, 500);
}

export default msgVoice 
