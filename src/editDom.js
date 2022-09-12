const supplyElement = require('./supplyElement')
const mainFunctions = require('./mainFunctions')
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

export {
  newTaskButton,
  taskUi,
  taskItem
}
