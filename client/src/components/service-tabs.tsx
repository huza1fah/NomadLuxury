import { Button } from "@/components/ui/button";
import { BookOpen, MapPin } from "lucide-react";

export function ServiceTabs() {
  return (
    <section className="container mx-auto py-24 px-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col gap-6 max-w-[300px] mx-auto">
          <Button 
            className="text-lg py-8 px-10 justify-start w-full shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px] bg-white text-primary hover:bg-white/90"
          >
            <BookOpen className="mr-4 h-6 w-6" />
            Passport to Freedom
          </Button>
          <Button
            className="text-lg py-8 px-10 justify-start w-full shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px] bg-white text-primary hover:bg-white/90"
          >
            <MapPin className="mr-4 h-6 w-6" />
            Tailor Your Trip
          </Button>
        </div>
      </div>
    </section>
  );
}