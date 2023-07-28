import React from 'react'
class MyErrorBoundary extends React.Component{
  state = {
    error: null,
    hasError: false,
    errorInfo: null
  }

  static getDerivedStateFromError(error){
    return { hasError: true, error}
  }

  componentDidCatch(error, errorInfo){
    console.log('Error ', error, errorInfo)
  }

  render(){
    if(this.state.hasError){
      return <h1>Error Component</h1>
    }
    return this.props.children
  }
}