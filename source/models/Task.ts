import {ObservableObject, transactional} from 'reactronic'

export enum Priority {
  Overdue = 'Overdue',
  Today = 'Today',
  Tomorrow = 'Tomorrow',
  Soon = 'Soon',
}

export class Task extends ObservableObject {
  text: string
  newText: string
  isActive: boolean
  isEdit: boolean
  priority: string

  constructor(text: string, priority: string){
    super()
    this.text = text
    this.newText = ''
    this.isActive = true
    this.isEdit = false
    this.priority = priority
  }

  @transactional
  changeState(): void {
    this.isActive = !this.isActive
  }
}