import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { toggleProjectStatus } from "./actions";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch all projects and order them
  const projects = await prisma.project.findMany({
    orderBy: [{ chapter: "asc" }, { order: "asc" }],
  });

  const chapters = ["ACADEMIC", "INTERNSHIP", "CAPSTONE", "PERSONAL"] as const;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12 bg-canvas text-primary font-body">
      {/* Dashboard Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-surface">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tighter">Command Center</h1>
          <p className="text-sm text-muted font-mono mt-1">Authenticated as: {session.user?.email}</p>
        </div>
        <LogoutButton />
      </header>

      {/* Global Admin Navigation */}
      <nav className="flex flex-wrap gap-4 font-mono text-sm">
        <Link href="/admin/skills" className="px-4 py-2 border border-surface hover:bg-surface text-muted hover:text-primary transition-colors">
          Manage Skills
        </Link>
        <Link href="/admin/experience" className="px-4 py-2 border border-surface hover:bg-surface text-muted hover:text-primary transition-colors">
          Manage Experience
        </Link>
        <Link href="/admin/education" className="px-4 py-2 border border-surface hover:bg-surface text-muted hover:text-primary transition-colors">
          Manage Education
        </Link>
        <Link href="/admin/certificates" className="px-4 py-2 border border-surface hover:bg-surface text-muted hover:text-primary transition-colors">
          Manage Certificates
        </Link>
      </nav>

      {/* Projects Manager */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display">Project Matrix</h2>
          <span className="text-xs font-mono text-muted uppercase">Total Entries: {projects.length}</span>
        </div>

        <div className="grid gap-8">
          {chapters.map((chapter) => {
            const chapterProjects = projects.filter((p) => p.chapter === chapter);

            return (
              <div key={chapter} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold tracking-widest text-accent uppercase font-mono">{chapter}</h3>
                  <Link 
                    href={`/admin/projects/new`} 
                    className="text-xs font-mono text-muted hover:text-primary border border-surface px-2 py-1"
                  >
                    + ADD PROJECT
                  </Link>
                </div>
                
                <div className="border border-surface rounded-lg overflow-hidden bg-surface/20">
                  {chapterProjects.length === 0 ? (
                    <div className="p-6 text-sm font-mono text-muted text-center">[ NO PROJECTS LOGGED ]</div>
                  ) : (
                    <div className="divide-y divide-surface">
                      {chapterProjects.map((project) => (
                        <div key={project.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4 hover:bg-surface/40 transition-colors">
                          <div className="space-y-1">
                            {/* FIX: This now points to the edit form */}
                            <Link href={`/admin/projects/${project.id}`} className="font-bold text-lg text-primary hover:text-accent transition-colors flex items-center gap-3">
                              {project.title}
                              <span className="text-[10px] font-mono text-muted bg-canvas border border-surface px-1.5 py-0.5 rounded-sm hover:text-primary">
                                EDIT
                              </span>
                            </Link>
                            <p className="text-xs text-muted line-clamp-1">{project.tagline}</p>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            {/* Server Action Form for Toggling Status */}
                            <form action={toggleProjectStatus}>
                              <input type="hidden" name="id" value={project.id} />
                              <input type="hidden" name="status" value={project.status} />
                              <button 
                                type="submit"
                                className={`px-3 py-1 text-xs font-mono tracking-wider uppercase transition-colors ${
                                  project.status === "PUBLISHED" 
                                    ? "bg-accent/10 text-accent border border-accent/20 hover:bg-accent hover:text-canvas" 
                                    : "bg-surface text-muted border border-surface hover:text-primary"
                                }`}
                              >
                                {project.status}
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