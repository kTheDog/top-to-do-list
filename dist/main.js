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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9wLXRvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbGlzdERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0JylcclxuXHJcbmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdJRCcsIDEpXHJcblxyXG5jb25zdCB0YXNrQnV0dG9uRnVuY3Rpb24gPSAodGFza0J1dHRvbikgPT4ge1xyXG4gIGxldCBVSSA9IHRhc2tVSSgpXHJcblxyXG4gIFVJLmFkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGdyZWVuQnV0dG9uRnVuY3Rpb24oVUkpXHJcblxyXG4gIH0pXHJcblxyXG4gIFVJLmNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIHJlZEJ1dHRvbkZ1bmN0aW9uKClcclxuICB9KVxyXG5cclxuICBsaXN0RGl2LnJlbW92ZUNoaWxkKHRhc2tCdXR0b24pXHJcbiAgbGlzdERpdi5hcHBlbmRDaGlsZChVSS5lbGVtZW50KVxyXG4gIGNvbnNvbGUubG9nKFVJLmVsZW1lbnQuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0pXHJcbn1cclxuXHJcbmNvbnN0IHRhc2tUb0RvbSA9IChvYmplY3QpID0+IHtcclxuICBsZXQgdGVzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgb2JqZWN0ID0gSlNPTi5wYXJzZShvYmplY3QpXHJcbiAgY29uc29sZS5sb2cob2JqZWN0KVxyXG4gIHRlc3QudGV4dENvbnRlbnQgPSBvYmplY3QudGl0bGUgKyBvYmplY3QuZGVzY3JpcHRpb25cclxuICBjb25zb2xlLmxvZyhvYmplY3QudGl0bGUpXHJcbiAgbGlzdERpdi5hcHBlbmRDaGlsZCh0ZXN0KVxyXG59XHJcblxyXG5jb25zdCByZWxvYWREb20gPSAoKSA9PiB7XHJcbiAgbGlzdERpdi5pbm5lckhUTUwgPSBcIlwiXHJcbiAgbGV0IHdob2xlU3RvcmFnZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobG9jYWxTdG9yYWdlKSlcclxuICBmb3IgKGxldCBrZXkgaW4gd2hvbGVTdG9yYWdlKSB7XHJcbiAgICBpZiAoa2V5ID09PSAnSUQnKSB7Y29uc29sZS5sb2coJ3dvcmtzJyk7IGNvbnRpbnVlfVxyXG4gICAgdGFza1RvRG9tKHdob2xlU3RvcmFnZVtrZXldKVxyXG5cclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGdyZWVuQnV0dG9uRnVuY3Rpb24gPSAoVUkpID0+IHtcclxuICBsZXQgaW5wVGl0bGUgPSBVSS5lbGVtZW50LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLnZhbHVlLFxyXG4gICAgICBpbnBEYXRlID0gVUkuZWxlbWVudC5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5jaGlsZHJlblsxXS52YWx1ZSxcclxuICAgICAgaW5wRGVzY3JpcHRpb24gPSBVSS5lbGVtZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuWzFdLnZhbHVlXHJcbiAgICAgIGl0ZW1JRCA9ICtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnSUQnKVxyXG4gICAgICBwcmlvcml0eSA9IFVJLnByaW9yaXR5XHJcblxyXG5cclxuICBjb25zb2xlLmxvZyhcImhhaGFcIilcclxuICBhZGRUb0pzb24oaW5wVGl0bGUsIGlucERhdGUsIGlucERlc2NyaXB0aW9uLCBwcmlvcml0eSwgaXRlbUlEKVxyXG5cclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnSUQnLCBpdGVtSUQgKyAxKVxyXG5cclxuICByZWxvYWREb20oKVxyXG4gIHRhc2tCdXR0b25FbGVtZW50KClcclxufVxyXG5cclxuY29uc3QgYWRkVG9Kc29uID0gKHRpdGxlLCBkYXRlLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHksIGl0ZW1JRCkgPT4ge1xyXG4gIGxldCBvYmogPSB7dGl0bGUsIGRhdGUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgaXRlbUlEfVxyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG9iai5pdGVtSUQsIEpTT04uc3RyaW5naWZ5KG9iaikpXHJcbn1cclxuXHJcblxyXG5jb25zdCB0YXNrQnV0dG9uRWxlbWVudCA9ICgpID0+IHtcclxuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXHJcbiAgZWxlbWVudC5pbm5lckhUTUwgPWA8c3Ryb25nPkFkZCB0YXNrPC9zdHJvbmc+YFxyXG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICB0YXNrQnV0dG9uRnVuY3Rpb24oZWxlbWVudClcclxuICB9KVxyXG4gIGxpc3REaXYuYXBwZW5kQ2hpbGQoZWxlbWVudClcclxufVxyXG5cclxuXHJcbmNvbnN0IHRhc2tVSSA9ICh0aXRsZT1cIlwiLCBkZXNjcmlwdGlvbj1cIlwiLCBkYXRlPVwiXCIsIHByaW9yaXR5PVwiXCIpID0+IHtcclxuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcblxyXG4gIGVsZW1lbnQuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9wLXJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiYWRkLXRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInRpdGxlLWlucHV0XCI+VGl0bGU8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ0aXRsZVwiIGlkPVwidGl0bGUtaW5wdXRcIiB2YWx1ZT1cImArdGl0bGUrYFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cInNlbGVjdC1kYXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImR1ZS1kYXRlXCI+RGF0ZTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJkYXRlXCIgbmFtZT1cImR1ZS1kYXRlXCIgaWQ9XCJkdWUtZGF0ZVwiIHZhbHVlPVwiYCtkYXRlK2BcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJzZWxlY3QtcHJpb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+UHJpb3JpdHk8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibG93XCI+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm1lZGl1bVwiPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJoaWdoXCI+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiYWRkLWRlc2NyaXB0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJkZXNjcmlwdGlvblwiPkRlc2NyaXB0aW9uPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIG5hbWU9XCJkZXNjcmlwdGlvblwiIGlkPVwiZGVzY3JpcHRpb25cIj5gK2Rlc2NyaXB0aW9uK2A8L3RleHRhcmVhPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVwiYWRkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgc3R5bGU9XCJ3aWR0aDoyNHB4O2hlaWdodDoyNHB4XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTIxLDdMOSwxOUwzLjUsMTMuNUw0LjkxLDEyLjA5TDksMTYuMTdMMTkuNTksNS41OUwyMSw3WlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVwiY2FuY2VsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgc3R5bGU9XCJ3aWR0aDoyNHB4O2hlaWdodDoyNHB4XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTE5LDYuNDFMMTcuNTksNUwxMiwxMC41OUw2LjQxLDVMNSw2LjQxTDEwLjU5LDEyTDUsMTcuNTlMNi40MSwxOUwxMiwxMy40MUwxNy41OSwxOUwxOSwxNy41OUwxMy40MSwxMkwxOSw2LjQxWlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICBgXHJcbiAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0YXNrLXVpJylcclxuXHJcbiAgbGV0IGFkZEJ1dHRvbiA9IGVsZW1lbnQuY2hpbGRyZW5bMl0uY2hpbGRyZW5bMF1cclxuICBsZXQgY2FuY2VsQnV0dG9uID0gZWxlbWVudC5jaGlsZHJlblsyXS5jaGlsZHJlblsxXVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZWxlbWVudCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSwgYWRkQnV0dG9uLCBjYW5jZWxCdXR0b25cclxuICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbnRhc2tCdXR0b25FbGVtZW50KClcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9