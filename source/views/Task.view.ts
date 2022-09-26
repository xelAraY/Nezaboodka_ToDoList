import { Div, Img, RxLI } from 'reactronic-dom'
import { Task } from '../models/Task'
import { App } from '../models/App'
import { style } from './Task.css'

export function taskBlock(task: Task, id: string, app: App) {
  return (
    RxLI('Task'+id, task, e => {
      e.className = style.class.Task
      let inputArea: HTMLDivElement
      if (!task.isEdit) {
        Div('Task_text', e => {
          if (task.isActive) {
            e.className = style.class.Active_Task_text
          }
          else {
            e.className = style.class.Done_Task_text
          }

          e.dataForSensor.click = () => task.changeState()
          e.innerHTML = task.text
        })
      }
      else {
        Div('Input_text', e => {
          e.contentEditable = 'true'
          inputArea = e
          e.dataForSensor.keyboard = () => {
            if (e.innerHTML !== '')
              app.editTask(task, e.innerHTML)
          }
          e.innerHTML = task.text
          e.className = style.class.Input_text
        })
      }

      if (task.isActive) {
        Div('Task_edit', e => {
          e.className = style.class.Task_edit
          e.dataForSensor.click = () => task.isEdit ? app.editTask(task, inputArea.innerHTML) : app.editTask(task)
          Img('Edit_icon', e => {
            e.src = task.isEdit ? '../assets/check-solid.svg' : '../assets/pencil-solid.svg'
            e.className = style.class.Edit_Icon
          })
        })
      }

      Div('Task_delete', e => {
        e.className = style.class.Task_delete
        e.dataForSensor.click = () => { app.deleteTask(task) }
        Img('Delete-icon', e => {
          e.src = '../assets/trash-solid.svg'
          e.className = style.class.Delete_Icon
        })
      })
    })
  )
}