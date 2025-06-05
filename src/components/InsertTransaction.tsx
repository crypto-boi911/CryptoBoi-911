'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function InsertTransaction() {
  const [status, setStatus] = useState<string | null>(null);

  const handleInsert = async () => {
    const { error } = await supabase.from('transactions').insert({
      from_address: '0xabc123',
      to_address: '0xdef456',
      amount: 1.23,
      status: 'pending',
    });

    if (error) {
  console.error(error);
  setStatus(`❌ ${error.message}`);
} else {
      setStatus('✅ Transaction inserted!');
    }
  };

  return (
    <div className="p-4 border rounded max-w-md">
      <h2 className="font-bold mb-2">Insert Test Transaction</h2>
      <button
        onClick={handleInsert}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Insert
      </button>
      {status && <p className="mt-2">{status}</p>}
    </div>
  );
}
