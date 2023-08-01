import autobind from "autobind-decorator";
import { User } from "./../models/User";
import { validate } from "class-validator";
export class UserController {
  constructor(public element: HTMLElement) {
    const button = element.querySelector("#play");
    button?.addEventListener("click", this.processPlayButtonClick);
  }
  @autobind
  processPlayButtonClick(event: Event) {
    event.preventDefault();
    const form = this.element.querySelector("form") as HTMLFormElement;
    const usernameElement = this.element.querySelector(
      "#username"
    ) as HTMLInputElement;
    const helpId = this.element.querySelector("#UsernamehelpId");

    if (usernameElement) {
      let user: User = new User(usernameElement.value);

      validate(user).then((errors) => {
        if (errors.length > 0) {
          if (helpId) {
            helpId.className = "form-text text-muted visible";
            usernameElement.classList.add("noInput");
          }
        } else {
          localStorage.setItem("player_name", usernameElement.value);
          window.location = "./board" as Location | (string & Location);
        }
      });
    }
  }
}
