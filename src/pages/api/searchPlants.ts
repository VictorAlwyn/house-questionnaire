import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const baseUrl = process.env.TREFLE_BASE_URL;
    const tokenApi = process.env.TREFLE_API_KEY;

    const { plantName } = req.body;

    const response = await axios({
      method: "GET",
      url: `${baseUrl}/search`,
      withCredentials: false,
      params: {
        token: tokenApi,
        q: plantName,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    res.status(200).json({ plants: response?.data });
  } else {
    res.status(404);
  }
}
