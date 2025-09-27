'use client';

import { useHypergraphQuery } from '@graphprotocol/hypergraph-react';
import { Student, Donation, Sponsor } from '@/app/schema';
import { Card } from '@/Components/ui/button';
import { Button } from '@/Components/ui/button';
import { MapPin, Target, Star, Heart } from 'lucide-react';

export function StudentsGrid() {
  // Query students from Hypergraph
  const { data: students, loading: studentsLoading } = useHypergraphQuery({
    entity: Student,
    where: { isActive: true },
  });

  const { data: donations } = useHypergraphQuery({
    entity: Donation,
    where: { status: 'confirmed' },
  });

  if (studentsLoading) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-muted-foreground">Loading students...</p>
          </div>
        </div>
      </section>
    );
  }

  // Calculate total raised for each student
  const getStudentTotalRaised = (studentId: string) => {
    if (!donations) return 0;
    return donations
      .filter(donation => donation.student?.id === studentId)
      .reduce((total, donation) => total + donation.amount, 0);
  };

  return (
    <section id="students" className="py-16 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Students Needing Support</h2>
          <p className="text-muted-foreground text-lg">
            Help these bright students achieve their educational goals through transparent blockchain donations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students?.map((student, index) => {
            const totalRaised = getStudentTotalRaised(student.id);
            const progress = (totalRaised / student.monthlyGoal) * 100;
            const gradients = [
              "from-blue-500/20 to-blue-500/5",
              "from-green-500/20 to-green-500/5",
              "from-purple-500/20 to-purple-500/5",
            ];

            const subjects = student.subjects ? JSON.parse(student.subjects) : [];

            return (
              <Card
                key={student.id}
                className={`p-6 bg-gradient-to-br ${gradients[index % gradients.length]} backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 transition-all duration-300 group hover:shadow-lg`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {student.avatar || "🎓"}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {student.age} years • {student.grade}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4" />
                  {student.location}
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {student.description || "A dedicated student seeking educational support."}
                </p>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Monthly Goal</span>
                    <span className="text-foreground font-medium">
                      ${totalRaised.toFixed(2)} / ${student.monthlyGoal.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.round(progress)}% raised
                  </p>
                </div>

                {subjects.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {subjects.map((subject: string) => (
                      <span
                        key={subject}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 text-xs rounded-full border border-blue-500/20"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                )}

                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md">
                  <Heart className="w-4 h-4 mr-2" />
                  Sponsor Student
                </Button>
              </Card>
            );
          })}
        </div>

        {(!students || students.length === 0) && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No students available at the moment.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="bg-card/50 border-blue-500/20 hover:bg-blue-500/10">
            View All Students
          </Button>
        </div>
      </div>
    </section>
  );
}
