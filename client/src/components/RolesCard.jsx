import React, { useContext, useState } from "react";
import RegisterButton from "@/components/Registerbutton";
import { LoginContext } from "@/context";
import ManagerView from "@/components/ManagerView";
import { toast } from "sonner";
import supabase from "@/data/supabase";
import { useRouter, usePathname } from "next/navigation";

export default function RolesCard({ role, placementDate }) {
  const router = useRouter();
  const { userRole } = useContext(LoginContext);
  const currentDate = new Date();
  const placementDateObj = new Date(placementDate);
  const timeDifference = placementDateObj.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  // const pathName = usePathname();
  // const pathNo = pathName.slice("/drive/".length);


  // const [deleted, setDeleted] = useState(false);

  const deleteDrive = async () => {
    const { error } = await supabase.from("role").delete().eq("id", role.id);
    // setDeleted(true);
    // router.push(`/drive/${role.id}`);

    if (!error) {
      toast.success(`${role.name} Role Deleted Successfully`);
      setTimeout(() => {
        window.location.reload(); //refreshes the page after 1 second to delete the role from the page, otherwise stays on page
      }, 1000);
    } else {
      toast.error("Error Deleting Drive");
    }
  };
  const handleEdit = () => {
    router.push(`/create/role/${role.id}?isEditMode=true`);
  };
  // if (deleted) {
  //   return null;
  // }
  return (
    <section className="flex flex-col mt-8 text-sm lg:text-base">
      <div className="bg-secondary-card rounded-md px-3 py-4 sm:p-6 lg:p-6 font-medium">
        <div className="flex flex-row justify-between items-center mb-5">
          <h2 className="text-xl lg:text-3xl font-medium">{role.name}</h2>
          {userRole === 3 && (
            <div>
              <button className="btn btn-square bg-logo-bg btn-success btn-sm  mx-2 " onClick={handleEdit}>
                <img
                  src="/icons/pencil.png
              "
                  className="w-4 bg-center invert"
                />
              </button>
              <button
                className="btn btn-square btn-sm btn-error mx-2"
                onClick={() =>
                  document.getElementById("role_delete").showModal()
                }
              >
                <img
                  src="/icons/delete.png
              "
                  className="w-4 bg-center invert"
                />
              </button>
              <dialog
                id="role_delete"
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box bg-[#393939]">
                  <h3 className="font-bold text-2xl">Delete Drive!</h3>
                  <p className="py-4">
                    Are you sure you want to delete this Role? <br />
                    This action cannot be undone.
                  </p>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-ghost mx-2">Cancel</button>
                      <button
                        className="btn btn-error mx-2"
                        onClick={deleteDrive}
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          )}
        </div>
        <p className="mb-8 lg:mb-5 sm:leading-tight">{role.description}</p>

        <div className="lg:mt-3 mt-5 flex flex-row">
          <h3>Qualifications:&nbsp;</h3>
          <p className="text-role-text-2">{role.qualification}</p>
        </div>
        <div className="lg:mt-3 mt-5 flex flex-row">
          <h3>Cutoff:&nbsp;</h3>
          <p className="text-role-text-2">{role.cutoff}</p>
        </div>
        <div className="lg:mt-3 mt-5 flex flex-row">
          <h3>CTC:&nbsp;</h3>
          <p className="text-role-text-2">{role.ctc}</p>
        </div>
        <div className="lg:mt-3 mt-5 flex flex-row">
          <h3>Stipend:&nbsp;</h3>
          <p className="text-role-text-2">{role.stipend}</p>
        </div>
        <div className="lg:mt-3 mt-5 flex flex-row items-center">
          <h3>Service Agreement:&nbsp;</h3>
          <p className="text-role-text-2">{role.serviceAgreement}</p>
        </div>
        <div className="lg:mt-3 mt-5 flex flex-row">
          <h3>Location:&nbsp;</h3>
          <p className="text-role-text-2">{role.location}</p>
        </div>

        {userRole === 1 && daysDifference > 0 ? (
          <RegisterButton role={role} />
        ) : (
          userRole !== null && (
            <button
              className="mt-5 px-4 py-2 bg-gray-400 text-white rounded shadow cursor-not-allowed"
              disabled
            >
              Registrations Closed
            </button>
          )
        )}

        {/* {userRole === 3 && <ManagerView />} */}
      </div>
    </section>
  );
};


