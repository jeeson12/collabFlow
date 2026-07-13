"use client";

import { useForm } from "react-hook-form";
import { RegisterFormData, registerSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPass: "",
    },
  });

  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log("register success", data);
      router.push("/login");
    },
    onError: (error) => {
      console.log("register error", error);
    },
  });

  const onsubmit = (data: RegisterFormData) => {
    const { confirmPass, ...registerData } = data;
    registerMutation.mutate(registerData);
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onsubmit)}>
        <label htmlFor="name">name</label>
        <Input
          id="name"
          placeholder="enter ur name"
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p>{form.formState.errors.name.message}</p>
        )}
        <label htmlFor="email">email</label>
        <Input
          id="email"
          type="email"
          placeholder="enter ur email"
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <p>{form.formState.errors.email.message}</p>
        )}
        <label htmlFor="password">password</label>
        <Input
          id="password"
          type="password"
          placeholder="enter ur password"
          {...form.register("password")}
        />
        {form.formState.errors.password && (
          <p>{form.formState.errors.password.message}</p>
        )}
        <label htmlFor="confirmPass">confirm password</label>
        <Input
          id="confirmPass"
          type="password"
          placeholder="confirm ur password"
          {...form.register("confirmPass")}
        />
        {form.formState.errors.confirmPass && (
          <p>{form.formState.errors.confirmPass.message}</p>
        )}
        <Button type="submit" disabled={registerMutation.isPending}>
          {registerMutation.isPending ? "creating" : "register"}
        </Button>
      </form>
    </div>
  );
}
