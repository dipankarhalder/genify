import { IChildren } from "@/interface";
import { Sidebar } from "@/components/shared/sidebar";

export default function AdminLayout({ children }: Readonly<IChildren>) {
  return (
    <main className="flex w-full">
      <Sidebar />
      <div className="col-span-3 flex-1 ml-[240px]">
        <div className="pt-6 px-7">{children}</div>
      </div>
    </main>
  );
}