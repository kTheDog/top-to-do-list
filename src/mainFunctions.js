const supplyElement = require('./supplyElement')
const editDom = require('./editDom')
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
  if (!(UI.inpTitle.value && UI.inpDate.value && UI.inpDescription.value)) {
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
}

const removeTaskButton = (element, id) => {
  element.remove()
  localStorage.removeItem(JSON.stringify(id))
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


export {
  newTaskButton,
  greenButton,
  removeTaskButton,
  editTaskButton,
  expandTaskButton,
  finishTaskButton,
  reloadDom,
  createFolderButton,
  saveFolderButton,
  selectFolder,
  inboxButton,
  reloadSideBar,
  redButton,
  cancelFolderButton,
  deleteFolderButton
}
