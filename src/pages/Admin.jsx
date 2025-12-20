import React from "react";
export default function Admin(){
  return (
    <div className="device admin-full">
      <div className="admin-hero">
        <div className="title"><h2>Admin Panel</h2><div style={{fontSize:12}}>Overview</div></div>
      </div>
      <div className="admin-stats">
        <div className="stat"><strong>847</strong><small>Members</small></div>
        <div className="stat"><strong>12 kg</strong><small>CO₂ Saved</small></div>
        <div className="stat"><strong>15</strong><small>Open Reports</small></div>
      </div>
      <div style={{marginTop:12}}>Admin features placeholder — use server endpoints to manage data.</div>
    </div>
  );
}
