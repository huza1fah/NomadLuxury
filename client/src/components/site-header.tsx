import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";

export function SiteHeader() {
  const { user, logoutMutation } = useAuth();

  return (
    <header className="w-full">
      <div className="container flex h-14 items-center justify-end">
        {user ? (
          <div className="flex items-center gap-4">
            {user.isAdmin && (
              <Link href="/admin">
                <Button variant="ghost" className="text-primary">
                  Admin Dashboard
                </Button>
              </Link>
            )}
            <Button 
              variant="ghost"
              className="text-primary"
              onClick={() => logoutMutation.mutate()}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/auth">
            <Button variant="ghost" className="text-primary">
              Login
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}