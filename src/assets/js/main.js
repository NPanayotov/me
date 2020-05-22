;(function(window, document) {
	const doc = document;
	const body = doc.querySelector('body');
	const hero = doc.querySelector('.hero');
	const header = doc.querySelector('.header');
	const jsScroll = doc.querySelector('.js--scroll');
	let heroHeight = parseFloat(getComputedStyle(hero, null).height.replace("px", ""));
	let headerHeight = parseFloat(getComputedStyle(header, null).height.replace("px", ""));
	let windowScroll = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf('MSIE ');
	var trident = ua.indexOf('Trident/');
	var edge = ua.indexOf('Edge/');

	/**
	 * Wedding countdown
	 */
	$('.js-countdown').each(function() {
		const $this = $(this);
		const date = $this.data('date');

		$this.countdown(date, function(event) {
		    $(this).html(event.strftime('%D дни %H:%M:%S'));
		 });
	});

	//Handle IE classes
	if (msie > 0) {
		body.classList.add('body--ie');
	} else if (trident > 0) {
		body.classList.add('body--ie');
	};

	//Polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}

	if (!Element.prototype.closest) {
		Element.prototype.closest = function(s) {
			var el = this;

			do {
			  if (el.matches(s)) return el;
			  el = el.parentElement || el.parentNode;
			} while (el !== null && el.nodeType === 1);

			return null;
		};
	}

	//Nav
	const navTrigger = doc.querySelector('.nav-trigger');
	const nav = doc.querySelector('.nav');

	navTrigger.addEventListener('click', function(event) {
		this.classList.toggle('is--Active');

		nav.classList.toggle('is--Visible');

		event.preventDefault();
	});

	body.addEventListener('click', function(event) {
		const target = event.target;

		if (target.closest('.header') == null) {
			closeNav();
		}

	});

	const navLinks = doc.querySelectorAll('.nav a');

	for (navLink of navLinks) {
		navLink.addEventListener('click', function(event) {
			const section = doc.querySelector(this.getAttribute('href'));
			animateScroll(section, 1000, 'easeOutCubic', 10, top);

			closeNav();

			event.preventDefault();
		});
	};

	jsScroll.addEventListener('click', function(event) {
		const section = doc.querySelector(this.getAttribute('href'));
		animateScroll(section, 1000, 'easeOutCubic', 10, top);

		event.preventDefault();
	});

	function changeHeader(scroll) {
		let isDark = scroll >= heroHeight - headerHeight;

		header.classList.toggle('is--Dark', isDark)
	};

	function closeNav() {
		navTrigger.classList.remove('is--Active');
		nav.classList.remove('is--Visible');
	}

	//Window events
	window.addEventListener('resize', () => {
		heroHeight = parseFloat(getComputedStyle(hero, null).height.replace("px", ""));
	});

	window.addEventListener('scroll', () => {
		windowScroll = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

		changeHeader(windowScroll);
	});

	window.addEventListener('load', () => {
		windowScroll = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

		changeHeader(windowScroll);
	});

})(window, document);
