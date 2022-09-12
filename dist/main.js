/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/editDom.js":
/*!************************!*\
  !*** ./src/editDom.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newTaskButton": () => (/* binding */ newTaskButton),
/* harmony export */   "taskItem": () => (/* binding */ taskItem),
/* harmony export */   "taskUi": () => (/* binding */ taskUi)
/* harmony export */ });
const supplyElement = __webpack_require__(/*! ./supplyElement */ "./src/supplyElement.js")
const mainFunctions = __webpack_require__(/*! ./mainFunctions */ "./src/mainFunctions.js")
const listDiv = document.getElementById('list')



const newTaskButton = () => {
  let element = supplyElement.newTaskButton()
  element.addEventListener('click', () => mainFunctions.newTaskButton(element))
  listDiv.appendChild(element)
}

const taskUi = (replaceThis, ui = supplyElement.taskUi()) => {
  ui.addButton.addEventListener('click', () => mainFunctions.greenButton(ui))
  /*take this out if you wanna allow multiple task edits at the same time */

  if (replaceThis.className === 'new-task') {
    mainFunctions.reloadDom()
    listDiv.appendChild(ui.element)
  }

  replaceThis.replaceWith(ui.element)
}

const taskItem = (object) => {
  let taskItem = supplyElement.taskItem(object)


  taskItem.finish.addEventListener('click', () => {
    mainFunctions.finishTaskButton(taskItem.finish)
  })

  taskItem.remove.addEventListener('click', () => {
    mainFunctions.removeTaskButton(taskItem.element, object.id)
  })

  taskItem.edit.addEventListener('click', () => {

    mainFunctions.editTaskButton(object)
  })

  taskItem.expand.addEventListener('click', () => {

    mainFunctions.expandTaskButton(taskItem.element)

  })



  listDiv.appendChild(taskItem.element)
}




/***/ }),

/***/ "./src/mainFunctions.js":
/*!******************************!*\
  !*** ./src/mainFunctions.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "editTaskButton": () => (/* binding */ editTaskButton),
/* harmony export */   "expandTaskButton": () => (/* binding */ expandTaskButton),
/* harmony export */   "finishTaskButton": () => (/* binding */ finishTaskButton),
/* harmony export */   "greenButton": () => (/* binding */ greenButton),
/* harmony export */   "newTaskButton": () => (/* binding */ newTaskButton),
/* harmony export */   "reloadDom": () => (/* binding */ reloadDom),
/* harmony export */   "removeTaskButton": () => (/* binding */ removeTaskButton)
/* harmony export */ });
const supplyElement = __webpack_require__(/*! ./supplyElement */ "./src/supplyElement.js")
const editDom = __webpack_require__(/*! ./editDom */ "./src/editDom.js")
const listDiv = document.getElementById('list')

const addToJson = (UI) => {
  let object = {},
      itemID = +localStorage.getItem('ID') + 1

  object.title = UI.inpTitle.value
  object.description = UI.inpDescription.value
  object.date = UI.inpDate.value
  object.priority = UI.priority
  object.id = UI.id || itemID
  localStorage.setItem('ID', itemID)
  localStorage.setItem(object.id, JSON.stringify(object))
}

const reloadDom = () => {
  listDiv.innerHTML = ""
  let storage = JSON.parse(JSON.stringify(localStorage))
  for (let key in storage) {
    if(key === "ID") {continue}
    let obj = JSON.parse(storage[key])
    editDom.taskItem(obj)

  }

}

const newTaskButton = (button) => {
  editDom.taskUi(button)
}

const greenButton = (UI) => {
  if (!(UI.inpTitle.value && UI.inpDate.value && UI.inpDescription.value)) {
    alert('Please fill in all fields')
    return;
  }
  addToJson(UI),
  reloadDom(),
  editDom.newTaskButton()
}

const editTaskButton = (object) => {
  /*take this out if you wanna allow multiple edits at the same time */
  reloadDom()
  editDom.newTaskButton()

  let replacement = supplyElement.taskUi(),
      replaceThis = listDiv.querySelector(`[data-id="${object.id}"]`)


  replacement.inpDate.value = object.date
  replacement.inpTitle.value = object.title
  replacement.inpDescription.value = object.description
  replacement.priority = object.priority
  replacement.id = object.id
  editDom.taskUi(replaceThis, replacement)
}

const removeTaskButton = (element, id) => {
  element.remove()
  localStorage.removeItem(JSON.stringify(id))
}

const expandTaskButton = (element) => {
  let referenceDescription = element.children[1]
  referenceDescription.classList.toggle('hide')
}

const finishTaskButton = (element) => {
  let target = element.nextElementSibling
  target.classList.toggle('finished')
}




/***/ }),

/***/ "./src/supplyElement.js":
/*!******************************!*\
  !*** ./src/supplyElement.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newTaskButton": () => (/* binding */ newTaskButton),
/* harmony export */   "taskItem": () => (/* binding */ taskItem),
/* harmony export */   "taskUi": () => (/* binding */ taskUi)
/* harmony export */ });


const mainFunctions = __webpack_require__(/*! ./mainFunctions */ "./src/mainFunctions.js")

const newTaskButton = () => {
  let element = document.createElement('button')

  element.className = 'new-task'
  element.textContent = 'new task'

  return element
}


const taskUi = (title="", description="", date="", priority="", id) => {
  let element = document.createElement('div')
  element.innerHTML =
  `
<div class="top-row">
  <div id="add-title">
    <label for="title-input">Title</label>
    <input type="text" name="title" id="title-input" value="">
  </div>
  <div id="select-date">
    <label for="due-date">Date</label>
    <input type="date" name="due-date" id="due-date" value="">
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
  <textarea name="description" id="description"></textarea>
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
  element.className = 'task-ui'
  let inpTitle = element.children[0].children[0].children[1],
      inpDate = element.children[0].children[1].children[1],
      inpDescription = element.children[1].children[1],
      addButton = element.children[2].children[0],
      cancelButton = element.children[2].children[1]
      priority = ""
/*
  title = inpTitle.textContent
  date = inpDate.textContent
  description = inpDescription.textContent
*/

  return {
    element, inpTitle, inpDate, inpDescription, addButton, cancelButton, priority, id
  }

}


const expandTask = () => {
  let element = document.createElement('button')

  element.className = 'expand-task'
  element.textContent = 'expand task'

  return element
}

const removeTask = () => {
  let element = document.createElement('button')

  element.className = 'remove-task'
  element.textContent = 'remove task'

  return element
}

const editTask = () => {
  let element = document.createElement('button')

  element.className = 'edit-task'
  element.textContent = 'edit task'

  return element
}

const finishTask = () => {
  let element = document.createElement('button')

  element.className = 'finish-task'
  element.textContent = 'finish task'

  return element
}

const taskItem = (object) => {
  let element = document.createElement('div'),
      titleDiv = document.createElement('div'),
      dateDiv = document.createElement('div'),
      buttonDiv = document.createElement('div'),
      descriptionDiv = document.createElement('div'),
      taskMain = document.createElement('div')
  element.dataset.id = object.id
  element.className = 'task-item'
  titleDiv.className = 'title-div'
  dateDiv.className = 'date-div'
  descriptionDiv.className = 'hide description-div'
  buttonDiv.className = 'button-div'
  taskMain.className = 'task-main'

  titleDiv.textContent = object.title
  dateDiv.textContent = object.date
  descriptionDiv.textContent = object.description

  taskMain.appendChild(finishTask())
  taskMain.appendChild(titleDiv)
  taskMain.appendChild(dateDiv)
  taskMain.appendChild(buttonDiv)

  buttonDiv.appendChild(expandTask())
  buttonDiv.appendChild(editTask())
  buttonDiv.appendChild(removeTask())

  element.appendChild(taskMain)
  element.appendChild(descriptionDiv)

  let expand = buttonDiv.children[0],
      edit = buttonDiv.children[1],
      remove = buttonDiv.children[2],
      finish = taskMain.children[0]
  return {
    element,
    object,
    expand,
    edit,
    remove,
    finish

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
const editDom = __webpack_require__(/*! ./editDom */ "./src/editDom.js")
const mainFunctions = __webpack_require__(/*! ./mainFunctions */ "./src/mainFunctions.js")
mainFunctions.reloadDom()
editDom.newTaskButton()

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0JBQXNCLG1CQUFPLENBQUMsK0NBQWlCO0FBQy9DLHNCQUFzQixtQkFBTyxDQUFDLCtDQUFpQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hERCxzQkFBc0IsbUJBQU8sQ0FBQywrQ0FBaUI7QUFDL0MsZ0JBQWdCLG1CQUFPLENBQUMsbUNBQVc7QUFDbkM7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsVUFBVTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuRm1DO0FBQ3BDO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0NBQWlCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtDOzs7Ozs7O1VDOUpEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7O0FDTkEsZ0JBQWdCLG1CQUFPLENBQUMsbUNBQVc7QUFDbkMsc0JBQXNCLG1CQUFPLENBQUMsK0NBQWlCO0FBQy9DO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtdG8tZG8tbGlzdC8uL3NyYy9lZGl0RG9tLmpzIiwid2VicGFjazovL3RvcC10by1kby1saXN0Ly4vc3JjL21haW5GdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvLWRvLWxpc3QvLi9zcmMvc3VwcGx5RWxlbWVudC5qcyIsIndlYnBhY2s6Ly90b3AtdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b3AtdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9wLXRvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b3AtdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvcC10by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHN1cHBseUVsZW1lbnQgPSByZXF1aXJlKCcuL3N1cHBseUVsZW1lbnQnKVxyXG5jb25zdCBtYWluRnVuY3Rpb25zID0gcmVxdWlyZSgnLi9tYWluRnVuY3Rpb25zJylcclxuY29uc3QgbGlzdERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0JylcclxuXHJcblxyXG5cclxuY29uc3QgbmV3VGFza0J1dHRvbiA9ICgpID0+IHtcclxuICBsZXQgZWxlbWVudCA9IHN1cHBseUVsZW1lbnQubmV3VGFza0J1dHRvbigpXHJcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IG1haW5GdW5jdGlvbnMubmV3VGFza0J1dHRvbihlbGVtZW50KSlcclxuICBsaXN0RGl2LmFwcGVuZENoaWxkKGVsZW1lbnQpXHJcbn1cclxuXHJcbmNvbnN0IHRhc2tVaSA9IChyZXBsYWNlVGhpcywgdWkgPSBzdXBwbHlFbGVtZW50LnRhc2tVaSgpKSA9PiB7XHJcbiAgdWkuYWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gbWFpbkZ1bmN0aW9ucy5ncmVlbkJ1dHRvbih1aSkpXHJcbiAgLyp0YWtlIHRoaXMgb3V0IGlmIHlvdSB3YW5uYSBhbGxvdyBtdWx0aXBsZSB0YXNrIGVkaXRzIGF0IHRoZSBzYW1lIHRpbWUgKi9cclxuXHJcbiAgaWYgKHJlcGxhY2VUaGlzLmNsYXNzTmFtZSA9PT0gJ25ldy10YXNrJykge1xyXG4gICAgbWFpbkZ1bmN0aW9ucy5yZWxvYWREb20oKVxyXG4gICAgbGlzdERpdi5hcHBlbmRDaGlsZCh1aS5lbGVtZW50KVxyXG4gIH1cclxuXHJcbiAgcmVwbGFjZVRoaXMucmVwbGFjZVdpdGgodWkuZWxlbWVudClcclxufVxyXG5cclxuY29uc3QgdGFza0l0ZW0gPSAob2JqZWN0KSA9PiB7XHJcbiAgbGV0IHRhc2tJdGVtID0gc3VwcGx5RWxlbWVudC50YXNrSXRlbShvYmplY3QpXHJcblxyXG5cclxuICB0YXNrSXRlbS5maW5pc2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBtYWluRnVuY3Rpb25zLmZpbmlzaFRhc2tCdXR0b24odGFza0l0ZW0uZmluaXNoKVxyXG4gIH0pXHJcblxyXG4gIHRhc2tJdGVtLnJlbW92ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIG1haW5GdW5jdGlvbnMucmVtb3ZlVGFza0J1dHRvbih0YXNrSXRlbS5lbGVtZW50LCBvYmplY3QuaWQpXHJcbiAgfSlcclxuXHJcbiAgdGFza0l0ZW0uZWRpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuXHJcbiAgICBtYWluRnVuY3Rpb25zLmVkaXRUYXNrQnV0dG9uKG9iamVjdClcclxuICB9KVxyXG5cclxuICB0YXNrSXRlbS5leHBhbmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcblxyXG4gICAgbWFpbkZ1bmN0aW9ucy5leHBhbmRUYXNrQnV0dG9uKHRhc2tJdGVtLmVsZW1lbnQpXHJcblxyXG4gIH0pXHJcblxyXG5cclxuXHJcbiAgbGlzdERpdi5hcHBlbmRDaGlsZCh0YXNrSXRlbS5lbGVtZW50KVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gIG5ld1Rhc2tCdXR0b24sXHJcbiAgdGFza1VpLFxyXG4gIHRhc2tJdGVtXHJcbn1cclxuIiwiY29uc3Qgc3VwcGx5RWxlbWVudCA9IHJlcXVpcmUoJy4vc3VwcGx5RWxlbWVudCcpXHJcbmNvbnN0IGVkaXREb20gPSByZXF1aXJlKCcuL2VkaXREb20nKVxyXG5jb25zdCBsaXN0RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpc3QnKVxyXG5cclxuY29uc3QgYWRkVG9Kc29uID0gKFVJKSA9PiB7XHJcbiAgbGV0IG9iamVjdCA9IHt9LFxyXG4gICAgICBpdGVtSUQgPSArbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0lEJykgKyAxXHJcblxyXG4gIG9iamVjdC50aXRsZSA9IFVJLmlucFRpdGxlLnZhbHVlXHJcbiAgb2JqZWN0LmRlc2NyaXB0aW9uID0gVUkuaW5wRGVzY3JpcHRpb24udmFsdWVcclxuICBvYmplY3QuZGF0ZSA9IFVJLmlucERhdGUudmFsdWVcclxuICBvYmplY3QucHJpb3JpdHkgPSBVSS5wcmlvcml0eVxyXG4gIG9iamVjdC5pZCA9IFVJLmlkIHx8IGl0ZW1JRFxyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdJRCcsIGl0ZW1JRClcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShvYmplY3QuaWQsIEpTT04uc3RyaW5naWZ5KG9iamVjdCkpXHJcbn1cclxuXHJcbmNvbnN0IHJlbG9hZERvbSA9ICgpID0+IHtcclxuICBsaXN0RGl2LmlubmVySFRNTCA9IFwiXCJcclxuICBsZXQgc3RvcmFnZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobG9jYWxTdG9yYWdlKSlcclxuICBmb3IgKGxldCBrZXkgaW4gc3RvcmFnZSkge1xyXG4gICAgaWYoa2V5ID09PSBcIklEXCIpIHtjb250aW51ZX1cclxuICAgIGxldCBvYmogPSBKU09OLnBhcnNlKHN0b3JhZ2Vba2V5XSlcclxuICAgIGVkaXREb20udGFza0l0ZW0ob2JqKVxyXG5cclxuICB9XHJcblxyXG59XHJcblxyXG5jb25zdCBuZXdUYXNrQnV0dG9uID0gKGJ1dHRvbikgPT4ge1xyXG4gIGVkaXREb20udGFza1VpKGJ1dHRvbilcclxufVxyXG5cclxuY29uc3QgZ3JlZW5CdXR0b24gPSAoVUkpID0+IHtcclxuICBpZiAoIShVSS5pbnBUaXRsZS52YWx1ZSAmJiBVSS5pbnBEYXRlLnZhbHVlICYmIFVJLmlucERlc2NyaXB0aW9uLnZhbHVlKSkge1xyXG4gICAgYWxlcnQoJ1BsZWFzZSBmaWxsIGluIGFsbCBmaWVsZHMnKVxyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBhZGRUb0pzb24oVUkpLFxyXG4gIHJlbG9hZERvbSgpLFxyXG4gIGVkaXREb20ubmV3VGFza0J1dHRvbigpXHJcbn1cclxuXHJcbmNvbnN0IGVkaXRUYXNrQnV0dG9uID0gKG9iamVjdCkgPT4ge1xyXG4gIC8qdGFrZSB0aGlzIG91dCBpZiB5b3Ugd2FubmEgYWxsb3cgbXVsdGlwbGUgZWRpdHMgYXQgdGhlIHNhbWUgdGltZSAqL1xyXG4gIHJlbG9hZERvbSgpXHJcbiAgZWRpdERvbS5uZXdUYXNrQnV0dG9uKClcclxuXHJcbiAgbGV0IHJlcGxhY2VtZW50ID0gc3VwcGx5RWxlbWVudC50YXNrVWkoKSxcclxuICAgICAgcmVwbGFjZVRoaXMgPSBsaXN0RGl2LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWlkPVwiJHtvYmplY3QuaWR9XCJdYClcclxuXHJcblxyXG4gIHJlcGxhY2VtZW50LmlucERhdGUudmFsdWUgPSBvYmplY3QuZGF0ZVxyXG4gIHJlcGxhY2VtZW50LmlucFRpdGxlLnZhbHVlID0gb2JqZWN0LnRpdGxlXHJcbiAgcmVwbGFjZW1lbnQuaW5wRGVzY3JpcHRpb24udmFsdWUgPSBvYmplY3QuZGVzY3JpcHRpb25cclxuICByZXBsYWNlbWVudC5wcmlvcml0eSA9IG9iamVjdC5wcmlvcml0eVxyXG4gIHJlcGxhY2VtZW50LmlkID0gb2JqZWN0LmlkXHJcbiAgZWRpdERvbS50YXNrVWkocmVwbGFjZVRoaXMsIHJlcGxhY2VtZW50KVxyXG59XHJcblxyXG5jb25zdCByZW1vdmVUYXNrQnV0dG9uID0gKGVsZW1lbnQsIGlkKSA9PiB7XHJcbiAgZWxlbWVudC5yZW1vdmUoKVxyXG4gIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKEpTT04uc3RyaW5naWZ5KGlkKSlcclxufVxyXG5cclxuY29uc3QgZXhwYW5kVGFza0J1dHRvbiA9IChlbGVtZW50KSA9PiB7XHJcbiAgbGV0IHJlZmVyZW5jZURlc2NyaXB0aW9uID0gZWxlbWVudC5jaGlsZHJlblsxXVxyXG4gIHJlZmVyZW5jZURlc2NyaXB0aW9uLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKVxyXG59XHJcblxyXG5jb25zdCBmaW5pc2hUYXNrQnV0dG9uID0gKGVsZW1lbnQpID0+IHtcclxuICBsZXQgdGFyZ2V0ID0gZWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmdcclxuICB0YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnZmluaXNoZWQnKVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gIG5ld1Rhc2tCdXR0b24sXHJcbiAgZ3JlZW5CdXR0b24sXHJcbiAgcmVtb3ZlVGFza0J1dHRvbixcclxuICBlZGl0VGFza0J1dHRvbixcclxuICBleHBhbmRUYXNrQnV0dG9uLFxyXG4gIGZpbmlzaFRhc2tCdXR0b24sXHJcbiAgcmVsb2FkRG9tXHJcbn1cclxuIiwiaW1wb3J0IHsgZWwgfSBmcm9tICdkYXRlLWZucy9sb2NhbGUnXHJcblxyXG5jb25zdCBtYWluRnVuY3Rpb25zID0gcmVxdWlyZSgnLi9tYWluRnVuY3Rpb25zJylcclxuXHJcbmNvbnN0IG5ld1Rhc2tCdXR0b24gPSAoKSA9PiB7XHJcbiAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxyXG5cclxuICBlbGVtZW50LmNsYXNzTmFtZSA9ICduZXctdGFzaydcclxuICBlbGVtZW50LnRleHRDb250ZW50ID0gJ25ldyB0YXNrJ1xyXG5cclxuICByZXR1cm4gZWxlbWVudFxyXG59XHJcblxyXG5cclxuY29uc3QgdGFza1VpID0gKHRpdGxlPVwiXCIsIGRlc2NyaXB0aW9uPVwiXCIsIGRhdGU9XCJcIiwgcHJpb3JpdHk9XCJcIiwgaWQpID0+IHtcclxuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgZWxlbWVudC5pbm5lckhUTUwgPVxyXG4gIGBcclxuPGRpdiBjbGFzcz1cInRvcC1yb3dcIj5cclxuICA8ZGl2IGlkPVwiYWRkLXRpdGxlXCI+XHJcbiAgICA8bGFiZWwgZm9yPVwidGl0bGUtaW5wdXRcIj5UaXRsZTwvbGFiZWw+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidGl0bGVcIiBpZD1cInRpdGxlLWlucHV0XCIgdmFsdWU9XCJcIj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGlkPVwic2VsZWN0LWRhdGVcIj5cclxuICAgIDxsYWJlbCBmb3I9XCJkdWUtZGF0ZVwiPkRhdGU8L2xhYmVsPlxyXG4gICAgPGlucHV0IHR5cGU9XCJkYXRlXCIgbmFtZT1cImR1ZS1kYXRlXCIgaWQ9XCJkdWUtZGF0ZVwiIHZhbHVlPVwiXCI+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBpZD1cInNlbGVjdC1wcmlvXCI+XHJcbiAgICA8ZGl2PlByaW9yaXR5PC9kaXY+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwibG93XCI+PC9idXR0b24+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwibWVkaXVtXCI+PC9idXR0b24+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwiaGlnaFwiPjwvYnV0dG9uPlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuPGRpdiBpZD1cImFkZC1kZXNjcmlwdGlvblwiPlxyXG4gIDxsYWJlbCBmb3I9XCJkZXNjcmlwdGlvblwiPkRlc2NyaXB0aW9uPC9sYWJlbD5cclxuICA8dGV4dGFyZWEgbmFtZT1cImRlc2NyaXB0aW9uXCIgaWQ9XCJkZXNjcmlwdGlvblwiPjwvdGV4dGFyZWE+XHJcbjwvZGl2PlxyXG48ZGl2IGNsYXNzPVwiYnV0dG9uXCI+XHJcbiAgPGJ1dHRvbiBpZD1cImFkZFwiPlxyXG4gICAgICA8c3ZnIHN0eWxlPVwid2lkdGg6MjRweDtoZWlnaHQ6MjRweFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMjEsN0w5LDE5TDMuNSwxMy41TDQuOTEsMTIuMDlMOSwxNi4xN0wxOS41OSw1LjU5TDIxLDdaXCIgLz5cclxuICAgICAgPC9zdmc+XHJcbiAgPC9idXR0b24+XHJcbiAgPGJ1dHRvbiBpZD1cImNhbmNlbFwiPlxyXG4gICAgICA8c3ZnIHN0eWxlPVwid2lkdGg6MjRweDtoZWlnaHQ6MjRweFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTksNi40MUwxNy41OSw1TDEyLDEwLjU5TDYuNDEsNUw1LDYuNDFMMTAuNTksMTJMNSwxNy41OUw2LjQxLDE5TDEyLDEzLjQxTDE3LjU5LDE5TDE5LDE3LjU5TDEzLjQxLDEyTDE5LDYuNDFaXCIgLz5cclxuICAgICAgPC9zdmc+XHJcbiAgPC9idXR0b24+XHJcbjwvZGl2PlxyXG5cclxuICBgXHJcbiAgZWxlbWVudC5jbGFzc05hbWUgPSAndGFzay11aSdcclxuICBsZXQgaW5wVGl0bGUgPSBlbGVtZW50LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLFxyXG4gICAgICBpbnBEYXRlID0gZWxlbWVudC5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5jaGlsZHJlblsxXSxcclxuICAgICAgaW5wRGVzY3JpcHRpb24gPSBlbGVtZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuWzFdLFxyXG4gICAgICBhZGRCdXR0b24gPSBlbGVtZW50LmNoaWxkcmVuWzJdLmNoaWxkcmVuWzBdLFxyXG4gICAgICBjYW5jZWxCdXR0b24gPSBlbGVtZW50LmNoaWxkcmVuWzJdLmNoaWxkcmVuWzFdXHJcbiAgICAgIHByaW9yaXR5ID0gXCJcIlxyXG4vKlxyXG4gIHRpdGxlID0gaW5wVGl0bGUudGV4dENvbnRlbnRcclxuICBkYXRlID0gaW5wRGF0ZS50ZXh0Q29udGVudFxyXG4gIGRlc2NyaXB0aW9uID0gaW5wRGVzY3JpcHRpb24udGV4dENvbnRlbnRcclxuKi9cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGVsZW1lbnQsIGlucFRpdGxlLCBpbnBEYXRlLCBpbnBEZXNjcmlwdGlvbiwgYWRkQnV0dG9uLCBjYW5jZWxCdXR0b24sIHByaW9yaXR5LCBpZFxyXG4gIH1cclxuXHJcbn1cclxuXHJcblxyXG5jb25zdCBleHBhbmRUYXNrID0gKCkgPT4ge1xyXG4gIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcclxuXHJcbiAgZWxlbWVudC5jbGFzc05hbWUgPSAnZXhwYW5kLXRhc2snXHJcbiAgZWxlbWVudC50ZXh0Q29udGVudCA9ICdleHBhbmQgdGFzaydcclxuXHJcbiAgcmV0dXJuIGVsZW1lbnRcclxufVxyXG5cclxuY29uc3QgcmVtb3ZlVGFzayA9ICgpID0+IHtcclxuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXHJcblxyXG4gIGVsZW1lbnQuY2xhc3NOYW1lID0gJ3JlbW92ZS10YXNrJ1xyXG4gIGVsZW1lbnQudGV4dENvbnRlbnQgPSAncmVtb3ZlIHRhc2snXHJcblxyXG4gIHJldHVybiBlbGVtZW50XHJcbn1cclxuXHJcbmNvbnN0IGVkaXRUYXNrID0gKCkgPT4ge1xyXG4gIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcclxuXHJcbiAgZWxlbWVudC5jbGFzc05hbWUgPSAnZWRpdC10YXNrJ1xyXG4gIGVsZW1lbnQudGV4dENvbnRlbnQgPSAnZWRpdCB0YXNrJ1xyXG5cclxuICByZXR1cm4gZWxlbWVudFxyXG59XHJcblxyXG5jb25zdCBmaW5pc2hUYXNrID0gKCkgPT4ge1xyXG4gIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcclxuXHJcbiAgZWxlbWVudC5jbGFzc05hbWUgPSAnZmluaXNoLXRhc2snXHJcbiAgZWxlbWVudC50ZXh0Q29udGVudCA9ICdmaW5pc2ggdGFzaydcclxuXHJcbiAgcmV0dXJuIGVsZW1lbnRcclxufVxyXG5cclxuY29uc3QgdGFza0l0ZW0gPSAob2JqZWN0KSA9PiB7XHJcbiAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgdGl0bGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgZGF0ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICBidXR0b25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgZGVzY3JpcHRpb25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgdGFza01haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gIGVsZW1lbnQuZGF0YXNldC5pZCA9IG9iamVjdC5pZFxyXG4gIGVsZW1lbnQuY2xhc3NOYW1lID0gJ3Rhc2staXRlbSdcclxuICB0aXRsZURpdi5jbGFzc05hbWUgPSAndGl0bGUtZGl2J1xyXG4gIGRhdGVEaXYuY2xhc3NOYW1lID0gJ2RhdGUtZGl2J1xyXG4gIGRlc2NyaXB0aW9uRGl2LmNsYXNzTmFtZSA9ICdoaWRlIGRlc2NyaXB0aW9uLWRpdidcclxuICBidXR0b25EaXYuY2xhc3NOYW1lID0gJ2J1dHRvbi1kaXYnXHJcbiAgdGFza01haW4uY2xhc3NOYW1lID0gJ3Rhc2stbWFpbidcclxuXHJcbiAgdGl0bGVEaXYudGV4dENvbnRlbnQgPSBvYmplY3QudGl0bGVcclxuICBkYXRlRGl2LnRleHRDb250ZW50ID0gb2JqZWN0LmRhdGVcclxuICBkZXNjcmlwdGlvbkRpdi50ZXh0Q29udGVudCA9IG9iamVjdC5kZXNjcmlwdGlvblxyXG5cclxuICB0YXNrTWFpbi5hcHBlbmRDaGlsZChmaW5pc2hUYXNrKCkpXHJcbiAgdGFza01haW4uYXBwZW5kQ2hpbGQodGl0bGVEaXYpXHJcbiAgdGFza01haW4uYXBwZW5kQ2hpbGQoZGF0ZURpdilcclxuICB0YXNrTWFpbi5hcHBlbmRDaGlsZChidXR0b25EaXYpXHJcblxyXG4gIGJ1dHRvbkRpdi5hcHBlbmRDaGlsZChleHBhbmRUYXNrKCkpXHJcbiAgYnV0dG9uRGl2LmFwcGVuZENoaWxkKGVkaXRUYXNrKCkpXHJcbiAgYnV0dG9uRGl2LmFwcGVuZENoaWxkKHJlbW92ZVRhc2soKSlcclxuXHJcbiAgZWxlbWVudC5hcHBlbmRDaGlsZCh0YXNrTWFpbilcclxuICBlbGVtZW50LmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uRGl2KVxyXG5cclxuICBsZXQgZXhwYW5kID0gYnV0dG9uRGl2LmNoaWxkcmVuWzBdLFxyXG4gICAgICBlZGl0ID0gYnV0dG9uRGl2LmNoaWxkcmVuWzFdLFxyXG4gICAgICByZW1vdmUgPSBidXR0b25EaXYuY2hpbGRyZW5bMl0sXHJcbiAgICAgIGZpbmlzaCA9IHRhc2tNYWluLmNoaWxkcmVuWzBdXHJcbiAgcmV0dXJuIHtcclxuICAgIGVsZW1lbnQsXHJcbiAgICBvYmplY3QsXHJcbiAgICBleHBhbmQsXHJcbiAgICBlZGl0LFxyXG4gICAgcmVtb3ZlLFxyXG4gICAgZmluaXNoXHJcblxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICBuZXdUYXNrQnV0dG9uLFxyXG4gIHRhc2tVaSxcclxuICB0YXNrSXRlbVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc3QgZWRpdERvbSA9IHJlcXVpcmUoJy4vZWRpdERvbScpXHJcbmNvbnN0IG1haW5GdW5jdGlvbnMgPSByZXF1aXJlKCcuL21haW5GdW5jdGlvbnMnKVxyXG5tYWluRnVuY3Rpb25zLnJlbG9hZERvbSgpXHJcbmVkaXREb20ubmV3VGFza0J1dHRvbigpXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==