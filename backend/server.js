cat > ~/Capstone/backend/server.js << 'EOF'
const express = require('express');
const cors = require('cors');
const socialRoutes = require('./routes/socialRoutes');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api/social', socialRoutes);

app.get('/', (req, res) => res.send('Cloud API is Running...'));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
EOF
