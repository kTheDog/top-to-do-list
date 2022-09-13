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
  inboxButton
}
