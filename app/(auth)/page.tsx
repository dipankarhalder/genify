import Link from "next/link";
import { GraduationCap } from 'lucide-react';

import { auth_router } from "@/router";
import { SigninComponent } from "@/components/pages/signin";

export default function SigninPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-5 sm:w-[400px]">
      <div className="flex flex-col text-center mb-0">
        <div className="flex justify-center items-center mb-12">
          <span className="flex justify-center items-center w-[40px] h-[40px] bg-sky-600 rounded-full">
            <GraduationCap size={20} className="text-white" />
          </span>
          <p className="ml-2 font-bold text-2xl text-sky-600">ScholarSync</p>
        </div>
        <h1 className="text-xl font-semibold tracking-tight mb-0">
          Welcome Back!
        </h1>
      </div>
      <div className="grid gap-6">
        <SigninComponent />
        <div className="text-center text-sm mt-2">
          <p>
            Don&apos;t have an account? &nbsp;
            <Link
              href={auth_router.register_page}
              className="font-medium underline hover:text-sky-700"
            >
              Create now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
