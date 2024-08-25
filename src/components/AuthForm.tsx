"use client";

import Link from "next/link";
import Button from "./Button";
import Input from "./Input";
import { loginAction } from "@/actions/auth";
import { toast } from "./Toast";

interface AuthFormProps {
  type: "login" | "register";
}

export default function AuthForm({ type }: AuthFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <label htmlFor="email">Email</label>
          <Input id="email" placeholder="Email" name="email" />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="password">Password</label>
          <Input id="password" placeholder="Password" name="password" />
        </div>
        {type === "register" && (
          <div className="flex flex-col gap-3">
            <label htmlFor="confirm-password">Confirm Password</label>
            <Input name="confirmPassword" id="confirm-password" placeholder="Confirm Password" />
          </div>
        )}
        <input name="type" defaultValue={type} type="text" className="invisible w-0 h-0" />
        <Button
          onClick={async () => {
            try {
              const result = await loginAction("email", "password");
              toast({
                message: "Login successful",
                status: "success",
              });
            } catch (error) {
              toast({
                message: "Login failed",
                status: "error",
              });
            }
          }}
        >
          {
            {
              login: "Login",
              register: "Register",
            }[type]
          }
        </Button>
      </div>
      {
        {
          login: (
            <p>
              Don&apos;t have an account?{" "}
              <Link data-link href="/register">
                Register
              </Link>
            </p>
          ),
          register: (
            <p>
              Already have an account?{" "}
              <Link data-link href="/login">
                Login
              </Link>
            </p>
          ),
        }[type]
      }
    </div>
  );
}
