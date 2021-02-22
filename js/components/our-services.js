(function () {
	new Swiper('.js-our-services-swiper-container', {
		slidesPerView: 3,
		navigation: {
			prevEl: '.js-our-services-swiper-button-prev',
			nextEl: '.js-our-services-swiper-button-next',
		},
		breakpoints: {
			1024: {
				slidesPerView: 3,
			},
			601 : {
				slidesPerView: 2,
			},
			320: {
				slidesPerView: 1,
			}
		}
	});
})();
