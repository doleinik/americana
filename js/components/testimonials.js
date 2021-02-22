(function () {
	new Swiper('.js-testimonials-slider', {
		spaceBetween: 21,
		navigation: {
			prevEl: '.js-testimonials-button-prev',
			nextEl: '.js-testimonials-button-next'
		},
		breakpoints: {
			1024: {
				slidesPerView: 3
			},
			601: {
				slidesPerView: 2
			},
			280: {
				slidesPerView: 1
			}
		}
	});
})();
