"use client";

export default function FloatingIframeChat() {
  return (
    <div className="fixed bottom-5 right-5 z-[99999]">
      <div
        className="w-[380px] max-w-[90vw] h-[520px] max-h-[75vh] rounded-xl overflow-hidden shadow-2xl"
        style={{
          background: "rgba(10,14,20,0.85)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(8px)"
        }}
      >
        <iframe
          src="https://chocolate-dotterel-780897.hostingersite.com/kaszadella-chat/"
          title="Kaszadella Chat"
          className="w-full h-full"
          style={{ border: "0" }}
          loading="lazy"
        />
      </div>
    </div>
  );
}
