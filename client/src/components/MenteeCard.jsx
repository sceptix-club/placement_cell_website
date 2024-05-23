import { useRouter } from 'next/navigation';
function MenteeCard({ props }) {
  const router = useRouter();

  const handleAcademicDetailsClick = () => {

    router.push(`/verify/${props.student.id}`);
  };
  return (
    <>
      <div className="w-64 bg-primary-card p-2 space-y-1 rounded-xl">
        <div className="flex flex-col h-80 w-full p-4 items-center space-y-3">
          <img
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            alt="ProfileImg"
            className="w-24 h-24 rounded-lg mb-2"
          />
          <div className="space-y-3">
            <h5 className="text-xl mb-2 text-center">{props.student.name}</h5>
            <p className="text-sm mb-1 text-left">USN: {props.student.usn}</p>
            <p className="text-sm mb-1 text-left">Branch: {props.student.branch}</p>
            <p className="text-sm mb-1 text-left">Year: {props.student.year}</p>
            <p className="text-sm mb-4 text-left">{props.student.email}</p>
          </div>
        </div>
        <button className="w-full bg-btn-color-green text-white px-4 py-2 rounded-lg hover:bg-white hover:text-btn-color-green transition-colors duration-200" onClick={handleAcademicDetailsClick}>
          Academic Details
        </button>
      </div>
    </>
  );
}

export default MenteeCard;
