export default class FormValidation {
	static formState = {};

	static inputs = document.querySelectorAll("[data-orderFormInput]");

	constructor({ submitButton, inputsSelector, usernameInput, phoneInput, emailInput }) {
		this.usernameInput = usernameInput;
		this.phoneInput = phoneInput;
		this.emailInput = emailInput;
		this.submitBtn = document.querySelector(submitButton);
		this.inputs = document.querySelectorAll(inputsSelector);
		this.username = document.querySelector(this.usernameInput.selector);
		this.phone = document.querySelector(this.phoneInput.selector);
		this.email = document.querySelector(this.emailInput.selector);
	}

	init() {
		this.#createInitialState(this.inputs);
		this.username.addEventListener("input", event => {
			this.#checkInputValue(event.target, event.target.value, this.usernameInput.regExp);
		});
		this.phone.addEventListener("input", event => {
			this.#checkInputValue(event.target, event.target.value, this.phoneInput.regExp);
		});
		this.email.addEventListener("input", event => {
			this.#checkInputValue(
				event.target,
				event.target.value,
				// eslint-disable-next-line no-useless-escape
				this.emailInput.regExp
			);
		});
	}

	#checkInputValue(targetInput, inputValue, regExp) {
		const validationResult = regExp.test(inputValue);
		this.#changeInputStyles(targetInput, validationResult);
		const property = targetInput.getAttribute("data-input");
		FormValidation.formState = {
			...FormValidation.formState,
			[property]: validationResult
		};
		this.#checkState();
	}

	#createInitialState(inputs) {
		const dataAttributeValues = [];
		const state = {};

		inputs.forEach(input => {
			dataAttributeValues.push(input.getAttribute("data-input"));
		});

		for (const property of dataAttributeValues) {
			state[property] = false;
		}

		FormValidation.formState = state;
	}

	#checkState() {
		switch (!Object.values(FormValidation.formState).includes(false)) {
			case true:
				this.submitBtn.disabled = false;
				this.submitBtn.style.filter = "grayscale(0)";
				break;
			case false:
				this.submitBtn.disabled = true;
				this.submitBtn.style.filter = "grayscale(100%)";
				break;
			default:
				this.submitBtn.disabled = true;
				this.submitBtn.style.filter = "grayscale(100%)";
				break;
		}
	}

	static resetState() {
		for (let value of Object.values(FormValidation.formState)) {
			// eslint-disable-next-line no-unused-vars
			value = false;
		}
		FormValidation.inputs.forEach(input => {
			input.classList.remove("Input-Invalid");
			input.classList.remove("Input-Valid");
			input.style.cssText = `
			transition: border 0.3s ease-in-out;
			border-bottom: 2px solid #939089;
			color: #9ba5af;
		`;
		});
	}

	#changeInputStyles(input, isValid) {
		switch (isValid) {
			case true:
				input.classList.remove("Input-Invalid");
				input.classList.add("Input-Valid");
				input.style.cssText = `
					transition: border 0.3s ease-in-out;
					border-bottom: 2px solid #24bf5f;
					color: #FFF;
				`;
				break;
			case false:
				input.classList.add("Input-Invalid");
				input.classList.remove("Input-Valid");
				input.style.cssText = `
					transition: border 0.3s ease-in-out;
					border-bottom: 2px solid #f54f4e;
					color: #FFF;
				`;
				break;
			default:
				input.classList.remove("Input-Invalid");
				input.classList.remove("Input-Valid");
				input.style.cssText = `
					transition: border 0.3s ease-in-out;
					border-bottom: 2px solid #939089;
					color: #9ba5af;
				`;
				break;
		}
	}
}
