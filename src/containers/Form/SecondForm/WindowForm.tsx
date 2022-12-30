import { H1, Select } from "@components";
import { useQuestionnaireStore } from "@store";
import { EWindowGlassType, EWindowType } from "@types";
import { map, size, values } from "lodash";
import { FC, Fragment, useEffect, useMemo } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";

type WindowFormProps = {
  form: UseFormReturn<any>;
  roomIndex: number;
  floorIndex: number;
  windowNumber: number;
};

const WindowForm: FC<WindowFormProps> = ({
  roomIndex,
  floorIndex,
  windowNumber,
  form,
}) => {
  const { customWindowType, addCustomWindowType } = useQuestionnaireStore();
  const { control, register } = form;
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: `windows[${floorIndex}][${roomIndex}]`, // unique name for your Field Array
  });

  const windowTypeOptions = useMemo(() => {
    return map([...values(EWindowType), ...customWindowType], (room) => ({
      label: room,
      value: room,
    }));
  }, [customWindowType]);

  const glassTypeOptions = map(values(EWindowGlassType), (room) => ({
    label: room,
    value: room,
  }));

  useEffect(() => {
    if (size(fields) !== windowNumber) {
      for (let i = 0; i < windowNumber; i++) {
        append({});
      }
    }
  }, [windowNumber]);

  const onAddNewWindowType = (value: string) => addCustomWindowType(value);

  return (
    <form className="flex flex-col gap-4">
      {map(fields, (field, index) => (
        <Fragment key={field.id}>
          <H1>Window #{index + 1}</H1>
          <div className="flex flex-row gap-4 w-full">
            <div className="flex flex-col gap-4 w-1/2">
              <H1>Window Type</H1>

              <Select
                control={control}
                name={`windows[${floorIndex}][${roomIndex}].${index}.type`}
                options={windowTypeOptions}
                placeholder={"Choose window type"}
                noOptionOnsubmit={onAddNewWindowType}
              />
            </div>

            <div className="flex flex-col gap-4 w-1/2">
              <H1>Glass type</H1>
              <Select
                control={control}
                name={`windows[${floorIndex}][${roomIndex}].${index}.glassType`}
                options={glassTypeOptions}
                placeholder={"Choose window glass type"}
              />
            </div>
          </div>
        </Fragment>
      ))}
    </form>
  );
};

export default WindowForm;
