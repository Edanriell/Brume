import Notifications from "./notifications";
import WarningIcon from "../../../images/warning.svg";

export default class ErrorMessage extends Notifications {
	constructor({ messageText, messageTypeText, showClassName, removeClassName }) {
		super(showClassName, removeClassName);
		this.showClassName = showClassName;
		this.removeClassName = removeClassName;
		this.text = messageText;
		this.typeText = messageTypeText;
		this.icon = WarningIcon;
	}

	init() {
		this.#createMessage();
	}

	#createMessage() {
		const messageWrapper = document.createElement("div");

		messageWrapper.innerHTML = `
		<div class="Notification">
			<div class="Notification-IconWrapper Notification-IconWrapper_color_blue">
				<img 
					class="Notification-Icon"
					src=${this.icon} 
					width="40" 
					height="40" 
					alt="Иконка оповещения"
				/>
			</div>
			<div class="Notification-Content">
				<strong class="Notification-TypeText">${this.typeText}</strong>
				<p class="Notification-Text Notification-Text_color_blue">${this.text}</p>
			</div>
			<button class="Notification-Close" type="button">
				<span class="VisuallyHidden">
					Закрыть оповещение
				</span>
			</button>
		</div>
		`;

		messageWrapper.classList.add("Notification-Wrapper", this.showClassName);

		document.querySelector(".NotificationList").append(messageWrapper);

		this.removeOnClick({
			notification: messageWrapper,
			triggerButton: ".Notification-Close"
		});
		this.removeAfterTimeout({
			notification: messageWrapper,
			timeout: true
		});
		this.setStyles({
			notificationSelector: ".Notification"
		});
	}
}
