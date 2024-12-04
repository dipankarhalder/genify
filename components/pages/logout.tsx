"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import { SpinnerLoading } from "@/components/shared/spinner";
import { auth_logout } from "@/services/auth";
import { auth_router } from "@/router";

export const LogoutComponent = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [waiting, setWaiting] = useState(false);

  /* handle sumbit */
  const handle_logout = () => {
    setWaiting(true);
    auth_logout()
      .then((res) => {
        if (res) {
          if (!res.success) {
            toast({ variant: "destructive", title: res.message });
          } else {
            router.push(auth_router.login_page);
          }
        }
        setWaiting(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {waiting ? (
        <Button className="bg-gray-600 h-11">
          <SpinnerLoading />
          Please wait...
        </Button>
      ) : (
        <Button
          className="bg-indigo-600 text-md h-11 hover:bg-indigo-700"
          type="button"
          onClick={() => handle_logout()}
        >
          Logout
        </Button>
      )}
    </div>
  );
};
