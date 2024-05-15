import React from "react";

const TotalCashbackAndMilesPoints = ({ totals }) => {
  return (
    <>
      <div className=" flex flex-row gap-5  max-[400px]:flex-col ">
        <div className=" flex h-24 w-44 flex-col justify-evenly rounded-lg border border-gray-400 bg-slate-100 p-2 text-blackho">
          <p className="text-[14px]  tracking-widest">Total Cashbacks</p>
          <p className="font-bold tracking-widest">
            {totals.cashback.toFixed(2)} naira
          </p>
        </div>
        <div className=" flex h-24 w-44 flex-col justify-evenly rounded-lg border border-gray-400 bg-slate-100 p-2 text-blackho">
          <p className="text-[14px]  tracking-widest">Total miles Points</p>
          <p className="font-bold tracking-widest">
            {totals.milespoint.toFixed(2)} miles
          </p>
        </div>
      </div>
    </>
  );
};

export default TotalCashbackAndMilesPoints;
