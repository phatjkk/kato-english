function Home() {

  const CourseData1 = [
    {
      unit: 1,
      name: "BODY & HEALTH",
      detail: "Từ vựng cơ bản",
      bg_color_from: "from-green-500",
      bg_color_to: "to-blue-500"
    },
    {
      unit: 2,
      name: "SPORTS & GAMES",
      detail: "Từ vựng cơ bản",
      bg_color_from: "from-blue-500",
      bg_color_to: "to-indigo-700"
    },
    {
      unit: 3,
      name: "HOMES ",
      detail: "Từ vựng cơ bản",
      bg_color_from: "from-violet-800",
      bg_color_to: "to-pink-600"
    },
    {
      unit: 4,
      name: "BUILDINGS",
      detail: "Từ vựng cơ bản",
      bg_color_from: "from-pink-600",
      bg_color_to: "to-red-600"
    },
    {
      unit: 5,
      name: "FOOD",
      detail: "Từ vựng cơ bản",
      bg_color_from: "from-red-500",
      bg_color_to: "to-orange-500"
    },
    {
      unit: 6,
      name: "SHOPPING",
      detail: "Từ vựng cơ bản",
      bg_color_from: "from-orange-500",
      bg_color_to: "to-yellow-500"
    },
    {
      unit: 7,
      name: "FASHION & CLOTHING",
      detail: "Từ vựng cơ bản",
      bg_color_from: "from-yellow-500",
      bg_color_to: "to-pink-600"
    },
    {
      unit: 8,
      name: "ARTS & MEDIA",
      detail: "Từ vựng cơ bản",
      bg_color_from: "from-purple-500",
      bg_color_to: "to-blue-500"
    },
    {
      unit: 9,
      name: "NATURE",
      detail: "Từ vựng cơ bản",
      bg_color_from: "from-purple-500",
      bg_color_to: "to-pink-500"
    },
  ];
  return (<div className="bg-white text-white ">
    <div className="flex font-['Nunito']">
      <div>
        <div>
          <h3 className="mt-[1.5em] ml-[2em] text-black text-xl font-bold">
            Từ vựng cấp độ 1 (A1-A2)
          </h3>
          <div className=" md:grid md:grid-cols-3 md:gap-3">
            {
              CourseData1.map((item) =>
                <button className={"w-[15em] h-[9em] transition hover:-translate-y-1 hover:scale-110 duration-300 ml-[2.5em] mt-[1.5em] bg-gradient-to-br " + item.bg_color_from + " " + item.bg_color_to + " rounded-3xl"}>
                  <p className="font-medium">Bài {item.unit}</p>
                  <h2 className="mb-2 font-bold text-lg">
                    {item.name}
                  </h2>
                  <p className="font-normal">{item.detail}</p>
                </button>

              )
            }
          </div>
        </div>
        {/* <div>
          <h3 className="mt-[1.5em] ml-[2em] text-black text-lg font-bold">
            Lộ trình học trung cấp
          </h3>
          <div className="flex">
            <div className="ml-[2.5em] mt-[1.5em] p-10 bg-gradient-to-br from-violet-800 to-pink-600 rounded-3xl">
              <h2 className="mb-2 font-bold text-lg">
                Pimsleur English Course
              </h2>
              <p className="font-light">Người mới học hoàn toàn</p>
              <p className="font-light">Căn bản (~IELTS 0).</p>
            </div>
            <div className="ml-[2.5em] mt-[1.5em] p-10 bg-gradient-to-br from-pink-600 to-red-600 rounded-3xl">
              <h2 className="mb-2 font-bold text-lg">
                Original English Course
              </h2>
              <p className="font-light">Người đã có nền tảng căn bản.</p>
              <p className="font-light">Căn bản (~IELTS 0-3.0).</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="mt-[1.5em] ml-[2em] text-black text-lg font-bold">
            Lộ trình học nâng cao
          </h3>
          <div className="flex">
            <div className="ml-[2.5em] mt-[1.5em] p-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-3xl">
              <h2 className="mb-2 font-bold text-lg">
                Pimsleur English Course
              </h2>
              <p className="font-light">Người mới học hoàn toàn</p>
              <p className="font-light">Căn bản (~IELTS 0).</p>
            </div>
            <div className="ml-[2.5em] mt-[1.5em] p-10 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-3xl">
              <h2 className="mb-2 font-bold text-lg">
                Original English Course
              </h2>
              <p className="font-light">Người đã có nền tảng căn bản.</p>
              <p className="font-light">Căn bản (~IELTS 0-3.0).</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>

  </div>)
}
export default Home;