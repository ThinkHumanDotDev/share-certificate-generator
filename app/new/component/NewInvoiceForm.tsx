"use client";
import Image from "next/image";
import { CertificateInputForm } from "@/app/new/component/CertificateInputForm";
import { CertificateFormSteps } from "@/app/new/component/CertificateFormSteps";
import { CertificateDataPreview } from "@/app/new/component/CertificateDataPreview";
import { FloatingActionButtons } from "@/app/component/ui/FloatingActionButtons";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";

type MobileTab = "form" | "preview";

export const NewInvoiceForm = () => {
  const methods = useForm();
  const [isClient, setIsClient] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>("form");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
      try {
        const step = localStorage.getItem("step");
        if (!(step && typeof +step === "number"))
          localStorage.setItem("step", "1");
      } catch (e) {
        localStorage.setItem("step", "1");
      }
    }
  }, []);

  return (
    <>
      {isClient ? (
        <FormProvider {...methods}>
          {/* Mobile tab bar */}
          <div className="md:hidden sticky top-0 z-30 flex border-b border-dashed dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <button
              onClick={() => setMobileTab("form")}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${mobileTab === "form" ? "text-primary" : "text-neutral-400 dark:text-neutral-500"}`}
            >
              Form
            </button>
            <button
              onClick={() => setMobileTab("preview")}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${mobileTab === "preview" ? "text-primary" : "text-neutral-400 dark:text-neutral-500"}`}
            >
              Preview
            </button>
          </div>

          {/* Main layout */}
          <div className="flex items-stretch md:flex-row flex-col">
            {/* Form panel */}
            <div className={`max-w-lg min-h-screen w-full h-full p-4 md:p-12 border-r border-dashed dark:border-neutral-800 flex-col justify-between pb-24 md:pb-12 ${mobileTab === "preview" ? "hidden md:flex" : "flex"}`}>
              <div>
                <div className="flex gap-2 items-center">
                  <Image
                    src="/android-chrome-512x512.png"
                    width={40}
                    height={40}
                    className="rounded-lg"
                    alt="logo"
                  />
                  <div>
                    <p className="font-semibold">Share Certificate Generator</p>
                    <p className="text-primary text-sm">By ThinkHuman</p>
                  </div>
                </div>
                <CertificateInputForm />
              </div>
              <CertificateFormSteps />
            </div>

            {/* Preview panel */}
            <div className={`relative h-auto md:min-h-screen w-full flex-col justify-start md:justify-center items-center py-8 md:py-0 pb-24 md:pb-0 ${mobileTab === "form" ? "hidden md:flex" : "flex"}`}>
              <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(oklch(0.3_0_0)_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <CertificateDataPreview />
            </div>
          </div>

          <FloatingActionButtons />
        </FormProvider>
      ) : (
        <div />
      )}
    </>
  );
};
