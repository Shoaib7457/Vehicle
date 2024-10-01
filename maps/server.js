// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
app.use(cors());

let currentIndex = 0;

app.get('/api/vehicle/current', (req, res) => {
  const dataPath = path.join(__dirname, 'data', 'vehicleData.json');

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading vehicle data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const vehicleData = JSON.parse(data);

    if (currentIndex >= vehicleData.length) {
      currentIndex = 0;
    }
    
    const currentVehiclePosition = vehicleData[currentIndex];
    currentIndex++;

    res.json(currentVehiclePosition);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
