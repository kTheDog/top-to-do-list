const supplyElement = require('./supplyElement')
const mainFunctions = require('./mainFunctions')
const listDiv = document.getElementById('list')
const sideBar = document.querySelector('.side-bar')
const dynamicStyles = require('./dynamicStyles')

const newTaskButton = () => {
  let element = supplyElement.newTaskButton()
  element.addEventListener('click', () => mainFunctions.newTaskButton(element))
  listDiv.appendChild(element)
}

const taskUi = (replaceThis, ui = supplyElement.taskUi()) => {
  ui.addButton.addEventListener('click', () => mainFunctions.greenButton(ui))
  /*take this out if you wanna allow multiple task edits at the same time */

  ui.cancelButton.addEventListener('click', () => mainFunctions.redButton())

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
    console.log("H")
    mainFunctions.deleteFolderButton(item)
  });

  ['mouseenter', 'mouseleave'].forEach((e) => {
    item.element.addEventListener(e, ()=> {
      dynamicStyles.hoverFolderItem(item)
    })
  });




  sideBar.appendChild(item.element)
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
