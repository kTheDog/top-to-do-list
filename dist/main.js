/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const taskButtons = __webpack_require__(/*! ./taskItem */ "./src/taskItem.js")
const listDiv = document.getElementById('list')

localStorage.setItem('ID', 1)

const TaskButtonFunctionality = (taskButton) => {
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
  buttonDiv.appendChild(taskButtons.editTask(taskUI, greenButtonFunction))

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





taskButtons.taskButtonElement(taskButtonFunction)


/***/ }),

/***/ "./src/taskItem.js":
/*!*************************!*\
  !*** ./src/taskItem.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "editTask": () => (/* binding */ editTask),
/* harmony export */   "expandTask": () => (/* binding */ expandTask),
/* harmony export */   "removeTask": () => (/* binding */ removeTask),
/* harmony export */   "taskButtonElement": () => (/* binding */ taskButtonElement)
/* harmony export */ });
const imports = __webpack_require__(/*! ./index */ "./src/index.js")

const listDiv = document.getElementById('list')

const taskButtonElement = (taskButtonFunction) => {
  let element = document.createElement('button')
  element.innerHTML =`<strong>Add task</strong>`
  element.addEventListener('click', () => {
    taskButtonFunction(element)
  })
  listDiv.appendChild(element)
}

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

const editTask = (taskUI, greenButtonFunction) => {
  let button = document.createElement('button')

  button.className = 'edit-task'
  button.textContent = 'edit task'
  button.addEventListener('click', () => {
    let target = button.parentNode.parentNode.parentNode


    let object = JSON.parse(localStorage.getItem(target.dataset.id)),
        replacement = taskUI(object.title, object.description, object.date, object.priority)

    replacement.addButton.addEventListener('click', () => {
      greenButtonFunction(replacement)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxvQkFBb0IsbUJBQU8sQ0FBQyxxQ0FBWTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pFQSxnQkFBZ0IsbUJBQU8sQ0FBQywrQkFBUztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTUM7QUFDRDs7Ozs7OztVQ3pFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvcC10by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvcC10by1kby1saXN0Ly4vc3JjL3Rhc2tJdGVtLmpzIiwid2VicGFjazovL3RvcC10by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvcC10by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b3AtdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvcC10by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9wLXRvLWRvLWxpc3Qvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90b3AtdG8tZG8tbGlzdC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9wLXRvLWRvLWxpc3Qvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHRhc2tCdXR0b25zID0gcmVxdWlyZSgnLi90YXNrSXRlbScpXHJcbmNvbnN0IGxpc3REaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlzdCcpXHJcblxyXG5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnSUQnLCAxKVxyXG5cclxuY29uc3QgVGFza0J1dHRvbkZ1bmN0aW9uYWxpdHkgPSAodGFza0J1dHRvbikgPT4ge1xyXG4gIGxldCBVSSA9IHRhc2tVSSgpXHJcblxyXG4gIFVJLmFkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGdyZWVuQnV0dG9uRnVuY3Rpb24oVUkpXHJcblxyXG4gIH0pXHJcblxyXG4gIFVJLmNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIHJlZEJ1dHRvbkZ1bmN0aW9uKClcclxuICB9KVxyXG5cclxuICBsaXN0RGl2LnJlbW92ZUNoaWxkKHRhc2tCdXR0b24pXHJcbiAgbGlzdERpdi5hcHBlbmRDaGlsZChVSS5lbGVtZW50KVxyXG59XHJcblxyXG5jb25zdCB0YXNrVG9Eb20gPSAob2JqZWN0KSA9PiB7XHJcbiAgb2JqZWN0ID0gSlNPTi5wYXJzZShvYmplY3QpXHJcbiAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgdGl0bGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgZGF0ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICBidXR0b25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgZGVzY3JpcHRpb25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgdGFza01haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgZWxlbWVudC5kYXRhc2V0LmlkID0gb2JqZWN0Lml0ZW1JRFxyXG4gIGVsZW1lbnQuY2xhc3NOYW1lID0gJ3Rhc2staXRlbSdcclxuICB0aXRsZURpdi5jbGFzc05hbWUgPSAndGl0bGUtZGl2J1xyXG4gIGRhdGVEaXYuY2xhc3NOYW1lID0gJ2RhdGUtZGl2J1xyXG4gIGRlc2NyaXB0aW9uRGl2LmNsYXNzTmFtZSA9ICdoaWRlIGRlc2NyaXB0aW9uLWRpdidcclxuICBidXR0b25EaXYuY2xhc3NOYW1lID0gJ2J1dHRvbi1kaXYnXHJcbiAgdGFza01haW4uY2xhc3NOYW1lID0gJ3Rhc2stbWFpbidcclxuXHJcbiAgdGl0bGVEaXYudGV4dENvbnRlbnQgPSBvYmplY3QudGl0bGVcclxuICBkYXRlRGl2LnRleHRDb250ZW50ID0gb2JqZWN0LmRhdGVcclxuICBkZXNjcmlwdGlvbkRpdi50ZXh0Q29udGVudCA9IG9iamVjdC5kZXNjcmlwdGlvblxyXG5cclxuXHJcbiAgYnV0dG9uRGl2LmFwcGVuZENoaWxkKHRhc2tCdXR0b25zLnJlbW92ZVRhc2soKSlcclxuICBidXR0b25EaXYuYXBwZW5kQ2hpbGQodGFza0J1dHRvbnMuZXhwYW5kVGFzaygpKVxyXG4gIGJ1dHRvbkRpdi5hcHBlbmRDaGlsZCh0YXNrQnV0dG9ucy5lZGl0VGFzayh0YXNrVUksIGdyZWVuQnV0dG9uRnVuY3Rpb24pKVxyXG5cclxuICB0YXNrTWFpbi5hcHBlbmRDaGlsZCh0aXRsZURpdilcclxuICB0YXNrTWFpbi5hcHBlbmRDaGlsZChkYXRlRGl2KVxyXG4gIHRhc2tNYWluLmFwcGVuZENoaWxkKGJ1dHRvbkRpdilcclxuXHJcblxyXG4gIGVsZW1lbnQuYXBwZW5kQ2hpbGQodGFza01haW4pXHJcbiAgZWxlbWVudC5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbkRpdilcclxuXHJcbiAgbGlzdERpdi5hcHBlbmRDaGlsZChlbGVtZW50KVxyXG5cclxufVxyXG5cclxuY29uc3QgcmVsb2FkRG9tID0gKCkgPT4ge1xyXG4gIGxpc3REaXYuaW5uZXJIVE1MID0gXCJcIlxyXG4gIGxldCB3aG9sZVN0b3JhZ2UgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGxvY2FsU3RvcmFnZSkpXHJcbiAgZm9yIChsZXQga2V5IGluIHdob2xlU3RvcmFnZSkge1xyXG4gICAgaWYgKGtleSA9PT0gJ0lEJykge2NvbnRpbnVlfVxyXG4gICAgdGFza1RvRG9tKHdob2xlU3RvcmFnZVtrZXldKVxyXG5cclxuICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG50YXNrQnV0dG9ucy50YXNrQnV0dG9uRWxlbWVudCh0YXNrQnV0dG9uRnVuY3Rpb24pXHJcbiIsImNvbnN0IGltcG9ydHMgPSByZXF1aXJlKCcuL2luZGV4JylcclxuXHJcbmNvbnN0IGxpc3REaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlzdCcpXHJcblxyXG5jb25zdCB0YXNrQnV0dG9uRWxlbWVudCA9ICh0YXNrQnV0dG9uRnVuY3Rpb24pID0+IHtcclxuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXHJcbiAgZWxlbWVudC5pbm5lckhUTUwgPWA8c3Ryb25nPkFkZCB0YXNrPC9zdHJvbmc+YFxyXG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICB0YXNrQnV0dG9uRnVuY3Rpb24oZWxlbWVudClcclxuICB9KVxyXG4gIGxpc3REaXYuYXBwZW5kQ2hpbGQoZWxlbWVudClcclxufVxyXG5cclxuY29uc3QgZXhwYW5kVGFzayA9ICgpID0+IHtcclxuICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcclxuICBidXR0b24uY2xhc3NOYW1lID0gJ2V4cGFuZC10YXNrJ1xyXG4gIGJ1dHRvbi50ZXh0Q29udGVudCA9ICdleHBhbmQgdGFzaydcclxuXHJcbiAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgbGV0IHRhcmdldCA9IGJ1dHRvbi5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcuZGVzY3JpcHRpb24tZGl2JylcclxuICAgIGNvbnNvbGUubG9nKGJ1dHRvbi5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCdkZXNjJykpXHJcbiAgICBjb25zb2xlLmxvZyh0YXJnZXQpXHJcbiAgICB0YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpXHJcbiAgfSlcclxuXHJcbiAgcmV0dXJuIGJ1dHRvblxyXG59XHJcblxyXG5jb25zdCBlZGl0VGFzayA9ICh0YXNrVUksIGdyZWVuQnV0dG9uRnVuY3Rpb24pID0+IHtcclxuICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcclxuXHJcbiAgYnV0dG9uLmNsYXNzTmFtZSA9ICdlZGl0LXRhc2snXHJcbiAgYnV0dG9uLnRleHRDb250ZW50ID0gJ2VkaXQgdGFzaydcclxuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBsZXQgdGFyZ2V0ID0gYnV0dG9uLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlXHJcblxyXG5cclxuICAgIGxldCBvYmplY3QgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRhcmdldC5kYXRhc2V0LmlkKSksXHJcbiAgICAgICAgcmVwbGFjZW1lbnQgPSB0YXNrVUkob2JqZWN0LnRpdGxlLCBvYmplY3QuZGVzY3JpcHRpb24sIG9iamVjdC5kYXRlLCBvYmplY3QucHJpb3JpdHkpXHJcblxyXG4gICAgcmVwbGFjZW1lbnQuYWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBncmVlbkJ1dHRvbkZ1bmN0aW9uKHJlcGxhY2VtZW50KVxyXG4gICAgfSlcclxuICAgIHRhcmdldC5yZXBsYWNlV2l0aChyZXBsYWNlbWVudC5lbGVtZW50KVxyXG4gICAgY29uc29sZS5sb2cob2JqZWN0KVxyXG4gIH0pXHJcblxyXG4gIHJldHVybiBidXR0b25cclxufVxyXG5cclxuY29uc3QgcmVtb3ZlVGFzayA9ICgpID0+IHtcclxuICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcclxuXHJcbiAgYnV0dG9uLmNsYXNzTmFtZSA9ICdyZW1vdmUtdGFzaydcclxuICBidXR0b24udGV4dENvbnRlbnQgPSAncmVtb3ZlIHRhc2snXHJcbiAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgbGV0IHRhcmdldCA9IGJ1dHRvbi5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZVxyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGFyZ2V0LmRhdGFzZXQuaWQpXHJcbiAgICB0YXJnZXQucmVtb3ZlKClcclxuICB9KVxyXG5cclxuICByZXR1cm4gYnV0dG9uXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCB7XHJcbiAgcmVtb3ZlVGFzayxcclxuICBleHBhbmRUYXNrLFxyXG4gIGVkaXRUYXNrLFxyXG4gIHRhc2tCdXR0b25FbGVtZW50XHJcbn1cclxuXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=