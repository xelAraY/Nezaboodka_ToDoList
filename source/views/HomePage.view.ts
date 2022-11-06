import { Div, Img, RxUL, RxSelect, TextArea } from 'verstak'
import { PageView } from './Page.view'
import { style } from './Page.css'
import { App } from '../models/App'
import { TaskBlock } from './Task.view'
import { Priority } from '../models/Task'

function DisplayPriority(app: App, priority: string) {
  if (app.GetCount(priority) !== 0){
    Div('Priority_Name'+priority, undefined, e => {
      e.className = style.class.Priority_Name
      e.innerHTML = priority
    })
  }
  app.tasksList.forEach(element => {
    if (element.isActive && element.priority === priority) {
      TaskBlock(element, app)
    }
  })

  app.tasksList.forEach(element => {
    if (!element.isActive && element.priority === priority) {
      TaskBlock(element, app)
    }
  })
}

export function HomePageView(app: App) {
  return (
    PageView(app, (e: HTMLElement) => {
      let options: HTMLOptionsCollection
      let select: HTMLSelectElement
      let isResize = false

      let taskListElement: HTMLElement
      RxUL('List', undefined, e => {
        taskListElement = e
        e.className = style.class.List
        for (const priority in Priority){
          DisplayPriority(app, priority)
        }
      })

      let resizeFunction: Function
      Div('Input_Block', undefined, block => {
        block.className = style.class.Input_Block
        let inputArea: HTMLTextAreaElement
        TextArea('Input_Area', undefined, e => {
          inputArea = e
          e.className = style.class.Input_Area
          e.placeholder = 'Enter the task...'
          e.dataForSensor.keyboard = () => {
            if (inputArea.value.trim() != ''){
              app.addTask(inputArea.value, select.options[select.selectedIndex].value)
              inputArea.value = ''
            }
          }

          resizeFunction = (_: MouseEvent) => {
            const y =  _.movementY
            const height = (Number)(e.style.height.replace('px', ''))
            console.log(y)
            let heightStyle:string
            if (y == 0){
              return
            }

            if (height - y > 35 ){
              heightStyle = (height - y).toString() + 'px'
            }else{
              heightStyle = '35px'
            }
            console.log(e.style.height)
            e.style.height = heightStyle
            e.style.maxHeight = heightStyle
            taskListElement.style.height = 'calc(100vh - (135px + ' + heightStyle + ' ) )'
          }
          e.onmousemove = (_) => {
            const delta = Math.abs(_.offsetY / e.offsetHeight)
            if(_.buttons !== 1){
              isResize = false
            }

            if ((delta < 0.05) || (1 - delta < 0.05)){
              e.style.cursor = 'ns-resize'
              if (_.buttons === 1){
                isResize = true
              }
            }else{
              e.style.cursor = 'default'
            }
          }
          e.onmouseup = (_) => {
            isResize = false
          }
        })
        RxSelect('Priority', undefined, e => {
          e.className = style.class.Priority
          select = e
          options = e.options
          for(const priority in Priority){
            options[options.length] = new Option(priority, priority, priority === Priority.Today ? true : false)
          }
        })

        Div('Submit', undefined, e => {
          e.className = style.class.Submit
          e.dataForSensor.click = () => {
            if (inputArea.value.trim() != ''){
              app.addTask(inputArea.value, select.options[select.selectedIndex].value)
              inputArea.value = ''
            }
          }
          Img('Submit_Img', undefined, e => {
            e.src = '../assets/plus-solid.svg'
            e.className = style.class.Submit_Img
          })
        })
      })
      e.onmousemove = (_:MouseEvent) => {
        if (isResize){
          resizeFunction(_)
        }
      }
      e.onmouseup = (_) => {
        isResize = false
      }
    })
  )
}
