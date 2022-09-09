/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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
  object = JSON.parse(object)
  let test = document.createElement('div')
  console.log(object["title"])
  test.textContent = object.title
  console.log(object.title)
  listDiv.appendChild(test)
}

const reloadDom = () => {
  let wholeStorage = JSON.parse(JSON.stringify(localStorage))
  for (let key in wholeStorage) {
    taskToDom(wholeStorage[key])

  }
  taskButtonElement()
}
const taskUIref = (() => {
  let inpTitle = (UI) => { return UI.element.children[0].children[0].children[1]},
      inpDate = (UI) => { return UI.element.children[0].children[1].children[1]},
      inpDescription = (UI) => { return UI.element.children[1].children[1]}

  return {
    inpTitle, inpDate, inpDescription
  }
})()
const greenButtonFunction = (UI) => {

  addToJson(UI)

  reloadDom()

}

const addToJson = (UI) => {
  let itemID = localStorage.getItem('ID')

  let obj =
    {
      title: taskUIref.inpTitle(UI).value,
      description: taskUIref.inpDescription(UI).value,
      date: taskUIref.inpDate(UI).value,
      priority: UI.priority,
      itemID: itemID
    }
  localStorage.setItem(obj.title, JSON.stringify(obj))
  localStorage.setItem('ID', itemID + 1)
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsc0RBQXNEO0FBQ2pGLDBCQUEwQixzREFBc0Q7QUFDaEYsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9wLXRvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbGlzdERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0JylcclxuXHJcbmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdJRCcsIDEpXHJcblxyXG5jb25zdCB0YXNrQnV0dG9uRnVuY3Rpb24gPSAodGFza0J1dHRvbikgPT4ge1xyXG4gIGxldCBVSSA9IHRhc2tVSSgpXHJcblxyXG4gIFVJLmFkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGdyZWVuQnV0dG9uRnVuY3Rpb24oVUkpXHJcblxyXG4gIH0pXHJcblxyXG4gIFVJLmNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIHJlZEJ1dHRvbkZ1bmN0aW9uKClcclxuICB9KVxyXG5cclxuICBsaXN0RGl2LnJlbW92ZUNoaWxkKHRhc2tCdXR0b24pXHJcbiAgbGlzdERpdi5hcHBlbmRDaGlsZChVSS5lbGVtZW50KVxyXG4gIGNvbnNvbGUubG9nKFVJLmVsZW1lbnQuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0pXHJcbn1cclxuXHJcbmNvbnN0IHRhc2tUb0RvbSA9IChvYmplY3QpID0+IHtcclxuICBvYmplY3QgPSBKU09OLnBhcnNlKG9iamVjdClcclxuICBsZXQgdGVzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgY29uc29sZS5sb2cob2JqZWN0W1widGl0bGVcIl0pXHJcbiAgdGVzdC50ZXh0Q29udGVudCA9IG9iamVjdC50aXRsZVxyXG4gIGNvbnNvbGUubG9nKG9iamVjdC50aXRsZSlcclxuICBsaXN0RGl2LmFwcGVuZENoaWxkKHRlc3QpXHJcbn1cclxuXHJcbmNvbnN0IHJlbG9hZERvbSA9ICgpID0+IHtcclxuICBsZXQgd2hvbGVTdG9yYWdlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShsb2NhbFN0b3JhZ2UpKVxyXG4gIGZvciAobGV0IGtleSBpbiB3aG9sZVN0b3JhZ2UpIHtcclxuICAgIHRhc2tUb0RvbSh3aG9sZVN0b3JhZ2Vba2V5XSlcclxuXHJcbiAgfVxyXG4gIHRhc2tCdXR0b25FbGVtZW50KClcclxufVxyXG5jb25zdCB0YXNrVUlyZWYgPSAoKCkgPT4ge1xyXG4gIGxldCBpbnBUaXRsZSA9IChVSSkgPT4geyByZXR1cm4gVUkuZWxlbWVudC5jaGlsZHJlblswXS5jaGlsZHJlblswXS5jaGlsZHJlblsxXX0sXHJcbiAgICAgIGlucERhdGUgPSAoVUkpID0+IHsgcmV0dXJuIFVJLmVsZW1lbnQuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMV19LFxyXG4gICAgICBpbnBEZXNjcmlwdGlvbiA9IChVSSkgPT4geyByZXR1cm4gVUkuZWxlbWVudC5jaGlsZHJlblsxXS5jaGlsZHJlblsxXX1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGlucFRpdGxlLCBpbnBEYXRlLCBpbnBEZXNjcmlwdGlvblxyXG4gIH1cclxufSkoKVxyXG5jb25zdCBncmVlbkJ1dHRvbkZ1bmN0aW9uID0gKFVJKSA9PiB7XHJcblxyXG4gIGFkZFRvSnNvbihVSSlcclxuXHJcbiAgcmVsb2FkRG9tKClcclxuXHJcbn1cclxuXHJcbmNvbnN0IGFkZFRvSnNvbiA9IChVSSkgPT4ge1xyXG4gIGxldCBpdGVtSUQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnSUQnKVxyXG5cclxuICBsZXQgb2JqID1cclxuICAgIHtcclxuICAgICAgdGl0bGU6IHRhc2tVSXJlZi5pbnBUaXRsZShVSSkudmFsdWUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiB0YXNrVUlyZWYuaW5wRGVzY3JpcHRpb24oVUkpLnZhbHVlLFxyXG4gICAgICBkYXRlOiB0YXNrVUlyZWYuaW5wRGF0ZShVSSkudmFsdWUsXHJcbiAgICAgIHByaW9yaXR5OiBVSS5wcmlvcml0eSxcclxuICAgICAgaXRlbUlEOiBpdGVtSURcclxuICAgIH1cclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShvYmoudGl0bGUsIEpTT04uc3RyaW5naWZ5KG9iaikpXHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0lEJywgaXRlbUlEICsgMSlcclxufVxyXG5cclxuXHJcbmNvbnN0IHRhc2tCdXR0b25FbGVtZW50ID0gKCkgPT4ge1xyXG4gIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcclxuICBlbGVtZW50LmlubmVySFRNTCA9YDxzdHJvbmc+QWRkIHRhc2s8L3N0cm9uZz5gXHJcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIHRhc2tCdXR0b25GdW5jdGlvbihlbGVtZW50KVxyXG4gIH0pXHJcbiAgbGlzdERpdi5hcHBlbmRDaGlsZChlbGVtZW50KVxyXG59XHJcblxyXG5cclxuY29uc3QgdGFza1VJID0gKHRpdGxlPVwiXCIsIGRlc2NyaXB0aW9uPVwiXCIsIGRhdGU9XCJcIiwgcHJpb3JpdHk9XCJcIikgPT4ge1xyXG4gIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuXHJcbiAgZWxlbWVudC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b3Atcm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJhZGQtdGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwidGl0bGUtaW5wdXRcIj5UaXRsZTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRpdGxlXCIgaWQ9XCJ0aXRsZS1pbnB1dFwiIHZhbHVlPVwiYCt0aXRsZStgXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwic2VsZWN0LWRhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZHVlLWRhdGVcIj5EYXRlPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImRhdGVcIiBuYW1lPVwiZHVlLWRhdGVcIiBpZD1cImR1ZS1kYXRlXCIgdmFsdWU9XCJgK2RhdGUrYFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cInNlbGVjdC1wcmlvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5Qcmlvcml0eTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJsb3dcIj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibWVkaXVtXCI+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImhpZ2hcIj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJhZGQtZGVzY3JpcHRpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImRlc2NyaXB0aW9uXCI+RGVzY3JpcHRpb248L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgbmFtZT1cImRlc2NyaXB0aW9uXCIgaWQ9XCJkZXNjcmlwdGlvblwiPmArZGVzY3JpcHRpb24rYDwvdGV4dGFyZWE+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJhZGRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHN2ZyBzdHlsZT1cIndpZHRoOjI0cHg7aGVpZ2h0OjI0cHhcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMjEsN0w5LDE5TDMuNSwxMy41TDQuOTEsMTIuMDlMOSwxNi4xN0wxOS41OSw1LjU5TDIxLDdaXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJjYW5jZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHN2ZyBzdHlsZT1cIndpZHRoOjI0cHg7aGVpZ2h0OjI0cHhcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTksNi40MUwxNy41OSw1TDEyLDEwLjU5TDYuNDEsNUw1LDYuNDFMMTAuNTksMTJMNSwxNy41OUw2LjQxLDE5TDEyLDEzLjQxTDE3LjU5LDE5TDE5LDE3LjU5TDEzLjQxLDEyTDE5LDYuNDFaXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIGBcclxuICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Rhc2stdWknKVxyXG5cclxuICBsZXQgYWRkQnV0dG9uID0gZWxlbWVudC5jaGlsZHJlblsyXS5jaGlsZHJlblswXVxyXG4gIGxldCBjYW5jZWxCdXR0b24gPSBlbGVtZW50LmNoaWxkcmVuWzJdLmNoaWxkcmVuWzFdXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBlbGVtZW50LCB0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5LCBhZGRCdXR0b24sIGNhbmNlbEJ1dHRvblxyXG4gIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxudGFza0J1dHRvbkVsZW1lbnQoKVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=