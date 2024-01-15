'use client'
import React, { useState, useRef, useEffect } from 'react';



const Role = () => {
    const [jobInfo, setJobInfo] = useState({
        roleName: '',
        description: '',
        qualification: '',
        Cutoff: '',
        ctc: '',
        stipend: '',
        location: '',
        serviceAgreement: '',
    });
    const textAreaRef = useRef(null);

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
    }, [jobInfo])



    return (

        <div className="w-1/2 px-10 mx-auto">
            <h1 className="font-sans font-bold text-4xl">Create a Role</h1>
            <div className="p-5 border rounded-md mt-5 mb-16 font-sans  bg-primary-card shadow-md">
                <div className="mb-4 px-5">
                    <label className="block text-lg font-semibold mt-5  text-main-heading mb-2">Name of the Role</label>
                    <input
                        type="text"
                        name="roleName"
                        value={jobInfo.roleName}
                        onChange={handleChange}

                        className="w-11/12 border rounded-md px-3 py-2 bg-secondary-card placeholder-plcholder-text text-divider-color focus:outline-none focus:border-blue-500"
                        placeholder="Enter the role"
                    />
                </div>
                <div className="mb-4 px-5 flex-wrap h-auto">

                    <label className="block text-lg font-semibold  text-main-heading mb-2">Description</label>
                    <textarea
                        className="w-11/12 pb-10 border px-2 bg-secondary-card placeholder-plcholder-text text-divider-color rounded-md resize-none focus:outline-none focus:border-blue-500 overflow-hidden "

                        name="description"

                        value={jobInfo.description}

                        onChange={handleChange}
                        rows="2"
                        ref={textAreaRef}


                        placeholder="Enter the description..."
                    />
                </div>

                <div className="mb-4 px-5">
                    <label className="block text-lg font-semibold text-main-heading mb-2">Qualification</label>
                    <input
                        type="text"
                        name="qualificationCutoff"
                        value={jobInfo.qualificationCutoff}
                        onChange={handleChange}
                        className="w-11/12 border rounded-md px-3 py-2 bg-secondary-card placeholder-plcholder-text text-divider-color focus:outline-none focus:border-blue-500"
                        placeholder="Enter the Qualification"
                    />
                </div>
                <div className="flex space-x-8">
                    <div className="mb-4 px-5 ">
                        <label className="block text-lg font-semibold text-main-heading mb-2">Cutoff</label>
                        <input
                            type="text"
                            name="Cutoff"
                            value={jobInfo.Cutoff}
                            onChange={handleChange}
                            className="w-11/12 border rounded-md px-3 py-2 bg-secondary-card placeholder-plcholder-text text-divider-color focus:outline-none focus:border-blue-500"
                            placeholder="Enter the Cutoff"
                        />
                    </div>

                    <div className="mb-4 px-5">
                        <label className="block text-lg font-semibold text-main-heading mb-2">CTC</label>
                        <input
                            type="text"
                            name="ctc"
                            value={jobInfo.ctc}
                            onChange={handleChange}
                            className="w-11/12 border rounded-md px-3 py-2 bg-secondary-card placeholder-plcholder-text text-divider-color focus:outline-none focus:border-blue-500"
                            placeholder="Enter the CTC"
                        />
                    </div>
                </div>

                <div className="mb-4 px-5">
                    <label className="block text-lg font-semibold text-main-heading mb-2">Stipend</label>
                    <input
                        type="text"
                        name="stipend"
                        value={jobInfo.stipend}
                        onChange={handleChange}
                        className="w-11/12 border rounded-md px-3 py-2 bg-secondary-card placeholder-plcholder-text text-divider-color focus:outline-none focus:border-blue-500"
                        placeholder="Enter the Stipend"
                    />
                </div>

                <div className="mb-4 px-5">
                    <label className="block text-lg font-semibold text-main-heading mb-2">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={jobInfo.location}
                        onChange={handleChange}
                        className="w-11/12 border rounded-md px-3 py-2 bg-secondary-card placeholder-plcholder-text text-divider-color focus:outline-none focus:border-blue-500"
                        placeholder="Enter the Location"
                    />
                </div>

                <div className="mb-4 px-5">
                    <label className="block text-lg font-semibold text-main-heading mb-2">Service Agreement</label>
                    <input
                        type="text"
                        name="serviceAgreement"
                        value={jobInfo.serviceAgreement}
                        onChange={handleChange}
                        className="w-11/12 border rounded-md px-3 py-2 bg-secondary-card placeholder-plcholder-text text-divider-color focus:outline-none focus:border-blue-500"
                        placeholder="Enter the Service Agreement"
                    />
                </div>
                <button className="px-10 py-2 ml-5 mb-5 mt-5 bg-green-600 hover:bg-green-700 text-white font-bold  rounded-md">
                    Save
                </button>
            </div>
        </div>
    );
};

export default Role;
