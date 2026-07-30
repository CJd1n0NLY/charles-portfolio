"use client";

import { useState, useEffect } from "react";

interface BootSequenceProps {
  academicCount: number;
  internString: string;
  personalShippedCount: number;
}

export default function BootSequence({ academicCount, internString, personalShippedCount }: BootSequenceProps) {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    // 1. Reset state in case of StrictMode remounts
    setLines([]);

    // 2. Move sequence INSIDE the effect so it securely captures the latest props
    const sequence = [
      "$ whoami",
      "> Charles Jacob C. Postrado",
      "$ ./run-suite --scope=career",
      `> academic ..... ${academicCount} modules found`,
      `> internship ... ${internString}`,
      `> personal ..... ${personalShippedCount} builds passing`
    ];

    let currentLine = 0;
    
    const interval = setInterval(() => {
      // 3. Strict boundary check to absolutely prevent 'undefined' from entering state
      if (currentLine < sequence.length) {
        const nextLine = sequence[currentLine];
        setLines((prev) => [...prev, nextLine]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 400); 

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [academicCount, internString, personalShippedCount]);

  return (
    <div className="flex flex-col gap-1 min-h-[140px]">
      {lines.map((line, i) => (
        <span 
          key={i} 
          // 4. Added Optional Chaining (line?.startsWith) as a final defensive UI guard
          className={`${line?.startsWith("$") ? "text-[#E1EADB]" : "text-ink-soft"} break-all`}
        >
          {line}
        </span>
      ))}
      <span className="w-2 h-4 bg-line animate-pulse mt-1" />
    </div>
  );
}