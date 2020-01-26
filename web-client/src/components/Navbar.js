import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import NavItem from './NavItem'

export default withRouter(
      class Navigation extends Component {
        render() {
          return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
              <Link className="navbar-brand" to="/">
                Music Discoverer
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarTogglerDemo02"
                aria-controls="navbarTogglerDemo02"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                  <NavItem to="/">Home</NavItem>
                  <NavItem to="/download-album">Download album</NavItem>
                </ul>
              </div>
            </nav>
          )
        }
      }
    )
