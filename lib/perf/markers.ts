/**
 * Performance Markers
 * 
 * Simple console performance markers for development.
 * Only active in development mode to avoid production overhead.
 */

type PerfMarker = {
  label: string;
  timestamp: number;
};

const markers: PerfMarker[] = [];

export function mark(label: string): void {
  if (process.env.NODE_ENV !== "development") return;
  
  const timestamp = performance.now();
  markers.push({ label, timestamp });
  
  if (markers.length > 1) {
    const prev = markers[markers.length - 2];
    const elapsed = timestamp - prev.timestamp;
    console.log(`[Perf] ${prev.label} → ${label}: ${elapsed.toFixed(2)}ms`);
  } else {
    console.log(`[Perf] ${label}: ${timestamp.toFixed(2)}ms`);
  }
}

export function markStart(label: string): void {
  if (process.env.NODE_ENV !== "development") return;
  mark(`Start: ${label}`);
}

export function markEnd(label: string): void {
  if (process.env.NODE_ENV !== "development") return;
  mark(`End: ${label}`);
}

export function clear(): void {
  if (process.env.NODE_ENV !== "development") return;
  markers.length = 0;
  console.log("[Perf] Cleared all markers");
}

export function summary(): void {
  if (process.env.NODE_ENV !== "development") return;
  if (markers.length < 2) {
    console.log("[Perf] Need at least 2 markers for summary");
    return;
  }
  
  const first = markers[0];
  const last = markers[markers.length - 1];
  const total = last.timestamp - first.timestamp;
  
  console.log(`[Perf] Summary: ${markers.length} markers, total: ${total.toFixed(2)}ms`);
  console.table(markers.map((m, i) => ({
    index: i,
    label: m.label,
    time: `${m.timestamp.toFixed(2)}ms`,
    elapsed: i > 0 ? `${(m.timestamp - markers[i - 1].timestamp).toFixed(2)}ms` : "-"
  })));
}

