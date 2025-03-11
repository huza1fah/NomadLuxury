import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";

export function SiteHeader() {
  const { user, logoutMutation } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <img 
            src="/assets/NOMAD LUXURY TRAVEL (3).png"
            alt="Nomad Luxury Travel"
            className="h-8"
          />
        </Link>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              {user.isAdmin && (
                <Link href="/admin">
                  <Button variant="outline">Admin Dashboard</Button>
                </Link>
              )}
              <Button 
                variant="ghost"
                onClick={() => logoutMutation.mutate()}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/auth">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
