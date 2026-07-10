"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleProjectStatus(formData: FormData) {
  const id = formData.get("id") as string;
  const currentStatus = formData.get("status") as string;
  
  const newStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";

  await prisma.project.update({
    where: { id },
    data: { status: newStatus },
  });

  // Force Next.js to clear the cache so the live site updates instantly
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/work/[slug]`, "page");
}

export async function saveProject(formData: FormData) {
  const id = formData.get("id") as string;
  const challengesStr = formData.get("challenges") as string;
  const challenges = JSON.parse(challengesStr || "[]");

  const data = {
    title: formData.get("title") as string,
    tagline: formData.get("tagline") as string,
    chapter: formData.get("chapter") as string,
    status: formData.get("status") as string,
    problem: formData.get("problem") as string,
    approach: formData.get("approach") as string,
    outcome: formData.get("outcome") as string,
    techStack: formData.get("techStack") as string,
    liveUrl: formData.get("liveUrl") as string,
    repoUrl: formData.get("repoUrl") as string,
  };

  if (id === "new") {
    // Generate slug from title
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    await prisma.project.create({
      data: { ...data, slug, challenges: { create: challenges } },
    });
  } else {
    // Delete old challenges and recreate them to handle reordering/removal simply
    await prisma.challenge.deleteMany({ where: { projectId: id } });
    await prisma.project.update({
      where: { id },
      data: { ...data, challenges: { create: challenges } },
    });
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteProject(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}

// --- SKILLS ACTIONS ---
export async function saveSkill(formData: FormData) {
  const id = formData.get("id") as string;
  const data = {
    name: formData.get("name") as string,
    category: formData.get("category") as string,
  };

  if (id === "new") {
    await prisma.skill.create({ data });
  } else {
    await prisma.skill.update({ where: { id }, data });
  }
  revalidatePath("/admin/skills");
  revalidatePath("/about");
}

export async function deleteSkill(formData: FormData) {
  await prisma.skill.delete({ where: { id: formData.get("id") as string } });
  revalidatePath("/admin/skills");
  revalidatePath("/about");
}

// --- WORK EXPERIENCE ACTIONS ---
export async function saveExperience(formData: FormData) {
  const id = formData.get("id") as string;
  const data = {
    company: formData.get("company") as string,
    role: formData.get("role") as string,
    location: formData.get("location") as string,
    startDate: new Date(formData.get("startDate") as string),
    endDate: formData.get("endDate") ? new Date(formData.get("endDate") as string) : null,
    responsibilities: formData.get("responsibilities") as string, // JSON string
  };

  if (id === "new") {
    await prisma.workExperience.create({ data });
  } else {
    await prisma.workExperience.update({ where: { id }, data });
  }
  revalidatePath("/admin/experience");
  revalidatePath("/");
}

export async function deleteExperience(formData: FormData) {
  await prisma.workExperience.delete({ where: { id: formData.get("id") as string } });
  revalidatePath("/admin/experience");
  revalidatePath("/");
}

// --- EDUCATION ACTIONS ---
export async function saveEducation(formData: FormData) {
  const id = formData.get("id") as string;
  const data = {
    school: formData.get("school") as string,
    degree: formData.get("degree") as string,
    section: formData.get("section") as string,
    honors: formData.get("honors") as string,
    startYear: parseInt(formData.get("startYear") as string, 10),
    endYear: parseInt(formData.get("endYear") as string, 10),
  };

  if (id === "new") {
    await prisma.education.create({ data });
  } else {
    await prisma.education.update({ where: { id }, data });
  }
  revalidatePath("/admin/education");
  revalidatePath("/about");
}

export async function deleteEducation(formData: FormData) {
  await prisma.education.delete({ where: { id: formData.get("id") as string } });
  revalidatePath("/admin/education");
  revalidatePath("/about");
}

// --- CERTIFICATE OVERRIDE ACTIONS ---
export async function updateCertificateStatus(formData: FormData) {
  const id = formData.get("id") as string;
  const reviewStatus = formData.get("reviewStatus") as string;
  
  await prisma.certificate.update({
    where: { id },
    data: { reviewStatus },
  });
  
  revalidatePath("/admin/certificates");
  revalidatePath("/about");
}

export async function deleteCertificate(formData: FormData) {
  await prisma.certificate.delete({ where: { id: formData.get("id") as string } });
  revalidatePath("/admin/certificates");
  revalidatePath("/about");
}