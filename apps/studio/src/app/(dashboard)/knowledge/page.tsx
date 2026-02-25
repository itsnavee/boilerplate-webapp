"use client";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  status: string;
  chunks: number;
  uploaded: string;
}

const documents: Document[] = [
  { id: "doc_001", name: "Product Catalog 2026.pdf", type: "PDF", size: "2.4 MB", status: "indexed", chunks: 147, uploaded: "Feb 18, 2026" },
  { id: "doc_002", name: "Sales Playbook.pdf", type: "PDF", size: "1.1 MB", status: "indexed", chunks: 89, uploaded: "Feb 15, 2026" },
  { id: "doc_003", name: "Pricing Matrix.xlsx", type: "Excel", size: "340 KB", status: "indexed", chunks: 23, uploaded: "Feb 12, 2026" },
  { id: "doc_004", name: "Competitor Analysis.docx", type: "Word", size: "890 KB", status: "indexed", chunks: 56, uploaded: "Feb 10, 2026" },
  { id: "doc_005", name: "FAQ Database.json", type: "JSON", size: "128 KB", status: "indexed", chunks: 210, uploaded: "Feb 08, 2026" },
  { id: "doc_006", name: "Objection Handling Guide.pdf", type: "PDF", size: "670 KB", status: "processing", chunks: 0, uploaded: "Feb 22, 2026" },
  { id: "doc_007", name: "Case Studies.pdf", type: "PDF", size: "3.2 MB", status: "indexed", chunks: 178, uploaded: "Feb 05, 2026" },
];

const statusStyles: Record<string, { badge: string; label: string }> = {
  indexed: { badge: "badge-active", label: "Indexed" },
  processing: { badge: "badge-paused", label: "Processing" },
  failed: { badge: "badge-draft", label: "Failed" },
};

const typeColors: Record<string, string> = {
  PDF: "var(--danger)",
  Excel: "var(--success)",
  Word: "var(--info)",
  JSON: "var(--warning)",
};

export default function KnowledgePage() {
  const totalChunks = documents.reduce((sum, d) => sum + d.chunks, 0);
  const indexedCount = documents.filter((d) => d.status === "indexed").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.675rem" }}>
      {/* Stats */}
      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div className="stat-card">
          <div className="stat-value">{documents.length}</div>
          <div className="stat-label">Documents</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: "var(--accent)" }}>
            {totalChunks}
          </div>
          <div className="stat-label">Total Chunks</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: "var(--success)" }}>
            {indexedCount}/{documents.length}
          </div>
          <div className="stat-label">Indexed</div>
        </div>
      </div>

      {/* Header */}
      <div className="page-header">
        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
          Upload documents to build your AI agent&apos;s knowledge base
        </p>
        <button className="btn btn-primary">Upload Document</button>
      </div>

      {/* Upload zone */}
      <div style={{
        border: "2px dashed var(--border)",
        borderRadius: "12px",
        padding: "2rem",
        textAlign: "center",
        cursor: "pointer",
        transition: "border-color 0.15s",
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" style={{ margin: "0 auto 0.75rem" }}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17,8 12,3 7,8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>
          Drag and drop files here, or click to browse
        </div>
        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
          Supports PDF, DOCX, XLSX, TXT, JSON (max 10 MB)
        </div>
      </div>

      {/* Documents table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Document</th>
              <th>Type</th>
              <th>Size</th>
              <th>Status</th>
              <th>Chunks</th>
              <th>Uploaded</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => {
              const st = statusStyles[doc.status] || statusStyles.failed;
              return (
                <tr key={doc.id}>
                  <td style={{ fontWeight: 500 }}>{doc.name}</td>
                  <td>
                    <span style={{
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      padding: "0.125rem 0.5rem",
                      borderRadius: "4px",
                      background: "var(--bg-hover)",
                      color: typeColors[doc.type] || "var(--text-secondary)",
                    }}>
                      {doc.type}
                    </span>
                  </td>
                  <td style={{ color: "var(--text-secondary)" }}>{doc.size}</td>
                  <td>
                    <span className={`badge ${st.badge}`}>
                      {doc.status === "processing" && (
                        <span className="loading-spinner" style={{
                          width: "10px", height: "10px", marginRight: "0.375rem",
                          borderWidth: "1.5px",
                        }} />
                      )}
                      {st.label}
                    </span>
                  </td>
                  <td style={{ fontFamily: "monospace", color: "var(--text-secondary)" }}>
                    {doc.chunks > 0 ? doc.chunks : "--"}
                  </td>
                  <td style={{ color: "var(--text-muted)" }}>{doc.uploaded}</td>
                  <td>
                    <button className="btn btn-danger" style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
