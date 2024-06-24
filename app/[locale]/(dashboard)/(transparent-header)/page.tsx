import Hero from "@/components/home/HeroSection";
import EventCategories from "@/components/home/PopuralCategories";
import TodaysEvents from "@/components/home/TodaysEvents";
import UpcomingEvents from "@/components/home/UpcomingEvents";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero></Hero>
      <UpcomingEvents></UpcomingEvents>
      <TodaysEvents></TodaysEvents>
      <EventCategories></EventCategories>
    </div>
  );
}
