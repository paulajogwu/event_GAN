import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

function PaymentMethods() {
  return (
    <Card className="satoshi bg-white">
      <CardContent>
        <div>
          <p className="py-4 text-sm text-[#666666]">
            You do not have any saved payment method. Add a payment method to
            speed up bookings.
          </p>
        </div>
        <Button className="w-fit max-w-[175px] rounded-lg border bg-[#004AAD] px-[18px] py-[10px] text-white hover:bg-blue-700">
          Add payment method
        </Button>
      </CardContent>
    </Card>
  );
}

export default PaymentMethods;
