"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { ServiceWithId } from "@/app/(authenticated)/user/hire/[id]/page";

interface ServiceSelectionProps {
  onNext: () => void;
  vendorId: string;
  selectedServices: ServiceWithId[];
  onSelectService: (serivce: ServiceWithId, type: "add" | "remove") => void;
}

export function ServiceSelection({
  vendorId,
  onNext,
  selectedServices,
  onSelectService,
}: ServiceSelectionProps) {
  const vendorServiceQuery = api.event.getVendorServices.useQuery(
    { vendorId, showFullService: true },
    {
      enabled: !!vendorId,
    },
  );
  const services = vendorServiceQuery.data?.services;

  const selectedServicesIds = selectedServices?.map((service) => service.id);

  const handleServiceToggle = (
    service: ServiceWithId,
    type: "add" | "remove",
  ) => {
    onSelectService(service, type);
  };

  const formatPrice = (price: number, model: string) => {
    switch (model) {
      case "HOURLY_RATE":
        return `$${price}/hour`;
      case "PER_PERSON":
        return `$${price}/person`;
      default:
        return `$${price}`;
    }
  };

  const handleContinue = () => {
    if (selectedServices.length > 0) {
      onNext();
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-6 text-2xl font-bold">Select Services</h2>
      <div className="space-y-4">
        {services?.map((service) => {
          const isSelected = selectedServicesIds.includes(service.id);
          return (
            <motion.div
              key={service.id}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-4">
                <div className="flex items-start space-x-4">
                  <Checkbox
                    id={service.id}
                    checked={isSelected}
                    onCheckedChange={() =>
                      handleServiceToggle(
                        service,
                        isSelected ? "remove" : "add",
                      )
                    }
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor={service.id}
                        className="cursor-pointer text-lg font-semibold"
                      >
                        {service.name}
                      </Label>
                      <span className="font-medium text-blue-600">
                        {formatPrice(service.price, service.pricingModel)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {selectedServices.length} service
          {selectedServices.length !== 1 ? "s" : ""} selected
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleContinue}
            className="bg-blue-600 text-white hover:bg-blue-700"
            disabled={selectedServices.length === 0}
          >
            Continue
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
