import React from "react"

const RolesCard = () => {
  return (
    <section className="flex flex-col mb-5">
      <h2 className="text-lg font-semibold text-role-text">Roles Variable</h2>
      <div className="relative bg-secondary-card rounded-md p-4 py-3 leading-tight">
        {/* this is the description */}
        <p className=" mb-5 text-sm lg:w-1/2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          omnis voluptas officiis deleniti quasi architecto facere, nesciunt
          iusto ipsa nihil excepturi magnam cum, magni, cumque delectus qui.
          Non, eos animi?
        </p>
        <div className="text-sm flex flex-row lg:absolute lg:top-3 lg:right-0 lg:w-2/5">
          <h3 className="font-semibold ">Location:&nbsp;</h3>
          <p className="text-role-text-2 ml-2 ">location var</p>
        </div>
        <div className="mt-3 text-sm ">
          <h3 className="font-semibold">Qualifications:</h3>
          <p className="text-role-text-2 ml-2 lg:w-1/2">
            Lorem, ipsum or sit amet consectetur adipisicing elit. Ipsum sequi
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus
            officiis, natus
          </p>
        </div>
        <div className="mt-3 flex flex-row text-sm">
          <h3 className=" font-semibold ">Cutoff:&nbsp;</h3>
          <p className="text-role-text-2 ml-2">cutoff variable</p>
        </div>
        <div className=" mt-3 flex flex-row text-sm">
          <h3 className="font-semibold">CTC:&nbsp;</h3>
          <p className="text-role-text-2 ml-2">ctc variable</p>
        </div>
        <div className=" mt-3 flex flex-row text-sm">
          <h3 className="font-semibold">Stipend:&nbsp;</h3>
          <p className="text-role-text-2 ml-2">stipend variable</p>
        </div>
        <div className="mt-3 flex flex-row items-center text-sm">
          <h3 className="font-semibold">Service Agreement:&nbsp;</h3>
          <div className="bg-secondary-card rounded-md p-2 py-1">
            <p className="bg-tertiary-card text-role-text-2 rounded-md px-2">
              service variable
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RolesCard
