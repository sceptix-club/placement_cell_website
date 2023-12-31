"use client"

import RolesCard from "@/components/RolesCard"
import Data from "../../../../public/data"
import { usePathname } from "next/navigation"
import { notFound } from "next/navigation"

const driveinfo = () => {
  const pathName = usePathname()
  const pathNo = pathName.slice("/drive/".length)
  const dataAll = Data.find((item) => item.id === Number(pathNo))

  if (!dataAll) {
    return notFound()
  }

  return (
    <div className="py-10 flex items-center justify-center h-full  bg-background-clr font-inter text-xl font-normal">
      <section className="flex flex-col lg:p-16 p-4 lg:w-3/5 w-10/12 border-white h-auto rounded-md bg-primary-card">
        <h2 className="text-2xl text-role-text font-semibold">
          {dataAll.placementName}
        </h2>
        <h2 className="text-4xl mb-1 font-semibold">{dataAll.companyName}</h2>
        <div className=" py-2 leading-tight font-medium">
          <p>{dataAll.description}</p>
        </div>
        <div className="flex flex-row item-center mt-5">
          <h3 className="text-lg font-medium">Roles:&nbsp;</h3>
          {dataAll.roles.map((role) => {
            return (
              <p
                key={role.subID}
                className="bg-secondary-card text-role-text-2 rounded-md px-2 ml-2 text-base font-medium"
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

export default driveinfo
