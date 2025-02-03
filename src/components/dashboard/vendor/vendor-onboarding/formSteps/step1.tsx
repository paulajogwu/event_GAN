import SelectInput from "@/components/common/inputs/form/select-input";
import FormInputField from "@/components/onboarding/form-field";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Country, State, ICountry, IState } from "country-state-city";
import Image from "next/image";
import { Button, ButtonWithLoader } from "@/components/ui/button";
import { ZVendorOnboardingSchema } from "@/trpc/api/routers/profile/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/trpc/react";
import { toast } from "@/components/ui/use-toast";

const ENVENT_CATEGORIES_OPTIONS = [
  { label: "Halls", value: "HALLS" },
  { label: "Decorators/Florists", value: "DECORATORS_FLORISTS" },
  { label: "Entertainment (DJs, Bands, Performers)", value: "ENTERTAINMENT" },
  { label: "Lighting and AV Services", value: "LIGHTING_AV" },
  { label: "Tables, Chairs, Tents", value: "TABLES_CHAIRS_TENTS" },
  { label: "Logistics and Transportation", value: "LOGISTICS_TRANSPORTATION" },
  { label: "Branding and Stationeries", value: "BRANDING_STATIONERIES" },
  { label: "Bakers (Cakes and Desserts)", value: "BAKERS" },
  { label: "Bar Services", value: "BAR_SERVICES" },
  { label: "Security Services", value: "SECURITY_SERVICES" },
  { label: "Furniture and Lounge Rentals", value: "FURNITURE_LOUNGE_RENTALS" },
  { label: "Makeup Artists and Hair Stylists", value: "MAKEUP_HAIR" },
  {
    label: "Event Technology Providers (Photo Booths, Event Apps)",
    value: "EVENT_TECH",
  },
  { label: "Caterers", value: "CATERERS" },
];
type SelectOption = {
  value: string;
  label: string;
  icon?: React.JSX.Element; // Optional icon for countries, not for states
};

interface aboutProps {
  handleNextStep: () => void;
}
export const AboutBusiness = ({ handleNextStep }: aboutProps) => {
  const [countryList, setCountryList] = useState<SelectOption[]>([]);
  const [stateList, setStateList] = useState<SelectOption[]>([]);
  // const [descriptionLength, setDescriptionLength] = useState(0);

  const { mutateAsync, isPending } = api.profile.vendorOnboarding.useMutation({
    onSuccess: ({ message }) => {
      toast({
        variant: "default",
        title: "Success",
        description: message,
      });
      handleNextStep();
    },
  });

  // Fetch countries on component mount
  useEffect(() => {
    const countries: ICountry[] = Country.getAllCountries(); // Fetch the list of countries
    const formattedCountries: SelectOption[] = countries.map((country) => ({
      value: country.isoCode,
      label: country.name,
      icon: (
        <Image
          src={`https://flagcdn.com/${country.isoCode.toLowerCase()}.svg`}
          alt={country.name}
          width={20}
          height={15}
        />
      ),
    }));
    setCountryList(formattedCountries); // Correctly typed state update
  }, []);

  const methods = useForm<z.infer<typeof ZVendorOnboardingSchema>>({
    resolver: zodResolver(ZVendorOnboardingSchema),
    mode: "onBlur",
    defaultValues: {
      businessName: "",
      state: "",
      description: "",
    },
  });

  const { control, formState, watch, setValue, handleSubmit } = methods;

  const onSubmit = (data: z.infer<typeof ZVendorOnboardingSchema>) => {
    mutateAsync(data);
  };

  const handleCountryChange = (countryIsoCode: string) => {
    console.log("Selected Country:", countryIsoCode); // Debugging

    const states: IState[] = State?.getStatesOfCountry(countryIsoCode);
    console.log("Fetched States:", states); // Debugging

    const formattedStates: SelectOption[] =
      states.length > 0
        ? states.map((state) => ({
            value: state.isoCode,
            label: state.name ?? "Select state",
          }))
        : [];

    setStateList(formattedStates); // Update state list
  };
  const selectedCountry = watch("country");
  const description = watch("description");
  const descriptionLength = description ? description.length : 0;
 
  return (
    <div className="dm_sans flex w-full flex-col">
      <h1 className="dm_sans text-3xl font-bold text-[#333333]">
        Tell us about your business
      </h1>
      <p className="py-2 text-base font-medium text-[#4C4C4C]">
        Share your business information so customers can find and book your
        services.
      </p>
      <div className="flex flex-col gap-3">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <FormInputField
                name="businessName"
                inputStyle="border border-[#D0D5DD] bg-[#FFFFFF] rounded-md h-12 p-3 placeholder:text-[#98A2B3]"
                label="Business name"
                placeholder="Enter your business name"
                control={control}
                type="text"
                error={formState.errors.businessName?.message as string}
              />
            </div>
            <div>
              <SelectInput
                name="category"
                placeholder="Select your business category"
                label="Category"
                triggerClassName="border border-[#D0D5DD] bg-[#FFFFFF] rounded-md h-12 p-3 placeholder:text-[#98A2B3]"
                control={control}
                options={ENVENT_CATEGORIES_OPTIONS}
                error={formState.errors.category?.message as string}
              />
            </div>
            <div className="flex flex-col">
              <FormInputField
                name="description"
                textareaStyle="border border-[#D0D5DD] bg-[#FFFFFF] rounded-md h-[111px] p-3 placeholder:text-[#98A2B3]"
                label="Description"
                placeholder="Describe your service in detail (e.g., packages, special offerings, etc.)"
                control={control}
                type="text"
                istextarea
                maxLength={150}
                error={formState.errors.description?.message as string}
              />
              <span className="text-sm text-[#98A2B3]">
                150/{descriptionLength}
              </span>
            </div>

            <div className="flex w-full flex-col gap-4 sm:flex-row">
              <div className="flex w-full flex-col">
                <SelectInput
                  name="country"
                  placeholder="Select a country"
                  label="Country"
                  triggerClassName="border border-[#D0D5DD] bg-[#FFFFFF] rounded-md h-12 p-3 placeholder:text-[#98A2B3]"
                  control={control}
                  options={countryList}
                  icon={
                    countryList.find(
                      (country) => country.value === selectedCountry,
                    )?.icon
                  }
                  error={formState.errors.country?.message as string}
                  onValueChange={(value) => {
                    setValue("country", value);
                    handleCountryChange(value);
                  }}
                />
              </div>

              <div className="flex w-full flex-col">
                <SelectInput
                  name="state"
                  placeholder="Select a state"
                  label="State"
                  triggerClassName="border border-[#D0D5DD] bg-[#FFFFFF] rounded-md h-12 p-3 placeholder:text-[#98A2B3]"
                  control={control}
                  disabled={!selectedCountry || !stateList}
                  options={stateList}
                  error={formState.errors.state?.message as string}
                />
              </div>

              <div className="flex w-full flex-col">
                <FormInputField
                  name="zipCode"
                  inputStyle="border border-[#D0D5DD] bg-[#FFFFFF] rounded-md h-12 p-3 placeholder:text-[#98A2B3]"
                  label="Zip Code"
                  placeholder="Enter your zip code"
                  control={control}
                  type="text"
                  error={formState.errors.zipCode?.message as string}
                />
              </div>
            </div>
            <div className="my-4 flex w-full flex-col">
              <ButtonWithLoader
                type="submit"
                loading={isPending}
                className="h-14 rounded-lg bg-[#004AAD] px-12 py-6 text-center text-white hover:bg-blue-500"
              >
                Continue
              </ButtonWithLoader>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
