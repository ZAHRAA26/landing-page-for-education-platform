import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { GraduationCap } from "lucide-react";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { user, loading, refreshUser } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Wait a bit for cookie to be set, then refresh user
      await new Promise(resolve => setTimeout(resolve, 500));
      try {
        await refreshUser();
      } catch {
        // Ignore errors
      }
      setChecking(false);
    };
    
    checkAuth();
  }, [refreshUser]);

  useEffect(() => {
    if (!loading && !checking) {
      if (user) {
        // User is authenticated, redirect to dashboard
        navigate("/dashboard", { replace: true });
      } else {
        // Authentication failed, redirect to auth page
        navigate("/auth", { replace: true });
      }
    }
  }, [user, loading, checking, navigate]);

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center shadow-soft mx-auto mb-4">
          <GraduationCap className="w-8 h-8 text-primary-foreground" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">Completing sign in...</h2>
        <p className="text-muted-foreground">Please wait while we finish setting up your account.</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
