import { CityResponse } from './metaphysics'

export const cityResultsToGeoJson = (data: CityResponse) => {
  const fairs = data.city.fairs.edges.map(edge => edge.node)
  const fairFeatures = fairs.map(fair => ({
    type: 'Feature',
    properties: {
      type: 'fair'
    },
    geometry: {
      type: 'Point',
      coordinates: [
        fair.location.coordinates.lng,
        fair.location.coordinates.lat
      ]
    }
  }))

  const shows = data.city.shows.edges.map(edge => edge.node)
  const showFeatures = shows.map(show => ({
    type: 'Feature',
    properties: {
      type: 'show'
    },
    geometry: {
      type: 'Point',
      coordinates: [
        show.location.coordinates.lng,
        show.location.coordinates.lat
      ]
    }
  }))

  return {
    type: 'FeatureCollection',
    features: [...fairFeatures, ...showFeatures]
  }
}
