import { Button } from "@/components/ui/button";
import { Plane, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export function ServiceTabs() {
  const [activeSection, setActiveSection] = useState<'passport' | 'tailor'>('passport');

  return (
    <section className="container mx-auto py-24 px-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col gap-4 max-w-[300px] mx-auto">
          <Button 
            variant={activeSection === 'passport' ? 'default' : 'outline'}
            className="text-lg py-6 px-8 justify-start w-full"
            onClick={() => setActiveSection('passport')}
          >
            <Plane className="mr-2 h-5 w-5" />
            Passport to Freedom
          </Button>
          <Button
            variant={activeSection === 'tailor' ? 'default' : 'outline'}
            className="text-lg py-6 px-8 justify-start w-full"
            onClick={() => setActiveSection('tailor')}
          >
            <MapPin className="mr-2 h-5 w-5" />
            Tailor Your Trip
          </Button>
        </div>
      </div>
    </section>
  );
}