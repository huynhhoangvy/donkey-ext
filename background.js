const color = '#3aa757';

// Store data in chrome storage
chrome.runtime.onInstalled.addListener(() => {
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	chrome.storage.sync.set({ color });
	console.log('Default background color set to %green', `color: ${color}`);
	// console.log(document.getElementById('scrollBtn'));
	// console.log(document);
});

