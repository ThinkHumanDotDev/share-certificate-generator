import CustomTextInput from "@/app/component/ui/customTextInput";

export const SignatoryDetailsForm = () => (
  <div className="pt-24">
    <p className="text-2xl font-semibold pb-3">Signatories</p>
    <p className="pb-6 text-xs font-medium text-neutral-500">
      Enter the names of the directors and/or company secretary who will sign
      the certificate.
    </p>
    <CustomTextInput
      label="Director 1"
      placeholder="John Smith"
      variableName="director1Name"
    />
    <CustomTextInput
      label="Director 2"
      placeholder="Optional"
      variableName="director2Name"
    />
    <CustomTextInput
      label="Company Secretary"
      placeholder="Optional"
      variableName="secretaryName"
    />
  </div>
);
