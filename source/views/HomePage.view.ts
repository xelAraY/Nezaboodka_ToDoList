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

      RxUL('List', null, e => {
        e.className = style.class.List
        for (const priority in Priority){
          DisplayPriority(app, priority)
        }
      })

      Div('Input_Block', e => {
        e.className = style.class.Input_Block
        let inputArea: HTMLTextAreaElement
        TextArea('Input_Area', e => {
          inputArea = e
          e.className = style.class.Input_Area
          e.draggable = true
          e.placeholder = 'Enter the task...'
          e.dataForSensor.keyboard = () => {
            if (inputArea.value.trim() != ''){
              app.addTask(inputArea.value, select.options[select.selectedIndex].value)
              inputArea.value = ''
            }
          }
          e.onkeydown = () => {
            const pixels = findLinesCount(e.value) * 20 + 15
            const strPixels = pixels.toString() + 'px'
            if(e.style.height != strPixels){
              e.style.height = strPixels
              e.style.maxHeight = strPixels
            }
          }
          e.onmousemove = (_) => {
            const delta = Math.abs(_.offsetY / e.offsetHeight)
            if ((delta < 0.05) || (1 - delta < 0.05)){
              e.style.cursor = 'ns-resize'
            }else{
              e.style.cursor = 'default'
            }
          }
          e.ondragend = (_) => {
            const y = _.offsetY
            const height:number = Number(e.style.height.replace('px',''))
            e.style.height = (height - y).toString() + 'px'
            e.style.maxHeight = e.style.height
            e.style.opacity = '1'
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