const imports = require('./index')


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

const editTask = () => {
  let button = document.createElement('button')

  button.className = 'edit-task'
  button.textContent = 'edit task'
  button.addEventListener('click', () => {
    let target = button.parentNode.parentNode.parentNode


    let object = JSON.parse(localStorage.getItem(target.dataset.id)),
        replacement = imports.taskUI(object.title, object.description, object.date, object.priority)

    replacement.addButton.addEventListener('click', () => {
      imports.greenButtonFunction(replacement)
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
  editTask
}

