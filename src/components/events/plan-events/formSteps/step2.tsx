import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Stars from "~/public/img/vendor/stars.svg";

function AiCraftPlan({
  plan,
  handleNext,
}: {
  plan?: string;
  handleNext: () => void;
}) {
  return (
    <div className="satoshi space-y-4">
      <div className="max-h-[55vh] min-h-[55vh] overflow-y-auto rounded-lg border border-gray-200 bg-white px-12 py-12">
        <article
          className="prose-sm"
          dangerouslySetInnerHTML={{ __html: plan ?? "" }}
        />
      </div>
      <div className="flex items-center justify-end gap-x-3">
        <Button className="text_blue_gradient flex items-center justify-center gap-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Download PDF
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className="bg_blue_gradient flex items-center justify-center gap-x-3 rounded-md px-4 py-5 font-medium text-white duration-150 hover:bg-[#004AAD]/40"
        >
          Hire Service Providers
          <Image src={Stars} alt="stars icon" />
        </Button>
      </div>
    </div>
  );
}

export default AiCraftPlan;
