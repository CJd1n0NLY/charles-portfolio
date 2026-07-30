import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import ActionForm from "@/components/ActionForm";

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
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-paper text-ink font-body min-h-screen">
      <header className="border-b border-line pb-6">
        <h1 className="text-3xl font-display font-semibold">Identity & Imagery</h1>
        <Link href="/admin" className="font-mono text-xs text-ink-soft hover:text-ribbon transition-colors mt-2 inline-block">
            &larr; Return to Command Center
        </Link>
      </header>

      <ActionForm action={updateSettings} successMessage="Settings saved!" className="space-y-4 p-6 border border-line bg-card rounded-sm shadow-sm">
         <h2 className="font-mono text-sm text-ribbon font-medium">~/config/site_settings.json</h2>
         <input 
            name="heroPortraitUrl" 
            defaultValue={settings?.heroPortraitUrl || ""} 
            placeholder="https://... (URL or Vercel Blob output)" 
            className="w-full bg-paper border border-line p-3 font-mono text-sm rounded-sm focus:border-ribbon outline-none transition-colors" 
         />
         <button type="submit" className="bg-ribbon text-card px-6 py-2 font-medium cursor-pointer hover:bg-ribbon-ink transition-colors rounded-sm">
            Update Graphic
         </button>
      </ActionForm>
    </div>
  );
}