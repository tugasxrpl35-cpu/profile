"use client";

import { signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get('error');

  useEffect(() => {
    if (error === 'OAuthCallback') {
      signOut({ redirect: false });
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="w-full max-w-md" style={{ animation: 'fadeIn 0.4s ease-in' }}>
        <div className="rounded-3xl shadow-lg p-8 md:p-10" style={{ backgroundColor: 'var(--card)', color: 'var(--card-foreground)' }}>
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
              Welcome back!
            </h1>
            <p className="text-sm md:text-base" style={{ color: 'var(--muted-foreground)' }}>
              Sign in to access your admin dashboard
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--error-bg)', color: 'var(--error-color)' }}>
              <p className="text-sm font-medium">Authentication failed. Please try again.</p>
            </div>
          )}

          {/* GitHub Login Button */}
          <button
            onClick={() => signIn("github", { callbackUrl: "/admin" }, { prompt: "select_account" })}
            className="w-full flex items-center justify-center gap-3 font-semibold py-3 px-4 rounded-xl transition-all duration-200 mb-6 hover:shadow-md transform hover:scale-[1.02]"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
            }}
          >
            {/* GitHub Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.2 11.38c.6.1.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.74-1.34-1.74-1.1-.75.08-.73.08-.73 1.21.08 1.85 1.25 1.85 1.25 1.08 1.85 2.83 1.32 3.52 1 .1-.78.42-1.32.76-1.62-2.66-.3-5.47-1.33-5.47-5.92 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.64.25 2.86.12 3.16.77.84 1.23 1.91 1.23 3.22 0 4.6-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.69.83.57A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Login with GitHub
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }}></div>
            <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>OR</span>
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }}></div>
          </div>

          {/* Info Section */}
          <div className="space-y-3 mb-8 p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
            <p className="text-sm" style={{ color: 'var(--card-foreground)' }}>
              <span className="font-semibold">Just exploring?</span> No problem!
            </p>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              Feel free to head back home and check out the rest of our portfolio.
            </p>
          </div>

          {/* Back to Home Button */}
          <Link
            href="/"
            className="w-full flex items-center justify-center font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]"
            style={{
              backgroundColor: 'var(--secondary)',
              color: 'var(--secondary-foreground)',
              border: `2px solid var(--border)`,
            }}
          >
            Back to Home
          </Link>

          {/* Footer Note */}
          <p className="text-center text-xs mt-6" style={{ color: 'var(--muted-foreground)' }}>
            Psst… this area is for admins only 🔒
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default LoginForm;