import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Nomad Luxury Travel</h3>
            <p className="text-muted-foreground">
              Crafting extraordinary journeys for the discerning traveler since 2010.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Email: contact@nomadluxury.travel</li>
              <li>Phone: +1 (888) 555-0123</li>
              <li>Address: 123 Luxury Lane, Suite 500</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Twitter</li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2024 Nomad Luxury Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
