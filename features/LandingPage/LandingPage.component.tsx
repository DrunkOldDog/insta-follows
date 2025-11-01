import { HeroSection, HowItWorks, VideoGuide } from "./components";

export default function LandingPageComponent() {
  return (
    <div className="min-h-screen relative">
      <HeroSection />
      <HowItWorks />
      <VideoGuide />
    </div>
  );
}
