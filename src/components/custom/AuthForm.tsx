"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useReducer } from "react";
import { Button } from "../ui/button";

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

  const onLoign = () => {
    console.log("Logging in with", state.email, state.password);
  };

  const onRegister = () => {
    console.log(
      "Registering with",
      state.email,
      state.password,
      state.confirmPassword,
    );
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
    </div>
  );
}
