"use client";

import { cn } from "@/lib/utils";
import { createStore } from "@xstate/store";
import { useSelector } from "@xstate/store/react";
import { motion, AnimatePresence } from "framer-motion";
import { PropsWithChildren, useEffect } from "react";

type CloseState = {
  isOpen: false;
};

type OpenState = {
  isOpen: true;
  message: string;
  status: "success" | "error";
};

type ToastState = CloseState | OpenState;

const store = createStore(
  {
    isOpen: false,
  } as ToastState,
  {
    open(context, events: { message: string; status: "success" | "error" }): OpenState {
      return {
        isOpen: true,
        message: events.message,
        status: events.status,
      };
    },
    close: (): CloseState => {
      return {
        isOpen: false,
      };
    },
  },
);

export const toast = ({ message, status }: { message: string; status: "success" | "error" }) => {
  store.send({
    type: "open",
    message,
    status,
  });
};

const ToastViewport = ({ children }: PropsWithChildren) => {
  return <div className="fixed inset-0 z-10 pointer-events-none">{children}</div>;
};

const ToastPosition = ({ children }: PropsWithChildren) => {
  return <div className="absolute top-0 left-0 right-0 p-4">{children}</div>;
};

export const Toaster = () => {
  const state = useSelector(store, (state) => state.context);

  useEffect(() => {
    if (state.isOpen) {
      const timer = setTimeout(() => {
        store.send({
          type: "close",
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.isOpen]);

  return (
    <ToastViewport>
      <ToastPosition>
        <ToastUI state={state} />
      </ToastPosition>
    </ToastViewport>
  );
};

interface ToastUIProps {
  state: ToastState;
}

export const ToastUI = ({ state }: ToastUIProps) => {
  const initial = {
    y: -100,
    opacity: 0,
  };
  const enter = {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  };
  const exit = {
    y: -100,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  };

  const variants = {
    initial,
    enter,
    exit,
  };

  return (
    <AnimatePresence>
      {state.isOpen ? (
        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          className={cn("bg-green-500 h-[60px] flex items-center px-6 rounded-lg", {
            "bg-red-500": state.status === "error",
          })}
          variants={variants}
        >
          <p className="text-white font-bold">{state.message}</p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
