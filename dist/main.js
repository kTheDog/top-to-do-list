/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dynamicStyles.js":
/*!******************************!*\
  !*** ./src/dynamicStyles.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hoverFolderItem": () => (/* binding */ hoverFolderItem)
/* harmony export */ });


const hoverFolderItem = (folder) => {
  folder.deleteItem.classList.toggle('hide')
}








/***/ }),

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
const dynamicStyles = __webpack_require__(/*! ./dynamicStyles */ "./src/dynamicStyles.js")

const newTaskButton = () => {
  let element = supplyElement.newTaskButton()
  element.addEventListener('click', () => mainFunctions.newTaskButton(element))
  listDiv.appendChild(element)
}

const taskUi = (replaceThis, ui = supplyElement.taskUi()) => {
  ui.addButton.addEventListener('click', () => mainFunctions.greenButton(ui))
  /*take this out if you wanna allow multiple task edits at the same time */

  ui.cancelButton.addEventListener('click', () => mainFunctions.redButton())

  let prioButtons = [ui.prioButtons.children[0], ui.prioButtons.children[1], ui.prioButtons.children[2]];

  prioButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      mainFunctions.prioButtons(ui, btn)
    })
  })




  if (replaceThis.className === 'new-task') {
    mainFunctions.reloadDom()
    listDiv.appendChild(ui.element)
  } else {
  replaceThis.replaceWith(ui.element)
  }
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

  UI.cancelButton.addEventListener('click', () => {
    mainFunctions.cancelFolderButton()
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
  });

  item.deleteItem.addEventListener('click', () => {
    mainFunctions.deleteFolderButton(item)
  });

  ['mouseenter', 'mouseleave'].forEach((e) => {
    item.element.addEventListener(e, ()=> {
      dynamicStyles.hoverFolderItem(item)
    })
  });




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
/* harmony export */   "cancelFolderButton": () => (/* binding */ cancelFolderButton),
/* harmony export */   "createFolderButton": () => (/* binding */ createFolderButton),
/* harmony export */   "deleteFolderButton": () => (/* binding */ deleteFolderButton),
/* harmony export */   "editTaskButton": () => (/* binding */ editTaskButton),
/* harmony export */   "expandTaskButton": () => (/* binding */ expandTaskButton),
/* harmony export */   "finishTaskButton": () => (/* binding */ finishTaskButton),
/* harmony export */   "greenButton": () => (/* binding */ greenButton),
/* harmony export */   "inboxButton": () => (/* binding */ inboxButton),
/* harmony export */   "newTaskButton": () => (/* binding */ newTaskButton),
/* harmony export */   "prioButtons": () => (/* binding */ prioButtons),
/* harmony export */   "redButton": () => (/* binding */ redButton),
/* harmony export */   "reloadDom": () => (/* binding */ reloadDom),
/* harmony export */   "reloadSideBar": () => (/* binding */ reloadSideBar),
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
  console.log(UI)
  object.title = UI.inpTitle.value
  object.description = UI.inpDescription.value
  object.date = UI.inpDate.value
  object.priority = UI.priority
  object.id = UI.id || itemID
  object.folder = localStorage.getItem('selectedFolder')

  let taskStorage = JSON.parse(localStorage.getItem('taskStorage')) || {}
  taskStorage[object.id] = object

  localStorage.setItem('ID', itemID)
  localStorage.setItem('taskStorage', JSON.stringify(taskStorage))
}

const reloadDom = () => {
  listDiv.innerHTML = ""
  let selected = localStorage.getItem('selectedFolder')
  let storage = JSON.parse(localStorage.getItem('taskStorage'))
  for (let key in storage) {
    let obj = storage[key]
    if (selected === obj.folder || selected === 'inbox') {
      editDom.taskItem(obj)
    }
  }

}

const newTaskButton = (button) => {
  editDom.taskUi(button)
}

const greenButton = (UI) => {
  if (!(UI.inpTitle.value && UI.inpDate.value && UI.inpDescription.value && UI.priority)) {
    alert('Please fill in all fields')
    return;
  }
  addToJson(UI),
  reloadDom(),
  editDom.newTaskButton()
}

const redButton = () => {
  reloadDom()
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

  let taskStorage =JSON.parse(localStorage.getItem('taskStorage'))
  delete taskStorage[JSON.stringify(object.id)]
  localStorage.setItem('taskStorage', JSON.stringify(taskStorage))

}

const removeTaskButton = (element, id) => {
  element.remove()
  let taskStorage = JSON.parse(localStorage.getItem('taskStorage'))
  console.log(taskStorage, taskStorage[+id], id)
  delete taskStorage[id]
  console.log(taskStorage[JSON.stringify(id)])
  localStorage.setItem('taskStorage', JSON.stringify(taskStorage))
}

const expandTaskButton = (element) => {
  let referenceDescription = element.children[1],
      referenceButton = element.children[0].children[3].children[0]

  let collapse =
  `
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"></path>
</svg>

  `;
  let expand =
  `
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
</svg>

  `;

  if (referenceButton.innerHTML == collapse) {
    referenceButton.innerHTML = expand
  } else {
    referenceButton.innerHTML = collapse
  }



  referenceDescription.classList.toggle('hide')
}

const finishTaskButton = (element) => {
  let target = element.nextElementSibling
  console.log(element)
  let unfinished =
    `
    <svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
    </svg>
    `
  let finished =
    `
    <svg viewBox="0 0 24 24">
      <path fill="green" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path>
    </svg>
    `
  if (finished == element.innerHTML) {
    element.innerHTML = unfinished
  } else {
    console.log('h')
    element.innerHTML = finished
  }

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

const cancelFolderButton = () => {
  reloadSideBar()
}

const reloadSideBar = () => {

  sideBar.innerHTML = ""

  editDom.inboxButton()
  editDom.createFolderButton()

  let folderStorage = JSON.parse(localStorage.getItem('folderStorage'))

  for (let key in folderStorage) {
    editDom.folderItem(folderStorage[key])
  }

}

const deleteFolderButton = (item) => {
  let storage = JSON.parse(localStorage.getItem('folderStorage'))
  delete storage[item.name];
  localStorage.setItem('folderStorage', JSON.stringify(storage))
}

const selectFolder = (itemObject) => {

  reloadSideBar()
  let target = sideBar.querySelector(`[data-id="${itemObject.itemID}"]`)
  localStorage.setItem('selectedFolder', itemObject.folderName)
  target.classList.add('selected-folder')
  reloadDom()
  editDom.newTaskButton()

}


const inboxButton = () => {
  selectFolder({folderName: "inbox", itemID: -1})
}

const prioButtons = (ui, btn) => {
  console.log(ui)
  console.log(btn)
  ui.priority = btn.id

  ui.prioButtons.children[0].classList.remove('current-prio')
  ui.prioButtons.children[1].classList.remove('current-prio')
  ui.prioButtons.children[2].classList.remove('current-prio')

  btn.classList.add('current-prio')
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
    <button id="low"></button>
    <button id="medium"></button>
    <button id="high"></button>
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
      cancelButton = element.children[2].children[1],
      prioButtons = element.children[0].children[2]
      priority = ""
/*
  title = inpTitle.textContent
  date = inpDate.textContent
  description = inpDescription.textContent
*/

  return {
    element, inpTitle, inpDate, inpDescription, addButton, cancelButton, priority, id, prioButtons
  }

}

const expandTask = () => {
  let element = document.createElement('button')


  let expand =
  `
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
</svg>

  `

  element.className = 'expand-task'
  element.innerHTML = expand

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

const finishTask = (prio) => {
  let element = document.createElement('button')
  element.dataset.priority = prio
  element.className = 'finish-task'
  element.innerHTML =
  `
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
  </svg>
  `

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

  taskMain.appendChild(finishTask(object.priority))
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
  element.dataset.id = '-1'
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
  let element = document.createElement('div'),
      deleteItem = document.createElement('div')
      name = itemObject.folderName

  element.classList.add('folder-item')
  deleteItem.classList.add('delete-folder')
  deleteItem.classList.add('hide')
  element.dataset.id = itemObject.itemID

  deleteItem.innerHTML =
    `
    <svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
    </svg>
    `
  element.innerHTML =
   `
   <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z" />
    </svg>

    <span>`+ itemObject.folderName + `</span>
   `

  element.appendChild(deleteItem)

  return {
    element,
    deleteItem,
    name
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
mainFunctions.reloadSideBar()

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Qsa0JBQWtCO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixnQ0FBZ0M7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWtCQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25PRDtBQUNBLHNCQUFzQixtQkFBTyxDQUFDLCtDQUFpQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFTQzs7Ozs7OztVQ2pTRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixtQkFBTyxDQUFDLG1DQUFXO0FBQ25DLHNCQUFzQixtQkFBTyxDQUFDLCtDQUFpQjtBQUMvQztBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtdG8tZG8tbGlzdC8uL3NyYy9keW5hbWljU3R5bGVzLmpzIiwid2VicGFjazovL3RvcC10by1kby1saXN0Ly4vc3JjL2VkaXREb20uanMiLCJ3ZWJwYWNrOi8vdG9wLXRvLWRvLWxpc3QvLi9zcmMvbWFpbkZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly90b3AtdG8tZG8tbGlzdC8uL3NyYy9zdXBwbHlFbGVtZW50LmpzIiwid2VicGFjazovL3RvcC10by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvcC10by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b3AtdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvcC10by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9wLXRvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5jb25zdCBob3ZlckZvbGRlckl0ZW0gPSAoZm9sZGVyKSA9PiB7XHJcbiAgZm9sZGVyLmRlbGV0ZUl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQge1xyXG4gIGhvdmVyRm9sZGVySXRlbVxyXG59XHJcbiIsImNvbnN0IHN1cHBseUVsZW1lbnQgPSByZXF1aXJlKCcuL3N1cHBseUVsZW1lbnQnKVxyXG5jb25zdCBtYWluRnVuY3Rpb25zID0gcmVxdWlyZSgnLi9tYWluRnVuY3Rpb25zJylcclxuY29uc3QgbGlzdERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0JylcclxuY29uc3Qgc2lkZUJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlLWJhcicpXHJcbmNvbnN0IGR5bmFtaWNTdHlsZXMgPSByZXF1aXJlKCcuL2R5bmFtaWNTdHlsZXMnKVxyXG5cclxuY29uc3QgbmV3VGFza0J1dHRvbiA9ICgpID0+IHtcclxuICBsZXQgZWxlbWVudCA9IHN1cHBseUVsZW1lbnQubmV3VGFza0J1dHRvbigpXHJcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IG1haW5GdW5jdGlvbnMubmV3VGFza0J1dHRvbihlbGVtZW50KSlcclxuICBsaXN0RGl2LmFwcGVuZENoaWxkKGVsZW1lbnQpXHJcbn1cclxuXHJcbmNvbnN0IHRhc2tVaSA9IChyZXBsYWNlVGhpcywgdWkgPSBzdXBwbHlFbGVtZW50LnRhc2tVaSgpKSA9PiB7XHJcbiAgdWkuYWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gbWFpbkZ1bmN0aW9ucy5ncmVlbkJ1dHRvbih1aSkpXHJcbiAgLyp0YWtlIHRoaXMgb3V0IGlmIHlvdSB3YW5uYSBhbGxvdyBtdWx0aXBsZSB0YXNrIGVkaXRzIGF0IHRoZSBzYW1lIHRpbWUgKi9cclxuXHJcbiAgdWkuY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gbWFpbkZ1bmN0aW9ucy5yZWRCdXR0b24oKSlcclxuXHJcbiAgbGV0IHByaW9CdXR0b25zID0gW3VpLnByaW9CdXR0b25zLmNoaWxkcmVuWzBdLCB1aS5wcmlvQnV0dG9ucy5jaGlsZHJlblsxXSwgdWkucHJpb0J1dHRvbnMuY2hpbGRyZW5bMl1dO1xyXG5cclxuICBwcmlvQnV0dG9ucy5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIG1haW5GdW5jdGlvbnMucHJpb0J1dHRvbnModWksIGJ0bilcclxuICAgIH0pXHJcbiAgfSlcclxuXHJcblxyXG5cclxuXHJcbiAgaWYgKHJlcGxhY2VUaGlzLmNsYXNzTmFtZSA9PT0gJ25ldy10YXNrJykge1xyXG4gICAgbWFpbkZ1bmN0aW9ucy5yZWxvYWREb20oKVxyXG4gICAgbGlzdERpdi5hcHBlbmRDaGlsZCh1aS5lbGVtZW50KVxyXG4gIH0gZWxzZSB7XHJcbiAgcmVwbGFjZVRoaXMucmVwbGFjZVdpdGgodWkuZWxlbWVudClcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IHRhc2tJdGVtID0gKG9iamVjdCkgPT4ge1xyXG4gIGxldCB0YXNrSXRlbSA9IHN1cHBseUVsZW1lbnQudGFza0l0ZW0ob2JqZWN0KVxyXG5cclxuXHJcbiAgdGFza0l0ZW0uZmluaXNoLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgbWFpbkZ1bmN0aW9ucy5maW5pc2hUYXNrQnV0dG9uKHRhc2tJdGVtLmZpbmlzaClcclxuICB9KVxyXG5cclxuICB0YXNrSXRlbS5yZW1vdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBtYWluRnVuY3Rpb25zLnJlbW92ZVRhc2tCdXR0b24odGFza0l0ZW0uZWxlbWVudCwgb2JqZWN0LmlkKVxyXG4gIH0pXHJcblxyXG4gIHRhc2tJdGVtLmVkaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcblxyXG4gICAgbWFpbkZ1bmN0aW9ucy5lZGl0VGFza0J1dHRvbihvYmplY3QpXHJcbiAgfSlcclxuXHJcbiAgdGFza0l0ZW0uZXhwYW5kLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cclxuICAgIG1haW5GdW5jdGlvbnMuZXhwYW5kVGFza0J1dHRvbih0YXNrSXRlbS5lbGVtZW50KVxyXG5cclxuICB9KVxyXG5cclxuXHJcblxyXG4gIGxpc3REaXYuYXBwZW5kQ2hpbGQodGFza0l0ZW0uZWxlbWVudClcclxufVxyXG5cclxuY29uc3QgaW5ib3hCdXR0b24gPSAoKSA9PiB7XHJcbiAgbGV0IGluYm94QnV0dG9uID0gc3VwcGx5RWxlbWVudC5pbmJveEJ1dHRvbigpXHJcblxyXG4gIGluYm94QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gbWFpbkZ1bmN0aW9ucy5pbmJveEJ1dHRvbigpKVxyXG4gIHNpZGVCYXIuYXBwZW5kQ2hpbGQoaW5ib3hCdXR0b24pXHJcbn1cclxuXHJcbmNvbnN0IGZvbGRlclVJID0gKCkgPT4ge1xyXG4gIGxldCBVSSA9IHN1cHBseUVsZW1lbnQuZm9sZGVyVUkoKVxyXG5cclxuICBsZXQgcmVwbGFjZVRoaXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3JlYXRlLWZvbGRlcicpXHJcblxyXG4gIFVJLnNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBtYWluRnVuY3Rpb25zLnNhdmVGb2xkZXJCdXR0b24oVUkuaW5wdXQudmFsdWUpXHJcbiAgfSlcclxuXHJcbiAgVUkuY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgbWFpbkZ1bmN0aW9ucy5jYW5jZWxGb2xkZXJCdXR0b24oKVxyXG4gIH0pXHJcblxyXG4gIHJlcGxhY2VUaGlzLnJlcGxhY2VXaXRoKFVJLmVsZW1lbnQpXHJcbn1cclxuY29uc3QgY3JlYXRlRm9sZGVyQnV0dG9uID0gKCkgPT4ge1xyXG4gIGxldCBjcmVhdGVGb2xkZXJCdXR0b24gPSBzdXBwbHlFbGVtZW50LmNyZWF0ZUZvbGRlckJ1dHRvbigpXHJcblxyXG4gIGNyZWF0ZUZvbGRlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIG1haW5GdW5jdGlvbnMuY3JlYXRlRm9sZGVyQnV0dG9uKClcclxuICB9KVxyXG5cclxuXHJcblxyXG4gIHNpZGVCYXIuYXBwZW5kQ2hpbGQoY3JlYXRlRm9sZGVyQnV0dG9uKVxyXG59XHJcblxyXG5jb25zdCBmb2xkZXJJdGVtID0gKGl0ZW1PYmplY3QpID0+IHtcclxuICBsZXQgaXRlbSA9IHN1cHBseUVsZW1lbnQuZm9sZGVySXRlbShpdGVtT2JqZWN0KVxyXG5cclxuICBpdGVtLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBtYWluRnVuY3Rpb25zLnNlbGVjdEZvbGRlcihpdGVtT2JqZWN0KVxyXG4gIH0pO1xyXG5cclxuICBpdGVtLmRlbGV0ZUl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBtYWluRnVuY3Rpb25zLmRlbGV0ZUZvbGRlckJ1dHRvbihpdGVtKVxyXG4gIH0pO1xyXG5cclxuICBbJ21vdXNlZW50ZXInLCAnbW91c2VsZWF2ZSddLmZvckVhY2goKGUpID0+IHtcclxuICAgIGl0ZW0uZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGUsICgpPT4ge1xyXG4gICAgICBkeW5hbWljU3R5bGVzLmhvdmVyRm9sZGVySXRlbShpdGVtKVxyXG4gICAgfSlcclxuICB9KTtcclxuXHJcblxyXG5cclxuXHJcbiAgc2lkZUJhci5hcHBlbmRDaGlsZChpdGVtLmVsZW1lbnQpXHJcbn1cclxuXHJcblxyXG5leHBvcnQge1xyXG4gIG5ld1Rhc2tCdXR0b24sXHJcbiAgdGFza1VpLFxyXG4gIHRhc2tJdGVtLFxyXG4gIGluYm94QnV0dG9uLFxyXG4gIGNyZWF0ZUZvbGRlckJ1dHRvbixcclxuICBmb2xkZXJVSSxcclxuICBmb2xkZXJJdGVtXHJcbn1cclxuIiwiY29uc3Qgc3VwcGx5RWxlbWVudCA9IHJlcXVpcmUoJy4vc3VwcGx5RWxlbWVudCcpXHJcbmNvbnN0IGVkaXREb20gPSByZXF1aXJlKCcuL2VkaXREb20nKVxyXG5jb25zdCBsaXN0RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpc3QnKVxyXG5jb25zdCBzaWRlQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGUtYmFyJylcclxuXHJcbmNvbnN0IGFkZFRvSnNvbiA9IChVSSkgPT4ge1xyXG4gIGxldCBvYmplY3QgPSB7fSxcclxuICAgICAgaXRlbUlEID0gK2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdJRCcpICsgMVxyXG4gIGNvbnNvbGUubG9nKFVJKVxyXG4gIG9iamVjdC50aXRsZSA9IFVJLmlucFRpdGxlLnZhbHVlXHJcbiAgb2JqZWN0LmRlc2NyaXB0aW9uID0gVUkuaW5wRGVzY3JpcHRpb24udmFsdWVcclxuICBvYmplY3QuZGF0ZSA9IFVJLmlucERhdGUudmFsdWVcclxuICBvYmplY3QucHJpb3JpdHkgPSBVSS5wcmlvcml0eVxyXG4gIG9iamVjdC5pZCA9IFVJLmlkIHx8IGl0ZW1JRFxyXG4gIG9iamVjdC5mb2xkZXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2VsZWN0ZWRGb2xkZXInKVxyXG5cclxuICBsZXQgdGFza1N0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrU3RvcmFnZScpKSB8fCB7fVxyXG4gIHRhc2tTdG9yYWdlW29iamVjdC5pZF0gPSBvYmplY3RcclxuXHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0lEJywgaXRlbUlEKVxyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0YXNrU3RvcmFnZScsIEpTT04uc3RyaW5naWZ5KHRhc2tTdG9yYWdlKSlcclxufVxyXG5cclxuY29uc3QgcmVsb2FkRG9tID0gKCkgPT4ge1xyXG4gIGxpc3REaXYuaW5uZXJIVE1MID0gXCJcIlxyXG4gIGxldCBzZWxlY3RlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZWxlY3RlZEZvbGRlcicpXHJcbiAgbGV0IHN0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrU3RvcmFnZScpKVxyXG4gIGZvciAobGV0IGtleSBpbiBzdG9yYWdlKSB7XHJcbiAgICBsZXQgb2JqID0gc3RvcmFnZVtrZXldXHJcbiAgICBpZiAoc2VsZWN0ZWQgPT09IG9iai5mb2xkZXIgfHwgc2VsZWN0ZWQgPT09ICdpbmJveCcpIHtcclxuICAgICAgZWRpdERvbS50YXNrSXRlbShvYmopXHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG5cclxuY29uc3QgbmV3VGFza0J1dHRvbiA9IChidXR0b24pID0+IHtcclxuICBlZGl0RG9tLnRhc2tVaShidXR0b24pXHJcbn1cclxuXHJcbmNvbnN0IGdyZWVuQnV0dG9uID0gKFVJKSA9PiB7XHJcbiAgaWYgKCEoVUkuaW5wVGl0bGUudmFsdWUgJiYgVUkuaW5wRGF0ZS52YWx1ZSAmJiBVSS5pbnBEZXNjcmlwdGlvbi52YWx1ZSAmJiBVSS5wcmlvcml0eSkpIHtcclxuICAgIGFsZXJ0KCdQbGVhc2UgZmlsbCBpbiBhbGwgZmllbGRzJylcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgYWRkVG9Kc29uKFVJKSxcclxuICByZWxvYWREb20oKSxcclxuICBlZGl0RG9tLm5ld1Rhc2tCdXR0b24oKVxyXG59XHJcblxyXG5jb25zdCByZWRCdXR0b24gPSAoKSA9PiB7XHJcbiAgcmVsb2FkRG9tKClcclxuICBlZGl0RG9tLm5ld1Rhc2tCdXR0b24oKVxyXG59XHJcblxyXG5jb25zdCBlZGl0VGFza0J1dHRvbiA9IChvYmplY3QpID0+IHtcclxuICAvKnRha2UgdGhpcyBvdXQgaWYgeW91IHdhbm5hIGFsbG93IG11bHRpcGxlIHRhc2sgZWRpdHMgYXQgdGhlIHNhbWUgdGltZSAqL1xyXG4gIHJlbG9hZERvbSgpXHJcbiAgZWRpdERvbS5uZXdUYXNrQnV0dG9uKClcclxuXHJcbiAgbGV0IHJlcGxhY2VtZW50ID0gc3VwcGx5RWxlbWVudC50YXNrVWkoKSxcclxuICAgICAgcmVwbGFjZVRoaXMgPSBsaXN0RGl2LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWlkPVwiJHtvYmplY3QuaWR9XCJdYClcclxuXHJcblxyXG4gIHJlcGxhY2VtZW50LmlucERhdGUudmFsdWUgPSBvYmplY3QuZGF0ZVxyXG4gIHJlcGxhY2VtZW50LmlucFRpdGxlLnZhbHVlID0gb2JqZWN0LnRpdGxlXHJcbiAgcmVwbGFjZW1lbnQuaW5wRGVzY3JpcHRpb24udmFsdWUgPSBvYmplY3QuZGVzY3JpcHRpb25cclxuICByZXBsYWNlbWVudC5wcmlvcml0eSA9IG9iamVjdC5wcmlvcml0eVxyXG4gIHJlcGxhY2VtZW50LmlkID0gb2JqZWN0LmlkXHJcbiAgZWRpdERvbS50YXNrVWkocmVwbGFjZVRoaXMsIHJlcGxhY2VtZW50KVxyXG5cclxuICBsZXQgdGFza1N0b3JhZ2UgPUpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rhc2tTdG9yYWdlJykpXHJcbiAgZGVsZXRlIHRhc2tTdG9yYWdlW0pTT04uc3RyaW5naWZ5KG9iamVjdC5pZCldXHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rhc2tTdG9yYWdlJywgSlNPTi5zdHJpbmdpZnkodGFza1N0b3JhZ2UpKVxyXG5cclxufVxyXG5cclxuY29uc3QgcmVtb3ZlVGFza0J1dHRvbiA9IChlbGVtZW50LCBpZCkgPT4ge1xyXG4gIGVsZW1lbnQucmVtb3ZlKClcclxuICBsZXQgdGFza1N0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrU3RvcmFnZScpKVxyXG4gIGNvbnNvbGUubG9nKHRhc2tTdG9yYWdlLCB0YXNrU3RvcmFnZVsraWRdLCBpZClcclxuICBkZWxldGUgdGFza1N0b3JhZ2VbaWRdXHJcbiAgY29uc29sZS5sb2codGFza1N0b3JhZ2VbSlNPTi5zdHJpbmdpZnkoaWQpXSlcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGFza1N0b3JhZ2UnLCBKU09OLnN0cmluZ2lmeSh0YXNrU3RvcmFnZSkpXHJcbn1cclxuXHJcbmNvbnN0IGV4cGFuZFRhc2tCdXR0b24gPSAoZWxlbWVudCkgPT4ge1xyXG4gIGxldCByZWZlcmVuY2VEZXNjcmlwdGlvbiA9IGVsZW1lbnQuY2hpbGRyZW5bMV0sXHJcbiAgICAgIHJlZmVyZW5jZUJ1dHRvbiA9IGVsZW1lbnQuY2hpbGRyZW5bMF0uY2hpbGRyZW5bM10uY2hpbGRyZW5bMF1cclxuXHJcbiAgbGV0IGNvbGxhcHNlID1cclxuICBgXHJcbiAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk03LjQxLDE1LjQxTDEyLDEwLjgzTDE2LjU5LDE1LjQxTDE4LDE0TDEyLDhMNiwxNEw3LjQxLDE1LjQxWlwiPjwvcGF0aD5cclxuPC9zdmc+XHJcblxyXG4gIGA7XHJcbiAgbGV0IGV4cGFuZCA9XHJcbiAgYFxyXG4gIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNNy40MSw4LjU4TDEyLDEzLjE3TDE2LjU5LDguNThMMTgsMTBMMTIsMTZMNiwxMEw3LjQxLDguNThaXCI+PC9wYXRoPlxyXG48L3N2Zz5cclxuXHJcbiAgYDtcclxuXHJcbiAgaWYgKHJlZmVyZW5jZUJ1dHRvbi5pbm5lckhUTUwgPT0gY29sbGFwc2UpIHtcclxuICAgIHJlZmVyZW5jZUJ1dHRvbi5pbm5lckhUTUwgPSBleHBhbmRcclxuICB9IGVsc2Uge1xyXG4gICAgcmVmZXJlbmNlQnV0dG9uLmlubmVySFRNTCA9IGNvbGxhcHNlXHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIHJlZmVyZW5jZURlc2NyaXB0aW9uLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKVxyXG59XHJcblxyXG5jb25zdCBmaW5pc2hUYXNrQnV0dG9uID0gKGVsZW1lbnQpID0+IHtcclxuICBsZXQgdGFyZ2V0ID0gZWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmdcclxuICBjb25zb2xlLmxvZyhlbGVtZW50KVxyXG4gIGxldCB1bmZpbmlzaGVkID1cclxuICAgIGBcclxuICAgIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xMiwyMEE4LDggMCAwLDEgNCwxMkE4LDggMCAwLDEgMTIsNEE4LDggMCAwLDEgMjAsMTJBOCw4IDAgMCwxIDEyLDIwTTEyLDJBMTAsMTAgMCAwLDAgMiwxMkExMCwxMCAwIDAsMCAxMiwyMkExMCwxMCAwIDAsMCAyMiwxMkExMCwxMCAwIDAsMCAxMiwyWlwiLz5cclxuICAgIDwvc3ZnPlxyXG4gICAgYFxyXG4gIGxldCBmaW5pc2hlZCA9XHJcbiAgICBgXHJcbiAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgPHBhdGggZmlsbD1cImdyZWVuXCIgZD1cIk0yMSw3TDksMTlMMy41LDEzLjVMNC45MSwxMi4wOUw5LDE2LjE3TDE5LjU5LDUuNTlMMjEsN1pcIj48L3BhdGg+XHJcbiAgICA8L3N2Zz5cclxuICAgIGBcclxuICBpZiAoZmluaXNoZWQgPT0gZWxlbWVudC5pbm5lckhUTUwpIHtcclxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gdW5maW5pc2hlZFxyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmxvZygnaCcpXHJcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGZpbmlzaGVkXHJcbiAgfVxyXG5cclxuICB0YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnZmluaXNoZWQnKVxyXG59XHJcblxyXG5jb25zdCBjcmVhdGVGb2xkZXJCdXR0b24gPSAoKSA9PiB7XHJcbiAgZWRpdERvbS5mb2xkZXJVSSgpXHJcbn1cclxuXHJcbmNvbnN0IHNhdmVGb2xkZXJCdXR0b24gPSAodmFsdWUpID0+IHtcclxuICBpZiAoIXZhbHVlKSB7YWxlcnQoJ1BsZWFzZSBlbnRlciBhIG5hbWUgZm9yIHlvdXIgZm9sZGVyJyl9XHJcbiAgbGV0IGZvbGRlclN0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmb2xkZXJTdG9yYWdlJykpIHx8IHt9LFxyXG4gICAgICBpdGVtSUQgPSArbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0lEJykgKyAxXHJcbiAgZm9sZGVyU3RvcmFnZVt2YWx1ZV0gPSB7Zm9sZGVyTmFtZTogdmFsdWUsIGl0ZW1JRH1cclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnSUQnLCBpdGVtSUQpXHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NlbGVjdGVkRm9sZGVyJywgSlNPTi5zdHJpbmdpZnkodmFsdWUpKVxyXG5cclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZm9sZGVyU3RvcmFnZScsIEpTT04uc3RyaW5naWZ5KGZvbGRlclN0b3JhZ2UpKVxyXG4gIHJlbG9hZFNpZGVCYXIoKVxyXG59XHJcblxyXG5jb25zdCBjYW5jZWxGb2xkZXJCdXR0b24gPSAoKSA9PiB7XHJcbiAgcmVsb2FkU2lkZUJhcigpXHJcbn1cclxuXHJcbmNvbnN0IHJlbG9hZFNpZGVCYXIgPSAoKSA9PiB7XHJcblxyXG4gIHNpZGVCYXIuaW5uZXJIVE1MID0gXCJcIlxyXG5cclxuICBlZGl0RG9tLmluYm94QnV0dG9uKClcclxuICBlZGl0RG9tLmNyZWF0ZUZvbGRlckJ1dHRvbigpXHJcblxyXG4gIGxldCBmb2xkZXJTdG9yYWdlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZm9sZGVyU3RvcmFnZScpKVxyXG5cclxuICBmb3IgKGxldCBrZXkgaW4gZm9sZGVyU3RvcmFnZSkge1xyXG4gICAgZWRpdERvbS5mb2xkZXJJdGVtKGZvbGRlclN0b3JhZ2Vba2V5XSlcclxuICB9XHJcblxyXG59XHJcblxyXG5jb25zdCBkZWxldGVGb2xkZXJCdXR0b24gPSAoaXRlbSkgPT4ge1xyXG4gIGxldCBzdG9yYWdlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZm9sZGVyU3RvcmFnZScpKVxyXG4gIGRlbGV0ZSBzdG9yYWdlW2l0ZW0ubmFtZV07XHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2ZvbGRlclN0b3JhZ2UnLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlKSlcclxufVxyXG5cclxuY29uc3Qgc2VsZWN0Rm9sZGVyID0gKGl0ZW1PYmplY3QpID0+IHtcclxuXHJcbiAgcmVsb2FkU2lkZUJhcigpXHJcbiAgbGV0IHRhcmdldCA9IHNpZGVCYXIucXVlcnlTZWxlY3RvcihgW2RhdGEtaWQ9XCIke2l0ZW1PYmplY3QuaXRlbUlEfVwiXWApXHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NlbGVjdGVkRm9sZGVyJywgaXRlbU9iamVjdC5mb2xkZXJOYW1lKVxyXG4gIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1mb2xkZXInKVxyXG4gIHJlbG9hZERvbSgpXHJcbiAgZWRpdERvbS5uZXdUYXNrQnV0dG9uKClcclxuXHJcbn1cclxuXHJcblxyXG5jb25zdCBpbmJveEJ1dHRvbiA9ICgpID0+IHtcclxuICBzZWxlY3RGb2xkZXIoe2ZvbGRlck5hbWU6IFwiaW5ib3hcIiwgaXRlbUlEOiAtMX0pXHJcbn1cclxuXHJcbmNvbnN0IHByaW9CdXR0b25zID0gKHVpLCBidG4pID0+IHtcclxuICBjb25zb2xlLmxvZyh1aSlcclxuICBjb25zb2xlLmxvZyhidG4pXHJcbiAgdWkucHJpb3JpdHkgPSBidG4uaWRcclxuXHJcbiAgdWkucHJpb0J1dHRvbnMuY2hpbGRyZW5bMF0uY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1wcmlvJylcclxuICB1aS5wcmlvQnV0dG9ucy5jaGlsZHJlblsxXS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LXByaW8nKVxyXG4gIHVpLnByaW9CdXR0b25zLmNoaWxkcmVuWzJdLmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtcHJpbycpXHJcblxyXG4gIGJ0bi5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXByaW8nKVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gIG5ld1Rhc2tCdXR0b24sXHJcbiAgZ3JlZW5CdXR0b24sXHJcbiAgcmVtb3ZlVGFza0J1dHRvbixcclxuICBlZGl0VGFza0J1dHRvbixcclxuICBleHBhbmRUYXNrQnV0dG9uLFxyXG4gIGZpbmlzaFRhc2tCdXR0b24sXHJcbiAgcmVsb2FkRG9tLFxyXG4gIGNyZWF0ZUZvbGRlckJ1dHRvbixcclxuICBzYXZlRm9sZGVyQnV0dG9uLFxyXG4gIHNlbGVjdEZvbGRlcixcclxuICBpbmJveEJ1dHRvbixcclxuICByZWxvYWRTaWRlQmFyLFxyXG4gIHJlZEJ1dHRvbixcclxuICBjYW5jZWxGb2xkZXJCdXR0b24sXHJcbiAgZGVsZXRlRm9sZGVyQnV0dG9uLFxyXG4gIHByaW9CdXR0b25zXHJcbn1cclxuIiwiXHJcbmNvbnN0IG1haW5GdW5jdGlvbnMgPSByZXF1aXJlKCcuL21haW5GdW5jdGlvbnMnKVxyXG5cclxuY29uc3QgbmV3VGFza0J1dHRvbiA9ICgpID0+IHtcclxuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXHJcblxyXG4gIGVsZW1lbnQuY2xhc3NOYW1lID0gJ25ldy10YXNrJ1xyXG4gIGVsZW1lbnQuaW5uZXJIVE1MID1cclxuICBgXHJcbiAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xOSwxM0gxM1YxOUgxMVYxM0g1VjExSDExVjVIMTNWMTFIMTlWMTNaXCIgLz5cclxuICA8L3N2Zz5cclxuICA8c3Bhbj4gTmV3IFRhc2suLi5cclxuXHJcbiAgYFxyXG4gIHJldHVybiBlbGVtZW50XHJcbn1cclxuXHJcbmNvbnN0IHRhc2tVaSA9ICh0aXRsZT1cIlwiLCBkZXNjcmlwdGlvbj1cIlwiLCBkYXRlPVwiXCIsIHByaW9yaXR5PVwiXCIsIGlkKSA9PiB7XHJcbiAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gIGVsZW1lbnQuaW5uZXJIVE1MID1cclxuICBgXHJcbjxkaXYgY2xhc3M9XCJ0b3Atcm93XCI+XHJcbiAgPGRpdiBpZD1cImFkZC10aXRsZVwiPlxyXG4gICAgPGxhYmVsIGZvcj1cInRpdGxlLWlucHV0XCI+VGl0bGU8L2xhYmVsPlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRpdGxlXCIgaWQ9XCJ0aXRsZS1pbnB1dFwiIHZhbHVlPVwiXCI+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBpZD1cInNlbGVjdC1kYXRlXCI+XHJcbiAgICA8bGFiZWwgZm9yPVwiZHVlLWRhdGVcIj48L2xhYmVsPlxyXG4gICAgPGlucHV0IHR5cGU9XCJkYXRlXCIgbmFtZT1cImR1ZS1kYXRlXCIgaWQ9XCJkdWUtZGF0ZVwiIHZhbHVlPVwiXCI+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBpZD1cInNlbGVjdC1wcmlvXCI+XHJcbiAgICA8YnV0dG9uIGlkPVwibG93XCI+PC9idXR0b24+XHJcbiAgICA8YnV0dG9uIGlkPVwibWVkaXVtXCI+PC9idXR0b24+XHJcbiAgICA8YnV0dG9uIGlkPVwiaGlnaFwiPjwvYnV0dG9uPlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuPGRpdiBpZD1cImFkZC1kZXNjcmlwdGlvblwiPlxyXG4gIDxsYWJlbCBmb3I9XCJkZXNjcmlwdGlvblwiPkRlc2NyaXB0aW9uPC9sYWJlbD5cclxuICA8dGV4dGFyZWEgbmFtZT1cImRlc2NyaXB0aW9uXCIgaWQ9XCJkZXNjcmlwdGlvblwiIHJvd3M9XCIxMFwiPjwvdGV4dGFyZWE+XHJcbjwvZGl2PlxyXG48ZGl2IGNsYXNzPVwiYnV0dG9uXCI+XHJcbiAgPGJ1dHRvbiBpZD1cImFkZFwiPlxyXG4gICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMjEsN0w5LDE5TDMuNSwxMy41TDQuOTEsMTIuMDlMOSwxNi4xN0wxOS41OSw1LjU5TDIxLDdaXCIgLz5cclxuICAgICAgPC9zdmc+XHJcbiAgPC9idXR0b24+XHJcbiAgPGJ1dHRvbiBpZD1cImNhbmNlbFwiPlxyXG4gICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTksNi40MUwxNy41OSw1TDEyLDEwLjU5TDYuNDEsNUw1LDYuNDFMMTAuNTksMTJMNSwxNy41OUw2LjQxLDE5TDEyLDEzLjQxTDE3LjU5LDE5TDE5LDE3LjU5TDEzLjQxLDEyTDE5LDYuNDFaXCIgLz5cclxuICAgICAgPC9zdmc+XHJcbiAgPC9idXR0b24+XHJcbjwvZGl2PlxyXG5cclxuICBgXHJcbiAgZWxlbWVudC5jbGFzc05hbWUgPSAndGFzay11aSdcclxuICBsZXQgaW5wVGl0bGUgPSBlbGVtZW50LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLFxyXG4gICAgICBpbnBEYXRlID0gZWxlbWVudC5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5jaGlsZHJlblsxXSxcclxuICAgICAgaW5wRGVzY3JpcHRpb24gPSBlbGVtZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuWzFdLFxyXG4gICAgICBhZGRCdXR0b24gPSBlbGVtZW50LmNoaWxkcmVuWzJdLmNoaWxkcmVuWzBdLFxyXG4gICAgICBjYW5jZWxCdXR0b24gPSBlbGVtZW50LmNoaWxkcmVuWzJdLmNoaWxkcmVuWzFdLFxyXG4gICAgICBwcmlvQnV0dG9ucyA9IGVsZW1lbnQuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMl1cclxuICAgICAgcHJpb3JpdHkgPSBcIlwiXHJcbi8qXHJcbiAgdGl0bGUgPSBpbnBUaXRsZS50ZXh0Q29udGVudFxyXG4gIGRhdGUgPSBpbnBEYXRlLnRleHRDb250ZW50XHJcbiAgZGVzY3JpcHRpb24gPSBpbnBEZXNjcmlwdGlvbi50ZXh0Q29udGVudFxyXG4qL1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZWxlbWVudCwgaW5wVGl0bGUsIGlucERhdGUsIGlucERlc2NyaXB0aW9uLCBhZGRCdXR0b24sIGNhbmNlbEJ1dHRvbiwgcHJpb3JpdHksIGlkLCBwcmlvQnV0dG9uc1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbmNvbnN0IGV4cGFuZFRhc2sgPSAoKSA9PiB7XHJcbiAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxyXG5cclxuXHJcbiAgbGV0IGV4cGFuZCA9XHJcbiAgYFxyXG4gIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNNy40MSw4LjU4TDEyLDEzLjE3TDE2LjU5LDguNThMMTgsMTBMMTIsMTZMNiwxMEw3LjQxLDguNThaXCIgLz5cclxuPC9zdmc+XHJcblxyXG4gIGBcclxuXHJcbiAgZWxlbWVudC5jbGFzc05hbWUgPSAnZXhwYW5kLXRhc2snXHJcbiAgZWxlbWVudC5pbm5lckhUTUwgPSBleHBhbmRcclxuXHJcbiAgcmV0dXJuIGVsZW1lbnRcclxufVxyXG5cclxuY29uc3QgcmVtb3ZlVGFzayA9ICgpID0+IHtcclxuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXHJcblxyXG4gIGVsZW1lbnQuY2xhc3NOYW1lID0gJ3JlbW92ZS10YXNrJ1xyXG4gIGVsZW1lbnQuaW5uZXJIVE1MID0gYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTYsMTlBMiwyIDAgMCwwIDgsMjFIMTZBMiwyIDAgMCwwIDE4LDE5VjdINlYxOU04LDlIMTZWMTlIOFY5TTE1LjUsNEwxNC41LDNIOS41TDguNSw0SDVWNkgxOVY0SDE1LjVaXCIgLz5cclxuPC9zdmc+YFxyXG5cclxuICByZXR1cm4gZWxlbWVudFxyXG59XHJcblxyXG5jb25zdCBlZGl0VGFzayA9ICgpID0+IHtcclxuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXHJcblxyXG4gIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2VkaXQtdGFzaydcclxuICBlbGVtZW50LmlubmVySFRNTCA9IGA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xNC4wNiw5TDE1LDkuOTRMNS45MiwxOUg1VjE4LjA4TDE0LjA2LDlNMTcuNjYsM0MxNy40MSwzIDE3LjE1LDMuMSAxNi45NiwzLjI5TDE1LjEzLDUuMTJMMTguODgsOC44N0wyMC43MSw3LjA0QzIxLjEsNi42NSAyMS4xLDYgMjAuNzEsNS42M0wxOC4zNywzLjI5QzE4LjE3LDMuMDkgMTcuOTIsMyAxNy42NiwzTTE0LjA2LDYuMTlMMywxNy4yNVYyMUg2Ljc1TDE3LjgxLDkuOTRMMTQuMDYsNi4xOVpcIiAvPlxyXG48L3N2Zz5gXHJcblxyXG4gIHJldHVybiBlbGVtZW50XHJcbn1cclxuXHJcbmNvbnN0IGZpbmlzaFRhc2sgPSAocHJpbykgPT4ge1xyXG4gIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcclxuICBlbGVtZW50LmRhdGFzZXQucHJpb3JpdHkgPSBwcmlvXHJcbiAgZWxlbWVudC5jbGFzc05hbWUgPSAnZmluaXNoLXRhc2snXHJcbiAgZWxlbWVudC5pbm5lckhUTUwgPVxyXG4gIGBcclxuICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTEyLDIwQTgsOCAwIDAsMSA0LDEyQTgsOCAwIDAsMSAxMiw0QTgsOCAwIDAsMSAyMCwxMkE4LDggMCAwLDEgMTIsMjBNMTIsMkExMCwxMCAwIDAsMCAyLDEyQTEwLDEwIDAgMCwwIDEyLDIyQTEwLDEwIDAgMCwwIDIyLDEyQTEwLDEwIDAgMCwwIDEyLDJaXCIvPlxyXG4gIDwvc3ZnPlxyXG4gIGBcclxuXHJcbiAgcmV0dXJuIGVsZW1lbnRcclxufVxyXG5cclxuY29uc3QgdGFza0l0ZW0gPSAob2JqZWN0KSA9PiB7XHJcbiAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgdGl0bGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgZGF0ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICBidXR0b25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgZGVzY3JpcHRpb25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgdGFza01haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG5cclxuXHJcbiAgZWxlbWVudC5kYXRhc2V0LmlkID0gb2JqZWN0LmlkXHJcbiAgZWxlbWVudC5jbGFzc05hbWUgPSAndGFzay1pdGVtJ1xyXG4gIHRpdGxlRGl2LmNsYXNzTmFtZSA9ICd0aXRsZS1kaXYnXHJcbiAgZGF0ZURpdi5jbGFzc05hbWUgPSAnZGF0ZS1kaXYnXHJcbiAgZGVzY3JpcHRpb25EaXYuY2xhc3NOYW1lID0gJ2hpZGUgZGVzY3JpcHRpb24tZGl2J1xyXG4gIGJ1dHRvbkRpdi5jbGFzc05hbWUgPSAnYnV0dG9uLWRpdidcclxuICB0YXNrTWFpbi5jbGFzc05hbWUgPSAndGFzay1tYWluJ1xyXG5cclxuICB0aXRsZURpdi50ZXh0Q29udGVudCA9IG9iamVjdC50aXRsZVxyXG4gIGRhdGVEaXYudGV4dENvbnRlbnQgPSBvYmplY3QuZGF0ZVxyXG4gIGRlc2NyaXB0aW9uRGl2LnRleHRDb250ZW50ID0gb2JqZWN0LmRlc2NyaXB0aW9uXHJcblxyXG4gIHRhc2tNYWluLmFwcGVuZENoaWxkKGZpbmlzaFRhc2sob2JqZWN0LnByaW9yaXR5KSlcclxuICB0YXNrTWFpbi5hcHBlbmRDaGlsZCh0aXRsZURpdilcclxuICB0YXNrTWFpbi5hcHBlbmRDaGlsZChkYXRlRGl2KVxyXG4gIHRhc2tNYWluLmFwcGVuZENoaWxkKGJ1dHRvbkRpdilcclxuXHJcbiAgYnV0dG9uRGl2LmFwcGVuZENoaWxkKGV4cGFuZFRhc2soKSlcclxuICBidXR0b25EaXYuYXBwZW5kQ2hpbGQoZWRpdFRhc2soKSlcclxuICBidXR0b25EaXYuYXBwZW5kQ2hpbGQocmVtb3ZlVGFzaygpKVxyXG5cclxuICBlbGVtZW50LmFwcGVuZENoaWxkKHRhc2tNYWluKVxyXG4gIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25EaXYpXHJcblxyXG4gIGxldCBleHBhbmQgPSBidXR0b25EaXYuY2hpbGRyZW5bMF0sXHJcbiAgICAgIGVkaXQgPSBidXR0b25EaXYuY2hpbGRyZW5bMV0sXHJcbiAgICAgIHJlbW92ZSA9IGJ1dHRvbkRpdi5jaGlsZHJlblsyXSxcclxuICAgICAgZmluaXNoID0gdGFza01haW4uY2hpbGRyZW5bMF1cclxuICByZXR1cm4ge1xyXG4gICAgZWxlbWVudCxcclxuICAgIG9iamVjdCxcclxuICAgIGV4cGFuZCxcclxuICAgIGVkaXQsXHJcbiAgICByZW1vdmUsXHJcbiAgICBmaW5pc2hcclxuXHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBpbmJveEJ1dHRvbiA9ICgpID0+IHtcclxuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcblxyXG4gIGVsZW1lbnQuaW5uZXJIVE1MID1cclxuICAgIGBcclxuICAgIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTksMTVIMTVBMywzIDAgMCwxIDEyLDE4QTMsMyAwIDAsMSA5LDE1SDVWNUgxOU0xOSwzSDVDMy44OSwzIDMsMy45IDMsNVYxOUEyLDIgMCAwLDAgNSwyMUgxOUEyLDIgMCAwLDAgMjEsMTlWNUEyLDIgMCAwLDAgMTksM1pcIiAvPlxyXG4gICAgPC9zdmc+XHJcbiAgICA8c3Bhbj5JbmJveDwvc3Bhbj5cclxuICAgIGBcclxuICBlbGVtZW50LmRhdGFzZXQuaWQgPSAnLTEnXHJcbiAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpbmJveCcpXHJcblxyXG4gIHJldHVybiBlbGVtZW50XHJcbn1cclxuXHJcbmNvbnN0IGNyZWF0ZUZvbGRlckJ1dHRvbiA9ICgpID0+IHtcclxuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcblxyXG4gIGVsZW1lbnQuaW5uZXJIVE1MID1cclxuICAgIGBcclxuICAgIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTMgMTlDMTMgMTkuMzQgMTMuMDQgMTkuNjcgMTMuMDkgMjBINEMyLjkgMjAgMiAxOS4xMSAyIDE4VjZDMiA0Ljg5IDIuODkgNCA0IDRIMTBMMTIgNkgyMEMyMS4xIDYgMjIgNi44OSAyMiA4VjEzLjgxQzIxLjM5IDEzLjQ2IDIwLjcyIDEzLjIyIDIwIDEzLjA5VjhINFYxOEgxMy4wOUMxMy4wNCAxOC4zMyAxMyAxOC42NiAxMyAxOU0yMCAxOFYxNUgxOFYxOEgxNVYyMEgxOFYyM0gyMFYyMEgyM1YxOEgyMFpcIiAvPlxyXG4gICAgPC9zdmc+XHJcbiAgICA8c3Bhbj5DcmVhdGUgRm9sZGVyPC9zcGFuPlxyXG4gICAgYFxyXG5cclxuICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NyZWF0ZS1mb2xkZXInKVxyXG5cclxuICByZXR1cm4gZWxlbWVudFxyXG5cclxufVxyXG5cclxuY29uc3QgZm9sZGVyVUkgPSAoZm9sZGVyVGl0bGU9XCJcIikgPT4ge1xyXG4gIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSxcclxuICAgICAgc2F2ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpLFxyXG4gICAgICBjYW5jZWxCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxyXG4gIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZm9sZGVyLXVpJylcclxuICBzYXZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3NhdmUtZm9sZGVyJylcclxuICBjYW5jZWxCdXR0b24uY2xhc3NMaXN0LmFkZCgnY2FuY2VsLWZvbGRlcicpXHJcbiAgaW5wdXQuaWQgPSAnZm9sZGVyLXRpdGxlJ1xyXG5cclxuICBzYXZlQnV0dG9uLmlubmVySFRNTCA9XHJcbiAgICBgXHJcbiAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNNSAxOVY1SDEyVjEySDE5VjEzQzE5LjcgMTMgMjAuMzcgMTMuMTMgMjEgMTMuMzVWOUwxNSAzSDVDMy44OSAzIDMgMy44OSAzIDVWMTlDMyAyMC4xIDMuODkgMjEgNSAyMUgxMy4zNUMxMy4xMyAyMC4zNyAxMyAxOS43IDEzIDE5SDVNMTQgNC41TDE5LjUgMTBIMTRWNC41TTIyLjUgMTcuMjVMMTcuNzUgMjJMMTUgMTlMMTYuMTYgMTcuODRMMTcuNzUgMTkuNDNMMjEuMzQgMTUuODRMMjIuNSAxNy4yNVpcIiAvPlxyXG4gICAgPC9zdmc+XHJcbiAgICBgXHJcbiAgY2FuY2VsQnV0dG9uLmlubmVySFRNTCA9XHJcbiAgICBgXHJcbiAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTIsMjBDNy41OSwyMCA0LDE2LjQxIDQsMTJDNCw3LjU5IDcuNTksNCAxMiw0QzE2LjQxLDQgMjAsNy41OSAyMCwxMkMyMCwxNi40MSAxNi40MSwyMCAxMiwyME0xMiwyQzYuNDcsMiAyLDYuNDcgMiwxMkMyLDE3LjUzIDYuNDcsMjIgMTIsMjJDMTcuNTMsMjIgMjIsMTcuNTMgMjIsMTJDMjIsNi40NyAxNy41MywyIDEyLDJNMTQuNTksOEwxMiwxMC41OUw5LjQxLDhMOCw5LjQxTDEwLjU5LDEyTDgsMTQuNTlMOS40MSwxNkwxMiwxMy40MUwxNC41OSwxNkwxNiwxNC41OUwxMy40MSwxMkwxNiw5LjQxTDE0LjU5LDhaXCIgLz5cclxuICAgIDwvc3ZnPlxyXG5cclxuICAgIGBcclxuICBlbGVtZW50LmFwcGVuZENoaWxkKGlucHV0KVxyXG4gIGVsZW1lbnQuYXBwZW5kQ2hpbGQoc2F2ZUJ1dHRvbilcclxuICBlbGVtZW50LmFwcGVuZENoaWxkKGNhbmNlbEJ1dHRvbilcclxuICByZXR1cm4ge1xyXG4gICAgZWxlbWVudCxcclxuICAgIGlucHV0LFxyXG4gICAgc2F2ZUJ1dHRvbixcclxuICAgIGNhbmNlbEJ1dHRvblxyXG4gIH1cclxuXHJcbn1cclxuXHJcblxyXG5jb25zdCBmb2xkZXJJdGVtID0gKGl0ZW1PYmplY3QpID0+IHtcclxuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICBkZWxldGVJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgbmFtZSA9IGl0ZW1PYmplY3QuZm9sZGVyTmFtZVxyXG5cclxuICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ZvbGRlci1pdGVtJylcclxuICBkZWxldGVJdGVtLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZS1mb2xkZXInKVxyXG4gIGRlbGV0ZUl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpXHJcbiAgZWxlbWVudC5kYXRhc2V0LmlkID0gaXRlbU9iamVjdC5pdGVtSURcclxuXHJcbiAgZGVsZXRlSXRlbS5pbm5lckhUTUwgPVxyXG4gICAgYFxyXG4gICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTEyLDIwQzcuNTksMjAgNCwxNi40MSA0LDEyQzQsNy41OSA3LjU5LDQgMTIsNEMxNi40MSw0IDIwLDcuNTkgMjAsMTJDMjAsMTYuNDEgMTYuNDEsMjAgMTIsMjBNMTIsMkM2LjQ3LDIgMiw2LjQ3IDIsMTJDMiwxNy41MyA2LjQ3LDIyIDEyLDIyQzE3LjUzLDIyIDIyLDE3LjUzIDIyLDEyQzIyLDYuNDcgMTcuNTMsMiAxMiwyTTE0LjU5LDhMMTIsMTAuNTlMOS40MSw4TDgsOS40MUwxMC41OSwxMkw4LDE0LjU5TDkuNDEsMTZMMTIsMTMuNDFMMTQuNTksMTZMMTYsMTQuNTlMMTMuNDEsMTJMMTYsOS40MUwxNC41OSw4WlwiIC8+XHJcbiAgICA8L3N2Zz5cclxuICAgIGBcclxuICBlbGVtZW50LmlubmVySFRNTCA9XHJcbiAgIGBcclxuICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0yMCwxOEg0VjhIMjBNMjAsNkgxMkwxMCw0SDRDMi44OSw0IDIsNC44OSAyLDZWMThBMiwyIDAgMCwwIDQsMjBIMjBBMiwyIDAgMCwwIDIyLDE4VjhDMjIsNi44OSAyMS4xLDYgMjAsNlpcIiAvPlxyXG4gICAgPC9zdmc+XHJcblxyXG4gICAgPHNwYW4+YCsgaXRlbU9iamVjdC5mb2xkZXJOYW1lICsgYDwvc3Bhbj5cclxuICAgYFxyXG5cclxuICBlbGVtZW50LmFwcGVuZENoaWxkKGRlbGV0ZUl0ZW0pXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBlbGVtZW50LFxyXG4gICAgZGVsZXRlSXRlbSxcclxuICAgIG5hbWVcclxuICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQge1xyXG4gIG5ld1Rhc2tCdXR0b24sXHJcbiAgdGFza1VpLFxyXG4gIHRhc2tJdGVtLFxyXG4gIGluYm94QnV0dG9uLFxyXG4gIGNyZWF0ZUZvbGRlckJ1dHRvbixcclxuICBmb2xkZXJVSSxcclxuICBmb2xkZXJJdGVtXHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcclxuXHJcblxyXG5jb25zdCBlZGl0RG9tID0gcmVxdWlyZSgnLi9lZGl0RG9tJylcclxuY29uc3QgbWFpbkZ1bmN0aW9ucyA9IHJlcXVpcmUoJy4vbWFpbkZ1bmN0aW9ucycpXHJcbm1haW5GdW5jdGlvbnMucmVsb2FkRG9tKClcclxuZWRpdERvbS5uZXdUYXNrQnV0dG9uKClcclxubWFpbkZ1bmN0aW9ucy5yZWxvYWRTaWRlQmFyKClcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9