import Link from "next/link";

import { auth_router } from "@/router";
import { ForgotPasswordComponent } from "@/components/pages/forgotpassword";

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center mb-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Forgot Your Password
        </h1>
        <p className="text-sm text-muted-foreground leading-6">
          Please enter the email address you&apos;d like your password reset
          information sent to
        </p>
      </div>
      <div className="grid gap-6">
        <ForgotPasswordComponent />
      </div>
      <div className="text-center text-sm mt-4">
        <p>
          <Link
            href={auth_router.login_page}
            className="font-medium underline hover:text-sky-700"
          >
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
