import { Application, viewEngine, engineFactory, adapterFactory } from './deps.ts'
import router from './route.ts'

const PORT = 8080

const server = new Application()

const ejsEngine = engineFactory.getEjsEngine()
const oakAdapter = adapterFactory.getOakAdapter()

server.use(viewEngine(oakAdapter, ejsEngine, {
  viewRoot: './view',
  viewExt: '.ejs',
}))
server.use(router.routes())
server.use(router.allowedMethods())

console.log(`HTTP webserver running.  Access it at:  http://localhost:${PORT}/ 🦕`);
