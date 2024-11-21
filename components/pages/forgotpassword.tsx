"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"

import { ForgotPasswordSchema } from "@/validate";

export const ForgotPasswordComponent = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof ForgotPasswordSchema>) => {
    if (data) {
      console.log(data);
    } else {
      toast({
        title: "You submitted the following values:",
        description: "The email you entered is incorrect.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
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
        <Button className="w-full h-11 bg-sky-600 h-11 hover:bg-sky-700" type="submit">
          Request reset link
        </Button>
      </form>
    </Form>
  );
};
