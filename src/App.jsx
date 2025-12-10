import React from "react";
import Header from "./components/Header";
import IntroSection from "./components/IntroSection";
import SutraSection from "./components/SutraSection";
import MonkTalkSection from "./components/MonkTalkSection";
import TermsSection from "./components/TermsSection";
import SiteFooter from "./components/SiteFooter";
import "./index.css";

function App() {
  const handleNavClick = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="site-root">
      <Header onNavClick={handleNavClick} />

      <main>
        <section id="intro" className="section section-intro">
          <IntroSection />
        </section>

        <section id="sutra" className="section section-sutra">
          <SutraSection />
        </section>

        <section id="monk" className="section section-monk">
          <MonkTalkSection />
        </section>

        <section id="terms" className="section section-terms">
          <TermsSection />
        </section>
      </main>

      <footer id="footer" className="section section-footer">
        <SiteFooter />
      </footer>
    </div>
  );
}

export default App;
