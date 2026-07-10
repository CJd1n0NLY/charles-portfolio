export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20 flex-grow flex flex-col justify-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter">Initialize Connection</h1>
        <p className="text-muted text-base leading-relaxed">
          Looking to integrate a reliable engineer into your project workflow, talk systems architecture, or discuss potential software development roles? Reach out directly through the verified communication layers below.
        </p>
      </div>

      <div className="grid gap-4 font-mono text-sm pt-4">
        <a 
          href="mailto:charles.postrado@example.com" 
          className="p-4 rounded border border-surface bg-surface/20 hover:border-accent/60 transition-colors flex items-center justify-between group"
        >
          <span className="text-muted group-hover:text-primary transition-colors">EMAIL //</span>
          <span className="text-primary text-right break-all">charles.postrado@example.com</span>
        </a>
        <a 
          href="https://linkedin.com/in/charles-postrado" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="p-4 rounded border border-surface bg-surface/20 hover:border-accent/60 transition-colors flex items-center justify-between group"
        >
          <span className="text-muted group-hover:text-primary transition-colors">LINKEDIN //</span>
          <span className="text-primary">linkedin.com/in/charles-postrado</span>
        </a>
      </div>
    </div>
  );
}