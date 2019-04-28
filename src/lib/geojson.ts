import { CityResponse } from './metaphysics'

export const cityResultsToGeoJson = (data: CityResponse) => {
  const fairsWithLocations = data.city.fairs.edges
    .filter(edge => edge.node.location)
    .map(edge => edge.node)
  const fairFeatures = fairsWithLocations.map(fair => ({
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

  const showsWithLocations = data.city.shows.edges
    .filter(edge => edge.node.location)
    .map(edge => edge.node)
  const showFeatures = showsWithLocations.map(show => ({
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
