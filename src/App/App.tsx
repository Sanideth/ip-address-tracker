import React from "react";
import { ReactComponent as IconArrow } from "../images/icon-arrow.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGet } from "../hooks/useGet";
import { IP_BASE_URL } from "../utilities/url";
import { API_KEY } from "../utilities/apiKeys";
import ipRegex from "ip-regex";

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

  const [ipData, setIpUrl, ,] = useGet(null, null);
  const onSubmit = (data: IFormInput) => {
    setIpUrl(`${IP_BASE_URL}apiKey=${API_KEY}&ipAddress=${data.ip}`);
  };

  if (ipData) {
    console.log(ipData);
  }

  return (
    <div className="h-screen font-rubik">
      <header className="flex justify-center flex-col items-center pt-4 pb-16 pr-40 pl-40 bg-header-img">
        <h1 className="mb-7 font-medium text-white text-3xl">
          IP Address Tracker
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-2xl max-w-xl w-[576px] flex">
            <input
              type="text"
              className="overflow-hidden w-11/12 pl-6 pt-4 pb-4 rounded-tl-xl rounded-bl-2xl"
              placeholder="Search for any IP address or domain"
              {...register("ip")}
            />
            <button className="bg-black w-1/12 rounded-tr-xl rounded-br-2xl flex justify-center items-center">
              <IconArrow />
            </button>
          </div>
          <p>{errors.ip?.message}</p>
        </form>
      </header>
    </div>
  );
}

export default App;
