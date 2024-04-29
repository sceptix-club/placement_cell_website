import React from "react";
import RegisterButton from '@/components/Registerbutton';
import ManagerView from "@/components/ManagerView";

const RolesCard = ({ props }) => {
  return (
    <section className="flex flex-col mt-8 text-sm lg:text-base">
      <h2 className="text-xl lg:text-2xl font-medium">{props.name}</h2>
      <div className="bg-secondary-card rounded-md px-3 py-4 sm:p-6 lg:p-6 font-medium">
        {/* this is the description */}
        <p className="mb-8 lg:mb-5 sm:leading-tight">{props.description}</p>

        <div className="lg:mt-3 mt-5 flex flex-row">
          <h3>Qualifications:&nbsp;</h3>
          <p className="text-role-text-2 ">{props.qualification}</p>
        </div>
        <div className="lg:mt-3 mt-5 flex flex-row">
          <h3>Cutoff:&nbsp;</h3>
          <p className="text-role-text-2">{props.cutoff}</p>
        </div>
        <div className="lg:mt-3 mt-5 flex flex-row">
          <h3>CTC:&nbsp;</h3>
          <p className="text-role-text-2">{props.ctc}</p>
        </div>
        <div className="lg:mt-3 mt-5 flex flex-row">
          <h3>Stipend:&nbsp;</h3>
          <p className="text-role-text-2">{props.stipend}</p>
        </div>
        <div className="lg:mt-3 mt-5 flex flex-row items-center">
          <h3>Service Agreement:&nbsp;</h3>
          <p className="text-role-text-2">{props.serviceAgreement}</p>
        </div>
        <div className="lg:mt-3 mt-5 flex flex-row">
          <h3>Location:&nbsp;</h3>
          <p className="text-role-text-2">{props.location}</p>
        </div>
        <RegisterButton/>
        <ManagerView/>
        
      </div>
    </section>
  );
};

export default RolesCard;
