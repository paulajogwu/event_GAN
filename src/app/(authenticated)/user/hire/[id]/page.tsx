"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceSelection } from "@/components/user/hire/ServiceSelection";
import { EventDetails } from "@/components/user/hire/EventDetails";
import { Service } from "@prisma/client";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

interface Params {
  params: {
    id: string;
  };
}

export type ServiceWithId = Partial<Service> & { id: string };

function Hire({ params }: Params) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [selectedService, setSelectedService] = useState<ServiceWithId[]>([]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          {page === 0 ? (
            <ServiceSelection
              vendorId={params.id}
              onNext={() => {
                paginate(1);
              }}
              selectedServices={selectedService}
              onSelectService={(service, type) => {
                if (type === "add") {
                  setSelectedService([...selectedService, service]);
                } else {
                  setSelectedService(
                    selectedService.filter((s) => s.id !== service.id),
                  );
                }
              }}
            />
          ) : (
            <EventDetails
              vendorId={params.id}
              onBack={() => paginate(-1)}
              selectedService={selectedService}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Hire;
