import { prisma } from "@/lib/prisma";
import ProjectFormClient from "./ProjectFormClient";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (id === "new") {
    return <ProjectFormClient initialData={null} />;
  }

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      challenges: { orderBy: { order: "asc" } },
      gallery: { orderBy: { order: "asc" } },
    },
  });

  if (!project) notFound();

  return <ProjectFormClient initialData={project} />;
}