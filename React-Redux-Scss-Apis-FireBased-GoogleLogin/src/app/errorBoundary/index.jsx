import React, { Component } from 'react';
import './errorBoundary.scss';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("Caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="innerError">
            <div className="innerError-boundary">
              <h1>Sala !! Hug Diya Gandu 💩</h1>
              <p className='subHeading'>Looks like we've hit a snag. But don't worry, it's not your fault (probably).</p>
              <p className='errText'><strong className='subHeadingErr'>Error : </strong> {this.state.error && this.state.error.toString()}</p>
              <p className='errText'><strong className='subHeadingErr'>Details : </strong> {this.state.errorInfo && this.state.errorInfo.componentStack}</p>
              <p>Here's a joke to lighten the mood:</p>
              <p><b><em>"Why do programmers prefer dark mode? Because light attracts bugs!"</em></b></p>
              <button onClick={() => window.location.reload()}>Reload Page</button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
