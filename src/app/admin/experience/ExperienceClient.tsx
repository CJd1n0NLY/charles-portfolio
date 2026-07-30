"use client";

import { useState } from "react";
import { saveExperience, deleteExperience } from "../actions";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ExperienceClient({ experiences }: { experiences: any[] }) {
  const [data, setData] = useState({
    id: "new", company: "", role: "", location: "", startDate: "", endDate: "", responsibilities: [""]
  });

  const addBullet = () => setData({ ...data, responsibilities: [...data.responsibilities, ""] });
  const updateBullet = (index: number, value: string) => {
    const newReqs = [...data.responsibilities]; newReqs[index] = value;
    setData({ ...data, responsibilities: newReqs });
  };
  const removeBullet = (index: number) => setData({ ...data, responsibilities: data.responsibilities.filter((_, i) => i !== index) });

  const handleSubmit = async (formData: FormData) => {
    const promise = saveExperience(formData);
    toast.promise(promise, { loading: 'Committing record...', success: 'Record logged!', error: 'Failed.' });
  };

  const handleDelete = async (formData: FormData) => {
    const promise = deleteExperience(formData);
    toast.promise(promise, { loading: 'Deleting...', success: 'Deleted!', error: 'Failed.' });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12 bg-paper text-ink font-body min-h-screen">
      <header className="border-b border-line pb-6">
        <h1 className="font-display text-3xl font-semibold">Work Experience Log</h1>
        <Link href="/admin" className="font-mono text-xs text-ink-soft hover:text-ribbon transition-colors mt-2 inline-block">
            &larr; Return to Command Center
        </Link>
      </header>

      <form action={handleSubmit} className="p-6 bg-card border border-line rounded-sm space-y-6 shadow-sm">
        <h2 className="font-mono text-ribbon text-sm font-medium">~/scripts/log_experience.sh</h2>
        <input type="hidden" name="id" value={data.id} />
        <input type="hidden" name="responsibilities" value={JSON.stringify(data.responsibilities)} />

        <div className="grid grid-cols-2 gap-4">
          <input name="company" placeholder="Company Name" value={data.company} onChange={e => setData({...data, company: e.target.value})} className="bg-paper p-3 border border-line focus:border-ribbon outline-none text-sm rounded-sm" required />
          <input name="role" placeholder="Role / Title" value={data.role} onChange={e => setData({...data, role: e.target.value})} className="bg-paper p-3 border border-line focus:border-ribbon outline-none text-sm rounded-sm" required />
          <input name="location" placeholder="Location (Optional)" value={data.location} onChange={e => setData({...data, location: e.target.value})} className="bg-paper p-3 border border-line focus:border-ribbon outline-none text-sm rounded-sm" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-mono text-ink-soft block mb-1">Start Date</label>
            <input type="date" name="startDate" value={data.startDate} onChange={e => setData({...data, startDate: e.target.value})} className="bg-paper p-3 border border-line focus:border-ribbon outline-none text-sm w-full rounded-sm" required />
          </div>
          <div>
            <label className="text-xs font-mono text-ink-soft block mb-1">End Date (Blank if present)</label>
            <input type="date" name="endDate" value={data.endDate} onChange={e => setData({...data, endDate: e.target.value})} className="bg-paper p-3 border border-line focus:border-ribbon outline-none text-sm w-full rounded-sm" />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-line">
          <h3 className="font-display font-semibold text-ink text-lg">Responsibilities</h3>
          {data.responsibilities.map((req, i) => (
            <div key={i} className="flex gap-2">
              <input value={req} onChange={e => updateBullet(i, e.target.value)} className="bg-paper p-3 flex-1 border border-line focus:border-ribbon outline-none text-sm rounded-sm" placeholder="Executed testing protocols..." />
              <button type="button" onClick={() => removeBullet(i)} className="text-ink-soft hover:text-ribbon font-mono text-xs px-4 cursor-pointer transition-colors">DEL</button>
            </div>
          ))}
          <button type="button" onClick={addBullet} className="w-full p-3 border border-dashed border-line text-ink-soft hover:text-ribbon text-xs font-mono uppercase cursor-pointer transition-colors">+ Add Bullet</button>
        </div>

        <button type="submit" className="bg-ribbon hover:bg-ribbon-ink text-card px-6 py-3 font-medium text-sm w-full transition-colors cursor-pointer rounded-sm">Commit Record</button>
      </form>

      {/* List Existing Experience */}
      <div className="space-y-4">
        {experiences.map((exp: any) => (
          <div key={exp.id} className="p-6 bg-card border border-line flex justify-between rounded-sm">
            <div>
              <h3 className="font-display text-xl font-semibold">{exp.role}</h3>
              <p className="font-mono text-xs text-ink-soft">{exp.company}</p>
            </div>
            <form action={handleDelete}>
              <input type="hidden" name="id" value={exp.id} />
              <button type="submit" className="text-ink-soft hover:text-ribbon text-xs font-mono cursor-pointer transition-colors">DEL</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}