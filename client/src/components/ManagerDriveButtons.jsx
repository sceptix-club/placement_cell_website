import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import supabase from "@/data/supabase";
import { useRouter } from "next/navigation";

export default function ManagerDriveButtons(props) {
  const pathName = usePathname();
  const pathNo = pathName.slice("/drive/".length);

  const router = useRouter();
  const prop = props.props;
  const [showPublish, setShowPublish] = React.useState(true);

  const publishDrive = async () => {
    const { data, error } = await supabase
      // .schema("placements")
      .from("drive")
      .update({ is_draft: false })
      .eq("id", pathNo)
      .select();
    setShowPublish(false);
    console.log("Drive Published");
  };

  const unPublishDrive = async () => {
    const { data, error } = await supabase
      // .schema("placements")
      .from("drive")
      .update({ is_draft: true })
      .eq("id", pathNo)
      .select();
    setShowPublish(true);
    console.log("Drive Unpublished");
  };

  React.useEffect(() => {
    const timeoutFunction = setTimeout(() => {
      setShowPublish(prop);
    }, 2000);
  }, []);

  return (
    <>
      <div className="flex flex-row p-2 justify-around">
        <Link href={`/create/role/${pathNo}`}>
          <button className="bg-logo-bg text-black font-bold  p-2  rounded-md m-3 text-sm">
            Add Role
          </button>
        </Link>

        <button className="bg-logo-bg text-black font-bold  p-2 rounded-md m-3 text-sm">
          Edit Drive
        </button>

        {/* {showPublish ? ( */}
        {/* // This is the condition that needs to be checked, not working, to be fixed soon */}
        <button
          className="bg-logo-bg text-black font-bold  p-2 rounded-md m-3 text-sm"
          onClick={publishDrive}
        >
          Publish Drive
        </button>
        {/* ) : ( */}
        <button
          className="bg-logo-bg text-black font-bold  p-2 rounded-md m-3 text-sm"
          onClick={unPublishDrive}
        >
          Unpublish Drive
        </button>
        {/* )} */}

        <Link href={`/drive/${pathNo}/registrations`}>
          <button className="bg-logo-bg text-black font-bold  p-2  rounded-md m-3 text-sm">
            Registrations
          </button>
        </Link>

        <button className="bg-logo-bg text-black font-bold  p-2 rounded-md m-3 text-sm">
          Delete Drive
        </button>
      </div>
    </>
  );
}
