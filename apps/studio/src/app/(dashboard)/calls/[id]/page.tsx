"use client";

import { useParams } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeading } from "@/components/ui/section-heading";
import { DetailList } from "@/components/ui/detail-list";

const callData = {
  id: "call_001",
  lead: "Sarah Johnson",
  phone: "+1 (555) 234-5678",
  email: "sarah.j@enterprise.com",
  company: "Enterprise Corp",
  campaign: "US Enterprise Q1",
  agent: "Sales Pro v2",
  voiceTier: "Tier 1 (ElevenLabs)",
  date: "Feb 22, 2026 at 10:42 AM",
  duration: "3:42",
  outcome: "Appointment Set",
  sentiment: "Positive",
  appointmentDate: "Feb 25, 2026 at 2:00 PM",
  summary:
    "Sarah expressed interest in AI-powered outreach for her sales team of 15. Currently using manual cold calling and spending $12k/month on SDRs. Agreed to a demo next Tuesday. Key pain points: low connect rates, inconsistent messaging, no analytics.",
  transcript: [
    { speaker: "AI Agent", text: "Hi Sarah, this is Alex from Aerwave. I noticed Enterprise Corp recently expanded your sales team. Do you have a quick minute?", time: "0:00" },
    { speaker: "Sarah", text: "Sure, what's this about?", time: "0:08" },
    { speaker: "AI Agent", text: "We help sales teams like yours automate outbound calls with AI that sounds natural and books meetings. Your team of 15 reps - are they doing manual cold calling right now?", time: "0:12" },
    { speaker: "Sarah", text: "Yeah, it's honestly our biggest bottleneck. We're spending a fortune on SDRs and the connect rates are terrible.", time: "0:28" },
    { speaker: "AI Agent", text: "That's exactly what we solve. Our AI handles the initial outreach - makes hundreds of calls a day, qualifies leads, and books meetings directly on your reps' calendars. Most teams see a 3x increase in booked meetings.", time: "0:42" },
    { speaker: "Sarah", text: "That's interesting. What does it cost compared to hiring more SDRs?", time: "1:05" },
    { speaker: "AI Agent", text: "Typically about 80% less than an SDR's fully loaded cost, and it works around the clock. Would you be open to a 15-minute demo to see it in action?", time: "1:12" },
    { speaker: "Sarah", text: "Yeah, let's do it. What does next Tuesday look like? Maybe afternoon?", time: "1:35" },
    { speaker: "AI Agent", text: "I have Tuesday at 2 PM available. Does that work for you?", time: "1:42" },
    { speaker: "Sarah", text: "Perfect. Send me a calendar invite at sarah.j@enterprise.com.", time: "1:50" },
    { speaker: "AI Agent", text: "Done! You'll get that shortly. Thanks for your time, Sarah. Looking forward to Tuesday.", time: "1:58" },
    { speaker: "Sarah", text: "Thanks, see you then.", time: "2:08" },
  ],
};

export default function CallDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const call = { ...callData, id };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.675rem" }}>
      <Breadcrumb items={[
        { label: "Calls", href: "/calls" },
        { label: call.lead },
      ]} />

      {/* Header */}
      <div className="page-header">
        <div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>{call.lead}</h2>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginTop: "0.5rem",
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
          }}>
            <span>{call.phone}</span>
            <span>{call.company}</span>
            <span>{call.date}</span>
          </div>
        </div>
        <span className="badge badge-active">{call.outcome}</span>
      </div>

      {/* Info Cards */}
      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-card">
          <div className="stat-label">Duration</div>
          <div className="stat-value" style={{ fontSize: "1.25rem" }}>{call.duration}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Sentiment</div>
          <div className="stat-value" style={{ fontSize: "1.25rem", color: "var(--success)" }}>
            {call.sentiment}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Voice Tier</div>
          <div style={{ fontSize: "0.875rem", fontWeight: 500, marginTop: "0.25rem" }}>
            {call.voiceTier}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Next Step</div>
          <div style={{ fontSize: "0.875rem", fontWeight: 500, marginTop: "0.25rem" }}>
            {call.appointmentDate}
          </div>
        </div>
      </div>

      {/* Summary + Details */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "0.675rem",
      }}>
        <div className="card">
          <SectionHeading>Summary</SectionHeading>
          <p style={{
            fontSize: "0.875rem",
            lineHeight: 1.7,
            color: "var(--text-secondary)",
          }}>
            {call.summary}
          </p>
        </div>

        <div className="card">
          <SectionHeading>Details</SectionHeading>
          <DetailList items={[
            { label: "Campaign", value: call.campaign },
            { label: "Agent", value: call.agent },
            { label: "Email", value: call.email },
            { label: "Company", value: call.company },
          ]} />
        </div>
      </div>

      {/* Transcript */}
      <div className="card">
        <SectionHeading>Transcript</SectionHeading>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {call.transcript.map((entry, i) => (
            <div key={i} className="transcript-block">
              <div
                className="transcript-speaker"
                style={{
                  color: entry.speaker === "AI Agent" ? "var(--accent)" : "var(--success)",
                }}
              >
                {entry.speaker}
                <span style={{
                  marginLeft: "0.5rem",
                  fontWeight: 400,
                  color: "var(--text-muted)",
                }}>
                  {entry.time}
                </span>
              </div>
              <div className="transcript-text">{entry.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
