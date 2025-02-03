import { Control, Controller, FieldValues } from 'react-hook-form';
import { memo, useMemo } from 'react';
import { EuiDatePicker } from '@elastic/eui'; // Assuming this is the date picker library you are using
import { BiTrash } from 'react-icons/bi';
import moment from 'moment'; // Import moment



// eslint-disable-next-line react/display-name
export const TimeEvent = memo(
    ({
        time,
        handleEditTime,
        handleRemoveTime,
        shortName,
        idx,
        control, // Add control as a prop
    }: {
        time: { timeFrom?: string | undefined; timeTo?: string | undefined };
        shortName: string | number;
        handleEditTime: ({
            dateValue,
            timeIdx,
            timesType,
            newTime,
        }: {
            dateValue: string;
            timeIdx: number;
            timesType: 'timeFrom' | 'timeTo';
            newTime: string;
        }) => void;
        handleRemoveTime: ({ dateValue, timeKey }: { dateValue: string; timeKey: number }) => void;
        idx: number;
        control: Control<FieldValues, any>;
    }) => {
        // Convert to moment objects instead of Date
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        const timeFromDate = useMemo(
            () => (time.timeFrom ? moment(`1970-01-01T${time.timeFrom}:00`) : null),
            [time.timeFrom]
          );
          const timeToDate = useMemo(
            () => (time.timeTo ? moment(`1970-01-01T${time.timeTo}:00`) : null),
            [time.timeTo]
          );

        return (
            <div className="flex justify-between">
                <div className="flex items-center w-[70%]">
                    {/* Use Controller to manage timeFrom */}
                    <Controller
                        control={control}
                        name={`availability.timeFrom`}
                        defaultValue={time.timeFrom}
                        render={({ field }) => (
                            <EuiDatePicker
                                selected={timeFromDate || null} // Moment object
                                showTimeSelect
                                showTimeSelectOnly
                                timeFormat="HH:mm"
                                showIcon={false}
                                timeIntervals={15}
                                onChange={(date) => {
                                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                                    const newTime = date ? moment(date).format('HH:mm') : ''; // Format using moment
                                    field.onChange(newTime); 
                                    handleEditTime({
                                        dateValue: shortName as string,
                                        timeIdx: idx,
                                        timesType: 'timeFrom',
                                        newTime,
                                    });
                                }}
                                className="border bg-white text-[#474747] !text-[10px] shadow-[0px_0px_4px_2px_#0000000A] text-start  w-40 rounded-lg"
                            />
                        )}
                    />
                    <span className="mx-3">&nbsp; to &nbsp;</span>
                    {/* Use Controller to manage timeTo */}
                    <Controller
                        control={control}
                        name={`availability.timeFrom`}
                        defaultValue={time.timeTo}
                        render={({ field }) => (
                            <EuiDatePicker
                                selected={timeToDate || null} 
                                showTimeSelect
                                showTimeSelectOnly
                                timeFormat="HH:mm"
                                showIcon={false}
                                timeIntervals={15}
                                onChange={(date) => {
                                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                                    const newTime = date ? moment(date).format('HH:mm') : ''; // Format using moment
                                    field.onChange(newTime);
                                    handleEditTime({
                                        dateValue: shortName as string,
                                        timeIdx: idx,
                                        timesType: 'timeTo',
                                        newTime,
                                    });
                                }}
                                className="border bg-white text-[#474747] !text-[10px] shadow-[0px_0px_4px_2px_#0000000A] text-start w-40 rounded-lg"
                            />
                        )}
                    />
                </div>
                <div
                    onClick={() => handleRemoveTime({ dateValue: shortName as string, timeKey: idx })}
                    className="self-center ml-4"
                >
                    <BiTrash size={15} />
                </div>
            </div>
        );
    },
);





// eslint-disable-next-line react/display-name
const Available = memo(
    ({
      day,
      shortName,
      handleAddOrClearTime,
      handleEditTime,
      handleRemoveTime,
      control,
    }: {
      day: {
        key: number;
        date: string | number;
        times: {
          timeFrom?: string | undefined;
          timeTo?: string | undefined;
        }[];
      };
      shortName: string | number;
      handleAddOrClearTime: ({ checked, dateValue }: { checked: boolean; dateValue: string }) => void;
      handleEditTime: ({
        dateValue,
        timeIdx,
        timesType,
        newTime,
      }: {
        dateValue: string;
        timeIdx: number;
        timesType: 'timeFrom' | 'timeTo';
        newTime: string;
      }) => void;
      handleRemoveTime: ({ dateValue, timeKey }: { dateValue: string; timeKey: number }) => void;
      control: Control<FieldValues, any>;
    }) => {
      return (
        <div className="flex w-full max-w-[490px] justify-between items-center mx-3 py-4">
          <div className="flex items-center w-full">
            <div className="flex items-center w-[18%]">
              <input
                defaultChecked={!!day.times?.length}
                size={15}
                className='custom-checkbox'
                type="checkbox"
                onChange={(e) =>
                  handleAddOrClearTime({
                    checked: e.target.checked,
                    dateValue: shortName as string,
                  })
                }
              />
              <p className="font-medium text-xs text-black px-3">{shortName}</p>
            </div>
            {day?.times?.length ? (
              <div>
                {day?.times?.map((time, idx) => (
                  <TimeEvent
                    shortName={shortName}
                    time={time}
                    handleRemoveTime={handleRemoveTime}
                    handleEditTime={handleEditTime}
                    key={idx}
                    idx={idx}
                    control={control} // Pass control to TimeEvent
                  />
                ))}
              </div>
            ) : (
              <div className="flex w-[82%]">
                <p className="text-gray-500">Unavailable</p>
              </div>
            )}
          </div>

        </div>
      );
    },
  );
  
  export  default Available
