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
				// const loginForm = $('form.loginForm');
				// const passwordField = loginForm.find('input[name="password"]');
				// const emailField = loginForm.find('input[name="email]"');
				// const loginButton = loginForm.find('button.siginButton');
				const loginForm = document.querySelector('form.loginForm');
				const emailField = loginForm.querySelector('input[name="email"]');
				const passwordField = loginForm.querySelector('input[name="password"]');
				// const loginButton = loginForm.querySelector('button.siginButton');
				const btn = loginForm.getElementsByTagName('button')[1];
				console.log('password: ', passwordField);
				console.log('email: ', emailField);
				// passwordField.focus();
				// console.log(document.getElementsByClassName('loginForm'))
				// loginForm.click();
				console.log('login form: ', loginForm);
				// console.log('login button: ', loginButton);
				// const btn = loginForm.find('button')[1];
				console.log(btn);
				// const emailField = loginForm.find('input#md-input-s81h0n38t')
				console.log('email parent: ', emailField.parentElement);
				console.log('password parent: ', passwordField.parentElement);
				// !passwordField.parentElement.classList.contains('md-has-value') && passwordField.parentElement.classList.add('md-has-value');
				// !emailField.parentElement.classList.contains('md-has-value') && emailField.parentElement.classList.add('md-has-value');
				// console.log('button class list: ', btn.classList)
				// btn.classList.contains('btn-secondary') && btn.classList.remove('btn-secondary');
				// btn.classList.contains('btn') && btn.classList.remove('btn');
				// !btn.classList.contains('button') && btn.classList.add('button');
				// !btn.classList.contains('wbtn') && btn.classList.add('wbtn');
				// !btn.classList.contains('siginButton') && btn.classList.add('siginButton');
				// btn.removeAttribute('disabled');
				console.log('pw: ', passwordField);
				console.log('email: ', emailField);
				console.log('btn: ', btn);

				setTimeout(() => {
					document.querySelector('form.loginForm').getElementsByTagName('button')[1].click()
				// btn.click();
					// console.log('click login: ', loginButton);
					// loginButton && loginButton.click();
				}, 3000);
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


