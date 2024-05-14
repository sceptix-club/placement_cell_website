import supabase from "../data/supabase";

export async function getUserRole(accessToken: string) {
  const { data } = await supabase.auth.getUser(accessToken);
  if (data.user !== null) {
    const userRole = await supabase
      .from("user")
      .select("role")
      .eq("user_id", data.user.id);
    return userRole.data[0].role;
  }
  
}
