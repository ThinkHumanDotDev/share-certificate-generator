"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FileText, Download, LoaderIcon, Upload, RotateCcw, Sun, Moon, SunMoon } from "lucide-react";
import { Document, Page, pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { useCertificateData } from "@/app/hooks/useCertificateData";
import { CertificatePdf } from "@/app/component/form/downloadCertificate/certificatePdf";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const APPEARANCE_KEYS = ["orientation", "certTheme", "certLayout"];

const FORM_KEYS = [
  "certCompanyName",
  "certCompanyRegNumber",
  "certCompanyAddress",
  "certCompanyCity",
  "certCompanyState",
  "certCompanyZip",
  "certCompanyCountry",
  "certCompanyLogo",
  "shareholderName",
  "shareholderEmail",
  "shareholderAddress",
  "shareholderCity",
  "shareholderState",
  "shareholderZip",
  "shareholderCountry",
  "certificateNumber",
  "numberOfShares",
  "shareClass",
  "nominalValue",
  "considerationPaid",
  "shareIssueDate",
  "director1Name",
  "director2Name",
  "secretaryName",
];

const FAB_CLASS =
  "w-10 h-10 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-md flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-white transition-colors";

export const FloatingActionButtons = () => {
  const { reset, getValues } = useFormContext();
  const { companyDetails, shareholderDetails, shareDetails, signatoryDetails, appearance } =
    useCertificateData();
  const [exportStatus, setExportStatus] = useState<"idle" | "loading">("idle");
  type ThemeMode = "light" | "dark" | "system";
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");
  const importInputRef = useRef<HTMLInputElement>(null);

  const applyTheme = useCallback((mode: ThemeMode) => {
    if (mode === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", prefersDark);
    } else {
      document.documentElement.classList.toggle("dark", mode === "dark");
    }
  }, []);

  useEffect(() => {
    const stored = (localStorage.getItem("theme") ?? "system") as ThemeMode;
    setThemeMode(stored);
    applyTheme(stored);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onMqChange = () => {
      if ((localStorage.getItem("theme") ?? "system") === "system") applyTheme("system");
    };
    mq.addEventListener("change", onMqChange);
    return () => mq.removeEventListener("change", onMqChange);
  }, [applyTheme]);

  const handleThemeToggle = () => {
    const cycle: ThemeMode[] = ["light", "dark", "system"];
    const next = cycle[(cycle.indexOf(themeMode) + 1) % cycle.length];
    setThemeMode(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  };

  const themeIcon = themeMode === "light" ? <Sun className="w-4 h-4" /> : themeMode === "dark" ? <Moon className="w-4 h-4" /> : <SunMoon className="w-4 h-4" />;
  const themeLabel = themeMode === "light" ? "Light mode" : themeMode === "dark" ? "Dark mode" : "System theme";

  const handleExport = async () => {
    if (exportStatus === "loading") return;
    setExportStatus("loading");
    try {
      const blob = await pdf(
        <Document>
          <Page
            size="A4"
            orientation={appearance.orientation === "landscape" ? "landscape" : "portrait"}
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
      saveAs(blob, `share-certificate-${shareDetails.certificateNumber || "draft"}.pdf`);
    } catch (e) {
      console.error(e);
    } finally {
      setExportStatus("idle");
    }
  };

  const handleExportConfig = () => {
    const config: Record<string, string> = {};
    [...FORM_KEYS, ...APPEARANCE_KEYS].forEach((key) => {
      const val = localStorage.getItem(key);
      if (val !== null) config[key] = val;
    });
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
    saveAs(blob, `certificate-config-${shareDetails.certificateNumber || "draft"}.json`);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        const resetValues: Record<string, string> = {};

        [...FORM_KEYS, ...APPEARANCE_KEYS].forEach((key) => {
          if (data[key] !== undefined) {
            localStorage.setItem(key, data[key]);
            resetValues[key] = data[key];
          }
        });

        localStorage.setItem("step", "1");
        reset({ step: "1", ...resetValues });
      } catch {
        console.error("Invalid import file");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleReset = () => {
    const currentValues = getValues();
    const preserved: Record<string, string> = {};
    APPEARANCE_KEYS.forEach((key) => {
      preserved[key] = currentValues[key] ?? localStorage.getItem(key) ?? "";
    });

    FORM_KEYS.forEach((key) => localStorage.removeItem(key));
    localStorage.setItem("step", "1");

    reset({
      step: "1",
      ...preserved,
      ...Object.fromEntries(FORM_KEYS.map((k) => [k, ""])),
    });
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              aria-label="Export certificate as PDF"
              onClick={handleExport}
              disabled={exportStatus === "loading"}
              className={`${FAB_CLASS} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {exportStatus === "loading" ? (
                <LoaderIcon className="w-4 h-4 animate-spin" />
              ) : (
                <FileText className="w-4 h-4" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">Export</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              aria-label="Export fields and config as JSON"
              onClick={handleExportConfig}
              className={FAB_CLASS}
            >
              <Download className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">Export fields/config</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              aria-label="Import fields and config from JSON"
              onClick={() => importInputRef.current?.click()}
              className={FAB_CLASS}
            >
              <Upload className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">Import fields/config</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              aria-label="Toggle dark mode"
              onClick={handleThemeToggle}
              className={FAB_CLASS}
            >
              {themeIcon}
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">{themeLabel}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              aria-label="Reset certificate data"
              onClick={handleReset}
              className={`${FAB_CLASS} hover:!text-red-500`}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">Reset form</TooltipContent>
        </Tooltip>

        <input
          ref={importInputRef}
          type="file"
          accept=".json"
          className="hidden"
          aria-hidden="true"
          onChange={handleImport}
        />
      </div>
    </TooltipProvider>
  );
};
