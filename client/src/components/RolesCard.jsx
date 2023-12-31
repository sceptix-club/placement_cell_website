import React from "react"

const RolesCard = ({ props }) => {
  return (
    <section className="flex flex-col mt-6 mb-3 font-medium text-sm lg:text-base">
      <h2 className="text-xl lg:text-2xl">{props.role}</h2>
      <div className="bg-secondary-card rounded-md p-3 sm:p-6 lg:p-6">
        {/* this is the description */}
        <p className="mb-5  leading-tight lg:leading-tight">
          {props.roleDescription}
        </p>

        <div className="mt-3 flex flex-row">
          <h3 className="">Qualifications:&nbsp;</h3>
          <p className="text-role-text-2 ">{props.qualification}</p>
        </div>
        <div className="mt-3 flex flex-row">
          <h3 className="">Cutoff:&nbsp;</h3>
          <p className="text-role-text-2">{props.cutoff}</p>
        </div>
        <div className="mt-3 flex flex-row">
          <h3 className="">CTC:&nbsp;</h3>
          <p className="text-role-text-2">{props.ctc}</p>
        </div>
        <div className="mt-3 flex flex-row">
          <h3 className="">Stipend:&nbsp;</h3>
          <p className="text-role-text-2">{props.stipend}</p>
        </div>
        <div className="mt-3 flex flex-row items-center">
          <h3 className="">Service Agreement:&nbsp;</h3>
          <p className="text-role-text-2">{props.serviceAgreement}</p>
        </div>
        <div className="mt-3 flex flex-row">
          <h3 className="">Location:&nbsp;</h3>
          <p className="text-role-text-2">{props.location}</p>
        </div>
      </div>
    </section>
  )
}

export default RolesCard
