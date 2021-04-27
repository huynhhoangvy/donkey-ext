console.log('LOG FROM CONTENT SCRIPT');

// const scroll = document.getElementById('scrollBtn');
// scroll.addEventListener('click', () => console.log('click'));
// scroll.click();
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
				// setTimeout(() => console.log('1sec'), 1000)
				// $('.contentAuthentication').click()
				const loginForm = $('form.loginForm');
				// const passwordField = loginForm.find('input[name="password"]')
				// console.log('password: ', passwordField)
				// passwordField.focus()
				// console.log(document.getElementsByClassName('loginForm'))
				// loginForm.click();
				const loginButton = loginForm.find('button.siginButton');
				console.log('login form: ', loginForm);
				console.log('login button: ', loginButton);
				loginButton && loginButton.click();
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


