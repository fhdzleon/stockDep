"use client"

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { forwardRef } from "react"
import { FieldError } from "react-hook-form";

interface SelectOption {
  id: number | string;
  name: string;
}
interface SelectProps {
  data: SelectOption[]
  label: string;
  extendClass?: string;
  errors?: FieldError;
}

const SelectGroup = forwardRef<HTMLSelectElement, SelectProps>(
  ({ data, label, errors, extendClass, ...props }, ref) => {

    const clax = clsx("select select-bordered", {
      "select-error": errors,
      "select-primary": !errors
    })


    return (
      <label className={extendClass + ' form-control'}>
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <select defaultValue="" className={clax} ref={ref} {...props}>
          <option value="" disabled>
            {label}
          </option>
          {
            data.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))
          }
        </select >
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
      </label>
    )
  }
)


SelectGroup.displayName = "SelectGroup"
export default SelectGroup