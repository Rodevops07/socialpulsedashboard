const axios = require('axios');

const getLinkedinData = async (req, res) => {
    const options = {
        method: 'GET',
        url: `https://${process.env.RAPIDAPI_HOST}/get-linkedin-profile`,
        params: { linkedin_url: process.env.LINKEDIN_PROFILE_URL },
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'x-rapidapi-host': process.env.RAPIDAPI_HOST
        }
    };

    try {
        const response = await axios.request(options);
        
        // UI/UX Logic: Mapping the complex RapidAPI response to a clean dashboard object
        const data = response.data.data; 
        const cleanProfile = {
            fullName: `${data.first_name} ${data.last_name}`,
            headline: data.headline,
            location: data.city,
            connections: data.connections_count,
            profilePic: data.profile_pic_url
        };

        res.status(200).json(cleanProfile);
    } catch (error) {
        res.status(500).json({ message: "LinkedIn Cloud Fetch Failed", error: error.message });
    }
};

module.exports = { getLinkedinData };