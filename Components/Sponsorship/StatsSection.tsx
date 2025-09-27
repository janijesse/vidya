'use client';

import { useHypergraphQuery } from '@graphprotocol/hypergraph-react';
import { Student, Donation, Sponsor, School } from '@/app/schema';
import { Card } from '@/Components/ui/button';
import { TrendingUp, Users, School as SchoolIcon, Heart } from 'lucide-react';

export function StatsSection() {
  // Query all relevant data from Hypergraph
  const { data: students } = useHypergraphQuery({
    entity: Student,
    where: { isActive: true },
  });

  const { data: donations } = useHypergraphQuery({
    entity: Donation,
    where: { status: 'confirmed' },
  });

  const { data: sponsors } = useHypergraphQuery({
    entity: Sponsor,
  });

  const { data: schools } = useHypergraphQuery({
    entity: School,
    where: { isVerified: true },
  });

  // Calculate statistics
  const totalStudents = students?.length || 0;
  const totalDonated = donations?.reduce((sum, donation) => sum + donation.amount, 0) || 0;
  const activeSponsors = sponsors?.length || 0;
  const verifiedSchools = schools?.length || 0;

  const stats = [
    {
      value: totalStudents.toLocaleString(),
      label: "Students Helped",
      description: "students receiving education",
      icon: Heart,
      color: "from-blue-500 to-blue-500/80",
    },
    {
      value: `$${totalDonated.toLocaleString()}`,
      label: "Total Donated",
      description: "Transparent funds on blockchain",
      icon: TrendingUp,
      color: "from-green-500 to-green-500/80",
    },
    {
      value: activeSponsors.toLocaleString(),
      label: "Active Sponsors",
      description: "People making a difference",
      icon: Users,
      color: "from-purple-500 to-purple-500/80",
    },
    {
      value: verifiedSchools.toLocaleString(),
      label: "Verified Schools",
      description: "Trusted institutions",
      icon: SchoolIcon,
      color: "from-orange-500 to-orange-500/80",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full opacity-20" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full opacity-15" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Impact in Numbers
          </h2>
          <p className="text-muted-foreground text-lg">
            Total transparency thanks to blockchain technology
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-6 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-blue-500/30 transition-all duration-300 group"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="font-semibold text-foreground mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </Card>
          ))}
        </div>

        {/* Blockchain transparency section */}
        <div className="mt-12 p-8 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Blockchain Transparency
            </h3>
            <p className="text-muted-foreground">
              Every donation and student progress is recorded on-chain for complete transparency
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">Real-time Tracking</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  All donations and student progress are tracked in real-time on the blockchain,
                  ensuring complete transparency and accountability.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 mb-2">Verifiable Impact</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Every dollar donated and every student milestone is verifiable on the blockchain,
                  providing donors with complete confidence in their impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
