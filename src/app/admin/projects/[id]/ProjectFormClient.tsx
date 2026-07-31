"use client";

import { useState } from "react";
import { saveProject, deleteProject } from "../../actions";
import toast from "react-hot-toast";

// Strict TypeScript enforcement - Removed INTERNSHIP
type ChapterType = "ACADEMIC" | "CAPSTONE" | "PERSONAL";
type StatusType = "DRAFT" | "PUBLISHED";
type BuildStatusType = "SHIPPED" | "IN_PROGRESS" | "ARCHIVED";

interface Challenge { title: string; description: string; order: number; }
interface GalleryImage { url: string; caption: string; order: number; }

interface ProjectData {
  id: string; title: string; tagline: string; 
  chapter: ChapterType; status: StatusType; buildStatus: BuildStatusType;
  problem: string; approach: string; outcome: string; techStack: string;
  liveUrl: string; repoUrl: string; heroImageUrl: string;
  challenges: Challenge[]; gallery: GalleryImage[];
}

export default function ProjectFormClient({ initialData }: { initialData: any }) {
  const [data, setData] = useState<ProjectData>({
    id: initialData?.id || "new",
    title: initialData?.title || "",
    tagline: initialData?.tagline || "",
    chapter: (initialData?.chapter as ChapterType) || "PERSONAL",
    status: (initialData?.status as StatusType) || "DRAFT",
    buildStatus: (initialData?.buildStatus as BuildStatusType) || "IN_PROGRESS",
    problem: initialData?.problem || "",
    approach: initialData?.approach || "",
    outcome: initialData?.outcome || "",
    techStack: initialData?.techStack || "",
    liveUrl: initialData?.liveUrl || "",
    repoUrl: initialData?.repoUrl || "",
    heroImageUrl: initialData?.heroImageUrl || "",
    challenges: initialData?.challenges || [],
    gallery: initialData?.gallery || [],
  });

  // Array Handlers for Challenges
  const addChallenge = () => setData({ ...data, challenges: [...data.challenges, { title: "", description: "", order: data.challenges.length }] });
  const updateChallenge = (i: number, field: keyof Challenge, value: string) => {
    const newChall = [...data.challenges]; newChall[i] = { ...newChall[i], [field]: value };
    setData({ ...data, challenges: newChall });
  };
  const removeChallenge = (index: number) => setData({ ...data, challenges: data.challenges.filter((_, idx) => idx !== index) });

  // Array Handlers for Gallery
  const addGalleryImage = () => setData({ ...data, gallery: [...data.gallery, { url: "", caption: "", order: data.gallery.length }] });
  const updateGalleryImage = (i: number, field: keyof GalleryImage, value: string) => {
    const newGallery = [...data.gallery]; newGallery[i] = { ...newGallery[i], [field]: value };
    setData({ ...data, gallery: newGallery });
  };
  const removeGalleryImage = (index: number) => setData({ ...data, gallery: data.gallery.filter((_, idx) => idx !== index) });

  const handleSubmit = async (formData: FormData) => {
    const promise = saveProject(formData);
    
    toast.promise(promise, {
      loading: 'Committing build...',
      success: 'Build logged successfully!',
      error: 'Failed to commit build.',
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-ink bg-paper font-body">
      <form action={handleSubmit} className="space-y-6">
        <input type="hidden" name="id" value={data.id} />
        <input type="hidden" name="challenges" value={JSON.stringify(data.challenges)} />
        <input type="hidden" name="gallery" value={JSON.stringify(data.gallery)} />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-line gap-4">
          <h1 className="text-2xl font-display font-semibold">{data.id === "new" ? "New Build Log" : `Editing: ${data.title}`}</h1>
          <div className="flex gap-4">
             <select name="buildStatus" value={data.buildStatus} onChange={e => setData({...data, buildStatus: e.target.value as BuildStatusType})} className="custom-select">
                <option value="IN_PROGRESS">IN PROGRESS (Amber)</option>
                <option value="SHIPPED">SHIPPED (Green)</option>
                <option value="ARCHIVED">ARCHIVED (Neutral)</option>
             </select>
             <select name="status" value={data.status} onChange={e => setData({...data, status: e.target.value as StatusType})} className="custom-select">
                <option value="DRAFT">Visibility: DRAFT</option>
                <option value="PUBLISHED">Visibility: PUBLISHED</option>
             </select>
          </div>
        </div>

        {/* Core Metadata */}
        <div className="grid grid-cols-2 gap-4">
          <input name="title" placeholder="Title" value={data.title} onChange={e => setData({...data, title: e.target.value})} className="bg-card border border-line hover:border-ink-soft focus:border-ribbon p-3 w-full transition-colors rounded-sm" required />
          <select name="chapter" value={data.chapter} onChange={e => setData({...data, chapter: e.target.value as ChapterType})} className="custom-select">
            <option value="ACADEMIC">~/career/academic</option>
            <option value="CAPSTONE">~/career/capstone</option>
            <option value="PERSONAL">~/career/personal</option>
          </select>
        </div>
        
        <input name="tagline" placeholder="Tagline" value={data.tagline} onChange={e => setData({...data, tagline: e.target.value})} className="bg-card border border-line hover:border-ink-soft focus:border-ribbon p-3 w-full transition-colors rounded-sm" required />
        <input name="techStack" placeholder="Tech Stack (comma separated)" value={data.techStack} onChange={e => setData({...data, techStack: e.target.value})} className="bg-card border border-line p-3 w-full rounded-sm" />
        
        <div className="grid grid-cols-2 gap-4">
          <input name="liveUrl" placeholder="Live URL (Optional)" value={data.liveUrl} onChange={e => setData({...data, liveUrl: e.target.value})} className="bg-card border border-line p-3 w-full font-mono text-sm rounded-sm" />
          <input name="repoUrl" placeholder="Repo URL (Optional)" value={data.repoUrl} onChange={e => setData({...data, repoUrl: e.target.value})} className="bg-card border border-line p-3 w-full font-mono text-sm rounded-sm" />
        </div>

        <input name="heroImageUrl" placeholder="Hero Image URL" value={data.heroImageUrl} onChange={e => setData({...data, heroImageUrl: e.target.value})} className="bg-card border border-line p-3 w-full font-mono text-sm rounded-sm" />

        {/* Narrative Text Areas */}
        <textarea name="problem" placeholder="The Problem Space" value={data.problem} onChange={e => setData({...data, problem: e.target.value})} className="bg-card border border-line p-3 w-full h-32 rounded-sm" />
        <textarea name="approach" placeholder="Engineering Approach" value={data.approach} onChange={e => setData({...data, approach: e.target.value})} className="bg-card border border-line p-3 w-full h-32 rounded-sm" />
        <textarea name="outcome" placeholder="Outcome" value={data.outcome} onChange={e => setData({...data, outcome: e.target.value})} className="bg-card border border-line p-3 w-full h-32 rounded-sm" />

        {/* Dynamic Challenges Array */}
        <div className="space-y-4 pt-6 border-t border-line">
          <h3 className="font-display font-medium text-lg">Critical Challenges</h3>
          {data.challenges.map((c, i) => (
            <div key={i} className="flex gap-4 p-4 border border-line bg-card rounded-sm">
              <div className="flex-1 space-y-2">
                <input placeholder="Challenge Title" value={c.title} onChange={e => updateChallenge(i, 'title', e.target.value)} className="w-full bg-paper border border-line p-2 text-sm font-mono focus:border-ribbon outline-none" />
                <textarea placeholder="Resolution Details" value={c.description} onChange={e => updateChallenge(i, 'description', e.target.value)} className="w-full bg-paper border border-line p-2 text-sm h-24 focus:border-ribbon outline-none" />
              </div>
              <button type="button" onClick={() => removeChallenge(i)} className="text-ink-soft hover:text-ribbon font-mono text-xs cursor-pointer">DEL</button>
            </div>
          ))}
          <button type="button" onClick={addChallenge} className="w-full p-2 border border-dashed border-line text-ink-soft hover:text-ribbon font-mono text-xs uppercase cursor-pointer transition-colors">+ Add Challenge Block</button>
        </div>

        {/* Dynamic Gallery Array */}
        <div className="space-y-4 pt-6 border-t border-line">
          <h3 className="font-display font-medium text-lg">Project Gallery</h3>
          {data.gallery.map((g, i) => (
            <div key={i} className="flex gap-4 p-4 border border-line bg-card rounded-sm">
              <div className="flex-1 space-y-2">
                <input placeholder="Image URL (Vercel Blob)" value={g.url} onChange={e => updateGalleryImage(i, 'url', e.target.value)} className="w-full bg-paper border border-line p-2 text-sm font-mono focus:border-ribbon outline-none" />
                <input placeholder="Caption" value={g.caption} onChange={e => updateGalleryImage(i, 'caption', e.target.value)} className="w-full bg-paper border border-line p-2 text-sm focus:border-ribbon outline-none" />
              </div>
              <button type="button" onClick={() => removeGalleryImage(i)} className="text-ink-soft hover:text-ribbon font-mono text-xs cursor-pointer">DEL</button>
            </div>
          ))}
          <button type="button" onClick={addGalleryImage} className="w-full p-2 border border-dashed border-line text-ink-soft hover:text-ribbon font-mono text-xs uppercase cursor-pointer transition-colors">+ Add Gallery Image</button>
        </div>

        <div className="pt-8">
          <button type="submit" className="bg-ribbon hover:bg-ribbon-ink text-card px-8 py-3 font-medium transition-colors cursor-pointer rounded-sm">Commit Build</button>
        </div>
      </form>
    </div>
  );
}