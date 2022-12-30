import { searchPlants } from "@services";
import { isEmpty } from "lodash";
import { useState } from "react";

export const useSearchPlants = () => {
  const [plants, setPlants] = useState();
  const [searchName, setSearchName] = useState<string>();

  const searchPlantByName = async (name: string) => {
    if (!isEmpty(name) && name !== searchName) {
      try {
        setSearchName(name);
        const { plants } = await searchPlants(name);
        setPlants(plants);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return { searchPlantByName, plants };
};
