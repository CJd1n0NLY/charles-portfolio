import { prisma } from "@/lib/prisma";
import ProjectFormClient from "./ProjectFormClient";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (id === "new") {
    return <ProjectFormClient initialData={null} />;
  }

  // Fetch the project and specifically include the relational arrays
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      challenges: { orderBy: { order: "asc" } },
      gallery: { orderBy: { order: "asc" } },
    },
  });

  if (!project) {
    notFound();
  }

  return <ProjectFormClient initialData={project} />;
}