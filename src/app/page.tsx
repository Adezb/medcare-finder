import Topbar from "@/components/Navbar/Topbar/Topbar";
import HospitalSearch from "@/components/Navbar/HospitalSearch";
import Footer from "@/components/Navbar/Footer/Footer";

export default function Home() {
  return (
    <>
      <main className="bg-gradient-to-r from-sky-200 to-sky-500 min-h-screen">
        <Topbar />
        <div className="max-w-7xl mx-auto">
          <HospitalSearch />
        </div>
        <Footer />
      </main>
    </>
  );
}
