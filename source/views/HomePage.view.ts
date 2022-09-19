import { Div, Img, Input, RxDiv, RxLI, RxUL, TextArea } from 'reactronic-dom'
import { PageView } from './Page.view'
import { style } from './Page.css'
import { App, ProjectLink } from '../models/App'
import { taskBlock } from './Task.view'

export function HomePageView(app: App) {
  return (
    PageView(app.homePage, e => {
      RxUL('List', null, e => {
        e.className = style.class.List
        let id = 0
        app.tasksList.forEach(element => {
          if (element.isActive) {
            taskBlock(element, id.toString(), app)
            id++
          }
        })

        if (id === app.tasksList.length && id !== 0){
          Div('Completed_Tasks', e => {
            e.className = style.class.Completed_Tasks
            e.innerHTML = 'Completed '+id.toString()
          })
        }

        app.tasksList.forEach(element => {
          if (!element.isActive) {
            taskBlock(element, id.toString(), app)
            id++
          }
        })
      })

      Div('Input_Block', e => {
        e.className = style.class.Input_Block
        let inputArea: HTMLTextAreaElement
        TextArea('Input_Area', e => {
          inputArea = e
          e.className = style.class.Input_Area
          e.placeholder = 'Enter the task'
          e.dataForSensor.keyboard = () => {
            if (inputArea.value.trim() != ''){
              app.addTask(inputArea.value)
            }
          }
        })

        Div('Submit', e => {
          e.className = style.class.Submit
          e.dataForSensor.click = () => {
            if (inputArea.value.trim() != ''){
              app.addTask(inputArea.value)
            }
          }
          Img('Submit_Img', e => {
            e.src = '../assets/plus.png'
            e.className = style.class.Submit_Img
          })
        })
      })
    })
  )
}
