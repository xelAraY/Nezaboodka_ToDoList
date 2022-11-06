
import { Transaction } from 'reactronic'
import { RxHtmlBody, Block } from 'verstak'
import { configureDebugging } from './debugging'
import { App } from './models/App'
import { AppWindow } from './views/AppWindow.view'

const version: string = '$BUILD_TIMESTAMP'

configureDebugging()

const app = Transaction.run(null, () => new App(version))

Block.root(() => {
  RxHtmlBody('html > body', null, body => {
    AppWindow(app)
  })
})
