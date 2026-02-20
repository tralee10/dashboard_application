mapboxgl.accessToken = 'pk.eyJ1IjoidHJhbGVlMTAiLCJhIjoiY202cmp6MTd5MjNrMDJpcHY4N3JtZDFuNCJ9.FDnd5ftof56RdHpFHNsjxQ';

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 11,
    center: [-122.335167, 47.608013] // Seattle
});

// Legend
const legend = document.getElementById('legend');
legend.innerHTML = `
    <strong>Collision Severity</strong>
    <p class="break"><i class="dot" style="background: green; width: 12px; height: 12px;"></i> Minor</p>
    <p class="break"><i class="dot" style="background: orange; width: 12px; height: 12px;"></i> Injury</p>
    <p class="break"><i class="dot" style="background: red; width: 12px; height: 12px;"></i> Fatal</p>
`;

async function loadCollisions() {
    const response = await fetch('assets/SeaCollisionsData.geojson');
    const data = await response.json();

    map.on('load', () => {
        map.addSource('collisions', {
            type: 'geojson',
            data: data
        });

        map.addLayer({
            id: 'collision-points',
            type: 'circle',
            source: 'collisions',
            paint: {
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['get', 'INJURIES'],
                    0, 5,
                    1, 10,
                    3, 15
                ],
                'circle-color': [
                    'match',
                    ['get', 'SEVERITYCODE'],
                    '1', 'green',
                    '2', 'orange',
                    '3', 'red',
                    'grey'
                ],
                'circle-opacity': 0.6,
                'circle-stroke-width': 1,
                'circle-stroke-color': 'white'
            }
        });

        // Click popup
        map.on('click', 'collision-points', e => {
            const props = e.features[0].properties;
            new mapboxgl.Popup()
                .setLngLat(e.features[0].geometry.coordinates)
                .setHTML(`<strong>Location:</strong> ${props.LOCATION}<br>
                          <strong>Type:</strong> ${props.COLLISIONTYPE}<br>
                          <strong>Injuries:</strong> ${props.INJURIES}`)
                .addTo(map);
        });

        updateDashboard(data.features);
    });

    map.on('moveend', () => {
        const bounds = map.getBounds();
        const visible = data.features.filter(f => {
            const [lng, lat] = f.geometry.coordinates;
            return bounds.contains([lng, lat]);
        });
        updateDashboard(visible);
    });
}

// Update dashboard
function updateDashboard(visibleFeatures) {
    document.getElementById("collision-count").innerText = visibleFeatures.length;
    renderInjuryChart(visibleFeatures);
}

// Simple Bar Diagram for Injuries
function renderInjuryChart(visibleFeatures) {
    const container = document.getElementById("injury-chart");
    container.innerHTML = "";

    let zero = 0, onePlus = 0, threePlus = 0;

    visibleFeatures.forEach(f => {
        let injuries = parseInt(f.properties.INJURIES) || 0;
        if (injuries === 0) zero++;
        if (injuries >= 1) onePlus++;
        if (injuries >= 3) threePlus++;
    });

    const data = [
        { label: "0 Injuries", value: zero },
        { label: "1+ Injuries", value: onePlus },
        { label: "3+ Injuries", value: threePlus }
    ];

    const maxValue = Math.max(...data.map(d => d.value), 1);

    data.forEach(d => {
        const wrapper = document.createElement("div");
        wrapper.className = "bar-container";

        const label = document.createElement("div");
        label.className = "bar-label";
        label.innerText = d.label;

        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.width = (d.value / maxValue * 100) + "%";

        const value = document.createElement("div");
        value.className = "bar-value";
        value.innerText = d.value + " collisions";

        wrapper.appendChild(label);
        wrapper.appendChild(bar);
        wrapper.appendChild(value);

        container.appendChild(wrapper);
    });
}

const reset = document.getElementById('reset');
reset.addEventListener('click', () => {
    map.flyTo({
        zoom: 11,
        center: [-122.335167, 47.608013]
    });
    map.setFilter('collision-points', null);
});

loadCollisions();
