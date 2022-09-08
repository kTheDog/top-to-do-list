

const taskUIFactory = (title="", description="", dueDate="", priority=1) => {
  let element = document.createElement('div')

  element.innerHTML = `<div class="top-row">
  <div id="add-title">
    <label for="title-input">Title</label>
    <input type="text" name="title" id="title-input" value="`+title+`">
  </div>
  <div id="select-date">
    <label for="due-date">Date</label>
    <input type="date" name="due-date" id="due-date" value="`+dueDate+`">
  </div>
  <div id="select-prio">
    <div>Priority</div>
    <button class="low"></button>
    <button class="medium"></button>
    <button class="high"></button>
  </div>
</div>
<div id="add-description">
  <label for="description">Description</label>
  <textarea name="description" id="description">`+description+`</textarea>
</div>
`



  element.classList.add('task-ui')

  let buttonsElement = document.createElement('div'),
      cancelButton = document.createElement('button'),
      addButton = document.createElement('button')

  buttonsElement.className = 'button'
  addButton.id = "add"
  cancelButton.id = "cancel"

  addButton.innerHTML =
  `
    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
    </svg>
  `
  cancelButton.innerHTML =
  `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
  </svg>
  `
  buttonsElement.appendChild(addButton)
  buttonsElement.appendChild(cancelButton)

  element.appendChild(buttonsElement)

  let titleInput = element.children[0].children[0].children[1]
  let dateInput = element.children[0].children[1].children[1]
  let textarea = element.children[1].children[1]
  return {
    element, title, description, dueDate, priority, addButton, cancelButton, titleInput,
    dateInput, textarea
  }
}


const createTaskButton = () => {
  let taskButton = document.createElement('button'),
      svgIcon =
                  `
                  <svg style="width:2em;" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M17,18V5H7V18L12,15.82L17,18M17,3A2,2 0 0,1 19,5V21L12,18L5,21V5C5,3.89 5.9,3 7,3H17M11,7H13V9H15V11H13V13H11V11H9V9H11V7Z" />
                  </svg>
                  `

  taskButton.id = 'task-button'
  taskButton.innerHTML = svgIcon + ` Add Task`

  return taskButton
}






export {
  createTaskButton,
  taskUIFactory
}
