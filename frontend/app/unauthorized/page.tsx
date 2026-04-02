'use client';

import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="w-full max-w-md" style={{ animation: 'fadeIn 0.4s ease-in' }}>
        <div className="rounded-3xl shadow-lg p-8 md:p-10" style={{ backgroundColor: 'var(--card)', color: 'var(--card-foreground)' }}>
          {/* Error Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--error-bg)' }}>
              <svg
                className="w-8 h-8"
                style={{ color: 'var(--error-color)' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--error-color)' }}>
              Unauthorized
            </h1>
            <p className="text-sm md:text-base" style={{ color: 'var(--muted-foreground)' }}>
              Access Denied
            </p>
          </div>

          {/* Error Message */}
          <div className="mb-8 p-4 rounded-lg space-y-3" style={{ backgroundColor: 'var(--muted)' }}>
            <p className="text-sm" style={{ color: 'var(--card-foreground)' }}>
              <span className="font-semibold">Whoa there!</span> 🛑
            </p>
            <p className="text-sm" style={{ color: 'var(--card-foreground)' }}>
              This page is for admins only. Nice try though 😄
            </p>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              If you believe this is a mistake, please contact the administrator.
            </p>
          </div>

          {/* Back to Home Button */}
          <Link
            href="/"
            className="w-full flex items-center justify-center font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
            }}
          >
            Back to Home
          </Link>

          {/* Footer Note */}
          <p className="text-center text-xs mt-6" style={{ color: 'var(--muted-foreground)' }}>
            Status Code: 403 • Forbidden
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