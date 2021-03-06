import React from 'react'
import styled, { keyframes } from 'styled-components'
import mapboxgl from 'mapbox-gl'
import cities from '../data/cities.json'
import { fullScreen } from '../theme'
import { cityResults, CityResponse } from '../lib/metaphysics'
import { cityResultsToGeoJson } from '../lib/geojson'
import * as turf from '@turf/turf'

interface Props {
  /** index of a city in the cities array */
  index: number

  /** duration of animation, in milliseconds */
  duration: number
}

const START_ZOOM = 12.5
const END_ZOOM = 11.5

export class CityMap extends React.Component<Props> {
  private mapDiv: React.RefObject<HTMLDivElement>

  // @ts-ignore
  private map: mapboxgl.Map

  /** A central point based on the distribution of live data */
  // @ts-ignore
  private centralTendency: [number, number]

  constructor(props: Props) {
    super(props)
    this.mapDiv = React.createRef()
  }

  setup = () => {
    // @ts-ignore
    mapboxgl.accessToken = "pk.eyJ1IjoiYXJ0c3lpdCIsImEiOiJjanRtNHppaXUwaGpwNGFwbGFnNWFkNm1zIn0.bJGYSHlzlUhs3xfQI2hRCg"

    this.map = new mapboxgl.Map({
      container: this.mapDiv.current as Element,
      style: 'mapbox://styles/artsyit/cjt3q9ph72z781gp751433es8',
      zoom: START_ZOOM
    })

    this.map.on('load', () => {
      this.map.addSource('showsAndFairs', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
        cluster: true
        // clusterMaxZoom: 14, // Max zoom to cluster points on
      })

      // style the cluster markers
      this.map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'showsAndFairs',
        filter: ['has', 'point_count'],

        paint: {
          'circle-radius': ['step', ['get', 'point_count'], 15, 5, 20, 30, 30],
          'circle-pitch-alignment': 'map'
        }
      })

      // style the cluster counts
      this.map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'showsAndFairs',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count}',
          'text-font': ['Unica77 LL Medium'],
          'text-size': 14
        },
        paint: {
          'text-color': '#ffffff'
        }
      })

      // style the single, un-clustered points
      this.map.addLayer({
        id: 'unclustered-point',
        type: 'symbol',
        source: 'showsAndFairs',
        filter: ['!', ['has', 'point_count']],
        layout: {
          'icon-image': 'pin',
          'icon-size': 0.75,
          'icon-offset': [0, -20]
        }
      })

      // setup the viewport for the first time
      this.reset()
    })
  }

  fetchData = () => {
    const city = cities[this.props.index]
    return cityResults(city.slug)
  }

  initializeMapFeatures = (data: CityResponse) => {
    const featureCollection = cityResultsToGeoJson(data)
    const source = this.map.getSource('showsAndFairs')
    // @ts-ignore
    if (source) source.setData(featureCollection)

    // @ts-ignore
    this.centralTendency = turf.centerOfMass(featureCollection).geometry.coordinates
  }

  reset = () => {
    this.fetchData().then(json => {
      this.initializeMapFeatures(json.data)
      this.initializeViewport()
      this.animateViewport()
    })
    this.animateFades()
  }

  initializeViewport = () => {
    this.map.setCenter(this.centralTendency) // animate *from* the center of mass
    this.map.setZoom(START_ZOOM)
    this.map.setBearing(0)
    this.map.setPitch(10)
  }

  animateViewport = () => {
    const { index, duration } = this.props
    const { lat, lng } = cities[index].coordinates
    setTimeout(() => {
      this.map.easeTo({
        center: [lng, lat], // animate *to* the canonical center
        zoom: END_ZOOM,
        bearing: 30 * Math.random() - 15,
        pitch: 50,
        duration: 0.9 * duration
      })
    }, 0.1 * duration)
  }

  animateFades = () => {
    this.mapDiv.current!.classList.add('animating')
    setTimeout(() => {
      this.mapDiv.current!.classList.remove('animating')
    }, this.props.duration * 0.9)
  }

  componentDidMount() {
    this.setup()
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
 90% { opacity: 0; }
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
