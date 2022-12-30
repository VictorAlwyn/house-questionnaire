import { AsyncSelect, Button, H1, InputField, Select } from "@components";
import { useSearchPlants } from "@hooks";
import { EFoundation, ERoof } from "@types";
import { get, isEmpty, map, values } from "lodash";
import { FC, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";

type FirstFormProps = {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
};

const FirstForm: FC<FirstFormProps> = ({ form, onSubmit }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { searchPlantByName, plants } = useSearchPlants();

  const foundationOptions = map(values(EFoundation), (foundation) => ({
    label: foundation,
    value: foundation,
  }));

  const roofOptions = map(values(ERoof), (foundation) => ({
    label: foundation,
    value: foundation,
  }));

  const plantOptions = useMemo(() => {
    if (!isEmpty(plants)) {
      return map(get(plants, "data"), (plant) => ({
        label: get(plant, "common_name"),
        value: get(plant, "common_name"),
      }));
    }

    return [];
  }, [plants]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex justify-center gap-10">
        <div className="flex flex-col gap-4 w-1/2">
          <H1>What type of foundation?</H1>
          <Select
            control={control}
            name="foundation"
            options={foundationOptions}
            placeholder={"Choose foundation"}
          />
        </div>
        <div className="flex flex-col gap-4 w-1/2">
          <H1>What size? (SQM)</H1>
          <InputField
            type="number"
            name="size"
            placeholder=""
            register={register}
            error={errors?.size?.message as string}
          />
        </div>
      </div>
      <div className="flex justify-center gap-10">
        <div className="flex flex-col gap-4 w-1/2">
          <H1>How many floors?</H1>
          <InputField
            type="number"
            name="floor"
            placeholder=""
            register={register}
            error={errors?.floor?.message as string}
          />
        </div>
        <div className="flex flex-col gap-4 w-1/2">
          <H1>What is the roof?</H1>
          <Select
            control={control}
            name="roof"
            options={roofOptions}
            placeholder={"Choose roof"}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <H1>Garden Plants</H1>
        <AsyncSelect
          control={control}
          name="plants"
          options={plantOptions as any}
          placeholder={"Choose plants"}
          onSearch={(value) => searchPlantByName(value)}
        />
      </div>
      <div className="pt-10 w-full flex justify-center">
        <Button>Continue</Button>
      </div>
    </form>
  );
};

export default FirstForm;
