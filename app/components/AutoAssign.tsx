"use client";
import Link from "next/link";

function AutoAssignButton() {
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <Link
      href={{
        pathname: "/assigned-sites",
        query: {
          authorized: "true",
          date: currentDate,
        },
      }}
    >
      <button className="bg-white border border-black font-semibold py-2 px-4 rounded hover:bg-black hover:text-white uppercase hover:scale-105 transition duration-300">
        ✨ Auto-Assign
      </button>
    </Link>
  );
}

export default AutoAssignButton;
