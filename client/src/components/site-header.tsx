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
                  className="bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white font-semibold px-6 py-2 rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200 text-sm"
                >
                  Admin Dashboard
                </Button>
              </Link>
            )}
            <Button 
              className="bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white font-semibold px-6 py-2 rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200 text-sm"
              onClick={() => logoutMutation.mutate()}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/auth">
            <Button 
              className="bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white font-semibold px-6 py-2 rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200 text-sm"
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}