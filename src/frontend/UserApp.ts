import { UserController } from "./controllers/UserController";
const appElement: HTMLElement = document.querySelector("#app") as HTMLElement;
if (appElement) {
  let userController: UserController = new UserController(appElement);
}
