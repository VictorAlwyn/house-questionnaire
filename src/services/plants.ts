import axios from "axios";

export const searchPlants = async (plantName: string) => {
  const response = await axios({
    method: "POST",
    url: `api/searchPlants`,
    data: {
      plantName,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return response?.data;
};
