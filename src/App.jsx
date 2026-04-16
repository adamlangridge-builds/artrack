import { useState } from "react";
import roomImage from "./assets/room.png";

/*
  RECORD DATA
  - `slot` (0-17) maps to a position on one of three painted shelves.
  - Shelf 1 (top):    slots 0-5
  - Shelf 2 (middle): slots 6-11
  - Shelf 3 (bottom): slots 12-17
  The background art shows 18 painted sleeves. Your first 12 records map to the
  first 12 slots. When you add more, they'll fill slots 12-17. Beyond 18,
  they'll sit in a hidden "extra" list accessible via filters (the painted art
  only shows 18, so additional ones won't visually appear on shelves but are
  still clickable via the browser sidebar panel later if we add one).
*/

const RECORDS = [
  { slot: 0,  title: "In Rainbows",            artist: "Radiohead",         genre: "Alt Rock",     rating: 5, year: 2007, review: "Every single track earns its place. The warmth of the analog recording makes this feel like it's playing just for you. Reckoner alone justifies the entire thing.", dateListened: "2026-04-15" },
  { slot: 1,  title: "Blonde",                 artist: "Frank Ocean",       genre: "R&B",          rating: 5, year: 2016, review: "Devastating and beautiful. Frank strips everything back and lets the songwriting carry. Nights is a masterclass in dynamics.", dateListened: "2026-04-14" },
  { slot: 2,  title: "Rumours",                artist: "Fleetwood Mac",     genre: "Classic Rock", rating: 5, year: 1977, review: "The fact that they made something this cohesive while falling apart as people is insane. The Chain still gives me chills.", dateListened: "2026-04-13" },
  { slot: 3,  title: "Currents",               artist: "Tame Impala",       genre: "Psych Pop",    rating: 4, year: 2015, review: "Kevin Parker at his most accessible. The production is immaculate. Let It Happen is an absolute journey.", dateListened: "2026-04-12" },
  { slot: 4,  title: "DAMN.",                  artist: "Kendrick Lamar",    genre: "Hip Hop",      rating: 5, year: 2017, review: "Kendrick operating at a level nobody else is close to. DNA hits like a truck and HUMBLE is undeniable.", dateListened: "2026-04-11" },
  { slot: 5,  title: "Punisher",               artist: "Phoebe Bridgers",   genre: "Indie Folk",   rating: 4, year: 2020, review: "Quietly devastating. The arrangements are gorgeous and restrained. I Know The End builds to one of the best climaxes in recent memory.", dateListened: "2026-04-10" },
  { slot: 6,  title: "Vespertine",             artist: "Björk",             genre: "Electronic",   rating: 4, year: 2001, review: "Intimate and alien simultaneously. The microbeat production still sounds like the future.", dateListened: "2026-04-09" },
  { slot: 7,  title: "Miseducation",           artist: "Lauryn Hill",       genre: "R&B",          rating: 5, year: 1998, review: "A masterpiece that fuses hip hop and soul like nothing before or since. Every track is essential.", dateListened: "2026-04-08" },
  { slot: 8,  title: "OK Computer",            artist: "Radiohead",         genre: "Alt Rock",     rating: 5, year: 1997, review: "Prophetic doesn't begin to cover it. The paranoia and beauty coexist perfectly.", dateListened: "2026-04-07" },
  { slot: 9,  title: "Hounds of Love",         artist: "Kate Bush",         genre: "Art Pop",      rating: 5, year: 1985, review: "Side B alone is one of the most ambitious things in pop music. Kate was decades ahead.", dateListened: "2026-04-06" },
  { slot: 10, title: "Lonerism",               artist: "Tame Impala",       genre: "Psych Pop",    rating: 4, year: 2012, review: "The psychedelic production is denser and more layered than Currents.", dateListened: "2026-04-05" },
  { slot: 11, title: "To Pimp A Butterfly",    artist: "Kendrick Lamar",    genre: "Hip Hop",      rating: 5, year: 2015, review: "The most important album of the decade. The jazz fusion production is relentless.", dateListened: "2026-04-04" },
];

const GENRES = [...new Set(RECORDS.map(r => r.genre))].sort();
const RATINGS = [5, 4, 3, 2, 1];

/*
  PAINTED SHELF GEOMETRY (measured from the 1280x960 reference)
  Expressed as percentages of the image so it stays pinned regardless of viewport.
  Each shelf has 6 slots. Values are the center point of each painted sleeve.

  x-centers: 32.6%, 40.5%, 48.3%, 56.2%, 64.0%, 71.8%
  y-centers per shelf: ~41%, ~53.5%, ~66%
  sleeve size: ~7.5% wide × ~10.5% tall (of full image)
*/
const X_CENTERS = [32.6, 40.5, 48.3, 56.2, 64.0, 71.8];
const Y_CENTERS = [41.0, 53.5, 66.0];
const SLEEVE_W = 7.5;
const SLEEVE_H = 10.5;

function getSlotPosition(slot) {
  const shelf = Math.floor(slot / 6);
  const col = slot % 6;
  if (shelf > 2) return null;
  return {
    left: X_CENTERS[col] - SLEEVE_W / 2,
    top: Y_CENTERS[shelf] - SLEEVE_H / 2,
    width: SLEEVE_W,
    height: SLEEVE_H,
  };
}

function Detail({ record, onClose }) {
  if (!record) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.15s" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(6,5,3,0.88)", backdropFilter: "blur(4px)" }} />
      <div style={{ position: "relative", background: "linear-gradient(180deg, #2c2318, #1e1812)", border: "3px solid #5a4a30", borderRadius: 5, maxWidth: 420, width: "90%", boxShadow: "0 0 60px rgba(0,0,0,0.6), 0 0 30px rgba(200,140,50,0.08)", animation: "popIn 0.2s ease-out", overflow: "hidden", fontFamily: "var(--fs)" }}>
        <div style={{ padding: "22px 24px 14px", borderBottom: "2px solid #362c1c" }}>
          <div style={{ fontFamily: "var(--fp)", fontSize: 12, color: "#e8dcc8", lineHeight: 1.6, marginBottom: 6, textShadow: "1px 2px 0 rgba(0,0,0,0.4)" }}>{record.title}</div>
          <div style={{ fontSize: 14, color: "#c8b898", marginBottom: 2 }}>{record.artist}</div>
          <div style={{ fontSize: 11, color: "#7a6a4a" }}>{record.year} · {record.genre}</div>
        </div>
        <div style={{ padding: "14px 24px 6px", display: "flex", alignItems: "center", gap: 6 }}>
          {Array.from({ length: 5 }).map((_, i) => (<span key={i} style={{ fontSize: 15, filter: i < record.rating ? "none" : "grayscale(1) opacity(0.2)" }}>⭐</span>))}
          <span style={{ fontFamily: "var(--fp)", fontSize: 9, color: "#ffd700", marginLeft: 4 }}>{record.rating}/5</span>
        </div>
        <div style={{ padding: "6px 24px 14px" }}>
          <p style={{ fontSize: 13, color: "#c8b898", lineHeight: 1.9, margin: 0 }}>{record.review}</p>
        </div>
        <div style={{ padding: "10px 24px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid #362c1c" }}>
          <span style={{ fontFamily: "var(--fp)", fontSize: 6, color: "#5a4a30" }}>listened {record.dateListened}</span>
          <button onClick={onClose} style={{ fontFamily: "var(--fp)", fontSize: 8, background: "#362c1c", color: "#e8dcc8", border: "2px solid #5a4a30", padding: "6px 14px", cursor: "pointer", borderRadius: 2 }}>CLOSE ✕</button>
        </div>
      </div>
    </div>
  );
}

function HotSpot({ record, onClick }) {
  const [hover, setHover] = useState(false);
  const pos = getSlotPosition(record.slot);
  if (!pos) return null;

  return (
    <div
      onClick={() => onClick(record)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "absolute",
        left: `${pos.left}%`,
        top: `${pos.top}%`,
        width: `${pos.width}%`,
        height: `${pos.height}%`,
        cursor: "pointer",
        transition: "all 0.2s ease",
        border: hover ? "2px solid rgba(255,215,100,0.9)" : "2px solid transparent",
        boxShadow: hover
          ? "0 0 20px rgba(255,215,100,0.5), inset 0 0 20px rgba(255,215,100,0.15)"
          : "none",
        transform: hover ? "translateY(-3px) scale(1.04)" : "translateY(0)",
        zIndex: hover ? 20 : 10,
        borderRadius: 2,
      }}
    >
      {hover && (
        <div style={{
          position: "absolute",
          bottom: "calc(100% + 8px)",
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
          lineHeight: 1.5,
        }}>
          {record.title}
          <div style={{ fontSize: 7, color: "#a89878", marginTop: 2 }}>
            {"⭐".repeat(record.rating)}
          </div>
        </div>
      )}
    </div>
  );
}

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
  if (sort === "date") filtered.sort((a, b) => b.dateListened.localeCompare(a.dateListened));
  if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);
  if (sort === "artist") filtered.sort((a, b) => a.artist.localeCompare(b.artist));
  if (sort === "title") filtered.sort((a, b) => a.title.localeCompare(b.title));
  // "slot" sort is the default and preserves original shelf position

  const ss = {
    fontFamily: "var(--fp)", fontSize: 7, background: "#1a1508",
    color: "#c8b898", border: "2px solid #5a4a30", padding: "5px 8px",
    borderRadius: 2, cursor: "pointer", outline: "none",
  };

  // Which records are currently "active" based on filters — dimmed otherwise
  const activeSlots = new Set(filtered.map(r => r.slot));

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
      `}</style>

      {/* ═══ THE ROOM — image locked to viewport ═══ */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${roomImage})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#080604",
      }}>
        {/* Image container — same aspect ratio as source, centered */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(100vw, calc(100vh * 4 / 3))",
          height: "min(100vh, calc(100vw * 3 / 4))",
          aspectRatio: "4 / 3",
        }}>
          {/* HOT SPOTS over each painted sleeve */}
          {RECORDS.map(r => {
            const isActive = activeSlots.has(r.slot);
            return (
              <div key={r.slot} style={{
                opacity: isActive ? 1 : 0.25,
                transition: "opacity 0.3s",
                pointerEvents: isActive ? "auto" : "none",
              }}>
                <HotSpot record={r} onClick={setSelected} />
              </div>
            );
          })}

          {/* Dimming overlay on non-active records */}
          {gf !== "All" || rf !== "All" ? (
            RECORDS.filter(r => !activeSlots.has(r.slot)).map(r => {
              const pos = getSlotPosition(r.slot);
              if (!pos) return null;
              return (
                <div key={`dim-${r.slot}`} style={{
                  position: "absolute",
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                  width: `${pos.width}%`,
                  height: `${pos.height}%`,
                  background: "rgba(8,6,4,0.65)",
                  pointerEvents: "none",
                  zIndex: 5,
                  borderRadius: 2,
                }} />
              );
            })
          ) : null}
        </div>
      </div>

      {/* ═══ TOP-LEFT: TITLE ═══ */}
      <div style={{
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 50,
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
        }}>
          ADAM'S VINYL ROOM
        </h1>
        <p style={{ fontSize: 11, color: "#8a7a5a", marginTop: 4 }}>
          {RECORDS.length} records · click the sleeves
        </p>
      </div>

      {/* ═══ TOP-RIGHT: FILTER CONTROL ═══ */}
      <div style={{
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 50,
      }}>
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
        >
          ⚙ FILTER {showF ? "▲" : "▼"}
        </button>

        {showF && (
          <div style={{
            marginTop: 6,
            background: "rgba(12,10,6,0.92)",
            backdropFilter: "blur(6px)",
            border: "2px solid #5a4a30",
            padding: "14px",
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
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
            {(gf !== "All" || rf !== "All") && (
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

      {/* ═══ BOTTOM-CENTER: hint ═══ */}
      {!selected && !showF && (
        <div style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
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
