export const metadata = {
  title: "HappnIn",
  description: "Your Guide to What's happening",
};

export default function CompletionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col justify-center">
      <main className="dark:bg-primary">{children}</main>
    </div>
  );
}
