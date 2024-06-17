'use client'
import React, { useState, useRef, useEffect } from "react";
import supabase from "@/data/supabase";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const Role = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const pathNo = pathName.slice("/create/role/".length);

  const [jobInfo, setJobInfo] = useState({
    name: "",
    description: "",
    qualification: "",
    cutoff: "",
    ctc: "",
    stipend: "",
    location: "",
    serviceAgreement: "",
  });

  const textAreaRef = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const editMode = searchParams.get("isEditMode");

    setIsEditMode(editMode === "true");

    if (editMode === "true" && pathNo) {
      fetchRoleDetails(pathNo);
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobInfo({
      ...jobInfo,
      [name]: value,
    });
  };

  useEffect(() => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  }, [jobInfo]);

  const fetchRoleDetails = async (id) => {
    try {
      const { data, error } = await supabase
        .from("role")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching role details:", error);
        toast.error(`Error fetching role details: ${error.message}`);
      } else {
        console.log("Fetched role details:", data);
        setJobInfo(data);
      }
    } catch (error) {
      console.error("Error fetching role details:", error.message);
      toast.error(`Error: ${error.message}`);
    }
  };


  const saveRole = async (e) => {
    e.preventDefault();


    try {
      if (isEditMode) {

        const { data: updatedData, error } = await supabase
          .from("role")
          .update(jobInfo)
          .eq("id", pathNo);



        if (error) {
          console.error("Error updating role:", error);
          toast.error(`Error updating role: ${error.message}`);
        } else {


          console.log("Updated data:", updatedData);
          toast.success("Role updated successfully");
          setJobInfo(updatedData);
          router.push(`/drive/${jobInfo.drive_id}`);
        }
      } else {
        const { data, error } = await supabase
          .from("role")
          .insert([{ ...jobInfo, drive_id: pathNo }])


        if (error) {
          console.error("Error saving role:", error);
          toast.error(`Error saving role: ${error.message}`);
        } else {
          console.log("Role saved successfully:", data);
          toast.success("Role saved successfully");
          router.push(`/drive/${pathNo}`);
        }
      }

      setJobInfo({
        name: "",
        description: "",
        qualification: "",
        cutoff: "",
        ctc: "",
        stipend: "",
        location: "",
        serviceAgreement: "",
      });
    } catch (error) {
      console.error("Error saving role:", error.message);
      toast.error(`Error: ${error.message}`);
    }
  };
  useEffect(() => {
    textAreaRef.current.style.height = "auto";

    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  }, [jobInfo]);

  return (
    <div className="flex flex-col justify-center ml-46 h-auto py-10 mb-10">
      <h2 className="font-gabarito ml-10 lg:ml-96 sm:ml-20 text-2xl sm:text-3xl md:text-4xl font-bold text-divider-color mb-2">
        {isEditMode ? "Edit Role" : "Create a Role"}
      </h2>

      <section className="font-gabarito w-10/12 ml-10 md:ml-40 lg:ml-96 sm:text-2xl md:text-2xl sm:ml-24 mt-4 p-4 sm:w-sm md:w-md lg:w-lg h-auto md:p-12 sm:p-8 bg-primary-card rounded-md">
        <form onSubmit={saveRole} className="flex flex-col mb-4">
          <label className="block text-lg font-semibold mt-1 sm:text-xl md:text-2xl text-divider-color mb-2">
            Name of the Role
          </label>
          <input
            type="text"
            name="name"
            value={jobInfo.name}
            onChange={handleChange}
            className="rounded-md px-3 py-3 md:px-3 md:py-3 text-sm bg-secondary-card placeholder-plcholder-text text-white"
            placeholder="Enter the role"
          />

          <label className="block text-lg font-semibold mt-5 sm:text-xl md:text-2xl text-divider-color mb-2">
            Description
          </label>
          <textarea
            className="pb-10 pt-1 px-3 text-sm bg-secondary-card placeholder-plcholder-text text-white rounded-md resize-none overflow-hidden"
            name="description"
            value={jobInfo.description}
            onChange={handleChange}
            rows="2"
            ref={textAreaRef}
            placeholder="Enter the description..."
          />

          <label className="block text-lg font-semibold mt-5 sm:text-xl md:text-2xl  text-divider-color mb-2">
            Qualification
          </label>
          <input
            type="text"
            name="qualification"
            value={jobInfo.qualification}
            onChange={handleChange}
            className=" rounded-md px-3 py-3 text-sm bg-secondary-card placeholder-plcholder-text text-white  "
            placeholder="Enter the Qualification"
          />

          <label className="block text-lg font-semibold mt-5 sm:text-xl md:text-2xl  text-divider-color mb-2">
            Cutoff
          </label>
          <input
            type="text"
            name="cutoff"
            value={jobInfo.cutoff}
            onChange={handleChange}
            className="  rounded-md px-3 py-3 text-sm bg-secondary-card placeholder-plcholder-text text-white  "
            placeholder="Enter the Cutoff"
          />

          <div className="flex flex-wrap">
            <div className="flex-1 pr-2">
              <label className="block text-lg font-semibold mt-5 sm:text-xl md:text-2xl  text-divider-color mb-2">
                CTC
              </label>
              <input
                type="text"
                name="ctc"
                value={jobInfo.ctc}
                onChange={handleChange}
                className="w-full mt-1 rounded-md px-3 py-3 text-sm bg-secondary-card placeholder-plcholder-text text-white"
                placeholder="Enter the CTC"
              />
            </div>

            <div className="flex-1 pl-2">
              <label className="block text-lg font-semibold mt-5 sm:text-xl md:text-2xl  text-divider-color mb-2">
                Stipend
              </label>
              <input
                type="text"
                name="stipend"
                value={jobInfo.stipend}
                onChange={handleChange}
                className="w-full mt-1 rounded-md px-3 py-3 text-sm bg-secondary-card placeholder-plcholder-text text-white"
                placeholder="Enter the Stipend"
              />
            </div>
          </div>

          <label className="block text-lg font-semibold mt-5 sm:text-xl md:text-2xl  text-divider-color mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={jobInfo.location}
            onChange={handleChange}
            className="  rounded-md px-3 py-3 text-sm bg-secondary-card placeholder-plcholder-text text-white  "
            placeholder="Enter the Location"
          />

          <label className="block text-lg font-semibold mt-5 sm:text-xl md:text-2xl  text-divider-color mb-2">
            Service Agreement
          </label>
          <input
            type="text"
            name="serviceAgreement"
            value={jobInfo.serviceAgreement}
            onChange={handleChange}
            className="rounded-md px-3 py-3 text-sm bg-secondary-card placeholder-plcholder-text text-white  "
            placeholder="Enter the Service Agreement"
          />
          <div className="flex justify-center w-32 h-10">
            <button

              className="  text-lg bg-logo-bg w-32 h-10 rounded-md mt-5"
              type="submit"
            >
              {isEditMode ? "Edit" : "Save"}
            </button>
          </div>
        </form>
      </section>

    </div>
  );
};

export default Role;
