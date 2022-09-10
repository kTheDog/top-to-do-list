/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "greenButtonFunction": () => (/* binding */ greenButtonFunction),
/* harmony export */   "taskUI": () => (/* binding */ taskUI)
/* harmony export */ });
const taskButtons = __webpack_require__(/*! ./taskButtons */ "./src/taskButtons.js")
const listDiv = document.getElementById('list')

localStorage.setItem('ID', 1)

const taskButtonFunction = (taskButton) => {
  let UI = taskUI()

  UI.addButton.addEventListener('click', () => {
    greenButtonFunction(UI)

  })

  UI.cancelButton.addEventListener('click', () => {
    redButtonFunction()
  })

  listDiv.removeChild(taskButton)
  listDiv.appendChild(UI.element)
}




const taskToDom = (object) => {
  object = JSON.parse(object)
  let element = document.createElement('div'),
      titleDiv = document.createElement('div'),
      dateDiv = document.createElement('div'),
      buttonDiv = document.createElement('div'),
      descriptionDiv = document.createElement('div'),
      taskMain = document.createElement('div');

  element.dataset.id = object.itemID
  element.className = 'task-item'
  titleDiv.className = 'title-div'
  dateDiv.className = 'date-div'
  descriptionDiv.className = 'hide description-div'
  buttonDiv.className = 'button-div'
  taskMain.className = 'task-main'

  titleDiv.textContent = object.title
  dateDiv.textContent = object.date
  descriptionDiv.textContent = object.description


  buttonDiv.appendChild(taskButtons.removeTask())
  buttonDiv.appendChild(taskButtons.expandTask())
  buttonDiv.appendChild(taskButtons.editTask())

  taskMain.appendChild(titleDiv)
  taskMain.appendChild(dateDiv)
  taskMain.appendChild(buttonDiv)


  element.appendChild(taskMain)
  element.appendChild(descriptionDiv)

  listDiv.appendChild(element)

}

const reloadDom = () => {
  listDiv.innerHTML = ""
  let wholeStorage = JSON.parse(JSON.stringify(localStorage))
  for (let key in wholeStorage) {
    if (key === 'ID') {continue}
    taskToDom(wholeStorage[key])

  }
}

const greenButtonFunction = (UI) => {
  let inpTitle = UI.element.children[0].children[0].children[1].value,
      inpDate = UI.element.children[0].children[1].children[1].value,
      inpDescription = UI.element.children[1].children[1].value,
      itemID = +localStorage.getItem('ID'),
      priority = UI.priority


  addToJson(inpTitle, inpDate, inpDescription, priority, itemID)

  localStorage.setItem('ID', itemID + 1)

  reloadDom()
  taskButtonElement()
}

const addToJson = (title, date, description, priority, itemID) => {
  let obj = {title, date, description, priority, itemID}
  localStorage.setItem(obj.itemID, JSON.stringify(obj))
}


const taskButtonElement = () => {
  let element = document.createElement('button')
  element.innerHTML =`<strong>Add task</strong>`
  element.addEventListener('click', () => {
    taskButtonFunction(element)
  })
  listDiv.appendChild(element)
}


const taskUI = (title="", description="", date="", priority="") => {
  let element = document.createElement('div')

  element.innerHTML = `
                        <div class="top-row">
                        <div id="add-title">
                          <label for="title-input">Title</label>
                          <input type="text" name="title" id="title-input" value="`+title+`">
                        </div>
                        <div id="select-date">
                          <label for="due-date">Date</label>
                          <input type="date" name="due-date" id="due-date" value="`+date+`">
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
                      <div class="button">
                      <button id="add">
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                        </svg>
                      </button>
                      <button id="cancel">
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                        </svg>
                      </button>
                    </div>
                      `
  element.classList.add('task-ui')

  let addButton = element.children[2].children[0]
  let cancelButton = element.children[2].children[1]

  return {
    element, title, description, date, priority, addButton, cancelButton
  }
}



taskButtonElement()


/***/ }),

/***/ "./src/taskButtons.js":
/*!****************************!*\
  !*** ./src/taskButtons.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "editTask": () => (/* binding */ editTask),
/* harmony export */   "expandTask": () => (/* binding */ expandTask),
/* harmony export */   "removeTask": () => (/* binding */ removeTask)
/* harmony export */ });
const imports = __webpack_require__(/*! ./index */ "./src/index.js")


const expandTask = () => {
  let button = document.createElement('button')
  button.className = 'expand-task'
  button.textContent = 'expand task'

  button.addEventListener('click', () => {
    let target = button.parentNode.parentNode.parentNode.querySelector('.description-div')
    console.log(button.parentNode.parentNode.parentNode.querySelector('desc'))
    console.log(target)
    target.classList.toggle('hide')
  })

  return button
}

const editTask = () => {
  let button = document.createElement('button')

  button.className = 'edit-task'
  button.textContent = 'edit task'
  button.addEventListener('click', () => {
    let target = button.parentNode.parentNode.parentNode


    let object = JSON.parse(localStorage.getItem(target.dataset.id)),
        replacement = imports.taskUI(object.title, object.description, object.date, object.priority)

    replacement.addButton.addEventListener('click', () => {
      imports.greenButtonFunction(replacement)
    })
    target.replaceWith(replacement.element)
    console.log(object)
  })

  return button
}

const removeTask = () => {
  let button = document.createElement('button')

  button.className = 'remove-task'
  button.textContent = 'remove task'
  button.addEventListener('click', () => {
    let target = button.parentNode.parentNode.parentNode
    localStorage.removeItem(target.dataset.id)
    target.remove()
  })

  return button
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0IsbUJBQU8sQ0FBQywyQ0FBZTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlDO0FBQ0Q7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1SkEsZ0JBQWdCLG1CQUFPLENBQUMsK0JBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0M7QUFDRDs7Ozs7OztVQzlEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvcC10by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvcC10by1kby1saXN0Ly4vc3JjL3Rhc2tCdXR0b25zLmpzIiwid2VicGFjazovL3RvcC10by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvcC10by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b3AtdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvcC10by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9wLXRvLWRvLWxpc3Qvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90b3AtdG8tZG8tbGlzdC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9wLXRvLWRvLWxpc3Qvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHRhc2tCdXR0b25zID0gcmVxdWlyZSgnLi90YXNrQnV0dG9ucycpXHJcbmNvbnN0IGxpc3REaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlzdCcpXHJcblxyXG5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnSUQnLCAxKVxyXG5cclxuY29uc3QgdGFza0J1dHRvbkZ1bmN0aW9uID0gKHRhc2tCdXR0b24pID0+IHtcclxuICBsZXQgVUkgPSB0YXNrVUkoKVxyXG5cclxuICBVSS5hZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBncmVlbkJ1dHRvbkZ1bmN0aW9uKFVJKVxyXG5cclxuICB9KVxyXG5cclxuICBVSS5jYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICByZWRCdXR0b25GdW5jdGlvbigpXHJcbiAgfSlcclxuXHJcbiAgbGlzdERpdi5yZW1vdmVDaGlsZCh0YXNrQnV0dG9uKVxyXG4gIGxpc3REaXYuYXBwZW5kQ2hpbGQoVUkuZWxlbWVudClcclxufVxyXG5cclxuXHJcblxyXG5cclxuY29uc3QgdGFza1RvRG9tID0gKG9iamVjdCkgPT4ge1xyXG4gIG9iamVjdCA9IEpTT04ucGFyc2Uob2JqZWN0KVxyXG4gIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgIHRpdGxlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgIGRhdGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgYnV0dG9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgIGRlc2NyaXB0aW9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgIHRhc2tNYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gIGVsZW1lbnQuZGF0YXNldC5pZCA9IG9iamVjdC5pdGVtSURcclxuICBlbGVtZW50LmNsYXNzTmFtZSA9ICd0YXNrLWl0ZW0nXHJcbiAgdGl0bGVEaXYuY2xhc3NOYW1lID0gJ3RpdGxlLWRpdidcclxuICBkYXRlRGl2LmNsYXNzTmFtZSA9ICdkYXRlLWRpdidcclxuICBkZXNjcmlwdGlvbkRpdi5jbGFzc05hbWUgPSAnaGlkZSBkZXNjcmlwdGlvbi1kaXYnXHJcbiAgYnV0dG9uRGl2LmNsYXNzTmFtZSA9ICdidXR0b24tZGl2J1xyXG4gIHRhc2tNYWluLmNsYXNzTmFtZSA9ICd0YXNrLW1haW4nXHJcblxyXG4gIHRpdGxlRGl2LnRleHRDb250ZW50ID0gb2JqZWN0LnRpdGxlXHJcbiAgZGF0ZURpdi50ZXh0Q29udGVudCA9IG9iamVjdC5kYXRlXHJcbiAgZGVzY3JpcHRpb25EaXYudGV4dENvbnRlbnQgPSBvYmplY3QuZGVzY3JpcHRpb25cclxuXHJcblxyXG4gIGJ1dHRvbkRpdi5hcHBlbmRDaGlsZCh0YXNrQnV0dG9ucy5yZW1vdmVUYXNrKCkpXHJcbiAgYnV0dG9uRGl2LmFwcGVuZENoaWxkKHRhc2tCdXR0b25zLmV4cGFuZFRhc2soKSlcclxuICBidXR0b25EaXYuYXBwZW5kQ2hpbGQodGFza0J1dHRvbnMuZWRpdFRhc2soKSlcclxuXHJcbiAgdGFza01haW4uYXBwZW5kQ2hpbGQodGl0bGVEaXYpXHJcbiAgdGFza01haW4uYXBwZW5kQ2hpbGQoZGF0ZURpdilcclxuICB0YXNrTWFpbi5hcHBlbmRDaGlsZChidXR0b25EaXYpXHJcblxyXG5cclxuICBlbGVtZW50LmFwcGVuZENoaWxkKHRhc2tNYWluKVxyXG4gIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25EaXYpXHJcblxyXG4gIGxpc3REaXYuYXBwZW5kQ2hpbGQoZWxlbWVudClcclxuXHJcbn1cclxuXHJcbmNvbnN0IHJlbG9hZERvbSA9ICgpID0+IHtcclxuICBsaXN0RGl2LmlubmVySFRNTCA9IFwiXCJcclxuICBsZXQgd2hvbGVTdG9yYWdlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShsb2NhbFN0b3JhZ2UpKVxyXG4gIGZvciAobGV0IGtleSBpbiB3aG9sZVN0b3JhZ2UpIHtcclxuICAgIGlmIChrZXkgPT09ICdJRCcpIHtjb250aW51ZX1cclxuICAgIHRhc2tUb0RvbSh3aG9sZVN0b3JhZ2Vba2V5XSlcclxuXHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBncmVlbkJ1dHRvbkZ1bmN0aW9uID0gKFVJKSA9PiB7XHJcbiAgbGV0IGlucFRpdGxlID0gVUkuZWxlbWVudC5jaGlsZHJlblswXS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS52YWx1ZSxcclxuICAgICAgaW5wRGF0ZSA9IFVJLmVsZW1lbnQuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMV0udmFsdWUsXHJcbiAgICAgIGlucERlc2NyaXB0aW9uID0gVUkuZWxlbWVudC5jaGlsZHJlblsxXS5jaGlsZHJlblsxXS52YWx1ZSxcclxuICAgICAgaXRlbUlEID0gK2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdJRCcpLFxyXG4gICAgICBwcmlvcml0eSA9IFVJLnByaW9yaXR5XHJcblxyXG5cclxuICBhZGRUb0pzb24oaW5wVGl0bGUsIGlucERhdGUsIGlucERlc2NyaXB0aW9uLCBwcmlvcml0eSwgaXRlbUlEKVxyXG5cclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnSUQnLCBpdGVtSUQgKyAxKVxyXG5cclxuICByZWxvYWREb20oKVxyXG4gIHRhc2tCdXR0b25FbGVtZW50KClcclxufVxyXG5cclxuY29uc3QgYWRkVG9Kc29uID0gKHRpdGxlLCBkYXRlLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHksIGl0ZW1JRCkgPT4ge1xyXG4gIGxldCBvYmogPSB7dGl0bGUsIGRhdGUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgaXRlbUlEfVxyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG9iai5pdGVtSUQsIEpTT04uc3RyaW5naWZ5KG9iaikpXHJcbn1cclxuXHJcblxyXG5jb25zdCB0YXNrQnV0dG9uRWxlbWVudCA9ICgpID0+IHtcclxuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXHJcbiAgZWxlbWVudC5pbm5lckhUTUwgPWA8c3Ryb25nPkFkZCB0YXNrPC9zdHJvbmc+YFxyXG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICB0YXNrQnV0dG9uRnVuY3Rpb24oZWxlbWVudClcclxuICB9KVxyXG4gIGxpc3REaXYuYXBwZW5kQ2hpbGQoZWxlbWVudClcclxufVxyXG5cclxuXHJcbmNvbnN0IHRhc2tVSSA9ICh0aXRsZT1cIlwiLCBkZXNjcmlwdGlvbj1cIlwiLCBkYXRlPVwiXCIsIHByaW9yaXR5PVwiXCIpID0+IHtcclxuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcblxyXG4gIGVsZW1lbnQuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9wLXJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiYWRkLXRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInRpdGxlLWlucHV0XCI+VGl0bGU8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ0aXRsZVwiIGlkPVwidGl0bGUtaW5wdXRcIiB2YWx1ZT1cImArdGl0bGUrYFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cInNlbGVjdC1kYXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImR1ZS1kYXRlXCI+RGF0ZTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJkYXRlXCIgbmFtZT1cImR1ZS1kYXRlXCIgaWQ9XCJkdWUtZGF0ZVwiIHZhbHVlPVwiYCtkYXRlK2BcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJzZWxlY3QtcHJpb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+UHJpb3JpdHk8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibG93XCI+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm1lZGl1bVwiPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJoaWdoXCI+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiYWRkLWRlc2NyaXB0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJkZXNjcmlwdGlvblwiPkRlc2NyaXB0aW9uPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIG5hbWU9XCJkZXNjcmlwdGlvblwiIGlkPVwiZGVzY3JpcHRpb25cIj5gK2Rlc2NyaXB0aW9uK2A8L3RleHRhcmVhPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVwiYWRkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgc3R5bGU9XCJ3aWR0aDoyNHB4O2hlaWdodDoyNHB4XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTIxLDdMOSwxOUwzLjUsMTMuNUw0LjkxLDEyLjA5TDksMTYuMTdMMTkuNTksNS41OUwyMSw3WlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVwiY2FuY2VsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgc3R5bGU9XCJ3aWR0aDoyNHB4O2hlaWdodDoyNHB4XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTE5LDYuNDFMMTcuNTksNUwxMiwxMC41OUw2LjQxLDVMNSw2LjQxTDEwLjU5LDEyTDUsMTcuNTlMNi40MSwxOUwxMiwxMy40MUwxNy41OSwxOUwxOSwxNy41OUwxMy40MSwxMkwxOSw2LjQxWlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICBgXHJcbiAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0YXNrLXVpJylcclxuXHJcbiAgbGV0IGFkZEJ1dHRvbiA9IGVsZW1lbnQuY2hpbGRyZW5bMl0uY2hpbGRyZW5bMF1cclxuICBsZXQgY2FuY2VsQnV0dG9uID0gZWxlbWVudC5jaGlsZHJlblsyXS5jaGlsZHJlblsxXVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZWxlbWVudCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSwgYWRkQnV0dG9uLCBjYW5jZWxCdXR0b25cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgdGFza1VJLFxyXG4gIGdyZWVuQnV0dG9uRnVuY3Rpb25cclxufVxyXG5cclxudGFza0J1dHRvbkVsZW1lbnQoKVxyXG4iLCJjb25zdCBpbXBvcnRzID0gcmVxdWlyZSgnLi9pbmRleCcpXHJcblxyXG5cclxuY29uc3QgZXhwYW5kVGFzayA9ICgpID0+IHtcclxuICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcclxuICBidXR0b24uY2xhc3NOYW1lID0gJ2V4cGFuZC10YXNrJ1xyXG4gIGJ1dHRvbi50ZXh0Q29udGVudCA9ICdleHBhbmQgdGFzaydcclxuXHJcbiAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgbGV0IHRhcmdldCA9IGJ1dHRvbi5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcuZGVzY3JpcHRpb24tZGl2JylcclxuICAgIGNvbnNvbGUubG9nKGJ1dHRvbi5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCdkZXNjJykpXHJcbiAgICBjb25zb2xlLmxvZyh0YXJnZXQpXHJcbiAgICB0YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpXHJcbiAgfSlcclxuXHJcbiAgcmV0dXJuIGJ1dHRvblxyXG59XHJcblxyXG5jb25zdCBlZGl0VGFzayA9ICgpID0+IHtcclxuICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcclxuXHJcbiAgYnV0dG9uLmNsYXNzTmFtZSA9ICdlZGl0LXRhc2snXHJcbiAgYnV0dG9uLnRleHRDb250ZW50ID0gJ2VkaXQgdGFzaydcclxuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBsZXQgdGFyZ2V0ID0gYnV0dG9uLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlXHJcblxyXG5cclxuICAgIGxldCBvYmplY3QgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRhcmdldC5kYXRhc2V0LmlkKSksXHJcbiAgICAgICAgcmVwbGFjZW1lbnQgPSBpbXBvcnRzLnRhc2tVSShvYmplY3QudGl0bGUsIG9iamVjdC5kZXNjcmlwdGlvbiwgb2JqZWN0LmRhdGUsIG9iamVjdC5wcmlvcml0eSlcclxuXHJcbiAgICByZXBsYWNlbWVudC5hZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGltcG9ydHMuZ3JlZW5CdXR0b25GdW5jdGlvbihyZXBsYWNlbWVudClcclxuICAgIH0pXHJcbiAgICB0YXJnZXQucmVwbGFjZVdpdGgocmVwbGFjZW1lbnQuZWxlbWVudClcclxuICAgIGNvbnNvbGUubG9nKG9iamVjdClcclxuICB9KVxyXG5cclxuICByZXR1cm4gYnV0dG9uXHJcbn1cclxuXHJcbmNvbnN0IHJlbW92ZVRhc2sgPSAoKSA9PiB7XHJcbiAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXHJcblxyXG4gIGJ1dHRvbi5jbGFzc05hbWUgPSAncmVtb3ZlLXRhc2snXHJcbiAgYnV0dG9uLnRleHRDb250ZW50ID0gJ3JlbW92ZSB0YXNrJ1xyXG4gIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGxldCB0YXJnZXQgPSBidXR0b24ucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGVcclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRhcmdldC5kYXRhc2V0LmlkKVxyXG4gICAgdGFyZ2V0LnJlbW92ZSgpXHJcbiAgfSlcclxuXHJcbiAgcmV0dXJuIGJ1dHRvblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQge1xyXG4gIHJlbW92ZVRhc2ssXHJcbiAgZXhwYW5kVGFzayxcclxuICBlZGl0VGFza1xyXG59XHJcblxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9