import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About me",
  description: "About Fola Oluwafemi, a mobile software developer.",
};

export { AboutMeScreen as default } from "@features/about_me/presentation/screens/AboutMeScreen";
