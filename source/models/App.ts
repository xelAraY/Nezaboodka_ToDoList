import { ReactiveObject, reaction, isnonreactive, transaction } from 'reactronic'
import { HtmlSensors } from 'reactronic-dom'
import { Page } from './Page'
import { Task } from './Task'

export const ProjectLink = 'https://github.com/xelAraY/Nezaboodka_ToDoList'

export class App extends ReactiveObject {
  @isnonreactive readonly version: string
  @isnonreactive readonly homePage: Page;
  sensors: HtmlSensors
  tasksList: Task[] = []

  constructor(version: string) {
    super()
    this.version = version
    this.homePage = new Page('/home')
    this.sensors = new HtmlSensors()
  }

  @reaction
  handleClock(): void {
    const pointer = this.sensors.pointer
    const data = pointer.clicked
    if (data instanceof Function){
      data()
    }
  }

  convertText(text: string): string {
    while (text.includes('\n')) {
      text.replace('\n', '<br/>')
    }
    return text
  }

  @transaction
  addTask(text: string): void {
    const taskList = this.tasksList = this.tasksList.toMutable()
    taskList.push(new Task(this.convertText(text)))
  }

  @transaction
  deleteTask(task: Task): void {
    const taskList = this.tasksList = this.tasksList.toMutable()
    taskList.splice(this.tasksList.indexOf(task), 1)
  }

  @transaction
  editTask(task: Task, newText?: string): void {
    if (task.isEdit) {
      if (newText != null) {
        task.text = this.convertText(newText)
      }
      task.isEdit = !task.isEdit
    }
    else
      task.isEdit = !task.isEdit
  }
}
