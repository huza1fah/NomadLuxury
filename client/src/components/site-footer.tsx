import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 gap-12 max-w-2xl mx-auto text-center">
          <div>
            <h3 className="font-bold text-xl mb-6 text-primary">Nomad Luxury Travel</h3>
            <p className="text-muted-foreground leading-relaxed">
              Crafting extraordinary journeys for the discerning traveler since 2010. Experience luxury travel redefined.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="text-muted-foreground hover:text-primary transition-colors">
                <span className="hover:underline">info@nomadluxurytravel.co.uk</span>
              </li>
              <li className="text-muted-foreground hover:text-primary transition-colors">
                <span>07881774722</span>
              </li>
              <li className="text-muted-foreground hover:text-primary transition-colors">
                <span>123 Luxury Lane, Suite 500</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Follow Us</h4>
            <div className="flex gap-4 justify-center">
              <a 
                href="#" 
                className="p-3 rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6 text-primary" />
              </a>
              <a 
                href="#" 
                className="p-3 rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6 text-primary" />
              </a>
              <a 
                href="#" 
                className="p-3 rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6 text-primary" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 max-w-2xl mx-auto" />

        <div className="text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Nomad Luxury Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}