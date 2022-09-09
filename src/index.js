
const taskStuff = require ('./taskStuff')
localStorage.setItem('id', 1)
let something = taskStuff.taskUIFactory()

let listDiv = document.getElementById('list')

console.log(something)



listDiv.appendChild(something.element)

const manipulateDom = (() => {




  const greenButtonFunction = (object) => {
    console.log(object)
    taskStuff.taskItemToJSON(object)
    console.log(object)

    reloadList()

  }


  const reloadList = () => {
    let wholeStorage = JSON.parse(JSON.stringify(localStorage)),
        listDiv = document.getElementById('list')
    for (let key in wholeStorage) {
      if (key === 'id') continue;
      let element = taskObjToDom(wholeStorage[key])
      console.log(wholeStorage[key])
//      console.log(wholeStorage[key].titleInput)

      listDiv.appendChild(element)
    }
    listDiv.appendChild(taskStuff.createTaskButton())
  }
  const taskObjToDom = (object) => {
    let taskItem = document.createElement('div'),
        main = document.createElement('div'),
        title = document.createElement('div'),
        date = document.createElement('div'),
        description = document.createElement('div')

    taskItem.className = 'task-item'
    main.className = 'main'
    description.className = 'task-description'

    title.textContent = object.title
    date.textContent = object.date
    description.textContent = object.description
   // console.log(description.textContent)
    main.appendChild(title)
    main.appendChild(date)

    taskItem.appendChild(main)
    taskItem.appendChild(description)
    taskItem.setAttribute
    return taskItem
  }

  return {
    greenButtonFunction,
    taskObjToDom
  }
})();



something.addButton.addEventListener('click', () => {
  manipulateDom.greenButtonFunction(something)
})
