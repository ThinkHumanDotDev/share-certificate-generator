import CustomTextInput from "@/app/component/ui/customTextInput";

export const ShareholderDetailsForm = () => (
  <div className="pt-24">
    <p className="text-2xl font-semibold pb-3">Shareholder Details</p>
    <p className="pb-6 text-xs font-medium text-neutral-500">
      Enter the details of the person or entity receiving the shares.
    </p>
    <CustomTextInput
      label="Full Name"
      placeholder="Jane Smith"
      variableName="shareholderName"
    />
    <CustomTextInput
      label="Email"
      placeholder="jane@example.com"
      variableName="shareholderEmail"
    />
    <p className="pb-2 pt-6 text-sm font-medium text-neutral-500">Address</p>
    <CustomTextInput
      label="Address"
      placeholder="456 Shareholder Lane"
      variableName="shareholderAddress"
    />
    <CustomTextInput
      label="City"
      placeholder="Manchester"
      variableName="shareholderCity"
    />
    <CustomTextInput
      label="State / County"
      placeholder="Greater Manchester"
      variableName="shareholderState"
    />
    <CustomTextInput
      label="Postcode / Zip"
      placeholder="M1 1AE"
      variableName="shareholderZip"
    />
    <CustomTextInput
      label="Country"
      placeholder="United Kingdom"
      variableName="shareholderCountry"
    />
  </div>
);
