import { api } from "@/trpc/react";
import React, { useEffect, useState } from "react";
import ListProviders from "../listProviders";

type Props = {
  plan: string;
};

const ServiceList = ({ plan }: Props) => {
  const { data, isLoading } = api.ai.getJsonFromPlan.useQuery(plan);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      setSelectedService(0);
    }
  }, [data]);

  return (
    <div className="satoshi max-h-[55vh] min-h-[55vh] overflow-y-auto rounded-lg border border-gray-200 bg-white px-3 sm:px-6 py-6 lg:px-3 2xl:px-8 lg:py-12">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left menu with list of services */}
        <div className="w-full lg:w-1/3">
          <h2 className="mb-4 text-lg lg:text-xl font-semibold">Services Needed</h2>
          {isLoading ? (
            <p>Loading services...</p>
          ) : (
            <ul className="space-y-4">
              {data?.providers?.map((service, index: number) => (
                <li
                  key={index}
                  onClick={() => setSelectedService(index)}
                  className={`rounded-lg p-3 lg:p-4 shadow cursor-pointer max-w-lg transition-all duration-200 ease-in-out ${selectedService === index
                      ? "bg-blue-50 border-blue-200"
                      : "bg-white border-gray-200"
                    }`}
                >
                  <h3 className="mb-2 font-semibold">{service.name}</h3>
                  <p className="text-sm text-gray-600">
                    {service.description}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right section with list of service providers */}
        <div className="w-full lg:w-2/3 flex flex-col">
          <h2 className="mb-4 text-lg lg:text-xl font-semibold">Service Providers</h2>
          <div className="2xl:p-1">
            {selectedService !== null && (
              <ListProviders
                describeQuery={
                  data?.providers[selectedService]?.description ?? ""
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
