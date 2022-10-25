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
    PageView(app, e => {
      let options: HTMLOptionsCollection
      let select: HTMLSelectElement

      RxUL('List', null, e => {
        e.className = style.class.List
        for (const priority in Priority){
          DisplayPriority(app, priority)
        }
      })

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
          e.onmousemove = (_) => {
            const delta = Math.abs(_.offsetY / e.offsetHeight)
            if (isResize){
              func(_)
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
          const func = (_: MouseEvent) => {
            const y = _.offsetY
            const height:number = Number(e.style.height.replace('px',''))
            if (height - y > 35 && _.pageY != 0){
              const heightStyle: string = (height - y).toString() + 'px'
              e.style.height = heightStyle
              e.style.maxHeight = heightStyle
            }else{
              e.style.height = '35 px'
              e.style.maxHeight = '35 px'
            }
            console.log(height - y)
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