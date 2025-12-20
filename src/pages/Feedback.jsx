import React from "react";

export default function Feedback(){
  // helper functions from original page
  const toBase64 = file => new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });

  async function handleSubmit(e){
    e.preventDefault();
    const loc = e.target.loc.value;
    const latlon = e.target.latlon.value.split(",");
    const type = e.target.type.value;
    const desc = e.target.desc.value;
    const file = e.target.photo.files[0];
    let imageBase64 = null;
    if(file) imageBase64 = await toBase64(file);
    const payload = {
      location: loc,
      lat: latlon[0] ? parseFloat(latlon[0].trim()) : null,
      lon: latlon[1] ? parseFloat(latlon[1].trim()) : null,
      description: desc,
      type,
      imageBase64
    };
    try{
      await fetch("/api/feedback", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(payload) });
      alert("✓ Report submitted successfully!");
      e.target.reset();
      const fname = document.getElementById("file-name");
      if(fname) fname.textContent = "";
    }catch(err){
      alert("Error submitting report. Please try again.");
    }
  }

  function updateFileName(){
    const file = document.getElementById("photo")?.files[0];
    const name = document.getElementById("file-name");
    if(file) name.textContent = `✓ ${file.name} (${(file.size/1024).toFixed(1)} KB)`;
    else name.textContent = "";
  }

  return (
    <div className="report-page">
      <div className="report-container">
        <div className="report-hero">
          <h1>Report an Issue</h1>
          <p>Help us improve by reporting waste management issues, pollution, or overflow</p>
        </div>

        <div className="form-card">
          <form id="feedback-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Location Name *</label>
              <input className="form-input" id="loc" name="loc" placeholder="e.g., Main Street Corner, Central Park" required />
            </div>

            <div className="form-group">
              <label className="form-label">GPS Coordinates (optional)</label>
              <input className="form-input" id="latlon" name="latlon" placeholder="Latitude, Longitude" />
            </div>

            <div className="form-group">
              <label className="form-label">Issue Type *</label>
              <select className="form-select" id="type" name="type" required>
                <option>-- Select Issue Type --</option>
                <option>Bin Overflow</option>
                <option>Illegal Dumping</option>
                <option>Foul Odor</option>
                <option>Pollution</option>
                <option>Dust/Air Quality</option>
                <option>Pest Infestation</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea className="form-textarea" id="desc" name="desc" required />
            </div>

            <div className="form-group">
              <label className="form-label">Photo (optional)</label>
              <div className="file-input-wrap">
                <label className="file-input-label">
                  📷 Choose Image
                  <input id="photo" name="photo" type="file" accept="image/*" onChange={updateFileName} />
                </label>
                <div className="file-input-name" id="file-name"></div>
              </div>
            </div>

            <div className="form-buttons">
              <button className="btn-primary" type="submit">✓ Submit Report</button>
              <button type="button" id="view-list" className="btn-secondary" onClick={async ()=>{
                try{
                  const r = await fetch("/api/feedback");
                  const j = await r.json();
                  // show a simple JSON preview in alert (for demo)
                  alert("Reports returned: " + (Array.isArray(j)? j.length : JSON.stringify(j)));
                }catch(e){
                  alert("Error loading reports.");
                }
              }}>📋 View Reports</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
