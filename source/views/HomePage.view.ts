import { Div, Img, RxUL, TextArea } from 'reactronic-dom'
import { PageView } from './Page.view'
import { style } from './Page.css'
import { App } from '../models/App'
import { TaskBlock } from './Task.view'

export function HomePageView(app: App) {
  return (
    PageView(app, e => {
      RxUL('List', null, e => {
        e.className = style.class.List
        let id = 0
        app.tasksList.forEach(element => {
          if (element.isActive) {
            TaskBlock(element, id.toString(), app)
            id++
          }
        })

        app.tasksList.forEach(element => {
          if (!element.isActive) {
            TaskBlock(element, id.toString(), app)
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
          e.placeholder = 'Enter the task...'
          e.dataForSensor.keyboard = () => {
            if (inputArea.value.trim() != ''){
              app.addTask(inputArea.value)
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
        })

        Div('Submit', e => {
          e.className = style.class.Submit
          e.dataForSensor.click = () => {
            if (inputArea.value.trim() != ''){
              app.addTask(inputArea.value)
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