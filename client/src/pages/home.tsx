import { LogoSection } from "@/components/logo-section";
import { ServiceTabs } from "@/components/service-tabs";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { FeaturedDestinationsMap } from "@/components/featured-destinations-map";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <LogoSection />
        <ServiceTabs />
        <FeaturedDestinationsMap />
        <TestimonialCarousel />
      </main>
      <SiteFooter />
    </div>
  );
}