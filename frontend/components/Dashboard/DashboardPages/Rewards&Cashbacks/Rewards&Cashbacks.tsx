import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { URLS } from "@/lib/urls";
// Define the RewardsAndCashbackHistory component
const RewardsAndCashbackHistory = () => {
  // State variable to store cashbacks data
  const [cashbacks, setCashbacks] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Format the date
    const formattedDate = `${date.getFullYear()}-${padZero(
      date.getMonth() + 1,
    )}-${padZero(date.getDate())}`;
    const formattedTime = `${padZero(date.getHours() % 12 || 12)}:${padZero(
      date.getMinutes(),
    )} ${date.getHours() >= 12 ? "PM" : "AM"}`;

    return `${formattedDate} ${formattedTime}`;
  };

  const padZero = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}${URLS.cashbackHistory}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("c&m-token")}`,
          },
        },
      );
      const data = await response.json();
      console.log(data);
      // Update cashbacks state if data fetch is successful
      if (data.success) setCashbacks(data.data.cashbacksHistory);
    })();
  }, []);

  // JSX markup for displaying cashbacks history
  return (
    <>
      <div className="pb-25">
        <h2 className="flex flex-row items-center gap-4 p-7 text-3xl font-bold tracking-wider text-black">
          <span>
            {/* SVG icon */}
            <svg
              width="100px"
              height="100px"
              viewBox="0 0 48 48"
              id="svg5"
              version="1.1"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs id="defs2" />

              <g id="layer1" transform="translate(-26,-449)">
                <path
                  d="m 69.59375,472.55061 -8.806641,3.91406 h -24.09375 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 H 61 a 1.0001,1.0001 0 0 0 0.40625,-0.0859 l 9,-4 a 1,1 0 0 0 0.507812,-1.32031 1,1 0 0 0 -1.320312,-0.50781 z M 30,476.46467 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 2.677734 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z"
                  id="path964"
                  style={{
                    fill: "#ff5576",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeMiterlimit: "4.1",
                  }}
                />

                <path
                  d="m 69.59375,477.55061 -8.806641,3.91406 H 30 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 31 a 1.0001,1.0001 0 0 0 0.40625,-0.0859 l 9,-4 a 1,1 0 0 0 0.507812,-1.32031 1,1 0 0 0 -1.320312,-0.50781 z"
                  id="path13373"
                  style={{
                    fill: "#808b9b",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeMiterlimit: "4.1",
                  }}
                />

                <path
                  d="m 69.59375,467.55061 -8.806641,3.91406 H 30 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 31 a 1.0001,1.0001 0 0 0 0.40625,-0.0859 l 9,-4 a 1,1 0 0 0 0.507812,-1.32031 1,1 0 0 0 -1.320312,-0.50781 z"
                  id="path13435"
                  style={{
                    fill: "#808b9b",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeMiterlimit: "4.1",
                  }}
                />

                <path
                  d="m 69.59375,462.55061 -8.806641,3.91406 H 30 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 31 a 1.0001,1.0001 0 0 0 0.40625,-0.0859 l 9,-4 a 1,1 0 0 0 0.507812,-1.32031 1,1 0 0 0 -1.320312,-0.50781 z"
                  id="path13437"
                  style={{
                    fill: "#808b9b",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeMiterlimit: "4.1",
                  }}
                />

                <path
                  d="m 30,462.46467 9,-4 h 31 l -9,4 c -10.333333,0 -20.666667,0 -31,0 z"
                  id="path59880"
                  style={{
                    fill: "#f2a50c",
                    fillOpacity: "1",
                    fillRule: "evenodd",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeMiterlimit: "4.1",
                  }}
                />

                <path
                  d="M 55.114945,457.46467 H 58 l -7,6 v 24 H 39 v -24 l 7,-6 h 2.919237"
                  id="path59872"
                  style={{
                    fill: "#e7e7e7",
                    fillOpacity: "1",
                    fillRule: "evenodd",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeMiterlimit: "4.1",
                  }}
                />

                <path
                  d="m 45.999998,457.46467 -6.999998,6 -3e-6,20.7871 a 12.158244,20.424366 42.46283 0 0 9.85156,-5.96874 12.158244,20.424366 42.46283 0 0 2.148441,-2.1543 l 3e-6,-12.66406 6.999998,-6 -2.884761,-1e-5 -6.195311,1e-5 z"
                  id="path61039"
                  style={{
                    fill: "#fafafa",
                    fillOpacity: "1",
                    fillRule: "evenodd",
                    stroke: "none",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeMiterlimit: "4.1",
                    strokeOpacity: "1",
                  }}
                />

                <path
                  d="m 45,468.21467 a 1.0057667,0.99425681 0 0 0 -1.005859,0.9961 v 1.15625 c -1.289538,0.40756 -2.250001,1.57366 -2.250001,2.96679 0,1.73708 1.493182,3.125 3.25586,3.125 0.721175,0 1.242188,0.52141 1.242188,1.13672 -10e-7,0.61534 -0.521023,1.13281 -1.242188,1.13281 -0.721169,0 -1.24414,-0.51747 -1.244141,-1.13281 a 1.0057667,0.99425681 0 0 0 -1.003906,-0.99609 1.0057667,0.99425681 0 0 0 -1.007813,0.99609 c 3e-6,1.39313 0.960461,2.55924 2.250001,2.9668 v 1.15625 A 1.0057667,0.99425681 0 0 0 45,482.71467 a 1.0057667,0.99425681 0 0 0 1.00586,-0.99609 v -1.15625 c 1.289054,-0.40756 2.248043,-1.57367 2.248046,-2.9668 0,-1.73706 -1.49123,-3.125 -3.253906,-3.125 -0.721179,0 -1.244141,-0.52137 -1.244141,-1.13672 0,-0.61532 0.522957,-1.13281 1.244141,-1.13281 0.721179,0 1.242188,0.51749 1.242188,1.13281 a 1.0057667,0.99425681 0 0 0 1.005859,0.9961 1.0057667,0.99425681 0 0 0 1.005859,-0.9961 c 0,-1.39313 -0.958993,-2.55923 -2.248046,-2.96679 v -1.15625 A 1.0057667,0.99425681 0 0 0 45,468.21467 Z"
                  id="path13283"
                  style={{
                    fill: "#808b9b",
                    fillOpacity: "1",
                    fillRule: "evenodd",
                    stroke: "none",
                    strokeWidth: "0.99999",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeMiterlimit: "4.1",
                    strokeOpacity: "1",
                  }}
                />

                <path
                  d="m 69.59375,482.55061 -8.806641,3.91406 h -1.794922 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 H 61 a 1.0001,1.0001 0 0 0 0.40625,-0.0859 l 9,-4 a 1,1 0 0 0 0.507812,-1.32031 1,1 0 0 0 -1.320312,-0.50781 z M 30,486.46467 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 24.775391 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z"
                  id="path13371"
                  style={{
                    fill: "#808b9b",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeMiterlimit: "4.1",
                  }}
                />
              </g>
            </svg>
          </span>
          <span className="flex flex-col gap-2 ">
            Cashbacks and Miles Points
            <span className=" text-xs font-medium">
              Your Cashbacks and Miles Points earned details will be found here.
            </span>
          </span>
        </h2>

        <div className="w-full  px-10">
          <h2 className="my-4 text-xl font-semibold tracking-widest text-black">
            Your Rewards and Cashbacks History.
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {/* Table header */}
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Transaction Date/Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Transport IDs
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Payment Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Miles Traveled
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Reward Earned (Naira #)
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Reward Earned (Mile)
                  </th>
                  {/* <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Total Reward Balance
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Total Cashback Earned
                  </th> */}
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="divide-y divide-gray-200 bg-white">
                {cashbacks.length > 0 &&
                  cashbacks.map(
                    (cashback: {
                      date: string;
                      transportId: string;
                      tfare: string;
                      milesTravelled: string;
                      cashback: number;
                      milesPoints: number;
                    }) => (
                      <tr>
                        <td className="whitespace-nowrap px-6 py-4">
                          {formatDate(cashback.date)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {cashback.transportId}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {cashback.tfare}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {cashback.milesTravelled}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {cashback.cashback.toFixed(2)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {Number(cashback.milesPoints.toFixed(2))}
                        </td>

                        {/* <td className="whitespace-nowrap px-6 py-4">
                          <button className="text-indigo-600 hover:text-indigo-900">
                            Redeem
                          </button>
                        </td> */}
                      </tr>
                    ),
                  )}
              </tbody>
            </table>
            {cashbacks.length === 0 && (
              <div className="w-full text-center">No cashbacks found</div>
            )}
          </div>
          {/* <TransactionTable users={[]} offset={2} /> */}
        </div>
      </div>
    </>
  );
};

export default RewardsAndCashbackHistory;
