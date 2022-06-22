import "../sass/main.sass";
import "swiper/css";

import Swiper, { Mousewheel, Keyboard, Autoplay, Pagination } from "swiper";
import {
	changeSectionBackground as changeBackground,
	showReviewerPicture as showPicture
} from "./sliderHelpers/helpers";
import BurgerMenu from "./modules/burger";
import Form from "./modules/form";
import FormValidation from "./modules/formValidation";

Swiper.use([Mousewheel, Keyboard, Autoplay, Pagination]);

window.addEventListener("load", () => {
	const burgerMenu = new BurgerMenu({
		navSelector: ".MainMenu",
		burgerSelector: ".HamburgerMenu",
		navbarSelector: ".MainNav"
	});

	const promoSlider = new Swiper(".PromoSlider", {
		modules: [changeBackground],
		wrapperClass: "PromoSlider-Wrapper",
		slideClass: "PromoSlider-Slide",
		slidesPerView: 1,
		spaceBetween: 20,
		grabCursor: true,
		mousewheel: true,
		keyboard: {
			enabled: true,
			onlyInViewport: false
		},
		direction: "horizontal",
		loop: true,
		autoplay: {
			delay: 5000
		},
		pagination: {
			el: ".PromoSliderControls",
			clickable: true,
			bulletClass: "PromoSliderControls-Bullet",
			bulletActiveClass: "PromoSliderControls-BulletActive",
			renderBullet(index, className) {
				return `
					<button class="${className}">
						<span class="VisuallyHidden">Слайд ${index + 1}</span>
					</button>
				`;
			}
		}
	});

	const offersSlider = new Swiper(".OffersSlider", {
		// wrapperClass: "OffersSlider-Wrapper",
		slideClass: "OffersSlider-Slide",
		slidesPerView: 1,
		spaceBetween: 40,
		grabCursor: true,
		mousewheel: true,
		keyboard: {
			enabled: true,
			onlyInViewport: false
		},
		direction: "vertical",
		loop: true,
		autoplay: {
			delay: 5000
		},
		pagination: {
			el: ".OffersList",
			clickable: true,
			bulletClass: "Offer-Switch",
			bulletActiveClass: "Offer-SwitchActive",
			renderBullet(index, className) {
				const slides = document.querySelectorAll(".OfferSlide-Image");
				return `
					<button class="${className}" type="button">
						${slides[index + 1].getAttribute("data-button-name")}
					</button>
				`;
			}
		}
	});

	const reviewsSlider = new Swiper(".ReviewsSlider", {
		modules: [showPicture],
		wrapperClass: "ReviewsSlider-Wrapper",
		slideClass: "ReviewsSlider-Slide",
		slidesPerView: 1,
		spaceBetween: 20,
		grabCursor: true,
		mousewheel: true,
		keyboard: {
			enabled: true,
			onlyInViewport: false
		},
		direction: "horizontal",
		loop: true,
		autoplay: {
			delay: 5000
		},
		pagination: {
			el: ".ReviewsSliderPagination",
			clickable: true,
			bulletClass: "ReviewsSliderPagination-SwitchSlide",
			bulletActiveClass: "ReviewsSliderPagination-ActiveSlide",
			renderBullet(index, className) {
				return `
					<button class="${className}">
						<span class="VisuallyHidden">Слайд ${index + 1}</span>
					</button>
				`;
			}
		}
	});

	const orderForm = new Form({
		targetForm: "#OrderForm",
		databaseName: "orders",
		triggerButton: "[data-SubmitOrderData]"
	});

	const formValidation = new FormValidation({
		submitButton: "[data-SubmitOrderData]",
		inputsSelector: "[data-orderFormInput]",
		usernameInput: {
			selector: "[data-input='username']",
			regExp: /^([а-яё]+|[a-z]+)$/i
		},
		phoneInput: {
			selector: "[data-input='phone']",
			regExp: /^\d*\d$/g
		},
		emailInput: {
			selector: "[data-input='email']",
			// eslint-disable-next-line no-useless-escape
			regExp: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi
		}
	});

	burgerMenu.init();
	promoSlider.init();
	offersSlider.init();
	reviewsSlider.init();
	orderForm.init();
	formValidation.init();
});
