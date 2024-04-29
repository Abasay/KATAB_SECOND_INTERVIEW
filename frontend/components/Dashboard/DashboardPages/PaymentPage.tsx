import { SettingsIcon } from "@/public/images/icons/icons";
import { DistanceData } from "../Datas/distanceData";
import PayStack from "../PayStack/PayStack";
import { useEffect, useState } from "react";
import { get } from "http";
import { States } from "../Datas/statesDatas";

const AMOUNT_PER_MILE = 1;
const DURATION_PER_MILE = 1;
const PaymentPage = () => {
  //Payment Page Component
  const [data, setData] = useState({
    distanceSelected: "",
    fee: 0,
    placeToplace: "",
    journeyDuration: "",
    miles: 0,
  });

  const [stateData, setStateData] = useState({
    name: "",
    latitude: 0,
    longitude: 0,
    logoUrl: "",
  });
  //Select when destination is found from DistanceData
  const [selected, setSelected] = useState("");

  //Select when destination is found from States
  const [selectedState, setSelectedState] = useState("");
  const [selectDestination, setSelectDestination] = useState(false);
  const [calculatedFee, setCalculatedFee] = useState(0);
  const [estimatedDuration, setEstimatedDuration] = useState(0);
  const [estimatedMiles, setEstimatedMiles] = useState(0);
  const [amount, setAmount] = useState(0);

  //GET USER LOCATION
  const getUserLocationAndCalculateDist = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const distance = calculateDistance(
          latitude,
          longitude,
          stateData.latitude,
          stateData.longitude,
        );
        setEstimatedMiles(Number(distance.toFixed(2))); // Convert distance to a number before setting it in the state
        setCalculatedFee(Math.floor(distance * AMOUNT_PER_MILE));
        setEstimatedDuration(Number((distance * DURATION_PER_MILE).toFixed(2)));
        console.log(calculatedFee);

        return distance || 0;
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
      return 0;
    }
  };

  //Function To calculate the distance between two points in miles
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = lat1 * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = lat2 * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (lon2 - lon1) * (Math.PI / 180); // Radian difference (longitudes)

    var d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2),
        ),
      );
    return d;
  };

  //Find Selected Journey from DistanceData
  useEffect(() => {
    const dataSearch = DistanceData.find(
      (distance) => distance.placeToplace === selected,
    );
    if (!dataSearch) return;
    setData({
      distanceSelected: dataSearch.placeToplace,
      fee: dataSearch.fee as number, // Change the type of fee to number
      placeToplace: dataSearch.placeToplace,
      journeyDuration: dataSearch.journeyDuration,
      miles: dataSearch.miles as number,
    });
    setCalculatedFee(dataSearch.fee as number);
  }, [selected]);

  //When Fees Changes, Re-render
  useEffect(() => {
    setAmount(calculatedFee);
  }, [calculatedFee]);
  //Find Selected Journey from States
  useEffect(() => {
    const stateSearch = States.find((state) => state.name === selectedState);
    if (stateSearch) {
      setStateData({
        name: stateSearch.name,
        latitude: stateSearch.latitude,
        longitude: stateSearch.longitude,
        logoUrl: stateSearch.logoUrl,
      });
      getUserLocationAndCalculateDist();
    }
  }, [selectedState]);
  useEffect(() => {
    getUserLocationAndCalculateDist();
  }, [navigator.geolocation]);

  return (
    <>
      <div className="pb-25">
        <h2 className="flex flex-row items-center gap-4 p-7 text-3xl font-bold tracking-wider text-black">
          <span>
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              width="100px"
              height="100px"
            >
              <path
                style={{ fill: "#FED159" }}
                d="M336.619,298.794v96.86c0,14.283-11.571,25.866-25.866,25.866H25.866
            	C11.583,421.52,0,409.937,0,395.654V237.069c0-14.283,11.583-25.866,25.866-25.866h59.995L336.619,298.794z"
              />
              <rect
                x="0.004"
                y="342.044"
                style={{ fill: "#65B4BB" }}
                width="336.619"
                height="33.896"
              />
              <path
                style={{ fill: "#F6C454" }}
                d="M336.619,298.794v19.449H111.353c0,0.012,0,0.012,0,0.012H66.412V211.203h19.449L336.619,298.794z"
              />
              <rect
                x="85.873"
                y="90.48"
                style={{ fill: "#82DCC7" }}
                width="426.127"
                height="208.306"
              />
              <g>
                <path
                  style={{ fill: "#74CBB4" }}
                  d="M130.808,298.796h-44.94v-44.94C110.686,253.856,130.808,273.968,130.808,298.796z"
                />
                <path
                  style={{ fill: "#74CBB4" }}
                  d="M85.868,90.488h44.94c0,24.817-20.122,44.94-44.94,44.94V90.488z"
                />
                <path
                  style={{ fill: "#74CBB4" }}
                  d="M512,90.488v44.94c-24.828,0-44.94-20.122-44.94-44.94C467.06,90.488,512,90.488,512,90.488z"
                />
                <path
                  style={{ fill: "#74CBB4" }}
                  d="M512,253.856v44.94h-44.94C467.061,273.968,487.173,253.856,512,253.856z"
                />
                <ellipse
                  style={{ fill: "#74CBB4" }}
                  cx="298.936"
                  cy="194.633"
                  rx="56.571"
                  ry="71.38"
                />
                <rect
                  x="383.524"
                  y="175.605"
                  style={{ fill: "#74CBB4" }}
                  width="102.564"
                  height="15.861"
                />
                <rect
                  x="107.543"
                  y="175.605"
                  style={{ fill: "#74CBB4" }}
                  width="102.564"
                  height="15.861"
                />
                <rect
                  x="422.656"
                  y="205.48"
                  style={{ fill: "#74CBB4" }}
                  width="63.443"
                  height="15.861"
                />
                <rect
                  x="107.543"
                  y="205.48"
                  style={{ fill: "#74CBB4" }}
                  width="63.443"
                  height="15.861"
                />
              </g>
              <polygon
                style={{ fill: "#82DCC7" }}
                points="291.004,171.785 306.866,171.785 332.248,171.785 332.248,155.924 306.866,155.924 
            	306.866,138.335 291.004,138.335 291.004,155.924 265.622,155.924 265.622,202.568 316.387,202.568 316.387,217.49 306.866,217.49 
            	291.004,217.49 265.622,217.49 265.622,233.352 291.004,233.352 291.004,250.942 306.866,250.942 306.866,233.352 332.248,233.352 
            	332.248,186.707 281.483,186.707 281.483,171.785 "
              />
            </svg>
          </span>
          <span className="flex flex-col gap-2 ">
            Pay For your Trasport Fee{" "}
            <span className=" text-xs font-medium">
              You can pay your transpor fare here.
            </span>
          </span>
        </h2>
        <div className="flex flex-col gap-3 pl-20">
          {/* Instructions Start*/}
          <h4 className="my-5 font-bold italic underline">Instructions</h4>
          <div className="flex flex-row items-center gap-4 text-black">
            <div className="flex h-10.5 w-10.5 items-center justify-center rounded-[50%] border border-stroke bg-slate-400">
              <p className="text-metatitle3 font-medium text-black dark:text-white">
                01
              </p>
            </div>
            <p className=" text-[14px]">
              Search and Select from where and To where You are going.
            </p>
          </div>

          <div className="flex flex-row items-center gap-4 text-black">
            <div className="flex h-10.5 w-10.5 items-center justify-center rounded-[50%] border border-stroke bg-slate-400">
              <p className="text-metatitle3 font-medium text-black dark:text-white">
                02
              </p>
            </div>
            <p className=" text-[14px]">
              Click on Pay Now To pay for your transport fare.
            </p>
          </div>
          <div className="flex flex-row items-center gap-4 text-black">
            <div className="flex h-10.5 w-10.5 items-center justify-center rounded-[50%] border border-stroke bg-slate-400">
              <p className="text-metatitle3 font-medium text-black dark:text-white">
                03
              </p>
            </div>
            <p className=" max-w-[300px] text-[14px] md:max-w-[500px]">
              After Payment, an ID will be given to you, take this ID to our BUS
              terminal and you shall be able to board a bus successfully.
            </p>
          </div>
          <div className="flex flex-row items-center gap-4 text-black">
            <div className="flex h-10.5 w-10.5 items-center justify-center rounded-[50%] border border-stroke bg-slate-400">
              <p className="text-metatitle3 font-medium text-black dark:text-white">
                04
              </p>
            </div>
            <p className=" max-w-[300px] text-[14px] md:max-w-[500px]">
              What's next? Nothing, Have a safe and thrilling journey with our
              C&M Tranaport Services.
            </p>
          </div>
          {/* Instructions Ends*/}
        </div>
        <div className="mt-10 flex flex-col gap-7 pl-25">
          <h4 className=" text-xl font-semibold tracking-wider text-black">
            Get Started
          </h4>
          <div className="flex flex-row gap-4">
            <span className=" font-medium text-black">
              Please select from these list:
            </span>
            <select
              name="session"
              id="session"
              value={selected}
              required
              onChange={(e) => {
                setSelectDestination(false);
                setSelectedState("");
                setSelected(e.target.value);
              }}
              className=" w-full flex-row gap-4 border-b border-stroke bg-transparent pb-3.5 text-black focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
              placeholder="From and Where are you going?"
            >
              <option
                value=""
                placeholder="From and Where are you going?"
              ></option>
              {DistanceData.map((distance) => {
                return <option>{distance.placeToplace}</option>;
              })}
            </select>
          </div>
          <div className="mt-10">
            <p className="flex flex-row items-center gap-2 text-black">
              Your Destination couldn't be found{" "}
              <span>
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="#1C274C"
                  className=" fill-[#456be7] text-[#1C274C] dark:fill-[#1C274C] dark:text-[#1C274C]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 7.75C11.3787 7.75 10.875 8.25368 10.875 8.875C10.875 9.28921 10.5392 9.625 10.125 9.625C9.71079 9.625 9.375 9.28921 9.375 8.875C9.375 7.42525 10.5503 6.25 12 6.25C13.4497 6.25 14.625 7.42525 14.625 8.875C14.625 9.58584 14.3415 10.232 13.883 10.704C13.7907 10.7989 13.7027 10.8869 13.6187 10.9708C13.4029 11.1864 13.2138 11.3753 13.0479 11.5885C12.8289 11.8699 12.75 12.0768 12.75 12.25V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V12.25C11.25 11.5948 11.555 11.0644 11.8642 10.6672C12.0929 10.3733 12.3804 10.0863 12.6138 9.85346C12.6842 9.78321 12.7496 9.71789 12.807 9.65877C13.0046 9.45543 13.125 9.18004 13.125 8.875C13.125 8.25368 12.6213 7.75 12 7.75ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
                    fill="#1C274C"
                  />
                </svg>
              </span>{" "}
              click{" "}
              <button
                className="text-[#456be7] transition duration-700 hover:underline"
                onClick={() => {
                  setSelected("");
                  setSelectDestination(true);
                }}
              >
                here
              </button>{" "}
              to select your destination state.
            </p>
          </div>
          {selectDestination && (
            <div className="flex flex-row gap-4">
              <span className=" font-medium text-black">
                Please select your destination state from these list:
              </span>
              <select
                name="state"
                id="state"
                value={selected}
                required
                onChange={(e) => setSelectedState(e.target.value)}
                className=" w-full flex-row gap-4 border-b border-stroke bg-transparent pb-3.5 text-black focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                placeholder="Destination State?"
              >
                <option value="" placeholder="Destination State?"></option>
                {States.map((state) => {
                  return <option>{state.name}</option>;
                })}
              </select>
            </div>
          )}

          {selected && (
            <div className="mt-12">
              <p className="text-[15px] font-medium tracking-wider text-black underline">
                Selected Distance
              </p>
              <div className="flex flex-col gap-3 text-black ">
                <p>
                  <span className="font-semibold ">Chosen Locations: </span>{" "}
                  <span>{data.placeToplace}</span>
                </p>
                <p>
                  <span className="font-semibold ">Transport Fee: </span>{" "}
                  <span>#{data.fee}</span>
                </p>
                <p>
                  <span className="font-semibold ">
                    Estimated Journey Duration:{" "}
                  </span>{" "}
                  <span>{data.journeyDuration}</span>
                </p>
                <p>
                  <span className="font-semibold ">Distance in miles: </span>{" "}
                  <span>{data.miles}</span> miles
                </p>
              </div>
            </div>
          )}

          {selectedState && estimatedDuration !== 0 && (
            <div className="mt-12">
              <p className="text-[15px] font-medium tracking-wider text-black underline">
                Selected Destination State:
              </p>
              <div className="flex flex-col gap-3 pl-5 text-black ">
                <p>
                  <span className="font-semibold ">Chosen Locations: </span>{" "}
                  <span>{stateData.name}</span>
                </p>
                <p>
                  <span className="font-semibold ">
                    Estimated Transport Fee{" "}
                    <span className="text-xs italic">
                      (Kindly know further charges may apply to get you to your
                      exact destination)
                    </span>
                    :{" "}
                  </span>{" "}
                  <span>#{calculatedFee}</span>
                </p>
                <p>
                  <span className="font-semibold ">
                    Estimated Journey Duration:{" "}
                  </span>{" "}
                  <span>{estimatedDuration}</span> hours
                </p>
                <p>
                  <span className="font-semibold ">Distance in miles: </span>{" "}
                  <span>{estimatedMiles}</span> miles
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="float-right mr-5">
          {selectedState && <PayStack amount={amount * 100} />}
          {selected && <PayStack amount={amount * 100} />}
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
