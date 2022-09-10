const imports = require('./index')

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




export {
  removeTask,
  expandTask,
  editTask,
  taskButtonElement
}

