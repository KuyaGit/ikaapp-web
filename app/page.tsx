import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Screens from "./components/Screens";
import Privacy from "./components/Privacy";
import DownloadCTA from "./components/DownloadCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Screens />
        <Privacy />
        <DownloadCTA />
      </main>
      <Footer />
    </div>
  );
}
