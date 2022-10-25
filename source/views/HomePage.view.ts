import { Div, Img, RxUL, RxSelect, Select, TextArea, RxNode } from 'reactronic-dom'
import { PageView } from './Page.view'
import { style } from './Page.css'
import { App } from '../models/App'
import { TaskBlock } from './Task.view'
import { Priority } from '../models/Task'

function DisplayPriority(app: App, priority: string) {
  if (app.GetCount(priority) !== 0){
    Div('Priority_Name'+priority, e => {
      e.className = style.class.Priority_Name
      e.innerHTML = priority
    })
  }
  app.tasksList.forEach(element => {
    if (element.isActive && element.priority === priority) {
      TaskBlock(element, app.id.toString(), app)
      app.id++
    }
  })

  app.tasksList.forEach(element => {
    if (!element.isActive && element.priority === priority) {
      TaskBlock(element, app.id.toString(), app)
      app.id++
    }
  })
}

export function HomePageView(app: App) {
  return (
    PageView(app, e => {
      let options: HTMLOptionsCollection
      let select: HTMLSelectElement

      let taskListElement: HTMLElement
      RxUL('List', null, e => {
        taskListElement = e
        e.className = style.class.List
        for (const priority in Priority){
          DisplayPriority(app, priority)
        }
      })

      let resizeFunction: Function
      Div('Input_Block', block => {
        block.className = style.class.Input_Block
        let inputArea: HTMLTextAreaElement
        TextArea('Input_Area', e => {
          inputArea = e
          e.className = style.class.Input_Area
          e.placeholder = 'Enter the task...'
          e.dataForSensor.keyboard = () => {
            if (inputArea.value.trim() != ''){
              app.addTask(inputArea.value, select.options[select.selectedIndex].value)
              inputArea.value = ''
            }
          }
          let isResize = false
          resizeFunction = (_: MouseEvent) => {
            if (!isResize)
              return
            const y = _.offsetY
            const height = e.offsetHeight
            let heightStyle:string
            if (height - y > 35 && _.pageY != 0){
              heightStyle = (height - y).toString() + 'px'
            }else{
              heightStyle = '35 px'
            }
            e.style.height = heightStyle
            e.style.maxHeight = heightStyle
            taskListElement.style.height = 'calc(100vh - (135px + ' + heightStyle + ' ) )'
            console.log(height - y)
          }
          e.onmousemove = (_) => {
            const delta = Math.abs(_.offsetY / e.offsetHeight)
            if (isResize){
              resizeFunction(_)
            }
            if ((delta < 0.05) || (1 - delta < 0.05)){
              e.style.cursor = 'ns-resize'
              if (_.buttons === 1){
                isResize = true
              }
              else{
                isResize = false
              }

            }else{
              e.style.cursor = 'default'
            }
          }
          e.onmouseleave = (_) => {
            isResize = false
          }
        })
        RxSelect('Priority', null, e => {
          e.className = style.class.Priority
          select = e
          options = e.options
          for(const priority in Priority){
            options[options.length] = new Option(priority, priority, priority === Priority.Today ? true : false)
          }
        })

        Div('Submit', e => {
          e.className = style.class.Submit
          e.dataForSensor.click = () => {
            if (inputArea.value.trim() != ''){
              app.addTask(inputArea.value, select.options[select.selectedIndex].value)
              inputArea.value = ''
            }
          }
          Img('Submit_Img', e => {
            e.src = '../assets/plus-solid.svg'
            e.className = style.class.Submit_Img
          })
        })
      })
    })
  )
}

function findLinesCount(text: string):number{
  const reg = /\r\n|\r|\n/
  return text.split(reg).length

}