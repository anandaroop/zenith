const METAPHYSICS_URL = 'https://metaphysics-production.artsy.net/'

export const cityResults = async (slug: string) => {
  const query = cityQuery(slug)
  const body = { query }
  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  let jsonPromise

  try {
    const response = await fetch(METAPHYSICS_URL, options)
    jsonPromise = response.json()
  } catch (error) {
    console.error('Error:', error)
    jsonPromise = Promise.resolve(nullResult)
  } finally {
    return jsonPromise
  }
}

const cityQuery = (slug: string) => `{
  city(slug: "${slug}") {
    fairs(status: RUNNING_AND_UPCOMING, first: 2147483647) {
      edges {
        node {
          location {
            coordinates {
              lat
              lng
            }
          }
        }
      }
    }

    shows(includeStubShows: true, status: RUNNING, first: 2147483647) {
      edges {
        node {
          partner {
            ... on Partner {
              type
            }
          }
          location {
            coordinates {
              lat
              lng
            }
          }
        }
      }
    }
  }
}`

const nullResult: { data: CityResponse } = {
  data: {
    city: {
      fairs: { edges: [] },
      shows: { edges: [] }
    }
  }
}

export interface CityResponse {
  city: {
    fairs: { edges: FairEdge[] }
    shows: { edges: ShowEdge[] }
  }
}

export interface FairResponse {
  location: {
    coordinates: LatLng
  }
}

export interface FairEdge {
  node: FairResponse
}

export interface ShowResponse {
  partner: {
    type: string
  }
  location: {
    coordinates: LatLng
  }
}

export interface ShowEdge {
  node: ShowResponse
}

export interface LatLng {
  lat: number
  lng: number
}
