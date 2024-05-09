import { getStaticParams } from "@/locales/server";

export function generateStaticParams() {
  return getStaticParams();
}
function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default ProductLayout;
