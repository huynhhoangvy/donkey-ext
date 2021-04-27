const color = '#3aa757';

// Store data in chrome storage
chrome.runtime.onInstalled.addListener(() => {
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	chrome.storage.sync.set({ color });
	console.log('Default background color set to %green', `color: ${color}`);
	// console.log(document.getElementById('scrollBtn'));
	// console.log(document);
});

// event listener for tab url change
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tag) => {
	// read changeInfo data and do something with it (e.g. read the url and send the new rl to content-script.js)
	if ( changeInfo.url ) {
		console.log('url changed, from background.js: ', changeInfo.url);
		chrome.tabs.sendMessage(tabId, {
			type: 'urlChanged',
			message: 'message from background.js',
			url: changeInfo.url,
			changeInfo,
		});
	}
});

