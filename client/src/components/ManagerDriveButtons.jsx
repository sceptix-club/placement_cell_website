import Link from "next/link";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import supabase from "@/data/supabase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ManagerDriveButtons(props) {
  const pathName = usePathname();
  const pathNo = pathName.slice("/drive/".length);

  const router = useRouter();
  const prop = props.props;
  const [published, setPublished] = React.useState(true);

  const publishDrive = async () => {
    const { data, error } = await supabase
      .from("drive")
      .update({ is_draft: false })
      .eq("id", pathNo)
      .select();
    setPublished(!published);
    toast.success("Drive Published");
    console.log("Drive Published");
  };

  const unPublishDrive = async () => {
    const { data, error } = await supabase
      .from("drive")
      .update({ is_draft: true })
      .eq("id", pathNo)
      .select();
    setPublished(!published);
    toast.success("Drive Unpublished");
    console.log("Drive Unpublished");
  };

  useEffect(() => {
    const fetchPublishStatus = async () => {
      const { data, error } = await supabase
        .from("drive")
        .select("is_draft")
        .eq("id", pathNo);
      if (!error) {
        setPublished(data[0].is_draft);
      }
    };
    fetchPublishStatus();
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
        {published && (
          <button
            className="bg-logo-bg text-black font-bold  p-2 rounded-md m-3 text-sm"
            onClick={publishDrive}
          >
            Publish Drive
          </button>
        )}
        {!published && (
          <button
            className="bg-logo-bg text-black font-bold  p-2 rounded-md m-3 text-sm"
            onClick={unPublishDrive}
          >
            Unpublish Drive
          </button>
        )}
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
