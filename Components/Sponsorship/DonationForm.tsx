'use client';

import { useState } from 'react';
import { useHypergraphMutation, useHypergraphAuth } from '@graphprotocol/hypergraph-react';
import { Donation, Sponsor, Student } from '@/app/schema';
import { Button } from '@/Components/ui/button';
import { Heart, Wallet } from 'lucide-react';

interface DonationFormProps {
  student: Student;
  onSuccess?: () => void;
}

export function DonationForm({ student, onSuccess }: DonationFormProps) {
  const { authenticated, user } = useHypergraphAuth();
  const [formData, setFormData] = useState({
    amount: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: createDonation } = useHypergraphMutation({
    entity: Donation,
    onSuccess: () => {
      setIsSubmitting(false);
      setFormData({ amount: '', message: '' });
      onSuccess?.();
    },
    onError: (error) => {
      console.error('Error creating donation:', error);
      setIsSubmitting(false);
    },
  });

  const { mutate: createSponsor } = useHypergraphMutation({
    entity: Sponsor,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!authenticated || !user) {
      alert('Please connect your wallet first');
      return;
    }

    setIsSubmitting(true);

    // First, ensure sponsor exists or create one
    const sponsorData = {
      name: user.name || 'Anonymous Sponsor',
      walletAddress: user.address,
      totalDonated: parseFloat(formData.amount),
      isVerified: true,
    };

    // Create or update sponsor
    createSponsor(sponsorData);

    // Create donation
    const donationData = {
      amount: parseFloat(formData.amount),
      currency: 'USD',
      status: 'confirmed', // In a real app, this would be 'pending' until blockchain confirmation
      donationDate: new Date().toISOString(),
      message: formData.message || undefined,
      sponsor: sponsorData, // This would be a relation in a real implementation
      student: student,
    };

    createDonation(donationData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!authenticated) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
        <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
        <p className="text-muted-foreground mb-4">
          Please connect your wallet to make a donation
        </p>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
          Connect Wallet
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Support {student.name}</h3>
        <p className="text-muted-foreground">
          Help {student.name} achieve their educational goals
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Donation Amount (USD) *
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="1"
            step="0.01"
            placeholder="Enter amount"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Message (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            placeholder="Leave an encouraging message for the student..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Donation Summary</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Student:</span>
              <span className="font-medium">{student.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Amount:</span>
              <span className="font-medium">${formData.amount || '0'}</span>
            </div>
            <div className="flex justify-between">
              <span>Platform Fee:</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="flex justify-between border-t pt-1">
              <span>Total:</span>
              <span className="font-bold">${formData.amount || '0'}</span>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || !formData.amount}
          className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
        >
          {isSubmitting ? 'Processing Donation...' : 'Make Donation'}
        </Button>
      </form>

      <div className="mt-4 text-xs text-muted-foreground text-center">
        <p>This donation will be recorded on the blockchain for complete transparency.</p>
      </div>
    </div>
  );
}
