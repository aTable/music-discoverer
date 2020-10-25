import React, { useRef } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
//import config from './config'
import NotificationSystem, { System } from 'react-notification-system'
import ErrorBoundary from './components/ErrorBoundary'
import MediaIdentifier from './pages/MediaIdentifier'
import { UiContextProvider } from './stores/UiContext'

interface IAppProps {}

/**
 * The root of the application built with [TypeScript](https://www.typescriptlang.org/)
 * @param props The props
 */
const App = (props: IAppProps) => {
    const notificationSystem = useRef<System>(null)
    return (
        <UiContextProvider notificationSystem={notificationSystem}>
            <NotificationSystem ref={notificationSystem} />
                    <Router>
                        <Navbar />
                        <ErrorBoundary>
                            <Switch>
                                <Route path="/media-identifier" component={MediaIdentifier} />
                                <Route path="/" component={Home} />
                                <Route component={NotFound} />
                            </Switch>
                        </ErrorBoundary>
                    </Router>
        </UiContextProvider>
    )
}

export default App
