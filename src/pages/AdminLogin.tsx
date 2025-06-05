import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/login'); // 🚫 Not logged in
        return;
      }

      // Optional: Check if user is marked as admin in user_metadata
      if (user.user_metadata.role !== 'admin') {
        navigate('/unauthorized'); // 🚫 Logged in but not admin
        return;
      }

      setAuthorized(true); // ✅ All checks passed
    };

    checkUser();
  }, []);

  if (!authorized) return <p>Checking access...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      {/* Insert form and transaction list here */}
    </main>
  );
}
