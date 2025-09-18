import { useEffect, useState } from "react";
import { Luggage, Plus } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useStorage } from "./hooks/useStorage.js";
import { useDebounce } from "./hooks/useDebounce.js";
import TripTabs from "./components/TripTabs.jsx";

function App() {
  const navigate = useNavigate();

  const { getItem, setItem } = useStorage("travels"); //tablo key i ; sanki o tablonun adı gibi düşün
  const [trips, setTrips] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("query") || "";
  const debouncedSearchTerm = useDebounce(searchTerm, 400); // 400ms sonra trigger olacak

  const filteredTrips = debouncedSearchTerm
    ? trips.filter((trip) =>
        trip.destination
          .toLocaleLowerCase("tr-TR")
          .includes(searchTerm.toLocaleLowerCase("tr-TR"))
      )
    : trips; // arama boşsa tümü

  useEffect(() => {
    const data = getItem() || [];
    setTrips(data);
  }, []);

  function newTravel() {
    navigate("/newtravel");
  }

  function handleDeleteTrip(id) {
    const updatedTrips = trips.filter((trip) => trip.id !== id);
    setTrips(updatedTrips); // UI güncelle
    setItem(updatedTrips); // localStorage güncelle
  }

  function handleSearchChange(e) {
    const value = e.target.value;
    if (value) {
      setSearchParams({ query: value });
    } else {
      setSearchParams({});
    }
  }

  return (
    <div className="h-full w-full pl-12 pr-12">
      <div className="h-[10vh] w-full flex justify-between items-center">
        <div className="flex flex-row p-2 gap-2 items-center">
          <Luggage className="w-[40px] h-[40px]" />
          <span className="text-xl font-bold">Travel</span>
        </div>
      </div>

      <div className="h-0 w-full border-1" />

      <div className="w-full h-[10vh] flex justify-between items-center p-4">
        <span className="text-3xl font-bold">Latest Travels</span>

        <div
          onClick={newTravel}
          className="cursor-pointer p-3 transition-colors duration-150 bg-green-700 hover:bg-green-800 active:bg-green-900  rounded-lg text-white flex flex-row gap-2 items-center"
        >
          <Plus />
          <span>Add New Travel</span>
        </div>
      </div>

      <div className="w-full h-[75vh] p-4 grid grid-rows-[1fr_9fr] border-t-2">
        <div className="flex justify-center items-center">
          <input
            className="outline-none rounded-lg w-[90%] h-12 text-lg focus:border-[2px] focus:border-black border-1 focus:shadow-md text-center"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for Trips..."
          />
        </div>
        <div className=" mt-6 w-[90%] h-[65vh] justify-self-center items-self-center flex flex-col">
          {trips.length === 0 ? (
            <span className="text-gray-500 italic">
              There is no trips to show...
            </span>
          ) : (
            <div className="overflow-y-auto flex flex-col gap-4">
              {filteredTrips.map((trip) => (
                <TripTabs
                  key={trip.id}
                  trip={trip}
                  onDelete={() => handleDeleteTrip(trip.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
