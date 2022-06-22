export default class Notifications {
	constructor({
		showClassName = "SlideIn",
		removeClassName = "SlideOut",
		removeClassAnimationDuration = 250,
		timeoutDelay = 5000,
		windowWidth = 520,
		windowHeight = 100
	}) {
		this.showClassName = showClassName;
		this.removeClassName = removeClassName;
		this.removeClassAnimationDuration = removeClassAnimationDuration;
		this.timeoutDelay = timeoutDelay;
		this.windowWidth = windowWidth;
		this.windowHeight = windowHeight;
	}

	removeOnClick({ notification, triggerButton }) {
		const removeNotificationBtn = notification.querySelector(triggerButton);
		removeNotificationBtn.addEventListener("click", () => {
			notification.classList.remove(this.showClassName);
			notification.classList.add(this.removeClassName);
			setTimeout(() => {
				notification.remove();
			}, this.removeClassAnimationDuration);
		});
	}

	removeAfterTimeout({ notification, timeout = false }) {
		if (timeout) {
			setTimeout(() => {
				notification.classList.remove(this.showClassName);
				notification.classList.add(this.removeClassName);
				setTimeout(() => {
					notification.remove();
				}, this.removeClassAnimationDuration);
			}, this.timeoutDelay);
		}
	}

	setStyles({ notificationSelector }) {
		const notification = document.querySelector(notificationSelector);

		notification.style.cssText = `
		width: ${this.windowWidth}px; 
		min-height: ${this.windowHeight}px
	`;
	}
}
