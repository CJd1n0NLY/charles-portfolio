import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { toggleProjectStatus } from "./actions";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/admin/login");

  const projects = await prisma.project.findMany({
    orderBy: [{ chapter: "asc" }, { order: "asc" }],
  });

  const chapters = ["ACADEMIC", "INTERNSHIP", "CAPSTONE", "PERSONAL"] as const;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12 bg-paper text-ink font-body min-h-screen">
      
      {/* Dashboard Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-line">
        <div>
          <h1 className="text-3xl font-display font-semibold tracking-tighter">Command Center</h1>
          <p className="text-sm text-ink-soft font-mono mt-1">Authenticated as: {session.user?.email}</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="font-mono text-xs text-ink-soft hover:text-ribbon transition-colors">
            &larr; Return to Live Site
          </Link>
          <LogoutButton />
        </div>
      </header>

      {/* Global Admin Navigation */}
      <nav className="flex flex-wrap gap-4 font-mono text-sm">
        <Link href="/admin/skills" className="px-4 py-2 border border-line bg-card hover:border-ribbon hover:text-ribbon transition-colors rounded-sm shadow-sm">
          Manage Skills
        </Link>
        <Link href="/admin/experience" className="px-4 py-2 border border-line bg-card hover:border-ribbon hover:text-ribbon transition-colors rounded-sm shadow-sm">
          Manage Experience
        </Link>
        <Link href="/admin/education" className="px-4 py-2 border border-line bg-card hover:border-ribbon hover:text-ribbon transition-colors rounded-sm shadow-sm">
          Manage Education
        </Link>
        <Link href="/admin/certificates" className="px-4 py-2 border border-line bg-card hover:border-ribbon hover:text-ribbon transition-colors rounded-sm shadow-sm">
          Manage Certificates
        </Link>
        <Link href="/admin/settings" className="px-4 py-2 border border-line bg-card hover:border-ribbon hover:text-ribbon transition-colors rounded-sm shadow-sm">
          Site Identity
        </Link>
      </nav>

      {/* Projects Manager */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display font-semibold">Project Matrix</h2>
          <span className="text-xs font-mono text-ink-soft uppercase">Total Entries: {projects.length}</span>
        </div>

        <div className="grid gap-8">
          {chapters.map((chapter) => {
            const chapterProjects = projects.filter((p) => p.chapter === chapter);

            return (
              <div key={chapter} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold tracking-widest text-ribbon uppercase font-mono">{chapter}</h3>
                  <Link 
                    href={`/admin/projects/new`} 
                    className="text-xs font-mono text-ink-soft hover:text-ribbon hover:border-ribbon border border-line bg-card px-3 py-1.5 rounded-sm transition-colors"
                  >
                    + NEW BUILD
                  </Link>
                </div>
                
                <div className="border border-line rounded-sm overflow-hidden bg-card">
                  {chapterProjects.length === 0 ? (
                    <div className="p-6 text-sm font-mono text-ink-soft text-center bg-paper/50">[ NO BUILDS LOGGED ]</div>
                  ) : (
                    <div className="divide-y divide-line">
                      {chapterProjects.map((project) => (
                        <div key={project.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4 hover:bg-line/20 transition-colors">
                          <div className="space-y-1">
                            <Link href={`/admin/projects/${project.id}`} className="font-semibold text-lg text-ink hover:text-ribbon transition-colors flex items-center gap-3">
                              {project.title}
                              <span className="text-[10px] font-mono text-ink-soft bg-paper border border-line px-1.5 py-0.5 rounded-sm hover:text-ribbon">
                                EDIT_RECORD
                              </span>
                            </Link>
                            <p className="text-xs text-ink-soft line-clamp-1">{project.tagline}</p>
                          </div>
                          
                          <div className="flex items-center gap-4 shrink-0">
                            <form action={toggleProjectStatus}>
                              <input type="hidden" name="id" value={project.id} />
                              <input type="hidden" name="status" value={project.status} />
                              <button 
                                type="submit"
                                className={`px-3 py-1.5 text-[10px] font-mono font-semibold tracking-wide uppercase rounded-sm transition-colors cursor-pointer ${
                                  project.status === "PUBLISHED" 
                                    ? "bg-[var(--color-pass-bg)] text-[var(--color-pass)] border border-[var(--color-pass-bg)] hover:bg-[var(--color-pass)] hover:text-white" 
                                    : "bg-paper text-ink-soft border border-line hover:text-ink hover:border-ink-soft"
                                }`}
                              >
                                VISIBILITY: {project.status}
                              </button>
                            </form>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}