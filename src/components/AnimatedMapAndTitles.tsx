import * as React from 'react'
import cities from '../data/cities.json'
import { CityTitle } from './CityTitle'
import { CityMap } from './CityMap'
import { Progress } from './Progress'

interface Props {
  /** how many milliseconds to spend in each city  */
  duration: number
}

interface State {
  /** index of a city in the cities array */
  currentIndex: number
}

export class AnimatedMapAndTitles extends React.Component<Props, State> {
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
    setInterval(this.advance, this.props.duration)
  }

  render() {
    const { currentIndex } = this.state
    const { duration } = this.props
    const props = { index: currentIndex, duration }

    return (
      <React.Fragment>
        <CityTitle {...props} />
        <CityMap {...props} />
        <Progress index={currentIndex} />
      </React.Fragment>
    )
  }
}
