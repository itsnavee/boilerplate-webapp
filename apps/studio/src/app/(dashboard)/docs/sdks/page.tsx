export default function DocsSdks() {
  return (
    <div className="doc-content">
      <h1>SDKs</h1>
      <p className="doc-subtitle">Official client libraries for Node.js, Python, and more.</p>

      <h2>Node.js</h2>
      <pre><code>{`npm install @aerwave/sdk`}</code></pre>
      <pre><code>{`import { Aerwave } from '@aerwave/sdk';

const client = new Aerwave({ apiKey: 'aer_live_xxxx' });

// Create an agent
const agent = await client.agents.create({
  name: 'Sales Bot',
  voice: 'alloy',
  model: 'gpt-4o-mini',
  systemPrompt: 'You are a sales representative...',
});

// Make a call
const call = await client.calls.create({
  agentId: agent.id,
  to: '+14155551234',
  from: '+18005559999',
});

console.log('Call started:', call.id);`}</code></pre>

      <h2>Python</h2>
      <pre><code>{`pip install aerwave`}</code></pre>
      <pre><code>{`from aerwave import Aerwave

client = Aerwave(api_key="aer_live_xxxx")

# List agents
agents = client.agents.list()
for agent in agents:
    print(agent.name, agent.id)

# Trigger a call
call = client.calls.create(
    agent_id="ag_abc123",
    to="+14155551234",
    from_number="+18005559999",
)
print(f"Call {call.id} started")`}</code></pre>

      <h2>Webhook Helpers</h2>
      <p>Both SDKs include webhook verification utilities:</p>
      <pre><code>{`// Node.js
const isValid = Aerwave.webhooks.verify(
  req.body,
  req.headers['x-aerwave-signature'],
  webhookSecret
);`}</code></pre>

      <div className="doc-callout">
        <p>SDKs auto-handle pagination, retries, and rate limiting. Check the GitHub repos for full documentation.</p>
      </div>
    </div>
  );
}
