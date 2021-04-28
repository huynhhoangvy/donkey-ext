import {
	isEmpty,
} from 'lodash';

console.log('LOG FROM CONTENT SCRIPT');

let currentHostname = window.location.hostname;
let currentPathname = window.location.pathname;
let currentProtocol = window.location.protocol;

// Get current url
const updateUrl = (params) => {
	console.log(params);
	const { hostname, pathname, protocol } = params;
	currentHostname = hostname;
	currentPathname = pathname;
	currentProtocol = protocol;
	console.log('update url: ', { currentHostname, currentPathname, currentProtocol });
};

// Detect URL change handler
const urlChangeHandler = (params) => {
	const { hostname, pathname, protocol } = params;
	// const data = {
	// 	hostname: window.location.hostname,
	// 	pathname: window.location.pathname,
	// 	protocol: window.location.protocol,
	// };
	// updateUrl(data);
	// console.log('url changed: ', data);

	if ( currentHostname === 'wefinex.net' ) {

		switch ( currentPathname ) {
			case '/' :
				const homeRightNav = $('#rightNav');
				const homeGoToLoginPage = homeRightNav.find(('a[href="/login' + '"]'))[0];

				console.log('rightNav: ', homeRightNav);
				console.log('login: ', homeGoToLoginPage);

				setTimeout(() => {
					clickButton(homeGoToLoginPage);
				}, 3000);
				break;

			case '/login':
				// TODO: PAGE DISABLES FORM ON LOAD, CANNOT DO ANYTHING
				console.log('/login');
				const loginForm = document.querySelector('form.loginForm');
				const emailField = loginForm.querySelector('input[name="email"]');
				const passwordField = loginForm.querySelector('input[name="password"]');
				const btn = loginForm.getElementsByTagName('button')[1];

				// const loginForm = $('form.loginForm');
				// const passwordField = loginForm.find('input[name="password"]');
				// const emailField = loginForm.find('input[name="email]"');
				// const loginButton = loginForm.find('button.siginButton');
				// const loginButton = loginForm.querySelector('button.siginButton');
				// const btn = loginForm.find('button')[1];
				// const emailField = loginForm.find('input#md-input-s81h0n38t')

				// passwordField.focus();
				// loginForm.click();

				// !passwordField.parentElement.classList.contains('md-has-value') && passwordField.parentElement.classList.add('md-has-value');
				// !emailField.parentElement.classList.contains('md-has-value') && emailField.parentElement.classList.add('md-has-value');
				// btn.classList.contains('btn-secondary') && btn.classList.remove('btn-secondary');
				// btn.classList.contains('btn') && btn.classList.remove('btn');
				// !btn.classList.contains('button') && btn.classList.add('button');
				// !btn.classList.contains('wbtn') && btn.classList.add('wbtn');
				// !btn.classList.contains('siginButton') && btn.classList.add('siginButton');
				// btn.removeAttribute('disabled');

				setTimeout(() => {
					clickButton(document.querySelector('form.loginForm').getElementsByTagName('button')[1]);
				}, 3000);
				break;

			case '/index':
				console.log('index page');
				let lastUpDown, betResult;
				let lastBet = { value: 0, trend: true};
				let currentBet = { value: 0, trend: true };
				let resultTrend = false;
				let systemTrend = false;

				const betInput = document.getElementById('InputNumber');
				const upButton = document.querySelector('.btnSuccess');
				const downButton = document.querySelector('.btnDown');
				const CAN_DATA = JSON.parse(window.localStorage.getItem('CAN'));
				const isBetSession = CAN_DATA.isBetSession;

				// TODO: BET SESSION
				if ( isBetSession ) {

					// this is the first bet
					if ( isEmpty(lastBet) === true ) {

						betInput.value = 1;

						downButton.click();
						currentBet.trend = false;
						currentBet.value = 1;

					} else {

						// last bet is WIN
						if ( resultTrend === true ) {
							// restart bet value
							betInput.value = 1;
							currentBet.value = 1;

							if ( lastBet.trend === true ) {
								// downButton.click();
								currentBet.trend = true;
							} else {
								// upButton.click();
								currentBet.trend = false;
							}
						} else {
							// LOSE, x2 bet
							betInput.value = lastBet.value * 2;
							if ( lastBet.trend === true ) {
								// downButton.click();
								currentBet.trend = true;
							} else {
								// upButton.click();
								currentBet.trend = false;
							}
							currentBet.value = lastBet.value * 2;
						}

					}
					console.log('Current bet session info: ', {
						bet: currentBet.value,
						trend: currentBet.trend,
						lastSession: { bet: lastBet.value, result: lastBet.result },
					});
				} else {
					// TODO: RESULT SESSION
					console.log('bet session is over, result here');

					//

				}
				console.log('print local: ', window.localStorage);
				break;

			default:
				console.log('default');
				return;
		}
	}
};

// Function to click button
const clickButton = buttonElement => {
	console.log('click button: ', buttonElement);
	buttonElement.click();
};

// updateUrl(window.location);
urlChangeHandler(window.location);

// Extension Runtime
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	// listen for messages send from background.js
	const currentUrl = new URL(request.url);
	console.log(currentUrl);
	const data = {
		pathname: currentUrl.pathname,
		hostname: currentUrl.hostname,
		protocol: currentUrl.protocol,
	};
	switch ( request.type ) {
		default:
			return;
		case 'urlChanged':
			console.log('received message: ', request);
			updateUrl(data);
			urlChangeHandler(data);
	}
});


