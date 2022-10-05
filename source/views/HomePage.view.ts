import { Div, Img, RxUL, RxSelect, Select, TextArea } from 'reactronic-dom'
import { PageView } from './Page.view'
import { style } from './Page.css'
import { App } from '../models/App'
import { TaskBlock } from './Task.view'
import { Priority } from '../models/Task'

function DisplayPriority(app: App, priority: string) {
  let id = 0

  Div('Priority_Name', e => {
    e.className = style.class.Priority_Name
    e.innerHTML = priority
  })

  app.tasksList.forEach(element => {
    if (element.isActive && element.priority === priority) {
      TaskBlock(element, id.toString(), app)
      id++
    }
  })

  app.tasksList.forEach(element => {
    if (!element.isActive && element.priority === priority) {
      TaskBlock(element, id.toString(), app)
      id++
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

        for (const priority in Priority) {
          console.log(priority)
          DisplayPriority(app, priority)
        }
      })

      Div('Input_Block', e => {
        e.className = style.class.Input_Block
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
        })

        RxSelect('Priority', null, e => {
          e.className = style.class.Priority
          select = e
          options = e.options
          options[options.length] = new Option(Priority.Today, Priority.Today, true)
          options[options.length] = new Option(Priority.Tomorrow, Priority.Tomorrow, false)
          options[options.length] = new Option(Priority.Soon, Priority.Soon, false)
          options[options.length] = new Option(Priority.Overdue, Priority.Overdue, false)
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
