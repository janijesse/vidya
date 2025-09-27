'use client';

import { Card } from '@/Components/ui/button';
import { Wallet, Search, Heart, BarChart3, Database, Zap } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Browse Students",
      description: "Explore our verified student profiles and find someone you'd like to support",
      color: "from-blue-500 to-blue-500/80",
    },
    {
      icon: Heart,
      title: "Make a Donation",
      description: "Contribute directly to a student's education through secure blockchain transactions",
      color: "from-green-500 to-green-500/80",
    },
    {
      icon: BarChart3,
      title: "Track Progress",
      description: "Monitor your sponsored student's academic progress and achievements in real-time",
      color: "from-purple-500 to-purple-500/80",
    },
    {
      icon: Wallet,
      title: "Transparent Impact",
      description: "See exactly how your donations are being used with full blockchain transparency",
      color: "from-orange-500 to-orange-500/80",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 px-4 bg-gradient-to-br from-gray-50/20 to-white/30 dark:from-gray-900/20 dark:to-gray-800/30 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full opacity-10" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full opacity-15" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg">
            A simple, transparent process powered by blockchain technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="p-6 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 relative group hover:border-blue-500/30 transition-all duration-300"
            >
              <div
                className={`absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}
              >
                {index + 1}
              </div>

              <div
                className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <step.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-8 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Database className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why use Hypergraph?
            </h3>
            <p className="text-muted-foreground">Powering transparency and real-time insights</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">Total Transparency</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Hypergraph indexes all blockchain transactions and events, enabling fast queries of the complete
                  donation history and student progress.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h4 className="font-semibold text-green-600 mb-2">Real-time Metrics</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Get updated statistics on total impact, progress per student, and ranking of most generous donors
                  with live blockchain data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
