"use client"

import RolesCard from "@/components/RolesCard"
import Data from "../../../../public/data"
import { usePathname } from "next/navigation"

const create = () => {
  const pathName = usePathname()
  const pathNo = pathName.slice("/drive/".length)
  console.log(pathNo)
  const dataAll = Data.find((item) => item.id === Number(pathNo))

  return (
    <div className="py-10 flex items-center justify-center h-full  bg-background-clr font-inter text-xl ">
      <section className="flex flex-col lg:p-10 p-4 lg:w-3/5 w-10/12 border-white h-auto rounded-md bg-primary-card">
        <h2 className="text-xl text-role-text">{dataAll.placementName}</h2>
        <h2 className="text-2xl mb-1">{dataAll.companyName}</h2>
        <div className="p-3 py-2 ml-1 leading-tight font-light">
          <p>{dataAll.description}</p>
        </div>
        <div className="flex flex-row item-center mt-5">
          <h3 className="text-lg">Roles:&nbsp;</h3>
          {dataAll.roles.map((role) => {
            return (
              <p
                key={role.subID}
                className="bg-secondary-card text-role-text-2 rounded-md px-2 ml-2 text-base"
              >
                {role.role}
              </p>
            )
          })}
        </div>
        <hr className=" border-divider-color mt-5" />

        {dataAll.roles.map((innerRole) => {
          return <RolesCard key={innerRole.subID} props={innerRole} />
        })}
      </section>
    </div>
  )
}

export default create
