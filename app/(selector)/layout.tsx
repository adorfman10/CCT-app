import { CamperSelector } from "@/components/ui/CamperSelector";
import { EmptyTagSelector } from "@/components/ui/EmptyTagSelector";

export default function SelectorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="p-2 px-4 flex gap-6 w-full items-center">
        <div className="w-1/2">
          <CamperSelector />
        </div>
        <EmptyTagSelector />
      </div>
      {children}
    </>
  );
}
