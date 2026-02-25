export default function DocsWebhooks() {
  return (
    <div className="doc-content">
      <h1>Webhooks &amp; Events</h1>
      <p className="doc-subtitle">Receive real-time notifications for call lifecycle events.</p>

      <h2>Setting Up Webhooks</h2>
      <p>
        Configure your webhook URL in Settings &rarr; General. Aerwave sends POST requests
        to your endpoint for every call event.
      </p>
      <pre><code>{`POST https://your-app.com/webhook
Content-Type: application/json
X-Aerwave-Signature: sha256=...

{
  "event": "call.completed",
  "call_id": "call_abc123",
  "agent_id": "ag_xyz",
  "duration_seconds": 142,
  "disposition": "appointment_booked",
  "transcript": [...],
  "recording_url": "https://..."
}`}</code></pre>

      <h2>Event Types</h2>
      <ul>
        <li><code>call.started</code> — call connected to recipient</li>
        <li><code>call.completed</code> — call ended normally</li>
        <li><code>call.failed</code> — call could not connect</li>
        <li><code>call.transferred</code> — agent transferred to human</li>
        <li><code>campaign.started</code> — campaign began dialing</li>
        <li><code>campaign.completed</code> — all leads in campaign processed</li>
        <li><code>stt.timeout</code> — speech recognition timed out</li>
      </ul>

      <h2>Verifying Signatures</h2>
      <p>
        Every webhook includes an <code>X-Aerwave-Signature</code> header. Verify it
        using your webhook secret to ensure the request came from Aerwave:
      </p>
      <pre><code>{`const crypto = require('crypto');

function verify(payload, signature, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return \`sha256=\${expected}\` === signature;
}`}</code></pre>

      <div className="doc-callout">
        <p>Webhook deliveries are retried up to 3 times with exponential backoff if your endpoint returns a non-2xx status.</p>
      </div>
    </div>
  );
}
