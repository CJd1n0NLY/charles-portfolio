import { prisma } from "@/lib/prisma";
import { saveEducation, deleteEducation } from "../actions";
import Link from "next/link";
import ActionForm from "@/components/ActionForm";

export default async function EducationAdmin() {
  const education = await prisma.education.findMany({ orderBy: { endYear: "desc" } });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12 bg-paper text-ink font-body min-h-screen">
      <header className="border-b border-line pb-6">
        <h1 className="font-display text-3xl font-semibold">Academic Records</h1>
        <Link href="/admin" className="font-mono text-xs text-ink-soft hover:text-ribbon transition-colors mt-2 inline-block">
            &larr; Return to Command Center
        </Link>
      </header>

      {/* ADD NEW FORM */}
      <section className="p-6 bg-card border border-line rounded-sm space-y-4 shadow-sm">
        <h2 className="font-mono text-ribbon text-sm font-medium">~/scripts/log_education.sh</h2>
        <ActionForm action={saveEducation} successMessage="Education record logged!" className="space-y-4">
          <input type="hidden" name="id" value="new" />
          <div className="grid grid-cols-2 gap-4">
            <input name="school" placeholder="Institution" required className="bg-paper p-3 border border-line focus:border-ribbon outline-none transition-colors text-sm w-full rounded-sm" />
            <input name="degree" placeholder="Degree (e.g. BSIT)" required className="bg-paper p-3 border border-line focus:border-ribbon outline-none transition-colors text-sm w-full rounded-sm" />
            <input name="section" placeholder="Section (Optional)" className="bg-paper p-3 border border-line focus:border-ribbon outline-none transition-colors text-sm w-full rounded-sm" />
            <input name="honors" placeholder="Honors (Optional)" className="bg-paper p-3 border border-line focus:border-ribbon outline-none transition-colors text-sm w-full rounded-sm" />
            <input type="number" name="startYear" placeholder="Start Year" required className="bg-paper p-3 border border-line focus:border-ribbon outline-none transition-colors text-sm w-full rounded-sm" />
            <input type="number" name="endYear" placeholder="End Year" required className="bg-paper p-3 border border-line focus:border-ribbon outline-none transition-colors text-sm w-full rounded-sm" />
          </div>
          <button type="submit" className="bg-ribbon hover:bg-ribbon-ink text-card px-6 py-3 font-medium text-sm w-full transition-colors cursor-pointer rounded-sm">Commit Record</button>
        </ActionForm>
      </section>

      {/* RECORDS LIST */}
      <section className="space-y-4">
        {education.map(ed => (
          <div key={ed.id} className="p-6 border border-line bg-card flex justify-between items-center rounded-sm">
            <div>
              <h3 className="font-display text-xl font-semibold text-ink">{ed.degree}</h3>
              <p className="font-mono text-xs text-ink-soft mt-1">{ed.school} // {ed.startYear} - {ed.endYear}</p>
              {ed.honors && <p className="font-mono text-xs text-ribbon mt-2 uppercase">{ed.honors}</p>}
            </div>
            <ActionForm action={deleteEducation} successMessage="Record deleted!">
              <input type="hidden" name="id" value={ed.id} />
              <button type="submit" className="text-ink-soft hover:text-ribbon font-mono text-xs transition-colors cursor-pointer">DEL</button>
            </ActionForm>
          </div>
        ))}
      </section>
    </div>
  );
}