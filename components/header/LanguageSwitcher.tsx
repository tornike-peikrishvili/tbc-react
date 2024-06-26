"use client";

import { useI18n } from "@/locales/client";

import { useChangeLocale } from "@/locales/client";

function LanguageSwitcher() {
  const changeLocale = useChangeLocale();
  const t = useI18n();

  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center text-white">
        <button onClick={() => changeLocale("en")}>{t("languages.en")}</button>
        <button onClick={() => changeLocale("ka")}>{t("languages.ka")}</button>
      </div>
    </div>
  );
}

export default LanguageSwitcher;
