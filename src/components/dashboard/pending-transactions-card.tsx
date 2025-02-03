import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export interface SummaryDetailsProps {
  userName: string;
  progress: "In-Progress" | "Pending" | "Failed" | "Processing";
  status: string;
  stage: number;
  date: string;
  id: number;
}

function PendingTransactionsCard({
  summary: summaries,
}: {
  summary: SummaryDetailsProps[];
}) {
  const [tabs, setTabs] = useState<string>("summary");
  const handleActiveTabs = (value: string) => {
    setTabs(value);
  };

  return null;

  return (
    <Card className="dm_sans w-full rounded-[10px] bg-white">
      <CardHeader className="border-b">
        <CardTitle className="text-sm text-[#475467]">
          Pending Transactions
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:px-5">
        <>
          <div className="grid w-full grid-cols-3 gap-x-3 rounded-lg bg-[#F9FAFB] p-1">
            <Button
              onClick={() => handleActiveTabs("summary")}
              className={` ${tabs === "summary" ? "border border-[#E4E7EC] text-[#F56630] shadow-lg" : "bg-transparent text-[#374151] shadow-none"} px-4 py-2 text-xs`}
            >
              Summary
            </Button>
            <Button
              onClick={() => handleActiveTabs("Pre-Sales")}
              className={` ${tabs === "Pre-Sales" ? "border border-[#E4E7EC] text-[#F56630] shadow-lg" : "bg-transparent text-[#374151] shadow-none"} px-4 py-2 text-xs`}
            >
              Pre-Sales
            </Button>

            <Button
              onClick={() => handleActiveTabs("Post-Sales")}
              className={` ${tabs === "Post-Sales" ? "border border-[#E4E7EC] text-[#F56630] shadow-lg" : "bg-transparent text-[#374151] shadow-none"} px-4 py-2 text-xs`}
            >
              Post-Sales{" "}
            </Button>
          </div>

          {tabs === "summary" && (
            <div>
              <div className="flex items-center py-10">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full rounded-md bg-[#F9FAFB] p-1"
                >
                  {summaries?.map((summary: SummaryDetailsProps) => (
                    <AccordionItem
                      key={summary.id}
                      value={`${summary.id}`}
                      className="border-0"
                    >
                      <AccordionTrigger className="gap-x-2 border-b">
                        <div className="flex items-center gap-x-2 text-sm font-medium">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#FFFFFF] bg-[#FFECE5] text-[10px] font-medium text-[#101928]">
                            {summary.userName.slice(0, 1)}
                          </span>{" "}
                          {summary.userName}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="flex">
                        <div className="flex w-full flex-col items-center gap-3">
                          <div className="flex w-full items-center justify-between py-2">
                            <span className="text-[#475467]">Progress</span>
                            <span className="font-medium text-black">
                              {summary.progress}
                            </span>
                          </div>
                          <div className="flex w-full items-center justify-between py-2">
                            <span className="text-[#475467]">State</span>
                            <span className="font-medium text-black">
                              {summary.stage}
                            </span>
                          </div>
                          <div className="flex w-full items-center justify-between py-2">
                            <span className="text-[#475467]">
                              Action/Status
                            </span>
                            <span className="font-medium text-black">
                              {summary.status}
                            </span>
                          </div>
                          <div className="flex w-full items-center justify-between py-2">
                            <span className="text-[#475467]">Updated on</span>
                            <span className="font-medium text-black">
                              {summary.date}
                            </span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          )}
          {tabs === "Pre-Sales" && (
            <div>
              <div className="py-10">Pre-Sales</div>
            </div>
          )}
          {tabs === "Post-Sales" && (
            <div>
              <div className="py-10">Post-Sales</div>
            </div>
          )}
        </>
      </CardContent>
    </Card>
  );
}

export default PendingTransactionsCard;
