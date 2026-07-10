import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function SiteSettingsPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "global" } });

  async function updateSettings(formData: FormData) {
    "use server";
    const url = formData.get("heroPortraitUrl") as string;
    await prisma.siteSettings.upsert({
      where: { id: "global" },
      update: { heroPortraitUrl: url },
      create: { id: "global", heroPortraitUrl: url }
    });
    revalidatePath("/");
    revalidatePath("/admin/settings");
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-display">Identity & Imagery</h1>
      <form action={updateSettings} className="space-y-4 p-6 border border-surface bg-surface/20">
         <h2 className="font-mono text-sm text-accent">Homepage Portrait</h2>
         <input name="heroPortraitUrl" defaultValue={settings?.heroPortraitUrl || ""} placeholder="https://... (URL or Vercel Blob output)" className="w-full bg-canvas border border-surface p-3 font-mono text-sm rounded focus:border-accent outline-none" />
         <button type="submit" className="bg-accent text-canvas px-4 py-2 font-bold cursor-pointer hover:bg-accent/80 rounded">Update Graphic</button>
      </form>
    </div>
  );
}