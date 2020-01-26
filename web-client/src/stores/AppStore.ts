// import config from '../config'
// import {} from '../api'

/**
 * Monolithic store representing your applications state. Add additional stores broken down into domains as required
 */
class AppStore {
  name:string = 'hello computer'
  get nameLength() {
    return this.name.length
  }

  /**
   * Any domain stores that need to interact with each other need to be registered
   */
  constructor() {
  }

  init() {}
}

export default AppStore
