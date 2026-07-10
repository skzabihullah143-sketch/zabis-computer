import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Lock, User, Loader2, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(username, password);
    setLoading(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Welcome back!");
    navigate("/admin-dashboard");
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-navy-100 bg-white p-8 shadow-xl dark:border-navy-800 dark:bg-navy-900">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy-800 text-gold-400">
            <ShieldCheck className="h-7 w-7" />
          </span>
          <h1 className="font-display text-2xl font-bold text-navy-900 dark:text-white">Admin Login</h1>
          <p className="mt-1 text-sm text-navy-500 dark:text-navy-300">
            Authorized staff only
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
              <Input
                id="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="pl-11"
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="pl-11"
                autoComplete="current-password"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
