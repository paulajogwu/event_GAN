import ServiceProvider from "@/components/common/vendors/serviceProvider";
import { api } from "@/trpc/react";
import React, { useEffect, useState } from "react";

type Props = {
  describeQuery: string;
};

const ListProviders = ({ describeQuery }: Props) => {
  // const { mutateAsync: getServiceProviders, data: providerData } =
  //   api.ai.getServiceProviders.useMutation();
  // const [isLoading, setIsLoading] = useState(false);

  // const triggerQuery = async (): Promise<void> => {
  //   setIsLoading(true);
  //   await getServiceProviders(describeQuery);
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   if (describeQuery) {
  //     triggerQuery();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [describeQuery]);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="grid w-full grid-cols-1 gap-x-2 gap-y-5 md:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-2"></div>
  );
};

export default ListProviders;
