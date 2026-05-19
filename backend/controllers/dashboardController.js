const axios = require('axios');

const getFullDashboard = async (req, res) => {
    try {
        // Run all cloud requests in parallel for maximum speed (Cloud Performance)
        const [twitterData, githubData, linkedinData] = await Promise.all([
            // 1. Twitter Fetch (using Bearer Token)
            axios.get(`https://api.twitter.com/2/users/by/username/${process.env.X_USERNAME}`, {
                headers: { 'Authorization': `Bearer ${process.env.X_BEARER_TOKEN}` }
            }).catch(() => ({ data: { data: { name: "Twitter User", public_metrics: { followers_count: 0 } } } })),

            // 2. GitHub Fetch
            axios.get(`https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos`, {
                headers: { 'Authorization': `token ${process.env.GITHUB_TOKEN}` }
            }).catch(() => ({ data: [] })),

            // 3. LinkedIn Fetch via RapidAPI
            axios.get(`https://${process.env.RAPIDAPI_HOST}/get-linkedin-profile`, {
                params: { linkedin_url: process.env.LINKEDIN_PROFILE_URL },
                headers: { 'x-rapidapi-key': process.env.RAPIDAPI_KEY, 'x-rapidapi-host': process.env.RAPIDAPI_HOST }
            }).catch(() => ({ data: { data: { first_name: "LinkedIn", last_name: "User", connections_count: 0 } } }))
        ]);

        // Clean and unify the data for the UI
        res.json({
            twitter: twitterData.data.data,
            github: githubData.data.slice(0, 3), // Just top 3 repos for clean UI
            linkedin: linkedinData.data.data
        });
    } catch (error) {
        res.status(500).json({ message: "Dashboard aggregation failed" });
    }
};

module.exports = { getFullDashboard };