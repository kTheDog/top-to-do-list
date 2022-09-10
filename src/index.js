const listDiv = document.getElementById('list')

localStorage.setItem('ID', 1)

const taskButtonFunction = (taskButton) => {
  let UI = taskUI()

  UI.addButton.addEventListener('click', () => {
    greenButtonFunction(UI)

  })

  UI.cancelButton.addEventListener('click', () => {
    redButtonFunction()
  })

  listDiv.removeChild(taskButton)
  listDiv.appendChild(UI.element)
  console.log(UI.element.children[0].children[0].children[1])
}

const taskToDom = (object) => {
  let test = document.createElement('div')
  object = JSON.parse(object)
  console.log(object)
  test.textContent = object.title + object.description
  console.log(object.title)
  listDiv.appendChild(test)
}

const reloadDom = () => {
  listDiv.innerHTML = ""
  let wholeStorage = JSON.parse(JSON.stringify(localStorage))
  for (let key in wholeStorage) {
    if (key === 'ID') {console.log('works'); continue}
    taskToDom(wholeStorage[key])

  }
}

const greenButtonFunction = (UI) => {
  let inpTitle = UI.element.children[0].children[0].children[1].value,
      inpDate = UI.element.children[0].children[1].children[1].value,
      inpDescription = UI.element.children[1].children[1].value
      itemID = +localStorage.getItem('ID')
      priority = UI.priority


  console.log("haha")
  addToJson(inpTitle, inpDate, inpDescription, priority, itemID)

  localStorage.setItem('ID', itemID + 1)

  reloadDom()
  taskButtonElement()
}

const addToJson = (title, date, description, priority, itemID) => {
  let obj = {title, date, description, priority, itemID}
  localStorage.setItem(obj.itemID, JSON.stringify(obj))
}


const taskButtonElement = () => {
  let element = document.createElement('button')
  element.innerHTML =`<strong>Add task</strong>`
  element.addEventListener('click', () => {
    taskButtonFunction(element)
  })
  listDiv.appendChild(element)
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

  return {
    element, title, description, date, priority, addButton, cancelButton
  }
}




taskButtonElement()
