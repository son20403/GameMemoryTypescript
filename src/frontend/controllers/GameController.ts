import autobind from "autobind-decorator";
import { GameItem, GameItemStatus } from "./../models/GameItem";
import Stopwatch from "../Timer";
import toast from "../Toast";

import _ from "lodash";
const stopwatch = new Stopwatch("stopwatch");
let totalNumberMatched = document.querySelector(
  "#totalMatched"
) as HTMLDivElement;
let renderTimer = document.querySelector("#stopwatch") as HTMLDivElement;
let totalMatched: number = 0;
let startTimer: number = 0;
let overTimer: number = 120000;

export class GameController {
  private items: GameItem[] = [];
  constructor(items: GameItem[], public element: HTMLElement) {
    this.initGame(items);
  }
  initGame(initData: GameItem[]): void {
    for (const item of initData) {
      this.items.push(item);
      this.items.push(new GameItem(item.id, item.divId, item.image));
    }
    let id: number = 1;
    this.items.forEach((it) => {
      it.status = GameItemStatus.Close;
      it.divId = "d" + id;
      id++;
    });
  }
  reinitGame(): void {
    this.items.forEach((item) => {
      item.imageElement = null;
      item.status = GameItemStatus.Close;
      item.isMatched = false;
    });

    this.shuffle();
  }
  isWinGame(): boolean {
    return (
      this.items.filter((item) => item.status === GameItemStatus.Open)
        .length === this.items.length
    );
  }
  renderHTML(rootElement: HTMLElement, item: GameItem) {
    const divItem: HTMLDivElement = document.createElement("div");
    divItem.className = "gameItem text-center";
    divItem.id = item.divId;
    divItem.addEventListener("click", this.processGameItemClicked);

    const imgItem: HTMLImageElement = document.createElement("img");
    imgItem.src = `images/${item.image}`;
    imgItem.className = "img-fluid invisible";
    item.imageElement = imgItem;
    divItem.append(imgItem);
    rootElement.appendChild(divItem);
    renderTimer.innerHTML = "00:00:00";
  }
  renderResetButton(rootElement: HTMLElement): void {
    let button: HTMLDivElement = rootElement.querySelector(
      "div#reset"
    ) as HTMLDivElement;
    if (button) {
      button.addEventListener("click", this.processResetButtonClicked);
    }
  }
  renderCloseButton(rootElement: HTMLElement): void {
    let button: HTMLDivElement = rootElement.querySelector(
      "div#cancel"
    ) as HTMLDivElement;
    if (button) {
      button.addEventListener("click", this.processCloseButtonClicked);
    }
  }
  renderGameBoard(): void {
    this.shuffle();
    let boardDiv: HTMLElement = this.element.querySelector(
      "#board"
    ) as HTMLElement;
    if (boardDiv) {
      this.items.forEach((it) => {
        this.renderHTML(boardDiv, it);
      });
    }
    this.renderTotalMatched();
    this.renderResetButton(this.element);
    this.renderCloseButton(this.element);
  }
  isMatched(id: number, imgElement: HTMLImageElement): boolean {
    let openedItem: GameItem[] = this.items.filter((item) => {
      if (item.status === GameItemStatus.Open && !item.isMatched) {
        return item;
      }
    });

    if (openedItem.length == 2) {
      let checkMatchedFilter = openedItem.filter((item) => item.id == id);

      if (checkMatchedFilter.length < 2) {
        toast("Bạn chọn chưa trùng khớp", "red");
        openedItem.forEach((item) => {
          this.changeMatchedBackgroud(item.imageElement, false);
        });
        openedItem.forEach((item) => {
          setTimeout(() => {
            if (item.imageElement) {
              item.imageElement.className = "img-fluid invisible";
              item.status = GameItemStatus.Close;
              item.isMatched = false;
              this.changeMatchedBackgroud(item.imageElement);
            }
          }, 600);
        });
      } else {
        totalMatched++;
        this.renderTotalMatched();
        toast("Chúc mừng bạn đã chọn đúng", "green");
        openedItem.forEach((item) => {
          item.isMatched = true;
          if (item.imageElement) {
            const img = item.imageElement as HTMLImageElement;
            const elm = item.imageElement.parentElement as HTMLDivElement;
            elm.className = "gameItem text-center bgrhidden ismatched";
            setTimeout(() => {
              img.setAttribute(
                "src",
                "https://cdn-icons-png.flaticon.com/512/5610/5610944.png"
              );
            }, 800);
          }
          // this.changeMatchedBackgroud(item.imageElement);
        });
        return true;
      }
    }
    return false;
  }
  changeMatchedBackgroud(
    imgElement: HTMLElement | null,
    isMatched: boolean = true
  ) {
    if (imgElement?.parentElement) {
      if (isMatched) {
        imgElement.parentElement.className = "gameItem text-center";
      } else {
        imgElement.parentElement.className =
          "gameItem text-center bgrhidden unmatched";
      }
    }
  }
  @autobind
  processGameItemClicked(event: Event) {
    let element: HTMLElement | null = event.target as HTMLElement;
    if (element.tagName == "img") {
      element = element.parentElement;
    }
    let isStart: number = 0;
    if (isStart < 1) {
      stopwatch.start();
      isStart++;
    }
    const setinterval = setInterval(() => {
      startTimer = stopwatch.getElapsedTime();
      if (startTimer > overTimer) {
        clearInterval(setinterval);
        alert(
          `Bạn đã thua vì thời gian chơi quá ${
            overTimer / 1000
          } giây, trò chơi sẽ được bắt đầu lại`
        );
        this.restartGame();
      }
    }, 100);
    for (const item of this.items) {
      if (
        item.divId == element?.id &&
        !item.isMatched &&
        item.status === GameItemStatus.Close
      ) {
        item.status = GameItemStatus.Open;

        let imgElement = element.querySelector("img");
        if (imgElement) {
          element.classList.add("bgrhidden");
          imgElement.className = "img-fluid visible";
          this.isMatched(item.id, imgElement);
        }
      }
    }
    if (this.isWinGame()) {
      const endTimer = stopwatch.stop();
      const formatTimer = stopwatch.formatTime(endTimer);
      setTimeout(() => {
        alert(`Bạn thắng với thời gian ${formatTimer}`);
        if (confirm("Bạn có muốn chơi tiếp?")) {
          this.restartGame();
        }
      }, 900);
    }
  }
  restartGame() {
    this.reinitGame();
    stopwatch.reset();
    const boardElement: HTMLElement = document.querySelector(
      "#board"
    ) as HTMLElement;
    boardElement.innerHTML = "";
    renderTimer.innerHTML = "00:00:00";
    totalMatched = 0;
    this.renderTotalMatched();
    this.renderGameBoard();
  }
  renderTotalMatched() {
    totalNumberMatched.innerHTML = `${totalMatched}/${this.items.length / 2}`;
  }
  CloseGame() {
    if (confirm("Bạn có muốn thoát khỏi trò chơi không?")) {
      localStorage.clear();
      window.location = "./" as Location | (string & Location);
    }
  }
  @autobind
  processResetButtonClicked(event: Event): void {
    this.restartGame();
  }
  @autobind
  processCloseButtonClicked(event: Event): void {
    this.CloseGame();
  }
  shuffle() {
    this.items = _.shuffle(this.items);
  }
}
