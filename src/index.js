
const taskStuff = require ('./taskStuff')


const manipulateDom = (() => {


  const listDiv = document.getElementById('list')


  const taskUIReferences = ((element) => {
    let titleInput = () => {return element.children[0].children[0].children[1]},
        dateInput = () => {element.children[0].children[1].children[1]},
        textArea = () => {element.children[1].children[1]},
        addButton = () => {element.children[2].children[0]},
        cancelButton = () => {element.children[2].children[1]}

    return {
      titleInput, dateInput, textArea, addButton, cancelButton
    }
  })();



  const addTaskButtonToDom = () => {
    let button = taskStuff.createTaskButton()
    button.addEventListener('click', () => {
      listDiv.removeChild(button)
      addTaskUI()
    })
    listDiv.appendChild(button)
  }

  const addTaskUI = (parent=listDiv) => {
    let ui = taskStuff.taskUIFactory()
        //cancel = ui.element.taskUIReferences.cancelButton(),
        //add = ui.element.taskUIReferences.addButton()





    parent.appendChild(ui)


  }
  const greenButtonStuff = () => {

  }

  return {
    addTaskButtonToDom
  }
})();




manipulateDom.addTaskButtonToDom()
