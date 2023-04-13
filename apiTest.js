const axios = require('axios')
require('dotenv').config()

const fetchLastFm = async () => {

    try {

        const API_KEY = '862ef386160b33a8aeee1d7790db5f77'
        const search = 'Johnny Cash'

        const response = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${search}&api_key=${API_KEY}&format=json`)
        console.log(response.data.results.artistmatches)

    } catch(err) {
        console.log(err)
    }
}

fetchLastFm()