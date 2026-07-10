"use client";

import { useState, useRef } from "react";
import { uploadAndAnalyzeCertificate } from "./actions"; // The Vision AI action we wrote earlier
import { updateCertificateStatus, deleteCertificate } from "../actions";

// In a real implementation, you would fetch these from the server. 
// For brevity in this client component framework, we assume they are passed as props or fetched via SWR.
export default function CertificatesAdmin({ initialCertificates = [] }: { initialCertificates?: any[] }) {
  const [uploading, setUploading] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputFileRef.current?.files?.[0]) return;

    setUploading(true);
    const file = inputFileRef.current.files[0];
    
    // 1. Upload to Vercel Blob
    const response = await fetch(`/api/upload?filename=${file.name}`, {
      method: 'POST',
      body: file,
    });
    const newBlob = await response.json();

    // 2. Submit to Gemini Vision Action
    const formData = new FormData(e.currentTarget);
    formData.set("imageUrl", newBlob.url);
    await uploadAndAnalyzeCertificate(formData);
    
    setUploading(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12 bg-canvas text-primary font-body">
      <header>
        <h1 className="font-display text-3xl">Certificate Verification</h1>
        <p className="font-mono text-xs text-muted mt-2">Automated vision analysis pipeline.</p>
      </header>

      {/* SECURE UPLOAD FORM */}
      <section className="p-6 bg-surface border border-surface/80 rounded space-y-4">
        <h2 className="font-mono text-accent text-sm">+ INGEST DOCUMENT</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input name="title" placeholder="Certificate Title" required className="bg-canvas p-2 border border-surface text-sm w-full" />
            <input name="issuer" placeholder="Issuing Organization" required className="bg-canvas p-2 border border-surface text-sm w-full" />
          </div>
          <input type="file" ref={inputFileRef} required accept="image/*" className="bg-canvas p-2 border border-surface text-sm w-full font-mono text-muted" />
          <button type="submit" disabled={uploading} className="bg-accent text-canvas px-6 py-2 font-bold text-sm w-full disabled:opacity-50">
            {uploading ? "Analyzing via Vision AI..." : "Upload & Analyze"}
          </button>
        </form>
      </section>

      {/* REVIEW LIST */}
      <section className="space-y-4">
        {initialCertificates.map(cert => (
          <div key={cert.id} className="p-4 border border-surface bg-surface/30 flex gap-6">
            <img src={cert.imageUrl} alt={cert.title} className="w-32 h-24 object-cover border border-surface" />
            
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-display text-lg">{cert.title}</h3>
                  <p className="font-mono text-xs text-muted">{cert.issuer}</p>
                </div>
                
                {/* MANUAL OVERRIDE STATUS */}
                <form action={updateCertificateStatus} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={cert.id} />
                  <select 
                    name="reviewStatus" 
                    defaultValue={cert.reviewStatus} 
                    className={`font-mono text-xs p-1 border border-surface outline-none ${cert.reviewStatus === 'FLAGGED_FOR_REVIEW' ? 'bg-red-950 text-red-400' : 'bg-green-950 text-green-400'}`}
                    onChange={(e) => e.target.form?.requestSubmit()}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="LOOKS_VALID">LOOKS_VALID</option>
                    <option value="FLAGGED_FOR_REVIEW">FLAGGED_FOR_REVIEW</option>
                  </select>
                </form>
              </div>

              <div className="p-2 bg-canvas border border-surface/50 font-mono text-xs text-muted">
                <span className="text-accent">AI_NOTES:</span> {cert.reviewNotes}
              </div>

              <form action={deleteCertificate} className="pt-2">
                <input type="hidden" name="id" value={cert.id} />
                <button type="submit" className="text-red-500 font-mono text-xs hover:underline">Purge Record</button>
              </form>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}