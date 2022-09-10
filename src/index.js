const taskButtons = require('./taskItem')
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
