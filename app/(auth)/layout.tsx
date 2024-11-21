import { IChildren } from "@/interface";

export default function AuthLayout({ children }: Readonly<IChildren>) {
  return (
    <main className="flex h-full w-full flex-row items-center justify-center relative">
      <div className="flex h-screen w-full items-center justify-center p-8">
        {children}
      </div>
    </main>
  );
}
