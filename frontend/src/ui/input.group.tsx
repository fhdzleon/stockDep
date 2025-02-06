"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentProps, forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends ComponentProps<"input"> {
  label: string;
  extendClass?: string; // Hacer que extendClass sea opcional
  errors?: FieldError; // Solo FieldError tiene `message`
}

const InputGroup = forwardRef<HTMLInputElement, InputProps>(
  ({ label, extendClass = "", errors, ...props }, ref) => {
    const clax = clsx("flex flex-col gap-1", extendClass);
    const inputClass = clsx("input", {
      "input-error": errors,
      "input-primary": !errors,
    });

    return (
      <div className={clax}>
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <input ref={ref} className={inputClass} {...props} />
        <div className="label h-6">
          <AnimatePresence>
            {errors?.message && (
              <motion.small
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-error label-text-alt"
              >
                {errors.message}
              </motion.small>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }
);


InputGroup.displayName = "InputGroup";
export default InputGroup;
