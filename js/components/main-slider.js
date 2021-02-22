(function () {
	new Swiper(".js-main-slider__swiper-container", {
		loop: true,

		navigation: {
			nextEl: ".js-main-slider__button--next",
			prevEl: ".js-main-slider__button--prev",
		},
	});
})();

