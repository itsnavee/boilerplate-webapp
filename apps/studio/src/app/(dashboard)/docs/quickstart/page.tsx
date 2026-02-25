export default function DocsQuickstart() {
  return (
    <div className="doc-content">
      <h1>Quickstart</h1>
      <p className="doc-subtitle">Deploy your first AI voice agent in under 5 minutes.</p>

      <div className="doc-step">
        <div className="doc-step-num">1</div>
        <div className="doc-step-content">
          <h4>Create an Agent</h4>
          <p>Navigate to Build &rarr; Agents and click &ldquo;Create Agent&rdquo;. Give it a name, select a voice, and write a system prompt.</p>
        </div>
      </div>

      <div className="doc-step">
        <div className="doc-step-num">2</div>
        <div className="doc-step-content">
          <h4>Assign a Phone Number</h4>
          <p>Go to System &rarr; Phone Numbers and provision a number. Link it to your agent for inbound calls.</p>
        </div>
      </div>

      <div className="doc-step">
        <div className="doc-step-num">3</div>
        <div className="doc-step-content">
          <h4>Test in Sandbox</h4>
          <p>Use the Sandbox to place a test call. You can listen to the audio stream in real time and see the transcript.</p>
        </div>
      </div>

      <div className="doc-step">
        <div className="doc-step-num">4</div>
        <div className="doc-step-content">
          <h4>Launch a Campaign</h4>
          <p>Upload a lead list and create an outbound campaign. Set calling hours, retry rules, and webhook endpoints.</p>
        </div>
      </div>

      <h2>API Quick Start</h2>
      <p>You can also create agents and trigger calls via the REST API:</p>
      <pre><code>{`curl -X POST https://api.aerwave.io/v1/calls \\
  -H "Authorization: Bearer aer_live_xxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent_id": "ag_abc123",
    "to": "+14155551234",
    "from": "+18005559999"
  }'`}</code></pre>

      <div className="doc-callout">
        <p>All API calls are authenticated with your API key. Generate one in Settings &rarr; API Keys.</p>
      </div>
    </div>
  );
}
