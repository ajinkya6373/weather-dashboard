import NearMeIcon from "@mui/icons-material/NearMe";
import Card from "./card";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import PressureChart from "./pressureChart";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BASE_URL,
  calculateFeelsLikeStatus,
  calculateHumidityStatus,
  calculateVisibilityStatus,
  formatSunriseAndSunsetTimes,
} from "../util";
import { useDebounce } from "../hooks";
import LocationSearch from "./search";
import { toast } from "react-hot-toast";

export default function Dashboard() {
  const [cityName, setCityName] = useState("pune");
  const [coordinates, setCoordinates] = useState({
    lat: 18.52128970369243,
    lon: 73.8560799175232,
  });
  const [location, setLocation] = useState("");
  const debouncedCityName = useDebounce(cityName, 1000);
  const [weatherData, setWeatherData] = useState("");
  const API_KEY = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    (async () => {
      if(debouncedCityName.length>0){
        try {
          const {
            data: [{ lat, lon, name, state }],
            status,
          } = await axios.get(
            `${BASE_URL}/geo/1.0/direct?q=${debouncedCityName}&appid=${API_KEY}`
          );
          if (status === 200) {
            setCoordinates({ lat, lon });
            setLocation({ name, state });
          }
        } catch (error) {
          toast.error("City not found...")
          console.log(error);
        }
      }
    })();
  }, [debouncedCityName]);

  useEffect(() => {
    (async () => {
      if (coordinates.lat && coordinates.lon) {
        try {
          const { data, status } = await axios.get(
            `${BASE_URL}/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}&units=metric`
          );
          if (status) {
            setWeatherData(data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [coordinates.lat, coordinates.lon]);

  const visibilityStatus = calculateVisibilityStatus(weatherData?.visibility);
  const humidityStatus = calculateHumidityStatus(weatherData?.main?.humidity);
  const feelsLikeStatus = calculateFeelsLikeStatus(
    weatherData?.main?.feels_like
  );
  const sunriseAndSunsetTimes = formatSunriseAndSunsetTimes(
    weatherData.sys?.sunrise,
    weatherData.sys?.sunset
  );
  return (
    <div className="flex w-[90%] ">
      <div className="bg-[#ffffff] w-[20%] p-[1.5rem] rounded-tl-[2rem] rounded-bl-[2rem]">
        <LocationSearch onSearch={setCityName} />
        <img src="/imgs/sunny.svg" alt="sun" />
        <div className="flex items-center space-x-2 my-2 mb-4 text-5xl">
          <span>{weatherData?.main?.temp}</span>
          <span>° </span>
          <span>c</span>
        </div>

        <p className="text-[19px]">
          Monday, <span className="opacity-[0.7]">16:00</span>
        </p>
        <hr className="my-4 border-t border-gray-300" />
        <div className="flex items-center space-x-2 my-4">
          {weatherData?.weather && (
            <>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`}
                alt="icon"
                className="w-10"
              />
              <span>{weatherData?.weather[0]?.description}</span>
            </>
          )}
        </div>
        <div className="text-center mt-4 relative">
          <img
            src="https://images.unsplash.com/photo-1612289718438-82c682921a88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="city"
            className="w-[100%] h-[100px] object-cover rounded-[1rem]"
          />
          <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold">
            {location.name} {location.state}
          </span>
        </div>
      </div>
      <div className="bg-[#f6f6f8] flex-1  rounded-tr-[2rem] rounded-br-[2rem] p-[1.5rem] pl-[3rem] ">
        <h2 className="text-2xl font-semibold mb-4">Today's Highlights</h2>
        <div className="flex gap-12 flex-wrap mt-10">
          <Card title="Pressure">
            <PressureChart pressure={weatherData?.main?.pressure} />
          </Card>
          <Card title={"Wind Status"}>
            {weatherData?.wind?.speed}
            <span className="text-[1.5rem] font-semibold opacity-[0.7] ml-1">
              m/s
            </span>
            <div className="flex items-center gap-3 my-4">
              <NearMeIcon className="rotate-180 text-blue-500 border border-gray-200 rounded-full p-1 text-2xl" />
              <span className="text-2xl ">WSW</span>
            </div>
          </Card>
          <Card title={"Sunrise & Sunset"}>
            <div>
              <ArrowCircleLeftIcon
                sx={{
                  color: "rgb(255,191,94) ",
                  fontSize: "3rem",
                  border: "1px solid #ffc36a",
                }}
                className="rounded-full rotate-90 "
              />
              <span className="text-2xl font-normal ml-2">
                {sunriseAndSunsetTimes.formattedSunriseTime}
              </span>
            </div>
            <div>
              <ArrowCircleRightIcon
                sx={{
                  color: "rgb(255,191,94) ",
                  fontSize: "3rem",
                  border: "1px solid #ffc36a",
                }}
                className="rounded-full rotate-90 "
              />
              <span className="text-2xl font-normal ml-2">
                {sunriseAndSunsetTimes.formattedSunsetTime}
              </span>
            </div>
          </Card>
          <Card title={"Humidity"}>
            <div>
              {humidityStatus.humidity}
              <span className="text-[1.5rem] font-semibold opacity-[0.7] ml-1">
                %
              </span>
            </div>
            <span className="text-xl">{humidityStatus.status}</span>
          </Card>
          <Card title={"Visibility"}>
            <div>
              {visibilityStatus.km}
              <span className="text-[1.5rem] font-semibold opacity-[0.7] ml-1">
                km
              </span>
            </div>
            <span className="text-xl ">{visibilityStatus.status}</span>
          </Card>
          <Card title={"Feels Like"}>
            <div>{feelsLikeStatus.feelsLike} °c</div>
            <span className="text-xl">{feelsLikeStatus.status}</span>
          </Card>
        </div>
      </div>
    </div>
  );
}
