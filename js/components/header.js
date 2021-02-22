(function () {
	const mobileToggle = (element, className) => element.classList.toggle(className);

	const mobileToggleRemove = (element, className) => element.classList.remove(className);

	const containClass = (element, className) => element.classList.contains(className);

	function elementNotFound(selector) {
		console.error("The element could not be found in the DOM structure " + "'" + selector + "'");
	}

	const stickyToggle = (element, elementOffset, globalOffset, ...classesNames) => {
		for (const stickyClass of classesNames) {
			if (globalOffset > elementOffset) {
				element.classList.add(stickyClass);
			} else if (globalOffset < elementOffset) {
				element.classList.remove(stickyClass);
			}
		}
	}

	const mobileBreakpoint = 991;
	const tabletBreakpoint = 1199;
	const defaultHeaderMobilePaddingBottom = 130;
	const pixels = 'px';

	const bodySelector 			  = '.js-body';
	const headerSelector 		  = '.js-header';
	const mainMenuToggleSelector  = '.js-main-menu-toggle';
	const followToggleSelector    = '.js-toggle-follow';
	const signUpToggleSelector    = '.js-toggle-sign-up';
	const contactsToggleSelector  = '.js-contacts-toggle';
	const burgerToggleSelector    = '.js-toggle-burger';
	const headerStripSelector     = '.js-header-strip';
	const mainMenuSelector        = '.js-main-menu';
	const popupFollowUsSelector   = '.js-popup-follow-us';
	const popupSignUpSelector     = '.js-popup-sign-up';
	const popupsSectionSelector   = '.js-popups-section';
	const popupOverlaySelector    = '.js-header-overlay';
	const contactsSectionSelector = '.js-contacts-section';
	const navigationSelector 	  = '.js-navigation';
	const currentPageLinkSelector = '.js-current-page-link';

	const mainMenuMobileClass       = 'main-menu--mobile'
	const signUpMobileClass         = 'sign-up--mobile';
	const followUsMobileClass 	    = 'follow-us--mobile';
	const popupsActiveClass 		= 'header__activity--active'
	const stripActiveClass          = 'header__strip--active';
	const burgerToggleActiveClass   = 'mobile-toggle__burger--active';
	const contactToggleActiveClass  = 'contacts__item--active';
	const signUpToggleActiveClass   = 'mobile-toggle__sign-up--active';
	const followUsToggleActiveClass = 'mobile-toggle__follow--active';
	const navigationActiveClass     = 'header__navigation--active';
	const stickyClass               = 'sticky';
	const stickyContactsClass       = 'contacts--sticky';
	const stickyMainMenuClass       = 'main-menu--sticky-mobile';
	const stickyNavigation          = 'header__navigation--sticky';
	const mobileToggleIconClass		= 'mobile-toggle__burger-icon';

	const body = document.querySelector(bodySelector);
	if (!body) {
		elementNotFound(bodySelector);
		return;
	}
	const header = document.querySelector(headerSelector);
	if (!header) {
		elementNotFound(headerSelector);
		return;
	}

	const menuToggle = document.querySelector(mainMenuToggleSelector);
	if (!menuToggle) {
		elementNotFound(mainMenuToggleSelector);
		return;
	}
	const followToggle = document.querySelector(followToggleSelector);
	if (!followToggle) {
		elementNotFound(followToggleSelector);
		return;
	}
	const signUpToggle = document.querySelector(signUpToggleSelector);
	if (!signUpToggle) {
		elementNotFound(signUpToggleSelector);
		return;
	}
	const toggleContact = document.querySelector(contactsToggleSelector);
	if (!toggleContact) {
		elementNotFound(contactsToggleSelector);
		return;
	}
	const toggleBurger = document.querySelector(burgerToggleSelector);
	if (!toggleBurger) {
		elementNotFound(burgerToggleSelector);
		return;
	}

	const headerStrip = document.querySelector(headerStripSelector);
	if (!headerStrip) {
		elementNotFound(headerStripSelector);
		return;
	}
	const mainMenu = document.querySelector(mainMenuSelector);
	if (!mainMenu) {
		elementNotFound(mainMenuSelector);
		return;
	}
	const followUs = document.querySelector(popupFollowUsSelector);
	if (!followUs) {
		elementNotFound(popupFollowUsSelector);
		return;
	}
	const signUp = document.querySelector(popupSignUpSelector);
	if (!signUp) {
		elementNotFound(popupSignUpSelector);
		return;
	}
	const popups = document.querySelector(popupsSectionSelector);
	if (!popups) {
		elementNotFound(popupsSectionSelector);
		return;
	}
	const mobileNavigation = document.querySelector(contactsSectionSelector);
	if (!mobileNavigation) {
		elementNotFound(contactsSectionSelector);
		return;
	}
	const navigation = document.querySelector(navigationSelector);
	if (!navigation) {
		elementNotFound(navigationSelector);
		return;
	}
	const popupOverlay = document.querySelector(popupOverlaySelector);
	if (!popupOverlay) {
		elementNotFound(popupOverlaySelector);
		return;
	}
	const currentPage = document.querySelector(currentPageLinkSelector);
	if (!currentPage) {
		elementNotFound(currentPageLinkSelector);
		return;
	}

	function headerMenu() {
		mobileToggle(navigation, navigationActiveClass);
		mobileToggle(mainMenu, mainMenuMobileClass);
		mobileToggle(toggleBurger, burgerToggleActiveClass);
		mobileToggle(toggleContact, contactToggleActiveClass);
	}

	function followUsMenu() {
		popupActivate(followUs, followUsMobileClass, signUp, signUpMobileClass, () => {
			mobileToggleRemove(signUp, signUpMobileClass);
			mobileToggleRemove(signUpToggle, signUpToggleActiveClass);

			mobileToggle(followUs, followUsMobileClass);
			mobileToggle(followToggle, followUsToggleActiveClass);
		});
	}

	function signUpMenu() {
		popupActivate(signUp, signUpMobileClass, followUs, followUsMobileClass, () => {
			mobileToggleRemove(followUs, followUsMobileClass);
			mobileToggleRemove(followToggle, followUsToggleActiveClass);

			mobileToggle(signUp, signUpMobileClass);
			mobileToggle(signUpToggle, signUpToggleActiveClass);
		});
	}

	function popupActivate(targetElement, targetMobileClass, oppositeElement, classContainName, callback) {
		if (containClass(oppositeElement, classContainName)) {
			mobileToggleRemove(popups, popupsActiveClass);
			mobileToggleRemove(headerStrip, stripActiveClass);
		}
		disableBodyScroll(targetElement);
		callback();

		mobileToggle(popups, popupsActiveClass);
		mobileToggle(headerStrip, stripActiveClass);

		if (!containClass(targetElement, targetMobileClass)) {
			enableBodyScroll(targetElement);
		} else {
			enableBodyScroll(oppositeElement);
		}
	}

	body.addEventListener('click', (event) => {
		if(
			event.target.classList.contains(navigationSelector.replace('.', '')) ||
			event.target.classList.contains(burgerToggleSelector.replace('.', '')) ||
			event.target.classList.contains(mainMenuToggleSelector.replace('.', '')) ||
			event.target.classList.contains(mobileToggleIconClass)
		) {
			return;
		}

		if (containClass(navigation, navigationActiveClass)) {
			headerMenu();
		}
	});

	menuToggle.addEventListener('click', headerMenu, false);

	followToggle.addEventListener('click', followUsMenu, false);

	signUpToggle.addEventListener('click', signUpMenu, false);

	popupOverlay.addEventListener('click', (event) => {
		if(containClass(signUp, signUpMobileClass)) {
			signUpMenu();
		} else if(containClass(followUs, followUsMobileClass)) {
			followUsMenu();
		}
	});

	currentPage.addEventListener('click', () => {
		if (containClass(navigation, navigationActiveClass)) {
			headerMenu();
		}
	});

	window.addEventListener('scroll', () => {
		const scrolled = window.scrollY;
		const headerOffset = header.clientHeight;

		stickyToggle(mainMenu, headerOffset, scrolled, stickyClass);
		stickyToggle(mobileNavigation, headerOffset, scrolled, stickyClass, stickyContactsClass);
		stickyToggle(mainMenu, headerOffset, scrolled, stickyClass, stickyMainMenuClass);

		stickyToggle(navigation, headerOffset, scrolled, stickyNavigation);

		if (containClass(navigation, navigationActiveClass)) {
			headerMenu();
		}
	});

	window.addEventListener('resize', () => {
		if (window.innerWidth > mobileBreakpoint) {
			if (containClass(mobileNavigation, stickyClass)) {
				mobileToggleRemove(mobileNavigation, stickyClass);
				mobileToggleRemove(mobileNavigation, stickyContactsClass);
			}
			if (containClass(mainMenu, stickyMainMenuClass)) {
				mobileToggleRemove(mainMenu, stickyMainMenuClass);
			}

			if (containClass(mainMenu, mainMenuMobileClass)) {
				headerMenu();
			}
		}
	});

	if (window.ResizeObserver) {
		const menuObserver = new ResizeObserver(entries => {
			for (const entry of entries) {
				if (window.innerWidth > tabletBreakpoint) {
					header.style.paddingBottom = entry.contentRect.height + pixels;
				} else {
					header.style.paddingBottom = defaultHeaderMobilePaddingBottom + pixels;
				}
			}
		});
		menuObserver.observe(mainMenu);
	}
})();
