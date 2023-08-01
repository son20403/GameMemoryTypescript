/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/frontend/App.ts":
/*!*****************************!*\
  !*** ./src/frontend/App.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _controllers_GameController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/GameController */ "./src/frontend/controllers/GameController.ts");
/* harmony import */ var _models_GameItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/GameItem */ "./src/frontend/models/GameItem.ts");


const playerName = localStorage.getItem("player_name");
if (!playerName) {
    window.location = "./";
}
window.addEventListener("DOMContentLoaded", () => {
    let namePlayer = document.querySelector("#namePlayer");
    namePlayer.textContent = `Xin chào ${playerName}`;
    const rootElement = document.querySelector("#app");
    var gameApp = null;
    if (rootElement) {
        gameApp = new _controllers_GameController__WEBPACK_IMPORTED_MODULE_0__.GameController([
            new _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItem(1, "", "img1.png"),
            new _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItem(2, "", "img2.png"),
            new _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItem(3, "", "img3.png"),
            new _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItem(4, "", "img4.png"),
            // new GameItem(5, "", "img5.png"),
            // new GameItem(6, "", "img6.png"),
            // new GameItem(7, "", "img7.png"),
            // new GameItem(8, "", "img8.png"),
            //   new GameItem(9, "", "9.png"),
            //   new GameItem(10, "", "10.png"),
        ], rootElement);
        gameApp === null || gameApp === void 0 ? void 0 : gameApp.renderGameBoard();
    }
});


/***/ }),

/***/ "./src/frontend/Timer.ts":
/*!*******************************!*\
  !*** ./src/frontend/Timer.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Stopwatch)
/* harmony export */ });
class Stopwatch {
    constructor(elementId) {
        this.elementId = elementId;
        this.startTime = 0;
        this.isRunning = false;
        this.elapsedTimeInMilliseconds = 0;
    }
    start() {
        if (!this.isRunning) {
            this.startTime = Date.now();
            this.intervalId = window.setInterval(() => {
                this.updateElapsedTime();
                this.render();
                return this.elapsedTimeInMilliseconds;
            }, 10);
            this.isRunning = true;
        }
        return this.elapsedTimeInMilliseconds;
    }
    stop() {
        if (this.isRunning) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
            this.isRunning = false;
        }
        return this.elapsedTimeInMilliseconds;
    }
    reset() {
        if (this.isRunning) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
            this.isRunning = false;
        }
        this.startTime = 0;
        this.elapsedTimeInMilliseconds = 0;
        this.render();
    }
    getElapsedTime() {
        return this.elapsedTimeInMilliseconds;
    }
    updateElapsedTime() {
        const currentTime = Date.now();
        this.elapsedTimeInMilliseconds =
            this.elapsedTimeInMilliseconds + (currentTime - this.startTime);
        this.startTime = currentTime;
    }
    render() {
        const stopwatchElement = document.getElementById(this.elementId);
        if (stopwatchElement) {
            stopwatchElement.innerHTML = this.formatTime(this.elapsedTimeInMilliseconds);
        }
    }
    formatTime(milliseconds) {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        const centiseconds = Math.floor((milliseconds % 1000) / 10);
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
    }
}
// const stopwatch = new Stopwatch("stopwatch");
// Bắt đầu đồng hồ bằng cách gọi hàm start()
// stopwatch.start();
// Dừng đồng hồ bằng cách gọi hàm stop()
// stopwatch.stop();
// Reset đồng hồ bằng cách gọi hàm reset()
// stopwatch.reset();


/***/ }),

/***/ "./src/frontend/Toast.ts":
/*!*******************************!*\
  !*** ./src/frontend/Toast.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toast)
/* harmony export */ });
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! toastify-js */ "./node_modules/toastify-js/src/toastify.js");
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(toastify_js__WEBPACK_IMPORTED_MODULE_0__);

function toast(message, color) {
    toastify_js__WEBPACK_IMPORTED_MODULE_0___default()({
        text: message,
        backgroundColor: color,
    }).showToast();
}


/***/ }),

/***/ "./src/frontend/controllers/GameController.ts":
/*!****************************************************!*\
  !*** ./src/frontend/controllers/GameController.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameController": () => (/* binding */ GameController)
/* harmony export */ });
/* harmony import */ var autobind_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! autobind-decorator */ "./node_modules/autobind-decorator/lib/esm/index.js");
/* harmony import */ var _models_GameItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../models/GameItem */ "./src/frontend/models/GameItem.ts");
/* harmony import */ var _Timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Timer */ "./src/frontend/Timer.ts");
/* harmony import */ var _Toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Toast */ "./src/frontend/Toast.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





const stopwatch = new _Timer__WEBPACK_IMPORTED_MODULE_2__["default"]("stopwatch");
let totalNumberMatched = document.querySelector("#totalMatched");
let renderTimer = document.querySelector("#stopwatch");
let totalMatched = 0;
let startTimer = 0;
let overTimer = 120000;
class GameController {
    constructor(items, element) {
        this.element = element;
        this.items = [];
        this.initGame(items);
    }
    initGame(initData) {
        for (const item of initData) {
            this.items.push(item);
            this.items.push(new _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItem(item.id, item.divId, item.image));
        }
        let id = 1;
        this.items.forEach((it) => {
            it.status = _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItemStatus.Close;
            it.divId = "d" + id;
            id++;
        });
    }
    reinitGame() {
        this.items.forEach((item) => {
            item.imageElement = null;
            item.status = _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItemStatus.Close;
            item.isMatched = false;
        });
        this.shuffle();
    }
    isWinGame() {
        return (this.items.filter((item) => item.status === _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItemStatus.Open)
            .length === this.items.length);
    }
    renderHTML(rootElement, item) {
        // <div class="col-2 gameItem m-2 p1 text-center">
        //     <img src="" alt="" class="img-fluid">
        // </div>
        const divItem = document.createElement("div");
        divItem.className = "gameItem text-center";
        divItem.id = item.divId;
        divItem.addEventListener("click", this.processGameItemClicked);
        const imgItem = document.createElement("img");
        imgItem.src = `images/${item.image}`;
        imgItem.className = "img-fluid invisible";
        item.imageElement = imgItem;
        divItem.append(imgItem);
        rootElement.appendChild(divItem);
        renderTimer.innerHTML = "00:00:00";
    }
    renderResetButton(rootElement) {
        let button = rootElement.querySelector("div#reset");
        if (button) {
            button.addEventListener("click", this.processResetButtonClicked);
        }
    }
    renderCloseButton(rootElement) {
        let button = rootElement.querySelector("div#cancel");
        if (button) {
            button.addEventListener("click", this.processCloseButtonClicked);
        }
    }
    renderGameBoard() {
        this.shuffle();
        let boardDiv = this.element.querySelector("#board");
        if (boardDiv) {
            this.items.forEach((it) => {
                this.renderHTML(boardDiv, it);
            });
        }
        this.renderTotalMatched();
        this.renderResetButton(this.element);
        this.renderCloseButton(this.element);
    }
    isMatched(id, imgElement) {
        let openedItem = this.items.filter((item) => {
            if (item.status === _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItemStatus.Open && !item.isMatched) {
                return item;
            }
        });
        if (openedItem.length == 2) {
            let checkMatchedFilter = openedItem.filter((item) => item.id == id);
            if (checkMatchedFilter.length < 2) {
                (0,_Toast__WEBPACK_IMPORTED_MODULE_3__["default"])("Bạn chọn chưa trùng khớp", "red");
                openedItem.forEach((item) => {
                    this.changeMatchedBackgroud(item.imageElement, false);
                });
                openedItem.forEach((item) => {
                    setTimeout(() => {
                        if (item.imageElement) {
                            item.imageElement.className = "img-fluid invisible";
                            item.status = _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItemStatus.Close;
                            item.isMatched = false;
                            this.changeMatchedBackgroud(item.imageElement);
                        }
                    }, 600);
                });
            }
            else {
                totalMatched++;
                this.renderTotalMatched();
                (0,_Toast__WEBPACK_IMPORTED_MODULE_3__["default"])("Chúc mừng bạn đã chọn đúng", "green");
                openedItem.forEach((item) => {
                    item.isMatched = true;
                    if (item.imageElement) {
                        const img = item.imageElement;
                        const elm = item.imageElement.parentElement;
                        elm.className = "gameItem text-center bgrhidden ismatched";
                        setTimeout(() => {
                            img.setAttribute("src", "https://cdn-icons-png.flaticon.com/512/5610/5610944.png");
                        }, 800);
                    }
                    // this.changeMatchedBackgroud(item.imageElement);
                });
                return true;
            }
        }
        return false;
    }
    changeMatchedBackgroud(imgElement, isMatched = true) {
        if (imgElement === null || imgElement === void 0 ? void 0 : imgElement.parentElement) {
            if (isMatched) {
                imgElement.parentElement.className = "gameItem text-center";
            }
            else {
                imgElement.parentElement.className =
                    "gameItem text-center bgrhidden unmatched";
            }
        }
    }
    processGameItemClicked(event) {
        let element = event.target;
        if (element.tagName == "img") {
            element = element.parentElement;
        }
        let isStart = 0;
        if (isStart < 1) {
            stopwatch.start();
            isStart++;
        }
        const setinterval = setInterval(() => {
            startTimer = stopwatch.getElapsedTime();
            if (startTimer > overTimer) {
                clearInterval(setinterval);
                alert(`Bạn đã thua vì thời gian chơi quá ${overTimer / 1000} giây, trò chơi sẽ được bắt đầu lại`);
                this.restartGame();
            }
        }, 100);
        for (const item of this.items) {
            if (item.divId == (element === null || element === void 0 ? void 0 : element.id) &&
                !item.isMatched &&
                item.status === _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItemStatus.Close) {
                item.status = _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItemStatus.Open;
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
        const boardElement = document.querySelector("#board");
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
            window.location = "./";
        }
    }
    processResetButtonClicked(event) {
        this.restartGame();
    }
    processCloseButtonClicked(event) {
        this.CloseGame();
    }
    shuffle() {
        this.items = lodash__WEBPACK_IMPORTED_MODULE_4___default().shuffle(this.items);
    }
}
__decorate([
    autobind_decorator__WEBPACK_IMPORTED_MODULE_0__["default"]
], GameController.prototype, "processGameItemClicked", null);
__decorate([
    autobind_decorator__WEBPACK_IMPORTED_MODULE_0__["default"]
], GameController.prototype, "processResetButtonClicked", null);
__decorate([
    autobind_decorator__WEBPACK_IMPORTED_MODULE_0__["default"]
], GameController.prototype, "processCloseButtonClicked", null);


/***/ }),

/***/ "./src/frontend/models/GameItem.ts":
/*!*****************************************!*\
  !*** ./src/frontend/models/GameItem.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameItem": () => (/* binding */ GameItem),
/* harmony export */   "GameItemStatus": () => (/* binding */ GameItemStatus)
/* harmony export */ });
var GameItemStatus;
(function (GameItemStatus) {
    GameItemStatus[GameItemStatus["Open"] = 0] = "Open";
    GameItemStatus[GameItemStatus["Close"] = 1] = "Close";
})(GameItemStatus || (GameItemStatus = {}));
class GameItem {
    constructor(id, divId, image, status = GameItemStatus.Close, isMatched = false, imageElement = null) {
        this.id = id;
        this.divId = divId;
        this.image = image;
        this.status = status;
        this.isMatched = isMatched;
        this.imageElement = imageElement;
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkasg"] = self["webpackChunkasg"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_autobind-decorator_lib_esm_index_js-node_modules_lodash_lodash_js-node_m-1be5c4"], () => (__webpack_require__("./src/frontend/App.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.bundle.js.map