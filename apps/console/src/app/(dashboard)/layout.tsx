import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <Header />
      <main className="main-content" style={{ paddingTop: "1rem" }}>
        {children}
      </main>
    </>
  );
}
