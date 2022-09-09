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
/* harmony export */   "taskItemToJSON": () => (/* binding */ taskItemToJSON),
/* harmony export */   "taskUIFactory": () => (/* binding */ taskUIFactory)
/* harmony export */ });


const taskUIFactory = (title="", description="", dueDate="", priority=1, dataID) => {
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
3

  let titleInput = element.children[0].children[0].children[1]
  let dateInput = element.children[0].children[1].children[1]
  let textarea = element.children[1].children[1]
  return {
    element, title, description, dueDate, priority, addButton, cancelButton, titleInput,
    dateInput, textarea, dataID
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



const taskItemToJSON = (object) => {
  object.title = object.titleInput.value
  object.description = object.textarea.value
  object.dueDate = object.dateInput.value
  let objID = JSON.parse(localStorage.getItem('id'))
  object.dataID = objID
  localStorage.setItem('id', objID + 1)
  localStorage.setItem(object.title, JSON.stringify(object))
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
localStorage.setItem('id', 1)
let something = taskStuff.taskUIFactory()

let listDiv = document.getElementById('list')

console.log(something)



listDiv.appendChild(something.element)

const manipulateDom = (() => {




  const greenButtonFunction = (object) => {
    console.log(object)
    taskStuff.taskItemToJSON(object)
    console.log(object)

    reloadList()

  }


  const reloadList = () => {
    let wholeStorage = JSON.parse(JSON.stringify(localStorage)),
        listDiv = document.getElementById('list')
    for (let key in wholeStorage) {
      if (key === 'id') continue;
      let element = taskObjToDom(wholeStorage[key])
      console.log(wholeStorage[key])
//      console.log(wholeStorage[key].titleInput)

      listDiv.appendChild(element)
    }
    listDiv.appendChild(taskStuff.createTaskButton())
  }
  const taskObjToDom = (object) => {
    let taskItem = document.createElement('div'),
        main = document.createElement('div'),
        title = document.createElement('div'),
        date = document.createElement('div'),
        description = document.createElement('div')

    taskItem.className = 'task-item'
    main.className = 'main'
    description.className = 'task-description'

    title.textContent = object.title
    date.textContent = object.date
    description.textContent = object.description
   // console.log(description.textContent)
    main.appendChild(title)
    main.appendChild(date)

    taskItem.appendChild(main)
    taskItem.appendChild(description)
    taskItem.setAttribute
    return taskItem
  }

  return {
    greenButtonFunction,
    taskObjToDom
  }
})();



something.addButton.addEventListener('click', () => {
  manipulateDom.greenButtonFunction(something)
})

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQzs7Ozs7OztVQ2xHRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7OztBQ05BO0FBQ0Esa0JBQWtCLG1CQUFPLEVBQUUsdUNBQWE7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtdG8tZG8tbGlzdC8uL3NyYy90YXNrU3R1ZmYuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9wLXRvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvcC10by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9wLXRvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b3AtdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmNvbnN0IHRhc2tVSUZhY3RvcnkgPSAodGl0bGU9XCJcIiwgZGVzY3JpcHRpb249XCJcIiwgZHVlRGF0ZT1cIlwiLCBwcmlvcml0eT0xLCBkYXRhSUQpID0+IHtcclxuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcblxyXG4gIGVsZW1lbnQuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJ0b3Atcm93XCI+XHJcbiAgPGRpdiBpZD1cImFkZC10aXRsZVwiPlxyXG4gICAgPGxhYmVsIGZvcj1cInRpdGxlLWlucHV0XCI+VGl0bGU8L2xhYmVsPlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRpdGxlXCIgaWQ9XCJ0aXRsZS1pbnB1dFwiIHZhbHVlPVwiYCt0aXRsZStgXCI+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBpZD1cInNlbGVjdC1kYXRlXCI+XHJcbiAgICA8bGFiZWwgZm9yPVwiZHVlLWRhdGVcIj5EYXRlPC9sYWJlbD5cclxuICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIG5hbWU9XCJkdWUtZGF0ZVwiIGlkPVwiZHVlLWRhdGVcIiB2YWx1ZT1cImArZHVlRGF0ZStgXCI+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBpZD1cInNlbGVjdC1wcmlvXCI+XHJcbiAgICA8ZGl2PlByaW9yaXR5PC9kaXY+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwibG93XCI+PC9idXR0b24+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwibWVkaXVtXCI+PC9idXR0b24+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwiaGlnaFwiPjwvYnV0dG9uPlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuPGRpdiBpZD1cImFkZC1kZXNjcmlwdGlvblwiPlxyXG4gIDxsYWJlbCBmb3I9XCJkZXNjcmlwdGlvblwiPkRlc2NyaXB0aW9uPC9sYWJlbD5cclxuICA8dGV4dGFyZWEgbmFtZT1cImRlc2NyaXB0aW9uXCIgaWQ9XCJkZXNjcmlwdGlvblwiPmArZGVzY3JpcHRpb24rYDwvdGV4dGFyZWE+XHJcbjwvZGl2PlxyXG5gXHJcblxyXG5cclxuXHJcbiAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0YXNrLXVpJylcclxuXHJcbiAgbGV0IGJ1dHRvbnNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgIGNhbmNlbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpLFxyXG4gICAgICBhZGRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxyXG5cclxuICBidXR0b25zRWxlbWVudC5jbGFzc05hbWUgPSAnYnV0dG9uJ1xyXG4gIGFkZEJ1dHRvbi5pZCA9IFwiYWRkXCJcclxuICBjYW5jZWxCdXR0b24uaWQgPSBcImNhbmNlbFwiXHJcblxyXG4gIGFkZEJ1dHRvbi5pbm5lckhUTUwgPVxyXG4gIGBcclxuICAgIDxzdmcgc3R5bGU9XCJ3aWR0aDoyNHB4O2hlaWdodDoyNHB4XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0yMSw3TDksMTlMMy41LDEzLjVMNC45MSwxMi4wOUw5LDE2LjE3TDE5LjU5LDUuNTlMMjEsN1pcIiAvPlxyXG4gICAgPC9zdmc+XHJcbiAgYFxyXG4gIGNhbmNlbEJ1dHRvbi5pbm5lckhUTUwgPVxyXG4gIGBcclxuICA8c3ZnIHN0eWxlPVwid2lkdGg6MjRweDtoZWlnaHQ6MjRweFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTE5LDYuNDFMMTcuNTksNUwxMiwxMC41OUw2LjQxLDVMNSw2LjQxTDEwLjU5LDEyTDUsMTcuNTlMNi40MSwxOUwxMiwxMy40MUwxNy41OSwxOUwxOSwxNy41OUwxMy40MSwxMkwxOSw2LjQxWlwiIC8+XHJcbiAgPC9zdmc+XHJcbiAgYFxyXG4gIGJ1dHRvbnNFbGVtZW50LmFwcGVuZENoaWxkKGFkZEJ1dHRvbilcclxuICBidXR0b25zRWxlbWVudC5hcHBlbmRDaGlsZChjYW5jZWxCdXR0b24pXHJcblxyXG4gIGVsZW1lbnQuYXBwZW5kQ2hpbGQoYnV0dG9uc0VsZW1lbnQpXHJcbjNcclxuXHJcbiAgbGV0IHRpdGxlSW5wdXQgPSBlbGVtZW50LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdXHJcbiAgbGV0IGRhdGVJbnB1dCA9IGVsZW1lbnQuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMV1cclxuICBsZXQgdGV4dGFyZWEgPSBlbGVtZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuWzFdXHJcbiAgcmV0dXJuIHtcclxuICAgIGVsZW1lbnQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIGFkZEJ1dHRvbiwgY2FuY2VsQnV0dG9uLCB0aXRsZUlucHV0LFxyXG4gICAgZGF0ZUlucHV0LCB0ZXh0YXJlYSwgZGF0YUlEXHJcbiAgfVxyXG59XHJcblxyXG5cclxuY29uc3QgY3JlYXRlVGFza0J1dHRvbiA9ICgpID0+IHtcclxuICBsZXQgdGFza0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpLFxyXG4gICAgICBzdmdJY29uID1cclxuICAgICAgICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICAgICAgICA8c3ZnIHN0eWxlPVwid2lkdGg6MmVtO1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xNywxOFY1SDdWMThMMTIsMTUuODJMMTcsMThNMTcsM0EyLDIgMCAwLDEgMTksNVYyMUwxMiwxOEw1LDIxVjVDNSwzLjg5IDUuOSwzIDcsM0gxN00xMSw3SDEzVjlIMTVWMTFIMTNWMTNIMTFWMTFIOVY5SDExVjdaXCIgLz5cclxuICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgIGBcclxuXHJcbiAgdGFza0J1dHRvbi5pZCA9ICd0YXNrLWJ1dHRvbidcclxuICB0YXNrQnV0dG9uLmlubmVySFRNTCA9IHN2Z0ljb24gKyBgIEFkZCBUYXNrYFxyXG4gIHJldHVybiB0YXNrQnV0dG9uXHJcbn1cclxuXHJcblxyXG5cclxuY29uc3QgdGFza0l0ZW1Ub0pTT04gPSAob2JqZWN0KSA9PiB7XHJcbiAgb2JqZWN0LnRpdGxlID0gb2JqZWN0LnRpdGxlSW5wdXQudmFsdWVcclxuICBvYmplY3QuZGVzY3JpcHRpb24gPSBvYmplY3QudGV4dGFyZWEudmFsdWVcclxuICBvYmplY3QuZHVlRGF0ZSA9IG9iamVjdC5kYXRlSW5wdXQudmFsdWVcclxuICBsZXQgb2JqSUQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpZCcpKVxyXG4gIG9iamVjdC5kYXRhSUQgPSBvYmpJRFxyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpZCcsIG9iaklEICsgMSlcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShvYmplY3QudGl0bGUsIEpTT04uc3RyaW5naWZ5KG9iamVjdCkpXHJcbn1cclxuXHJcblxyXG5leHBvcnQge1xyXG4gIGNyZWF0ZVRhc2tCdXR0b24sXHJcbiAgdGFza1VJRmFjdG9yeSxcclxuICB0YXNrSXRlbVRvSlNPTlxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXHJcbmNvbnN0IHRhc2tTdHVmZiA9IHJlcXVpcmUgKCcuL3Rhc2tTdHVmZicpXHJcbmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpZCcsIDEpXHJcbmxldCBzb21ldGhpbmcgPSB0YXNrU3R1ZmYudGFza1VJRmFjdG9yeSgpXHJcblxyXG5sZXQgbGlzdERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0JylcclxuXHJcbmNvbnNvbGUubG9nKHNvbWV0aGluZylcclxuXHJcblxyXG5cclxubGlzdERpdi5hcHBlbmRDaGlsZChzb21ldGhpbmcuZWxlbWVudClcclxuXHJcbmNvbnN0IG1hbmlwdWxhdGVEb20gPSAoKCkgPT4ge1xyXG5cclxuXHJcblxyXG5cclxuICBjb25zdCBncmVlbkJ1dHRvbkZ1bmN0aW9uID0gKG9iamVjdCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2cob2JqZWN0KVxyXG4gICAgdGFza1N0dWZmLnRhc2tJdGVtVG9KU09OKG9iamVjdClcclxuICAgIGNvbnNvbGUubG9nKG9iamVjdClcclxuXHJcbiAgICByZWxvYWRMaXN0KClcclxuXHJcbiAgfVxyXG5cclxuXHJcbiAgY29uc3QgcmVsb2FkTGlzdCA9ICgpID0+IHtcclxuICAgIGxldCB3aG9sZVN0b3JhZ2UgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGxvY2FsU3RvcmFnZSkpLFxyXG4gICAgICAgIGxpc3REaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlzdCcpXHJcbiAgICBmb3IgKGxldCBrZXkgaW4gd2hvbGVTdG9yYWdlKSB7XHJcbiAgICAgIGlmIChrZXkgPT09ICdpZCcpIGNvbnRpbnVlO1xyXG4gICAgICBsZXQgZWxlbWVudCA9IHRhc2tPYmpUb0RvbSh3aG9sZVN0b3JhZ2Vba2V5XSlcclxuICAgICAgY29uc29sZS5sb2cod2hvbGVTdG9yYWdlW2tleV0pXHJcbi8vICAgICAgY29uc29sZS5sb2cod2hvbGVTdG9yYWdlW2tleV0udGl0bGVJbnB1dClcclxuXHJcbiAgICAgIGxpc3REaXYuYXBwZW5kQ2hpbGQoZWxlbWVudClcclxuICAgIH1cclxuICAgIGxpc3REaXYuYXBwZW5kQ2hpbGQodGFza1N0dWZmLmNyZWF0ZVRhc2tCdXR0b24oKSlcclxuICB9XHJcbiAgY29uc3QgdGFza09ialRvRG9tID0gKG9iamVjdCkgPT4ge1xyXG4gICAgbGV0IHRhc2tJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgICAgbWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICAgIHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgICAgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuXHJcbiAgICB0YXNrSXRlbS5jbGFzc05hbWUgPSAndGFzay1pdGVtJ1xyXG4gICAgbWFpbi5jbGFzc05hbWUgPSAnbWFpbidcclxuICAgIGRlc2NyaXB0aW9uLmNsYXNzTmFtZSA9ICd0YXNrLWRlc2NyaXB0aW9uJ1xyXG5cclxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gb2JqZWN0LnRpdGxlXHJcbiAgICBkYXRlLnRleHRDb250ZW50ID0gb2JqZWN0LmRhdGVcclxuICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gb2JqZWN0LmRlc2NyaXB0aW9uXHJcbiAgIC8vIGNvbnNvbGUubG9nKGRlc2NyaXB0aW9uLnRleHRDb250ZW50KVxyXG4gICAgbWFpbi5hcHBlbmRDaGlsZCh0aXRsZSlcclxuICAgIG1haW4uYXBwZW5kQ2hpbGQoZGF0ZSlcclxuXHJcbiAgICB0YXNrSXRlbS5hcHBlbmRDaGlsZChtYWluKVxyXG4gICAgdGFza0l0ZW0uYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pXHJcbiAgICB0YXNrSXRlbS5zZXRBdHRyaWJ1dGVcclxuICAgIHJldHVybiB0YXNrSXRlbVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGdyZWVuQnV0dG9uRnVuY3Rpb24sXHJcbiAgICB0YXNrT2JqVG9Eb21cclxuICB9XHJcbn0pKCk7XHJcblxyXG5cclxuXHJcbnNvbWV0aGluZy5hZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgbWFuaXB1bGF0ZURvbS5ncmVlbkJ1dHRvbkZ1bmN0aW9uKHNvbWV0aGluZylcclxufSlcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9