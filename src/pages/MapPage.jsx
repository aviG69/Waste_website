import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapPage() {
  useEffect(() => {
    const mapEl = document.getElementById("map");
    if (!mapEl) return;

    // 🟣 Set default map view to Jaipur
    const map = L.map("map").setView([26.9124, 75.7873], 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { 
      maxZoom: 19 
    }).addTo(map);

    // 🟢 Updated Jaipur Bin Locations
    const bins = [
      { id: 1, name: "MI Road Center", lat: 26.9160, lng: 75.8130, fill: 34, type: "Recycling" },
      { id: 2, name: "Central Park Jaipur", lat: 26.9040, lng: 75.8000, fill: 78, type: "General" },
      { id: 3, name: "Vaishali Nagar Sector 5", lat: 26.9120, lng: 75.7410, fill: 42, type: "Composting" },
      { id: 4, name: "Johari Bazaar", lat: 26.9185, lng: 75.8190, fill: 61, type: "General" },
      { id: 5, name: "Hawa Mahal Zone", lat: 26.9239, lng: 75.8267, fill: 52, type: "Recycling" },
      { id: 6, name: "Tech Park Sitapura", lat: 26.7980, lng: 75.8300, fill: 88, type: "General" }
    ];

    function getColor(fill) {
      if (fill <= 33) return "#2E8B57";
      if (fill <= 66) return "#FFB74D";
      return "#F44336";
    }

    bins.forEach(bin => {
      const html = `
        <div style="
          background:${getColor(bin.fill)};
          width:32px;
          height:32px;
          border-radius:50%;
          display:flex;
          align-items:center;
          justify-content:center;
          color:white;
          font-weight:700;
          border:3px solid white">
          ${Math.round(bin.fill)}%
        </div>`;

      const icon = L.divIcon({
        className: "custom-marker",
        html,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([bin.lat, bin.lng], { icon }).addTo(map);
      marker.bindPopup(
        `<strong>${bin.name}</strong><br>Type: ${bin.type}<br>Fill: ${bin.fill}%`
      );
    });

    const list = document.getElementById("bins-list");
    if (list) {
      list.innerHTML = "";
      bins.forEach(bin => {
        const card = document.createElement("div");
        card.className = "bin-card";
        const color = getColor(bin.fill);
        const emoji = bin.fill <= 33 ? "🟢" : bin.fill <= 66 ? "🟡" : "🔴";

        card.innerHTML = `
          <div class="bin-icon" style="background:${color}22;">${emoji}</div>
          <div class="bin-name">${bin.name}</div>
          <div class="bin-fill">Type: ${bin.type}</div>
          <div class="fill-bar"><i style="width:${bin.fill}%"></i></div>
          <div style="font-size:11px;color:#7E9A98;margin-bottom:8px">
            Fill: ${bin.fill}% · Updated 2m ago
          </div>
          <div style="display:flex;gap:6px;">
            <button class="bin-action">Navigate</button>
            <button class="bin-action">Report</button>
          </div>
        `;
        list.appendChild(card);
      });
    }

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="map-page">
      <div className="map-container">
        <div className="map-header">
          <h1>Live Waste Management Map</h1>
          <p>Real-time bin locations, fill levels & community reports</p>
        </div>

        <div id="map" style={{ height: 420, borderRadius: 12, marginTop: 12 }}></div>

        <h3 style={{ marginTop: 20 }}>📦 Nearby Waste Bins</h3>
        <div className="bins-list" id="bins-list" />
      </div>
    </div>
  );
}
