"use client";

import { useState } from "react";
import { saveExperience } from "../actions";

export default function ExperienceAdmin() {
  const [data, setData] = useState({
    id: "new", company: "", role: "", location: "", startDate: "", endDate: "", responsibilities: [""]
  });

  const addBullet = () => setData({ ...data, responsibilities: [...data.responsibilities, ""] });
  
  const updateBullet = (index: number, value: string) => {
    const newReqs = [...data.responsibilities];
    newReqs[index] = value;
    setData({ ...data, responsibilities: newReqs });
  };

  const removeBullet = (index: number) => {
    setData({ ...data, responsibilities: data.responsibilities.filter((_, i) => i !== index) });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12 bg-canvas text-primary font-body">
      <header>
        <h1 className="font-display text-3xl">Work Experience Log</h1>
      </header>

      <form action={saveExperience} className="p-6 bg-surface border border-surface/80 rounded space-y-6">
        <input type="hidden" name="id" value={data.id} />
        <input type="hidden" name="responsibilities" value={JSON.stringify(data.responsibilities)} />

        <div className="grid grid-cols-2 gap-4">
          <input name="company" placeholder="Company Name" value={data.company} onChange={e => setData({...data, company: e.target.value})} className="bg-canvas p-2 border border-surface text-sm" required />
          <input name="role" placeholder="Role / Title" value={data.role} onChange={e => setData({...data, role: e.target.value})} className="bg-canvas p-2 border border-surface text-sm" required />
          <input name="location" placeholder="Location (Optional)" value={data.location} onChange={e => setData({...data, location: e.target.value})} className="bg-canvas p-2 border border-surface text-sm" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-mono text-muted block mb-1">Start Date</label>
            <input type="date" name="startDate" value={data.startDate} onChange={e => setData({...data, startDate: e.target.value})} className="bg-canvas p-2 border border-surface text-sm w-full" required />
          </div>
          <div>
            <label className="text-xs font-mono text-muted block mb-1">End Date (Leave blank if present)</label>
            <input type="date" name="endDate" value={data.endDate} onChange={e => setData({...data, endDate: e.target.value})} className="bg-canvas p-2 border border-surface text-sm w-full" />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-surface/50">
          <h3 className="font-display text-accent text-lg">Responsibilities</h3>
          {data.responsibilities.map((req, i) => (
            <div key={i} className="flex gap-2">
              <input value={req} onChange={e => updateBullet(i, e.target.value)} className="bg-canvas p-2 flex-1 border border-surface text-sm" placeholder="Executed testing protocols..." />
              <button type="button" onClick={() => removeBullet(i)} className="text-accent font-mono text-xs px-2">X</button>
            </div>
          ))}
          <button type="button" onClick={addBullet} className="w-full p-2 border border-dashed border-surface text-muted text-sm font-mono">+ ADD BULLET</button>
        </div>

        <button type="submit" className="bg-accent text-canvas px-6 py-2 font-bold text-sm w-full">Commit Record</button>
      </form>
    </div>
  );
}