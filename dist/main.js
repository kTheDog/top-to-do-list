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
/* harmony export */   "createFolderButton": () => (/* binding */ createFolderButton),
/* harmony export */   "folderItem": () => (/* binding */ folderItem),
/* harmony export */   "folderUI": () => (/* binding */ folderUI),
/* harmony export */   "inboxButton": () => (/* binding */ inboxButton),
/* harmony export */   "newTaskButton": () => (/* binding */ newTaskButton),
/* harmony export */   "taskItem": () => (/* binding */ taskItem),
/* harmony export */   "taskUi": () => (/* binding */ taskUi)
/* harmony export */ });
const supplyElement = __webpack_require__(/*! ./supplyElement */ "./src/supplyElement.js")
const mainFunctions = __webpack_require__(/*! ./mainFunctions */ "./src/mainFunctions.js")
const listDiv = document.getElementById('list')
const sideBar = document.querySelector('.side-bar')


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

const inboxButton = () => {
  let inboxButton = supplyElement.inboxButton()

  inboxButton.addEventListener('click', () => mainFunctions.inboxButton())
  sideBar.appendChild(inboxButton)
}

const folderUI = () => {
  let UI = supplyElement.folderUI()

  let replaceThis = document.querySelector('.create-folder')

  UI.saveButton.addEventListener('click', () => {
    mainFunctions.saveFolderButton(UI.input.value)
  })

  replaceThis.replaceWith(UI.element)
}
const createFolderButton = () => {
  let createFolderButton = supplyElement.createFolderButton()

  createFolderButton.addEventListener('click', () => {
    mainFunctions.createFolderButton()
  })



  sideBar.appendChild(createFolderButton)
}

const folderItem = (itemObject) => {
  let item = supplyElement.folderItem(itemObject)

  item.element.addEventListener('click', () => {
    mainFunctions.selectFolder(itemObject)
  })

  sideBar.appendChild(item.element)
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
/* harmony export */   "createFolderButton": () => (/* binding */ createFolderButton),
/* harmony export */   "editTaskButton": () => (/* binding */ editTaskButton),
/* harmony export */   "expandTaskButton": () => (/* binding */ expandTaskButton),
/* harmony export */   "finishTaskButton": () => (/* binding */ finishTaskButton),
/* harmony export */   "greenButton": () => (/* binding */ greenButton),
/* harmony export */   "inboxButton": () => (/* binding */ inboxButton),
/* harmony export */   "newTaskButton": () => (/* binding */ newTaskButton),
/* harmony export */   "reloadDom": () => (/* binding */ reloadDom),
/* harmony export */   "removeTaskButton": () => (/* binding */ removeTaskButton),
/* harmony export */   "saveFolderButton": () => (/* binding */ saveFolderButton),
/* harmony export */   "selectFolder": () => (/* binding */ selectFolder)
/* harmony export */ });
const supplyElement = __webpack_require__(/*! ./supplyElement */ "./src/supplyElement.js")
const editDom = __webpack_require__(/*! ./editDom */ "./src/editDom.js")
const listDiv = document.getElementById('list')
const sideBar = document.querySelector('.side-bar')

const addToJson = (UI) => {
  let object = {},
      itemID = +localStorage.getItem('ID') + 1

  object.title = UI.inpTitle.value
  object.description = UI.inpDescription.value
  object.date = UI.inpDate.value
  object.priority = UI.priority
  object.id = UI.id || itemID
  object.folder = localStorage.getItem('selectedFolder')

  let taskStorage = JSON.parse(localStorage.getItem('taskStorage')) || {}
  taskStorage[itemID] = object

  localStorage.setItem('ID', itemID)
  localStorage.setItem('taskStorage', JSON.stringify(taskStorage))
}

const reloadDom = (folderName='inbox') => {
  listDiv.innerHTML = ""
  let storage = JSON.parse(localStorage.getItem('taskStorage'))
  for (let key in storage) {
    let obj = storage[key]
    if (folderName==='inbox' || folderName == obj.folder) {
      console.log(obj.folder)
      editDom.taskItem(obj)
    }


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
  /*take this out if you wanna allow multiple task edits at the same time */
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

const createFolderButton = () => {
  editDom.folderUI()
}

const saveFolderButton = (value) => {
  if (!value) {alert('Please enter a name for your folder')}
  let folderStorage = JSON.parse(localStorage.getItem('folderStorage')) || {},
      itemID = +localStorage.getItem('ID') + 1
  folderStorage[value] = {folderName: value, itemID}
  localStorage.setItem('ID', itemID)
  localStorage.setItem('selectedFolder', JSON.stringify(value))

  localStorage.setItem('folderStorage', JSON.stringify(folderStorage))


  reloadSideBar()
}



const reloadSideBar = () => {

  sideBar.innerHTML = ""

  editDom.inboxButton()

  let folderStorage = JSON.parse(localStorage.getItem('folderStorage'))

  for (let key in folderStorage) {
    editDom.folderItem(folderStorage[key])
  }

}

const selectFolder = (itemObject) => {


  let target = sideBar.querySelector(`[data-id="${itemObject.itemID}"]`)

  localStorage.setItem('selectedFolder', itemObject.folderName)

  target.classList.add('selected-folder')
  console.log(itemObject.folderName)
  reloadSideBar(itemObject.folderName)

}


const inboxButton = () => {
  console.log('this')
  selectFolder({folderName: "test", itemID: -1})
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
/* harmony export */   "createFolderButton": () => (/* binding */ createFolderButton),
/* harmony export */   "folderItem": () => (/* binding */ folderItem),
/* harmony export */   "folderUI": () => (/* binding */ folderUI),
/* harmony export */   "inboxButton": () => (/* binding */ inboxButton),
/* harmony export */   "newTaskButton": () => (/* binding */ newTaskButton),
/* harmony export */   "taskItem": () => (/* binding */ taskItem),
/* harmony export */   "taskUi": () => (/* binding */ taskUi)
/* harmony export */ });

const mainFunctions = __webpack_require__(/*! ./mainFunctions */ "./src/mainFunctions.js")

const newTaskButton = () => {
  let element = document.createElement('button')

  element.className = 'new-task'
  element.innerHTML =
  `
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
  </svg>
  <span> New Task...

  `
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
    <label for="due-date"></label>
    <input type="date" name="due-date" id="due-date" value="">
  </div>
  <div id="select-prio">
    <div></div>
    <button class="low"></button>
    <button class="medium"></button>
    <button class="high"></button>
  </div>
</div>
<div id="add-description">
  <label for="description">Description</label>
  <textarea name="description" id="description" rows="10"></textarea>
</div>
<div class="button">
  <button id="add">
      <svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
      </svg>
  </button>
  <button id="cancel">
      <svg viewBox="0 0 24 24">
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
  element.innerHTML =  `<svg viewBox="0 0 24 24">
  <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
</svg>`

  return element
}

const removeTask = () => {
  let element = document.createElement('button')

  element.className = 'remove-task'
  element.innerHTML = `<svg viewBox="0 0 24 24">
  <path fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
</svg>`

  return element
}

const editTask = () => {
  let element = document.createElement('button')

  element.className = 'edit-task'
  element.innerHTML = `<svg viewBox="0 0 24 24">
  <path fill="currentColor" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
</svg>`

  return element
}

const finishTask = () => {
  let element = document.createElement('button')

  element.className = 'finish-task'
  element.innerHTML = `<svg viewBox="0 0 24 24">
  <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
</svg>`

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

const inboxButton = () => {
  let element = document.createElement('div')

  element.innerHTML =
    `
    <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M19,15H15A3,3 0 0,1 12,18A3,3 0 0,1 9,15H5V5H19M19,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" />
    </svg>
    <span>Inbox</span>
    `
  inboxButton.dataset.id = '-1'
  element.classList.add('inbox')

  return element
}

const createFolderButton = () => {
  let element = document.createElement('div')

  element.innerHTML =
    `
    <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M13 19C13 19.34 13.04 19.67 13.09 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.89 4 4 4H10L12 6H20C21.1 6 22 6.89 22 8V13.81C21.39 13.46 20.72 13.22 20 13.09V8H4V18H13.09C13.04 18.33 13 18.66 13 19M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z" />
    </svg>
    <span>Create Folder</span>
    `

  element.classList.add('create-folder')

  return element

}

const folderUI = (folderTitle="") => {
  let element = document.createElement('div'),
      input = document.createElement('input'),
      saveButton = document.createElement('button'),
      cancelButton = document.createElement('button')
  element.classList.add('folder-ui')
  saveButton.classList.add('save-folder')
  cancelButton.classList.add('cancel-folder')
  input.id = 'folder-title'

  saveButton.innerHTML =
    `
    <svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M5 19V5H12V12H19V13C19.7 13 20.37 13.13 21 13.35V9L15 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.89 21 5 21H13.35C13.13 20.37 13 19.7 13 19H5M14 4.5L19.5 10H14V4.5M22.5 17.25L17.75 22L15 19L16.16 17.84L17.75 19.43L21.34 15.84L22.5 17.25Z" />
    </svg>
    `
  cancelButton.innerHTML =
    `
    <svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
    </svg>

    `
  element.appendChild(input)
  element.appendChild(saveButton)
  element.appendChild(cancelButton)
  return {
    element,
    input,
    saveButton,
    cancelButton
  }

}


const folderItem = (itemObject) => {
  let element = document.createElement('button')


  element.classList.add('folder-item')
  element.dataset.id = itemObject.itemID
  element.textContent = itemObject.folderName


  return {
    element
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
editDom.inboxButton()
editDom.createFolderButton()

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBU0M7Ozs7Ozs7VUNqUUQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsbUJBQU8sQ0FBQyxtQ0FBVztBQUNuQyxzQkFBc0IsbUJBQU8sQ0FBQywrQ0FBaUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtdG8tZG8tbGlzdC8uL3NyYy9lZGl0RG9tLmpzIiwid2VicGFjazovL3RvcC10by1kby1saXN0Ly4vc3JjL21haW5GdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9wLXRvLWRvLWxpc3QvLi9zcmMvc3VwcGx5RWxlbWVudC5qcyIsIndlYnBhY2s6Ly90b3AtdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b3AtdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9wLXRvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b3AtdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvcC10by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHN1cHBseUVsZW1lbnQgPSByZXF1aXJlKCcuL3N1cHBseUVsZW1lbnQnKVxyXG5jb25zdCBtYWluRnVuY3Rpb25zID0gcmVxdWlyZSgnLi9tYWluRnVuY3Rpb25zJylcclxuY29uc3QgbGlzdERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0JylcclxuY29uc3Qgc2lkZUJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlLWJhcicpXHJcblxyXG5cclxuY29uc3QgbmV3VGFza0J1dHRvbiA9ICgpID0+IHtcclxuICBsZXQgZWxlbWVudCA9IHN1cHBseUVsZW1lbnQubmV3VGFza0J1dHRvbigpXHJcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IG1haW5GdW5jdGlvbnMubmV3VGFza0J1dHRvbihlbGVtZW50KSlcclxuICBsaXN0RGl2LmFwcGVuZENoaWxkKGVsZW1lbnQpXHJcbn1cclxuXHJcbmNvbnN0IHRhc2tVaSA9IChyZXBsYWNlVGhpcywgdWkgPSBzdXBwbHlFbGVtZW50LnRhc2tVaSgpKSA9PiB7XHJcbiAgdWkuYWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gbWFpbkZ1bmN0aW9ucy5ncmVlbkJ1dHRvbih1aSkpXHJcbiAgLyp0YWtlIHRoaXMgb3V0IGlmIHlvdSB3YW5uYSBhbGxvdyBtdWx0aXBsZSB0YXNrIGVkaXRzIGF0IHRoZSBzYW1lIHRpbWUgKi9cclxuXHJcbiAgaWYgKHJlcGxhY2VUaGlzLmNsYXNzTmFtZSA9PT0gJ25ldy10YXNrJykge1xyXG4gICAgbWFpbkZ1bmN0aW9ucy5yZWxvYWREb20oKVxyXG4gICAgbGlzdERpdi5hcHBlbmRDaGlsZCh1aS5lbGVtZW50KVxyXG4gIH1cclxuXHJcbiAgcmVwbGFjZVRoaXMucmVwbGFjZVdpdGgodWkuZWxlbWVudClcclxufVxyXG5cclxuY29uc3QgdGFza0l0ZW0gPSAob2JqZWN0KSA9PiB7XHJcbiAgbGV0IHRhc2tJdGVtID0gc3VwcGx5RWxlbWVudC50YXNrSXRlbShvYmplY3QpXHJcblxyXG5cclxuICB0YXNrSXRlbS5maW5pc2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBtYWluRnVuY3Rpb25zLmZpbmlzaFRhc2tCdXR0b24odGFza0l0ZW0uZmluaXNoKVxyXG4gIH0pXHJcblxyXG4gIHRhc2tJdGVtLnJlbW92ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIG1haW5GdW5jdGlvbnMucmVtb3ZlVGFza0J1dHRvbih0YXNrSXRlbS5lbGVtZW50LCBvYmplY3QuaWQpXHJcbiAgfSlcclxuXHJcbiAgdGFza0l0ZW0uZWRpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuXHJcbiAgICBtYWluRnVuY3Rpb25zLmVkaXRUYXNrQnV0dG9uKG9iamVjdClcclxuICB9KVxyXG5cclxuICB0YXNrSXRlbS5leHBhbmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcblxyXG4gICAgbWFpbkZ1bmN0aW9ucy5leHBhbmRUYXNrQnV0dG9uKHRhc2tJdGVtLmVsZW1lbnQpXHJcblxyXG4gIH0pXHJcblxyXG5cclxuXHJcbiAgbGlzdERpdi5hcHBlbmRDaGlsZCh0YXNrSXRlbS5lbGVtZW50KVxyXG59XHJcblxyXG5jb25zdCBpbmJveEJ1dHRvbiA9ICgpID0+IHtcclxuICBsZXQgaW5ib3hCdXR0b24gPSBzdXBwbHlFbGVtZW50LmluYm94QnV0dG9uKClcclxuXHJcbiAgaW5ib3hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBtYWluRnVuY3Rpb25zLmluYm94QnV0dG9uKCkpXHJcbiAgc2lkZUJhci5hcHBlbmRDaGlsZChpbmJveEJ1dHRvbilcclxufVxyXG5cclxuY29uc3QgZm9sZGVyVUkgPSAoKSA9PiB7XHJcbiAgbGV0IFVJID0gc3VwcGx5RWxlbWVudC5mb2xkZXJVSSgpXHJcblxyXG4gIGxldCByZXBsYWNlVGhpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jcmVhdGUtZm9sZGVyJylcclxuXHJcbiAgVUkuc2F2ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIG1haW5GdW5jdGlvbnMuc2F2ZUZvbGRlckJ1dHRvbihVSS5pbnB1dC52YWx1ZSlcclxuICB9KVxyXG5cclxuICByZXBsYWNlVGhpcy5yZXBsYWNlV2l0aChVSS5lbGVtZW50KVxyXG59XHJcbmNvbnN0IGNyZWF0ZUZvbGRlckJ1dHRvbiA9ICgpID0+IHtcclxuICBsZXQgY3JlYXRlRm9sZGVyQnV0dG9uID0gc3VwcGx5RWxlbWVudC5jcmVhdGVGb2xkZXJCdXR0b24oKVxyXG5cclxuICBjcmVhdGVGb2xkZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBtYWluRnVuY3Rpb25zLmNyZWF0ZUZvbGRlckJ1dHRvbigpXHJcbiAgfSlcclxuXHJcblxyXG5cclxuICBzaWRlQmFyLmFwcGVuZENoaWxkKGNyZWF0ZUZvbGRlckJ1dHRvbilcclxufVxyXG5cclxuY29uc3QgZm9sZGVySXRlbSA9IChpdGVtT2JqZWN0KSA9PiB7XHJcbiAgbGV0IGl0ZW0gPSBzdXBwbHlFbGVtZW50LmZvbGRlckl0ZW0oaXRlbU9iamVjdClcclxuXHJcbiAgaXRlbS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgbWFpbkZ1bmN0aW9ucy5zZWxlY3RGb2xkZXIoaXRlbU9iamVjdClcclxuICB9KVxyXG5cclxuICBzaWRlQmFyLmFwcGVuZENoaWxkKGl0ZW0uZWxlbWVudClcclxufVxyXG5cclxuZXhwb3J0IHtcclxuICBuZXdUYXNrQnV0dG9uLFxyXG4gIHRhc2tVaSxcclxuICB0YXNrSXRlbSxcclxuICBpbmJveEJ1dHRvbixcclxuICBjcmVhdGVGb2xkZXJCdXR0b24sXHJcbiAgZm9sZGVyVUksXHJcbiAgZm9sZGVySXRlbVxyXG59XHJcbiIsImNvbnN0IHN1cHBseUVsZW1lbnQgPSByZXF1aXJlKCcuL3N1cHBseUVsZW1lbnQnKVxyXG5jb25zdCBlZGl0RG9tID0gcmVxdWlyZSgnLi9lZGl0RG9tJylcclxuY29uc3QgbGlzdERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0JylcclxuY29uc3Qgc2lkZUJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlLWJhcicpXHJcblxyXG5jb25zdCBhZGRUb0pzb24gPSAoVUkpID0+IHtcclxuICBsZXQgb2JqZWN0ID0ge30sXHJcbiAgICAgIGl0ZW1JRCA9ICtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnSUQnKSArIDFcclxuXHJcbiAgb2JqZWN0LnRpdGxlID0gVUkuaW5wVGl0bGUudmFsdWVcclxuICBvYmplY3QuZGVzY3JpcHRpb24gPSBVSS5pbnBEZXNjcmlwdGlvbi52YWx1ZVxyXG4gIG9iamVjdC5kYXRlID0gVUkuaW5wRGF0ZS52YWx1ZVxyXG4gIG9iamVjdC5wcmlvcml0eSA9IFVJLnByaW9yaXR5XHJcbiAgb2JqZWN0LmlkID0gVUkuaWQgfHwgaXRlbUlEXHJcbiAgb2JqZWN0LmZvbGRlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZWxlY3RlZEZvbGRlcicpXHJcblxyXG4gIGxldCB0YXNrU3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rhc2tTdG9yYWdlJykpIHx8IHt9XHJcbiAgdGFza1N0b3JhZ2VbaXRlbUlEXSA9IG9iamVjdFxyXG5cclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnSUQnLCBpdGVtSUQpXHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rhc2tTdG9yYWdlJywgSlNPTi5zdHJpbmdpZnkodGFza1N0b3JhZ2UpKVxyXG59XHJcblxyXG5jb25zdCByZWxvYWREb20gPSAoZm9sZGVyTmFtZT0naW5ib3gnKSA9PiB7XHJcbiAgbGlzdERpdi5pbm5lckhUTUwgPSBcIlwiXHJcbiAgbGV0IHN0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrU3RvcmFnZScpKVxyXG4gIGZvciAobGV0IGtleSBpbiBzdG9yYWdlKSB7XHJcbiAgICBsZXQgb2JqID0gc3RvcmFnZVtrZXldXHJcbiAgICBpZiAoZm9sZGVyTmFtZT09PSdpbmJveCcgfHwgZm9sZGVyTmFtZSA9PSBvYmouZm9sZGVyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKG9iai5mb2xkZXIpXHJcbiAgICAgIGVkaXREb20udGFza0l0ZW0ob2JqKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgfVxyXG5cclxufVxyXG5cclxuY29uc3QgbmV3VGFza0J1dHRvbiA9IChidXR0b24pID0+IHtcclxuICBlZGl0RG9tLnRhc2tVaShidXR0b24pXHJcbn1cclxuXHJcbmNvbnN0IGdyZWVuQnV0dG9uID0gKFVJKSA9PiB7XHJcbiAgaWYgKCEoVUkuaW5wVGl0bGUudmFsdWUgJiYgVUkuaW5wRGF0ZS52YWx1ZSAmJiBVSS5pbnBEZXNjcmlwdGlvbi52YWx1ZSkpIHtcclxuICAgIGFsZXJ0KCdQbGVhc2UgZmlsbCBpbiBhbGwgZmllbGRzJylcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgYWRkVG9Kc29uKFVJKSxcclxuICByZWxvYWREb20oKSxcclxuICBlZGl0RG9tLm5ld1Rhc2tCdXR0b24oKVxyXG59XHJcblxyXG5jb25zdCBlZGl0VGFza0J1dHRvbiA9IChvYmplY3QpID0+IHtcclxuICAvKnRha2UgdGhpcyBvdXQgaWYgeW91IHdhbm5hIGFsbG93IG11bHRpcGxlIHRhc2sgZWRpdHMgYXQgdGhlIHNhbWUgdGltZSAqL1xyXG4gIHJlbG9hZERvbSgpXHJcbiAgZWRpdERvbS5uZXdUYXNrQnV0dG9uKClcclxuXHJcbiAgbGV0IHJlcGxhY2VtZW50ID0gc3VwcGx5RWxlbWVudC50YXNrVWkoKSxcclxuICAgICAgcmVwbGFjZVRoaXMgPSBsaXN0RGl2LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWlkPVwiJHtvYmplY3QuaWR9XCJdYClcclxuXHJcblxyXG4gIHJlcGxhY2VtZW50LmlucERhdGUudmFsdWUgPSBvYmplY3QuZGF0ZVxyXG4gIHJlcGxhY2VtZW50LmlucFRpdGxlLnZhbHVlID0gb2JqZWN0LnRpdGxlXHJcbiAgcmVwbGFjZW1lbnQuaW5wRGVzY3JpcHRpb24udmFsdWUgPSBvYmplY3QuZGVzY3JpcHRpb25cclxuICByZXBsYWNlbWVudC5wcmlvcml0eSA9IG9iamVjdC5wcmlvcml0eVxyXG4gIHJlcGxhY2VtZW50LmlkID0gb2JqZWN0LmlkXHJcbiAgZWRpdERvbS50YXNrVWkocmVwbGFjZVRoaXMsIHJlcGxhY2VtZW50KVxyXG59XHJcblxyXG5jb25zdCByZW1vdmVUYXNrQnV0dG9uID0gKGVsZW1lbnQsIGlkKSA9PiB7XHJcbiAgZWxlbWVudC5yZW1vdmUoKVxyXG4gIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKEpTT04uc3RyaW5naWZ5KGlkKSlcclxufVxyXG5cclxuY29uc3QgZXhwYW5kVGFza0J1dHRvbiA9IChlbGVtZW50KSA9PiB7XHJcbiAgbGV0IHJlZmVyZW5jZURlc2NyaXB0aW9uID0gZWxlbWVudC5jaGlsZHJlblsxXVxyXG4gIHJlZmVyZW5jZURlc2NyaXB0aW9uLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKVxyXG59XHJcblxyXG5jb25zdCBmaW5pc2hUYXNrQnV0dG9uID0gKGVsZW1lbnQpID0+IHtcclxuICBsZXQgdGFyZ2V0ID0gZWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmdcclxuICB0YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnZmluaXNoZWQnKVxyXG59XHJcblxyXG5jb25zdCBjcmVhdGVGb2xkZXJCdXR0b24gPSAoKSA9PiB7XHJcbiAgZWRpdERvbS5mb2xkZXJVSSgpXHJcbn1cclxuXHJcbmNvbnN0IHNhdmVGb2xkZXJCdXR0b24gPSAodmFsdWUpID0+IHtcclxuICBpZiAoIXZhbHVlKSB7YWxlcnQoJ1BsZWFzZSBlbnRlciBhIG5hbWUgZm9yIHlvdXIgZm9sZGVyJyl9XHJcbiAgbGV0IGZvbGRlclN0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmb2xkZXJTdG9yYWdlJykpIHx8IHt9LFxyXG4gICAgICBpdGVtSUQgPSArbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0lEJykgKyAxXHJcbiAgZm9sZGVyU3RvcmFnZVt2YWx1ZV0gPSB7Zm9sZGVyTmFtZTogdmFsdWUsIGl0ZW1JRH1cclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnSUQnLCBpdGVtSUQpXHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NlbGVjdGVkRm9sZGVyJywgSlNPTi5zdHJpbmdpZnkodmFsdWUpKVxyXG5cclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZm9sZGVyU3RvcmFnZScsIEpTT04uc3RyaW5naWZ5KGZvbGRlclN0b3JhZ2UpKVxyXG5cclxuXHJcbiAgcmVsb2FkU2lkZUJhcigpXHJcbn1cclxuXHJcblxyXG5cclxuY29uc3QgcmVsb2FkU2lkZUJhciA9ICgpID0+IHtcclxuXHJcbiAgc2lkZUJhci5pbm5lckhUTUwgPSBcIlwiXHJcblxyXG4gIGVkaXREb20uaW5ib3hCdXR0b24oKVxyXG5cclxuICBsZXQgZm9sZGVyU3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2ZvbGRlclN0b3JhZ2UnKSlcclxuXHJcbiAgZm9yIChsZXQga2V5IGluIGZvbGRlclN0b3JhZ2UpIHtcclxuICAgIGVkaXREb20uZm9sZGVySXRlbShmb2xkZXJTdG9yYWdlW2tleV0pXHJcbiAgfVxyXG5cclxufVxyXG5cclxuY29uc3Qgc2VsZWN0Rm9sZGVyID0gKGl0ZW1PYmplY3QpID0+IHtcclxuXHJcblxyXG4gIGxldCB0YXJnZXQgPSBzaWRlQmFyLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWlkPVwiJHtpdGVtT2JqZWN0Lml0ZW1JRH1cIl1gKVxyXG5cclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2VsZWN0ZWRGb2xkZXInLCBpdGVtT2JqZWN0LmZvbGRlck5hbWUpXHJcblxyXG4gIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1mb2xkZXInKVxyXG4gIGNvbnNvbGUubG9nKGl0ZW1PYmplY3QuZm9sZGVyTmFtZSlcclxuICByZWxvYWRTaWRlQmFyKGl0ZW1PYmplY3QuZm9sZGVyTmFtZSlcclxuXHJcbn1cclxuXHJcblxyXG5jb25zdCBpbmJveEJ1dHRvbiA9ICgpID0+IHtcclxuICBjb25zb2xlLmxvZygndGhpcycpXHJcbiAgc2VsZWN0Rm9sZGVyKHtmb2xkZXJOYW1lOiBcInRlc3RcIiwgaXRlbUlEOiAtMX0pXHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgbmV3VGFza0J1dHRvbixcclxuICBncmVlbkJ1dHRvbixcclxuICByZW1vdmVUYXNrQnV0dG9uLFxyXG4gIGVkaXRUYXNrQnV0dG9uLFxyXG4gIGV4cGFuZFRhc2tCdXR0b24sXHJcbiAgZmluaXNoVGFza0J1dHRvbixcclxuICByZWxvYWREb20sXHJcbiAgY3JlYXRlRm9sZGVyQnV0dG9uLFxyXG4gIHNhdmVGb2xkZXJCdXR0b24sXHJcbiAgc2VsZWN0Rm9sZGVyLFxyXG4gIGluYm94QnV0dG9uXHJcbn1cclxuIiwiXHJcbmNvbnN0IG1haW5GdW5jdGlvbnMgPSByZXF1aXJlKCcuL21haW5GdW5jdGlvbnMnKVxyXG5cclxuY29uc3QgbmV3VGFza0J1dHRvbiA9ICgpID0+IHtcclxuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXHJcblxyXG4gIGVsZW1lbnQuY2xhc3NOYW1lID0gJ25ldy10YXNrJ1xyXG4gIGVsZW1lbnQuaW5uZXJIVE1MID1cclxuICBgXHJcbiAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xOSwxM0gxM1YxOUgxMVYxM0g1VjExSDExVjVIMTNWMTFIMTlWMTNaXCIgLz5cclxuICA8L3N2Zz5cclxuICA8c3Bhbj4gTmV3IFRhc2suLi5cclxuXHJcbiAgYFxyXG4gIHJldHVybiBlbGVtZW50XHJcbn1cclxuXHJcbmNvbnN0IHRhc2tVaSA9ICh0aXRsZT1cIlwiLCBkZXNjcmlwdGlvbj1cIlwiLCBkYXRlPVwiXCIsIHByaW9yaXR5PVwiXCIsIGlkKSA9PiB7XHJcbiAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gIGVsZW1lbnQuaW5uZXJIVE1MID1cclxuICBgXHJcbjxkaXYgY2xhc3M9XCJ0b3Atcm93XCI+XHJcbiAgPGRpdiBpZD1cImFkZC10aXRsZVwiPlxyXG4gICAgPGxhYmVsIGZvcj1cInRpdGxlLWlucHV0XCI+VGl0bGU8L2xhYmVsPlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRpdGxlXCIgaWQ9XCJ0aXRsZS1pbnB1dFwiIHZhbHVlPVwiXCI+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBpZD1cInNlbGVjdC1kYXRlXCI+XHJcbiAgICA8bGFiZWwgZm9yPVwiZHVlLWRhdGVcIj48L2xhYmVsPlxyXG4gICAgPGlucHV0IHR5cGU9XCJkYXRlXCIgbmFtZT1cImR1ZS1kYXRlXCIgaWQ9XCJkdWUtZGF0ZVwiIHZhbHVlPVwiXCI+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBpZD1cInNlbGVjdC1wcmlvXCI+XHJcbiAgICA8ZGl2PjwvZGl2PlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImxvd1wiPjwvYnV0dG9uPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cIm1lZGl1bVwiPjwvYnV0dG9uPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImhpZ2hcIj48L2J1dHRvbj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbjxkaXYgaWQ9XCJhZGQtZGVzY3JpcHRpb25cIj5cclxuICA8bGFiZWwgZm9yPVwiZGVzY3JpcHRpb25cIj5EZXNjcmlwdGlvbjwvbGFiZWw+XHJcbiAgPHRleHRhcmVhIG5hbWU9XCJkZXNjcmlwdGlvblwiIGlkPVwiZGVzY3JpcHRpb25cIiByb3dzPVwiMTBcIj48L3RleHRhcmVhPlxyXG48L2Rpdj5cclxuPGRpdiBjbGFzcz1cImJ1dHRvblwiPlxyXG4gIDxidXR0b24gaWQ9XCJhZGRcIj5cclxuICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTIxLDdMOSwxOUwzLjUsMTMuNUw0LjkxLDEyLjA5TDksMTYuMTdMMTkuNTksNS41OUwyMSw3WlwiIC8+XHJcbiAgICAgIDwvc3ZnPlxyXG4gIDwvYnV0dG9uPlxyXG4gIDxidXR0b24gaWQ9XCJjYW5jZWxcIj5cclxuICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTE5LDYuNDFMMTcuNTksNUwxMiwxMC41OUw2LjQxLDVMNSw2LjQxTDEwLjU5LDEyTDUsMTcuNTlMNi40MSwxOUwxMiwxMy40MUwxNy41OSwxOUwxOSwxNy41OUwxMy40MSwxMkwxOSw2LjQxWlwiIC8+XHJcbiAgICAgIDwvc3ZnPlxyXG4gIDwvYnV0dG9uPlxyXG48L2Rpdj5cclxuXHJcbiAgYFxyXG4gIGVsZW1lbnQuY2xhc3NOYW1lID0gJ3Rhc2stdWknXHJcbiAgbGV0IGlucFRpdGxlID0gZWxlbWVudC5jaGlsZHJlblswXS5jaGlsZHJlblswXS5jaGlsZHJlblsxXSxcclxuICAgICAgaW5wRGF0ZSA9IGVsZW1lbnQuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMV0sXHJcbiAgICAgIGlucERlc2NyaXB0aW9uID0gZWxlbWVudC5jaGlsZHJlblsxXS5jaGlsZHJlblsxXSxcclxuICAgICAgYWRkQnV0dG9uID0gZWxlbWVudC5jaGlsZHJlblsyXS5jaGlsZHJlblswXSxcclxuICAgICAgY2FuY2VsQnV0dG9uID0gZWxlbWVudC5jaGlsZHJlblsyXS5jaGlsZHJlblsxXVxyXG4gICAgICBwcmlvcml0eSA9IFwiXCJcclxuLypcclxuICB0aXRsZSA9IGlucFRpdGxlLnRleHRDb250ZW50XHJcbiAgZGF0ZSA9IGlucERhdGUudGV4dENvbnRlbnRcclxuICBkZXNjcmlwdGlvbiA9IGlucERlc2NyaXB0aW9uLnRleHRDb250ZW50XHJcbiovXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBlbGVtZW50LCBpbnBUaXRsZSwgaW5wRGF0ZSwgaW5wRGVzY3JpcHRpb24sIGFkZEJ1dHRvbiwgY2FuY2VsQnV0dG9uLCBwcmlvcml0eSwgaWRcclxuICB9XHJcblxyXG59XHJcblxyXG5jb25zdCBleHBhbmRUYXNrID0gKCkgPT4ge1xyXG4gIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcclxuXHJcbiAgZWxlbWVudC5jbGFzc05hbWUgPSAnZXhwYW5kLXRhc2snXHJcbiAgZWxlbWVudC5pbm5lckhUTUwgPSAgYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTcuNDEsOC41OEwxMiwxMy4xN0wxNi41OSw4LjU4TDE4LDEwTDEyLDE2TDYsMTBMNy40MSw4LjU4WlwiIC8+XHJcbjwvc3ZnPmBcclxuXHJcbiAgcmV0dXJuIGVsZW1lbnRcclxufVxyXG5cclxuY29uc3QgcmVtb3ZlVGFzayA9ICgpID0+IHtcclxuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXHJcblxyXG4gIGVsZW1lbnQuY2xhc3NOYW1lID0gJ3JlbW92ZS10YXNrJ1xyXG4gIGVsZW1lbnQuaW5uZXJIVE1MID0gYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTYsMTlBMiwyIDAgMCwwIDgsMjFIMTZBMiwyIDAgMCwwIDE4LDE5VjdINlYxOU04LDlIMTZWMTlIOFY5TTE1LjUsNEwxNC41LDNIOS41TDguNSw0SDVWNkgxOVY0SDE1LjVaXCIgLz5cclxuPC9zdmc+YFxyXG5cclxuICByZXR1cm4gZWxlbWVudFxyXG59XHJcblxyXG5jb25zdCBlZGl0VGFzayA9ICgpID0+IHtcclxuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXHJcblxyXG4gIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2VkaXQtdGFzaydcclxuICBlbGVtZW50LmlubmVySFRNTCA9IGA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xNC4wNiw5TDE1LDkuOTRMNS45MiwxOUg1VjE4LjA4TDE0LjA2LDlNMTcuNjYsM0MxNy40MSwzIDE3LjE1LDMuMSAxNi45NiwzLjI5TDE1LjEzLDUuMTJMMTguODgsOC44N0wyMC43MSw3LjA0QzIxLjEsNi42NSAyMS4xLDYgMjAuNzEsNS42M0wxOC4zNywzLjI5QzE4LjE3LDMuMDkgMTcuOTIsMyAxNy42NiwzTTE0LjA2LDYuMTlMMywxNy4yNVYyMUg2Ljc1TDE3LjgxLDkuOTRMMTQuMDYsNi4xOVpcIiAvPlxyXG48L3N2Zz5gXHJcblxyXG4gIHJldHVybiBlbGVtZW50XHJcbn1cclxuXHJcbmNvbnN0IGZpbmlzaFRhc2sgPSAoKSA9PiB7XHJcbiAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxyXG5cclxuICBlbGVtZW50LmNsYXNzTmFtZSA9ICdmaW5pc2gtdGFzaydcclxuICBlbGVtZW50LmlubmVySFRNTCA9IGA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0yMSw3TDksMTlMMy41LDEzLjVMNC45MSwxMi4wOUw5LDE2LjE3TDE5LjU5LDUuNTlMMjEsN1pcIiAvPlxyXG48L3N2Zz5gXHJcblxyXG4gIHJldHVybiBlbGVtZW50XHJcbn1cclxuXHJcbmNvbnN0IHRhc2tJdGVtID0gKG9iamVjdCkgPT4ge1xyXG4gIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgIHRpdGxlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgIGRhdGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgYnV0dG9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgIGRlc2NyaXB0aW9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgIHRhc2tNYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICBlbGVtZW50LmRhdGFzZXQuaWQgPSBvYmplY3QuaWRcclxuICBlbGVtZW50LmNsYXNzTmFtZSA9ICd0YXNrLWl0ZW0nXHJcbiAgdGl0bGVEaXYuY2xhc3NOYW1lID0gJ3RpdGxlLWRpdidcclxuICBkYXRlRGl2LmNsYXNzTmFtZSA9ICdkYXRlLWRpdidcclxuICBkZXNjcmlwdGlvbkRpdi5jbGFzc05hbWUgPSAnaGlkZSBkZXNjcmlwdGlvbi1kaXYnXHJcbiAgYnV0dG9uRGl2LmNsYXNzTmFtZSA9ICdidXR0b24tZGl2J1xyXG4gIHRhc2tNYWluLmNsYXNzTmFtZSA9ICd0YXNrLW1haW4nXHJcblxyXG4gIHRpdGxlRGl2LnRleHRDb250ZW50ID0gb2JqZWN0LnRpdGxlXHJcbiAgZGF0ZURpdi50ZXh0Q29udGVudCA9IG9iamVjdC5kYXRlXHJcbiAgZGVzY3JpcHRpb25EaXYudGV4dENvbnRlbnQgPSBvYmplY3QuZGVzY3JpcHRpb25cclxuXHJcbiAgdGFza01haW4uYXBwZW5kQ2hpbGQoZmluaXNoVGFzaygpKVxyXG4gIHRhc2tNYWluLmFwcGVuZENoaWxkKHRpdGxlRGl2KVxyXG4gIHRhc2tNYWluLmFwcGVuZENoaWxkKGRhdGVEaXYpXHJcbiAgdGFza01haW4uYXBwZW5kQ2hpbGQoYnV0dG9uRGl2KVxyXG5cclxuICBidXR0b25EaXYuYXBwZW5kQ2hpbGQoZXhwYW5kVGFzaygpKVxyXG4gIGJ1dHRvbkRpdi5hcHBlbmRDaGlsZChlZGl0VGFzaygpKVxyXG4gIGJ1dHRvbkRpdi5hcHBlbmRDaGlsZChyZW1vdmVUYXNrKCkpXHJcblxyXG4gIGVsZW1lbnQuYXBwZW5kQ2hpbGQodGFza01haW4pXHJcbiAgZWxlbWVudC5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbkRpdilcclxuXHJcbiAgbGV0IGV4cGFuZCA9IGJ1dHRvbkRpdi5jaGlsZHJlblswXSxcclxuICAgICAgZWRpdCA9IGJ1dHRvbkRpdi5jaGlsZHJlblsxXSxcclxuICAgICAgcmVtb3ZlID0gYnV0dG9uRGl2LmNoaWxkcmVuWzJdLFxyXG4gICAgICBmaW5pc2ggPSB0YXNrTWFpbi5jaGlsZHJlblswXVxyXG4gIHJldHVybiB7XHJcbiAgICBlbGVtZW50LFxyXG4gICAgb2JqZWN0LFxyXG4gICAgZXhwYW5kLFxyXG4gICAgZWRpdCxcclxuICAgIHJlbW92ZSxcclxuICAgIGZpbmlzaFxyXG5cclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGluYm94QnV0dG9uID0gKCkgPT4ge1xyXG4gIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuXHJcbiAgZWxlbWVudC5pbm5lckhUTUwgPVxyXG4gICAgYFxyXG4gICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xOSwxNUgxNUEzLDMgMCAwLDEgMTIsMThBMywzIDAgMCwxIDksMTVINVY1SDE5TTE5LDNINUMzLjg5LDMgMywzLjkgMyw1VjE5QTIsMiAwIDAsMCA1LDIxSDE5QTIsMiAwIDAsMCAyMSwxOVY1QTIsMiAwIDAsMCAxOSwzWlwiIC8+XHJcbiAgICA8L3N2Zz5cclxuICAgIDxzcGFuPkluYm94PC9zcGFuPlxyXG4gICAgYFxyXG4gIGluYm94QnV0dG9uLmRhdGFzZXQuaWQgPSAnLTEnXHJcbiAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpbmJveCcpXHJcblxyXG4gIHJldHVybiBlbGVtZW50XHJcbn1cclxuXHJcbmNvbnN0IGNyZWF0ZUZvbGRlckJ1dHRvbiA9ICgpID0+IHtcclxuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcblxyXG4gIGVsZW1lbnQuaW5uZXJIVE1MID1cclxuICAgIGBcclxuICAgIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTMgMTlDMTMgMTkuMzQgMTMuMDQgMTkuNjcgMTMuMDkgMjBINEMyLjkgMjAgMiAxOS4xMSAyIDE4VjZDMiA0Ljg5IDIuODkgNCA0IDRIMTBMMTIgNkgyMEMyMS4xIDYgMjIgNi44OSAyMiA4VjEzLjgxQzIxLjM5IDEzLjQ2IDIwLjcyIDEzLjIyIDIwIDEzLjA5VjhINFYxOEgxMy4wOUMxMy4wNCAxOC4zMyAxMyAxOC42NiAxMyAxOU0yMCAxOFYxNUgxOFYxOEgxNVYyMEgxOFYyM0gyMFYyMEgyM1YxOEgyMFpcIiAvPlxyXG4gICAgPC9zdmc+XHJcbiAgICA8c3Bhbj5DcmVhdGUgRm9sZGVyPC9zcGFuPlxyXG4gICAgYFxyXG5cclxuICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NyZWF0ZS1mb2xkZXInKVxyXG5cclxuICByZXR1cm4gZWxlbWVudFxyXG5cclxufVxyXG5cclxuY29uc3QgZm9sZGVyVUkgPSAoZm9sZGVyVGl0bGU9XCJcIikgPT4ge1xyXG4gIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSxcclxuICAgICAgc2F2ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpLFxyXG4gICAgICBjYW5jZWxCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxyXG4gIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZm9sZGVyLXVpJylcclxuICBzYXZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3NhdmUtZm9sZGVyJylcclxuICBjYW5jZWxCdXR0b24uY2xhc3NMaXN0LmFkZCgnY2FuY2VsLWZvbGRlcicpXHJcbiAgaW5wdXQuaWQgPSAnZm9sZGVyLXRpdGxlJ1xyXG5cclxuICBzYXZlQnV0dG9uLmlubmVySFRNTCA9XHJcbiAgICBgXHJcbiAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNNSAxOVY1SDEyVjEySDE5VjEzQzE5LjcgMTMgMjAuMzcgMTMuMTMgMjEgMTMuMzVWOUwxNSAzSDVDMy44OSAzIDMgMy44OSAzIDVWMTlDMyAyMC4xIDMuODkgMjEgNSAyMUgxMy4zNUMxMy4xMyAyMC4zNyAxMyAxOS43IDEzIDE5SDVNMTQgNC41TDE5LjUgMTBIMTRWNC41TTIyLjUgMTcuMjVMMTcuNzUgMjJMMTUgMTlMMTYuMTYgMTcuODRMMTcuNzUgMTkuNDNMMjEuMzQgMTUuODRMMjIuNSAxNy4yNVpcIiAvPlxyXG4gICAgPC9zdmc+XHJcbiAgICBgXHJcbiAgY2FuY2VsQnV0dG9uLmlubmVySFRNTCA9XHJcbiAgICBgXHJcbiAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTIsMjBDNy41OSwyMCA0LDE2LjQxIDQsMTJDNCw3LjU5IDcuNTksNCAxMiw0QzE2LjQxLDQgMjAsNy41OSAyMCwxMkMyMCwxNi40MSAxNi40MSwyMCAxMiwyME0xMiwyQzYuNDcsMiAyLDYuNDcgMiwxMkMyLDE3LjUzIDYuNDcsMjIgMTIsMjJDMTcuNTMsMjIgMjIsMTcuNTMgMjIsMTJDMjIsNi40NyAxNy41MywyIDEyLDJNMTQuNTksOEwxMiwxMC41OUw5LjQxLDhMOCw5LjQxTDEwLjU5LDEyTDgsMTQuNTlMOS40MSwxNkwxMiwxMy40MUwxNC41OSwxNkwxNiwxNC41OUwxMy40MSwxMkwxNiw5LjQxTDE0LjU5LDhaXCIgLz5cclxuICAgIDwvc3ZnPlxyXG5cclxuICAgIGBcclxuICBlbGVtZW50LmFwcGVuZENoaWxkKGlucHV0KVxyXG4gIGVsZW1lbnQuYXBwZW5kQ2hpbGQoc2F2ZUJ1dHRvbilcclxuICBlbGVtZW50LmFwcGVuZENoaWxkKGNhbmNlbEJ1dHRvbilcclxuICByZXR1cm4ge1xyXG4gICAgZWxlbWVudCxcclxuICAgIGlucHV0LFxyXG4gICAgc2F2ZUJ1dHRvbixcclxuICAgIGNhbmNlbEJ1dHRvblxyXG4gIH1cclxuXHJcbn1cclxuXHJcblxyXG5jb25zdCBmb2xkZXJJdGVtID0gKGl0ZW1PYmplY3QpID0+IHtcclxuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXHJcblxyXG5cclxuICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ZvbGRlci1pdGVtJylcclxuICBlbGVtZW50LmRhdGFzZXQuaWQgPSBpdGVtT2JqZWN0Lml0ZW1JRFxyXG4gIGVsZW1lbnQudGV4dENvbnRlbnQgPSBpdGVtT2JqZWN0LmZvbGRlck5hbWVcclxuXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBlbGVtZW50XHJcbiAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHtcclxuICBuZXdUYXNrQnV0dG9uLFxyXG4gIHRhc2tVaSxcclxuICB0YXNrSXRlbSxcclxuICBpbmJveEJ1dHRvbixcclxuICBjcmVhdGVGb2xkZXJCdXR0b24sXHJcbiAgZm9sZGVyVUksXHJcbiAgZm9sZGVySXRlbVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXHJcblxyXG5cclxuY29uc3QgZWRpdERvbSA9IHJlcXVpcmUoJy4vZWRpdERvbScpXHJcbmNvbnN0IG1haW5GdW5jdGlvbnMgPSByZXF1aXJlKCcuL21haW5GdW5jdGlvbnMnKVxyXG5tYWluRnVuY3Rpb25zLnJlbG9hZERvbSgpXHJcbmVkaXREb20ubmV3VGFza0J1dHRvbigpXHJcbmVkaXREb20uaW5ib3hCdXR0b24oKVxyXG5lZGl0RG9tLmNyZWF0ZUZvbGRlckJ1dHRvbigpXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==