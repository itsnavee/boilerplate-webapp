export default function DocsApiReference() {
  return (
    <div className="doc-content">
      <h1>API Reference</h1>
      <p className="doc-subtitle">RESTful API for managing agents, calls, campaigns, and more.</p>

      <h2>Authentication</h2>
      <p>
        All requests require a Bearer token. Generate API keys in Settings &rarr; API Keys.
      </p>
      <pre><code>{`Authorization: Bearer aer_live_xxxxxxxxxxxx`}</code></pre>

      <h2>Base URL</h2>
      <pre><code>{`https://api.aerwave.io/v1`}</code></pre>

      <h2>Agents</h2>

      <h3>List Agents</h3>
      <pre><code>{`GET /v1/agents

Response:
{
  "data": [
    {
      "id": "ag_abc123",
      "name": "Sales Agent v2",
      "voice": "alloy",
      "model": "gpt-4o-mini",
      "created_at": "2026-01-15T10:30:00Z"
    }
  ],
  "pagination": { "page": 1, "per_page": 20, "total": 5 }
}`}</code></pre>

      <h3>Create Agent</h3>
      <pre><code>{`POST /v1/agents
{
  "name": "My Agent",
  "voice": "nova",
  "model": "gpt-4o-mini",
  "system_prompt": "You are a helpful assistant..."
}`}</code></pre>

      <h2>Calls</h2>

      <h3>Initiate Call</h3>
      <pre><code>{`POST /v1/calls
{
  "agent_id": "ag_abc123",
  "to": "+14155551234",
  "from": "+18005559999",
  "metadata": { "lead_id": "ld_789" }
}`}</code></pre>

      <h3>Get Call Details</h3>
      <pre><code>{`GET /v1/calls/:call_id

Response:
{
  "id": "call_xyz",
  "status": "completed",
  "duration_seconds": 142,
  "disposition": "appointment_booked",
  "recording_url": "https://...",
  "transcript": [...]
}`}</code></pre>

      <div className="doc-callout">
        <p>Rate limits: 100 req/min for standard keys, 1000 req/min for enterprise. Check the <code>X-RateLimit-Remaining</code> header.</p>
      </div>
    </div>
  );
}
