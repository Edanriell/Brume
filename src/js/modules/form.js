import { postData } from "../services/requests";
import ErrorMessage from "./notifications/errorMessage";
import SuccessMessage from "./notifications/successMessage";
import Spinner from "../../images/spinner.svg";
import FormValidation from "./formValidation.js";

export default class Form {
	constructor({
		targetForm,
		databaseName,
		databasePort,
		databaseHost,
		spinnerTopCoord,
		spinnerLeftCoord,
		triggerButton
	}) {
		this.forms = document.querySelectorAll(targetForm);
		this.database = databaseName;
		this.port = databasePort ?? 3000;
		this.hostName = databaseHost || "localhost";
		this.top = spinnerTopCoord ?? 50;
		this.left = spinnerLeftCoord ?? 50;
		this.submit = document.querySelector(triggerButton);
	}

	init() {
		this.forms.forEach(form => {
			this.#bindPostData(form, this.database, this.port, this.hostName);
			this.#disableSubmitButton();
		});
	}

	#bindPostData(form, database, port, host) {
		form.addEventListener("submit", event => {
			event.preventDefault();
			this.#displayLoader();
			this.#switchButtonText();

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData(`http://${host}:${port}/${database}`, json)
				.then(data => {
					// eslint-disable-next-line no-console
					console.log(data);
					this.#removeLoader(".Spinner");
					this.#displaySuccess("Успех", "Данные успешно отправлены.");
				})
				.catch(error => {
					if (error.name === "NetworkError") {
						this.#displayError(
							"Ошибка сервера",
							`Возможно вы отключены от сети.
							Проверьте свое подключение к сети и повторите попытку отправить данные.`
						);
						this.#removeLoader(".Spinner");
					} else if (error instanceof TypeError) {
						this.#displayError(
							"Ошибка сервера",
							"Не удалось отправить данные на сервер."
						);
						this.#removeLoader(".Spinner");
					} else {
						Form.displayError(error);
						this.#removeLoader(".Spinner");
					}
				})
				.finally(() => {
					this.#switchButtonText(this.triggerButton);
					form.reset();
					this.#disableSubmitButton();
					FormValidation.resetState();
				});
		});
	}

	#displayLoader() {
		const loaderImg = document.createElement("div");
		loaderImg.classList.add("Spinner");
		loaderImg.style.cssText = `
			display: block;
			position: absolute;
			height: 52px;
			top: ${this.top}%;
			left: ${this.left}%;
			transform: translate(-50%,-50%);
			z-index: 9999;
			height: 40px;
			width: 40px;
			background: url("${Spinner}") transparent
		`;
		this.submit.style.cssText = `
			pointer-events: none;
		`;
		this.submit.parentElement.style.cssText = `
			pointer-events: none;
		`;
		this.submit.parentElement.append(loaderImg);
	}

	#removeLoader(spinnerSelector) {
		document.querySelector(spinnerSelector).remove();
		this.submit.style.cssText = `
			pointer-events: auto;
		`;
		this.submit.parentElement.style.cssText = `
			pointer-events: auto;
		`;
	}

	#displayError(messageTypeText, messageText) {
		const errorMessage = new ErrorMessage({
			messageText,
			messageTypeText,
			showClassName: "SlideIn",
			removeClassName: "SlideOut"
		});
		errorMessage.init();
	}

	#displaySuccess(messageTypeText, messageText) {
		const errorMessage = new SuccessMessage({
			messageText,
			messageTypeText,
			showClassName: "SlideIn",
			removeClassName: "SlideOut"
		});
		errorMessage.init();
	}

	#switchButtonText() {
		if (this.submit.style.color === "transparent") {
			this.submit.style.cssText = `
				color: white;
				text-shadow: 0 0 2px rgba(0,0,0,0.1);
			`;
		} else {
			this.submit.style.cssText = `
				color: transparent;
				text-shadow: initial;
			`;
		}
	}

	#disableSubmitButton() {
		this.submit.disabled = true;
		this.submit.style.cssText = `
			filter: grayscale(100%);
		`;
	}
}
