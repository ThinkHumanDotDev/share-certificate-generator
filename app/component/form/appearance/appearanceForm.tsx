"use client";

import { Controller, useFormContext } from "react-hook-form";
import { getInitialValue } from "@/lib/getInitialValue";
import { themes, getLayoutsForOrientation } from "@/lib/certificateThemes";
import {
  ThemeCard,
  MinimalThemePreview,
  NewYorkThemePreview,
  ClassicThemePreview,
  PortraitOrientationPreview,
  LandscapeOrientationPreview,
  StandardPortraitLayoutPreview,
  StandardLandscapeLayoutPreview,
  FormalLandscapeLayoutPreview,
} from "@/app/component/form/appearance/ThemeCard";
import { useGetValue } from "@/app/hooks/useGetValue";

const themePreviewMap: Record<string, React.ReactNode> = {
  minimal: <MinimalThemePreview />,
  "new-york": <NewYorkThemePreview />,
  classic: <ClassicThemePreview />,
};

const layoutPreviewMap: Record<string, (selected: boolean) => React.ReactNode> = {
  "portrait-standard": (s) => <StandardPortraitLayoutPreview selected={s} />,
  "landscape-standard": (s) => <StandardLandscapeLayoutPreview selected={s} />,
  "landscape-formal": (s) => <FormalLandscapeLayoutPreview selected={s} />,
};

export const AppearanceForm = () => {
  const { setValue } = useFormContext();
  const orientation = useGetValue("orientation", getInitialValue("orientation", "portrait")) as "portrait" | "landscape";
  const layouts = getLayoutsForOrientation(orientation);

  return (
    <div className="pt-24">
      <p className="text-2xl font-semibold pb-3">Appearance</p>
      <p className="pb-8 text-xs font-medium text-neutral-500">
        Customise how your share certificate looks.
      </p>

      {/* Orientation */}
      <p className="text-sm font-medium text-neutral-500 pb-4">Orientation</p>
      <Controller
        name="orientation"
        defaultValue={getInitialValue("orientation", "portrait")}
        render={({ field: { onChange, value } }) => (
          <div className="flex gap-4 pb-8">
            {(["portrait", "landscape"] as const).map((o) => (
              <button
                key={o}
                onClick={() => {
                  onChange(o);
                  localStorage.setItem("orientation", o);
                  // Reset layout to standard when orientation changes
                  setValue("certLayout", "standard");
                  localStorage.setItem("certLayout", "standard");
                }}
                className="flex flex-col items-center gap-2 group focus:outline-none"
              >
                <div
                  className={`w-[88px] h-[64px] overflow-hidden transition-all duration-150 ${
                    value === o
                      ? "ring-2 ring-primary ring-offset-2"
                      : "ring-1 ring-neutral-200 hover:ring-neutral-400"
                  }`}
                >
                  {o === "portrait" ? (
                    <PortraitOrientationPreview selected={value === o} />
                  ) : (
                    <LandscapeOrientationPreview selected={value === o} />
                  )}
                </div>
                <span
                  className={`text-xs font-medium capitalize transition-colors ${
                    value === o
                      ? "text-primary"
                      : "text-neutral-500 group-hover:text-neutral-800"
                  }`}
                >
                  {o}
                </span>
              </button>
            ))}
          </div>
        )}
      />

      {/* Layout — filtered by orientation */}
      <p className="text-sm font-medium text-neutral-500 pb-4">Layout</p>
      <Controller
        name="certLayout"
        defaultValue={getInitialValue("certLayout", "standard")}
        render={({ field: { onChange, value } }) => (
          <div className="flex gap-4 pb-8 flex-wrap">
            {layouts.map((layout) => {
              const previewKey = `${orientation}-${layout.id}`;
              return (
                <ThemeCard
                  key={layout.id}
                  id={layout.id}
                  name={layout.name}
                  selected={value === layout.id}
                  onClick={() => {
                    onChange(layout.id);
                    localStorage.setItem("certLayout", layout.id);
                  }}
                  preview={layoutPreviewMap[previewKey]?.(value === layout.id)}
                />
              );
            })}
          </div>
        )}
      />

      {/* Theme */}
      <p className="text-sm font-medium text-neutral-500 pb-4">Theme</p>
      <Controller
        name="certTheme"
        defaultValue={getInitialValue("certTheme", "minimal")}
        render={({ field: { onChange, value } }) => (
          <div className="flex gap-4 flex-wrap">
            {themes.map((theme) => (
              <ThemeCard
                key={theme.id}
                id={theme.id}
                name={theme.name}
                selected={value === theme.id}
                onClick={() => {
                  onChange(theme.id);
                  localStorage.setItem("certTheme", theme.id);
                }}
                preview={themePreviewMap[theme.id]}
              />
            ))}
          </div>
        )}
      />
    </div>
  );
};
