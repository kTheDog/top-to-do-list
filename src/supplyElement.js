
const mainFunctions = require('./mainFunctions')

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


export {
  newTaskButton,
  taskUi,
  taskItem,
  inboxButton,
  createFolderButton,
  folderUI,
  folderItem
}
