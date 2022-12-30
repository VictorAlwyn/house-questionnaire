import { ErrorMessage } from "@components";
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

export type InputFieldProps = {
  name: string;
  placeholder: string;
  type?: "text" | "number";
  register: UseFormRegister<any>;
  error?: string | undefined;
};

export const InputField: FC<InputFieldProps> = ({
  name,
  placeholder,
  type,
  register,
  error,
}) => {
  return (
    <>
      <input
        className="py-3 px-7 rounded-lg border-slate-500 border"
        type={type || "text"}
        placeholder={placeholder}
        {...register(name)}
      />

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
};
