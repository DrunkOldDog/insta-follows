import { HeroSection, HowItWorks, Footer } from "./components";

export default function LandingPageComponent() {
  return (
    <div className="min-h-screen relative">
      <HeroSection />
      <HowItWorks />
      <Footer />
    </div>
  );
}
