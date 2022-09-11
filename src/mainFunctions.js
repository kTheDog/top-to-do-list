const supplyElement = require('./supplyElement')
const editDom = require('./editDom')
const listDiv = document.getElementById('list')

const addToJson = (UI) => {
  let object = {},
      itemID = +localStorage.getItem('ID') + 1

  object.title = UI.inpTitle.value
  object.description = UI.inpDescription.value
  object.date = UI.inpDate.value
  object.priority = UI.priority
  console.log(object.id)

  object.id = UI.id || itemID
  localStorage.setItem('ID', itemID)
  localStorage.setItem(object.id, JSON.stringify(object))
}

const reloadDom = () => {
  listDiv.innerHTML = ""
  let storage = JSON.parse(JSON.stringify(localStorage))
  for (let key in storage) {
    if(key === "ID") {continue}
    let obj = JSON.parse(storage[key])
    editDom.taskItem(obj)

  }

}

const newTaskButton = (button) => {
  editDom.taskUi(button)
}

const greenButton = (UI) => {
  addToJson(UI),
  reloadDom(),
  editDom.newTaskButton()
}

const editTaskButton = (object) => {

  let replacement = supplyElement.taskUi(),
      replaceThis = listDiv.querySelector(`[data-id="${object.id}"]`)


  replacement.inpDate.value = object.date
  replacement.inpTitle.value = object.title
  replacement.inpDescription.value = object.description
  replacement.priority = object.priority
  replacement.id = object.id
  console.log(replaceThis)
  editDom.taskUi(replaceThis, replacement)
}

const removeTaskButton = (element, id) => {
  element.remove()
  localStorage.removeItem(JSON.stringify(id))
}

const expandTaskButton = (element) => {
  let referenceDescription = element.children[1]
  referenceDescription.classlist.toggle('hide')
}

export {
  newTaskButton,
  greenButton,
  removeTaskButton,
  editTaskButton,
  expandTaskButton,
  reloadDom
}
