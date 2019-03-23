import React from 'react'
import styled from 'styled-components'
import mapboxgl from 'mapbox-gl'
import cities from './cities.json'
import secrets from './secrets.json'

interface Props {
  /** index of a city in the cities array */
  index: number
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
  }

  componentDidMount() {
    this.setup()
  }

  recenter = () => {
    const { index } = this.props
    const { lat, lng } = cities[index].coordinates
    this.map.setCenter([lng, lat])
  }

  componentDidUpdate(prevProps: Props) {
    const { index } = this.props
    const { index: prevIndex } = prevProps
    if (index !== prevIndex) {
      this.recenter()
    }
  }

  render() {
    return <MapDiv ref={this.mapDiv} />
  }
}

const MapDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

export default CityMap
