const axios = require('axios');

export class LocationIQService{

    async getLocation(queryString: string){
        try {
            const location = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATIONIQ_TOKEN}&q=${queryString}&format=json`);
            return location.data[0];
        } catch (error) {
            return error;
        }
    }

}