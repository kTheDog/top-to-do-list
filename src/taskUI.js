const addToJson = (title, date, description, priority, itemID) => {
  let obj = {title, date, description, priority, itemID}
  localStorage.setItem(obj.itemID, JSON.stringify(obj))
}

const greenButtonFunction = (UIobject, prio) => {
  let inpTitle = UIobject.element.children[0].children[0].children[1].value,
      inpDate = UIobject.element.children[0].children[1].children[1].value,
      inpDescription = UIobject.element.children[1].children[1].value,
      priority = UIobject.priority,
      itemID = +localStorage.getItem('ID')


  addToJson(inpTitle, inpDate, inpDescription, priority, itemID)

  localStorage.setItem('ID', itemID + 1)

  reloadDom()
  taskButtons.taskButtonElement(taskButtonFunction)
}

const taskUI = (title="", description="", date="", priority="") => {
  let element = document.createElement('div')

  element.innerHTML = `
                        <div class="top-row">
                        <div id="add-title">
                          <label for="title-input">Title</label>
                          <input type="text" name="title" id="title-input" value="`+title+`">
                        </div>
                        <div id="select-date">
                          <label for="due-date">Date</label>
                          <input type="date" name="due-date" id="due-date" value="`+date+`">
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
                      <div class="button">
                      <button id="add">
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                        </svg>
                      </button>
                      <button id="cancel">
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                          </svg>
                          </button>
                          </div>
                      `
  element.classList.add('task-ui')

  let addButton = element.children[2].children[0]
  let cancelButton = element.children[2].children[1]

  addButton.addEventListener('click', () => {
    greenButtonFunction(UI)
  })



  return {
    element, title, description, date, priority, addButton, cancelButton
  }
}


