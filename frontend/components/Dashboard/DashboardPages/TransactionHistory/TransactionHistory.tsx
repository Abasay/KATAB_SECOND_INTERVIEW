import dummyTransactions from "./dummyData";

const TransactionHistory = () => {
  return (
    <>
      <div className="pb-25">
        <h2 className="flex flex-row items-center gap-4 p-7 text-3xl font-bold tracking-wider text-black">
          <span>
            <svg
              width="100px"
              height="100px"
              viewBox="0 0 1024 1024"
              className="icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M905.8 602.6c-1.1 11-11.2 16.5-19.8 21.5-8 4.6-16 9.3-23.9 13.9-12.8 7.4-25.5 14.8-38.3 22.2-16 9.3-31.9 18.6-47.9 27.8-17.6 10.2-35.2 20.5-52.9 30.7-17.7 10.3-35.4 20.6-53.2 30.9-16.3 9.5-32.5 18.9-48.8 28.4-13.3 7.7-26.5 15.4-39.8 23.1-8.7 5-17.4 10.1-26.1 15.1-6.6 3.8-12.8 7.6-20.3 9.8-19.5 5.6-41.1 3.7-58.7-6.5-6.3-3.7-12.7-7.3-19-11-11.6-6.7-23.1-13.3-34.7-20-15.2-8.8-30.4-17.6-45.6-26.3-17.3-10-34.7-20-52-30-17.9-10.3-35.8-20.7-53.7-31-16.9-9.8-33.8-19.5-50.8-29.3L177.1 647c-10.3-6-20.7-11.9-31-17.9-4.7-2.7-9.4-5.4-14.1-8.2-7.4-4.3-14.7-11.1-14.7-20.3 0 8.4 0 16.8-0.1 25.3 0 3-0.2 6.1 0 9.2 0.6 8.1 7 14.4 13.7 18.4 4.1 2.5 8.3 4.8 12.5 7.2 10.8 6.2 21.6 12.5 32.4 18.7 15.6 9 31.1 18 46.7 27 18.5 10.7 37.1 21.4 55.6 32.1 19.3 11.2 38.6 22.3 58 33.5 18.4 10.6 36.7 21.2 55.1 31.8 15.3 8.8 30.5 17.6 45.8 26.4 10.3 6 20.7 11.9 31 17.9 6 3.4 11.9 7.3 18.4 9.7 20.3 7.4 44.1 5.8 62.8-5.1 7.1-4.1 14.2-8.3 21.3-12.4 13.1-7.6 26.2-15.2 39.2-22.8 17.1-9.9 34.1-19.8 51.2-29.8 19.1-11.1 38.2-22.2 57.2-33.3l57.3-33.3c17.1-10 34.2-19.9 51.4-29.9 13.3-7.7 26.6-15.4 39.9-23.2 7.3-4.3 14.7-8.5 22-12.8 2.2-1.3 4.5-2.6 6.6-4.1 5.6-4.2 10-10 10.1-17.3 0.1-3.7 0-7.3 0-11 0-7.3 0-14.7 0.1-22 0.4 0.8 0.4 1.3 0.3 1.8 0 0.3 0-0.2 0 0zM905.9 601.1z"
                fill="#7A9EFD"
              />
              <path
                d="M891.6 581.1c19 11 19.1 28.9 0.2 39.9L547.4 821.1c-18.9 11-49.8 11-68.8 0L131.9 621c-19-11-19.1-28.9-0.2-39.9L476.1 381c18.9-11 49.8-11 68.8 0l346.7 200.1z"
                fill="#E4ECF9"
              />
              <path
                d="M571.3 162.6c-5.1-3-11.5 2-15.9 4.6L532 180.7c-11.7 6.8-23.4 13.5-35.1 20.3-13.7 7.9-27.5 15.9-41.2 23.8-13.9 8-27.8 16.1-41.7 24.1l-36.3 21c-8.3 4.8-16.7 9.6-25 14.5-4.8 2.8-10 5.2-13.8 9.3-4.7 5.1-8 12.1-8 19.1v20.8c0 9.9 0.1 19.8 0.1 29.7 0 13 0.1 26 0.1 39 0 15.1 0.1 30.2 0.1 45.2 0 16.1 0.1 32.2 0.1 48.3 0 16.2 0.1 32.4 0.1 48.7 0 15.3 0.1 30.6 0.1 45.9 0 13.3 0.1 26.6 0.1 39.9 0 10.4 0.1 20.9 0.1 31.3 0 6.5 0 13 0.1 19.4 0 5-0.6 11 4.3 14 4.8 2.9 9.7 5.6 14.5 8.4-4.7-2.7-4-9.2-4-14 0-6.3 0-12.6-0.1-18.9 0-10-0.1-20-0.1-29.9 0-12.8-0.1-25.5-0.1-38.3 0-14.7-0.1-29.4-0.1-44.1 0-15.7-0.1-31.3-0.1-47s-0.1-31.3-0.1-47c0-14.9-0.1-29.8-0.1-44.6 0-13.1-0.1-26.2-0.1-39.4 0-10.4-0.1-20.8-0.1-31.2 0-6.9 0-13.7-0.1-20.6 0-3.1-0.2-6.2 0.1-9.3 0.9-8.5 6.2-17.1 13.5-21.4l3.6-2.1c6.6-3.8 13.1-7.6 19.7-11.3 10.7-6.2 21.4-12.3 32-18.5 13-7.5 26.1-15 39.1-22.6 13.6-7.8 27.2-15.7 40.7-23.5 12.5-7.2 24.9-14.4 37.4-21.6 9.6-5.6 19.2-11.1 28.9-16.7 5-2.9 10-5.8 15-8.6 3.2-1.8 7.1-3.5 10.6-1.5-5.1-3-10-5.9-14.9-8.7z"
                fill="#2A2ABC"
              />
              <path
                d="M576.4 172.1c7.5-4.3 13.6-0.8 13.6 7.8l1.1 373.5c0 8.6-6.1 19.1-13.5 23.4L360.1 702.3c-7.5 4.3-13.6 0.8-13.6-7.7l-1.1-373.5c0-8.6 6.1-19.1 13.5-23.4l217.5-125.6z"
                fill="#4040FF"
              />
              <path
                d="M529.9 326.5c3.7-2.2 6.8-0.4 6.8 3.9s-3 9.5-6.7 11.7l-133 76.8c-3.7 2.2-6.8 0.4-6.8-3.9s3-9.5 6.7-11.7l133-76.8z"
                fill="#2828CE"
              />
              <path
                d="M544.5 339.3c1.1-0.4 2.5-0.5 3.6 0.1l-9.3-5.4c-2.3-1.3-3.9-1.7-6.4-0.4-2.3 1.2-4.5 2.6-6.7 3.9-12.3 7.1-24.7 14.3-37 21.4-16.1 9.3-32.1 18.6-48.2 27.8-11.8 6.8-23.7 13.7-35.5 20.5-2 1.1-4 2.2-5.9 3.4-3.9 2.6-7.3 8.4-6.1 13.2 0.5 1.9 1.8 2.6 3.4 3.5l5.7 3.3c1.1 0.7 2.3 1.3 3.4 2-4.5-2.6-0.8-10.4 1.5-13.2 1.1-1.3 2.4-2.3 3.8-3.2 2.2-1.3 4.5-2.6 6.8-3.9 10.1-5.8 20.1-11.6 30.2-17.4l40.5-23.4c12.2-7.1 24.4-14.1 36.6-21.2 4.1-2.3 8.1-4.7 12.2-7 1.3-0.7 2.6-1.5 3.9-2.2 0.4-0.2 1.8-0.7 2-1.2 0-0.1 0.2-0.1 0.3-0.1l-3.6-2.1 2.1 1.2c1.4 0.9 1.2 1 2.7 0.4z"
                fill="#ACC5EA"
              />
              <path
                d="M529.9 276.9c3.7-2.2 6.8-0.4 6.8 3.9s-3 9.5-6.7 11.7l-133 76.8c-3.7 2.2-6.8 0.4-6.8-3.9s3-9.5 6.7-11.7l133-76.8z"
                fill="#2828CE"
              />
              <path
                d="M543.3 339.9c3.7-2.2 6.8-0.4 6.8 3.9s-3 9.5-6.7 11.7l-133 76.8c-3.7 2.2-6.8 0.4-6.8-3.9s3-9.5 6.7-11.7l133-76.8z"
                fill="#FFFFFF"
              />
              <path
                d="M544.5 289.7c1.1-0.4 2.5-0.5 3.6 0.1l-9.3-5.4c-2.3-1.3-3.9-1.7-6.4-0.4-2.3 1.2-4.5 2.6-6.7 3.9-12.3 7.1-24.7 14.3-37 21.4-16.1 9.3-32.1 18.6-48.2 27.8-11.8 6.8-23.7 13.7-35.5 20.5-2 1.1-4 2.2-5.9 3.4-3.9 2.6-7.3 8.4-6.1 13.2 0.5 1.9 1.8 2.6 3.4 3.5l5.7 3.3c1.1 0.7 2.3 1.3 3.4 2-4.5-2.6-0.8-10.4 1.5-13.2 1.1-1.3 2.4-2.3 3.8-3.2 2.2-1.3 4.5-2.6 6.8-3.9 10.1-5.8 20.1-11.6 30.2-17.4l40.5-23.4c12.2-7.1 24.4-14.1 36.6-21.2 4.1-2.3 8.1-4.7 12.2-7 1.3-0.7 2.6-1.5 3.9-2.2 0.4-0.2 1.8-0.7 2-1.2 0-0.1 0.2-0.1 0.3-0.1l-3.6-2.1 2.1 1.2c1.4 0.9 1.2 0.9 2.7 0.4z"
                fill="#ACC5EA"
              />
              <path
                d="M471.1 412.2c3.7-2.2 6.8-0.4 6.8 3.9s-3 9.5-6.8 11.7l-74.2 42.9c-3.7 2.2-6.8 0.4-6.8-3.9s3-9.5 6.7-11.7l74.3-42.9z"
                fill="#2828CE"
              />
              <path
                d="M543.3 290.2c3.7-2.2 6.8-0.4 6.8 3.9s-3 9.5-6.7 11.7l-133 76.8c-3.7 2.2-6.8 0.4-6.8-3.9s3-9.5 6.7-11.7l133-76.8z"
                fill="#FFFFFF"
              />
              <path
                d="M478.5 418.8c-2.9-1.6-7.2 1.8-9.6 3.2l-17.1 9.9c-14.1 8.1-28.2 16.3-42.3 24.4-3.4 1.9-6.7 3.9-10.1 5.8l3.6 2.1c-0.9-0.5-2.3-1.8-3.3-1.9-1.3-0.2-3 2-3.8 3-2.1 2.7-4 7-2.9 10.5 0.8 2.5 3.9 3.6 5.9 4.8 2.2 1.3 4.4 2.5 6.5 3.8-2.8-1.6-2.1-5.8-1.3-8.3 1-2.8 2.8-5.4 5.2-7.2 1-0.7 2.1-1.3 3.1-1.9 5.5-3.2 11.1-6.4 16.6-9.6 15.4-8.9 30.7-17.7 46.1-26.6 2.5-1.4 4.9-2.8 7.4-4.3 2-1.1 4.4-2.9 6.7-1.6-3.5-1.9-7.1-4-10.7-6.1z"
                fill="#ACC5EA"
              />
              <path
                d="M484.4 425.5c3.7-2.2 6.8-0.4 6.8 3.9s-3 9.5-6.8 11.7L410.2 484c-3.7 2.2-6.8 0.4-6.8-3.9s3-9.5 6.7-11.7l74.3-42.9z"
                fill="#FFFFFF"
              />
              <path
                d="M673.7 480.1c-5.3-3-12.2 2.4-16.7 5-8.7 5-17.4 10-26.1 15.1-12.1 7-24.2 14-36.3 20.9-12.1 7-24.2 14-36.3 20.9-8.8 5.1-17.7 10.2-26.5 15.3-6.3 3.7-12.2 6.7-16.4 13.1-3.1 4.8-4.8 10.1-4.8 15.8v10.5c0 13.3 0.1 26.5 0.1 39.8 0 12 0.1 24 0.1 36v6.3c0.1 4 1.6 7 5.1 9 2.7 1.6 5.5 3.2 8.2 4.8 1.8 1.1 3.6 2.1 5.5 3.2-3.8-2.2-3.9-6.8-4-10.8v-10.9c0-12.4-0.1-24.7-0.1-37.1 0-11.6-0.1-23.3-0.1-34.9v-7.9c0-7.2 3.3-14.3 8.2-19.5 3.8-4 9.1-6.5 13.9-9.3 8.4-4.8 16.7-9.7 25.1-14.5 11.2-6.5 22.4-12.9 33.5-19.4 11.4-6.6 22.9-13.2 34.3-19.8 8.9-5.2 17.8-10.3 26.8-15.5 3.8-2.2 7.6-4.5 11.5-6.6 2.9-1.6 6.6-2.7 9.7-1-4.8-2.8-9.7-5.6-14.7-8.5z"
                fill="#C68620"
              />
              <path
                d="M678.9 489.6c7.5-4.3 13.6-0.9 13.6 7.7l0.3 93.3c0 8.6-6 19.1-13.5 23.4l-139.9 80.7c-7.5 4.3-13.6 0.8-13.6-7.7l-0.3-93.3c0-8.6 6-19.1 13.5-23.4l139.9-80.7z"
                fill="#FFCD2E"
              />
              <path
                d="M646.7 576.9l-10.4-6c-0.1-0.1-0.2-0.1-0.3-0.3l10.4 6c0.1 0.2 0.2 0.3 0.3 0.3"
                fill="#674611"
              />
              <path d="M643.3 572.3l-10.4-6 3.1 4.3 10.4 6.1z" fill="#E8CFAC" />
              <path
                d="M645.9 536.9c1.4-0.8 2.3 0.4 1.6 2.2l-9.4 24.3c-0.3 0.9-1 1.6-1.6 2-0.6 0.4-1.2 0.4-1.6-0.1l-3.1-4.4-28.3 35.2c-0.5 0.6-1.1 1.1-1.6 1.5-1.1 0.6-2.2 0.6-2.8-0.2l-8-11.2-28.1 35c-0.5 0.6-1.1 1.1-1.6 1.5-1.1 0.7-2.2 0.6-2.8-0.2-0.9-1.3-0.4-3.9 1.2-5.8l30.9-38.5c0.5-0.6 1.1-1.1 1.6-1.5 1.1-0.7 2.2-0.6 2.8 0.2l8 11.2 25.4-31.7-3.1-4.4c-0.7-1 0.2-3.2 1.5-4l19-11.1z"
                fill="#C68620"
              />
              <path
                d="M604.2 593.4l10.4 6 25.4-31.7-3.1-4.4-10.4-6 3.1 4.3z"
                fill="#E8CFAC"
              />
              <path
                d="M658.6 548.2l-5.3-3.1-5.1-3h-0.1-0.1-0.1-0.1-0.1H647.4h-0.1-0.1-0.1c-0.1 0-0.2 0.1-0.3 0.1l-18.9 11c-0.2 0.1-0.4 0.3-0.6 0.4l-0.2 0.2-0.1 0.1c0 0.1-0.1 0.1-0.1 0.2s-0.1 0.1-0.1 0.2-0.1 0.1-0.1 0.2v0.1c0 0.1-0.1 0.1-0.1 0.2s0 0.1-0.1 0.2c0 0.1 0 0.1-0.1 0.2 0 0.1 0 0.1-0.1 0.2 0 0.1 0 0.1-0.1 0.2 0 0.1 0 0.1-0.1 0.2V556.7c0 0.2 0.1 0.4 0.2 0.5l10.4 6c-0.1-0.1-0.2-0.3-0.2-0.5v-0.2-0.4-0.4c0.1-0.4 0.2-0.8 0.4-1.1 0.1-0.2 0.2-0.4 0.3-0.5 0.1-0.1 0.2-0.3 0.4-0.4 0.2-0.2 0.4-0.3 0.6-0.4l18.9-11c0.1-0.1 0.2-0.1 0.3-0.2h0.1c0.1 0 0.2-0.1 0.3-0.1h0.3c0.3 0.2 0.4 0.2 0.5 0.2zM610.6 608.7l-8-11.2-10.4-6 8 11.2c0.1 0.2 0.3 0.4 0.5 0.5l10.4 6c-0.2-0.1-0.4-0.3-0.5-0.5z"
                fill="#E8CFAC"
              />
              <path
                d="M595.6 581.7c-0.1 0-0.1-0.1-0.2-0.1s-0.1 0-0.2-0.1h-0.5-0.1-0.1c-0.1 0-0.2 0-0.3 0.1 0 0-0.1 0-0.1 0.1h-0.1-0.1c-0.2 0.1-0.3 0.1-0.5 0.2s-0.5 0.3-0.7 0.5l-0.2 0.2-0.2 0.2-0.4 0.4-0.2 0.2-30.9 38.5 10.4 6 30.9-38.5c0.2-0.3 0.5-0.5 0.7-0.8l0.2-0.2c0.2-0.2 0.5-0.4 0.7-0.5l0.6-0.3h0.1c0.2-0.1 0.4-0.1 0.5-0.1h0.5c0.2 0 0.3 0.1 0.5 0.2l-10.3-6zM560.4 622.3c-0.1 0.1-0.1 0.2-0.2 0.3v0.1c0 0.1-0.1 0.1-0.1 0.2-0.1 0.1-0.1 0.2-0.2 0.3 0 0.1-0.1 0.2-0.1 0.3 0 0.1-0.1 0.1-0.1 0.2s-0.1 0.2-0.1 0.3c0 0.1-0.1 0.2-0.1 0.3 0 0.1-0.1 0.2-0.1 0.3 0 0.1-0.1 0.3-0.1 0.4v0.1c0 0.1 0 0.2-0.1 0.3V626.7c0.1 0.3 0.2 0.7 0.4 0.9 0.1 0.2 0.3 0.4 0.5 0.5l10.4 6c-0.2-0.1-0.4-0.3-0.5-0.5-0.2-0.3-0.3-0.6-0.4-0.9v-0.1c-0.1-0.3-0.1-0.7 0-1.1 0-0.1 0-0.3 0.1-0.4v-0.1c0.1-0.3 0.1-0.5 0.2-0.8 0.1-0.3 0.2-0.5 0.3-0.8 0.1-0.3 0.3-0.5 0.4-0.8 0.2-0.3 0.3-0.5 0.5-0.7l-10.4-6-0.1 0.1c0 0.1-0.1 0.2-0.2 0.3z"
                fill="#E8CFAC"
              />
              <path
                d="M657.3 548.4c1.4-0.8 2.3 0.4 1.6 2.2l-9.4 24.3c-0.3 0.9-1 1.6-1.6 2-0.6 0.4-1.2 0.4-1.6-0.1l-3.1-4.4-28.2 35.1c-0.5 0.6-1.1 1.1-1.6 1.5-1.1 0.7-2.2 0.6-2.8-0.2l-8-11.2-28.1 35c-0.5 0.6-1.1 1.1-1.6 1.5-1.1 0.7-2.2 0.6-2.8-0.2-0.9-1.3-0.4-3.9 1.2-5.8l30.9-38.5c0.5-0.6 1.1-1.1 1.6-1.5 1.1-0.7 2.2-0.6 2.8 0.2l8 11.2 25.4-31.7-3.1-4.4c-0.7-1 0.2-3.2 1.5-4l18.9-11z"
                fill="#FFFFFF"
              />
            </svg>
          </span>
          <span className="flex flex-col gap-2 ">
            Transaction History{" "}
            <span className=" text-xs font-medium">
              You can find your transaction history here.
            </span>
          </span>
        </h2>

        <div className="  px-10">
          <h2 className="my-4 text-xl font-semibold tracking-widest text-black">
            Your Transaction history
          </h2>
          {/* <TransactionTable users={[]} offset={2} /> */}

          <div className="conatiner overflow-auto">
            <table className=" table-auto divide-y divide-gray-200 ">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Transaction ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Date/Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Destination
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
                    Journey Duration
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
                    Useable
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {dummyTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      {transaction.id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {transaction.dateTime}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {transaction.destination}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {transaction.milesTraveled}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {transaction.journeyDuration}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {transaction.paymentAmount}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">Yes</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionHistory;
