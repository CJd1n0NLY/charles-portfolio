import { prisma } from "@/lib/prisma";
import ExperienceClient from "./ExperienceClient";

export default async function ExperienceAdmin() {
  const experiences = await prisma.workExperience.findMany({
    orderBy: { startDate: "desc" },
  });

  return <ExperienceClient experiences={experiences} />;
}