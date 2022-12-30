import { Button, H1, InputField } from "@components";
import { useQuestionnaireStore } from "@store";
import { get, map, size } from "lodash";
import { FC, Fragment, useEffect } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import RoomForm from "./RoomForm";

type SecondFormProps = {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
};

const SecondForm: FC<SecondFormProps> = ({ form, onSubmit }) => {
  const { data } = useQuestionnaireStore();
  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "floors", // unique name for your Field Array
  });

  const { floors } = watch();

  useEffect(() => {
    if (size(fields) !== data?.floor) {
      for (let i = 0; i < +data!.floor; i++) {
        append({});
      }
    }
  }, [data?.floor]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {map(fields, (field, index) => (
        <Fragment key={field.id}>
          <H1>Floor #{index + 1}</H1>
          <div className="flex flex-col gap-4 w-full">
            <H1>How many rooms?</H1>
            <InputField
              type="number"
              name={`floors.${index}.room`}
              placeholder=""
              register={register}
              error={
                get(
                  errors,
                  `floors[${index}].room.message`
                ) as unknown as string
              }
            />
            <RoomForm
              floorIndex={index}
              form={form}
              roomNumber={floors[index]?.room}
            />
          </div>
        </Fragment>
      ))}

      <div className="pt-10 w-full flex justify-center">
        <Button>Continue</Button>
      </div>
    </form>
  );
};

export default SecondForm;
