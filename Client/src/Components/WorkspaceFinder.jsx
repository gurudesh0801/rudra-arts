import React, { useState } from "react";
import { FaWifi, FaMapMarkerAlt, FaStar, FaCheckCircle } from "react-icons/fa";

const workspaces = [
  {
    name: "Cafe Bloom",
    location: "Koregaon Park, Pune",
    wifi: "50 Mbps",
    rating: 4.5,
    occupancy: "Moderate",
  },
  {
    name: "WorkHive Coworking",
    location: "Baner, Pune",
    wifi: "100 Mbps",
    rating: 4.8,
    occupancy: "Low",
  },
  {
    name: "Bean & Brews",
    location: "Viman Nagar, Pune",
    wifi: "30 Mbps",
    rating: 4.2,
    occupancy: "High",
  },
];

export default function WorkspaceFinder() {
  const [search, setSearch] = useState("");

  const filteredWorkspaces = workspaces.filter((ws) =>
    ws.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "20px",
        background: "#f8f8f8",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Smart Workspace Finder
      </h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search for workspaces..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {filteredWorkspaces.map((ws, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>{ws.name}</h2>
            <p>
              <FaMapMarkerAlt
                style={{ color: "#007bff", marginRight: "5px" }}
              />{" "}
              {ws.location}
            </p>
            <p>
              <FaWifi style={{ color: "green", marginRight: "5px" }} />{" "}
              {ws.wifi} Wi-Fi
            </p>
            <p>
              <FaStar style={{ color: "gold", marginRight: "5px" }} />{" "}
              {ws.rating} Rating
            </p>
            <p>
              <FaCheckCircle
                style={{
                  color:
                    ws.occupancy === "Low"
                      ? "green"
                      : ws.occupancy === "Moderate"
                      ? "orange"
                      : "red",
                  marginRight: "5px",
                }}
              />
              Occupancy: {ws.occupancy}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
