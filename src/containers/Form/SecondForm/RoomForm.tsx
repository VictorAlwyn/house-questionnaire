import { H1, InputField, RadioGroup, Select } from "@components";
import { useQuestionnaireStore } from "@store";
import { EFloorType, ERoomType } from "@types";
import { map, size, values } from "lodash";
import { FC, Fragment, useEffect, useMemo } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import WindowForm from "./WindowForm";

type RoomFormProps = {
  form: UseFormReturn<any>;
  floorIndex: number;
  roomNumber: number;
};

const RoomForm: FC<RoomFormProps> = ({ floorIndex, roomNumber, form }) => {
  const { roomSpecialProperties, addRoomSpecialProperties } =
    useQuestionnaireStore();
  const { control, register, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: `rooms[${floorIndex}]`, // unique name for your Field Array
  });

  const { rooms } = watch();

  const roomTypeOptions = map(values(ERoomType), (room) => ({
    label: room,
    value: room,
  }));

  const floorTypeOptions = map(values(EFloorType), (room) => ({
    label: room,
    value: room,
  }));

  const roomSpecialPropertiesOptions = useMemo(() => {
    return map(roomSpecialProperties, (props) => ({
      label: props,
      value: props,
    }));
  }, [roomSpecialProperties]);

  useEffect(() => {
    if (size(fields) !== roomNumber) {
      for (let i = 0; i < roomNumber; i++) {
        append({});
      }
    }
  }, [roomNumber]);

  const onAddNewRoomSpecialProperties = (value: string) =>
    addRoomSpecialProperties(value);

  return (
    <form className="flex flex-col gap-4 w-full">
      {map(fields, (field, index) => (
        <Fragment key={field.id}>
          <H1>Room #{index + 1}</H1>
          <div className="flex justify-center gap-10">
            <div className="flex flex-col gap-4 w-1/2">
              <H1>Room size (Sqm)</H1>
              <InputField
                type="number"
                name={`rooms[${floorIndex}].${index}.size`}
                placeholder=""
                register={register}
              />
            </div>
            <div className="flex flex-col gap-4 w-1/2">
              <H1>Room type</H1>
              <Select
                control={control}
                name={`rooms[${floorIndex}].${index}.type`}
                options={roomTypeOptions}
                placeholder={"Choose room type"}
              />
            </div>
          </div>
          <div className="flex justify-center gap-10">
            <div className="flex flex-col gap-4 w-1/2">
              <H1>Room special properties</H1>
              <Select
                isMulti
                control={control}
                name={`rooms[${floorIndex}].${index}.roomSpecialProperties`}
                options={roomSpecialPropertiesOptions}
                noOptionOnsubmit={onAddNewRoomSpecialProperties}
                placeholder={"Add room special properties"}
              />
            </div>
            <div className="flex flex-col gap-4 w-1/2">
              <H1>Floor type</H1>
              <RadioGroup
                name={`rooms[${floorIndex}].${index}.floorType`}
                register={register}
                options={floorTypeOptions}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <H1>How many windows?</H1>
            <InputField
              type="number"
              name={`rooms[${floorIndex}].${index}.window`}
              placeholder=""
              register={register}
            />
            <WindowForm
              floorIndex={floorIndex}
              roomIndex={index}
              form={form}
              windowNumber={rooms[floorIndex][index]?.window}
            />
          </div>
        </Fragment>
      ))}
    </form>
  );
};

export default RoomForm;
