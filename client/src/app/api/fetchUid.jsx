import { useEffect } from 'react';
import supabase from '@/data/supabase';

const FetchUidComponent = ({ setUid }) => {

useEffect(() => {
    const fetchUid = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        if (data.session == null) {
          // Handle case where user is not authenticated
          router.push("/login");
          return;
        }
        const { user } = data.session;

        // Fetch the user_id from the user table
        const { data: userData, error: userError } = await supabase
          .from("user")
          .select("id")
          .eq("user_id", user.id);
        if (userError) {
          throw userError;
        }
        const userId = userData[0].id;
        const { data: studentData, error: studentError } = await supabase
          .from("student")
          .select("id")
          .eq("user_id", userId);
        if (studentError) {
          throw studentError;
        }
        const sid = studentData[0].id;
        setUid(sid);
      } catch (error) {
        console.error("Error fetching user id:", error.message);
        // Handle error fetching user ID
      }
    };

    fetchUid();
  }, []);

  return null;

};

export default FetchUidComponent;