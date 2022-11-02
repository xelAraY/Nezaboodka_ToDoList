import { Div } from 'verstak'
import { App } from '../models/App'
import { style } from './AppWindow.css'
import { HomePageView } from './HomePage.view'

export function AppWindow(
  app: App) {
  return (
    Div('Body', undefined, e => {
      e.className = style.class.Body
      app.sensors.listen(e)
      HomePageView(app)
    })
  )
}
