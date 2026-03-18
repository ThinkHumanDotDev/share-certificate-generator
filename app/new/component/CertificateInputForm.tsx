"use client";

import { CertificateCompanyForm } from "@/app/component/form/certificateCompany/certificateCompanyForm";
import { ShareholderDetailsForm } from "@/app/component/form/shareholderDetails/shareholderDetailsForm";
import { ShareDetailsForm } from "@/app/component/form/shareDetails/shareDetailsForm";
import { SignatoryDetailsForm } from "@/app/component/form/signatoryDetails/signatoryDetailsForm";
import { AppearanceForm } from "@/app/component/form/appearance/appearanceForm";
import { DownloadCertificateButton } from "@/app/component/form/downloadCertificate/downloadCertificateButton";
import { useGetValue } from "@/app/hooks/useGetValue";
import { getInitialValue } from "@/lib/getInitialValue";

export const CertificateInputForm = () => {
  const step = useGetValue("step", getInitialValue("step", "1"));

  return (
    <div>
      <div className={step === "1" ? "block" : "hidden"}>
        <CertificateCompanyForm />
      </div>
      <div className={step === "2" ? "block" : "hidden"}>
        <ShareholderDetailsForm />
      </div>
      <div className={step === "3" ? "block" : "hidden"}>
        <ShareDetailsForm />
      </div>
      <div className={step === "4" ? "block" : "hidden"}>
        <SignatoryDetailsForm />
      </div>
      <div className={step === "5" ? "block" : "hidden"}>
        <AppearanceForm />
      </div>
      {step === "6" && <DownloadCertificateButton />}
    </div>
  );
};
