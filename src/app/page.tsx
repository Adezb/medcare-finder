import Topbar from "@/components/Navbar/Topbar/Topbar";
import HospitalSearch from "@/components/Navbar/HospitalSearch";

export default function Home() {
  return (
    <>
      <main className="bg-gray-light min-h-screen">
        <Topbar />
        <div className="max-w-7xl mx-auto">
          <HospitalSearch />
        </div>
      </main>
    </>
  );
}
