
import React from 'react';
import SetAdminRole from '@/components/SetAdminRole';

export default function Home() {
  return (
    <main className="p-6">
      <div className="text-center">
        <h1 className="text-4xl font-cyber font-bold text-cyber-blue mb-4">
          Welcome to CRYPTOBOI-911
        </h1>
        <p className="text-cyber-light text-lg">
          Your secure platform for financial services
        </p>
      </div>
      <div className="mt-8">
        <SetAdminRole />
      </div>
    </main>
  );
}
