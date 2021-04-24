// Initialize button with user's preferred color
const changeColor = document.getElementById('changeColor');
console.log('hello');

// Get the color props from chrome storage
chrome.storage.sync.get('color', ({ color }) => {
	changeColor.style.backgroundColor = color;
});

// Click the button -> inject setPageBackgroundColor into current page
changeColor.addEventListener('click', async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		// function: clickButton,
		function: setPageBackgroundColor,
	});

	// TODO: ANOTHER WAY TO INJECT SCRIPT: INJECT JAVASCRIPT FILE
	// chrome.tabs.executeScript(tabs[0].id, {file: "content_script.js"});
});

// The body of this function will be executed as a content script inside the current page
const setPageBackgroundColor = () => {
	chrome.storage.sync.get('color', ({ color }) => {
		document.body.style.backgroundColor = color;
	});
};

const btn = document.getElementById('scrollBtn');

// Function to click button
const clickButton = () => {

	btn && btn.click();
};
