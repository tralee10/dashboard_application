# Seattle Vehicle Collision 2026 Dashboard

This project showcases an interactive web-based collision dashboard for the City of Seattle built using Mapbox GL JS and GeoJSON data. The dashboard visualizes vehicle collision locations using proportional symbols to represent injury severity. Circle size and color differ depending on the severity at each collision site, allowing users to quickly interpret spatial distribution across the city. The project demonstrates thematic mapping, interactive visualization, and dashboard design principles within a web mapping application.

## AI Disclosure

AI tools were used to debug code only.


## Web Map

You can view the interactive web map here:  
https://tralee10.github.io/dashboard_application/index.html


## Features

- Full-screen interactive Mapbox GL JS map  
- Proportional symbols based on number of injuries  
- Color-coded dots for different collision severity levels
- Interactive popups displaying specific collision details  
- Dynamic dashboard showing visible collision count  
- Legend interpreting collision severity 
- Reset map view button  


## Map Layers / Data Visualization

### Basemap

The basemap uses a dark Mapbox style to provide geographic context while maintaining strong visual contrast with the collision symbols. The dark theme helps highlight injury severity colors and improves overall readability of the proportional symbols. Streets, neighborhoods, and waterfront features provide spatial context without overwhelming the thematic data.

- **Zoom levels:** 10–14  
- **Examined area:** City of Seattle  
- **Basemap style:** Mapbox Dark  


### Collision Points

This thematic layer displays vehicle collision locations across Seattle using a GeoJSON dataset. Each collision is symbolized using proportional circles based on the collision severity recorded.  

- Smaller teal circles represent **0 injuries**  
- Medium yellow circles represent **1+ injuries**  
- Larger red circles represent **3+ injuries**  

The proportional symbol design allows users to visually compare severity across locations. Popups provide additional information, including location coordinates, collision type, and number of injuries.

- **Zoom levels:** 11
- **Examined area:** City of Seattle


### Dashboard Panel

The dashboard panel enhances the map by providing contextual and interactive elements. It includes:

- A brief project description  
- A dynamically updated count of visible collisions within the current map extent  
- A visual injury severity diagram  
- A legend explaining symbol size and color  
- A reset map view button  


## Data Sources

- **Collision Data:** [Seattle Collision GeoJSON dataset](https://data-seattlecitygis.opendata.arcgis.com/datasets/90a68d4709b54327a6bc1dfa1b900f8d_0/explore?location=47.614571%2C-122.333025%2C11)
- **Basemap:** Mapbox GL JS Dark Style  
