import React from "react";
import Link from "next/link";

export default function ManagerCreateDrive() {
  return (
    <>
      <Link href="/create/drive">
        <button className="bg-logo-bg text-black font-bold p-3 m-1 rounded-md text-sm">
          Create New Drive
        </button>
      </Link>
    </>
  );
}
