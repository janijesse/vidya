'use client';

import { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Heart, Star } from 'lucide-react';

const mockStudents = [
  {
    id: 'IND-STU-001',
    name: 'Student 001',
    goal: 500,
    raised: 320,
    region: 'Northern India',
    description: 'Passionate about mathematics and science. Dreams of becoming an engineer.',
    avatar: '👩‍🎓'
  },
  {
    id: 'IND-STU-002', 
    name: 'Student 002',
    goal: 400,
    raised: 180,
    region: 'Southern India',
    description: 'Loves reading and writing. Wants to study literature at university.',
    avatar: '👨‍🎓'
  },
  {
    id: 'IND-STU-003',
    name: 'Student 003',
    goal: 600,
    raised: 450,
    region: 'Eastern India',
    description: 'Interested in medicine and helping others. Aspires to be a doctor.',
    avatar: '👩‍⚕️'
  }
];

export function StudentsGrid() {
  const [donatingTo, setDonatingTo] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState('');

  const handleDonate = (studentName: string) => {
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }

    alert(`Donation of ${donationAmount} USDC to ${studentName} recorded! 🎉\n\nNote: This is a demo. In production, this would interact with the smart contract.`);
    
    setDonatingTo(null);
    setDonationAmount('');
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Students Needing Support</h2>
          <p className="text-muted-foreground text-lg">
            Help these students achieve their educational goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockStudents.map((student, index) => {
            const progress = (student.raised / student.goal) * 100;
            const gradients = [
              "from-primary/20 to-primary/5",
              "from-secondary/20 to-secondary/5", 
              "from-accent/20 to-accent/5",
            ];

            return (
              <div
                key={student.id}
                className={`p-6 bg-gradient-to-br ${gradients[index % gradients.length]} border border-border rounded-lg hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-2xl">
                    {student.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{student.id}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-muted-foreground">{student.region}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {student.description}
                </p>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Goal</span>
                    <span className="text-foreground font-medium">
                      {student.raised} USDC / {student.goal} USDC
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.round(progress)}% raised
                  </p>
                </div>

                {donatingTo === student.id ? (
                  <div className="space-y-3">
                    <input
                      type="number"
                      step="0.001"
                      placeholder="Amount (USDC)"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleDonate(student.id)}
                        className="flex-1 bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90"
                      >
                        Donate
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setDonatingTo(null)}
                        className="px-4"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    onClick={() => setDonatingTo(student.id)}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Support Student
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            All donations are recorded on the blockchain for complete transparency
          </p>
        </div>
      </div>
    </section>
  );
}
