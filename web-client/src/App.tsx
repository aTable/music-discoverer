import React, { Component, createRef } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import NotificationSystem from 'react-notification-system'
import AppStore from './stores/AppStore'
import uiStore from './stores/UiStore'

import Navbar from './components/Navbar'
import PrivateRoute from './components/hocs/PrivateRoute'

import NotFound from './pages/NotFound'
import Home from './pages/Home'
import DownloadAlbum from './pages/DownloadAlbum'
import Login from './pages/Login'
import Protected from './pages/Protected'

const appStore = new AppStore()

class App extends Component {
  notificationSystemRef: React.RefObject<any> = createRef()

  componentDidMount() {
    appStore.init()
    uiStore.init(this.notificationSystemRef)
  }

  render() {
    return (
        <Router>
          <div id="application">
            <NotificationSystem ref={this.notificationSystemRef} />

            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/download-album" component={DownloadAlbum} />
              <Route exact path="/login" component={Login} />

              <PrivateRoute exact path="/protected" component={Protected} />

              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
    )
  }
}

export default App
