import Hero from "@/components/home/HeroSection";
import UpcomingEvents from "@/components/home/UpcomingEvents";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Hero></Hero>
      <UpcomingEvents></UpcomingEvents>
    </div>
  );
}
