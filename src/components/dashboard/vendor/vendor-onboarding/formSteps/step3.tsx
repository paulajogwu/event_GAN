import { useState } from "react";
import { useFormContext, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Available from "../datepicker";

interface EditAvailabilityProps {
  handleSteps: (val: number) => void;
  handleNextStep: () => void;
}

export const EditAvailability = ({
  handleNextStep,
  handleSteps,
}: EditAvailabilityProps) => {
  const { control } = useFormContext();
  const [selectedOption, setSelectedOption] = useState<string>(
    "Recurring availability",
  );

  const handleRadioChange = (selectedName: string) => {
    setSelectedOption(selectedName);
  };

  return (
    <div className="flex w-full flex-col">
      <h1 className="dm_sans text-3xl font-bold text-[#333333]">
        Set your availability
      </h1>
      <p className="py-2 text-base font-medium text-[#4C4C4C]">
        Let customers know when you are available to provide your services.
      </p>

      {/* Display the available time slots */}
      {selectedOption === "Recurring availability" && (
        <Card className="dm_sans mt-6 bg-white shadow-md">
          <CardContent className="flex w-full flex-col gap-2">
            {/* {availableTimes.map((availableTime, idx) => (
              <Available
                key={idx}
                day={availableTime}
                shortName={availableTime.date}
                handleRemoveTime={handleRemoveTime}
                handleEditTime={handleEditTime}
                handleAddOrClearTime={handleAddOrClearTime}
                control={control} // Pass control from react-hook-form
              />
            ))} */}
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex w-full flex-col items-center gap-5 py-4 sm:flex-row">
        <Button
          type="button"
          onClick={() => handleSteps(2)}
          className="h-14 w-full rounded-md border border-[#004AAD] bg-[#FFFFFF] px-6 py-4 text-center font-bold text-[#004AAD] hover:bg-gray-300 sm:w-[220px]"
        >
          Go back
        </Button>

        <Button
          onClick={() => {
            console.log();
          }}
          type="button"
          className={`h-14 w-full flex-1 rounded-md border border-[#004AAD] bg-[#004AAD] px-6 py-4 text-center font-bold text-white hover:bg-[#183196]`}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
