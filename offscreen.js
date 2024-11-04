chrome.runtime.onMessage.addListener(msg => {
    if ("play" in msg) {
        playAudio(msg.play);
    }
});

function playAudio({ source }) {
    const audio = new Audio(source);
    audio.play();
}