"use client"

import React, { useState } from "react"

const create = () => {
  const [submitData, setSubmitData] = useState({
    placementName: "",
    companyName: "",
    companyDesc: "",
    date: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSubmitData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log("Submitted")
    console.table(submitData)
  }

  return (
    <div className="flex justify-center items-center h-auto py-10 mb-10">
      <section className="w-10/12  sm:w-sm md:w-md lg:w-lg h-auto p-4 sm:p-8 md:p-12 bg-primary-card rounded-md">
        <h2 className="font-inter text-2xl sm:text-3xl md:text-4xl font-bold text-divider-color mb-8">
          Create a Draft
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label
            className="font-inter text-lg sm:text-xl md:text-2xl font-medium text-divider-color"
            htmlFor="placementName"
          >
            Placement Name
          </label>
          <input
            className="bg-secondary-card rounded-md px-5
            py-2 mb-5 placeholder-plcholder-text text-divider-color"
            type="text"
            id="placementName"
            name="placementName"
            placeholder="Enter Placement Name"
            defaultValue={submitData.placementName}
            onChange={handleInputChange}
          />
          <label
            className="font-inter text-lg sm:text-xl md:text-2xl font-medium text-divider-color"
            htmlFor="companyName"
          >
            Company Name
          </label>
          <input
            className="bg-secondary-card rounded-md px-5
            py-2 mb-5 placeholder-plcholder-text text-divider-color"
            type="text"
            id="companyName"
            name="companyName"
            placeholder="Enter Company Name"
            defaultValue={submitData.companyName}
            onChange={handleInputChange}
          />
          <label
            className="font-inter text-lg sm:text-xl md:text-2xl font-medium text-divider-color"
            htmlFor="companyDesc"
          >
            Company Description
          </label>
          <textarea
            className="bg-secondary-card rounded-md px-5
            py-2 mb-5 placeholder-plcholder-text text-divider-color resize-none"
            rows={6}
            type="text"
            id="companyDesc"
            name="companyDesc"
            placeholder="Enter Company Description"
            defaultValue={submitData.companyDesc}
            onChange={handleInputChange}
          />
          <label
            className="font-inter text-lg sm:text-xl md:text-2xl font-medium text-divider-color"
            htmlFor="date"
          >
            Date
          </label>
          <input
            className="bg-secondary-card rounded-md px-5
            py-2 mb-5 text-divider-color"
            type="date"
            id="date"
            name="date"
            defaultValue={submitData.date}
            onChange={handleInputChange}
          />
          <div className="flex justify-center w-32 h-10">
            <button
              className="font-medium bg-logo-bg w-32 h-10 rounded-md "
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default create
