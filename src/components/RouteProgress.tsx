'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RouteProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    const t = setTimeout(() => setActive(false), 350);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div
      className="fixed top-0 left-0 h-[2px] bg-ribbon-ink z-[60] transition-all duration-300 ease-out"
      style={{
        width: active ? '100%' : '0%',
        opacity: active ? 1 : 0,
      }}
    />
  );
}