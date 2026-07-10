import { prisma } from "@/lib/prisma";
import { saveEducation, deleteEducation } from "../actions";

export default async function EducationAdmin() {
  const education = await prisma.education.findMany({ orderBy: { endYear: "desc" } });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12 bg-canvas text-primary font-body">
      <header>
        <h1 className="font-display text-3xl">Academic Records</h1>
      </header>

      {/* ADD NEW FORM */}
      <section className="p-6 bg-surface border border-surface/80 rounded space-y-4">
        <h2 className="font-mono text-accent text-sm">+ APPEND RECORD</h2>
        <form action={saveEducation} className="space-y-4">
          <input type="hidden" name="id" value="new" />
          <div className="grid grid-cols-2 gap-4">
            <input name="school" placeholder="Institution" required className="bg-canvas p-2 border border-surface text-sm w-full" />
            <input name="degree" placeholder="Degree (e.g. BSIT)" required className="bg-canvas p-2 border border-surface text-sm w-full" />
            <input name="section" placeholder="Section (Optional)" className="bg-canvas p-2 border border-surface text-sm w-full" />
            <input name="honors" placeholder="Honors (Optional)" className="bg-canvas p-2 border border-surface text-sm w-full" />
            <input type="number" name="startYear" placeholder="Start Year" required className="bg-canvas p-2 border border-surface text-sm w-full" />
            <input type="number" name="endYear" placeholder="End Year" required className="bg-canvas p-2 border border-surface text-sm w-full" />
          </div>
          <button type="submit" className="bg-accent text-canvas px-6 py-2 font-bold text-sm w-full">Commit</button>
        </form>
      </section>

      {/* RECORDS LIST */}
      <section className="space-y-4">
        {education.map(ed => (
          <div key={ed.id} className="p-4 border border-surface bg-surface/30 flex justify-between items-center">
            <div>
              <h3 className="font-display text-xl">{ed.degree}</h3>
              <p className="font-mono text-xs text-muted">{ed.school} // {ed.startYear} - {ed.endYear}</p>
              {ed.honors && <p className="font-mono text-xs text-accent mt-1 uppercase">{ed.honors}</p>}
            </div>
            <form action={deleteEducation}>
              <input type="hidden" name="id" value={ed.id} />
              <button type="submit" className="text-red-500 font-mono text-xs hover:underline">DEL</button>
            </form>
          </div>
        ))}
      </section>
    </div>
  );
}