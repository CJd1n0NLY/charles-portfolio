"use client";

import { useState, use } from "react";
import { saveProject, deleteProject } from "../../actions";
import { useRouter } from "next/navigation";

// Define strict types
interface Challenge {
  title: string;
  description: string;
  order: number;
}

interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  chapter: string;
  status: string;
  problem: string;
  approach: string;
  outcome: string;
  techStack: string;
  liveUrl: string;
  repoUrl: string;
  challenges: Challenge[];
}

export default function ProjectEditForm({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<any> }) {
  const router = useRouter();
  const { id } = use(params);
  // In a real flow, you'd fetch initialData server-side and pass it as a prop. 
  // For brevity in this client component, we start blank if "new".
  const [data, setData] = useState<ProjectData>({
    id: id,
    title: "", tagline: "", chapter: "PERSONAL", status: "DRAFT", problem: "", approach: "", outcome: "", techStack: "", liveUrl: "", repoUrl: "", challenges: []
  });

  const addChallenge = () => setData({ ...data, challenges: [...data.challenges, { title: "", description: "", order: data.challenges.length }] });
  
  const updateChallenge = (index: number, field: keyof Challenge, value: string) => {
    const newChall = [...data.challenges];
    newChall[index] = { ...newChall[index], [field]: value };
    setData({ ...data, challenges: newChall });
  };

  const moveChallenge = (index: number, direction: -1 | 1) => {
    if (index + direction < 0 || index + direction >= data.challenges.length) return;
    const newChall = [...data.challenges];
    const temp = newChall[index];
    newChall[index] = newChall[index + direction];
    newChall[index + direction] = temp;
    setData({ ...data, challenges: newChall });
  };

  const removeChallenge = (index: number) => {
    setData({ ...data, challenges: data.challenges.filter((_, idx) => idx !== index) });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-primary">
      <form action={saveProject} className="space-y-6">
        <input type="hidden" name="id" value={data.id} />
        <input type="hidden" name="challenges" value={JSON.stringify(data.challenges)} />

        <div className="grid grid-cols-2 gap-4">
          <input name="title" placeholder="Title" value={data.title} onChange={e => setData({...data, title: e.target.value})} className="bg-surface p-2 w-full" required />
          <select name="chapter" value={data.chapter} onChange={e => setData({...data, chapter: e.target.value})} className="bg-surface p-2 w-full">
            <option value="ACADEMIC">Academic</option>
            <option value="INTERNSHIP">Internship</option>
            <option value="CAPSTONE">Capstone</option>
            <option value="PERSONAL">Personal</option>
          </select>
        </div>

        <input name="tagline" placeholder="Tagline" value={data.tagline} onChange={e => setData({...data, tagline: e.target.value})} className="bg-surface p-2 w-full" required />
        <textarea name="problem" placeholder="The Problem Space" value={data.problem} onChange={e => setData({...data, problem: e.target.value})} className="bg-surface p-2 w-full h-32" />
        <textarea name="approach" placeholder="Engineering Approach" value={data.approach} onChange={e => setData({...data, approach: e.target.value})} className="bg-surface p-2 w-full h-32" />
        <textarea name="outcome" placeholder="Outcome" value={data.outcome} onChange={e => setData({...data, outcome: e.target.value})} className="bg-surface p-2 w-full h-32" />
        <input name="techStack" placeholder="Tech Stack (comma separated)" value={data.techStack} onChange={e => setData({...data, techStack: e.target.value})} className="bg-surface p-2 w-full" />
        
        <div className="grid grid-cols-2 gap-4">
          <input name="liveUrl" placeholder="Live URL" value={data.liveUrl} onChange={e => setData({...data, liveUrl: e.target.value})} className="bg-surface p-2 w-full" />
          <input name="repoUrl" placeholder="Repo URL" value={data.repoUrl} onChange={e => setData({...data, repoUrl: e.target.value})} className="bg-surface p-2 w-full" />
        </div>

        <div className="space-y-4 pt-6 border-t border-surface">
          <h3 className="font-display text-xl text-accent">Challenges</h3>
          {data.challenges.map((c, i) => (
            <div key={i} className="p-4 bg-surface/50 border border-surface flex gap-4">
              <div className="flex flex-col gap-2">
                <button type="button" onClick={() => moveChallenge(i, -1)} className="text-muted">↑</button>
                <button type="button" onClick={() => moveChallenge(i, 1)} className="text-muted">↓</button>
              </div>
              <div className="flex-1 space-y-2">
                <input placeholder="Challenge Title" value={c.title} onChange={e => updateChallenge(i, 'title', e.target.value)} className="bg-surface p-2 w-full font-mono text-sm" />
                <textarea placeholder="Resolution..." value={c.description} onChange={e => updateChallenge(i, 'description', e.target.value)} className="bg-surface p-2 w-full h-24 text-sm" />
              </div>
              <button type="button" onClick={() => removeChallenge(i)} className="text-accent">X</button>
            </div>
          ))}
          <button type="button" onClick={addChallenge} className="w-full p-2 border border-dashed border-surface text-muted hover:text-primary font-mono text-sm">+ APPEND LOG ENTRY</button>
        </div>

        <div className="flex gap-4 pt-6">
          <button type="submit" className="bg-accent text-canvas px-6 py-2 font-bold flex-1">Commit Log</button>
        </div>
      </form>

      {data.id !== "new" && (
        <form action={deleteProject} className="mt-4" onSubmit={e => { if(!confirm("Delete this project completely?")) e.preventDefault(); }}>
          <input type="hidden" name="id" value={data.id} />
          <button type="submit" className="text-red-500 text-sm font-mono hover:underline">Delete Project</button>
        </form>
      )}
    </div>
  );
}