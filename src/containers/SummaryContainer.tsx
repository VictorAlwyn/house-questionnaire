import { Button, H1 } from "@components";
import { useQuestionnaireStore } from "@store";
import { Room, Window } from "@types";
import { get, head, map } from "lodash";

export const SummaryContainer = () => {
  const { data, clear } = useQuestionnaireStore();

  const renderRoomInfo = (index: number) => {
    const rooms = get(data, `rooms[${index}]`);
    const windows = get(data, `windows[${index}]`);

    return map(rooms, (room: Room) => (
      <div className="bg-slate-100 px-10 py-5 rounded-lg">
        <H1>Room #{index + 1}</H1>
        <ul className="list-disc">
          <li>{room?.size} Sqm</li>
          <li>{room?.type}</li>
          <li>{room?.floorType} Floor</li>
          <li>{room?.window} Window</li>
        </ul>

        {map(windows, (window: Window[], index) => (
          <div>
            <H1>Window #{index + 1}</H1>
            <ul className="list-disc">
              <li>{get(head(window), "type")}</li>
              <li>{get(head(window), "glassType")}</li>
            </ul>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-10">
      <H1>Summary</H1>
      <div className="flex">
        <div className="w-1/2">
          <H1>What type of foundation?</H1>
          <ul className="list-disc">
            <li>{get(data, "foundation")}</li>
          </ul>
        </div>
        <div className="w-1/2">
          <H1>What size? (SQM)</H1>
          <ul className="list-disc">
            <li>{get(data, "size")}</li>
          </ul>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2">
          <H1>How many floors?</H1>
          <ul className="list-disc">
            <li>{get(data, "floor")}</li>
          </ul>
        </div>
        <div className="w-1/2">
          <H1>What is the roof?</H1>
          <ul className="list-disc">
            <li>{get(data, "roof")}</li>
          </ul>
        </div>
      </div>
      <div className="flex">
        <div className="w-full">
          <H1>Garden plants</H1>
          <ul className="list-disc">
            <li>{get(data, "plants")}</li>
          </ul>
        </div>
      </div>

      {map(get(data, "floors"), (floor, index) => (
        <div className="bg-white rounded-lg flex flex-col px-10 py-5">
          <div className="w-full">
            <H1>Floor #{index + 1}</H1>
            <ul className="list-disc">
              <li>{get(floor, "room")}</li>
            </ul>
          </div>

          <div className="flex w-full p-2 flex-wrap gap-5">
            {renderRoomInfo(index)}
          </div>
        </div>
      ))}

      <div className="pt-10 w-full flex justify-center">
        <Button onClick={() => clear()}>Submit</Button>
      </div>
    </div>
  );
};
