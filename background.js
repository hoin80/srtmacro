async function playSound(source = "assets/tada.mp3") {
	await createOffscreen();
	await chrome.runtime.sendMessage({ play: { source }});
}

async function createOffscreen() {
	if (await chrome.offscreen.hasDocument()) {
		return;
	}

	await chrome.offscreen.createDocument({
		url: "offscreen.html",
		reasons: ["AUDIO_PLAYBACK"],
		justification: "alram"
	});
}

function sendMessageToTelegram() {
	var botToken = localStorage['botToken'];
    var chatId = localStorage['chatId'];
	var msg = encodeURI('Macro has been stopped. Please check your reservation status.');
	if (botToken != undefined && chatId != undefined) {
        var url = 'https://api.telegram.org/bot' + botToken + '/sendMessage?chat_id=' + chatId + '&text=' + msg;
        
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                var response = xmlhttp.responseText; //if you need to do something with the returned value
            }
        }
        xmlhttp.open('GET', url, true);
        xmlhttp.send();
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message && message.type === 'playSound') {
		playSound();
		sendMessageToTelegram();
		sendResponse(true);
    }
});