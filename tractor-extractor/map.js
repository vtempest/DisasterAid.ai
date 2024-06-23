
const map = new mapboxgl.Map({
    container: 'map',
    center: [-122.420679, 37.772537],
    zoom: 13,
    style: 'mapbox://styles/mapbox/standard',
    config: {
        // Initial configuration for the Mapbox Standard style set above. By default, its ID is `basemap`.
        basemap: {
            // Here, we're setting the light preset to `night`.
            lightPreset: 'night'
        }
    }
});

// Set marker options.

const marker = new mapboxgl.Marker({
    color: "#FFFFFF",
    draggable: true
}).setLngLat([30.5, 50.5])
    .addTo(map);