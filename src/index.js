
const taskStuff = require ('./taskStuff')

let something = taskStuff.taskUIFactory()

let listDiv = document.getElementById('list')

console.log(something)



listDiv.appendChild(something.element)
const manipulateDom = (() => {




  const greenButtonFunction = (object) => {
    object.title = object.titleInput.value
    object.description = object.textarea.value
    object.dueDate = object.dateInput.value
    localStorage.setItem(object.title, JSON.stringify(object))
  }



  return {
    greenButtonFunction
  }
})();


