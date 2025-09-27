'use client';

import { useHypergraphAuth } from '@graphprotocol/hypergraph-react';
import { StudentsGrid } from './StudentsGrid';
import { StatsSection } from './StatsSection';
import { HowItWorks } from './HowItWorks';
import { Button } from '@/Components/ui/button';
import { ArrowRight, Heart, Shield, BookOpen } from 'lucide-react';

export function SponsorshipPage() {
  const { authenticated } = useHypergraphAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
              Transform Lives Through
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                {" "}Blockchain Education
              </span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto mb-8">
              Support students directly with complete transparency. Every donation is tracked on-chain, 
              ensuring your contribution reaches those who need it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg"
              >
                Sponsor a Student
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-card/50 border-blue-500/20 hover:bg-blue-500/10"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Direct Impact</h3>
              <p className="text-muted-foreground">Your donation reaches students directly without intermediaries</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Total Transparency</h3>
              <p className="text-muted-foreground">Track every transaction and educational progress on blockchain</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-10 h-10 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Verifiable Progress</h3>
              <p className="text-muted-foreground">Receive verified updates on academic progress</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Students Grid */}
      <StudentsGrid />

      {/* How It Works */}
      <HowItWorks />

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join our community of sponsors and help students achieve their educational dreams with complete transparency.
          </p>
          {authenticated ? (
            <Button
              size="lg"
              className="text-lg px-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg"
            >
              Start Sponsoring
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Button
              size="lg"
              className="text-lg px-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg"
            >
              Connect Wallet to Start
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
