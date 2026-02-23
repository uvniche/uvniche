/**
 * Server-rendered LCP image so it's in the initial HTML and matches the
 * preload in layout. Native <img> avoids client hydration delay and
 * Next/Image redirect so LCP happens sooner.
 */
export default function ProfileImage() {
  return (
    <div>
      <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-border bg-muted">
        <img
          src="/pfp.avif"
          alt=""
          width={112}
          height={112}
          fetchPriority="high"
          decoding="async"
          className="size-full object-cover"
        />
      </div>
    </div>
  );
}
