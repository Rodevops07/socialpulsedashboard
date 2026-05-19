const axios = require('axios');

const getSocialStats = async (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }

    try {
        // Real GitHub API call
        const githubRes = await axios.get(`https://api.github.com/users/${username}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        const github = githubRes.data;

        // GitHub ke real followers se baaki platforms calculate karo
        const followers = github.followers || 0;
        const repos = github.public_repos || 0;

        const stats = {
            influencer: {
                name: github.name || username.toUpperCase(),
                bio: github.bio || "GitHub Developer",
                avatar: github.avatar_url || `https://github.com/identicons/${username}.png`,
                location: github.location || "Unknown"
            },
            cloudHealth: "Operational",
            platforms: [
                {
                    name: 'GitHub',
                    handle: `@${username}`,
                    metrics: { followers: followers },
                    color: '#ffffff',
                    trend: `+${(repos * 0.5).toFixed(1)}%`
                },
                {
                    name: 'Twitter',
                    handle: `@${username}`,
                    // Twitter followers estimated from GitHub followers
                    metrics: { followers: Math.round(followers * 1.4) },
                    color: '#1DA1F2',
                    trend: `+${(followers * 0.012).toFixed(1)}%`
                },
                {
                    name: 'LinkedIn',
                    handle: username.toUpperCase(),
                    // LinkedIn connections estimated
                    metrics: { connections: Math.round(followers * 0.6) },
                    color: '#0A66C2',
                    trend: `+${(followers * 0.004).toFixed(1)}%`
                },
                {
                    name: 'Instagram',
                    handle: `@${username}`,
                    // Instagram followers estimated
                    metrics: { followers: Math.round(followers * 0.8) },
                    color: '#E4405F',
                    trend: `+${(followers * 0.015).toFixed(1)}%`
                }
            ]
        };

        res.status(200).json(stats);

    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ message: `GitHub user '${username}' not found` });
        }
        console.error("GitHub API Error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { getSocialStats };