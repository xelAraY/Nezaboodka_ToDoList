import {ReactiveObject, transaction} from 'reactronic'

export class Task extends ReactiveObject {
  text: string
  isActive: boolean
  isEdit: boolean

  constructor(text: string){
    super()
    this.text = text
    this.isActive = true
    this.isEdit = false
  }

  @transaction
  changeState(): void {
    this.isActive = !this.isActive
  }
}