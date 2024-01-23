import axios from "axios";
import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

export default function HomePage() {
    const [loading, setLoading] = useState(true);
    const [temp, setTemp] = useState("");
    const [feels, setFeels] = useState("");
    const [desc, setDesc] = useState("");
    const [cloud, setCloud] = useState("");
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");
    const [hum, setHum] = useState("");
    const [sunset, setSunset] = useState("");
    const [sunrise, setSunrise] = useState("");
    const [windS, setWindS] = useState("");
    const [windD, setWindD] = useState("");
    const [src, setSrc] = useState(
        "https://png.pngtree.com/background/20230614/original/pngtree-twilight-shot-of-a-rain-drops-covered-street-picture-image_3460396.jpg"
    );
    const img = {
        rainy: "https://png.pngtree.com/background/20230614/original/pngtree-twilight-shot-of-a-rain-drops-covered-street-picture-image_3460396.jpg",
        winter: "https://wallpapers.com/images/hd/snowy-hill-in-winter-5k6lr8j0y8kb9gpe.jpg",
        summer: "https://wallpapers.com/images/featured/summer-gsgzr2s1hnv5slj3.jpg",
    };

    const para = {
        cold: "During this range, temperatures may require extra layers for warmth, and there's a noticeable chill in the air",
        mild: "This mild climate is often considered pleasant, making it conducive for outdoor outings without the need for heavy winter attire.",
        summer: "The air feels inviting, and outdoor activities are often favored during this temperate and enjoyable weather.",
    };

    const loadWeather = async () => {
        setLoading(true);
        const options = {
            method: "GET",
            url: "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather",
            params: { city: state },
            headers: {
                "X-RapidAPI-Key":
                    "e60d81a09emsh298c2129fcfed33p17cca3jsn3969ee95a884",
                "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
            },
        };

        try {
            const response = await axios.request(options);
            setTemp(response.data.temp);
            setFeels(response.data.feels_like);
            setCloud(response.data.cloud_pct);
            setMin(response.data.min_temp);
            setMax(response.data.max_temp);

            if (response.data.temp <= 10) {
                setDesc(para.cold);
                setSrc(img.winter);
            } else if (response.data.temp > 10 && response.data.temp <= 20) {
                setDesc(para.mild);
                setSrc(img.winter);
            } else {
                setDesc(para.summer);
                setSrc(img.summer);
            }

            if (response.data.cloud_pct >= 80) {
                setSrc(img.rainy);
            }

            setSunrise(convertUnixTimestampToTime(response.data.sunrise));
            setSunset(convertUnixTimestampToTime(response.data.sunset));
            setHum(response.data.humidity);
            setWindS(Math.round(response.data.wind_speed * 3.6));
            setWindD(degreesToDirection(response.data.wind_degrees));

            setLoading(false);
            console.log(weatherData);
        } catch (error) {
            console.error(error);
        }
    };

    function convertUnixTimestampToTime(timestamp) {
        const unixTimestampInMilliseconds = timestamp * 1000;
        const dateObject = new Date(unixTimestampInMilliseconds);
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();
        return `${hours} : ${minutes}`;
    }

    function degreesToDirection(degrees) {
        const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        const index = Math.round(degrees / 45) % 8;
        return directions[index];
    }

    const [state, setState] = useState("Ghaziabad");
    useEffect(() => {
        loadWeather();
    }, []);
    return (
        <div>
            {loading ? (
                <div className="h-screen w-full flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                        <HashLoader
                            className="my-4"
                            loading={true}
                            size={100}
                        />
                        Loading AeroInsight
                    </div>
                </div>
            ) : (
                <div
                    className={`flex h-screen bg-[url('${src}')] max-[1080px]:flex-col max-[1080px]:h-full bg-cover max-[1080px]:justify-center max-[1080px]:items-center bg-center w-full relative`}
                >
                    <div className="h-screen w-full max-[1080px]:h-full bg-[#0e0e0eb5] absolute top-0"></div>
                    <div
                        className={`w-[40%] max-[1080px]:w-[90%] max-[1080px]:p-6  z-30 bg-[url('${src}')] relative  bg-cover m-5 rounded-md bg-black text-white`}
                    >
                        <div className="h-full w-full bg-gradient-to-b from-[#00000080] to-[#00000029] absolute top-0 rounded-md"></div>
                        <div className="flex flex-col justify-center h-[90%] items-center relative z-50">
                            <div className="h-[40%] mb-10 flex flex-col justify-evenly items-center">
                                <div className="w-[90%] relative">
                                    <input
                                        type="text"
                                        className="w-full bg-[#525252b1] py-2 text-sm px-5 focus:outline-none rounded-full"
                                        value={state}
                                        onChange={(e) =>
                                            setState(e.target.value)
                                        }
                                    />
                                    <button>
                                        <img
                                            className="w-[20px] mb-5 absolute top-2 right-4"
                                            src="/search.png"
                                            alt=""
                                            onClick={loadWeather}
                                        />
                                    </button>
                                </div>
                                <h1 className="text-[80px]">{temp}°</h1>
                                <h2 className="font-bold text-4xl">{state}</h2>
                                <p className="text-xs w-[80%] text-center">
                                    {desc}
                                </p>
                            </div>
                            <div className="flex h-1/2 flex-wrap justify-evenly items-center">
                                <div className="bg-[#00000080] flex flex-col justify-center items-center my-2 w-[200px] h-[150px] max-[1080px]:mx-3 rounded-md">
                                    <h1 className="text-lg">Feels Like</h1>
                                    <h1 className="text-4xl">{feels}°</h1>
                                    <p className="w-[90%] text-center text-xs">
                                        This is the apparent temperature
                                    </p>
                                </div>
                                <div className="bg-[#00000080] flex flex-col justify-center items-center my-2 w-[200px] h-[150px] max-[1080px]:mx-3 rounded-md">
                                    <h1 className="text-lg">Cloud</h1>
                                    <h1 className="text-4xl">{cloud}%</h1>
                                    <p className="w-[90%] text-center text-xs">
                                        Portion of the sky covered by clouds
                                    </p>
                                </div>
                                <div className="bg-[#00000080] flex flex-col justify-center items-center my-2 w-[200px] h-[150px] max-[1080px]:mx-3 rounded-md">
                                    <h1 className="text-lg">Min/Max</h1>
                                    <h1 className="text-4xl">
                                        {min}°/{max}°
                                    </h1>
                                    <p className="w-[90%] text-center text-xs">
                                        Temperature range in {state}
                                    </p>
                                </div>
                                <div className="bg-[#00000080] flex flex-col justify-center items-center my-2 w-[200px] h-[150px] max-[1080px]:mx-3 rounded-md">
                                    <h1 className="text-lg">Humidity</h1>
                                    <h1 className="text-4xl">{hum}%</h1>
                                    <p className="w-[90%] text-center text-xs">
                                        Amount of water vapour in air
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[60%] z-20 m-5 flex flex-col text-white items-center rounded-md">
                        <div className="bg-[#00000090] p-4 rounded-xl w-[90%]">
                            <h1 className="ml-2">
                                Sunrise and Sunset in Delhi
                            </h1>
                            <div className="flex flex-wrap justify-evenly items-center my-6">
                                <div className="bg-gray-200 flex m-2 flex-col justify-center items-center bg-opacity-20 p-5 rounded-lg px-6">
                                    <img src="/sunrise.png" alt="" />
                                    <h1>Sunrise</h1>
                                    <h1>{sunrise} IST</h1>
                                </div>
                                <div className="bg-gray-200 flex m-2 flex-col justify-center items-center bg-opacity-20 p-5 rounded-lg px-6">
                                    <img src="/sunset.png" alt="" />
                                    <h1>Sunset</h1>
                                    <h1>{sunset} IST</h1>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#00000090] p-4 rounded-xl mt-10  w-[90%]">
                            <h1 className="ml-2">Wind Details in Delhi</h1>
                            <div className="flex justify-evenly items-center my-6">
                                <div className="bg-gray-200 justify-between items-center w-[300px] flex bg-opacity-20 p-5 rounded-lg px-6">
                                    <div>
                                        <h1>Wind Speed</h1>
                                        <h1 className="text-xs text-gray-400">
                                            {windS} km/h
                                        </h1>
                                        <hr className="my-6" />
                                        <h1>Wind Degrees</h1>
                                        <h1 className="text-xs text-gray-400">
                                            {windD}
                                        </h1>
                                    </div>
                                    <img
                                        className="w-[80px] max-[400px]:hidden h-[80px]"
                                        src="/compass.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
