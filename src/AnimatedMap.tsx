import * as React from 'react'
import cities from './cities.json'

interface Props {
  speed: number
}

interface State {
  currentIndex: number
}

export class AnimatedMap extends React.Component<Props, State> {
  state = {
    currentIndex: 0
  }

  advance = () => {
    const { currentIndex } = this.state
    const nextIndex = (currentIndex + 1) % cities.length
    this.setState({
      currentIndex: nextIndex
    })
  }

  componentDidMount() {
    setInterval(this.advance, this.props.speed)
  }

  render() {
    const { currentIndex } = this.state
    return <div>Hi {cities[currentIndex].name}</div>
  }
}
