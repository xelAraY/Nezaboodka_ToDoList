import { Monitor } from 'reactronic'

export class Globals {
  static readonly Loading = Monitor.create('Loading', 1000, 250, 1)
}
