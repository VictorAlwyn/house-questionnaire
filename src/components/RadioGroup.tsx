import { map } from "lodash";
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

type RadioGroupOption = {
  label: string;
  value: string;
};

type RadioGroupProps = {
  name: string;
  register: UseFormRegister<any>;
  options: RadioGroupOption[];
};

export const RadioGroup: FC<RadioGroupProps> = ({
  name,
  register,
  options,
}) => {
  return (
    <fieldset className="flex gap-4">
      {map(options, ({ label, value }) => (
        <div className="flex gap-2">
          <input
            type="radio"
            value={value}
            {...register(name)}
            className="text-2xl"
          />
          <label htmlFor="">{label}</label>
        </div>
      ))}
    </fieldset>
  );
};
