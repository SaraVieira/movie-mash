export const Label = ({ children, ...props }) => (
  <label className="block mb-2 opacity-50" {...props}>
    {children}
  </label>
);

export const Input = (props) => (
  <input className="bg-brand-inputBg rounded-md w-full border-0" {...props} />
);
