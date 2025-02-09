// Initialize map using Leaflet.js
const map = L.map('map').setView([20, 0], 2);  // Set initial view to global scale

// Add OpenStreetMap TileLayer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Variables for asteroid settings
let impactLocation = null;
let country = 'Unknown';
let population = 1000000; // Default population
let asteroidSize = 100;  // In meters (changeable)
let asteroidSpeed = 20000;  // In mph (changeable)
let asteroidAngle = 45;  // Angle of impact

// Placeholder country population data
const countryPopulations = {
    "United States": 331000000,
    "France": 67000000,
    "India": 1380000000,
    "China": 1440000000,
    "Brazil": 213000000,
    "Unknown": 1000000
};

// Function to handle map click and set impact location
map.on('click', function(event) {
    impactLocation = event.latlng;
    country = getCountryFromCoords(impactLocation.lat, impactLocation.lng);
    population = countryPopulations[country] || 1000000; // Default if unknown
    L.marker([impactLocation.lat, impactLocation.lng]).addTo(map);
    document.getElementById('launchBtn').innerText = 'Launch Asteroid';
});

// Function to get country from coordinates (Simplified for now)
function getCountryFromCoords(lat, lng) {
    if (lat > 30 && lat < 50 && lng > -130 && lng < -70) return "United States";
    if (lat > 48 && lat < 55 && lng > 2 && lng < 10) return "France";
    if (lat > 5 && lat < 35 && lng > 68 && lng < 97) return "India";
    if (lat > 15 && lat < 55 && lng > 70 && lng < 135) return "China";
    if (lat > -34 && lat < 5 && lng > -74 && lng < -34) return "Brazil";
    return "Unknown";
}

// Function to launch the asteroid and display results
function launchAsteroid() {
    if (!impactLocation) {
        alert('Please select a location on the map!');
        return;
    }

    const impactDetails = calculateImpactDetails();
    
    document.getElementById('result').innerHTML = `
        <h3>Impact Details</h3>
        <div class="fact">
            <img src="https://neal.fun/asteroid-launcher/crater.jpg" alt="Crater">
            <div>
                <h4>Crater Size</h4>
                <p>${impactDetails.craterSize} mile wide</p>
            </div>
        </div>
        <div class="fact">
            <img src="https://neal.fun/asteroid-launcher/pressure.jpg" alt="Shockwave">
            <div>
                <h4>Shockwave</h4>
                <p>${impactDetails.shockwave} decibel</p>
            </div>
        </div>
        <div class="fact">
            <img src="https://neal.fun/asteroid-launcher/fireball.jpg" alt="Fireball">
            <div>
                <h4>Fireball</h4>
                <p>${impactDetails.fireball} miles wide</p>
            </div>
        </div>
        <div class="fact">
            <img src="https://neal.fun/asteroid-launcher/wind.jpg" alt="Wind Speed">
            <div>
                <h4>Peak Wind Speed</h4>
                <p>${impactDetails.windSpeed} mph</p>
            </div>
        </div>
        <div class="fact">
            <img src="https://neal.fun/asteroid-launcher/earthquake.jpg" alt="Earthquake">
            <div>
                <h4>Earthquake</h4>
                <p>${impactDetails.earthquake} magnitude</p>
            </div>
        </div>
        <div class="fact">
            <h4>Death Toll</h4>
            <p>${impactDetails.deathToll.toLocaleString()} people</p>
        </div>
        <button class="btn" onclick="launchAnother()">Launch Another</button>
    `;
}

// Function to calculate impact details based on asteroid properties
function calculateImpactDetails() {
    const craterSize = (asteroidSize * asteroidSpeed) / 20000;  // Simple formula for crater size
    const shockwave = Math.min(300, asteroidSpeed / 100); // Shockwave intensity capped at 300 dB
    const fireball = craterSize * 2; // Fireball radius roughly 2x crater
    const windSpeed = asteroidSpeed * 0.6; // Wind speed scales with impact speed
    const earthquake = Math.min(9.5, (asteroidSize / 100) * 6); // Earthquake magnitude limit 9.5

    // Death toll based on population density and impact energy
    const impactEnergy = asteroidSize * asteroidSpeed * 0.001; // Simplified energy estimation
    let deathToll = Math.min(population, Math.round(impactEnergy * 0.005)); // Scale deaths

    return {
        craterSize: craterSize.toFixed(1),
        shockwave: shockwave.toFixed(1),
        fireball: fireball.toFixed(1),
        windSpeed: windSpeed.toFixed(1),
        earthquake: earthquake.toFixed(1),
        deathToll
    };
}

// Function to reset and launch another asteroid
function launchAnother() {
    impactLocation = null;
    country = 'Unknown';
    population = 1000000;
    document.getElementById('launchBtn').innerText = 'Select Impact Location';
    document.getElementById('result').innerHTML = '';
}

// Event listener for launch button
document.getElementById('launchBtn').addEventListener('click', launchAsteroid);
