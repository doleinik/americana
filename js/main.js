document.addEventListener('DOMContentLoaded', function() {
	window.disableBodyScroll = require('./vendor/body-scroll-lock').disableBodyScroll;
	window.enableBodyScroll = require('./vendor/body-scroll-lock').enableBodyScroll;
	window.Swiper = require('./vendor/swiper-bundle.min');
	require('./vendor/simplebar');
	require('./vendor/body-scroll-lock')
    require('./components/js-connect');
    require('./components/testimonials');
	require('./components/our-services');
	require('./components/main-slider');
	require('./components/header');
});
