import { FC, useCallback, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { default as ReactSelect, components } from "react-select";

import { Button } from "components/Button";
import { ErrorMessage } from "components/ErrorMessage";
import { includes, map, size } from "lodash";
import { useEffect } from "react";
import styles from "./Select.module.scss";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  control: Control;
  name: string;
  options: SelectOption[];
  placeholder: string;
  noOptionOnsubmit?: (value: string) => void;
  inputOnSearched?: (value: string) => void;
  isMulti?: boolean;
};

export const Select: FC<SelectProps> = ({
  control,
  name,
  options,
  placeholder,
  noOptionOnsubmit,
  inputOnSearched,
  isMulti = false,
}) => {
  const [value, setValue] = useState<string | undefined>();

  useEffect(() => {
    inputOnSearched && inputOnSearched(value as string);
  }, [inputOnSearched, value]);

  const NoOptionsMessage = (props: any) => {
    return (
      <components.NoOptionsMessage {...props}>
        <div className="flex flex-col gap-2">
          <span className="custom-css-class">No Options for {value}</span>
          {noOptionOnsubmit && (
            <Button
              type="button"
              onClick={() => noOptionOnsubmit(value as string)}
            >
              Add to option
            </Button>
          )}
        </div>
      </components.NoOptionsMessage>
    );
  };

  const customFilter = useCallback(
    (option: SelectOption, inputValue: string) => {
      setValue(inputValue);
      const { label, value } = option;
      // looking if other options with same label are matching inputValue
      const otherKey = options.filter(
        (opt) => opt.label === label && includes(opt.value, inputValue)
      );
      return includes(value, inputValue) || size(otherKey) > 0;
    },
    [options]
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, name }, fieldState: { error } }) => (
        <>
          <ReactSelect
            isMulti={isMulti}
            filterOption={customFilter}
            components={{ NoOptionsMessage }}
            placeholder={<p>{placeholder}</p>}
            options={options}
            name={name}
            onChange={(selected: any) => {
              if (isMulti) {
                onChange(map(selected, (select: SelectOption) => select.value));
              } else {
                onChange(selected!.value);
              }
            }}
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
