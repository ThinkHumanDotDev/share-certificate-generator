"use client";
import { CertificatePreviewDetails } from "@/app/component/form/certificatePreviewDetails";
import { useCertificateData } from "@/app/hooks/useCertificateData";
import { useFormContext } from "react-hook-form";
import { useCallback, useEffect, useRef, useState } from "react";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

const ZOOM_STEP = 0.1;
const MIN_ZOOM = 0.2;
const MAX_ZOOM = 2;

const CERT_WIDTHS: Record<string, number> = {
  landscape: 842,
  portrait: 595,
};

const btnClass =
  "w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 transition-colors";

export const CertificateDataPreview = () => {
  const { companyDetails, shareholderDetails, shareDetails, signatoryDetails, appearance } =
    useCertificateData();
  const { setValue } = useFormContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [fitZoom, setFitZoom] = useState(1);

  const certWidth = CERT_WIDTHS[appearance?.orientation ?? "portrait"] ?? 595;
  const prevCertWidthRef = useRef(certWidth);
  const fittedRef = useRef(false);

  const getFitScale = useCallback(() => {
    if (!containerRef.current) return 0;
    const available = containerRef.current.offsetWidth - 32;
    if (available <= 0) return 0;
    return parseFloat(Math.min(1, available / certWidth).toFixed(2));
  }, [certWidth]);

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      const scale = getFitScale();
      if (scale <= 0) return; // container still hidden/unmeasured
      setFitZoom(scale);
      // Apply zoom on first valid measurement, and whenever orientation changes
      if (!fittedRef.current) {
        setZoom(scale);
        fittedRef.current = true;
      }
    });
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When orientation changes, refit
  useEffect(() => {
    if (prevCertWidthRef.current === certWidth) return;
    prevCertWidthRef.current = certWidth;
    fittedRef.current = false; // allow next ResizeObserver call to reset zoom
    const scale = getFitScale();
    if (scale > 0) {
      setFitZoom(scale);
      setZoom(scale);
      fittedRef.current = true;
    }
  }, [certWidth, getFitScale]);

  const onClick = (step: string) => {
    setValue("step", step);
    localStorage.setItem("step", step);
  };

  const adjustZoom = (delta: number) =>
    setZoom((prev) =>
      parseFloat(Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prev + delta)).toFixed(2))
    );

  return (
    <div ref={containerRef} className="w-full overflow-x-auto">
      {/* min-w-min lets overflow-x-auto scroll when content exceeds container */}
      <div className="flex justify-center min-w-min px-4">
        <div style={{ zoom }}>
          <CertificatePreviewDetails
            onClick={onClick}
            companyDetails={companyDetails}
            shareholderDetails={shareholderDetails}
            shareDetails={shareDetails}
            signatoryDetails={signatoryDetails}
            appearance={appearance}
          />
        </div>
      </div>

      {/* Zoom controls */}
      <div className="flex items-center justify-center gap-2 mt-4 pb-2">
        <button
          aria-label="Zoom out"
          onClick={() => adjustZoom(-ZOOM_STEP)}
          disabled={zoom <= MIN_ZOOM}
          className={btnClass}
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <button
          aria-label="Reset zoom to fit"
          onClick={() => setZoom(fitZoom)}
          className="px-3 h-8 rounded-full border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
        >
          <Maximize2 className="w-3 h-3" />
          {Math.round(zoom * 100)}%
        </button>
        <button
          aria-label="Zoom in"
          onClick={() => adjustZoom(ZOOM_STEP)}
          disabled={zoom >= MAX_ZOOM}
          className={btnClass}
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
