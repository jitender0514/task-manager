import React from "react";
import moment from "moment";
import { remainingHumanReadableTimeLeft } from "../../../../utils/common";

type Props = {
  timeLeft: number;
};

const RemainingOrOverdue: React.FC<Props> = ({ timeLeft }: Props) => {
  return (
    <>
      {timeLeft > 0 ? (
        <p className="mt-1 italic text-xs leading-5 text-gray-500">
          Remaining{" "}
          {remainingHumanReadableTimeLeft(
            moment().add(timeLeft, "seconds").format(), true
          )}
        </p>
      ) : (
        <p className="mt-1 italic text-xs leading-5 text-rose-500 font-bold">
          Time Overdue
        </p>
      )}
    </>
  );
};

export default RemainingOrOverdue;
