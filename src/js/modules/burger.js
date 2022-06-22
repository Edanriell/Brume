export default class BurgerMenu {
	constructor({ navSelector, burgerSelector, navbarSelector }) {
		this.navLinks = document.querySelector(navSelector);
		this.burger = document.querySelector(burgerSelector);
		this.navbar = document.querySelector(navbarSelector);
	}

	init() {
		window.addEventListener("scroll", () =>
			// eslint-disable-next-line no-restricted-globals
			this.navbar.classList.toggle("MainNav-Sticky", scrollY > 0)
		);
		this.burger.addEventListener("click", () => this.burgerOnClick());
	}

	burgerOnClick() {
		this.navLinks.classList.toggle("MainNav-Active");
		this.burger.classList.toggle("HamburgerMenu-Transform");
	}
}
