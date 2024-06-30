"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useReducer } from "react";
import { Button } from "../ui/button";
import ky from "ky";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  type: "login" | "register";
}

export default function AuthForm({ type }: AuthFormProps) {
  const [state, dispatch] = useReducer(
    (
      state: {
        email: string;
        password: string;
        confirmPassword: string;
      },
      action: { type: string; value: string },
    ) => {
      switch (action.type) {
        case "email":
          return { ...state, email: action.value };
        case "password":
          return { ...state, password: action.value };
        case "confirm-password":
          return { ...state, confirmPassword: action.value };
        case "reset":
          return {
            email: "",
            password: "",
            confirmPassword: "",
          };
        default:
          return state;
      }
    },
    {
      email: "",
      password: "",
      confirmPassword: "",
    },
  );
  const { toast } = useToast();
  const router = useRouter();

  const onLoign = async () => {
    try {
      const response = await ky("/api/auth/login", {
        method: "POST",
        json: {
          email: state.email,
          password: state.password,
        },
      });
      if (response.status === 200) {
        // toast and replace with login
        toast({
          title: "Logged in",
          description: "You are now logged in",
        });
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onRegister = async () => {
    try {
      if (state.password !== state.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const res = await ky("/api/auth/register", {
        method: "POST",
        json: {
          email: state.email,
          password: state.password,
        },
      });
      if (res.status === 201) {
        // toast and replace with login
        toast({
          title: "Account created",
          description: "You can now login",
        });
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          value={state.email}
          onChange={(e) => dispatch({ type: "email", value: e.target.value })}
          placeholder="Email"
        />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="password">Password</Label>
        <Input
          value={state.password}
          onChange={(e) =>
            dispatch({ type: "password", value: e.target.value })
          }
          id="password"
          placeholder="Password"
        />
      </div>
      {type === "register" && (
        <div className="flex flex-col gap-3">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            value={state.confirmPassword}
            onChange={(e) =>
              dispatch({ type: "confirm-password", value: e.target.value })
            }
            id="confirm-password"
            placeholder="Confirm Password"
          />
        </div>
      )}
      <Button
        onClick={() => {
          if (type === "login") {
            onLoign();
          } else {
            onRegister();
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
      {
        {
          login: (
            <p>
              Don&apos;t have an account?{" "}
              <Link className="underline text-blue-500" href="/register">
                Register
              </Link>
            </p>
          ),
          register: (
            <p>
              Already have an account?{" "}
              <Link className="underline text-blue-500" href="/login">
                Login
              </Link>
            </p>
          ),
        }[type]
      }
    </div>
  );
}
