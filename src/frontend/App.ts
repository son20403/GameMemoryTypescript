import { GameController } from "./controllers/GameController";
import { GameItem } from "./models/GameItem";
const playerName = localStorage.getItem("player_name");
if (!playerName) {
  window.location = "./" as Location | (string & Location);
}
window.addEventListener("DOMContentLoaded", () => {
  let namePlayer = document.querySelector("#namePlayer") as HTMLDivElement;
  namePlayer.textContent = `Xin chào ${playerName}`;
  const rootElement: HTMLElement | null = document.querySelector("#app");
  var gameApp: GameController | null = null;

  if (rootElement) {
    gameApp = new GameController(
      [
        new GameItem(1, "", "img1.png"),
        new GameItem(2, "", "img2.png"),
        new GameItem(3, "", "img3.png"),
        new GameItem(4, "", "img4.png"),
        // new GameItem(5, "", "img5.png"),
        // new GameItem(6, "", "img6.png"),
        // new GameItem(7, "", "img7.png"),
        // new GameItem(8, "", "img8.png"),
        //   new GameItem(9, "", "9.png"),
        //   new GameItem(10, "", "10.png"),
      ],
      rootElement
    );
    gameApp?.renderGameBoard();
  }
});
