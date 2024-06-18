

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
  const handleEdit = () => {
    router.push(`/create/drive?isEditMode=true&pathNo=${pathNo}`);
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

  const deleteDrive = async () => {
    const { error } = await supabase.from("drive").delete().eq("id", pathNo);
    // .select();
    if (!error) {
      toast.success("Drive Deleted Successfully");
      router.push("/");
    } else {
      toast.error("Error Deleting Drive");
    }
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
        <button className="bg-logo-bg text-black font-bold  p-2 rounded-md m-3 text-sm" onClick={handleEdit}>
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
        <button
          className="bg-logo-bg text-black font-bold  p-2 rounded-md m-3 text-sm"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          Delete Drive
        </button>

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-[#393939]">
            <h3 className="font-bold text-2xl">Delete Drive!</h3>
            <p className="py-4">
              Are you sure you want to delete this drive? <br />
              This action cannot be undone.
            </p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-ghost mx-2">Cancel</button>
                <button className="btn btn-error mx-2" onClick={deleteDrive}>
                  Delete
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
}