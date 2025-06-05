
import React from 'react';
import InsertTransaction from '@/components/InsertTransaction';
import TransactionList from '@/components/TransactionList';

const AdminSettings = () => {
  return (
    <div className="min-h-screen bg-cyber-gradient">
      <div className="p-6">
        <h1 className="text-3xl font-cyber font-bold text-cyber-blue mb-8">Admin Settings</h1>
        
        <div className="max-w-4xl">
          <div className="mb-8">
            <h2 className="text-xl font-cyber font-semibold text-cyber-light mb-4">Transaction Management</h2>
            <InsertTransaction />
          </div>
          
          <TransactionList />
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
