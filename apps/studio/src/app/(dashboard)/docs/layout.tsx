import { DocToc } from '@/components/ui/doc-toc'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pane-white doc-layout">
      <div className="doc-layout-content">{children}</div>
      <aside className="doc-layout-toc">
        <DocToc />
      </aside>
    </div>
  )
}
