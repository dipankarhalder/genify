"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"

import { UserSigninInfo } from "@/interface";
import { auth_router } from "@/router";
import { SigninSchema } from "@/validate";
import { super_admin_signin } from "@/services/auth";
import { SpinnerLoading } from "@/components/shared/spinner";

export const SigninComponent = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [waiting, setWaiting] = useState(false);

  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SigninSchema>) => {
    setWaiting(true);
    const payload: UserSigninInfo = {
      ...data,
    }
    
    super_admin_signin(payload)
      .then(res => {
        if (res) {
          if (!res.success) {
            toast({ variant: "destructive", title: res.message });
          } else {
            console.log(res);
          }
        }
        setWaiting(false);
      })
      .catch(err => console.log(err));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="mb-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    {...field}
                    className="h-12 px-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    className="h-12 px-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end text-sm mb-6">
          <p>
            <Link
              href={auth_router.forgot_page}
              className="font-medium text-xs underline hover:text-sky-700"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
        {waiting ? (
          <Button className="w-full bg-gray-600 h-11">
            <SpinnerLoading />
            Please wait...
          </Button>
        ) : (
          <Button className="w-full bg-sky-600 h-11 hover:bg-sky-700" type="submit">
            Login
          </Button>
        )}
      </form>
    </Form>
  );
};
