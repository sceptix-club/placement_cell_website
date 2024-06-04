import React, { useContext } from "react";
import RegisterButton from "@/components/Registerbutton";
import { LoginContext } from "@/context";
import ManagerView from "@/components/ManagerView";

const RolesCard = ({ role, placementDate }) => {
  const { userRole } = useContext(LoginContext);
  const currentDate = new Date();
  const placementDateObj = new Date(placementDate);
  const timeDifference = placementDateObj.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  return (
    <section className="flex flex-col mt-8 text-sm lg:text-base">
      <h2 className="text-xl lg:text-2xl font-medium">{role.name}</h2>
      <div className="bg-secondary-card rounded-md px-3 py-4 sm:p-6 lg:p-6 font-medium">
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

export default RolesCard;
