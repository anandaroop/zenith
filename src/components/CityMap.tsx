import React from 'react'
import styled, { keyframes } from 'styled-components'
import mapboxgl from 'mapbox-gl'
import cities from '../data/cities.json'
import { fullScreen } from '../theme'

interface Props {
  /** index of a city in the cities array */
  index: number

  /** duration of animation, in milliseconds */
  duration: number
}

const START_ZOOM = 13
const END_ZOOM = 12

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
    mapboxgl.accessToken = "pk.eyJ1IjoiYXJ0c3lpdCIsImEiOiJjanRtNHppaXUwaGpwNGFwbGFnNWFkNm1zIn0.bJGYSHlzlUhs3xfQI2hRCg"

    this.map = new mapboxgl.Map({
      container: this.mapDiv.current as Element,
      style: 'mapbox://styles/artsyit/cjrb59mjb2tsq2tqxl17pfoak',
      zoom: START_ZOOM
    })

    this.reset()
  }

  componentDidMount() {
    this.setup()
  }

  reset = () => {
    this.initializeViewport()
    this.animateViewport()
    this.animateFades()
  }

  initializeViewport = () => {
    const { index } = this.props
    const { lat, lng } = cities[index].coordinates
    this.map.setCenter([lng, lat])
    this.map.setZoom(START_ZOOM)
    this.map.setBearing(0)
    this.map.setPitch(0)
  }

  animateViewport = () => {
    const { duration } = this.props
    setTimeout(() => {
      this.map.easeTo({
        zoom: END_ZOOM,
        bearing: 10 * Math.random() - 5,
        pitch: 50,
        duration: 0.9 * duration,
        offset: [100 * Math.random() - 50, 100 * Math.random() - 50]
      })
    }, 0.1 * duration)
  }

  animateFades = () => {
    this.mapDiv.current!.classList.add('animating')
    setTimeout(() => {
      this.mapDiv.current!.classList.remove('animating')
    }, this.props.duration * 0.99)
  }

  componentDidUpdate(prevProps: Props) {
    const { index } = this.props
    const { index: prevIndex } = prevProps
    if (index !== prevIndex) {
      this.reset()
    }
  }

  render() {
    const { duration } = this.props
    return <MapDiv ref={this.mapDiv} duration={duration} />
  }
}

const fades = keyframes`
  0% { opacity: 0; }
  5% { opacity: 0; }
 10% { opacity: 1; }
 15% { opacity: 1; }
 20% { opacity: 1; }
 25% { opacity: 1; }
 30% { opacity: 1; }
 35% { opacity: 1; }
 40% { opacity: 1; }
 45% { opacity: 1; }
 50% { opacity: 1; }
 55% { opacity: 1; }
 60% { opacity: 1; }
 65% { opacity: 1; }
 70% { opacity: 1; }
 75% { opacity: 1; }
 80% { opacity: 1; }
 85% { opacity: 1; }
 90% { opacity: 1; }
 95% { opacity: 0; }
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
