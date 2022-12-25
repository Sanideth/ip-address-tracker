import React from "react";
import { ReactComponent as IconArrow } from "../images/icon-arrow.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGet } from "../hooks/useGet";
import { IP_BASE_URL } from "../utilities/url";
import { API_KEY } from "../utilities/apiKeys";
import ipRegex from "ip-regex";

import { IGeo } from "../utilities/interfaces";
import Map from "../components/Map";
import InfoBox from "../components/InfoBox";

const schema = yup
  .object({
    ip: yup
      .string()
      .required("Please enter a valid IP address")
      .matches(ipRegex(), "Please enter a valid IP address"),
  })
  .required();

interface IFormInput {
  ip: string;
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const [ipData, setIpUrl, ,] = useGet<IGeo>(null, null);
  const onSubmit = (data: IFormInput) => {
    setIpUrl(`${IP_BASE_URL}apiKey=${API_KEY}&ipAddress=${data.ip}`);
  };

  return (
    <div className="h-screen font-rubik">
      <header className="flex  flex-col items-center p-2 bg-header-img h-[40%] relative ">
        <h1 className="mb-5 font-medium text-white text-xl bg-no-repeat bg-cover text-center md:text-3xl ">
          IP Address Tracker
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-2xl min-w-[250px] sm:w-96 md:max-w-xl md:w-[576px] flex">
            <input
              type="text"
              className="overflow-hidden w-11/12 pl-6 pt-4 pb-4 rounded-tl-xl rounded-bl-2xl outline-none hover:cursor-pointer"
              placeholder="Search for any IP address or domain"
              {...register("ip")}
            />
            <button className="bg-black w-1/12 rounded-tr-xl rounded-br-2xl flex justify-center items-center hover:cursor-pointer">
              <IconArrow />
            </button>
          </div>
          <p className="text-white text-center">{errors.ip?.message}</p>
        </form>
        <div className="w-11/12 bg-white pt-4 pl-4 pb-4 pr-4 flex absolute bottom-0 translate-y-1/2 z-[1000] rounded-2xl justify-between flex-wrap md:pt-10 md:pb-10">
          <InfoBox title="Ip Address" info={ipData?.ip || ""} />
          <InfoBox
            title="Location"
            info={`${ipData?.location.city || ""} ${
              ipData?.location.region || ipData?.location.country || ""
            } ${ipData?.location.postalCode || ""} `}
          />
          <InfoBox title="Timezone" info={ipData?.location.timezone || ""} />
          <InfoBox title="ISP" info={ipData?.isp || ""} />
        </div>
      </header>
      <Map ipData={ipData} />
    </div>
  );
}

export default App;
