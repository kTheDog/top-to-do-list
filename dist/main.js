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



const newTaskButton = (title="", description="", date="", priority="") => {
  let element = supplyElement.newTaskButton()
  element.addEventListener('click', () => mainFunctions.newTaskButton(element))
  listDiv.appendChild(element)
}

const taskUi = (replaceThis, ui = supplyElement.taskUi()) => {

  ui.addButton.addEventListener('click', () => mainFunctions.greenButton(ui))
  replaceThis.replaceWith(ui.element)
}

const taskItem = (object) => {
  let taskItem = supplyElement.taskItem(object)

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
  console.log(object.id)

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
  addToJson(UI),
  reloadDom(),
  editDom.newTaskButton()
}

const editTaskButton = (object) => {

  let replacement = supplyElement.taskUi(),
      replaceThis = listDiv.querySelector(`[data-id="${object.id}"]`)


  replacement.inpDate.value = object.date
  replacement.inpTitle.value = object.title
  replacement.inpDescription.value = object.description
  replacement.priority = object.priority
  replacement.id = object.id
  console.log(replaceThis)
  editDom.taskUi(replaceThis, replacement)
}

const removeTaskButton = (element, id) => {
  element.remove()
  localStorage.removeItem(JSON.stringify(id))
}

const expandTaskButton = (element) => {
  let referenceDescription = element.children[1]
  referenceDescription.classlist.toggle('hide')
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
  element.className = 'task-item'
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

const taskItem = (object) => {
  let element = document.createElement('div'),
      titleDiv = document.createElement('div'),
      dateDiv = document.createElement('div'),
      buttonDiv = document.createElement('div'),
      descriptionDiv = document.createElement('div'),
      taskMain = document.createElement('div');

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
      remove = buttonDiv.children[2]

  return {
    element,
    object,
    expand,
    edit,
    remove

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGdCQUFnQixtQkFBTyxDQUFDLG1DQUFXO0FBQ25DLHNCQUFzQixtQkFBTyxDQUFDLCtDQUFpQjtBQUMvQztBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9wLXRvLWRvLWxpc3QvLi9zcmMvZWRpdERvbS5qcyIsIndlYnBhY2s6Ly90b3AtdG8tZG8tbGlzdC8uL3NyYy9tYWluRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3RvcC10by1kby1saXN0Ly4vc3JjL3N1cHBseUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9wLXRvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvcC10by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9wLXRvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b3AtdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzdXBwbHlFbGVtZW50ID0gcmVxdWlyZSgnLi9zdXBwbHlFbGVtZW50JylcclxuY29uc3QgbWFpbkZ1bmN0aW9ucyA9IHJlcXVpcmUoJy4vbWFpbkZ1bmN0aW9ucycpXHJcbmNvbnN0IGxpc3REaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlzdCcpXHJcblxyXG5cclxuXHJcbmNvbnN0IG5ld1Rhc2tCdXR0b24gPSAodGl0bGU9XCJcIiwgZGVzY3JpcHRpb249XCJcIiwgZGF0ZT1cIlwiLCBwcmlvcml0eT1cIlwiKSA9PiB7XHJcbiAgbGV0IGVsZW1lbnQgPSBzdXBwbHlFbGVtZW50Lm5ld1Rhc2tCdXR0b24oKVxyXG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBtYWluRnVuY3Rpb25zLm5ld1Rhc2tCdXR0b24oZWxlbWVudCkpXHJcbiAgbGlzdERpdi5hcHBlbmRDaGlsZChlbGVtZW50KVxyXG59XHJcblxyXG5jb25zdCB0YXNrVWkgPSAocmVwbGFjZVRoaXMsIHVpID0gc3VwcGx5RWxlbWVudC50YXNrVWkoKSkgPT4ge1xyXG5cclxuICB1aS5hZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBtYWluRnVuY3Rpb25zLmdyZWVuQnV0dG9uKHVpKSlcclxuICByZXBsYWNlVGhpcy5yZXBsYWNlV2l0aCh1aS5lbGVtZW50KVxyXG59XHJcblxyXG5jb25zdCB0YXNrSXRlbSA9IChvYmplY3QpID0+IHtcclxuICBsZXQgdGFza0l0ZW0gPSBzdXBwbHlFbGVtZW50LnRhc2tJdGVtKG9iamVjdClcclxuXHJcbiAgdGFza0l0ZW0ucmVtb3ZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgbWFpbkZ1bmN0aW9ucy5yZW1vdmVUYXNrQnV0dG9uKHRhc2tJdGVtLmVsZW1lbnQsIG9iamVjdC5pZClcclxuICB9KVxyXG5cclxuICB0YXNrSXRlbS5lZGl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cclxuICAgIG1haW5GdW5jdGlvbnMuZWRpdFRhc2tCdXR0b24ob2JqZWN0KVxyXG4gIH0pXHJcblxyXG4gIHRhc2tJdGVtLmV4cGFuZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuXHJcbiAgICBtYWluRnVuY3Rpb25zLmV4cGFuZFRhc2tCdXR0b24odGFza0l0ZW0uZWxlbWVudClcclxuXHJcbiAgfSlcclxuXHJcbiAgbGlzdERpdi5hcHBlbmRDaGlsZCh0YXNrSXRlbS5lbGVtZW50KVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gIG5ld1Rhc2tCdXR0b24sXHJcbiAgdGFza1VpLFxyXG4gIHRhc2tJdGVtXHJcbn1cclxuIiwiY29uc3Qgc3VwcGx5RWxlbWVudCA9IHJlcXVpcmUoJy4vc3VwcGx5RWxlbWVudCcpXHJcbmNvbnN0IGVkaXREb20gPSByZXF1aXJlKCcuL2VkaXREb20nKVxyXG5jb25zdCBsaXN0RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpc3QnKVxyXG5cclxuY29uc3QgYWRkVG9Kc29uID0gKFVJKSA9PiB7XHJcbiAgbGV0IG9iamVjdCA9IHt9LFxyXG4gICAgICBpdGVtSUQgPSArbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0lEJykgKyAxXHJcblxyXG4gIG9iamVjdC50aXRsZSA9IFVJLmlucFRpdGxlLnZhbHVlXHJcbiAgb2JqZWN0LmRlc2NyaXB0aW9uID0gVUkuaW5wRGVzY3JpcHRpb24udmFsdWVcclxuICBvYmplY3QuZGF0ZSA9IFVJLmlucERhdGUudmFsdWVcclxuICBvYmplY3QucHJpb3JpdHkgPSBVSS5wcmlvcml0eVxyXG4gIGNvbnNvbGUubG9nKG9iamVjdC5pZClcclxuXHJcbiAgb2JqZWN0LmlkID0gVUkuaWQgfHwgaXRlbUlEXHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0lEJywgaXRlbUlEKVxyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG9iamVjdC5pZCwgSlNPTi5zdHJpbmdpZnkob2JqZWN0KSlcclxufVxyXG5cclxuY29uc3QgcmVsb2FkRG9tID0gKCkgPT4ge1xyXG4gIGxpc3REaXYuaW5uZXJIVE1MID0gXCJcIlxyXG4gIGxldCBzdG9yYWdlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShsb2NhbFN0b3JhZ2UpKVxyXG4gIGZvciAobGV0IGtleSBpbiBzdG9yYWdlKSB7XHJcbiAgICBpZihrZXkgPT09IFwiSURcIikge2NvbnRpbnVlfVxyXG4gICAgbGV0IG9iaiA9IEpTT04ucGFyc2Uoc3RvcmFnZVtrZXldKVxyXG4gICAgZWRpdERvbS50YXNrSXRlbShvYmopXHJcblxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmNvbnN0IG5ld1Rhc2tCdXR0b24gPSAoYnV0dG9uKSA9PiB7XHJcbiAgZWRpdERvbS50YXNrVWkoYnV0dG9uKVxyXG59XHJcblxyXG5jb25zdCBncmVlbkJ1dHRvbiA9IChVSSkgPT4ge1xyXG4gIGFkZFRvSnNvbihVSSksXHJcbiAgcmVsb2FkRG9tKCksXHJcbiAgZWRpdERvbS5uZXdUYXNrQnV0dG9uKClcclxufVxyXG5cclxuY29uc3QgZWRpdFRhc2tCdXR0b24gPSAob2JqZWN0KSA9PiB7XHJcblxyXG4gIGxldCByZXBsYWNlbWVudCA9IHN1cHBseUVsZW1lbnQudGFza1VpKCksXHJcbiAgICAgIHJlcGxhY2VUaGlzID0gbGlzdERpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pZD1cIiR7b2JqZWN0LmlkfVwiXWApXHJcblxyXG5cclxuICByZXBsYWNlbWVudC5pbnBEYXRlLnZhbHVlID0gb2JqZWN0LmRhdGVcclxuICByZXBsYWNlbWVudC5pbnBUaXRsZS52YWx1ZSA9IG9iamVjdC50aXRsZVxyXG4gIHJlcGxhY2VtZW50LmlucERlc2NyaXB0aW9uLnZhbHVlID0gb2JqZWN0LmRlc2NyaXB0aW9uXHJcbiAgcmVwbGFjZW1lbnQucHJpb3JpdHkgPSBvYmplY3QucHJpb3JpdHlcclxuICByZXBsYWNlbWVudC5pZCA9IG9iamVjdC5pZFxyXG4gIGNvbnNvbGUubG9nKHJlcGxhY2VUaGlzKVxyXG4gIGVkaXREb20udGFza1VpKHJlcGxhY2VUaGlzLCByZXBsYWNlbWVudClcclxufVxyXG5cclxuY29uc3QgcmVtb3ZlVGFza0J1dHRvbiA9IChlbGVtZW50LCBpZCkgPT4ge1xyXG4gIGVsZW1lbnQucmVtb3ZlKClcclxuICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShKU09OLnN0cmluZ2lmeShpZCkpXHJcbn1cclxuXHJcbmNvbnN0IGV4cGFuZFRhc2tCdXR0b24gPSAoZWxlbWVudCkgPT4ge1xyXG4gIGxldCByZWZlcmVuY2VEZXNjcmlwdGlvbiA9IGVsZW1lbnQuY2hpbGRyZW5bMV1cclxuICByZWZlcmVuY2VEZXNjcmlwdGlvbi5jbGFzc2xpc3QudG9nZ2xlKCdoaWRlJylcclxufVxyXG5cclxuZXhwb3J0IHtcclxuICBuZXdUYXNrQnV0dG9uLFxyXG4gIGdyZWVuQnV0dG9uLFxyXG4gIHJlbW92ZVRhc2tCdXR0b24sXHJcbiAgZWRpdFRhc2tCdXR0b24sXHJcbiAgZXhwYW5kVGFza0J1dHRvbixcclxuICByZWxvYWREb21cclxufVxyXG4iLCJcclxuY29uc3QgbWFpbkZ1bmN0aW9ucyA9IHJlcXVpcmUoJy4vbWFpbkZ1bmN0aW9ucycpXHJcblxyXG5jb25zdCBuZXdUYXNrQnV0dG9uID0gKCkgPT4ge1xyXG4gIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcclxuXHJcbiAgZWxlbWVudC50ZXh0Q29udGVudCA9ICduZXcgdGFzaydcclxuXHJcbiAgcmV0dXJuIGVsZW1lbnRcclxufVxyXG5cclxuXHJcbmNvbnN0IHRhc2tVaSA9ICh0aXRsZT1cIlwiLCBkZXNjcmlwdGlvbj1cIlwiLCBkYXRlPVwiXCIsIHByaW9yaXR5PVwiXCIsIGlkKSA9PiB7XHJcbiAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gIGVsZW1lbnQuaW5uZXJIVE1MID1cclxuICBgXHJcbjxkaXYgY2xhc3M9XCJ0b3Atcm93XCI+XHJcbiAgPGRpdiBpZD1cImFkZC10aXRsZVwiPlxyXG4gICAgPGxhYmVsIGZvcj1cInRpdGxlLWlucHV0XCI+VGl0bGU8L2xhYmVsPlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRpdGxlXCIgaWQ9XCJ0aXRsZS1pbnB1dFwiIHZhbHVlPVwiXCI+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBpZD1cInNlbGVjdC1kYXRlXCI+XHJcbiAgICA8bGFiZWwgZm9yPVwiZHVlLWRhdGVcIj5EYXRlPC9sYWJlbD5cclxuICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIG5hbWU9XCJkdWUtZGF0ZVwiIGlkPVwiZHVlLWRhdGVcIiB2YWx1ZT1cIlwiPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgaWQ9XCJzZWxlY3QtcHJpb1wiPlxyXG4gICAgPGRpdj5Qcmlvcml0eTwvZGl2PlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImxvd1wiPjwvYnV0dG9uPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cIm1lZGl1bVwiPjwvYnV0dG9uPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImhpZ2hcIj48L2J1dHRvbj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbjxkaXYgaWQ9XCJhZGQtZGVzY3JpcHRpb25cIj5cclxuICA8bGFiZWwgZm9yPVwiZGVzY3JpcHRpb25cIj5EZXNjcmlwdGlvbjwvbGFiZWw+XHJcbiAgPHRleHRhcmVhIG5hbWU9XCJkZXNjcmlwdGlvblwiIGlkPVwiZGVzY3JpcHRpb25cIj48L3RleHRhcmVhPlxyXG48L2Rpdj5cclxuPGRpdiBjbGFzcz1cImJ1dHRvblwiPlxyXG4gIDxidXR0b24gaWQ9XCJhZGRcIj5cclxuICAgICAgPHN2ZyBzdHlsZT1cIndpZHRoOjI0cHg7aGVpZ2h0OjI0cHhcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTIxLDdMOSwxOUwzLjUsMTMuNUw0LjkxLDEyLjA5TDksMTYuMTdMMTkuNTksNS41OUwyMSw3WlwiIC8+XHJcbiAgICAgIDwvc3ZnPlxyXG4gIDwvYnV0dG9uPlxyXG4gIDxidXR0b24gaWQ9XCJjYW5jZWxcIj5cclxuICAgICAgPHN2ZyBzdHlsZT1cIndpZHRoOjI0cHg7aGVpZ2h0OjI0cHhcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTE5LDYuNDFMMTcuNTksNUwxMiwxMC41OUw2LjQxLDVMNSw2LjQxTDEwLjU5LDEyTDUsMTcuNTlMNi40MSwxOUwxMiwxMy40MUwxNy41OSwxOUwxOSwxNy41OUwxMy40MSwxMkwxOSw2LjQxWlwiIC8+XHJcbiAgICAgIDwvc3ZnPlxyXG4gIDwvYnV0dG9uPlxyXG48L2Rpdj5cclxuXHJcbiAgYFxyXG4gIGVsZW1lbnQuY2xhc3NOYW1lID0gJ3Rhc2staXRlbSdcclxuICBsZXQgaW5wVGl0bGUgPSBlbGVtZW50LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLFxyXG4gICAgICBpbnBEYXRlID0gZWxlbWVudC5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5jaGlsZHJlblsxXSxcclxuICAgICAgaW5wRGVzY3JpcHRpb24gPSBlbGVtZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuWzFdLFxyXG4gICAgICBhZGRCdXR0b24gPSBlbGVtZW50LmNoaWxkcmVuWzJdLmNoaWxkcmVuWzBdLFxyXG4gICAgICBjYW5jZWxCdXR0b24gPSBlbGVtZW50LmNoaWxkcmVuWzJdLmNoaWxkcmVuWzFdXHJcbiAgICAgIHByaW9yaXR5ID0gXCJcIlxyXG4vKlxyXG4gIHRpdGxlID0gaW5wVGl0bGUudGV4dENvbnRlbnRcclxuICBkYXRlID0gaW5wRGF0ZS50ZXh0Q29udGVudFxyXG4gIGRlc2NyaXB0aW9uID0gaW5wRGVzY3JpcHRpb24udGV4dENvbnRlbnRcclxuKi9cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGVsZW1lbnQsIGlucFRpdGxlLCBpbnBEYXRlLCBpbnBEZXNjcmlwdGlvbiwgYWRkQnV0dG9uLCBjYW5jZWxCdXR0b24sIHByaW9yaXR5LCBpZFxyXG4gIH1cclxuXHJcbn1cclxuXHJcblxyXG5jb25zdCBleHBhbmRUYXNrID0gKCkgPT4ge1xyXG4gIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcclxuXHJcbiAgZWxlbWVudC5jbGFzc05hbWUgPSAnZXhwYW5kLXRhc2snXHJcbiAgZWxlbWVudC50ZXh0Q29udGVudCA9ICdleHBhbmQgdGFzaydcclxuXHJcbiAgcmV0dXJuIGVsZW1lbnRcclxufVxyXG5cclxuY29uc3QgcmVtb3ZlVGFzayA9ICgpID0+IHtcclxuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXHJcblxyXG4gIGVsZW1lbnQuY2xhc3NOYW1lID0gJ3JlbW92ZS10YXNrJ1xyXG4gIGVsZW1lbnQudGV4dENvbnRlbnQgPSAncmVtb3ZlIHRhc2snXHJcblxyXG4gIHJldHVybiBlbGVtZW50XHJcbn1cclxuXHJcbmNvbnN0IGVkaXRUYXNrID0gKCkgPT4ge1xyXG4gIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcclxuXHJcbiAgZWxlbWVudC5jbGFzc05hbWUgPSAnZWRpdC10YXNrJ1xyXG4gIGVsZW1lbnQudGV4dENvbnRlbnQgPSAnZWRpdCB0YXNrJ1xyXG5cclxuICByZXR1cm4gZWxlbWVudFxyXG59XHJcblxyXG5jb25zdCB0YXNrSXRlbSA9IChvYmplY3QpID0+IHtcclxuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICB0aXRsZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICBkYXRlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgIGJ1dHRvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICBkZXNjcmlwdGlvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICB0YXNrTWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICBlbGVtZW50LmRhdGFzZXQuaWQgPSBvYmplY3QuaWRcclxuICBlbGVtZW50LmNsYXNzTmFtZSA9ICd0YXNrLWl0ZW0nXHJcbiAgdGl0bGVEaXYuY2xhc3NOYW1lID0gJ3RpdGxlLWRpdidcclxuICBkYXRlRGl2LmNsYXNzTmFtZSA9ICdkYXRlLWRpdidcclxuICBkZXNjcmlwdGlvbkRpdi5jbGFzc05hbWUgPSAnaGlkZSBkZXNjcmlwdGlvbi1kaXYnXHJcbiAgYnV0dG9uRGl2LmNsYXNzTmFtZSA9ICdidXR0b24tZGl2J1xyXG4gIHRhc2tNYWluLmNsYXNzTmFtZSA9ICd0YXNrLW1haW4nXHJcblxyXG4gIHRpdGxlRGl2LnRleHRDb250ZW50ID0gb2JqZWN0LnRpdGxlXHJcbiAgZGF0ZURpdi50ZXh0Q29udGVudCA9IG9iamVjdC5kYXRlXHJcbiAgZGVzY3JpcHRpb25EaXYudGV4dENvbnRlbnQgPSBvYmplY3QuZGVzY3JpcHRpb25cclxuXHJcbiAgdGFza01haW4uYXBwZW5kQ2hpbGQodGl0bGVEaXYpXHJcbiAgdGFza01haW4uYXBwZW5kQ2hpbGQoZGF0ZURpdilcclxuICB0YXNrTWFpbi5hcHBlbmRDaGlsZChidXR0b25EaXYpXHJcblxyXG4gIGJ1dHRvbkRpdi5hcHBlbmRDaGlsZChleHBhbmRUYXNrKCkpXHJcbiAgYnV0dG9uRGl2LmFwcGVuZENoaWxkKGVkaXRUYXNrKCkpXHJcbiAgYnV0dG9uRGl2LmFwcGVuZENoaWxkKHJlbW92ZVRhc2soKSlcclxuXHJcblxyXG4gIGVsZW1lbnQuYXBwZW5kQ2hpbGQodGFza01haW4pXHJcbiAgZWxlbWVudC5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbkRpdilcclxuXHJcbiAgbGV0IGV4cGFuZCA9IGJ1dHRvbkRpdi5jaGlsZHJlblswXSxcclxuICAgICAgZWRpdCA9IGJ1dHRvbkRpdi5jaGlsZHJlblsxXSxcclxuICAgICAgcmVtb3ZlID0gYnV0dG9uRGl2LmNoaWxkcmVuWzJdXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBlbGVtZW50LFxyXG4gICAgb2JqZWN0LFxyXG4gICAgZXhwYW5kLFxyXG4gICAgZWRpdCxcclxuICAgIHJlbW92ZVxyXG5cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgbmV3VGFza0J1dHRvbixcclxuICB0YXNrVWksXHJcbiAgdGFza0l0ZW1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnN0IGVkaXREb20gPSByZXF1aXJlKCcuL2VkaXREb20nKVxyXG5jb25zdCBtYWluRnVuY3Rpb25zID0gcmVxdWlyZSgnLi9tYWluRnVuY3Rpb25zJylcclxubWFpbkZ1bmN0aW9ucy5yZWxvYWREb20oKVxyXG5lZGl0RG9tLm5ld1Rhc2tCdXR0b24oKVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=