/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/taskStuff.js":
/*!**************************!*\
  !*** ./src/taskStuff.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTaskButton": () => (/* binding */ createTaskButton),
/* harmony export */   "taskUIFactory": () => (/* binding */ taskUIFactory)
/* harmony export */ });


const taskUIFactory = (title="", description="", dueDate="", priority=1) => {
  let element = document.createElement('div')

  element.innerHTML = `<div class="top-row">
  <div id="add-title">
    <label for="title-input">Title</label>
    <input type="text" name="title" id="title-input" value="`+title+`">
  </div>
  <div id="select-date">
    <label for="due-date">Date</label>
    <input type="date" name="due-date" id="due-date" value="`+dueDate+`">
  </div>
  <div id="select-prio">
    <div>Priority</div>
    <button class="low"></button>
    <button class="medium"></button>
    <button class="high"></button>
  </div>
</div>
<div id="add-description">
  <label for="description">Description</label>
  <textarea name="description" id="description">`+description+`</textarea>
</div>
`



  element.classList.add('task-ui')

  let buttonsElement = document.createElement('div'),
      cancelButton = document.createElement('button'),
      addButton = document.createElement('button')

  buttonsElement.className = 'button'
  addButton.id = "add"
  cancelButton.id = "cancel"

  addButton.innerHTML =
  `
    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
    </svg>
  `
  cancelButton.innerHTML =
  `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
  </svg>
  `
  buttonsElement.appendChild(addButton)
  buttonsElement.appendChild(cancelButton)

  element.appendChild(buttonsElement)

  let titleInput = element.children[0].children[0].children[1]
  let dateInput = element.children[0].children[1].children[1]
  let textarea = element.children[1].children[1]
  return {
    element, title, description, dueDate, priority, addButton, cancelButton, titleInput,
    dateInput, textarea
  }
}


const createTaskButton = () => {
  let taskButton = document.createElement('button'),
      svgIcon =
                  `
                  <svg style="width:2em;" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M17,18V5H7V18L12,15.82L17,18M17,3A2,2 0 0,1 19,5V21L12,18L5,21V5C5,3.89 5.9,3 7,3H17M11,7H13V9H15V11H13V13H11V11H9V9H11V7Z" />
                  </svg>
                  `

  taskButton.id = 'task-button'
  taskButton.innerHTML = svgIcon + ` Add Task`

  return taskButton
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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/

const taskStuff = __webpack_require__ (/*! ./taskStuff */ "./src/taskStuff.js")

let something = taskStuff.taskUIFactory()

let listDiv = document.getElementById('list')

console.log(something)



listDiv.appendChild(something.element)
const manipulateDom = (() => {




  const greenButtonFunction = (object) => {
    object.title = object.titleInput.value
    object.description = object.textarea.value
    object.dueDate = object.dateInput.value
    localStorage.setItem(object.title, JSON.stringify(object))
  }



  return {
    greenButtonFunction
  }
})();



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUM7Ozs7Ozs7VUN6RkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7QUNOQTtBQUNBLGtCQUFrQixtQkFBTyxFQUFFLHVDQUFhO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9wLXRvLWRvLWxpc3QvLi9zcmMvdGFza1N0dWZmLmpzIiwid2VicGFjazovL3RvcC10by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvcC10by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b3AtdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvcC10by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9wLXRvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5jb25zdCB0YXNrVUlGYWN0b3J5ID0gKHRpdGxlPVwiXCIsIGRlc2NyaXB0aW9uPVwiXCIsIGR1ZURhdGU9XCJcIiwgcHJpb3JpdHk9MSkgPT4ge1xyXG4gIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuXHJcbiAgZWxlbWVudC5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cInRvcC1yb3dcIj5cclxuICA8ZGl2IGlkPVwiYWRkLXRpdGxlXCI+XHJcbiAgICA8bGFiZWwgZm9yPVwidGl0bGUtaW5wdXRcIj5UaXRsZTwvbGFiZWw+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidGl0bGVcIiBpZD1cInRpdGxlLWlucHV0XCIgdmFsdWU9XCJgK3RpdGxlK2BcIj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGlkPVwic2VsZWN0LWRhdGVcIj5cclxuICAgIDxsYWJlbCBmb3I9XCJkdWUtZGF0ZVwiPkRhdGU8L2xhYmVsPlxyXG4gICAgPGlucHV0IHR5cGU9XCJkYXRlXCIgbmFtZT1cImR1ZS1kYXRlXCIgaWQ9XCJkdWUtZGF0ZVwiIHZhbHVlPVwiYCtkdWVEYXRlK2BcIj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGlkPVwic2VsZWN0LXByaW9cIj5cclxuICAgIDxkaXY+UHJpb3JpdHk8L2Rpdj5cclxuICAgIDxidXR0b24gY2xhc3M9XCJsb3dcIj48L2J1dHRvbj5cclxuICAgIDxidXR0b24gY2xhc3M9XCJtZWRpdW1cIj48L2J1dHRvbj5cclxuICAgIDxidXR0b24gY2xhc3M9XCJoaWdoXCI+PC9idXR0b24+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG48ZGl2IGlkPVwiYWRkLWRlc2NyaXB0aW9uXCI+XHJcbiAgPGxhYmVsIGZvcj1cImRlc2NyaXB0aW9uXCI+RGVzY3JpcHRpb248L2xhYmVsPlxyXG4gIDx0ZXh0YXJlYSBuYW1lPVwiZGVzY3JpcHRpb25cIiBpZD1cImRlc2NyaXB0aW9uXCI+YCtkZXNjcmlwdGlvbitgPC90ZXh0YXJlYT5cclxuPC9kaXY+XHJcbmBcclxuXHJcblxyXG5cclxuICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Rhc2stdWknKVxyXG5cclxuICBsZXQgYnV0dG9uc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgY2FuY2VsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyksXHJcbiAgICAgIGFkZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXHJcblxyXG4gIGJ1dHRvbnNFbGVtZW50LmNsYXNzTmFtZSA9ICdidXR0b24nXHJcbiAgYWRkQnV0dG9uLmlkID0gXCJhZGRcIlxyXG4gIGNhbmNlbEJ1dHRvbi5pZCA9IFwiY2FuY2VsXCJcclxuXHJcbiAgYWRkQnV0dG9uLmlubmVySFRNTCA9XHJcbiAgYFxyXG4gICAgPHN2ZyBzdHlsZT1cIndpZHRoOjI0cHg7aGVpZ2h0OjI0cHhcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTIxLDdMOSwxOUwzLjUsMTMuNUw0LjkxLDEyLjA5TDksMTYuMTdMMTkuNTksNS41OUwyMSw3WlwiIC8+XHJcbiAgICA8L3N2Zz5cclxuICBgXHJcbiAgY2FuY2VsQnV0dG9uLmlubmVySFRNTCA9XHJcbiAgYFxyXG4gIDxzdmcgc3R5bGU9XCJ3aWR0aDoyNHB4O2hlaWdodDoyNHB4XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTksNi40MUwxNy41OSw1TDEyLDEwLjU5TDYuNDEsNUw1LDYuNDFMMTAuNTksMTJMNSwxNy41OUw2LjQxLDE5TDEyLDEzLjQxTDE3LjU5LDE5TDE5LDE3LjU5TDEzLjQxLDEyTDE5LDYuNDFaXCIgLz5cclxuICA8L3N2Zz5cclxuICBgXHJcbiAgYnV0dG9uc0VsZW1lbnQuYXBwZW5kQ2hpbGQoYWRkQnV0dG9uKVxyXG4gIGJ1dHRvbnNFbGVtZW50LmFwcGVuZENoaWxkKGNhbmNlbEJ1dHRvbilcclxuXHJcbiAgZWxlbWVudC5hcHBlbmRDaGlsZChidXR0b25zRWxlbWVudClcclxuXHJcbiAgbGV0IHRpdGxlSW5wdXQgPSBlbGVtZW50LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdXHJcbiAgbGV0IGRhdGVJbnB1dCA9IGVsZW1lbnQuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMV1cclxuICBsZXQgdGV4dGFyZWEgPSBlbGVtZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuWzFdXHJcbiAgcmV0dXJuIHtcclxuICAgIGVsZW1lbnQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIGFkZEJ1dHRvbiwgY2FuY2VsQnV0dG9uLCB0aXRsZUlucHV0LFxyXG4gICAgZGF0ZUlucHV0LCB0ZXh0YXJlYVxyXG4gIH1cclxufVxyXG5cclxuXHJcbmNvbnN0IGNyZWF0ZVRhc2tCdXR0b24gPSAoKSA9PiB7XHJcbiAgbGV0IHRhc2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKSxcclxuICAgICAgc3ZnSWNvbiA9XHJcbiAgICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgICAgICAgPHN2ZyBzdHlsZT1cIndpZHRoOjJlbTtcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTcsMThWNUg3VjE4TDEyLDE1LjgyTDE3LDE4TTE3LDNBMiwyIDAgMCwxIDE5LDVWMjFMMTIsMThMNSwyMVY1QzUsMy44OSA1LjksMyA3LDNIMTdNMTEsN0gxM1Y5SDE1VjExSDEzVjEzSDExVjExSDlWOUgxMVY3WlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICBgXHJcblxyXG4gIHRhc2tCdXR0b24uaWQgPSAndGFzay1idXR0b24nXHJcbiAgdGFza0J1dHRvbi5pbm5lckhUTUwgPSBzdmdJY29uICsgYCBBZGQgVGFza2BcclxuXHJcbiAgcmV0dXJuIHRhc2tCdXR0b25cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQge1xyXG4gIGNyZWF0ZVRhc2tCdXR0b24sXHJcbiAgdGFza1VJRmFjdG9yeVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXHJcbmNvbnN0IHRhc2tTdHVmZiA9IHJlcXVpcmUgKCcuL3Rhc2tTdHVmZicpXHJcblxyXG5sZXQgc29tZXRoaW5nID0gdGFza1N0dWZmLnRhc2tVSUZhY3RvcnkoKVxyXG5cclxubGV0IGxpc3REaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlzdCcpXHJcblxyXG5jb25zb2xlLmxvZyhzb21ldGhpbmcpXHJcblxyXG5cclxuXHJcbmxpc3REaXYuYXBwZW5kQ2hpbGQoc29tZXRoaW5nLmVsZW1lbnQpXHJcbmNvbnN0IG1hbmlwdWxhdGVEb20gPSAoKCkgPT4ge1xyXG5cclxuXHJcblxyXG5cclxuICBjb25zdCBncmVlbkJ1dHRvbkZ1bmN0aW9uID0gKG9iamVjdCkgPT4ge1xyXG4gICAgb2JqZWN0LnRpdGxlID0gb2JqZWN0LnRpdGxlSW5wdXQudmFsdWVcclxuICAgIG9iamVjdC5kZXNjcmlwdGlvbiA9IG9iamVjdC50ZXh0YXJlYS52YWx1ZVxyXG4gICAgb2JqZWN0LmR1ZURhdGUgPSBvYmplY3QuZGF0ZUlucHV0LnZhbHVlXHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShvYmplY3QudGl0bGUsIEpTT04uc3RyaW5naWZ5KG9iamVjdCkpXHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBncmVlbkJ1dHRvbkZ1bmN0aW9uXHJcbiAgfVxyXG59KSgpO1xyXG5cclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==