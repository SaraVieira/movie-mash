import { forwardRef, ReactElement } from "react";

export const Label = ({ children, ...props }) => (
  <label className="block mb-2 opacity-50" {...props}>
    {children}
  </label>
);

export const Input = forwardRef(
  (props: any, ref): ReactElement => (
    <input
      className="bg-brand-inputBg rounded-md w-full border-0"
      // @ts-ignore
      ref={ref}
      {...props}
    />
  )
);
