import { Div } from 'reactron'
import { App } from '../models/App'
import { style } from './AppWindow.css'
import { HomePageView } from './HomePage.view'

export function AppWindow(
  app: App) {
  return (
    Div('Body', e => {
      e.className = style.class.Body
      app.sensors.listen(e)
      HomePageView(app)
    })
  )
}
