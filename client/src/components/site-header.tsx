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
                <Button 
                  className="bg-white text-[#4F46E5] font-semibold px-6 py-2 rounded-md text-sm"
                >
                  Admin Dashboard
                </Button>
              </Link>
            )}
            <Button 
              className="bg-white text-[#4F46E5] font-semibold px-6 py-2 rounded-md text-sm"
              onClick={() => logoutMutation.mutate()}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/auth">
            <Button 
              className="bg-white text-[#4F46E5] font-semibold px-6 py-2 rounded-md text-sm"
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}