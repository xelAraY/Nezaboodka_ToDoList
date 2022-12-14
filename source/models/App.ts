import { ObservableObject, reactive, transactional } from 'reactronic'
import { HtmlSensors, KeyboardModifiers } from 'verstak'
import { Task } from './Task'

export const ProjectLink = 'https://github.com/xelAraY/Nezaboodka_ToDoList'

export class App extends ObservableObject {
  sensors: HtmlSensors
  tasksList: Task[]

  constructor(version: string) {
    super()
    this.sensors = new HtmlSensors()

    const tasks = JSON.parse(localStorage.getItem('tasks') as string) as Task[]
    if (tasks !== null){
      this.tasksList = tasks.map( element => {
        const task = new Task(element.text, element.priority, element.id)
        task.isActive = element.isActive
        task.isEdit = element.isEdit
        return task
      })
    }
    else {
      this.tasksList = []
    }
  }

  convertText(text: string): string {
    text.trim()
    return text
  }

  @transactional
  GetCount(priority: string): number{
    let count = 0
    this.tasksList.forEach((task) => {
      if (task.priority === priority){
        count++
      }
    })
    return count
  }

  @transactional
  addTask(text: string, priority: string): void {
    const taskList = this.tasksList = this.tasksList.toMutable()
    let id
    const length = taskList.length + 1
    length > 1 ? id = taskList[length-2].id + 1 : id = 0
    taskList.push(new Task(this.convertText(text), priority, id))
  }

  @transactional
  deleteTask(task: Task): void {
    const taskList = this.tasksList = this.tasksList.toMutable()
    taskList.splice(this.tasksList.indexOf(task), 1)
  }

  @transactional
  editTask(task: Task, newText?: string): void {
    if (task.isEdit && newText != null) {
      task.text = this.convertText(newText)
    }
    task.isEdit = !task.isEdit
  }

  @reactive
  handleClick(): void {
    const pointer = this.sensors.pointer
    const data = pointer.clicked
    if (data instanceof Function) {
      data()
    }
  }

  @reactive
  handleKeybord(): void {
    const keyboard = this.sensors.keyboard
    if ((keyboard.down === 'Enter') && (keyboard.modifiers !== KeyboardModifiers.Shift)) {
      const data = keyboard.elementDataList[0]
      if (data instanceof Function) {
        data(true)
      }
      this.sensors.keyboard.preventDefault = true
    }
  }

  @reactive
  saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasksList))
  }

  @reactive
  handleDragAndDrop(): void{
    const drag = this.sensors.htmlDrag
    const task = drag.draggable as Task | undefined
    if (task !== undefined){
      if (drag.dragStarted){
        drag.effectAllowed = 'copyMove'
        if (drag.draggingOver){
          if (drag.dragTarget instanceof Task){
            drag.dropAllowed = true
            drag.dropEffect = 'copy'
          }
          else{
            drag.dropAllowed = false
          }
        }

        if (drag.dragFinished){
          if (drag.dropped){
            if (drag.dragTarget instanceof Task){
              const startInd = this.tasksList.indexOf(task)
              const endInd = this.tasksList.indexOf(drag.dragTarget)
              this.swapTasks(startInd, endInd)
            }
          }
        }
      }
    }
  }

  swapTasks(startInd: number, endInd: number):void{
    if (startInd != endInd){
      const operation = startInd > endInd ? -1 : 1
      const tasksList = this.tasksList = this.tasksList.toMutable()

      tasksList[startInd].priority = tasksList[endInd].priority
      const modulo = Math.abs(startInd - endInd)
      let leftOffset, rightOffset
      for(let i = 0; i < modulo; i++){
        leftOffset = i * operation + startInd
        rightOffset = ((i + 1) * operation) + startInd;
        [tasksList[leftOffset], tasksList[rightOffset]] = [this.tasksList[rightOffset], this.tasksList[leftOffset]]
      }

    }
  }
}
