import React, { Component } from 'react'

interface IProtectedProps {
  store: any
}
class Protected extends Component<IProtectedProps, any> {
      render() {
        return (
          <div className="container">
            <h1>Protected</h1>

            <p>Content on this page is only accessible when authenticated and authorized</p>

            <p>
              <strong>Your token:</strong> {this.props.store.authStore.token}
            </p>
          </div>
        )
      }
    }
export default Protected
