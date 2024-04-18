import MenteeCard from "@/components/MenteeCard.jsx";
import mentees from "../../../public/MenteeTestData.js"

export default function page() {
  return (
    <div className="py-10" >
      <p className="px-7 py-4 text-3xl font-medium">Your Mentees</p>
      <div className="flex flex-wrap justify-center mx-1 py-5 gap-4">
      {mentees.map((user, index) => (
        <div key={index} className="w-64 mt-3">
          <MenteeCard {...user} />
        </div>
      ))}
    </div>
    </div>
  );
}