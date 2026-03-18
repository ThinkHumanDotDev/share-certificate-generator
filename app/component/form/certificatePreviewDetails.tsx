import { CertificateCompanyPreview } from "@/app/component/form/certificateCompany/certificateCompanyPreview";
import { ShareholderDetailsPreview } from "@/app/component/form/shareholderDetails/shareholderDetailsPreview";
import { ShareDetailsPreview } from "@/app/component/form/shareDetails/shareDetailsPreview";
import { SignatoryDetailsPreview } from "@/app/component/form/signatoryDetails/signatoryDetailsPreview";
import { FormalLandscapePreview } from "@/app/component/form/certificateLayouts/FormalLandscapePreview";
import { ChevronDown } from "lucide-react";
import { getTheme, type CertificateTheme } from "@/lib/certificateThemes";

type CertificatePreviewDetailsProps = {
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
    shareholderEmail: string;
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
  appearance?: {
    orientation: string;
    certTheme: string;
    certLayout: string;
  };
  onClick?: (step: string) => void;
};

const EditCorners = () => (
  <>
    <ChevronDown className="animate-pulse w-5 h-5 text-primary rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
    <ChevronDown className="animate-pulse w-5 h-5 text-primary -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
    <ChevronDown className="animate-pulse w-5 h-5 text-primary rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
    <ChevronDown className="animate-pulse w-5 h-5 text-primary -rotate-45 group-hover:block hidden absolute bottom-0 right-0" />
  </>
);

// Wraps a section with the theme's double inner border (Classic theme only)
const InnerBorderWrap = ({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: CertificateTheme;
}) =>
  theme.innerBorder ? (
    <div className={`flex flex-col flex-1 ${theme.innerBorder}`}>{children}</div>
  ) : (
    <>{children}</>
  );

// ─── Portrait (standard) layout ───────────────────────────────────────────────

const PortraitPreview = ({
  companyDetails,
  shareholderDetails,
  shareDetails,
  signatoryDetails,
  theme,
  onClick,
}: Omit<CertificatePreviewDetailsProps, "appearance"> & {
  theme: CertificateTheme;
}) => (
  <div
    className={`w-[595px] min-h-[842px] flex flex-col ${theme.bg} ${theme.rounded} ${theme.outerBorder} ${theme.shadow}`}
  >
    <InnerBorderWrap theme={theme}>
      <div
        className={`${theme.sectionPadding} ${theme.divider} cursor-pointer relative group`}
        onClick={() => onClick && onClick("1")}
      >
        {!!onClick && <EditCorners />}
        <p
          className={`text-[9px] font-bold ${theme.labelTracking} uppercase ${theme.headerAccent} text-center mb-4`}
        >
          Share Certificate
        </p>
        <CertificateCompanyPreview {...companyDetails} />
      </div>

      <div
        className={`${theme.sectionPadding} ${theme.divider} cursor-pointer relative group`}
        onClick={() => onClick && onClick("2")}
      >
        {!!onClick && <EditCorners />}
        <p className={`${theme.bodyText} mb-4`}>
          This is to certify that the person named below is the registered
          holder of the shares described herein in{" "}
          <span className="font-semibold">
            {companyDetails.certCompanyName || "the Company"}
          </span>
          , subject to the articles of association of the Company.
        </p>
        <ShareholderDetailsPreview {...shareholderDetails} />
      </div>

      <div
        className={`${theme.sectionPadding} ${theme.divider} cursor-pointer relative group`}
        onClick={() => onClick && onClick("3")}
      >
        {!!onClick && <EditCorners />}
        <ShareDetailsPreview {...shareDetails} gridBorderClass={theme.gridBorder} />
      </div>

      <div
        className={`${theme.sectionPadding} cursor-pointer relative group flex-1 flex flex-col ${theme.id === "minimal" ? "justify-end" : ""}`}
        onClick={() => onClick && onClick("4")}
      >
        {!!onClick && <EditCorners />}
        <SignatoryDetailsPreview
          {...signatoryDetails}
          sigLineClass={theme.sigLineColor}
        />
      </div>
    </InnerBorderWrap>
  </div>
);

// ─── Landscape (standard) layout ──────────────────────────────────────────────

const LandscapeStandardPreview = ({
  companyDetails,
  shareholderDetails,
  shareDetails,
  signatoryDetails,
  theme,
  onClick,
}: Omit<CertificatePreviewDetailsProps, "appearance"> & {
  theme: CertificateTheme;
}) => (
  <div
    className={`w-[842px] min-h-[595px] flex flex-col ${theme.bg} ${theme.rounded} ${theme.outerBorder} ${theme.shadow}`}
  >
    <InnerBorderWrap theme={theme}>
      <div
        className={`${theme.sectionPadding} ${theme.divider} cursor-pointer relative group`}
        onClick={() => onClick && onClick("1")}
      >
        {!!onClick && <EditCorners />}
        <p
          className={`text-[9px] font-bold ${theme.labelTracking} uppercase ${theme.headerAccent} text-center mb-3`}
        >
          Share Certificate
        </p>
        <CertificateCompanyPreview {...companyDetails} />
      </div>

      <div className="flex flex-1">
        <div className={`flex-1 flex flex-col ${theme.innerBorderClass}`}>
          <div
            className={`${theme.sectionPadding} ${theme.divider} cursor-pointer relative group flex-1`}
            onClick={() => onClick && onClick("2")}
          >
            {!!onClick && <EditCorners />}
            <p className={`${theme.bodyText} mb-4`}>
              This is to certify that the person named below is the registered
              holder of the shares described herein in{" "}
              <span className="font-semibold">
                {companyDetails.certCompanyName || "the Company"}
              </span>
              , subject to the articles of association of the Company.
            </p>
            <ShareholderDetailsPreview {...shareholderDetails} />
          </div>

          <div
            className={`${theme.sectionPadding} cursor-pointer relative group`}
            onClick={() => onClick && onClick("4")}
          >
            {!!onClick && <EditCorners />}
            <SignatoryDetailsPreview
              {...signatoryDetails}
              sigLineClass={theme.sigLineColor}
            />
          </div>
        </div>

        <div
          className={`flex-1 ${theme.sectionPadding} cursor-pointer relative group flex flex-col justify-center`}
          onClick={() => onClick && onClick("3")}
        >
          {!!onClick && <EditCorners />}
          <ShareDetailsPreview {...shareDetails} gridBorderClass={theme.gridBorder} />
        </div>
      </div>
    </InnerBorderWrap>
  </div>
);

// ─── Main export ──────────────────────────────────────────────────────────────

export const CertificatePreviewDetails = ({
  companyDetails,
  shareholderDetails,
  shareDetails,
  signatoryDetails,
  appearance,
  onClick,
}: CertificatePreviewDetailsProps) => {
  const theme = getTheme(appearance?.certTheme ?? "minimal");
  const orientation = appearance?.orientation ?? "portrait";
  const layout = appearance?.certLayout ?? "standard";

  const sharedProps = {
    companyDetails,
    shareholderDetails,
    shareDetails,
    signatoryDetails,
    theme,
    onClick,
  };

  let content: React.ReactNode;

  if (orientation === "landscape" && layout === "formal") {
    content = <FormalLandscapePreview {...sharedProps} />;
  } else if (orientation === "landscape") {
    content = <LandscapeStandardPreview {...sharedProps} />;
  } else {
    content = <PortraitPreview {...sharedProps} />;
  }

  return <div className="overflow-x-auto text-neutral-900">{content}</div>;
};
