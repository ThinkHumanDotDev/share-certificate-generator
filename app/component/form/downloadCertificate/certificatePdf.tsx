import { View, Text, Image, Font } from "@react-pdf/renderer";
import { format } from "date-fns";

Font.register({
  family: "Geist",
  fonts: [
    { src: "/font/Geist-Light.ttf", fontWeight: "light" },
    { src: "/font/Geist-Regular.ttf", fontWeight: "normal" },
    { src: "/font/Geist-Medium.ttf", fontWeight: "medium" },
    { src: "/font/Geist-SemiBold.ttf", fontWeight: "semibold" },
    { src: "/font/Geist-Bold.ttf", fontWeight: "bold" },
  ],
});

// ─── PDF Theme tokens ─────────────────────────────────────────────────────────

type PdfTheme = {
  id: string;
  outerBorderColor: string;
  outerBorderStyle: "dashed" | "solid";
  outerBorderWidth: number;
  innerBorderColor: string;
  innerBorderWidth: number;
  dividerColor: string;
  dividerStyle: "dashed" | "solid";
  labelColor: string;
  valueColor: string;
  bodyColor: string;
  sigLineColor: string;
  headerAccentColor: string;
  gridBorderColor: string;
  gridBorderStyle: "dashed" | "solid";
  columnBorderColor: string;
};

const pdfThemes: Record<string, PdfTheme> = {
  minimal: {
    id: "minimal",
    outerBorderColor: "#e5e7eb",
    outerBorderStyle: "dashed",
    outerBorderWidth: 1,
    innerBorderColor: "transparent",
    innerBorderWidth: 0,
    dividerColor: "#e5e7eb",
    dividerStyle: "dashed",
    labelColor: "#9ca3af",
    valueColor: "#111827",
    bodyColor: "#374151",
    sigLineColor: "#9ca3af",
    headerAccentColor: "#9ca3af",
    gridBorderColor: "#e5e7eb",
    gridBorderStyle: "dashed",
    columnBorderColor: "#e5e7eb",
  },
  "new-york": {
    id: "new-york",
    outerBorderColor: "#e5e7eb",
    outerBorderStyle: "solid",
    outerBorderWidth: 1,
    innerBorderColor: "transparent",
    innerBorderWidth: 0,
    dividerColor: "#e5e7eb",
    dividerStyle: "solid",
    labelColor: "#6b7280",
    valueColor: "#111111",
    bodyColor: "#4b5563",
    sigLineColor: "#9ca3af",
    headerAccentColor: "#4b5563",
    gridBorderColor: "#e5e7eb",
    gridBorderStyle: "solid",
    columnBorderColor: "#e5e7eb",
  },
  classic: {
    id: "classic",
    outerBorderColor: "#1e3169",
    outerBorderStyle: "solid",
    outerBorderWidth: 3,
    innerBorderColor: "#1e3169",
    innerBorderWidth: 1,
    dividerColor: "#bbc1d2",
    dividerStyle: "solid",
    labelColor: "#1e3169",
    valueColor: "#111827",
    bodyColor: "#374151",
    sigLineColor: "#374151",
    headerAccentColor: "#1e3169",
    gridBorderColor: "#a5acc3",
    gridBorderStyle: "solid",
    columnBorderColor: "#bbc1d2",
  },
};

const getPdfTheme = (id: string): PdfTheme =>
  pdfThemes[id] ?? pdfThemes.minimal;

// ─── Types ────────────────────────────────────────────────────────────────────

type CompanyDetails = {
  certCompanyName: string;
  certCompanyRegNumber: string;
  certCompanyAddress: string;
  certCompanyCity: string;
  certCompanyState: string;
  certCompanyZip: string;
  certCompanyCountry: string;
  certCompanyLogo: string;
};

type ShareholderDetails = {
  shareholderName: string;
  shareholderEmail: string;
  shareholderAddress: string;
  shareholderCity: string;
  shareholderState: string;
  shareholderZip: string;
  shareholderCountry: string;
};

type ShareDetails = {
  certificateNumber: string;
  numberOfShares: string;
  shareClass: string;
  nominalValue: string;
  considerationPaid: string;
  shareIssueDate: string;
};

type SignatoryDetails = {
  director1Name: string;
  director2Name: string;
  secretaryName: string;
};

export type CertificatePdfProps = {
  companyDetails: CompanyDetails;
  shareholderDetails: ShareholderDetails;
  shareDetails: ShareDetails;
  signatoryDetails: SignatoryDetails;
  appearance?: {
    orientation: string;
    certTheme: string;
    certLayout: string;
  };
};

type SharedProps = Omit<CertificatePdfProps, "appearance"> & {
  theme: PdfTheme;
};

// ─── Shared sub-components ────────────────────────────────────────────────────

const addrLine = (...parts: string[]) => parts.filter(Boolean).join(", ");

const Label = ({ children, theme }: { children: string; theme: PdfTheme }) => (
  <Text
    style={{
      fontSize: 7,
      fontWeight: "semibold",
      color: theme.labelColor,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 2,
      fontFamily: "Geist",
    }}
  >
    {children}
  </Text>
);

const Value = ({ children, theme }: { children: string; theme: PdfTheme }) => (
  <Text
    style={{
      fontSize: 9,
      fontWeight: "medium",
      color: theme.valueColor,
      fontFamily: "Geist",
    }}
  >
    {children}
  </Text>
);

const Divider = ({ theme }: { theme: PdfTheme }) => (
  <View
    style={{
      borderBottomWidth: 1,
      borderBottomColor: theme.dividerColor,
      borderStyle: theme.dividerStyle,
      marginVertical: 16,
    }}
  />
);

const CompanyHeader = ({
  companyDetails,
  theme,
}: {
  companyDetails: CompanyDetails;
  theme: PdfTheme;
}) => (
  <View
    style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}
  >
    <View style={{ flex: 1 }}>
      <Text
        style={{ fontSize: 14, fontWeight: "bold", color: theme.valueColor, fontFamily: "Geist" }}
      >
        {companyDetails.certCompanyName}
      </Text>
      {companyDetails.certCompanyRegNumber ? (
        <Text style={{ fontSize: 8, color: "#6b7280", marginTop: 2, fontFamily: "Geist" }}>
          Reg. No. {companyDetails.certCompanyRegNumber}
        </Text>
      ) : null}
      {companyDetails.certCompanyAddress ? (
        <Text style={{ fontSize: 8, color: "#6b7280", marginTop: 2, fontFamily: "Geist" }}>
          {addrLine(
            companyDetails.certCompanyAddress,
            companyDetails.certCompanyCity,
            companyDetails.certCompanyState,
            companyDetails.certCompanyZip,
            companyDetails.certCompanyCountry
          )}
        </Text>
      ) : null}
    </View>
    {companyDetails.certCompanyLogo ? (
      // eslint-disable-next-line jsx-a11y/alt-text
      <Image
        src={companyDetails.certCompanyLogo}
        style={{ width: 48, height: 48, borderRadius: 4 }}
      />
    ) : null}
  </View>
);

const ShareGrid = ({
  shareDetails,
  theme,
}: {
  shareDetails: ShareDetails;
  theme: PdfTheme;
}) => {
  const cells = [
    { label: "Number of Shares", value: shareDetails.numberOfShares },
    { label: "Class", value: shareDetails.shareClass },
    { label: "Nominal Value", value: shareDetails.nominalValue },
    { label: "Consideration", value: shareDetails.considerationPaid },
  ];
  return (
    <View
      style={{
        flexDirection: "row",
        borderWidth: 1,
        borderColor: theme.gridBorderColor,
        borderStyle: theme.gridBorderStyle,
        borderRadius: 4,
        marginBottom: 24,
      }}
    >
      {cells.map((cell, i) => (
        <View
          key={i}
          style={{
            flex: 1,
            padding: 8,
            borderRightWidth: i < cells.length - 1 ? 1 : 0,
            borderRightColor: theme.gridBorderColor,
            borderStyle: theme.gridBorderStyle,
          }}
        >
          <Label theme={theme}>{cell.label}</Label>
          <Value theme={theme}>{cell.value}</Value>
        </View>
      ))}
    </View>
  );
};

const Signatories = ({
  signatoryDetails,
  theme,
}: {
  signatoryDetails: SignatoryDetails;
  theme: PdfTheme;
}) => {
  const sigs = [
    { name: signatoryDetails.director1Name, role: "Director" },
    { name: signatoryDetails.director2Name, role: "Director" },
    { name: signatoryDetails.secretaryName, role: "Secretary" },
  ].filter((s) => s.name);

  return (
    <View style={{ flexDirection: "row", gap: 24 }}>
      {sigs.map((s, i) => (
        <View key={i} style={{ alignItems: "center" }}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: theme.sigLineColor,
              borderStyle: "dashed",
              width: 80,
              marginBottom: 4,
            }}
          />
          <Text
            style={{
              fontSize: 8,
              fontWeight: "medium",
              color: theme.valueColor,
              marginTop: 2,
              fontFamily: "Geist",
            }}
          >
            {s.name}
          </Text>
          <Text
            style={{
              fontSize: 7,
              color: theme.labelColor,
              textTransform: "uppercase",
              fontFamily: "Geist",
            }}
          >
            {s.role}
          </Text>
        </View>
      ))}
    </View>
  );
};

// ─── Portrait Standard ────────────────────────────────────────────────────────

const PortraitStandardPdf = ({
  companyDetails,
  shareholderDetails,
  shareDetails,
  signatoryDetails,
  theme,
}: SharedProps) => {
  const issueDate = shareDetails.shareIssueDate
    ? format(shareDetails.shareIssueDate, "do MMM yyyy")
    : "";

  const isMinimal = theme.id === "minimal";

  const upperContent = (
    <View>
      <Text
        style={{
          fontSize: 8,
          fontWeight: "semibold",
          color: theme.headerAccentColor,
          textTransform: "uppercase",
          letterSpacing: 2,
          textAlign: "center",
          marginBottom: 20,
          fontFamily: "Geist",
        }}
      >
        Share Certificate
      </Text>

      <CompanyHeader companyDetails={companyDetails} theme={theme} />
      <Divider theme={theme} />

      <Text
        style={{
          fontSize: 9,
          color: theme.bodyColor,
          lineHeight: 1.6,
          marginBottom: 12,
          fontFamily: "Geist",
        }}
      >
        This is to certify that the person named below is the registered holder
        of the shares described herein in{" "}
        <Text style={{ fontWeight: "semibold" }}>
          {companyDetails.certCompanyName || "the Company"}
        </Text>
        , subject to the articles of association of the Company.
      </Text>

      <Label theme={theme}>Registered Holder</Label>
      <Text
        style={{
          fontSize: 11,
          fontWeight: "semibold",
          color: theme.valueColor,
          marginBottom: 2,
          fontFamily: "Geist",
        }}
      >
        {shareholderDetails.shareholderName}
      </Text>
      {shareholderDetails.shareholderEmail ? (
        <Text
          style={{ fontSize: 8, color: "#6b7280", marginBottom: 2, fontFamily: "Geist" }}
        >
          {shareholderDetails.shareholderEmail}
        </Text>
      ) : null}
      {shareholderDetails.shareholderAddress ? (
        <Text
          style={{ fontSize: 8, color: "#6b7280", marginBottom: 12, fontFamily: "Geist" }}
        >
          {addrLine(
            shareholderDetails.shareholderAddress,
            shareholderDetails.shareholderCity,
            shareholderDetails.shareholderState,
            shareholderDetails.shareholderZip,
            shareholderDetails.shareholderCountry
          )}
        </Text>
      ) : (
        <View style={{ marginBottom: 12 }} />
      )}

      <Divider theme={theme} />

      <View
        style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}
      >
        <View>
          <Label theme={theme}>Certificate No.</Label>
          <Value theme={theme}>{shareDetails.certificateNumber}</Value>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Label theme={theme}>Issue Date</Label>
          <Value theme={theme}>{issueDate}</Value>
        </View>
      </View>

      <ShareGrid shareDetails={shareDetails} theme={theme} />
    </View>
  );

  const lowerContent = (
    <View>
      <Divider theme={theme} />
      <Label theme={theme}>Signed on behalf of the Company</Label>
      <View style={{ marginTop: 12 }}>
        <Signatories signatoryDetails={signatoryDetails} theme={theme} />
      </View>
    </View>
  );

  // Wrap content — for minimal, use space-between to push signatories to bottom
  const innerContent = (
    <View
      style={{
        flex: 1,
        padding: 40,
        fontFamily: "Geist",
        fontSize: 10,
        justifyContent: isMinimal ? "space-between" : "flex-start",
      }}
    >
      {upperContent}
      {lowerContent}
    </View>
  );

  // height: "100%" resolves against the Page's fixed A4 height (842pt).
  // padding: 16 insets the border rather than using margin (which would overflow).
  return (
    <View style={{ height: "100%", padding: 16 }}>
      <View
        style={{
          flex: 1,
          borderWidth: theme.outerBorderWidth,
          borderColor: theme.outerBorderColor,
          borderStyle: theme.outerBorderStyle,
        }}
      >
        {theme.innerBorderWidth > 0 ? (
          <View
            style={{
              flex: 1,
              margin: 8,
              borderWidth: theme.innerBorderWidth,
              borderColor: theme.innerBorderColor,
              borderStyle: "solid",
            }}
          >
            {innerContent}
          </View>
        ) : (
          innerContent
        )}
      </View>
    </View>
  );
};

// ─── Landscape Standard ───────────────────────────────────────────────────────

const LandscapeStandardPdf = ({
  companyDetails,
  shareholderDetails,
  shareDetails,
  signatoryDetails,
  theme,
}: SharedProps) => {
  const content = (
    <View style={{ flex: 1, fontFamily: "Geist", fontSize: 10 }}>
      {/* Header */}
      <View
        style={{
          padding: 32,
          borderBottomWidth: 1,
          borderBottomColor: theme.dividerColor,
          borderStyle: theme.dividerStyle,
        }}
      >
        <Text
          style={{
            fontSize: 8,
            fontWeight: "semibold",
            color: theme.headerAccentColor,
            textTransform: "uppercase",
            letterSpacing: 2,
            textAlign: "center",
            marginBottom: 16,
            fontFamily: "Geist",
          }}
        >
          Share Certificate
        </Text>
        <CompanyHeader companyDetails={companyDetails} theme={theme} />
      </View>

      {/* Two-column body */}
      <View style={{ flexDirection: "row", flex: 1 }}>
        {/* Left column: shareholder + signatories */}
        <View
          style={{
            flex: 1,
            borderRightWidth: 1,
            borderRightColor: theme.columnBorderColor,
            borderStyle: theme.dividerStyle,
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 32,
              borderBottomWidth: 1,
              borderBottomColor: theme.dividerColor,
              borderStyle: theme.dividerStyle,
            }}
          >
            <Text
              style={{
                fontSize: 9,
                color: theme.bodyColor,
                lineHeight: 1.6,
                marginBottom: 12,
                fontFamily: "Geist",
              }}
            >
              This is to certify that the person named below is the registered
              holder of the shares described herein in{" "}
              <Text style={{ fontWeight: "semibold" }}>
                {companyDetails.certCompanyName || "the Company"}
              </Text>
              , subject to the articles of association of the Company.
            </Text>

            <Label theme={theme}>Registered Holder</Label>
            <Text
              style={{
                fontSize: 11,
                fontWeight: "semibold",
                color: theme.valueColor,
                marginBottom: 2,
                fontFamily: "Geist",
              }}
            >
              {shareholderDetails.shareholderName}
            </Text>
            {shareholderDetails.shareholderEmail ? (
              <Text
                style={{ fontSize: 8, color: "#6b7280", marginBottom: 2, fontFamily: "Geist" }}
              >
                {shareholderDetails.shareholderEmail}
              </Text>
            ) : null}
            {shareholderDetails.shareholderAddress ? (
              <Text style={{ fontSize: 8, color: "#6b7280", fontFamily: "Geist" }}>
                {addrLine(
                  shareholderDetails.shareholderAddress,
                  shareholderDetails.shareholderCity,
                  shareholderDetails.shareholderState,
                  shareholderDetails.shareholderZip,
                  shareholderDetails.shareholderCountry
                )}
              </Text>
            ) : null}
          </View>

          <View style={{ padding: 32 }}>
            <Signatories signatoryDetails={signatoryDetails} theme={theme} />
          </View>
        </View>

        {/* Right column: share details */}
        <View
          style={{ flex: 1, padding: 32, justifyContent: "center" }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}
          >
            <View>
              <Label theme={theme}>Certificate No.</Label>
              <Value theme={theme}>{shareDetails.certificateNumber}</Value>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Label theme={theme}>Issue Date</Label>
              <Value theme={theme}>
                {shareDetails.shareIssueDate
                  ? format(shareDetails.shareIssueDate, "do MMM yyyy")
                  : ""}
              </Value>
            </View>
          </View>
          <ShareGrid shareDetails={shareDetails} theme={theme} />
        </View>
      </View>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        margin: 16,
        borderWidth: theme.outerBorderWidth,
        borderColor: theme.outerBorderColor,
        borderStyle: theme.outerBorderStyle,
      }}
    >
      {theme.innerBorderWidth > 0 ? (
        <View
          style={{
            flex: 1,
            margin: 8,
            borderWidth: theme.innerBorderWidth,
            borderColor: theme.innerBorderColor,
            borderStyle: "solid",
          }}
        >
          {content}
        </View>
      ) : (
        content
      )}
    </View>
  );
};

// ─── Landscape Formal ─────────────────────────────────────────────────────────

const LandscapeFormalPdf = ({
  companyDetails,
  shareholderDetails,
  shareDetails,
  signatoryDetails,
  theme,
}: SharedProps) => {
  const issueDate = shareDetails.shareIssueDate
    ? format(shareDetails.shareIssueDate, "do MMM yyyy")
    : "";

  const regAddress = addrLine(
    companyDetails.certCompanyAddress,
    companyDetails.certCompanyCity,
    companyDetails.certCompanyState,
    companyDetails.certCompanyZip
  );

  const shareholderAddr = addrLine(
    shareholderDetails.shareholderAddress,
    shareholderDetails.shareholderCity,
    shareholderDetails.shareholderState,
    shareholderDetails.shareholderZip,
    shareholderDetails.shareholderCountry
  );

  const sigs = [
    { name: signatoryDetails.director1Name, role: "Director" },
    { name: signatoryDetails.director2Name, role: "Director" },
    { name: signatoryDetails.secretaryName, role: "Secretary" },
  ].filter((s) => s.name);

  return (
    <View style={{ flex: 1, margin: 16, fontFamily: "Geist", fontSize: 9 }}>
      {/* Stub strip */}
      <View style={{ paddingHorizontal: 8, paddingTop: 8, paddingBottom: 6 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {/* Left */}
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: "Geist" }}>
              <Text style={{ fontWeight: "bold", color: theme.valueColor }}>Company Number: </Text>
              <Text style={{ color: "#6b7280" }}>{companyDetails.certCompanyRegNumber}</Text>
            </Text>
            <Text style={{ marginTop: 2, fontFamily: "Geist" }}>
              <Text style={{ fontWeight: "bold", color: theme.valueColor }}>Shareholder: </Text>
              <Text style={{ color: "#6b7280" }}>{shareholderDetails.shareholderName}</Text>
            </Text>
          </View>
          {/* Center */}
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontFamily: "Geist" }}>
              <Text style={{ fontWeight: "bold", color: theme.valueColor }}>Date: </Text>
              <Text style={{ color: "#6b7280" }}>{issueDate}</Text>
            </Text>
          </View>
          {/* Right */}
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Text style={{ fontFamily: "Geist" }}>
              <Text style={{ fontWeight: "bold", color: theme.valueColor }}>Certificate No: </Text>
              <Text style={{ color: "#6b7280" }}>{shareDetails.certificateNumber}</Text>
            </Text>
            <Text style={{ marginTop: 2, fontFamily: "Geist" }}>
              <Text style={{ fontWeight: "bold", color: theme.valueColor }}>Number of Shares: </Text>
              <Text style={{ color: "#6b7280" }}>{shareDetails.numberOfShares}</Text>
            </Text>
          </View>
        </View>
        {/* Stub separator */}
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#9ca3af",
            borderStyle: "dashed",
            marginTop: 8,
          }}
        />
      </View>

      {/* Main certificate */}
      <View
        style={{
          flex: 1,
          marginHorizontal: 8,
          marginBottom: 8,
          borderWidth: theme.outerBorderWidth,
          borderColor: theme.outerBorderColor,
          borderStyle: theme.outerBorderStyle,
        }}
      >
        <View
          style={
            theme.innerBorderWidth > 0
              ? {
                  flex: 1,
                  margin: 6,
                  borderWidth: theme.innerBorderWidth,
                  borderColor: theme.innerBorderColor,
                  borderStyle: "solid",
                }
              : { flex: 1 }
          }
        >
          {/* Centered company header */}
          <View
            style={{
              paddingHorizontal: 40,
              paddingTop: 16,
              paddingBottom: 8,
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: theme.dividerColor,
              borderStyle: theme.dividerStyle,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: theme.headerAccentColor,
                fontFamily: "Geist",
              }}
            >
              {companyDetails.certCompanyName}
            </Text>
            {regAddress ? (
              <Text style={{ fontSize: 8, color: "#6b7280", marginTop: 2, fontFamily: "Geist" }}>
                {regAddress}
              </Text>
            ) : null}
            <Text style={{ fontSize: 8, marginTop: 2, fontFamily: "Geist" }}>
              <Text style={{ fontWeight: "bold", color: theme.valueColor }}>
                Registered in {companyDetails.certCompanyCountry || "UNITED KINGDOM"}, Number{" "}
              </Text>
              <Text style={{ color: "#6b7280" }}>
                {companyDetails.certCompanyRegNumber}
              </Text>
            </Text>
          </View>

          {/* Three-column cert no / class / quantity */}
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 16,
              borderBottomWidth: 1,
              borderBottomColor: theme.dividerColor,
              borderStyle: theme.dividerStyle,
            }}
          >
            {[
              { label: "Certificate No", value: shareDetails.certificateNumber },
              { label: "Share Class", value: shareDetails.shareClass || "ORDINARY" },
              { label: "Quantity", value: shareDetails.numberOfShares },
            ].map((col, i, arr) => (
              <View
                key={i}
                style={{
                  flex: 1,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  alignItems: "center",
                  borderRightWidth: i < arr.length - 1 ? 1 : 0,
                  borderRightColor: theme.columnBorderColor,
                  borderStyle: theme.dividerStyle,
                }}
              >
                <Text
                  style={{ fontSize: 8, fontWeight: "bold", color: theme.valueColor, fontFamily: "Geist" }}
                >
                  {col.label}
                </Text>
                <Text style={{ fontSize: 8, color: "#6b7280", marginTop: 2, fontFamily: "Geist" }}>
                  {col.value}
                </Text>
              </View>
            ))}
          </View>

          {/* Certification body */}
          <View
            style={{
              flex: 1,
              paddingHorizontal: 48,
              paddingVertical: 16,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 8, color: "#6b7280", marginBottom: 8, fontFamily: "Geist" }}>
              This is to certify that
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontWeight: "semibold",
                color: theme.valueColor,
                marginBottom: 4,
                fontFamily: "Geist",
              }}
            >
              {shareholderDetails.shareholderName}
            </Text>
            <Text style={{ fontSize: 8, color: "#6b7280", marginBottom: 4, fontFamily: "Geist" }}>
              of
            </Text>
            {shareholderAddr ? (
              <Text
                style={{ fontSize: 8, color: "#6b7280", marginBottom: 12, fontFamily: "Geist" }}
              >
                {shareholderAddr}
              </Text>
            ) : null}
            <Text
              style={{
                fontSize: 8,
                color: theme.bodyColor,
                lineHeight: 1.6,
                textAlign: "center",
                maxWidth: 400,
                fontFamily: "Geist",
              }}
            >
              is the registered holder of{" "}
              <Text style={{ fontWeight: "semibold", color: theme.valueColor }}>
                {shareDetails.numberOfShares}
              </Text>{" "}
              <Text style={{ fontWeight: "semibold", color: theme.valueColor }}>
                {shareDetails.shareClass || "ORDINARY"}
              </Text>{" "}
              shares of{" "}
              <Text style={{ fontWeight: "semibold", color: theme.valueColor }}>
                {shareDetails.nominalValue || "GBP1.00"}
              </Text>{" "}
              each in the above-named Company, subject to the Memorandum and
              Articles of Association of the said Company.
            </Text>
          </View>

          {/* Signatories */}
          <View
            style={{
              paddingHorizontal: 40,
              paddingBottom: 16,
              paddingTop: 8,
              borderTopWidth: 1,
              borderTopColor: theme.dividerColor,
              borderStyle: theme.dividerStyle,
            }}
          >
            {sigs.map((s, i) => (
              <View
                key={i}
                style={{ flexDirection: "row", alignItems: "flex-end", gap: 4, marginBottom: 6 }}
              >
                <Text
                  style={{
                    fontSize: 8,
                    fontWeight: "bold",
                    color: theme.valueColor,
                    fontFamily: "Geist",
                  }}
                >
                  {s.role}:
                </Text>
                <View
                  style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.sigLineColor,
                    borderStyle: "dashed",
                    marginBottom: 2,
                  }}
                >
                  <Text style={{ fontSize: 7, color: "#6b7280", fontFamily: "Geist" }}>
                    {s.name}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

// ─── Main export ──────────────────────────────────────────────────────────────

export const CertificatePdf = ({
  companyDetails,
  shareholderDetails,
  shareDetails,
  signatoryDetails,
  appearance,
}: CertificatePdfProps) => {
  const theme = getPdfTheme(appearance?.certTheme ?? "minimal");
  const orientation = appearance?.orientation ?? "portrait";
  const layout = appearance?.certLayout ?? "standard";

  const props = { companyDetails, shareholderDetails, shareDetails, signatoryDetails, theme };

  if (orientation === "landscape" && layout === "formal") {
    return <LandscapeFormalPdf {...props} />;
  }
  if (orientation === "landscape") {
    return <LandscapeStandardPdf {...props} />;
  }
  return <PortraitStandardPdf {...props} />;
};
