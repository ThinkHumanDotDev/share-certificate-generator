import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import { CertificateTheme } from "@/lib/certificateThemes";

const EditCorners = () => (
  <>
    <ChevronDown className="animate-pulse w-5 h-5 text-primary rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
    <ChevronDown className="animate-pulse w-5 h-5 text-primary -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
    <ChevronDown className="animate-pulse w-5 h-5 text-primary rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
    <ChevronDown className="animate-pulse w-5 h-5 text-primary -rotate-45 group-hover:block hidden absolute bottom-0 right-0" />
  </>
);

const StubBrackets = ({ padLeft, padRight }: { padLeft?: boolean; padRight?: boolean }) => (
  <>
    <span className={`hidden group-hover:block pointer-events-none animate-pulse absolute inset-y-0 w-1.5 border-l border-y border-primary ${padLeft ? "-left-2" : "left-0"}`} />
    <span className={`hidden group-hover:block pointer-events-none animate-pulse absolute inset-y-0 w-1.5 border-r border-y border-primary ${padRight ? "-right-2" : "right-0"}`} />
  </>
);

type FormalLandscapeProps = {
  companyDetails: {
    certCompanyName: string;
    certCompanyRegNumber: string;
    certCompanyAddress: string;
    certCompanyCity: string;
    certCompanyState: string;
    certCompanyZip: string;
    certCompanyCountry: string;
    certCompanyLogo: string;
  };
  shareholderDetails: {
    shareholderName: string;
    shareholderAddress: string;
    shareholderCity: string;
    shareholderState: string;
    shareholderZip: string;
    shareholderCountry: string;
  };
  shareDetails: {
    certificateNumber: string;
    numberOfShares: string;
    shareClass: string;
    nominalValue: string;
    considerationPaid: string;
    shareIssueDate: string;
  };
  signatoryDetails: {
    director1Name: string;
    director2Name: string;
    secretaryName: string;
  };
  theme: CertificateTheme;
  onClick?: (step: string) => void;
};

const addressLine = (...parts: string[]) =>
  parts.filter(Boolean).join(", ");

const Placeholder = ({ w = "w-28" }: { w?: string }) => (
  <span
    className={`inline-block ${w} h-3 rounded-sm bg-neutral-100 align-middle mx-1`}
  />
);

const SigRow = ({
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
  theme,
}: {
  leftLabel?: string;
  leftValue?: string;
  rightLabel?: string;
  rightValue?: string;
  theme: CertificateTheme;
}) => (
  <div className="flex items-end gap-4 mb-1.5">
    <div className="flex items-end gap-1 flex-1">
      {leftLabel !== undefined && (
        <>
          <span className={`text-[9px] font-bold ${theme.valueColor} whitespace-nowrap`}>
            {leftLabel}
          </span>
          <div
            className={`flex-1 border-b ${theme.sigLineColor} mb-0.5`}
          >
            {leftValue && (
              <span className="text-[8px] text-neutral-500 pl-1">{leftValue}</span>
            )}
          </div>
        </>
      )}
    </div>
    {rightLabel !== undefined && (
      <div className="flex items-end gap-1 flex-1">
        <span className={`text-[9px] font-bold ${theme.valueColor} whitespace-nowrap`}>
          {rightLabel}
        </span>
        <div
          className={`flex-1 border-b ${theme.sigLineColor} mb-0.5`}
        >
          {rightValue && (
            <span className="text-[8px] text-neutral-500 pl-1">{rightValue}</span>
          )}
        </div>
      </div>
    )}
  </div>
);

export const FormalLandscapePreview = ({
  companyDetails,
  shareholderDetails,
  shareDetails,
  signatoryDetails,
  theme,
  onClick,
}: FormalLandscapeProps) => {
  const regAddress = addressLine(
    companyDetails.certCompanyAddress,
    companyDetails.certCompanyCity,
    companyDetails.certCompanyState,
    companyDetails.certCompanyZip
  );

  const shareholderAddr = addressLine(
    shareholderDetails.shareholderAddress,
    shareholderDetails.shareholderCity,
    shareholderDetails.shareholderState,
    shareholderDetails.shareholderZip,
    shareholderDetails.shareholderCountry
  );

  const issueDate = shareDetails.shareIssueDate
    ? format(shareDetails.shareIssueDate, "do MMM yyyy")
    : "";

  return (
    <div className={`w-[842px] flex flex-col ${theme.bg}`}>
      {/* ── Stub (metadata strip above the main cert) ── */}
      <div className="px-4 pt-3 pb-2">
        <div className="grid grid-cols-3 gap-2 text-[9px]">
          <div className="space-y-0.5">
            <p className="cursor-pointer relative group" onClick={() => onClick?.("1")}>
              {!!onClick && <StubBrackets padLeft />}
              <span className={`font-bold ${theme.valueColor}`}>
                Company Number:{" "}
              </span>
              {companyDetails.certCompanyRegNumber ? (
                <span className="text-neutral-500">
                  {companyDetails.certCompanyRegNumber}
                </span>
              ) : (
                <Placeholder w="w-20" />
              )}
            </p>
            <p className="cursor-pointer relative group" onClick={() => onClick?.("2")}>
              {!!onClick && <StubBrackets padLeft />}
              <span className={`font-bold ${theme.valueColor}`}>
                Shareholder:{" "}
              </span>
              {shareholderDetails.shareholderName ? (
                <span className="text-neutral-500">
                  {shareholderDetails.shareholderName}
                </span>
              ) : (
                <Placeholder w="w-24" />
              )}
            </p>
          </div>
          <div className="space-y-0.5 text-center">
            <p className="cursor-pointer relative group" onClick={() => onClick?.("3")}>
              {!!onClick && <StubBrackets />}
              <span className={`font-bold ${theme.valueColor}`}>Date: </span>
              {issueDate ? (
                <span className="text-neutral-500">{issueDate}</span>
              ) : (
                <Placeholder w="w-16" />
              )}
            </p>
          </div>
          <div className="space-y-0.5 text-right">
            <p className="cursor-pointer relative group" onClick={() => onClick?.("3")}>
              {!!onClick && <StubBrackets padRight />}
              <span className={`font-bold ${theme.valueColor}`}>
                Certificate No:{" "}
              </span>
              {shareDetails.certificateNumber ? (
                <span className="text-neutral-500">
                  {shareDetails.certificateNumber}
                </span>
              ) : (
                <Placeholder w="w-8" />
              )}
            </p>
            <p className="cursor-pointer relative group" onClick={() => onClick?.("3")}>
              {!!onClick && <StubBrackets padRight />}
              <span className={`font-bold ${theme.valueColor}`}>
                Number of Shares:{" "}
              </span>
              {shareDetails.numberOfShares ? (
                <span className="text-neutral-500">
                  {shareDetails.numberOfShares}
                </span>
              ) : (
                <Placeholder w="w-8" />
              )}
            </p>
          </div>
        </div>
        {/* Dashed separator */}
        <div className="border-b border-dashed border-neutral-400 mt-2" />
      </div>

      {/* ── Main certificate with double border ── */}
      <div className={`mx-3 mb-3 flex flex-col flex-1 ${theme.outerBorder} ${theme.rounded}`}>
        <div
          className={`flex flex-col flex-1 h-full ${theme.innerBorder}`}
          style={{ minHeight: 460 }}
        >
          {/* Company header — centered */}
          <div
            className="px-10 pt-5 pb-3 text-center cursor-pointer relative group"
            onClick={() => onClick?.("1")}
          >
            {!!onClick && <EditCorners />}
            {companyDetails.certCompanyName ? (
              <p
                className={`text-lg font-bold ${theme.headerAccent} leading-tight`}
              >
                {companyDetails.certCompanyName}
              </p>
            ) : (
              <div className="h-5 bg-neutral-100 rounded mx-auto w-56 animate-pulse" />
            )}
            <p className="text-[9px] text-neutral-500 mt-1">
              {regAddress || (
                <span className="inline-block w-40 h-2.5 bg-neutral-100 rounded animate-pulse" />
              )}
            </p>
            <p className="text-[9px] mt-0.5">
              <span className={`font-bold ${theme.valueColor}`}>
                Registered in{" "}
                {companyDetails.certCompanyCountry || "UNITED KINGDOM"}, Number{" "}
              </span>
              {companyDetails.certCompanyRegNumber ? (
                <span className="text-neutral-500">
                  {companyDetails.certCompanyRegNumber}
                </span>
              ) : (
                <Placeholder w="w-16" />
              )}
            </p>
          </div>

          {/* Three-column row: Cert No | Share Class | Quantity */}
          <div
            className={`grid grid-cols-3 ${theme.divider} border-t ${theme.divider.replace("border-b", "")} cursor-pointer mx-4 relative group`}
            onClick={() => onClick?.("3")}
          >
            {!!onClick && <EditCorners />}
            <div className={`py-2 px-4 text-center ${theme.innerBorderClass}`}>
              <p className={`text-[9px] font-bold ${theme.valueColor}`}>
                Certificate No
              </p>
              {shareDetails.certificateNumber ? (
                <p className="text-[9px] text-neutral-600 mt-0.5">
                  {shareDetails.certificateNumber}
                </p>
              ) : (
                <div className="h-3 bg-neutral-100 rounded mx-auto w-8 mt-1 animate-pulse" />
              )}
            </div>
            <div className={`py-2 px-4 text-center ${theme.innerBorderClass}`}>
              <p className={`text-[9px] font-bold ${theme.valueColor}`}>
                Share Class
              </p>
              <p className="text-[9px] text-neutral-600 mt-0.5">
                {shareDetails.shareClass || "ORDINARY"}
              </p>
            </div>
            <div className="py-2 px-4 text-center">
              <p className={`text-[9px] font-bold ${theme.valueColor}`}>
                Quantity
              </p>
              {shareDetails.numberOfShares ? (
                <p className="text-[9px] text-neutral-600 mt-0.5">
                  {shareDetails.numberOfShares}
                </p>
              ) : (
                <div className="h-3 bg-neutral-100 rounded mx-auto w-8 mt-1 animate-pulse" />
              )}
            </div>
          </div>

          {/* Certification body — centered */}
          <div
            className="flex-1 px-12 py-4 text-center cursor-pointer relative group"
            onClick={() => onClick?.("2")}
          >
            {!!onClick && <EditCorners />}
            <p className="text-[9px] text-neutral-600 mb-2">
              This is to certify that
            </p>
            {shareholderDetails.shareholderName ? (
              <p
                className={`text-[11px] font-semibold ${theme.valueColor} mb-1`}
              >
                {shareholderDetails.shareholderName}
              </p>
            ) : (
              <div className="h-4 bg-neutral-100 rounded mx-auto w-40 animate-pulse mb-1" />
            )}
            <p className="text-[9px] text-neutral-600 mb-1">of</p>
            {shareholderAddr ? (
              <p className="text-[9px] text-neutral-500 mb-3">{shareholderAddr}</p>
            ) : (
              <div className="h-3 bg-neutral-100 rounded mx-auto w-48 animate-pulse mb-3" />
            )}
            <p className="text-[9px] text-neutral-600 leading-relaxed max-w-xl mx-auto">
              is the registered holder of{" "}
              <span className={`font-semibold ${theme.valueColor}`}>
                {shareDetails.numberOfShares || (
                  <Placeholder w="w-6" />
                )}
              </span>{" "}
              <span className={`font-semibold ${theme.valueColor}`}>
                {shareDetails.shareClass || "ORDINARY"}
              </span>{" "}
              shares of{" "}
              <span className={`font-semibold ${theme.valueColor}`}>
                {shareDetails.nominalValue || "GBP1.00"}
              </span>{" "}
              each in the above-named Company, subject to the Memorandum and
              Articles of Association of the said Company. This certificate is
              executed by the Company in accordance with the Companies Act 2006.
            </p>
          </div>

          {/* Signatory section */}
          <div
            className={`px-10 pb-6 pt-3 cursor-pointer border-t ${theme.divider.replace("border-b", "")} relative group`}
            onClick={() => onClick?.("4")}
          >
            {!!onClick && <EditCorners />}
            <SigRow
              leftLabel="Director(s)"
              leftValue={signatoryDetails.director1Name}
              rightLabel={signatoryDetails.director2Name ? "" : undefined}
              rightValue={signatoryDetails.director2Name || undefined}
              theme={theme}
            />
            {signatoryDetails.secretaryName && (
              <SigRow
                leftLabel="Secretary"
                leftValue={signatoryDetails.secretaryName}
                theme={theme}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
