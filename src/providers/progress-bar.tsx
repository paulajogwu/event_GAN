"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

type ProviderProps = {
  children: React.ReactNode;
};

export const ProgressBarProvider = ({ children }: ProviderProps) => {
  return (
    <>
      <ProgressBar
        height="2px"
        color="#2563eb"
        options={{ showSpinner: false }}
        shallowRouting={true}
      />
      {children}
    </>
  );
};
