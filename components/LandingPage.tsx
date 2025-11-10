"use client";

import Image from "next/image";
import SplitText from "@/components/ui/SplitText";

export default function LandingPage() {
  return (
    <section className="relative w-full min-h-screen flex flex-col-reverse lg:flex-row items-center justify-between overflow-hidden bg-[#0b0f17]">
      {/* HÁTTÉR GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f17] via-[#0d1018] to-[#1a1f2a]"></div>

      {/* PÉNZES ANIMÁCIÓ */}
      <Image
        src="/coins-falling.gif"
        alt="coins"
        width={1600}
        height={1600}
        className="absolute inset-0 w-full h-full object-cover opacity-70 pointer-events-none select-none"
      />

      {/* SZKELETON */}
      <div className="relative flex-1 flex items-center justify-center lg:justify-end mt-10 lg:mt-0 z-[20]">
        <Image
          src="/reaper.png"
          alt="Kaszadella"
          width={700}
          height={700}
          className="drop-shadow-[0_0_40px_rgba(255,215,0,0.4)] animate-fade-in-right"
        />
      </div>

      {/* SZÖVEG BLOKK */}
      <div className="relative flex-1 px-6 lg:px-16 z-[30] text-white max-w-2xl">
        <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6 drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]">
          <SplitText text={"Üdvözlünk a\nKaszadella\nVilágában!"} />
        </h1>
        <p className="text-lg lg:text-xl text-gray-200 leading-relaxed drop-shadow-[0_0_8px_rgba(0,0,0,0.6)]">
          Kaszadella, a siker harcosa nap mint nap azért harcol, hogy bajtársait
          segítse az Élet rögös útján. Most jött el az ideje, hogy felfedje
          valódi énjét – és megmutassa, mire is képes valójában.
        </p>
      </div>
    </section>
  );
}
