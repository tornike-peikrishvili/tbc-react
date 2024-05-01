"use client";

import { useScopedI18n } from "@/locales/client";

function BlogTitle() {
  const scopedT = useScopedI18n("blog");

  return (
    <h1 className="text-3xl font-semibold mb-6 dark:text-slate-50">
      {scopedT("latestBlog")}
    </h1>
  );
}

export default BlogTitle;
