import { Service } from "@prisma/client";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function omit<T extends Record<string, any>>(obj: T, key: keyof T) {
  const { [key]: _, ...rest } = obj;
  return rest;
}

export enum PricingModel {
  FIXED_PRICE = "FIXED_PRICE",
  HOURLY_RATE = "HOURLY_RATE",
  PER_PERSON = "PER_PERSON"
}

type ServicePrice = Pick<Service, "price" | "pricingModel">;
export const calculateServiceTotalCharge = (selectedService: ServicePrice[], attendee: number) => {

  return selectedService.reduce((acc, service) => {
    if (service.pricingModel === "PER_PERSON") {
      return acc + service.price! * attendee;
    }
    return acc + service.price!;
  }, 0);
};
export const calculateServiceCharge = (service: ServicePrice, attendee: number) => {
  return service.pricingModel === "PER_PERSON" ? service.price! * attendee : service.price!;

};