export default function DocsVoiceAgents() {
  return (
    <div className="doc-content">
      <h1>Voice Agents</h1>
      <p className="doc-subtitle">Configure AI agents that handle phone conversations autonomously.</p>

      <h2>Agent Configuration</h2>
      <p>
        Each agent has a system prompt, voice selection, knowledge base attachment, and behavioral settings.
        The system prompt defines personality, goals, and conversation boundaries.
      </p>
      <pre><code>{`{
  "name": "Sales Agent v2",
  "voice": "alloy",
  "voice_tier": "tier1",
  "model": "gpt-4o-mini",
  "system_prompt": "You are a sales rep for Aerwave...",
  "knowledge_base_ids": ["kb_xyz"],
  "max_duration_seconds": 300,
  "transfer_number": "+18005551234"
}`}</code></pre>

      <h2>Voice Tiers</h2>
      <ul>
        <li><strong>Tier 1 — Premium</strong>: ElevenLabs voices, highest quality, ~$0.08/min</li>
        <li><strong>Tier 2 — Standard</strong>: Deepgram Aura, good quality, ~$0.04/min</li>
        <li><strong>Tier 3 — Economy</strong>: Deepgram base, lowest cost, ~$0.02/min</li>
      </ul>

      <h2>Knowledge Base</h2>
      <p>
        Attach knowledge documents to give your agent context. Aerwave uses Graph RAG
        (Neo4j + vector store) to retrieve relevant information during conversations.
      </p>

      <div className="doc-callout">
        <p>Agents automatically cite knowledge sources when answering questions. This improves accuracy and lets you audit responses.</p>
      </div>

      <h2>Call Transfers</h2>
      <p>
        Agents can transfer calls to human operators when they detect certain intents
        (e.g., &ldquo;speak to a manager&rdquo;) or when confidence drops below a threshold.
        Configure transfer rules in System &rarr; Call Transfers.
      </p>
    </div>
  );
}
