import { Star, Trash } from "lucide-react";
import { useNavigate } from "react-router";

export default function TripTabs({ trip, onDelete }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/trip/${trip.id}`);
  }

  return (
    <div
      onClick={handleClick}
      className="w-full h-[10vh] rounded-lg p-4 pr-12 pl-12 px-6 flex items-center justify-between shadow-md border-3 border-green-700 hover:bg-[#00000015] hover:cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <Star className="w-7 h-7" />
        <span className="text-lg font-medium">{trip.rating}</span>
      </div>

      <div className="flex flex-col justify-center">
        <span className="text-xl font-semibold">{trip.destination}</span>
        <span className="text-sm italic text-gray-700">
          {(() => {
            const d = new Date(trip.date);
            const day = d.getDate().toString().padStart(2, "0");
            const month = (d.getMonth() + 1).toString().padStart(2, "0");
            const year = d.getFullYear();
            return `${day}/${month}/${year}`;
          })()}
        </span>
        <span className="text-sm text-gray-800">@{trip.userName}</span>
      </div>

      <Trash
        onClick={(e) => {
          e.stopPropagation(); // Bu, handleClick'in tetiklenmesini engeller
          onDelete(); // Silme işlemini yap
        }}
        className="cursor-pointer hover:text-green-700 transition-colors"
      />
    </div>
  );
}
