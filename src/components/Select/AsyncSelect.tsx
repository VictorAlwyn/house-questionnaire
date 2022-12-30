import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { default as ReactSelect } from "react-select/async";

import { ErrorMessage } from "components/ErrorMessage";
import { map } from "lodash";
import styles from "./Select.module.scss";

export type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  control: Control;
  name: string;
  options: SelectOption[];
  placeholder: string;
  onSearch: (value: string) => Promise<void>;
};

export const AsyncSelect: FC<SelectProps> = ({
  control,
  name,
  options,
  placeholder,
  onSearch,
}) => {
  const promiseOptions = async (inputValue: string): Promise<any> => {
    await onSearch(inputValue);
    return options;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, name }, fieldState: { error } }) => (
        <>
          <ReactSelect
            isMulti
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
            placeholder={<p>{placeholder}</p>}
            name={name}
            onChange={(selected) =>
              onChange(map(selected, (select: SelectOption) => select.value))
            }
            classNames={{
              control: (state) => styles.container,
            }}
            classNamePrefix="react-select"
          />
          {error && <ErrorMessage>{error?.message}</ErrorMessage>}
        </>
      )}
    />
  );
};
