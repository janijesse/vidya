'use client';

import { useState } from 'react';
import { useHypergraphMutation } from '@graphprotocol/hypergraph-react';
import { Student } from '@/app/schema';
import { Button } from '@/Components/ui/button';

interface AddStudentFormProps {
  onSuccess?: () => void;
}

export function AddStudentForm({ onSuccess }: AddStudentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    grade: '',
    location: '',
    description: '',
    monthlyGoal: '',
    subjects: '',
    avatar: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: createStudent } = useHypergraphMutation({
    entity: Student,
    onSuccess: () => {
      setIsSubmitting(false);
      setFormData({
        name: '',
        age: '',
        grade: '',
        location: '',
        description: '',
        monthlyGoal: '',
        subjects: '',
        avatar: '',
      });
      onSuccess?.();
    },
    onError: (error) => {
      console.error('Error creating student:', error);
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const studentData = {
      name: formData.name,
      age: parseInt(formData.age),
      grade: formData.grade,
      location: formData.location,
      description: formData.description || undefined,
      monthlyGoal: parseFloat(formData.monthlyGoal),
      currentRaised: 0,
      subjects: formData.subjects || undefined,
      avatar: formData.avatar || undefined,
      isActive: true,
    };

    createStudent(studentData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Student</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Student Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Age *
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="5"
              max="25"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Grade *
            </label>
            <input
              type="text"
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              required
              placeholder="e.g., 6th Grade, High School"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="e.g., Northern Region, City"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="monthlyGoal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Monthly Goal (USD) *
            </label>
            <input
              type="number"
              id="monthlyGoal"
              name="monthlyGoal"
              value={formData.monthlyGoal}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Avatar Emoji
            </label>
            <input
              type="text"
              id="avatar"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="🎓"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subjects" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Subjects (comma-separated)
          </label>
          <input
            type="text"
            id="subjects"
            name="subjects"
            value={formData.subjects}
            onChange={handleChange}
            placeholder="e.g., Mathematics, Sciences, Literature"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Tell us about this student's goals and interests..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setFormData({
              name: '',
              age: '',
              grade: '',
              location: '',
              description: '',
              monthlyGoal: '',
              subjects: '',
              avatar: '',
            })}
            disabled={isSubmitting}
          >
            Clear
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            {isSubmitting ? 'Adding Student...' : 'Add Student'}
          </Button>
        </div>
      </form>
    </div>
  );
}
