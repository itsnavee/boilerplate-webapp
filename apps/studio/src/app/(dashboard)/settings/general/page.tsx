"use client";

export default function SettingsGeneral() {
  return (
    <div style={{ maxWidth: "560px" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <label>Company Name</label>
        <input type="text" defaultValue="Demo Company" />
      </div>
      <div style={{ marginBottom: "1.5rem" }}>
        <label>Tenant Slug</label>
        <input type="text" defaultValue="demo" disabled style={{ opacity: 0.6 }} />
      </div>
      <div style={{ marginBottom: "1.5rem" }}>
        <label>Default Voice Tier</label>
        <select defaultValue="tier2">
          <option value="tier1">Tier 1 - Premium (ElevenLabs)</option>
          <option value="tier2">Tier 2 - Standard (Deepgram)</option>
          <option value="tier3">Tier 3 - Economy (Deepgram)</option>
        </select>
      </div>
      <div style={{ marginBottom: "1.5rem" }}>
        <label>Timezone</label>
        <select defaultValue="est">
          <option value="est">Eastern Time (ET)</option>
          <option value="cst">Central Time (CT)</option>
          <option value="pst">Pacific Time (PT)</option>
          <option value="utc">UTC</option>
        </select>
      </div>
      <div style={{ marginBottom: "1.5rem" }}>
        <label>Webhook URL</label>
        <input type="url" placeholder="https://your-app.com/webhook" />
      </div>
      <button className="btn btn-primary">Save Changes</button>
    </div>
  );
}
