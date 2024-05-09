import { getStaticParams } from "@/locales/server";

export function generateStaticParams() {
  return getStaticParams();
}
function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default BlogLayout;
