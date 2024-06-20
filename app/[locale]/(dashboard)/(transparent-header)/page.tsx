import Hero from "@/components/home/HeroSection";
import UpcomingEvents from "@/components/home/UpcomingEvents";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero></Hero>
      <UpcomingEvents></UpcomingEvents>
    </div>
  );
}
