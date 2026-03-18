import CustomTextInput from "@/app/component/ui/customTextInput";
import ImageInput from "@/app/component/ui/imageInput";

export const CertificateCompanyForm = () => (
  <div className="pt-24">
    <p className="text-2xl font-semibold pb-3">Company Details</p>
    <p className="pb-6 text-xs font-medium text-neutral-500">
      Enter the details of the company issuing the share certificate.
    </p>
    <CustomTextInput
      label="Company Name"
      placeholder="Acme Holdings Ltd"
      variableName="certCompanyName"
    />
    <CustomTextInput
      label="Registration No."
      placeholder="12345678"
      variableName="certCompanyRegNumber"
    />
    <ImageInput label="Company Logo / Seal" variableName="certCompanyLogo" />
    <p className="pb-2 pt-6 text-sm font-medium text-neutral-500">
      Registered Address
    </p>
    <CustomTextInput
      label="Address"
      placeholder="123 Business Park"
      variableName="certCompanyAddress"
    />
    <CustomTextInput
      label="City"
      placeholder="London"
      variableName="certCompanyCity"
    />
    <CustomTextInput
      label="State / County"
      placeholder="England"
      variableName="certCompanyState"
    />
    <CustomTextInput
      label="Postcode / Zip"
      placeholder="EC1A 1BB"
      variableName="certCompanyZip"
    />
    <CustomTextInput
      label="Country"
      placeholder="United Kingdom"
      variableName="certCompanyCountry"
    />
  </div>
);
