import { Application, viewEngine, engineFactory, adapterFactory } from './deps.ts'
import router from './route.ts'

const env = Deno.env.toObject()
const PORT = env.PORT || 8080
const HOST = env.HOST || 'localhost'

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

server.listen(`${HOST}:${PORT}`)
