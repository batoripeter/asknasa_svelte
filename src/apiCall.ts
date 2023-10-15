import { z } from "zod";
import http from "axios";

const NasaResponseSchema = z.object({
  date: z.string(),
  explanation: z.string(),
  hdurl: z.string(),
  title: z.string(),
  copyright: z.string().optional(),
});

export type NasaResponse = z.infer<typeof NasaResponseSchema>;

export let currentDate = new Date().toISOString().slice(0, 10);

const loadImage = async (currentDate: string) => {
  const response = await http.get(
    "https://api.nasa.gov/planetary/apod?api_key=j3HzB7I0cRAep37Ke3G6lCsuoKzXQGswHcsF30Bb&date=" +
      currentDate
  );
  const data: NasaResponse = response.data;
  const result = NasaResponseSchema.safeParse(data);

  if (!result.success) {
    return alert("Error in received data");
  }
  return result.data
};
export default loadImage;
