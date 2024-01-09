import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";

function Weather() {
  // Declare state variables to store weather data
  const [weatherData, setWeatherData] = useState({
    temperature: "",
    condition: "",
    wind: "",
    humidity: "",
    visibility: "",
    location: "",
  });

  const api_key = "c5bda2049bb0f68a5366e30f0a30bf88";

  const search = async () => {
    try {
      const inputElement = document.getElementById("cityInput");
      if (!inputElement.value) {
        return;
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputElement.value}&units=Metric&appid=${api_key}`;

      const response = await fetch(url);
      const data = await response.json();

      // Update state with fetched weather data
      setWeatherData({
        temperature: data.main.temp,
        condition: data.weather[0].main,
        wind: data.wind.speed,
        humidity: data.main.humidity,
        visibility: "10km", // Update this with actual visibility data if available in API
        location: data.name,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const backgroundStyle = {
    backgroundImage: `url("https://cdn.pixabay.com/photo/2016/05/01/17/32/sky-1365325_1280.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div>
      <div
        style={backgroundStyle}
        className="min-h-screen flex items-center justify-center bg-gray-400 "
      >
        <div className="flex flex-col bg-white rounded-2xl p-9  w-80">
          <div className="relative text-gray-600 border-2 rounded-xl mb-9 mt-3">
            <input
              type="search"
              id="cityInput"
              placeholder="Search"
              className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
            />
            <button
              onClick={search}
              className="absolute right-0 top-0 mt-3 mr-4"
            >
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                style={{ enableBackground: "new 0 0 56.966 56.966" }}
                xmlSpace="preserve"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
          {weatherData.location ? (
            <>
              <div className="font-bold text-xl">{weatherData.location}</div>
              <div className="text-sm text-gray-500">Today</div>
              <div className=" text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                <svg
                  className="w-32 h-32"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-row items-center justify-center mt-5">
                <div className="font-medium text-6xl">
                  {Math.round(weatherData.temperature)}°C
                </div>

                <div className="flex flex-col items-center ml-6">
                  <div>{weatherData.condition}</div>
                  <div className="mt-1">
                    <span className="text-sm">
                      <i className="far fa-long-arrow-up"></i>
                    </span>
                    <span className="text-sm font-light text-gray-500">
                      28°C
                    </span>
                  </div>
                  <div>
                    <span className="text-sm">
                      <i className="far fa-long-arrow-down"></i>
                    </span>
                    <span className="text-sm font-light text-gray-500">
                      20°C
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between mt-6">
                <div className="flex flex-col items-center">
                  <div className="font-medium text-sm">Wind</div>
                  <div className="text-sm text-gray-500 wind-rate">
                    {weatherData.wind} k/h
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="font-medium text-sm">Humidity</div>
                  <div className="text-sm text-gray-500 humidity-percent">
                    {weatherData.humidity}%
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="font-medium text-sm">Visibility</div>
                  <div className="text-sm text-gray-500">
                    {weatherData.visibility}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon
                icon={faCloud}
                className="text-5xl text-gray-500 mb-4"
              />
              <div className="text-2xl font-bold text-center text-black">
                No weather data available
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;
