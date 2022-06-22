function changeSectionBackground({ swiper, extendParams, on }) {
	const decorativeImage = document.querySelector(".DecorativeBackgroundImage");

	extendParams({
		debugger: true
	});

	on("slideChangeTransitionStart", () => {
		if (!swiper.params.debugger) return;
		const activeSlide = document.querySelector(".swiper-slide-active");
		decorativeImage.classList.add("Fade-In");
		decorativeImage.src = activeSlide.children[0].src;
	});
	on("slideChangeTransitionEnd", () => {
		if (!swiper.params.debugger) return;
		decorativeImage.classList.remove("Fade-In");
	});
}

function showReviewerPicture({ swiper, extendParams, on }) {
	extendParams({
		debugger: true
	});

	on("slideChangeTransitionEnd", () => {
		if (!swiper.params.debugger) return;
		const picturesList = document.querySelectorAll(".Review-ReviewerPicture");
		picturesList.forEach(picture => {
			if (picture.classList.contains("FlipInRight")) picture.classList.remove("FlipInRight");
		});
		picturesList[swiper.activeIndex].classList.add("FlipInRight");
	});
}

export { changeSectionBackground, showReviewerPicture };
