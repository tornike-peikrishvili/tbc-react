"use client";

import { useTranslation } from "react-i18next";

function BlogTitle() {
  const { t } = useTranslation();

  return (
    <h1 className="text-3xl font-semibold mb-6 dark:text-slate-50">
      {t("latestBlog")}
    </h1>
  );
}

export default BlogTitle;
