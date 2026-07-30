import { prisma } from "@/lib/prisma";
import { saveSkill, deleteSkill } from "../actions";
import Link from "next/link";
import ActionForm from "@/components/ActionForm";

export default async function SkillsAdmin() {
  const skills = await prisma.skill.findMany({ orderBy: { name: "asc" } });
  const categories = ["LANGUAGE", "FRAMEWORK", "DATABASE", "TOOL", "METHODOLOGY"];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12 bg-paper text-ink font-body min-h-screen">
      <header className="border-b border-line pb-6">
        <h1 className="font-display text-3xl font-semibold">Skills Database</h1>
        <Link href="/admin" className="font-mono text-xs text-ink-soft hover:text-ribbon transition-colors mt-2 inline-block">
            &larr; Return to Command Center
        </Link>
      </header>

      {/* Add New Form */}
      <section className="p-6 bg-card border border-line rounded-sm space-y-4 shadow-sm">
        <h2 className="font-mono text-ribbon text-sm font-medium">~/scripts/log_skill.sh</h2>
        <ActionForm action={saveSkill} successMessage="Skill logged successfully!" className="flex gap-4">
          <input type="hidden" name="id" value="new" />
          <input name="name" placeholder="Skill Name (e.g. React)" required className="bg-paper p-2.5 flex-1 border border-line text-sm focus:border-ribbon outline-none transition-colors rounded-sm" />
          <select name="category" className="custom-select">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button type="submit" className="bg-ribbon hover:bg-ribbon-ink transition-colors text-card px-6 font-medium text-sm cursor-pointer rounded-sm">Execute</button>
        </ActionForm>
      </section>

      {/* List by Category */}
      <section className="space-y-10">
        {categories.map(category => {
          const categorySkills = skills.filter(s => s.category === category);
          if (categorySkills.length === 0) return null;

          return (
            <div key={category} className="space-y-4">
              <h3 className="font-mono text-ink-soft tracking-wider text-xs uppercase border-b border-line pb-2">{category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categorySkills.map(skill => (
                  <div key={skill.id} className="flex items-center justify-between p-3 border border-line bg-card rounded-sm gap-4 min-w-0">
                    <span className="text-sm font-medium truncate">{skill.name}</span>
                    <ActionForm action={deleteSkill} successMessage="Skill deleted!" className="shrink-0">
                      <input type="hidden" name="id" value={skill.id} />
                      <button type="submit" className="text-ink-soft hover:text-ribbon font-mono text-xs cursor-pointer transition-colors px-2">DEL</button>
                    </ActionForm>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}