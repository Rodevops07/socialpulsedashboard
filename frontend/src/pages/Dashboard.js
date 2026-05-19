// dashboardController.js - Final Local Bypass
const getFullDashboard = async (req, res) => {
    try {
        res.json({
            twitter: { name: "Twitter User", public_metrics: { followers_count: 1250 } },
            github: [
                { id: 1, name: "Campus-Net-Pulse", html_url: "#" },
                { id: 2, name: "Air-Quality-LSTM", html_url: "#" }
            ],
            linkedin: { first_name: "Rohit", last_name: "Pujari", connections_count: 500 }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { getFullDashboard };
