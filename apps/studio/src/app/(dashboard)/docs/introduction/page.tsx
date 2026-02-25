export default function DocsIntroduction() {
  return (
    <div className="doc-content">
      <h1>Introduction</h1>
      <p className="doc-subtitle">
        Aerwave is an AI voice calling platform for outbound sales automation and inbound lead response.
      </p>

      <div className="doc-callout">
        <p>Aerwave handles the entire voice pipeline: telephony, speech-to-text, LLM reasoning, and text-to-speech — all in under 800ms round-trip latency.</p>
      </div>

      <h2>What is Aerwave?</h2>
      <p>
        Aerwave lets you build, deploy, and manage AI voice agents that make and receive phone calls.
        It combines real-time speech processing with large language models to create natural-sounding
        conversations at scale.
      </p>

      <h2>Key Capabilities</h2>
      <ul>
        <li><strong>Outbound campaigns</strong> — bulk dial lead lists with AI agents that follow custom scripts</li>
        <li><strong>Inbound response</strong> — route incoming calls to AI agents with context-aware routing</li>
        <li><strong>Omnichannel</strong> — extend conversations to WhatsApp, Telegram, and SMS</li>
        <li><strong>Knowledge base</strong> — feed agents with product docs, FAQs, and custom data via Graph RAG</li>
        <li><strong>Real-time analytics</strong> — monitor call quality, conversion rates, and agent performance</li>
      </ul>

      <h2>Architecture Overview</h2>
      <p>
        The platform is built on a microservices architecture with Docker containers.
        The real-time voice pipeline processes audio through three stages:
      </p>
      <pre><code>{`Caller Audio → STT (Deepgram) → LLM (GPT-4o / Claude) → TTS (ElevenLabs / Deepgram) → Caller`}</code></pre>
      <p>
        Telephony is handled via Telnyx SIP integration, supporting US and international numbers.
        Each tenant gets isolated data stores with PostgreSQL and Redis-backed call queuing.
      </p>

      <h2>Next Steps</h2>
      <p>
        Head to the <strong>Quickstart</strong> guide to deploy your first AI voice agent in under 5 minutes,
        or explore the <strong>API Reference</strong> to integrate programmatically.
      </p>
    </div>
  );
}
