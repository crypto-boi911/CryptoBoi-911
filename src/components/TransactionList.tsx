
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export default function TransactionList() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setTransactions(data || []);
      }

      setLoading(false);
    };

    fetchTransactions();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Transactions</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {transactions.map((tx) => (
            <li key={tx.id} className="border p-2 rounded">
              <strong>{tx.status.toUpperCase()}</strong><br />
              From: {tx.from_address}<br />
              To: {tx.to_address}<br />
              Amount: {tx.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
