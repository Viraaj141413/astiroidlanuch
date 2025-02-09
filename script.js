// Initialize map using Leaflet.js
const map = L.map('map').setView([20, 0], 2);  // Set initial view to global scale

// Add OpenStreetMap TileLayer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Store the location of the asteroid impact
let impactLocation = null;
let country = 'Unknown';

// Function to handle map click and set impact location
map.on('click', function(event) {
    const latlng = event.latlng;
    impactLocation = latlng;

    // Set the country based on the location (for now, using a simple lookup for demonstration)
    // Replace with an API or service for actual location-to-country lookup
    country = getCountryFromCoords(latlng.lat, latlng.lng); // Placeholder for country lookup

    // Show a marker at the selected location
    L.marker([latlng.lat, latlng.lng]).addTo(map);

    // Update the button to say "Launch Asteroid"
    document.getElementById('launchBtn').innerText = 'Launch Asteroid';
});

// Placeholder function to map lat/lng to a country (use an actual geo API in a production app)
function getCountryFromCoords(lat, lng) {
    // A very simplified example. In production, use a geolocation service.
    if (lat > 30 && lat < 50 && lng > -130 && lng < -70) {
        return 'United States';
    } else if (lat > 48 && lat < 55 && lng > 2 && lng < 10) {
        return 'France';
    }
    return 'Unknown Country';
}

// Function to launch the asteroid and display results
function launchAsteroid() {
    if (!impactLocation) {
        alert('Please select a location on the map!');
        return;
    }

    // Sample impact result calculation (use actual formulas and values in production)
    const impactDetails = calculateImpactDetails();

    // Show the impact details
    document.getElementById('result').innerHTML = `
        <h3>Impact Details</h3>
        <div class="fact">
            <img src="https://neal.fun/asteroid-launcher/crater.jpg" alt="Crater">
            <div>
                <h4>Crater Size</h4>
                <p>1.8 mile wide crater</p>
            </div>
        </div>
        <div class="fact">
            <img src="https://neal.fun/asteroid-launcher/pressure.jpg" alt="Shockwave">
            <div>
                <h4>Shockwave</h4>
                <p>263 decibel shock wave</p>
            </div>
        </div>
        <div class="fact">
            <img src="https://neal.fun/asteroid-launcher/fireball.jpg" alt="Fireball">
            <div>
                <h4>Fireball</h4>
                <p>8.3 mile wide fireball</p>
            </div>
        </div>
        <div class="fact">
            <img src="https://neal.fun/asteroid-launcher/wind.jpg" alt="Wind Speed">
            <div>
                <h4>Peak Wind Speed</h4>
                <p>30,403 mph peak wind speed</p>
            </div>
        </div>
        <div class="fact">
            <img src="https://neal.fun/asteroid-launcher/earthquake.jpg" alt="Earthquake">
            <div>
                <h4>Earthquake</h4>
                <p>5.8 magnitude earthquake felt 26 miles away</p>
            </div>
        </div>
        <button class="btn" onclick="launchAnother()">Launch Another</button>
    `;
}

// Function to calculate impact details (you can modify this with actual formulas)
function calculateImpactDetails() {
    // These are just sample calculations, you can use more complex formulas in a real app
    return {
        craterSize: '1.8 mile wide',
        shockwave: '263 decibel',
        fireball: '8.3 miles wide',
        windSpeed: '30,403 mph',
        earthquake: '5.8 magnitude'
    };
}

// Function to launch another asteroid
function launchAnother() {
    // Reset the map and controls for a new asteroid launch
    impactLocation = null;
    country = 'Unknown';
    document.getElementById('launchBtn').innerText = 'Select Impact Location';

    // Reset the result display
    document.getElementById('result').innerHTML = '';
}

// Event listener for launch button
document.getElementById('launchBtn').addEventListener('click', launchAsteroid);
