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
    name: "Sarah Johnson",
    role: "Executive Traveler",
    avatar: "https://images.unsplash.com/photo-1708860028064-3303a016e88f",
    content:
      "The attention to detail and personalized service exceeded all expectations. Every moment of our journey was perfectly curated.",
  },
  {
    name: "Michael Chen",
    role: "Luxury Explorer",
    avatar: "https://images.unsplash.com/photo-1708860028233-10da73ede2a0",
    content:
      "Nomad Luxury Travel transformed our vacation into an unforgettable experience. Their expertise and connections are unmatched.",
  },
  {
    name: "Emily Parker",
    role: "Adventure Seeker",
    avatar: "https://images.unsplash.com/photo-1711980012199-2697edfc8794",
    content:
      "From private islands to mountain retreats, they crafted the perfect blend of luxury and adventure for our family.",
  },
  {
    name: "James Wilson",
    role: "Cultural Enthusiast",
    avatar: "https://images.unsplash.com/photo-1708860027560-bf3c060b26f4",
    content:
      "Their knowledge of exclusive destinations and ability to arrange unique experiences made our journey truly special.",
  },
];

export function TestimonialCarousel() {
  return (
    <section className="bg-[#a0c4ff] py-24">
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
                <Card className="mx-2 bg-white/95">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-black">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <StarIcon
                            key={i}
                            className="h-4 w-4 fill-primary text-primary"
                          />
                        ))}
                    </div>
                    <p className="text-black">{testimonial.content}</p>
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