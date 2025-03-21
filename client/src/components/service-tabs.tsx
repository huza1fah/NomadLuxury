import { Button } from "@/components/ui/button";
import { Plane, MapPin } from "lucide-react";
import { Link } from "wouter";

export function ServiceTabs() {
  return (
    <section className="container mx-auto pt-6 pb-12 px-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col gap-4 max-w-[300px] mx-auto">
          <Button 
            className="text-lg py-8 px-10 justify-start w-full shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px] bg-white text-primary hover:bg-white/90"
          >
            <Plane className="mr-4 h-6 w-6" />
            Passport to Freedom
          </Button>
          <Link href="/tailor-trip">
            <Button
              className="text-lg py-8 px-10 justify-start w-full shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px] bg-white text-primary hover:bg-white/90"
            >
              <MapPin className="mr-4 h-6 w-6" />
              Tailor Your Trip
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}