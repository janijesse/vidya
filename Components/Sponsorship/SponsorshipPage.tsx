'use client';

import { StudentsGrid } from './StudentsGrid';
import { Button } from '@/Components/ui/button';
import { Heart, Shield, BookOpen } from 'lucide-react';

export function SponsorshipPage() {

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 mandala-bg opacity-20" />
        <div className="absolute bottom-20 right-20 w-40 h-40 mandala-bg opacity-15" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rangoli-pattern opacity-10" />
      </div>
      
      <section className="py-16 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Support Students with
              <span className="text-gradient">
                {" "}Blockchain Transparency
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Help students achieve their educational goals. Every donation is tracked on-chain for complete transparency.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 bg-card rounded-lg shadow border border-border">
              <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Direct Impact</h3>
              <p className="text-sm text-muted-foreground">Your donation reaches students directly</p>
            </div>
            <div className="text-center p-6 bg-card rounded-lg shadow border border-border">
              <Shield className="w-8 h-8 text-secondary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Transparent</h3>
              <p className="text-sm text-muted-foreground">All transactions recorded on blockchain</p>
            </div>
            <div className="text-center p-6 bg-card rounded-lg shadow border border-border">
              <BookOpen className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Verifiable</h3>
              <p className="text-sm text-muted-foreground">Track progress in real-time</p>
            </div>
          </div>
        </div>
      </section>

      <StudentsGrid />

      <section className="py-12 px-4 bg-muted/20 relative z-10">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Help?</h2>
          <p className="text-muted-foreground mb-6">
            Connect your wallet and start supporting students today.
          </p>
          <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
            Connect Wallet
          </Button>
        </div>
      </section>
    </div>
  );
}
