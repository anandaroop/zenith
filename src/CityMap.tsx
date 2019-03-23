import React from 'react'
import styled, { keyframes } from 'styled-components'
import mapboxgl from 'mapbox-gl'
import cities from './cities.json'
import secrets from './secrets.json'
import { fullScreen } from './theme'

interface Props {
  /** index of a city in the cities array */
  index: number

  /** duration of animation, in milliseconds */
  duration: number
}

export class CityMap extends React.Component<Props> {
  private mapDiv: React.RefObject<HTMLDivElement>

  // @ts-ignore
  private map: mapboxgl.Map

  constructor(props: Props) {
    super(props)
    this.mapDiv = React.createRef()
  }

  setup = () => {
    // @ts-ignore
    mapboxgl.accessToken = secrets.MAPBOX_ACCESS_TOKEN

    this.map = new mapboxgl.Map({
      container: this.mapDiv.current as Element,
      style: 'mapbox://styles/mapbox/light-v9',
      zoom: 12
    })

    this.recenter()
    this.fadeOut()
  }

  componentDidMount() {
    this.setup()
  }

  recenter = () => {
    const { index } = this.props
    const { lat, lng } = cities[index].coordinates
    this.map.setCenter([lng, lat])
  }

  fadeOut = () => {
    this.mapDiv.current!.classList.add('animating')
    setTimeout(() => {
      this.mapDiv.current!.classList.remove('animating')
    }, this.props.duration * 0.9)
  }

  componentDidUpdate(prevProps: Props) {
    const { index } = this.props
    const { index: prevIndex } = prevProps
    if (index !== prevIndex) {
      this.recenter()
      this.fadeOut()
    }
  }

  render() {
    const { duration } = this.props
    return <MapDiv ref={this.mapDiv} duration={duration} />
  }
}

const fades = keyframes`
  0% { opacity: 0; }
 10% { opacity: 0; }
 20% { opacity: 0; }
 30% { opacity: 1; }
 40% { opacity: 1; }
 50% { opacity: 1; }
 60% { opacity: 1; }
 70% { opacity: 1; }
 80% { opacity: 1; }
 90% { opacity: 0; }
100% { opacity: 0; }
`

interface MapDivProps {
  readonly duration: number
}

const MapDiv = styled.div<MapDivProps>`
  ${fullScreen}
  z-index: 1;
  opacity: 0;

  &.animating {
    opacity: 1;
    animation-name: ${fades};
    animation-duration: ${({ duration }: any) => duration / 1000}s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
  }
`

export default CityMap
