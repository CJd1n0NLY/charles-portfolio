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
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      {/* Dashboard Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-surface">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tighter text-primary">Command Center</h1>
          <p className="text-sm text-muted font-mono mt-1">Authenticated as: {session.user?.email}</p>
        </div>
        <LogoutButton />
      </header>

      {/* Projects Manager */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">Project Matrix</h2>
          <span className="text-xs font-mono text-muted uppercase">Total Entries: {projects.length}</span>
        </div>

        <div className="grid gap-8">
          {chapters.map((chapter) => {
            const chapterProjects = projects.filter((p) => p.chapter === chapter);

            return (
              <div key={chapter} className="space-y-4">
                <h3 className="text-sm font-semibold tracking-widest text-accent uppercase">{chapter}</h3>
                
                <div className="border border-surface rounded-lg overflow-hidden bg-surface/20">
                  {chapterProjects.length === 0 ? (
                    <div className="p-6 text-sm font-mono text-muted text-center">No projects in this chapter.</div>
                  ) : (
                    <div className="divide-y divide-surface">
                      {chapterProjects.map((project) => (
                        <div key={project.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4 hover:bg-surface/40 transition-colors">
                          <div className="space-y-1">
                            <Link href={`/work/${project.slug}`} target="_blank" className="font-bold text-primary hover:text-accent transition-colors">
                              {project.title}
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
                                className={`px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full transition-colors ${
                                  project.status === "PUBLISHED" 
                                    ? "bg-accent/10 text-accent border border-accent/20 hover:bg-accent hover:text-white" 
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