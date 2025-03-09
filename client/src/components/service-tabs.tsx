import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const destinations = [
  {
    url: "https://images.unsplash.com/photo-1548949771-aedafe955892",
    title: "Maldives Retreat",
  },
  {
    url: "https://images.unsplash.com/photo-1735781853615-cd4084d6bbbc",
    title: "Swiss Alps",
  },
  {
    url: "https://images.unsplash.com/photo-1552873547-b88e7b2760e2",
    title: "Santorini Villa",
  },
];

export function ServiceTabs() {
  return (
    <section className="container mx-auto py-24 px-4">
      <Tabs defaultValue="passport" className="w-full max-w-4xl mx-auto flex gap-8">
        <TabsList className="flex flex-col h-auto">
          <TabsTrigger value="passport" className="text-lg py-6 px-8 justify-start w-full">
            <Plane className="mr-2 h-5 w-5" />
            Passport to Freedom
          </TabsTrigger>
          <TabsTrigger value="tailor" className="text-lg py-6 px-8 justify-start w-full">
            <MapPin className="mr-2 h-5 w-5" />
            Tailor Your Trip
          </TabsTrigger>
        </TabsList>

        <div className="flex-1">
          <TabsContent value="passport">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-4">
                    Unlock Exclusive Destinations
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    Experience the freedom of curated luxury travel with our signature
                    Passport program. Access exclusive resorts, private islands, and
                    unique experiences unavailable to the general public.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {destinations.map((dest) => (
                      <div
                        key={dest.title}
                        className="aspect-square relative rounded-lg overflow-hidden"
                      >
                        <img
                          src={dest.url}
                          alt={dest.title}
                          className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                          <p className="text-white font-medium">{dest.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="tailor">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-4">
                    Design Your Perfect Journey
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    Work with our expert travel designers to craft a bespoke
                    itinerary that matches your preferences perfectly. From private
                    jets to exclusive experiences, we handle every detail.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      "https://images.unsplash.com/photo-1519445950492-d98b9bf804b3",
                      "https://images.unsplash.com/photo-1530789253388-582c481c54b0",
                      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
                    ].map((url, idx) => (
                      <div
                        key={idx}
                        className="aspect-square relative rounded-lg overflow-hidden"
                      >
                        <img
                          src={url}
                          alt="Luxury destination"
                          className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}