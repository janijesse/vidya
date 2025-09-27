'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/Components/ui/button';

export default function HomePage() {

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Image src="/logo.svg" alt="Vidya Bridge Logo" width={96} height={96} className="w-24 h-24 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4 text-gradient">
          Vidya Bridge - Educational Sponsorship Platform
        </h1>
        <p className="text-lg text-muted-foreground">Transparent educational sponsorship for children in India using blockchain technology</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Student Sponsorship</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Support students directly with complete blockchain transparency. Track every donation and student progress on-chain.
            </p>
            <Link href="/sponsorship">
              <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white">
                Sponsor Students
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Privacy Protection</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Complete privacy protection for vulnerable children using unique IDs and regional information only.
            </p>
            <div className="text-sm text-muted-foreground">
              Safe & Secure
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Blockchain Transparency</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Every donation is recorded on-chain for complete transparency and accountability.
            </p>
            <div className="text-sm text-muted-foreground">
              Powered by Blockchain
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">USDC Stablecoin</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Donate using USDC stablecoin to avoid cryptocurrency volatility and ensure consistent value.
            </p>
            <div className="text-sm text-muted-foreground">
              Stable & Reliable
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
