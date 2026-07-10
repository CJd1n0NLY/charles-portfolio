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

export default function ProjectFormClient({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [data, setData] = useState({
    id: initialData?.id || "new",
    title: initialData?.title || "",
    tagline: initialData?.tagline || "",
    chapter: initialData?.chapter || "PERSONAL",
    status: initialData?.status || "DRAFT",
    problem: initialData?.problem || "",
    approach: initialData?.approach || "",
    outcome: initialData?.outcome || "",
    techStack: initialData?.techStack || "",
    liveUrl: initialData?.liveUrl || "",
    repoUrl: initialData?.repoUrl || "",
    heroImageUrl: initialData?.heroImageUrl || "",
    challenges: initialData?.challenges || [],
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

//   const removeChallenge = (index: number) => {
//     setData({ ...data, challenges: data.challenges.filter((_, idx) => idx !== index) });
//   };

  return (
    <div className="max-w-4xl mx-auto p-6 text-primary">
      <form action={saveProject} className="space-y-6">
        <input type="hidden" name="id" value={data.id} />
        {/* Pass complex arrays as JSON strings to the FormData */}
        <input type="hidden" name="challenges" value={JSON.stringify(data.challenges)} />

        <div className="flex justify-between items-center pb-4 border-b border-surface">
          <h1 className="text-3xl font-display">{data.id === "new" ? "New Project Log" : `Editing: ${data.title}`}</h1>
          <select 
            name="status" 
            value={data.status} 
            onChange={e => setData({...data, status: e.target.value})} 
            className="custom-select"
          >
            <option value="DRAFT">DRAFT</option>
            <option value="PUBLISHED">PUBLISHED</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input name="title" placeholder="Title" value={data.title} onChange={e => setData({...data, title: e.target.value})} className="bg-canvas border border-surface hover:border-muted focus:border-accent p-3 w-full rounded transition-colors" required />
          <select name="chapter" value={data.chapter} onChange={e => setData({...data, chapter: e.target.value})} className="custom-select">
            <option value="ACADEMIC">Academic</option>
            <option value="INTERNSHIP">Internship</option>
            <option value="CAPSTONE">Capstone</option>
            <option value="PERSONAL">Personal</option>
          </select>
        </div>
        
        {/* Image Upload Fallback (URL input) - Full Vercel Blob drag-drop is handled in the dedicated Settings page for brevity here */}
        <input name="heroImageUrl" placeholder="Hero Image URL (Optional)" value={data.heroImageUrl} onChange={e => setData({...data, heroImageUrl: e.target.value})} className="bg-canvas border border-surface hover:border-muted p-3 w-full rounded transition-colors text-sm font-mono" />
        
        <input name="tagline" placeholder="Tagline" value={data.tagline} onChange={e => setData({...data, tagline: e.target.value})} className="bg-canvas border border-surface hover:border-muted focus:border-accent p-3 w-full rounded transition-colors" required />
        <textarea name="problem" placeholder="The Problem Space" value={data.problem} onChange={e => setData({...data, problem: e.target.value})} className="bg-canvas border border-surface hover:border-muted p-3 w-full h-32 rounded transition-colors" />
        <textarea name="approach" placeholder="Engineering Approach" value={data.approach} onChange={e => setData({...data, approach: e.target.value})} className="bg-canvas border border-surface hover:border-muted p-3 w-full h-32 rounded transition-colors" />
        <textarea name="outcome" placeholder="Outcome" value={data.outcome} onChange={e => setData({...data, outcome: e.target.value})} className="bg-canvas border border-surface hover:border-muted p-3 w-full h-32 rounded transition-colors" />
        
        <div className="flex gap-4 pt-6">
          <button type="submit" className="bg-accent hover:bg-accent/80 text-canvas px-6 py-3 font-bold flex-1 cursor-pointer transition-colors rounded">Commit Log</button>
        </div>
      </form>

      {data.id !== "new" && (
        <form action={deleteProject} className="mt-8 text-right">
          <input type="hidden" name="id" value={data.id} />
          <button type="submit" className="text-muted hover:text-red-500 text-sm font-mono cursor-pointer transition-colors px-4 py-2 border border-transparent hover:border-red-500/20 rounded">
            DELETE PROJECT
          </button>
        </form>
      )}
    </div>
  );
}