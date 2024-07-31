class ApiController {
  constructor() {
    if (ApiController.instance) {
      return ApiController.instance
    }

    ApiController.instance = this
  }

  static getInstance() {
    if (!ApiController.instance) {
      ApiController.instance = new ApiController()
    }

    return ApiController.instance
  }

  fetchVehiclesList = async (setLoading) => {
    console.log(`fetchVehiclesList called...`)
    setLoading(true)

    const apiURL = `https://binayathapamagar.github.io/Group5.github.io/vehicles.json`
    console.log(`apiURL: ${apiURL}`)

    try {
      const response = await fetch(apiURL)
      console.log(`Response status: ${response.status}`)

      if (response.ok) {
        const jsonData = await response.json()
        console.log(`Response JSON: ${JSON.stringify(jsonData)}`)

        if (jsonData) {
          console.log(`Vehicles received: ${jsonData.length}`)
          return jsonData
        } else {
          throw new Error('Unexpected response structure.')
        }
      } else {
        console.log(`Unsuccessful response from server: ${response.status}`)
        throw new Error('Error fetching Vehicles from the API.')
      }
    } catch (error) {
      console.log(`Error while connecting to the API: ${error}`)
      throw error
    } finally {
      setLoading(false)
    }
  }

  fetchVideoDetailsWith = async (videoId, setLoading) => {
    console.log(`fetchVideoDetailsWith called...`)
    setLoading(true)

    const apiURL = `https://api.dailymotion.com/video/${videoId}?fields=thumbnail_240_url,description,views_total,title,created_time`
    console.log(`apiURL: ${apiURL}`)

    try {
      const response = await fetch(apiURL)
      console.log(`Response status: ${response.status}`)

      if (response.ok) {
        const jsonData = await response.json()
        console.log(`Response JSON: ${JSON.stringify(jsonData)}`)

        // Check if the expected data is present
        if (jsonData) {
          console.log(`Video details received.`)
          return jsonData
        } else {
          throw new Error('Unexpected response structure.')
        }
      } else {
        console.log(`Unsuccessful response from server: ${response.status}`)
        throw new Error('Error fetching video details from the API.')
      }
    } catch (error) {
      console.log(`Error while connecting to the API: ${error}`)
      throw error
    } finally {
      setLoading(false)
    }
  }
}

export default ApiController
