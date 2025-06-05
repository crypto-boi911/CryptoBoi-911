import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function SetAdminRole() {
  useEffect(() => {
    const updateMetadata = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert("You must be logged in.");
        return;
      }

      const { error } = await supabase.auth.updateUser({
        data: { role: 'admin' }
      });

      if (error) {
        alert("Failed to update metadata: " + error.message);
      } else {
        alert("✅ Role set to admin!");
      }
    };

    updateMetadata();
  }, []);

  return <p>Setting admin role...</p>;
}
