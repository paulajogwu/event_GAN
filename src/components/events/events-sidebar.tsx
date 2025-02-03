'use client'

import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { AccordionItem } from "../common/accordion";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { PiMonitor } from "react-icons/pi";
import { PiGraduationCap } from "react-icons/pi";
import { PiHandshakeThin } from "react-icons/pi";

interface AccordionProps {
    conditions: string[];
    sellerTypes: string[];
    topLocations: string[];
    venueSetup: string[];
}


export const Accordion = ({ conditions, sellerTypes, topLocations, venueSetup }: AccordionProps) => {
    const [openId, setOpenId] = useState<React.Key | null>(1);
    const [selectedSellerType, setSelectedSellerType] = useState<string | null>(null);
    const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>('');
    // const [tab, setTab] = useState<string>("venue");

    const handleToggle = (id: React.Key) => {
        setOpenId(openId === id ? null : id);
    };

    const handleSellerTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedSellerType(event.target.value);
    };

    const handleConditionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCondition(event.target.value);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value.toLowerCase());
    };

    // Filtered top locations based on the input filter
    const filteredLocations = topLocations.filter(location =>
        location.toLowerCase().includes(filter)
    );

    // const handleSelectTabs = (value: string) => {
    //     setTab(value)
    // }
    return (
        <Card className="mx-auto h-full lg:w-full xl:max-w-[350px] border-[#EBEEF7] border rounded-xl bg-[#FFFFFF] p-6">

            <AccordionItem
                id={1}
                title="category"
                isOpen={1 === openId}
                onClick={handleToggle}
            >
                <>
                    <div className="flex flex-col gap-y-2">

                        {/* Venues and setup */}

                        <div>
                            <h1 className="flex items-center gap-x-2 my-2 font-medium text-[#464D61]">
                                <PiMonitor size={20} color={"#FFBA3B"} />
                                Venues and setup</h1>
                            {venueSetup.map((venue, idx) => (
                                <div key={idx} className="flex items-center space-x-2 pb-3">
                                    <Checkbox
                                        id={`location-${idx}`}
                                        className="custom-checkbox peer"
                                    />
                                    <Label
                                        htmlFor={`location-${idx}`}
                                        className="text-sm text-[#464D61] peer-checked:text-[#136ADF] font-medium leading-none  peer-disabled:opacity-70"
                                    >
                                        {venue}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {/* Catering and Bar Services */}
                        <div>
                            <h1 className="flex items-center gap-x-2 my-2 font-medium text-[#464D61]">
                                <PiHandshakeThin size={20} color={"#FFBA3B"} />
                                Catering and Bar Services
                            </h1>

                            {/* <div>
                                Catering and Bar Services
                            </div> */}
                        </div>

                        {/* Decor and Atmosphere */}
                        <div>
                            <h1 className="flex items-center gap-x-2 my-2 font-medium text-[#464D61]">
                                <PiGraduationCap size={20} color={"#FFBA3B"} />
                                Decor and Atmosphere
                            </h1>

                            {/* <div>
                                Decor and Atmosphere
                            </div> */}
                        </div>
                    </div>
                </>

            </AccordionItem>

            <AccordionItem
                id={2}
                title="Select Type"
                isOpen={2 === openId}
                onClick={handleToggle}
            >
                <div className="flex flex-col py-2 gap-y-2">
                    {sellerTypes.map((item, idx: number) => (
                        <li key={idx} className="flex items-center gap-x-2.5">
                            <input
                                type="radio"
                                name="type"
                                id={item}
                                value={item}
                                checked={selectedSellerType === item}
                                onChange={handleSellerTypeChange}
                                className="form-radio border-gray-400 h-4 w-4 text-blue-600 peer data-[state=checked]:bg-[#136ADF] focus:ring-blue-600 duration-150"
                            />
                            <Label htmlFor={item} className="text-sm text-[#464D61] peer-checked:text-[#136ADF]  satoshi font-medium">
                                {item}
                            </Label>
                        </li>
                    ))}
                </div>
            </AccordionItem>

            <AccordionItem
                id={3}
                title="Conditions"
                isOpen={3 === openId}
                onClick={handleToggle}
            >
                <div className="flex flex-col py-2 gap-y-2">
                    {conditions.map((item, idx: number) => (
                        <li key={idx} className="flex items-center gap-x-2.5">
                            <input
                                type="radio"
                                name="conditions"
                                id={item}
                                value={item}
                                checked={selectedCondition === item}
                                onChange={handleConditionChange}
                                className="form-radio border-gray-400 h-4 w-4 text-blue-600 peer focus:ring-blue-600 data-[state=checked]:bg-[#136ADF] duration-150"
                            />
                            <Label htmlFor={item} className="text-sm text-[#464D61] peer-checked:text-[#136ADF] satoshi font-medium">
                                {item}
                            </Label>
                        </li>
                    ))}
                </div>
            </AccordionItem>
            <AccordionItem
                id={4}
                title="PRICES"
                isOpen={4 === openId}
                onClick={handleToggle}
            >
                <div>
                    <div className="grid grid-cols-2 gap-5">
                        <Input type="text" placeholder="150" className="border-gray-[#939AAD] border "  />
                        <Input type="text" placeholder="150" className="border-gray-[#939AAD] border "  />
                    </div>
                    <Input type="range" className="bg-[#136ADF]" />
                </div>
            </AccordionItem>

            <AccordionItem
                id={5}
                title="TOP LOCATION"
                isOpen={5 === openId}
                onClick={handleToggle}
            >
                <div className="flex flex-col w-full py-2 gap-y-3">
                    <div className="relative mb-2">
                        <span className="absolute top-0 bottom-0 w-5 h-5 my-auto text-[#136ADF] left-3">
                            <CiSearch size={20} />
                        </span>
                        <Input
                            type="text"
                            placeholder="Cities, states & country name"
                            value={filter}
                            onChange={handleFilterChange}
                            className="w-full h-10 pl-9 pr-4 text-gray-700 border placeholder:text-xs placeholder:text-[#939AAD] rounded-md outline-none bg-white focus:bg-white focus:border-indigo-600"
                        />
                    </div>
                    {filteredLocations.length === 0 && <h1 className="text-center ">No match for <strong>"{filter}"</strong></h1>}
                    <div className="flex flex-col gap-y-2">
                        {filteredLocations.map((location, idx) => (
                            <div key={idx} className="flex items-center space-x-2 pb-1">
                                <Checkbox
                                    id={`location-${idx}`}
                                    className="custom-checkbox peer"
                                />
                                <Label
                                    htmlFor={`location-${idx}`}
                                    className="text-sm text-[#464D61] peer-checked:text-[#136ADF] font-medium leading-none"
                                >
                                    {location}
                                </Label>
                            </div>
                        ))}
                    </div>

                </div>
            </AccordionItem>
        </Card>
    )
}
