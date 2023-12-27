"use client"

import React, { useEffect, useState, useRef } from "react"
import RolesCard from "@/components/RolesCard"

const create = () => {
  // just for testing
  let roles = ["react", "web", "html"]

  return (
    <div className="py-10 flex items-center justify-center h-full my-10 bg-background-clr">
      <section className=" flex flex-col lg:p-10 p-4 lg:w-3/5 w-10/12 border-white h-auto rounded-sm bg-primary-card">
        <h2 className="text-lg text-role-text font-semibold ">
          Placement Name
        </h2>
        <h2 className="text-2xl font-semibold mb-1">Company Name</h2>
        <div className=" rounded-md p-3 py-2 ml-1 leading-tight">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti
            dolorem reiciendis maiores molestiae facilis, harum culpa laborum,
            nostrum inventore recusandae optio debitis vero sed, saepe pariatur
          </p>
        </div>
        <div className="flex flex-row item-center mt-5">
          <h3 className="font-semibold ">Roles:&nbsp;&nbsp;</h3>
          {roles.map((role, index) => {
            return (
              <p
                id={`role-${index}`}
                key={index}
                className="bg-secondary-card text-role-text-2 rounded-md px-2 ml-2"
              >
                {role}
              </p>
            )
          })}
        </div>
        <hr className=" border-divider-color my-5" />

        {/*  need to map roles here when we get them from the backend */}
        <div>
          <RolesCard />
          <RolesCard />
        </div>
      </section>
    </div>
  )
}

export default create
