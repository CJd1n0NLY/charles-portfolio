import { prisma } from "@/lib/prisma";
import { saveSkill, deleteSkill } from "../actions";

export default async function SkillsAdmin() {
  const skills = await prisma.skill.findMany({ orderBy: { name: "asc" } });
  const categories = ["LANGUAGE", "FRAMEWORK", "DATABASE", "TOOL", "METHODOLOGY"];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12 bg-canvas text-primary font-body">
      <header>
        <h1 className="font-display text-3xl">Skills Database</h1>
      </header>

      {/* ADD NEW SKILL FORM */}
      <section className="p-6 bg-surface border border-surface/80 rounded space-y-4">
        <h2 className="font-mono text-accent text-sm">+ LOG NEW SKILL</h2>
        <form action={saveSkill} className="flex gap-4">
          <input type="hidden" name="id" value="new" />
          <input name="name" placeholder="Skill Name (e.g. React)" required className="bg-canvas p-2 flex-1 border border-surface text-sm" />
          <select name="category" className="bg-canvas p-2 border border-surface text-sm">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button type="submit" className="bg-accent text-canvas px-6 font-bold text-sm">Commit</button>
        </form>
      </section>

      {/* LIST GROUPED BY CATEGORY */}
      <section className="space-y-8">
        {categories.map(category => {
          const categorySkills = skills.filter(s => s.category === category);
          if (categorySkills.length === 0) return null;

          return (
            <div key={category} className="space-y-4">
              <h3 className="font-mono text-muted tracking-widest text-xs uppercase">{category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categorySkills.map(skill => (
                  <div key={skill.id} className="flex items-center justify-between p-3 border border-surface/50 bg-surface/20">
                    <span className="text-sm">{skill.name}</span>
                    <form action={deleteSkill}>
                      <input type="hidden" name="id" value={skill.id} />
                      <button type="submit" className="text-accent hover:text-red-500 font-mono text-xs">DEL</button>
                    </form>
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