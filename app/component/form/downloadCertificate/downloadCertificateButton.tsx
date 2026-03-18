"use client";

import { Button } from "@/components/ui/button";
import { Document, Page, pdf } from "@react-pdf/renderer";
import { CheckCircle2, Download, LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useCertificateData } from "@/app/hooks/useCertificateData";
import { CertificatePdf } from "@/app/component/form/downloadCertificate/certificatePdf";
import { saveAs } from "file-saver";

const APPEARANCE_KEYS = ["orientation", "certTheme", "certLayout"];
const FORM_KEYS = [
  "certCompanyName", "certCompanyRegNumber", "certCompanyAddress", "certCompanyCity",
  "certCompanyState", "certCompanyZip", "certCompanyCountry", "certCompanyLogo",
  "shareholderName", "shareholderEmail", "shareholderAddress", "shareholderCity",
  "shareholderState", "shareholderZip", "shareholderCountry",
  "certificateNumber", "numberOfShares", "shareClass", "nominalValue",
  "considerationPaid", "shareIssueDate", "director1Name", "director2Name", "secretaryName",
];

export const DownloadCertificateButton = () => {
  const [status, setStatus] = useState<
    "downloaded" | "downloading" | "not-downloaded"
  >("not-downloaded");
  const { reset, getValues } = useFormContext();
  const { companyDetails, shareholderDetails, shareDetails, signatoryDetails, appearance } =
    useCertificateData();

  const handleReset = () => {
    const currentValues = getValues();
    const preserved: Record<string, string> = {};
    APPEARANCE_KEYS.forEach((key) => {
      preserved[key] = currentValues[key] ?? localStorage.getItem(key) ?? "";
    });
    FORM_KEYS.forEach((key) => localStorage.removeItem(key));
    localStorage.setItem("step", "1");
    reset({ step: "1", ...preserved, ...Object.fromEntries(FORM_KEYS.map((k) => [k, ""])) });
  };

  useEffect(() => {
    if (status === "downloaded") {
      setTimeout(() => {
        setStatus("not-downloaded");
      }, 1000);
    }
  }, [status]);

  return (
    <div className="flex h-[calc(100vh-208px)] justify-center items-center">
      <div>
        <h1 className="text-3xl font-medium pb-6">
          Your certificate is ready
        </h1>
        <p className="text-neutral-500 text-xl pb-7">
          Please review the details carefully before downloading your share
          certificate.
        </p>
        <Button
          disabled={status === "downloading"}
          onClick={async () => {
            try {
              setStatus("downloading");
              const blob = await pdf(
                <Document>
                  <Page
                    size="A4"
                    orientation={
                      appearance.orientation === "landscape" ? "landscape" : "portrait"
                    }
                  >
                    <CertificatePdf
                      companyDetails={companyDetails}
                      shareholderDetails={shareholderDetails}
                      shareDetails={shareDetails}
                      signatoryDetails={signatoryDetails}
                      appearance={appearance}
                    />
                  </Page>
                </Document>
              ).toBlob();
              saveAs(
                blob,
                `share-certificate-${shareDetails.certificateNumber || "draft"}.pdf`
              );
              setStatus("downloaded");
            } catch (e) {
              console.error(e);
              setStatus("not-downloaded");
            }
          }}
          type="button"
          className="w-full h-12 rounded-lg text-lg"
        >
          {status === "not-downloaded" && (
            <>
              <Download className="mr-2 h-6 w-6" /> Download Certificate
            </>
          )}
          {status === "downloading" && (
            <>
              <LoaderIcon className="mr-2 h-6 w-6 animate-spin" />{" "}
              Downloading...
            </>
          )}
          {status === "downloaded" && (
            <>
              <CheckCircle2 className="mr-2 h-6 w-6" /> Downloaded
            </>
          )}
        </Button>
        <button
          type="button"
          onClick={handleReset}
          className="mt-3 w-full text-sm text-neutral-400 hover:text-neutral-600 transition-colors text-center"
        >
          Reset and start over
        </button>
      </div>
    </div>
  );
};
