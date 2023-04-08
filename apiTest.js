const axios = require('axios')

const fetchLastFm = async () => {

    try {

        const API_KEY = '4f0e195af4564f92bf9a375a5dee07f6'
        const search = 'Johnny Cash'

        const response = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${search}&api_key=${API_KEY}&format=json`)
        console.log(response.data.results.artistmatches)

    } catch(err) {
        console.log(err)
    }
}

fetchLastFm()