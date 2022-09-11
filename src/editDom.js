const supplyElement = require('./supplyElement')
const mainFunctions = require('./mainFunctions')
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

export {
  newTaskButton,
  taskUi,
  taskItem
}
