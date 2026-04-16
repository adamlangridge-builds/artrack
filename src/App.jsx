import { useState } from "react";
import roomImage from "./room.png";

/*
  ═══════════════════════════════════════════════════════════════
  SHELF COORDINATES (measured from the 16:9 room image)
  ═══════════════════════════════════════════════════════════════
  The painted shelf unit spans horizontally from ~28% to ~72% of the
  image width. Three shelves, each holds 6 records.

  x-centers (6 equally-spaced slots from 30% to 70%):
    30%, 37%, 44%, 51%, 58%, 65%, 70% — we'll use these
  y-centers (top of record sits roughly at the shelf plank line):
    Shelf 1 top plank at ~38% → records center at ~32%
    Shelf 2 top plank at ~50% → records center at ~44%
    Shelf 3 top plank at ~62% → records center at ~56%

  Each record sleeve: ~6% wide × ~10.5% tall
  ═══════════════════════════════════════════════════════════════
*/

const X_CENTERS = [31.5, 38.2, 44.9, 51.6, 58.3, 65.0];
const Y_CENTERS = [31.5, 43.8, 56.1];
const SLEEVE_W = 6.2;
const SLEEVE_H = 10.8;

const RECORDS = [
  { slot: 0,  title: "In Rainbows",         artist: "Radiohead",      genre: "Alt Rock",     rating: 5, year: 2007, color: "#c93c2c", accent: "#e05a48", cover: "🌈", review: "Every track earns its place. The warmth of the analog recording makes this feel like it's playing just for you. Reckoner alone justifies the entire thing.", dateListened: "2026-04-15" },
  { slot: 1,  title: "Blonde",              artist: "Frank Ocean",    genre: "R&B",          rating: 5, year: 2016, color: "#d48a20", accent: "#eea842", cover: "🟠", review: "Devastating and beautiful. Frank strips everything back and lets the songwriting carry. Nights is a masterclass in dynamics.", dateListened: "2026-04-14" },
  { slot: 2,  title: "Rumours",             artist: "Fleetwood Mac",  genre: "Classic Rock", rating: 5, year: 1977, color: "#2e6a28", accent: "#4a8a42", cover: "🌿", review: "The fact they made something this cohesive while falling apart as people is insane. The Chain still gives me chills.", dateListened: "2026-04-13" },
  { slot: 3,  title: "Currents",            artist: "Tame Impala",    genre: "Psych Pop",    rating: 4, year: 2015, color: "#6a3a8a", accent: "#9256b0", cover: "🌀", review: "Kevin Parker at his most accessible. The production is immaculate — every synth sound placed with surgical precision.", dateListened: "2026-04-12" },
  { slot: 4,  title: "DAMN.",               artist: "Kendrick Lamar", genre: "Hip Hop",      rating: 5, year: 2017, color: "#b83028", accent: "#d04838", cover: "🔥", review: "Kendrick operating at a level nobody else is close to. DNA hits like a truck and HUMBLE is undeniable.", dateListened: "2026-04-11" },
  { slot: 5,  title: "Punisher",            artist: "Phoebe Bridgers",genre: "Indie Folk",   rating: 4, year: 2020, color: "#5a6878", accent: "#7a8898", cover: "🌙", review: "Quietly devastating. The arrangements are gorgeous and restrained. I Know The End builds to one of the best climaxes in recent memory.", dateListened: "2026-04-10" },
  { slot: 6,  title: "Vespertine",          artist: "Björk",          genre: "Electronic",   rating: 4, year: 2001, color: "#b8c0cc", accent: "#d8dfe6", cover: "❄️", review: "Intimate and alien simultaneously. The microbeat production still sounds like the future. Pagan Poetry is transcendent.", dateListened: "2026-04-09" },
  { slot: 7,  title: "Miseducation",        artist: "Lauryn Hill",    genre: "R&B",          rating: 5, year: 1998, color: "#c89018", accent: "#e8b032", cover: "📚", review: "A masterpiece that fuses hip hop and soul like nothing before or since. Every track is essential. The live instrumentation is magic.", dateListened: "2026-04-08" },
  { slot: 8,  title: "OK Computer",         artist: "Radiohead",      genre: "Alt Rock",     rating: 5, year: 1997, color: "#2878b0", accent: "#4898d0", cover: "🖥️", review: "Prophetic doesn't begin to cover it. The paranoia and beauty coexist perfectly. Lucky might be the most underrated song in their catalogue.", dateListened: "2026-04-07" },
  { slot: 9,  title: "Hounds of Love",      artist: "Kate Bush",      genre: "Art Pop",      rating: 5, year: 1985, color: "#7a3898", accent: "#9856b0", cover: "🐕", review: "Side B alone is one of the most ambitious things in pop music. Running Up That Hill deserved its second life. Kate was decades ahead.", dateListened: "2026-04-06" },
  { slot: 10, title: "Lonerism",            artist: "Tame Impala",    genre: "Psych Pop",    rating: 4, year: 2012, color: "#1a9a88", accent: "#30b8a0", cover: "🏝️", review: "The psychedelic production is denser and more layered than Currents. Feels Like We Only Go Backwards is a perfect pop song wrapped in fuzz.", dateListened: "2026-04-05" },
  { slot: 11, title: "To Pimp A Butterfly", artist: "Kendrick Lamar", genre: "Hip Hop",      rating: 5, year: 2015, color: "#2a3a58", accent: "#486078", cover: "🦋", review: "The most important album of the decade. The jazz fusion production is relentless and the poetry is Pulitzer-worthy.", dateListened: "2026-04-04" },
];

const GENRES = [...new Set(RECORDS.map(r => r.genre))].sort();
const RATINGS = [5, 4, 3, 2, 1];

function getSlotPos(slot) {
  const shelf = Math.floor(slot / 6);
  const col = slot % 6;
  if (shelf > 2) return null;
  return {
    left: X_CENTERS[col] - SLEEVE_W / 2,
    top: Y_CENTERS[shelf] - SLEEVE_H / 2,
  };
}

/* ═══ RECORD SLEEVE ═══ */
function RecordSleeve({ record, onClick, dimmed }) {
  const [hover, setHover] = useState(false);
  const pos = getSlotPos(record.slot);
  if (!pos) return null;

  return (
    <div
      onClick={() => !dimmed && onClick(record)}
      onMouseEnter={() => !dimmed && setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "absolute",
        left: `${pos.left}%`,
        top: `${pos.top}%`,
        width: `${SLEEVE_W}%`,
        height: `${SLEEVE_H}%`,
        cursor: dimmed ? "default" : "pointer",
        transition: "all 0.25s ease",
        transform: hover ? "translateY(-4px) scale(1.05)" : "translateY(0)",
        zIndex: hover ? 50 : 10,
        opacity: dimmed ? 0.15 : 1,
        pointerEvents: dimmed ? "none" : "auto",
      }}
    >
      {/* Shadow under sleeve */}
      <div style={{
        position: "absolute",
        bottom: -4,
        left: "10%",
        right: "10%",
        height: 5,
        background: "rgba(0,0,0,0.5)",
        filter: "blur(3px)",
        borderRadius: "50%",
        opacity: hover ? 0.15 : 0.65,
        transition: "opacity 0.25s",
      }} />

      {/* Sleeve body */}
      <div style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(145deg, ${record.accent} 0%, ${record.color} 55%, ${record.color}dd 100%)`,
        border: "2px solid rgba(0,0,0,0.45)",
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        boxShadow: hover
          ? `0 10px 24px rgba(0,0,0,0.6), 0 0 20px ${record.color}55, 0 0 0 2px rgba(255,215,100,0.8)`
          : "2px 3px 0 rgba(0,0,0,0.45)",
        imageRendering: "pixelated",
      }}>
        {/* Scanline texture */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 3px)",
          pointerEvents: "none",
        }} />
        {/* Top light reflection */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "40%",
          background: "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />
        {/* Cover icon */}
        <span style={{
          fontSize: "clamp(16px, 2.2vw, 32px)",
          position: "relative",
          zIndex: 2,
          filter: hover ? "drop-shadow(0 0 8px rgba(255,255,255,0.5))" : "",
          transition: "filter 0.25s",
        }}>
          {record.cover}
        </span>
        {/* Rating dots */}
        <div style={{
          position: "absolute",
          bottom: 4,
          left: 0, right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}>
          {Array.from({ length: record.rating }).map((_, i) => (
            <div key={i} style={{
              width: 4, height: 4,
              background: "#ffd700",
              borderRadius: "50%",
              boxShadow: "0 0 3px rgba(255,215,0,0.5)",
            }} />
          ))}
        </div>
      </div>

      {/* Hover tooltip */}
      {hover && (
        <div style={{
          position: "absolute",
          bottom: "calc(100% + 10px)",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(12,10,6,0.96)",
          color: "#e8dcc8",
          padding: "6px 10px",
          fontSize: 8,
          fontFamily: "var(--fp)",
          whiteSpace: "nowrap",
          border: "2px solid #5a4a30",
          boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
          pointerEvents: "none",
          zIndex: 100,
          lineHeight: 1.6,
        }}>
          {record.title}
          <div style={{ fontSize: 7, color: "#a89878", marginTop: 2 }}>
            {record.artist} · {"⭐".repeat(record.rating)}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══ REVIEW MODAL ═══ */
function Detail({ record, onClose }) {
  if (!record) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center",
      animation: "fadeIn 0.15s",
    }}>
      <div onClick={onClose} style={{
        position: "absolute", inset: 0,
        background: "rgba(6,5,3,0.88)",
        backdropFilter: "blur(4px)",
      }} />
      <div style={{
        position: "relative",
        background: "linear-gradient(180deg, #2c2318, #1e1812)",
        border: "3px solid #5a4a30",
        borderRadius: 5,
        maxWidth: 420, width: "90%",
        boxShadow: "0 0 60px rgba(0,0,0,0.6), 0 0 30px rgba(200,140,50,0.08)",
        animation: "popIn 0.2s ease-out",
        overflow: "hidden",
        fontFamily: "var(--fs)",
      }}>
        <div style={{
          background: `linear-gradient(135deg, ${record.accent}, ${record.color})`,
          padding: "20px 22px",
          display: "flex", alignItems: "center", gap: 14,
          borderBottom: "3px solid rgba(0,0,0,0.25)",
          position: "relative",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.08), transparent 50%)" }} />
          <div style={{
            width: 72, height: 72,
            background: "rgba(0,0,0,0.2)",
            border: "2px solid rgba(255,255,255,0.12)",
            borderRadius: 3,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 36,
            boxShadow: "2px 3px 0 rgba(0,0,0,0.2)",
            flexShrink: 0,
          }}>{record.cover}</div>
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ fontFamily: "var(--fp)", fontSize: 11, color: "#fff", lineHeight: 1.6, textShadow: "1px 2px 0 rgba(0,0,0,0.4)" }}>{record.title}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>{record.artist}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{record.year} · {record.genre}</div>
          </div>
        </div>
        <div style={{ padding: "14px 22px 6px", display: "flex", alignItems: "center", gap: 5 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} style={{ fontSize: 15, filter: i < record.rating ? "none" : "grayscale(1) opacity(0.2)" }}>⭐</span>
          ))}
          <span style={{ fontFamily: "var(--fp)", fontSize: 9, color: "#ffd700", marginLeft: 4 }}>{record.rating}/5</span>
        </div>
        <div style={{ padding: "6px 22px 12px" }}>
          <p style={{ fontSize: 13, color: "#c8b898", lineHeight: 1.9, margin: 0 }}>{record.review}</p>
        </div>
        <div style={{ padding: "10px 22px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid #362c1c" }}>
          <span style={{ fontFamily: "var(--fp)", fontSize: 6, color: "#5a4a30" }}>listened {record.dateListened}</span>
          <button onClick={onClose} style={{
            fontFamily: "var(--fp)", fontSize: 8,
            background: "#362c1c", color: "#e8dcc8",
            border: "2px solid #5a4a30",
            padding: "6px 14px", cursor: "pointer", borderRadius: 2,
          }}>CLOSE ✕</button>
        </div>
      </div>
    </div>
  );
}

/* ═══ CIGARETTE SMOKE ═══ */
function CigaretteSmoke() {
  // Position matches the ashtray location on the coffee table in the image
  // Ashtray is at ~52% x, ~72% y
  return (
    <div style={{
      position: "absolute",
      left: "52%",
      top: "72%",
      width: 0,
      height: 0,
      pointerEvents: "none",
      zIndex: 15,
    }}>
      {/* Three smoke plumes at different phases */}
      {[
        { delay: 0, size: 8, dur: 4 },
        { delay: 1.3, size: 10, dur: 4.5 },
        { delay: 2.6, size: 7, dur: 4 },
      ].map((s, i) => (
        <div key={i} style={{
          position: "absolute",
          left: 0, top: 0,
          width: s.size,
          height: s.size,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,195,185,0.5), rgba(180,175,165,0.15) 60%, transparent)",
          filter: "blur(4px)",
          animation: `smokeRise ${s.dur}s ease-out ${s.delay}s infinite`,
          transform: "translate(-50%, 0)",
        }} />
      ))}
    </div>
  );
}

/* ═══ PULSING LAMP GLOW ═══ */
function LampGlow() {
  // Lamp is at ~50% x, ~16% y — the glow expands from the shade
  return (
    <>
      {/* Large ambient wall glow that pulses */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: "5%",
        width: "35%",
        height: "55%",
        transform: "translateX(-50%)",
        background: "radial-gradient(ellipse 50% 55% at 50% 20%, rgba(255,195,100,0.18) 0%, rgba(255,170,70,0.08) 35%, transparent 65%)",
        animation: "lampPulse 4s ease-in-out infinite",
        pointerEvents: "none",
        zIndex: 2,
        mixBlendMode: "screen",
      }} />
      {/* Tight glow around the bulb itself */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: "16%",
        width: 50,
        height: 50,
        transform: "translate(-50%, -50%)",
        background: "radial-gradient(circle, rgba(255,220,130,0.4) 0%, rgba(255,180,80,0.15) 40%, transparent 70%)",
        animation: "lampFlicker 5s ease-in-out infinite",
        pointerEvents: "none",
        zIndex: 2,
        mixBlendMode: "screen",
      }} />
    </>
  );
}

/* ═══ CIGARETTE EMBER GLOW ═══ */
function EmberGlow() {
  return (
    <div style={{
      position: "absolute",
      left: "52.8%",
      top: "72.2%",
      width: 6,
      height: 6,
      transform: "translate(-50%, -50%)",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(255,100,40,0.7) 0%, rgba(255,60,20,0.3) 50%, transparent)",
      animation: "emberPulse 2.5s ease-in-out infinite",
      pointerEvents: "none",
      zIndex: 14,
      filter: "blur(1px)",
    }} />
  );
}

/* ═══ MAIN APP ═══ */
export default function VinylRoom() {
  const [selected, setSelected] = useState(null);
  const [gf, setGf] = useState("All");
  const [rf, setRf] = useState("All");
  const [sort, setSort] = useState("slot");
  const [showF, setShowF] = useState(false);

  let filtered = RECORDS.filter(r =>
    (gf === "All" || r.genre === gf) &&
    (rf === "All" || r.rating === Number(rf))
  );
  if (sort === "date")   filtered.sort((a, b) => b.dateListened.localeCompare(a.dateListened));
  if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);
  if (sort === "artist") filtered.sort((a, b) => a.artist.localeCompare(b.artist));
  if (sort === "title")  filtered.sort((a, b) => a.title.localeCompare(b.title));

  const activeSlots = new Set(filtered.map(r => r.slot));
  const hasFilter = gf !== "All" || rf !== "All";

  const ss = {
    fontFamily: "var(--fp)", fontSize: 7,
    background: "#1a1508", color: "#c8b898",
    border: "2px solid #5a4a30",
    padding: "5px 8px", borderRadius: 2,
    cursor: "pointer", outline: "none",
  };

  return (
    <div style={{
      "--fp": "'Press Start 2P', monospace",
      "--fs": "'Silkscreen', monospace",
      width: "100vw", height: "100vh",
      background: "#080604",
      overflow: "hidden",
      position: "relative",
      fontFamily: "var(--fs)",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html,body,#root{width:100%;height:100%;overflow:hidden}
        select option{background:#1a1508;color:#c8b898}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes popIn{from{opacity:0;transform:scale(0.94) translateY(6px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.6}}

        @keyframes smokeRise {
          0%   { transform: translate(-50%, 0) scale(0.5); opacity: 0; }
          15%  { opacity: 0.6; }
          50%  { transform: translate(calc(-50% + 8px), -60px) scale(1.8); opacity: 0.3; }
          100% { transform: translate(calc(-50% - 5px), -140px) scale(3); opacity: 0; }
        }

        @keyframes lampPulse {
          0%, 100% { opacity: 0.85; transform: translateX(-50%) scale(1); }
          50%      { opacity: 1;    transform: translateX(-50%) scale(1.05); }
        }

        @keyframes lampFlicker {
          0%, 100% { opacity: 0.9; }
          25%      { opacity: 1; }
          48%      { opacity: 0.95; }
          50%      { opacity: 0.5; }
          52%      { opacity: 1; }
          75%      { opacity: 0.88; }
        }

        @keyframes emberPulse {
          0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
          50%      { opacity: 1;   transform: translate(-50%, -50%) scale(1.3); }
        }
      `}</style>

      {/* ═══ ROOM CONTAINER — 16:9 image, centered, fills viewport ═══ */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(100vw, calc(100vh * 16 / 9))",
        height: "min(100vh, calc(100vw * 9 / 16))",
        aspectRatio: "16 / 9",
        backgroundImage: `url(${roomImage})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
        {/* ── Pulsing lamp glow on wall ── */}
        <LampGlow />

        {/* ── Cigarette ember + smoke ── */}
        <EmberGlow />
        <CigaretteSmoke />

        {/* ── Record sleeves ── */}
        {RECORDS.map(r => (
          <RecordSleeve
            key={r.slot}
            record={r}
            onClick={setSelected}
            dimmed={hasFilter && !activeSlots.has(r.slot)}
          />
        ))}
      </div>

      {/* ═══ TOP-LEFT: TITLE PANEL ═══ */}
      <div style={{
        position: "absolute",
        top: 20, left: 20,
        zIndex: 60,
        background: "rgba(12,10,6,0.75)",
        backdropFilter: "blur(6px)",
        border: "2px solid #5a4a30",
        padding: "10px 14px",
        borderRadius: 3,
      }}>
        <h1 style={{
          fontFamily: "var(--fp)", fontSize: 11,
          color: "#e8dcc8", letterSpacing: 1.5,
          textShadow: "0 0 12px rgba(255,200,100,0.2)",
        }}>ADAM'S VINYL ROOM</h1>
        <p style={{ fontSize: 11, color: "#8a7a5a", marginTop: 4 }}>
          {RECORDS.length} records · click the sleeves
        </p>
      </div>

      {/* ═══ TOP-RIGHT: FILTER CONTROL ═══ */}
      <div style={{ position: "absolute", top: 20, right: 20, zIndex: 60 }}>
        <button
          onClick={() => setShowF(!showF)}
          style={{
            fontFamily: "var(--fp)", fontSize: 8,
            background: showF ? "#362c1c" : "rgba(12,10,6,0.75)",
            color: showF ? "#ffd080" : "#c8b898",
            border: "2px solid #5a4a30",
            padding: "8px 12px",
            cursor: "pointer",
            borderRadius: 3,
            backdropFilter: "blur(6px)",
            transition: "all 0.15s",
          }}
        >⚙ FILTER {showF ? "▲" : "▼"}</button>

        {showF && (
          <div style={{
            marginTop: 6,
            background: "rgba(12,10,6,0.92)",
            backdropFilter: "blur(6px)",
            border: "2px solid #5a4a30",
            padding: "14px",
            borderRadius: 3,
            display: "flex", flexDirection: "column",
            gap: 10,
            animation: "fadeIn 0.15s ease-out",
            minWidth: 180,
          }}>
            <div>
              <label style={{ fontSize: 6, color: "#8a7a5a", fontFamily: "var(--fp)", display: "block", marginBottom: 4 }}>GENRE</label>
              <select value={gf} onChange={e => setGf(e.target.value)} style={{ ...ss, width: "100%" }}>
                <option value="All">All</option>
                {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 6, color: "#8a7a5a", fontFamily: "var(--fp)", display: "block", marginBottom: 4 }}>RATING</label>
              <select value={rf} onChange={e => setRf(e.target.value)} style={{ ...ss, width: "100%" }}>
                <option value="All">All</option>
                {RATINGS.map(r => <option key={r} value={r}>{"⭐".repeat(r)}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 6, color: "#8a7a5a", fontFamily: "var(--fp)", display: "block", marginBottom: 4 }}>SORT</label>
              <select value={sort} onChange={e => setSort(e.target.value)} style={{ ...ss, width: "100%" }}>
                <option value="slot">Shelf order</option>
                <option value="date">Latest</option>
                <option value="rating">Rating</option>
                <option value="artist">Artist</option>
                <option value="title">Title</option>
              </select>
            </div>
            {hasFilter && (
              <button onClick={() => { setGf("All"); setRf("All"); }} style={{ ...ss, color: "#cc6644", borderColor: "#cc6644", background: "transparent", marginTop: 4 }}>
                CLEAR FILTERS ✕
              </button>
            )}
            <div style={{ fontSize: 7, color: "#5a4a30", fontFamily: "var(--fp)", textAlign: "center", marginTop: 4 }}>
              {filtered.length} / {RECORDS.length} showing
            </div>
          </div>
        )}
      </div>

      {/* ═══ BOTTOM HINT ═══ */}
      {!selected && !showF && (
        <div style={{
          position: "absolute",
          bottom: 20, left: "50%",
          transform: "translateX(-50%)",
          zIndex: 60,
          background: "rgba(12,10,6,0.6)",
          backdropFilter: "blur(4px)",
          border: "1px solid #3a3020",
          padding: "6px 14px",
          borderRadius: 20,
          fontFamily: "var(--fp)",
          fontSize: 7,
          color: "#8a7a5a",
          animation: "pulse 3s ease-in-out infinite",
        }}>
          hover a sleeve to preview · click to read review
        </div>
      )}

      <Detail record={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
