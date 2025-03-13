import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { StarIcon } from "lucide-react";

const testimonials = [
  {
    name: "Hiatham & Zartasha",
    role: "Costa Navarino, Greece",
    avatar: "https://images.unsplash.com/photo-1708860028064-3303a016e88f",
    content:
      "We are so grateful for you planning our 10 year anniversary trip. Finding the best hotels possible with the added bonus of sourcing them at fantastic rates. Honestly you made everything so seamless, went above and beyond in providing experienced, professional and thoughtful advice, taking away the headache of multiple bookings.",
  },
  {
    name: "Tina",
    role: "Bodrum, Turkey",
    avatar: "https://images.unsplash.com/photo-1708860028233-10da73ede2a0",
    content:
      "The service was exceptional from start to finish. Rosina secured us an amazing price for the exact specifications we needed for our family. I would highly recommend, and will definitely be booking my next getaway through Nomad Luxury Travel.",
  },
  {
    name: "Rosina",
    role: "Nomad Co-Founder",
    avatar: "https://images.unsplash.com/photo-1711980012199-2697edfc8794",
    content:
      "From private islands to mountain retreats, they crafted the perfect blend of luxury and adventure for our family.",
  },
  ,
];

export function TestimonialCarousel() {
  return (
    <section className="bg-[#a0c4ff] py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          What Our Travelers Say
        </h2>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="mx-2 bg-white/95 h-full">
                  <CardContent className="p-6 flex flex-col h-full items-center text-center">
                    <Avatar className="h-16 w-16 mb-4">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    </Avatar>
                    <div className="mb-4">
                      <h4 className="font-semibold text-black">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                    <div className="flex justify-center gap-1 mb-3">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <StarIcon
                            key={i}
                            className="h-4 w-4 fill-primary text-primary"
                          />
                        ))}
                    </div>
                    <p className="text-black flex-grow">{testimonial.content}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex bg-white" />
          <CarouselNext className="hidden md:flex bg-white" />
        </Carousel>
      </div>
    </section>
  );
}