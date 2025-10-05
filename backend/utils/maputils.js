

import L from "leaflet";

// ------------------------------
// Create Map with default config
// ------------------------------
export const createMap = (elementId, center = [28.6139, 77.209], zoom = 10) => {
  const map = L.map(elementId).setView(center, zoom);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  return map;
};

// ------------------------------
// Add marker to the map
// ------------------------------
export const addMarker = (map, coords, popupText = "") => {
  const marker = L.marker(coords).addTo(map);
  if (popupText) {
    marker.bindPopup(popupText);
  }
  return marker;
};

// ------------------------------
// Draw heatmap (requires leaflet.heat plugin)
// ------------------------------
export const drawHeatMap = (map, heatData) => {
  if (!heatData || heatData.length === 0) {
    console.warn("⚠️ No heatmap data provided");
    return null;
  }

  const heat = L.heatLayer(heatData, {
    radius: 25,
    blur: 15,
    maxZoom: 17,
  }).addTo(map);

  return heat;
};

// ------------------------------
// Draw polygon (for risk zones etc.)
// ------------------------------
export const drawPolygon = (map, coordinates, options = { color: "red" }) => {
  if (!coordinates || coordinates.length === 0) {
    console.warn("⚠️ No polygon coordinates provided");
    return null;
  }

  const polygon = L.polygon(coordinates, options).addTo(map);
  return polygon;
};
