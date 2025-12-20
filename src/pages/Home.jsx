import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

export default function Home() {
  return (
    <div className="home-container">

      {/* Header */}
      <div className="home-header">
        <h1 className="home-title">🌍 Smart Waste Management</h1>
        <p className="home-subtitle">
          Real-time waste tracking, environmental insights & community impact.
          Manage bins, reduce waste, save carbon.
        </p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>📊 Air Quality Index</h3>
          <p className="stat-value">90</p>
          <p className="stat-info">Static · Jaipur</p>
        </div>

        <div className="stat-card">
          <h3>🧹 Cleanliness Score</h3>
          <p className="stat-value">68</p>
          <p className="stat-info">City Cleanliness Level</p>
          <div className="meter-bar">
            <div className="meter-fill" style={{ width: "68%" }} />
          </div>
        </div>

        <div className="stat-card">
          <h3>🌤 Current Weather</h3>
          <p className="stat-value">26°C</p>
          <p className="stat-info">Clear</p>
        </div>

        <div className="stat-card">
          <h3>♻ Recycling Rate</h3>
          <p className="stat-value">68%</p>
          <p className="stat-info">↑ 4% vs last month</p>
        </div>
      </div>

      <h2 className="section-title">📍 Nearby Waste Bins</h2>

      {/* PRIMARY BUTTONS */}
      <div className="buttons-row">
        <Link to="/consultant" className="btn blue">Ask AI</Link>
        <Link to="/map" className="btn green">View Map</Link>
        <Link to="/feedback" className="btn yellow">Report Issue</Link>
        <Link to="/quiz" className="btn purple">Quiz</Link>
      </div>

      {/* SECONDARY BUTTONS (LOGIN / SIGNUP) */}
      <div className="buttons-row secondary">
        <Link to="/login" className="btn outline">Login</Link>
        <Link to="/signup" className="btn outline">Sign Up</Link>
      </div>

    </div>
  );
}
