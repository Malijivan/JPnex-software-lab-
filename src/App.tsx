/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NetworkBackground from "./components/NetworkBackground";
import MainPage from "./components/MainPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import OrderPage from "./components/OrderPage";
import AdminPage from "./components/AdminPage";
import SubmissionsPanel from "./components/SubmissionsPanel";
import { ActiveView } from "./types";

export default function App() {
  const [currentView, setView] = useState<ActiveView>("main");

  // Custom routing helper to scroll or route across pages
  const scrollToSection = (id: string) => {
    if (currentView !== "main") {
      setView("main");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 150);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Helper to render the currently active non-refresh SPA sub-page
  const renderActiveView = () => {
    switch (currentView) {
      case "main":
        return <MainPage setView={setView} scrollToSection={scrollToSection} />;
      case "about":
        return <AboutPage setView={setView} />;
      case "contact":
        return <ContactPage />;
      case "order":
        return <OrderPage />;
      case "admin":
        return <AdminPage />;
      default:
        return <MainPage setView={setView} scrollToSection={scrollToSection} />;
    }
  };

  return (
    <div id="jpnex-app-root" className="min-h-screen bg-[#0a0e14] text-white flex flex-col font-sans relative antialiased selection:bg-[#58a6ff]/20 selection:text-[#58a6ff]">
      
      {/* Floating Network Node Animation quietly running in the background */}
      <NetworkBackground />
      
      {/* Sticky Navigation Bar with glassmorphism backdrop filter */}
      <Navbar 
        currentView={currentView} 
        setView={setView} 
        scrollToSection={scrollToSection} 
      />

      {/* Dynamic SPA View Layer */}
      <main id="spa-view-layer" className="flex-grow">
        {renderActiveView()}
      </main>

      {/* Global Footer (Visible on All Pages) */}
      <Footer 
        setView={setView} 
        scrollToSection={scrollToSection} 
      />

      {/* co-founder interactive submissions log cockpit */}
      <SubmissionsPanel />
    </div>
  );
}

