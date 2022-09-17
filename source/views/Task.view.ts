import { Div, Img, Input, RxLI } from 'reactronic-dom'
import { Task } from '../models/Task'
import { App } from '../models/App'
import { style } from './Task.css'

export function taskBlock(task: Task, id: string, app: App) {
  return (
    RxLI('Task'+id, task, e => {
      e.className = style.class.Task

      if (!task.isEdit) {
        Div('Task_text', e => {
          e.className = style.class.Task_text
          e.dataForSensor.click = () => task.changeState()
          e.innerHTML = task.text
        })
      }
      else {
        Div('Input_text', e => {
          e.contentEditable = 'true'
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
          e.dataForSensor.click = () => task.isEdit ? app.editTask(task, e.innerHTML) : app.editTask(task)
          Img('Edit_icon', e => {
            e.src = task.isEdit ? '../assets/check.png' : '../assets/pencil.png'
          })
        })
      }

      Div('Task_delete', e => {
        e.className = style.class.Task_delete
        e.dataForSensor.click = () => { app.deleteTask }
        Img('Delete-icon', e => {
          e.src = '../assets/trash.png'
        })
      })
    })
  )
}