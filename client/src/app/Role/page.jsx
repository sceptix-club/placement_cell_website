'use client'
import React, { useState } from 'react';



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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobInfo({
            ...jobInfo,
            [name]: value,
        });
    };
    return (

        <div className="w-1/2 px-10 mx-auto">
            <div className="p-5 border rounded-md bg-primary-card shadow-md">
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-main-heading mb-2">Name of the Role</label>
                    <input
                        type="text"
                        name="roleName"
                        value={jobInfo.roleName}
                        onChange={handleChange}

                        className="w-full border rounded-md px-3 py-2 bg-secondary-card placeholder-plcholder-text text-divider-color focus:outline-none focus:border-blue-500"
                        placeholder="Enter the role..."
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold  text-main-heading mb-2">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={jobInfo.description}
                        onChange={handleChange}
                        className="mt-1 p-10 w-full border border bg-secondary-card placeholder-plcholder-text text-divider-color rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    ></input>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold text-main-heading mb-2">Qualification</label>
                    <input
                        type="text"
                        name="qualificationCutoff"
                        value={jobInfo.qualificationCutoff}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 bg-secondary-card placeholder-plcholder-text text-divider-color focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex space-x-8">
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-main-heading mb-2">Cutoff</label>
                        <input
                            type="text"
                            name="Cutoff"
                            value={jobInfo.Cutoff}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 bg-secondary-card placeholder-plcholder-text text-divider-color focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-main-heading mb-2">CTC</label>
                        <input
                            type="text"
                            name="ctc"
                            value={jobInfo.ctc}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 bg-secondary-card placeholder-plcholder-text text-divider-color focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold text-main-heading mb-2">Stipend</label>
                    <input
                        type="text"
                        name="stipend"
                        value={jobInfo.stipend}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 bg-secondary-card placeholder-plcholder-text text-divider-color focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold text-main-heading mb-2">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={jobInfo.location}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 bg-secondary-card placeholder-plcholder-text text-divider-color focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold text-main-heading mb-2">Service Agreement</label>
                    <input
                        type="text"
                        name="serviceAgreement"
                        value={jobInfo.serviceAgreement}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 bg-secondary-card placeholder-plcholder-text text-divider-color focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button>Save</button>
            </div>
        </div>
    );
};

export default Role;
