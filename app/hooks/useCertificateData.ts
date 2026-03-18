import { useGetValue } from "@/app/hooks/useGetValue";

export const useCertificateData = () => {
  const certCompanyName = useGetValue("certCompanyName");
  const certCompanyRegNumber = useGetValue("certCompanyRegNumber");
  const certCompanyAddress = useGetValue("certCompanyAddress");
  const certCompanyCity = useGetValue("certCompanyCity");
  const certCompanyState = useGetValue("certCompanyState");
  const certCompanyZip = useGetValue("certCompanyZip");
  const certCompanyCountry = useGetValue("certCompanyCountry");
  const certCompanyLogo = useGetValue("certCompanyLogo");

  const shareholderName = useGetValue("shareholderName");
  const shareholderEmail = useGetValue("shareholderEmail");
  const shareholderAddress = useGetValue("shareholderAddress");
  const shareholderCity = useGetValue("shareholderCity");
  const shareholderState = useGetValue("shareholderState");
  const shareholderZip = useGetValue("shareholderZip");
  const shareholderCountry = useGetValue("shareholderCountry");

  const certificateNumber = useGetValue("certificateNumber");
  const numberOfShares = useGetValue("numberOfShares");
  const shareClass = useGetValue("shareClass");
  const nominalValue = useGetValue("nominalValue");
  const considerationPaid = useGetValue("considerationPaid");
  const shareIssueDate = useGetValue("shareIssueDate");

  const director1Name = useGetValue("director1Name");
  const director2Name = useGetValue("director2Name");
  const secretaryName = useGetValue("secretaryName");

  const orientation = useGetValue("orientation", "portrait");
  const certTheme = useGetValue("certTheme", "minimal");
  const certLayout = useGetValue("certLayout", "standard");

  return {
    companyDetails: {
      certCompanyName,
      certCompanyRegNumber,
      certCompanyAddress,
      certCompanyCity,
      certCompanyState,
      certCompanyZip,
      certCompanyCountry,
      certCompanyLogo,
    },
    shareholderDetails: {
      shareholderName,
      shareholderEmail,
      shareholderAddress,
      shareholderCity,
      shareholderState,
      shareholderZip,
      shareholderCountry,
    },
    shareDetails: {
      certificateNumber,
      numberOfShares,
      shareClass,
      nominalValue,
      considerationPaid,
      shareIssueDate,
    },
    signatoryDetails: {
      director1Name,
      director2Name,
      secretaryName,
    },
    appearance: {
      orientation,
      certTheme,
      certLayout,
    },
  };
};
