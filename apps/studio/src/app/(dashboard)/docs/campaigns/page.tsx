export default function DocsCampaigns() {
  return (
    <div className="doc-content">
      <h1>Campaigns</h1>
      <p className="doc-subtitle">Run outbound calling campaigns at scale with AI agents.</p>

      <h2>Creating a Campaign</h2>
      <p>
        A campaign combines an agent, a lead list, a phone number, and scheduling rules.
        Navigate to Outreach &rarr; Campaigns and click &ldquo;New Campaign&rdquo;.
      </p>

      <h3>Required Fields</h3>
      <ul>
        <li><strong>Agent</strong> — which AI agent handles the calls</li>
        <li><strong>Lead List</strong> — CSV upload or connected CRM source</li>
        <li><strong>Caller ID</strong> — the outbound phone number</li>
        <li><strong>Schedule</strong> — calling hours and timezone</li>
      </ul>

      <h2>Campaign API</h2>
      <pre><code>{`POST /v1/campaigns
{
  "name": "Q1 Outreach",
  "agent_id": "ag_abc123",
  "lead_list_id": "ll_def456",
  "from_number": "+18005559999",
  "schedule": {
    "timezone": "America/New_York",
    "days": ["mon","tue","wed","thu","fri"],
    "start_hour": 9,
    "end_hour": 17
  },
  "max_concurrent": 10,
  "retry_attempts": 2
}`}</code></pre>

      <h2>Retry Logic</h2>
      <p>
        Failed calls (no answer, busy, voicemail) are automatically retried based on your
        retry settings. You can set the number of attempts, delay between retries, and
        which dispositions trigger a retry.
      </p>

      <div className="doc-callout">
        <p>Campaigns respect DNC lists automatically. Add numbers to Privacy &rarr; DNC Lists to exclude them from all campaigns.</p>
      </div>
    </div>
  );
}
