import { useParams, useNavigate } from "react-router-dom";
import { useStorage } from "../hooks/useStorage";
import { Luggage, Calendar1, Star, User } from "lucide-react";

export default function TripDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getItem } = useStorage("travels");

  const trips = getItem() || [];
  const trip = trips.find((t) => t.id === id);

  if (!trip) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold text-red-500">Trip not found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-gray-200 p-2 rounded cursor-pointer hover:bg-gray-400"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  function toMainPage() {
    navigate("/");
  }

  return (
    <div className="h-full w-full pl-12 pr-12">
      <div className="h-[10vh] w-full flex justify-between items-center">
        <div
          onClick={toMainPage}
          className="flex flex-row p-2 gap-2 items-center rounded-lg hover:bg-[#00000015] cursor-pointer"
        >
          <Luggage className="w-[40px] h-[40px]" />
          <span className="text-xl font-bold">Travel</span>
        </div>
      </div>

      <div className="h-0 w-full border-1" />

      <div className="w-full h-[10vh] flex justify-between items-center p-4">
        <span className="text-3xl font-bold">{trip.destination}</span>
      </div>

      <div className="w-full h-[75vh] p-16 border-t-2 grid grid-cols-[1fr_1fr] gap-5">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col gap-8 p-8 border-4 border-green-700 rounded-lg bg-[#00000011]">
            <div className="flex flex-row gap-2 justify-start items-center">
              <Calendar1 className="h-12 w-12" />
              <span className="text-xl font-bold">
                {(() => {
                  const d = new Date(trip.date);
                  const day = d.getDate().toString().padStart(2, "0");
                  const month = (d.getMonth() + 1).toString().padStart(2, "0");
                  const year = d.getFullYear();
                  return `${day}/${month}/${year}`;
                })()}
              </span>
            </div>
            <div className="flex flex-row gap-2 justify-start items-center">
              <Star className="h-12 w-12" />
              <span className="text-xl font-bold">{trip.rating}</span>
            </div>
            <div className="flex flex-row gap-2 justify-start items-center">
              <User className="h-12 w-12" />
              <span className="text-xl font-bold">{trip.userName}</span>
            </div>
          </div>
        </div>

        <div className="border-4 border-green-700 rounded-lg bg-[#00000011] flex flex-col p-8 gap-8">
          <span className="text-3xl font-bold">Notes</span>
          <div className="h-0 w-full border-1" />

          {trip.notes ? (
            <div>{trip.notes}</div>
          ) : (
            <span className="text-xl italic">There is no notes to show...</span>
          )}
        </div>
      </div>
    </div>
  );
}
