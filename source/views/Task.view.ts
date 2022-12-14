import { Div, Img, RxLI } from 'verstak'
import { Task } from '../models/Task'
import { App } from '../models/App'
import { style } from './Task.css'

export function TaskBlock(task: Task, app: App) {
  return (
    RxLI('Task'+task.id, undefined, (e: HTMLElement) => {
      e.className = style.class.Task
      let inputArea: HTMLDivElement

      e.dataForSensor.htmlDraggable = task.isActive && !task.isEdit ? task : undefined
      e.dataForSensor.htmlDrag = task.isActive && !task.isEdit ? task : undefined
      e.draggable = task.isActive && !task.isEdit ? true : false

      if (!task.isEdit) {
        Div('Task_text', undefined, e => {
          if (task.isActive) {
            e.className = style.class.Active_Task_text
          }
          else {
            e.className = style.class.Done_Task_text
          }

          e.dataForSensor.click = () => task.changeState()
          let inputText = task.text
          inputText = inputText.replace(/\n/g, '<br>')
          e.innerHTML = inputText
        })
      }
      else {
        Div('Input_text', undefined, e => {
          e.contentEditable = 'true'
          inputArea = e
          e.innerHTML = task.text
          e.className = style.class.Input_text
          e.focus()
          e.dataForSensor.keyboard = (isEdit: boolean) => {
            if (e.innerHTML.trim() !== '' && isEdit)
              app.editTask(task, e.innerHTML)
            if (!isEdit)
              e.innerHTML = e.innerHTML + '\n'
          }
        })
      }

      if (task.isActive) {
        Div('Task_edit', undefined, e => {
          e.className = style.class.Task_edit
          e.dataForSensor.click = () => {
            task.isEdit ? app.editTask(task, inputArea.innerHTML) : app.editTask(task)
          }
          Img('Edit_icon', undefined, e => {
            e.src = task.isEdit ? '../assets/check-solid.svg' : '../assets/pencil-solid.svg'
            e.className = style.class.Edit_Icon
            e.setAttribute('draggable', 'false')
          })
          e.draggable = false
        })
      }

      Div('Task_delete', undefined, e => {
        e.className = style.class.Task_delete
        e.dataForSensor.click = () => { app.deleteTask(task) }
        Img('Delete-icon', undefined, e => {
          e.src = '../assets/trash-solid.svg'
          e.className = style.class.Delete_Icon
          e.setAttribute('draggable', 'false')
        })
        e.draggable = false
      })
    })
  )
}