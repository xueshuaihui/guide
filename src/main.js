import { version } from '../package.json'
import Guide from './guide/index.js'
Guide.prototype.version = version
window.Guide = Guide
