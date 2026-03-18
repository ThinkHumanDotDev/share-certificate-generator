"use client";
import CustomTextInput from "@/app/component/ui/customTextInput";
import CustomNumberInput from "@/app/component/ui/customNumberInput";
import DateInput from "@/app/component/ui/dateInput";

export const ShareDetailsForm = () => (
  <div className="pt-24">
    <p className="text-2xl font-semibold pb-3">Share Details</p>
    <p className="pb-6 text-xs font-medium text-neutral-500">
      Enter the details of the shares being certificated.
    </p>
    <CustomTextInput
      label="Certificate No."
      placeholder="SC-001"
      variableName="certificateNumber"
    />
    <CustomNumberInput
      label="Number of Shares"
      placeholder="1,000"
      variableName="numberOfShares"
    />
    <CustomTextInput
      label="Class of Shares"
      placeholder="Ordinary"
      variableName="shareClass"
    />
    <CustomTextInput
      label="Nominal Value"
      placeholder="£0.001 per share"
      variableName="nominalValue"
    />
    <CustomTextInput
      label="Consideration Paid"
      placeholder="£1,000.00"
      variableName="considerationPaid"
    />
    <DateInput label="Issue Date" variableName="shareIssueDate" />
  </div>
);
