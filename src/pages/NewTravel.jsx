import { Luggage, Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { nanoid } from "nanoid";
import { useStorage } from "../hooks/useStorage.js";
import { useNavigate } from "react-router-dom";

export default function NewTravel() {
  const [rating, setRating] = useState(2.5);
  const [isSubmitted, setIsSubmitted] = useState(false); // submit durumunu tutuyoruz

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { setItem, getItem } = useStorage("travels"); //tablo key i ; sanki o tablonun adı gibi düşün

  const onSubmit = (data) => {
    const dataWithId = { ...data, id: nanoid() };

    const existingTrips = getItem() || [];

    const updatedTrips = [...existingTrips, dataWithId];

    setItem(updatedTrips);
    setIsSubmitted(true);

    console.log("New trip has been saved:", dataWithId);
  };

  function toMainPage() {
    navigate("/");
  }

  return (
    <div className="h-full w-full pl-12 pr-12 flex flex-col">
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

      <div className="w-full h-[10vh] p-4 flex items-center">
        <span className="text-3xl font-bold">Add Trip</span>
      </div>

      <div className="h-0 w-full border-1" />

      <div className="flex flex-row w-full h-[75vh] justify-center align-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-[90%] p-4"
        >
          {/* Destination */}
          <div className="flex flex-col">
            <label className="font-semibold">Destination</label>
            <input
              {...register("destination", { required: true })}
              className="p-2 border rounded-md outline-none focus:border-2 focus:border-green-700"
              placeholder="Where are you going?"
              autoComplete="off"
            />
            {errors.destination && (
              <span className="text-green-700 text-sm">
                This field is required
              </span>
            )}
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <label className="font-semibold">Date</label>
            <input
              type="date"
              {...register("date", { required: true })}
              className="p-2 border rounded-md outline-none focus:border-2 focus:border-green-700"
              autoComplete="off"
              min="1900-01-01"
              max="2100-12-31"
            />
            {errors.date && (
              <span className="text-green-700 text-sm">Date is required</span>
            )}
          </div>

          {/* Rating */}
          <div className="flex flex-col">
            <label className="font-semibold">Rating</label>
            <div className="flex items-center justify-evenly gap-4">
              <input
                type="range"
                step="0.5"
                min="0"
                max="5"
                {...register("rating", { required: true })}
                className="w-[90%] accent-green-700"
                onChange={(e) => setRating(parseFloat(e.target.value))}
              />
              <div className="text-lg font-bold flex flex-row gap-2">
                <Star /> {rating}
              </div>
            </div>
            {errors.rating && (
              <span className="text-green-700 text-sm">Rating is required</span>
            )}
          </div>

          {/* Notes */}
          <div className="flex flex-col">
            <label className="font-semibold">Notes</label>
            <textarea
              {...register("notes")}
              className="p-2 border rounded-md h-[30vh] outline-none focus:border-2 focus:border-green-700"
              placeholder="Optional notes..."
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">UserName</label>
            <input
              {...register("userName", { required: true })}
              className="p-2 border rounded-md outline-none focus:border-2 focus:border-green-700"
              placeholder="UserName"
              autoComplete="off"
            />
            {errors.userName && (
              <span className="text-green-700 text-sm">
                UserName is required
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitted} // butonu disable et
            className={`text-white py-2 px-4 rounded-md transition-colors flex justify-center items-center gap-2
          ${
            isSubmitted
              ? "bg-black cursor-default"
              : "bg-green-700 hover:bg-green-800 active:bg-green-900 cursor-pointer"
          }`}
          >
            {isSubmitted ? (
              <>
                <span className="text-green-400 text-xl font-bold">✔</span>
                Submitted
              </>
            ) : (
              "Save Trip"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
