"use client";

import { motion } from "framer-motion";

const Features = () => {
  return (
    <>
      {/* <!-- ===== About Start ===== --> */}
      <section className=" mt-10 overflow-hidden pb-20 lg:pb-25 xl:pb-30">
        <div>
          <h1 className="my-4 text-center text-2xl font-semibold tracking-wider text-black ">
            FEATURES
          </h1>
        </div>
        <div className="mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
          <div className="mx-auto mt-10 flex w-full flex-row items-center justify-evenly max-md:flex-col">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left relative mx-auto  w-full  max-md:block max-md:w-[80%]"
            >
              <span>
                <svg
                  fill="#000000"
                  width="500px"
                  height="500px"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon mx-auto text-center max-md:h-[300px] max-md:w-[300px]"
                >
                  <g id="a" />

                  <g id="b">
                    <path d="M26.5,51c1.3789,0,2.5-1.1211,2.5-2.5s-1.1211-2.5-2.5-2.5-2.5,1.1211-2.5,2.5,1.1211,2.5,2.5,2.5Zm0-4c.8271,0,1.5,.6729,1.5,1.5s-.6729,1.5-1.5,1.5-1.5-.6729-1.5-1.5,.6729-1.5,1.5-1.5Zm1.0254-18.9443c-.6943-.46-1.0898-.7627-1.1455-.8086-.0186-.127,.0234-.2441,.0703-.2969,.0156-.0186,.0303-.0352,.1006-.04,.1572-.002,.2617,.1045,.2676,.1113,.4609,.6377,1.3604,.8164,2.0488,.4062,.6826-.4043,.8916-1.25,.4854-1.9678-.3096-.5462-1.1729-1.2924-2.4286-1.4048-.0156-.0726-.0285-.1354-.0327-.1725-.0724-.444-.7509-.436-.8206,0l-.0422,.2158c-.7497,.1201-1.421,.4658-1.9034,1.0188-.6045,.6904-.874,1.6113-.7402,2.5264,.1904,1.292,1.4189,2.1074,2.4072,2.7637,.3105,.2061,.9561,.6348,1.0645,.8047,.0928,.1523,.1816,.3721,.0762,.5537-.085,.1455-.2637,.2373-.4971,.2539-.1924,.0078-.5342-.291-.6699-.498-.4258-.6729-1.3262-.8975-2.0449-.5068-.6699,.3633-.9062,1.1299-.5869,1.9072,.3528,.8613,1.5208,1.7751,2.8857,1.934l.0511,.2616c.0697,.436,.7482,.4439,.8206,0,.0062-.0555,.0311-.1678,.0576-.29,1.1255-.1612,2.1003-.7606,2.6313-1.6771,.6045-1.043,.5654-2.2734-.1074-3.376-.4355-.7168-1.2041-1.2256-1.9473-1.7188Zm1.1895,4.5928c-.4102,.71-1.2041,1.1709-2.1182,1.2344l-.1699,.0059c-1.125,0-2.1377-.7842-2.3672-1.3467-.0586-.1406-.1611-.4863,.1367-.6475,.085-.0459,.1787-.0684,.2715-.0684,.1826,0,.3613,.085,.458,.2373,.0059,.0098,.6982,1.0029,1.584,.9531,.5635-.0391,1.0322-.3115,1.2871-.748,.2715-.4688,.2393-1.0439-.0869-1.5781-.2012-.3291-.6924-.6699-1.3662-1.1172-.8643-.5742-1.8447-1.2246-1.9688-2.0742-.0928-.626,.0908-1.2539,.5029-1.7236,.3721-.4268,.9131-.6855,1.5215-.7285,1.1299-.0791,1.8955,.5742,2.083,.9053,.1055,.1875,.1367,.46-.126,.6152-.2393,.1416-.5723,.084-.7383-.1465-.1016-.1289-.4688-.5527-1.1348-.5088-.3203,.0234-.585,.1504-.7861,.3789-.251,.2881-.3662,.6992-.3076,1.1006,.0557,.3809,.4258,.7314,1.583,1.498,.6523,.4316,1.3262,.8789,1.6465,1.4053,.4766,.7803,.5107,1.6377,.0957,2.3535Zm26.0879-12.5459c-.123-.0938-.2822-.124-.4355-.085-.0156,.0059-1.6318,.4346-3.3975-.3428-.5264-.2314-1.127-.5078-1.7568-.7969-1.9437-.8945-3.9327-1.8059-5.2129-2.1177v-2.2603c0-2.4814-2.0186-4.5-4.5-4.5H13.5c-2.4814,0-4.5,2.0186-4.5,4.5V49.5c0,2.4814,2.0186,4.5,4.5,4.5h26c2.4814,0,4.5-2.0186,4.5-4.5v-15.8103c.3678,.1519,.7612,.3335,1.1855,.533,1.6982,.7969,3.8115,1.7891,6.4727,1.7891,2.1777,0,3.1797-1.1377,3.2207-1.1855,.0781-.0908,.1211-.207,.1211-.3262v-14c0-.1562-.0732-.3027-.1973-.3975Zm-.8027,14.1836c-.2754,.2324-1.0186,.7256-2.3418,.7256-2.4375,0-4.4395-.9395-6.0479-1.6943-1.0498-.4932-1.957-.9189-2.7715-.9893-.5498-.0479-1.1416-.0752-1.7471-.1025-2.2402-.1035-4.7783-.2217-5.752-1.4678-.3682-.4717-.4424-1.1826-.1895-1.8135,.3125-.7754,1.0566-1.3018,2.043-1.4434,.7441-.1074,1.6709-.1426,2.6533-.1807,2.3857-.0908,5.0898-.1943,6.9961-1.3281,.2373-.1406,.3154-.4482,.1738-.6855-.1426-.2373-.4492-.3145-.6855-.1738-1.6865,1.0039-4.2559,1.1016-6.5225,1.1885-.4174,.0157-.8212,.0326-1.2123,.0535-1.4095-5.455-6.4222-9.3748-12.0963-9.3748-6.8926,0-12.5,5.6074-12.5,12.5s5.6074,12.5,12.5,12.5c5.582,0,10.4257-3.6604,11.9813-8.9614,.8444,.1016,1.7225,.1468,2.5646,.186,.5918,.0273,1.1699,.0537,1.707,.0996,.0767,.0066,.1649,.0322,.2471,.048v16.1277c0,1.9297-1.5703,3.5-3.5,3.5H13.5c-1.9297,0-3.5-1.5703-3.5-3.5V14.5c0-1.9297,1.5703-3.5,3.5-3.5h26c1.9297,0,3.5,1.5703,3.5,3.5v2.1494c-1.6783,.1625-5.3053,2.1736-5.7402,2.4122-.2422,.1328-.3311,.4365-.1982,.6787,.1338,.2432,.4385,.3301,.6787,.1982,1.6641-.9111,4.6211-2.3096,5.5303-2.2979,.9609,.0459,3.4912,1.21,5.5244,2.1455,.6348,.292,1.2412,.5713,1.7725,.8047,1.3877,.6094,2.6914,.5908,3.4326,.5039v13.1914Zm-19.4482-2.9131c.6519,.8354,1.7186,1.2675,2.9341,1.5099-1.4708,4.8082-5.8954,8.1171-10.9859,8.1171-6.3408,0-11.5-5.1592-11.5-11.5s5.1592-11.5,11.5-11.5c5.1597,0,9.7238,3.5217,11.0817,8.4492-.1823,.0181-.3618,.0373-.5309,.0616-1.3486,.1943-2.3789,.9453-2.8281,2.0605-.3896,.9697-.2637,2.043,.3291,2.8018Z" />
                  </g>
                </svg>
              </span>
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right w-[60%]"
            >
              <div>
                <h3 className="text-xl font-semibold tracking-wide text-black">
                  Transport Fare E-Payment
                </h3>
                <p className="my-3">
                  With seamless integration into your daily commute, our
                  platform offers secure and hassle-free transactions, allowing
                  users to easily manage their fare payments on the go. Say
                  goodbye to cash transactions and long queues – experience the
                  future of transportation payment with C&M Transportation
                  Services.
                </p>
              </div>
            </motion.div>
          </div>
          <div className="mx-auto flex flex-row items-center justify-between max-md:flex-col">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left relative mx-auto  w-full  max-md:block max-md:w-[80%]"
            >
              <span>
                <svg
                  fill="#000000"
                  width="500px"
                  height="500px"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon mx-auto text-center max-md:h-[300px] max-md:w-[300px]"
                >
                  <g id="a" />

                  <g id="b">
                    <path d="M57.9443,30.4697c-.3867-5.3633-4.7046-7.7041-5.9443-8.2686v-5.7012c0-1.9297-1.5703-3.5-3.5-3.5H9.5c-1.9297,0-3.5,1.5703-3.5,3.5v20c0,1.9297,1.5703,3.5,3.5,3.5H29.1206c-.6851,.6738-1.3618,1.4014-2.0063,2.1816-.1523,.1846-.1523,.4521,0,.6367,4.2549,5.1533,9.9238,8.0098,10.1631,8.1289,.0703,.0352,.1465,.0527,.2227,.0527,.0913,0,.1831-.0254,.2632-.0752,.1475-.0908,.2368-.252,.2368-.4248v-2.4863c2.0288,.0391,9.3398-.0518,13.4019-2.8291,2.7061-1.8506,7.1548-6.2227,6.5425-14.7148ZM9.5,39c-1.3784,0-2.5-1.1211-2.5-2.5V16.5c0-1.3789,1.1216-2.5,2.5-2.5H48.5c1.3784,0,2.5,1.1211,2.5,2.5l.0024,5.9814c-.0034,.0342-.0034,.0684,0,.1025l.0024,5.168c-.0068,.0488-.7432,4.9004-7.0288,7.877-2.2139,1.0498-4.8853,1.293-5.9761,1.3496v-2.4785c0-.1729-.0894-.334-.2368-.4248-.147-.0908-.3311-.1006-.4858-.0225-.1846,.0918-3.5913,1.8076-7.0913,4.9473H9.5Zm41.3374,5.3584c-4.3706,2.9893-13.2266,2.6484-13.3159,2.6416-.1328,.002-.2686,.0449-.3672,.1387-.0986,.0947-.1543,.2246-.1543,.3613v2.1602c-1.6191-.916-5.6436-3.4092-8.8472-7.1602,3.2036-3.751,7.228-6.2441,8.8472-7.1602v2.1553c0,.2764,.2236,.5,.5,.5,.1558,0,3.854-.0166,6.9043-1.4619,6.769-3.2061,7.5605-8.4238,7.5957-8.7129v-4.5107c1.4209,.7344,4.6323,2.8652,4.9473,7.2324,.5762,7.9932-3.5806,12.0879-6.1099,13.8164Zm-18.7568-14.167c.6045-1.043,.5654-2.2734-.1074-3.377-.4351-.7148-1.2041-1.2246-1.9517-1.7197-.6934-.4609-1.0869-.7627-1.1421-.8066-.0186-.127,.0244-.2441,.0713-.2979,.0156-.0186,.0298-.0342,.0996-.0391,.1699,.002,.2686,.1113,.2681,.1104,.4604,.6377,1.3604,.8164,2.0493,.4062,.6816-.4053,.8901-1.251,.4844-1.9678-.3079-.544-1.1695-1.2845-2.4112-1.4023-.0159-.0738-.0289-.137-.0331-.1746-.0724-.4439-.751-.436-.8206,0l-.0416,.2125c-.7568,.1178-1.4344,.4649-1.9215,1.0215-.604,.6914-.873,1.6123-.7383,2.5264,.189,1.293,1.4185,2.1084,2.4092,2.7666,.3096,.2051,.9541,.6328,1.0615,.8018,.0928,.1523,.1812,.373,.0752,.5547-.0835,.1445-.2622,.2363-.4971,.2529-.1948,.0039-.5332-.29-.6689-.498-.4253-.6729-1.3223-.8945-2.0439-.5068-.6704,.3613-.9067,1.1279-.5879,1.9082,.3538,.8638,1.5298,1.7808,2.9023,1.9343l.051,.2608c.0696,.436,.7482,.444,.8206,0,.0063-.056,.0316-.1699,.0583-.2936,1.1176-.165,2.0853-.7613,2.6145-1.673Zm-5.521-.6074c-.0581-.1416-.1606-.4883,.1367-.6484,.085-.0459,.1797-.0684,.2729-.0684,.1816,0,.3594,.084,.4556,.2354,.0068,.0098,.6748,1.0156,1.5854,.9541,.5649-.0391,1.0342-.3115,1.2861-.748,.2715-.4668,.2397-1.041-.0859-1.5762-.2007-.3291-.6909-.6699-1.3657-1.1182-.8647-.5732-1.8452-1.2236-1.9697-2.0762-.0918-.624,.0908-1.2529,.5015-1.7227,.373-.4258,.9141-.6846,1.5229-.7285,1.1387-.0889,1.8945,.5742,2.0825,.9053,.1055,.1875,.1367,.4609-.125,.6162-.2393,.1426-.5732,.0811-.7383-.1455-.1011-.1299-.4878-.5596-1.1348-.5098-.3218,.0234-.5864,.1504-.7866,.3799-.251,.2881-.3657,.6992-.3071,1.1006,.0625,.4219,.5371,.8018,1.5825,1.4971,.6523,.4326,1.3271,.8799,1.6465,1.4043,.4761,.7803,.5112,1.6387,.0962,2.3545-.4111,.709-1.2051,1.1699-2.1265,1.2334-1.2119,.082-2.2891-.751-2.5293-1.3389Zm-8.5601-5.043c-1.103,0-2,.8975-2,2s.897,2,2,2,2-.8975,2-2-.897-2-2-2Zm0,3c-.5513,0-1-.4482-1-1s.4487-1,1-1,1,.4482,1,1-.4487,1-1,1Zm22.001,1c1.103,0,2-.8975,2-2s-.897-2-2-2-2,.8975-2,2,.897,2,2,2Zm0-3c.5513,0,1,.4482,1,1s-.4487,1-1,1-1-.4482-1-1,.4487-1,1-1Z" />
                  </g>
                </svg>
              </span>
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right w-[60%]"
            >
              <div>
                <h3 className="text-xl font-semibold tracking-wide text-black">
                  CashBack Reward
                </h3>
                <p className="my-3">
                  Get rewarded with 0.5% of your transactions every time you use
                  our platform. Earn cashback on every transport, turning your
                  everyday spending into savings. It's our way of saying thank
                  you for choosing us.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="mx-auto mt-10 flex w-full flex-row items-center justify-evenly max-md:flex-col">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right w-[40%]"
            >
              <div>
                <h3 className="my-4 text-xl font-semibold tracking-wide text-black">
                  Miles Points
                </h3>
                <p className="max-md:hidden ">
                  Earn points with every transaction and redeem them for
                  exciting rewards. With 0.5% of your journey in miles, you are
                  unlocking a world of possibilities to free travel.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left relative mx-auto w-full  max-md:block  max-md:w-[80%] md:ml-40"
            >
              <span>
                <img
                  src="/images/hero/miles.jpg"
                  alt="Miles Travelled"
                  className="w-[500px] rounded-md "
                />
              </span>

              <p className="mx-auto mt-5 w-[70%] text-center max-md:visible md:hidden">
                Earn points with every transaction and redeem them for exciting
                rewards. With 0.5% of your journey in miles, you are unlocking a
                world of possibilities to free travel.
              </p>
            </motion.div>
          </div>

          <div className="mx-auto mt-10 flex w-full flex-row items-center justify-evenly max-md:flex-col">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left relative mx-auto  w-full  max-md:block max-md:w-[80%]"
            >
              <span>
                <svg
                  width="500px"
                  height="500px"
                  viewBox="0 0 1024 1024"
                  className="icon mx-auto text-center max-md:h-[300px] max-md:w-[300px]"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M897.9 369.2H205c-33.8 0-61.4-27.6-61.4-61.4s27.6-61.4 61.4-61.4h692.9c33.8 0 61.4 27.6 61.4 61.4s-27.6 61.4-61.4 61.4z"
                    fill="#FFB89A"
                  />
                  <path
                    d="M807 171H703.3c-16.6 0-30 13.4-30 30s13.4 30 30 30H807c31.6 0 57.4 24 57.4 53.4v42.3H125.2v-42.3c0-29.5 25.7-53.4 57.4-53.4H293c16.6 0 30-13.4 30-30s-13.4-30-30-30H182.5c-64.7 0-117.4 50.9-117.4 113.4v527.7c0 62.5 52.7 113.4 117.4 113.4H807c64.7 0 117.4-50.9 117.4-113.4V284.5c0-62.6-52.7-113.5-117.4-113.5z m0 694.6H182.5c-31.6 0-57.4-24-57.4-53.4V386.8h739.2v425.4c0.1 29.5-25.7 53.4-57.3 53.4z"
                    fill="#45484C"
                  />
                  <path
                    d="M447.6 217.1c-12.4-6.1-27-2.8-35.7 7.1-2.2-6.7-4-16.2-4-28.1 0-13 2.2-23 4.6-29.8 9.5 8.1 23.5 9.6 34.9 2.8 14.2-8.5 18.8-27 10.3-41.2-15.5-25.9-35.9-29.7-46.6-29.7-36.6 0-63.1 41.2-63.1 97.8s26.4 98 63 98c20.6 0 39-13.4 50.4-36.7 7.3-14.9 1.1-32.9-13.8-40.2zM635.9 218.5c-12.4-6.1-27-2.8-35.7 7.1-2.2-6.7-4-16.2-4-28.1 0-13 2.2-23 4.6-29.8 9.5 8.1 23.5 9.6 34.9 2.8 14.2-8.5 18.8-27 10.3-41.2-15.5-25.9-35.9-29.7-46.6-29.7-36.6 0-63.1 41.2-63.1 97.8s26.5 97.8 63.1 97.8c20.6 0 39-13.4 50.4-36.7 7.1-14.7 0.9-32.7-13.9-40z"
                    fill="#45484C"
                  />
                  <path
                    d="M700.2 514.5H200.5c-16.6 0-30 13.4-30 30s13.4 30 30 30h499.7c16.6 0 30-13.4 30-30s-13.5-30-30-30zM668.4 689.8h-74c-16.6 0-30 13.4-30 30s13.4 30 30 30h74c16.6 0 30-13.4 30-30s-13.4-30-30-30zM479.3 689.8H200.5c-16.6 0-30 13.4-30 30s13.4 30 30 30h278.8c16.6 0 30-13.4 30-30s-13.4-30-30-30z"
                    fill="#33CC99"
                  />
                </svg>
              </span>
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right w-[60%]"
            >
              <div>
                <h3 className="text-xl font-semibold tracking-wide text-black">
                  Track Your Activities
                </h3>
                <p>
                  Access your transaction history and cashback rewards
                  effortlessly, giving you full visibility into your spending
                  habits and earning potential.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
