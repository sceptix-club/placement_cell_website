import { useEffect } from "react";
import supabase from "@/data/supabase";

const PlacementAPI = ({ pathNo, setPlacements, setRole, setRoleIds }) => {
  useEffect(() => {
    const fetchPlacement = async () => {
      const { data, error } = await supabase
        // .schema("placements")
        .from("drive")
        .select("*, role(*)")
        .eq("id", pathNo)
        .single();
      // console.log("data", data);
      // console.log("data.role", data.role);
      if (!error) {
        setPlacements(data);
        setRole(data.role);
        // if (data.role && data.role.length > 0) {
        //   const roleIds = data.role.map((role) => role.id);
        //   setRoleIds(roleIds);
        //   console.log("roleid", roleIds);
        // }
      }
    };
    fetchPlacement();

    // const fetchRoles = async () => {
    //   const { data: roleData, error: roleError } = await supabase
    //     .schema("placements")
    //     .from("role")
    //     .select("*")
    //     .eq("drive_id", pathNo);
    // if (!roleError) {
    //   setRole(roleData);
    //   if (roleData && roleData.length > 0) {
    //     const roleIds = roleData.map((role) => role.id);
    //     setRoleIds(roleIds);
    //   }
    //   }
    // };

    // fetchRoles();
  }, [pathNo, setPlacements, setRole, setRoleIds]);

  return null;
};

export default PlacementAPI;
