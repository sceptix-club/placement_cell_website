import React from 'react';

const Page = () => {
    return (

        <div className="p-8 border rounded-md shadow-md max-w-md mx-auto">
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600 mb-2">Name of the Role</label>
                <input
                    type="text"
                    name="roleName"
                    // value={jobInfo.roleName}
                    // onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
            </div>
        </div>
    );
};

export default Page;
