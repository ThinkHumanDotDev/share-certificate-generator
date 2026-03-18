import { format } from "date-fns";
import React from "react";

type ShareDetails = {
  certificateNumber: string;
  numberOfShares: string;
  shareClass: string;
  nominalValue: string;
  considerationPaid: string;
  shareIssueDate: string;
  gridBorderClass?: string;
};

export const ShareDetailsPreview: React.FC<ShareDetails> = ({
  certificateNumber,
  numberOfShares,
  shareClass,
  nominalValue,
  considerationPaid,
  shareIssueDate,
  gridBorderClass = "border border-dashed border-neutral-200 rounded-lg",
}) => (
  <div>
    <div className="flex justify-between items-start mb-3">
      <div>
        <p className="text-[11px] text-neutral-400 font-semibold uppercase">
          Certificate No.
        </p>
        {certificateNumber ? (
          <p className="font-semibold text-xs">{certificateNumber}</p>
        ) : (
          <div className="rounded-md bg-neutral-100 h-3 w-16 animate-pulse mt-1" />
        )}
      </div>
      <div className="text-right">
        <p className="text-[11px] text-neutral-400 font-semibold uppercase">
          Issue Date
        </p>
        {shareIssueDate ? (
          <p className="font-semibold text-xs">
            {format(shareIssueDate, "do MMM yyyy")}
          </p>
        ) : (
          <div className="rounded-md bg-neutral-100 h-3 w-20 animate-pulse mt-1 ml-auto" />
        )}
      </div>
    </div>

    <div className={`${gridBorderClass} overflow-hidden mt-2`}>
      <div className="grid grid-cols-2 divide-x divide-dashed divide-neutral-200">
        <div className="p-2">
          <p className="text-[9px] text-neutral-400 font-semibold uppercase">
            Shares
          </p>
          {numberOfShares ? (
            <p className="font-semibold text-xs">{numberOfShares}</p>
          ) : (
            <div className="rounded-md bg-neutral-100 h-3 w-12 animate-pulse mt-1" />
          )}
        </div>
        <div className="p-2">
          <p className="text-[9px] text-neutral-400 font-semibold uppercase">
            Class
          </p>
          {shareClass ? (
            <p className="font-semibold text-xs">{shareClass}</p>
          ) : (
            <div className="rounded-md bg-neutral-100 h-3 w-14 animate-pulse mt-1" />
          )}
        </div>
        <div className="p-2">
          <p className="text-[9px] text-neutral-400 font-semibold uppercase">
            Nominal Value
          </p>
          {nominalValue ? (
            <p className="font-semibold text-xs">{nominalValue}</p>
          ) : (
            <div className="rounded-md bg-neutral-100 h-3 w-16 animate-pulse mt-1" />
          )}
        </div>
        <div className="p-2">
          <p className="text-[9px] text-neutral-400 font-semibold uppercase">
            Consideration
          </p>
          {considerationPaid ? (
            <p className="font-semibold text-xs">{considerationPaid}</p>
          ) : (
            <div className="rounded-md bg-neutral-100 h-3 w-16 animate-pulse mt-1" />
          )}
        </div>
      </div>
    </div>
  </div>
);
