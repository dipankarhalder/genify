"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import { UserFormInfo } from "@/interface";
import { SignupSchema } from "@/validate";
import { user_role } from "@/config/constant";
import { super_admin_signup } from "@/services/auth";
import { SpinnerLoading } from "@/components/shared/spinner";

export const SignupComponent = () => {
  const { toast } = useToast();
  const [waiting, setWaiting] = useState(false);

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof SignupSchema>) => {
    setWaiting(true);
    const payload: UserFormInfo = {
      ...data,
      role: user_role.super,
    }

    super_admin_signup(payload)
      .then(res => {
        if (res) {
          form.reset();
          if (!res.success) {
            toast({ variant: "destructive", title: res.message });
          } else {
            toast({ title: res.message });
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
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="First name"
                      {...field}
                      className="h-12 px-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Last name"
                      {...field}
                      className="h-12 px-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="example@example.com"
                    {...field}
                    className="h-12 px-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Phone no."
                    {...field}
                    className="h-12 px-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
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
        {waiting ? (
          <Button className="w-full bg-gray-600 h-11">
            <SpinnerLoading />
            Please wait...
          </Button>
        ) : (
          <Button className="w-full h-11 bg-sky-600 h-11 hover:bg-sky-700" type="submit">
            Register
          </Button>
        )}
      </form>
    </Form>
  );
};
