const axios = require('axios');

const getGithubStats = async (req, res) => {
    const username = process.env.GITHUB_USERNAME;
    const token = process.env.GITHUB_TOKEN;

    try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
            headers: {
                'Authorization': `token ${token}`
            }
        });

        // UI/UX Logic: We only want to send the most important data to the frontend
        const repoData = response.data.map(repo => ({
            name: repo.name,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            url: repo.html_url
        }));

        res.status(200).json(repoData);
    } catch (error) {
        res.status(500).json({ message: "GitHub Cloud Fetch Failed", error: error.message });
    }
};

module.exports = { getGithubStats };