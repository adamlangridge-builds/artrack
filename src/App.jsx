import { useState, useEffect } from "react";

const RECORDS = [
  { id: 1, title: "In Rainbows", artist: "Radiohead", genre: "Alt Rock", rating: 5, year: 2007, review: "Every single track earns its place. The warmth of the analog recording makes this feel like it's playing just for you. Reckoner alone justifies the entire thing.", color: "#e84330", accent: "#ff6b5a", cover: "🌈", dateListened: "2026-04-15" },
  { id: 2, title: "Blonde", artist: "Frank Ocean", genre: "R&B", rating: 5, year: 2016, review: "Devastating and beautiful. Frank strips everything back and lets the songwriting carry. Nights is a masterclass in dynamics. This one stays with you.", color: "#f5a623", accent: "#ffc966", cover: "🟠", dateListened: "2026-04-14" },
  { id: 3, title: "Rumours", artist: "Fleetwood Mac", genre: "Classic Rock", rating: 5, year: 1977, review: "The fact that they made something this cohesive while falling apart as people is insane. The Chain still gives me chills every time.", color: "#2d5a27", accent: "#4a8a42", cover: "🌿", dateListened: "2026-04-13" },
  { id: 4, title: "Currents", artist: "Tame Impala", genre: "Psych Pop", rating: 4, year: 2015, review: "Kevin Parker at his most accessible. The production is immaculate — every synth sound is placed with surgical precision. Let It Happen is an absolute journey.", color: "#9b59b6", accent: "#c39bd3", cover: "🌀", dateListened: "2026-04-12" },
  { id: 5, title: "DAMN.", artist: "Kendrick Lamar", genre: "Hip Hop", rating: 5, year: 2017, review: "Kendrick operating at a level nobody else is even close to. DNA hits like a truck and HUMBLE is undeniable. The sequencing is meticulous.", color: "#c0392b", accent: "#e74c3c", cover: "🔥", dateListened: "2026-04-11" },
  { id: 6, title: "Punisher", artist: "Phoebe Bridgers", genre: "Indie Folk", rating: 4, year: 2020, review: "Quietly devastating. The arrangements are gorgeous and restrained. I Know The End builds to one of the best climaxes in recent memory.", color: "#5a6a7a", accent: "#8899aa", cover: "🌙", dateListened: "2026-04-10" },
  { id: 7, title: "Vespertine", artist: "Björk", genre: "Electronic", rating: 4, year: 2001, review: "Intimate and alien simultaneously. The microbeat production still sounds like the future. Pagan Poetry is transcendent.", color: "#c8d6e5", accent: "#dfe6ed", cover: "❄️", dateListened: "2026-04-09" },
  { id: 8, title: "Miseducation", artist: "Lauryn Hill", genre: "R&B", rating: 5, year: 1998, review: "An absolute masterpiece that fuses hip hop and soul like nothing before or since. Every track is essential. The live instrumentation is magic.", color: "#d4a017", accent: "#f0c040", cover: "📚", dateListened: "2026-04-08" },
  { id: 9, title: "OK Computer", artist: "Radiohead", genre: "Alt Rock", rating: 5, year: 1997, review: "Prophetic doesn't even begin to cover it. The paranoia and beauty coexist perfectly. Lucky might be the most underrated song in their catalogue.", color: "#3498db", accent: "#5dade2", cover: "🖥️", dateListened: "2026-04-07" },
  { id: 10, title: "Hounds of Love", artist: "Kate Bush", genre: "Art Pop", rating: 5, year: 1985, review: "Side B alone is one of the most ambitious things in pop music. Running Up That Hill deserved its second life. Kate was decades ahead.", color: "#8e44ad", accent: "#af7ac5", cover: "🐕", dateListened: "2026-04-06" },
  { id: 11, title: "Lonerism", artist: "Tame Impala", genre: "Psych Pop", rating: 4, year: 2012, review: "The psychedelic production is denser and more layered than Currents. Feels Like We Only Go Backwards is a perfect pop song wrapped in fuzz.", color: "#1abc9c", accent: "#48d1a5", cover: "🏝️", dateListened: "2026-04-05" },
  { id: 12, title: "To Pimp A Butterfly", artist: "Kendrick Lamar", genre: "Hip Hop", rating: 5, year: 2015, review: "The most important album of the decade. The jazz fusion production is relentless and the poetry is Pulitzer-worthy. Because it literally was.", color: "#2c3e50", accent: "#4a6a80", cover: "🦋", dateListened: "2026-04-04" },
];

const GENRES = [...new Set(RECORDS.map(r => r.genre))].sort();
const RATINGS = [5, 4, 3, 2, 1];

function VinylOnShelf({ record, onClick, index }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={() => onClick(record)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 72, height: 72,
        position: "relative",
        cursor: "pointer",
        transition: "transform 0.2s ease",
        transform: hover ? "translateY(-10px) rotateX(2deg)" : "translateY(0)",
        animation: `dropIn 0.35s ease-out ${index * 0.05}s both`,
        zIndex: hover ? 10 : 1,
      }}
    >
      <div style={{
        position: "absolute", bottom: -4, left: 4, right: 4, height: 8,
        background: "rgba(0,0,0,0.4)", filter: "blur(4px)", borderRadius: "50%",
        opacity: hover ? 0.2 : 0.6, transition: "opacity 0.2s",
      }} />
      <div style={{
        width: "100%", height: "100%",
        background: `linear-gradient(135deg, ${record.accent} 0%, ${record.color} 50%, ${record.color}dd 100%)`,
        border: "2px solid rgba(0,0,0,0.3)", borderRadius: 2,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30,
        position: "relative",
        boxShadow: hover
          ? `3px 3px 0 rgba(0,0,0,0.3), 0 0 20px ${record.color}44`
          : "2px 2px 0 rgba(0,0,0,0.3)",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)", pointerEvents: "none" }} />
        <span style={{ position: "relative", zIndex: 2, filter: hover ? "drop-shadow(0 0 6px rgba(255,255,255,0.4))" : "none", transition: "filter 0.2s" }}>
          {record.cover}
        </span>
        <div style={{ position: "absolute", bottom: 4, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 2 }}>
          {Array.from({ length: record.rating }).map((_, i) => (
            <div key={i} style={{ width: 5, height: 5, background: "#ffd700", borderRadius: "50%", border: "1px solid rgba(0,0,0,0.2)", boxShadow: "0 0 4px rgba(255,215,0,0.4)" }} />
          ))}
        </div>
      </div>
      {hover && (
        <div style={{
          position: "absolute", top: -28, left: "50%", transform: "translateX(-50%)",
          background: "rgba(20,15,10,0.95)", color: "#e8dcc8", padding: "4px 8px",
          fontSize: 7, fontFamily: "'Press Start 2P', monospace", whiteSpace: "nowrap",
          zIndex: 100, border: "1px solid #5a4a30", boxShadow: "0 2px 8px rgba(0,0,0,0.5)", pointerEvents: "none",
        }}>
          {record.title}
        </div>
      )}
    </div>
  );
}

function ShelfRow({ records, onRecordClick, shelfIndex }) {
  return (
    <div style={{ marginBottom: 0, position: "relative" }}>
      <div style={{
        display: "flex", gap: 8, padding: "10px 20px 8px", minHeight: 82,
        flexWrap: "wrap", alignItems: "flex-end", position: "relative", zIndex: 2,
      }}>
        {records.map((r, i) => (
          <VinylOnShelf key={r.id} record={r} onClick={onRecordClick} index={i + shelfIndex * 6} />
        ))}
        {records.length === 0 && (
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: "#5a4a30", padding: 24, textAlign: "center", width: "100%", fontStyle: "italic" }}>
            ~ empty shelf ~
          </div>
        )}
      </div>
      <div style={{ position: "relative", height: 18 }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: "linear-gradient(90deg, #8a7050 0%, #a08560 20%, #96785a 50%, #a08560 80%, #8a7050 100%)", borderTop: "1px solid #b8a080", zIndex: 3 }} />
        <div style={{ position: "absolute", top: 6, left: 0, right: 0, height: 12, background: "linear-gradient(180deg, #7a6545 0%, #6a5535 50%, #5a4828 100%)", borderBottom: "1px solid #3a2e18", zIndex: 3 }}>
          <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(0,0,0,0.05) 30px, rgba(0,0,0,0.05) 31px)" }} />
        </div>
        <div style={{ position: "absolute", top: 18, left: 4, right: 4, height: 10, background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", top: 6, left: 16, width: 4, height: 20, background: "#4a3a22", borderRadius: "0 0 1px 1px", zIndex: 2 }} />
        <div style={{ position: "absolute", top: 6, right: 16, width: 4, height: 20, background: "#4a3a22", borderRadius: "0 0 1px 1px", zIndex: 2 }} />
      </div>
    </div>
  );
}

function DetailPanel({ record, onClose }) {
  if (!record) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.2s ease-out" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(10, 8, 5, 0.88)", backdropFilter: "blur(4px)" }} />
      <div style={{
        position: "relative", background: "linear-gradient(180deg, #2a2218 0%, #1e1a12 100%)",
        border: "3px solid #5a4a30", borderRadius: 4, maxWidth: 400, width: "92%",
        boxShadow: "0 0 60px rgba(0,0,0,0.6), 0 0 120px rgba(139,110,50,0.1)",
        animation: "popIn 0.25s ease-out", overflow: "hidden",
      }}>
        <div style={{
          background: `linear-gradient(135deg, ${record.accent} 0%, ${record.color} 100%)`,
          padding: "20px 24px", display: "flex", alignItems: "center", gap: 16,
          borderBottom: "3px solid rgba(0,0,0,0.3)", position: "relative",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 3px)" }} />
          <div style={{
            width: 80, height: 80, background: "rgba(0,0,0,0.2)", border: "2px solid rgba(255,255,255,0.15)",
            borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 40, position: "relative", boxShadow: "3px 3px 0 rgba(0,0,0,0.2)",
          }}>{record.cover}</div>
          <div style={{ flex: 1, position: "relative", zIndex: 2 }}>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: "#fff", lineHeight: 1.7, textShadow: "2px 2px 0 rgba(0,0,0,0.4)" }}>{record.title}</div>
            <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 14, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>{record.artist}</div>
            <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{record.year} · {record.genre}</div>
          </div>
        </div>
        <div style={{ padding: "14px 24px 6px", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", gap: 3 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} style={{ fontSize: 16, filter: i < record.rating ? "none" : "grayscale(1) opacity(0.2)" }}>⭐</span>
            ))}
          </div>
          <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: "#ffd700" }}>{record.rating}/5</span>
        </div>
        <div style={{ padding: "6px 24px 10px" }}>
          <p style={{ fontFamily: "'Silkscreen', monospace", fontSize: 13, color: "#c8b898", lineHeight: 1.9, margin: 0 }}>{record.review}</p>
        </div>
        <div style={{ padding: "12px 24px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid #3a3020" }}>
          <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: "#5a4a30" }}>listened {record.dateListened}</span>
          <button onClick={onClose} style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 8, background: "#3a3020",
            color: "#e8dcc8", border: "2px solid #5a4a30", padding: "6px 14px", cursor: "pointer", borderRadius: 2,
          }}>CLOSE ✕</button>
        </div>
      </div>
    </div>
  );
}

export default function VinylRoom() {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [genreFilter, setGenreFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [showFilters, setShowFilters] = useState(false);

  let filtered = RECORDS.filter(r => {
    if (genreFilter !== "All" && r.genre !== genreFilter) return false;
    if (ratingFilter !== "All" && r.rating !== Number(ratingFilter)) return false;
    return true;
  });
  if (sortBy === "date") filtered.sort((a, b) => b.dateListened.localeCompare(a.dateListened));
  if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);
  if (sortBy === "artist") filtered.sort((a, b) => a.artist.localeCompare(b.artist));
  if (sortBy === "title") filtered.sort((a, b) => a.title.localeCompare(b.title));

  const shelves = [];
  for (let i = 0; i < filtered.length; i += 6) shelves.push(filtered.slice(i, i + 6));
  while (shelves.length < 3) shelves.push([]);

  const selectStyle = {
    fontFamily: "'Press Start 2P', monospace", fontSize: 7, background: "#1e1a12",
    color: "#c8b898", border: "2px solid #5a4a30", padding: "5px 8px", borderRadius: 2, cursor: "pointer", outline: "none",
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#0e0c08", fontFamily: "'Silkscreen', monospace", overflow: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap');
        @keyframes dropIn { from { opacity:0; transform:translateY(-16px) scale(0.95); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes popIn { from { opacity:0; transform:scale(0.92) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes flicker { 0%,100%{opacity:0.85} 50%{opacity:1} 92%{opacity:1} 93%{opacity:0.6} 94%{opacity:0.9} 95%{opacity:1} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes sway { 0%,100%{transform:rotate(-1deg)} 50%{transform:rotate(1deg)} }
        select option { background:#1e1a12; color:#c8b898; }
        *{box-sizing:border-box}
      `}</style>

      <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
        <div style={{ position: "relative", overflow: "hidden" }}>
          {/* Ceiling */}
          <div style={{ height: 30, background: "linear-gradient(180deg, #2a2418 0%, #322a1e 100%)", borderBottom: "3px solid #1a1610", position: "relative" }}>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "linear-gradient(180deg, #4a3e28 0%, #3a3020 100%)" }} />
          </div>

          {/* Wall */}
          <div style={{
            background: "linear-gradient(180deg, #3d3425 0%, #352e20 30%, #302818 60%, #2a2215 100%)",
            position: "relative", padding: "0 18px", minHeight: 500,
          }}>
            {/* Wall texture */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 30%, rgba(255,200,100,0.03) 0%, transparent 40%), radial-gradient(circle at 80% 60%, rgba(255,200,100,0.02) 0%, transparent 30%)", pointerEvents: "none" }} />
            {[15, 35, 55, 75].map((p, i) => (
              <div key={i} style={{ position: "absolute", left: `${p}%`, top: 0, bottom: 0, width: 1, background: `rgba(0,0,0,${0.03 + i * 0.01})`, pointerEvents: "none" }} />
            ))}

            {/* Hanging lamp */}
            <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: 20, animation: "sway 6s ease-in-out infinite", transformOrigin: "top center" }}>
              <div style={{ width: 2, height: 30, background: "#2a2015", margin: "0 auto" }} />
              <div style={{ width: 20, height: 14, background: "radial-gradient(ellipse, #5a4a30 0%, #3a2e18 100%)", margin: "0 auto", borderRadius: "2px 2px 10px 10px", border: "1px solid #6a5a3a" }} />
              <div style={{ width: 120, height: 80, background: "radial-gradient(ellipse, rgba(255,200,100,0.15) 0%, rgba(255,180,80,0.05) 40%, transparent 70%)", position: "absolute", top: 35, left: "50%", transform: "translateX(-50%)", animation: "flicker 5s infinite", pointerEvents: "none" }} />
              <div style={{ width: 8, height: 10, background: "radial-gradient(circle, #ffd080 0%, #ffb040 60%, #cc8020 100%)", margin: "0 auto", borderRadius: "50%", boxShadow: "0 0 12px rgba(255,200,100,0.5), 0 0 30px rgba(255,180,80,0.2)" }} />
            </div>

            {/* Framed picture */}
            <div style={{ position: "absolute", top: 20, left: 24, width: 40, height: 50, border: "3px solid #5a4a30", background: "#1a1610", boxShadow: "2px 2px 0 rgba(0,0,0,0.3)", zIndex: 1, opacity: 0.6 }}>
              <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #2a2418 0%, #1e1a12 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, opacity: 0.4 }}>🎵</div>
            </div>

            {/* Header */}
            <div style={{ textAlign: "center", padding: "50px 0 16px", position: "relative", zIndex: 5 }}>
              <h1 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 13, color: "#e8dcc8", margin: "0 0 6px", letterSpacing: 2, textShadow: "0 0 20px rgba(255,200,100,0.15)" }}>
                ADAM'S VINYL ROOM
              </h1>
              <p style={{ fontSize: 11, color: "#6a5a40", margin: 0 }}>{RECORDS.length} records on the shelf · click to review</p>
            </div>

            {/* Filter controls */}
            <div style={{ padding: "4px 4px 8px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 10 }}>
              <button onClick={() => setShowFilters(!showFilters)} style={{
                fontFamily: "'Press Start 2P', monospace", fontSize: 7,
                background: showFilters ? "#3a3020" : "transparent",
                color: showFilters ? "#ffd080" : "#6a5a40",
                border: "2px solid #5a4a30", padding: "5px 10px", cursor: "pointer", borderRadius: 2, transition: "all 0.15s",
              }}>⚙ FILTER {showFilters ? "▲" : "▼"}</button>
              <div style={{ fontSize: 20, animation: "spin 4s linear infinite", opacity: 0.2, filter: "sepia(1)" }}>💿</div>
              <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: "#6a5a40" }}>{filtered.length} showing</span>
            </div>

            {showFilters && (
              <div style={{ padding: "10px 8px 14px", display: "flex", gap: 10, flexWrap: "wrap", borderTop: "2px solid #3a3020", borderBottom: "2px solid #3a3020", marginBottom: 8, animation: "fadeIn 0.15s ease-out", position: "relative", zIndex: 10 }}>
                <div>
                  <label style={{ fontSize: 6, color: "#6a5a40", fontFamily: "'Press Start 2P', monospace", display: "block", marginBottom: 4 }}>GENRE</label>
                  <select value={genreFilter} onChange={e => setGenreFilter(e.target.value)} style={selectStyle}>
                    <option value="All">All</option>
                    {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 6, color: "#6a5a40", fontFamily: "'Press Start 2P', monospace", display: "block", marginBottom: 4 }}>RATING</label>
                  <select value={ratingFilter} onChange={e => setRatingFilter(e.target.value)} style={selectStyle}>
                    <option value="All">All</option>
                    {RATINGS.map(r => <option key={r} value={r}>{"⭐".repeat(r)}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 6, color: "#6a5a40", fontFamily: "'Press Start 2P', monospace", display: "block", marginBottom: 4 }}>SORT</label>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={selectStyle}>
                    <option value="date">Latest</option>
                    <option value="rating">Rating</option>
                    <option value="artist">Artist</option>
                    <option value="title">Title</option>
                  </select>
                </div>
                {(genreFilter !== "All" || ratingFilter !== "All") && (
                  <button onClick={() => { setGenreFilter("All"); setRatingFilter("All"); }} style={{ ...selectStyle, alignSelf: "flex-end", color: "#cc6644", borderColor: "#cc6644", background: "transparent" }}>CLEAR ✕</button>
                )}
              </div>
            )}

            {/* Shelves */}
            <div style={{ position: "relative", zIndex: 5, marginTop: 8 }}>
              {shelves.map((shelfRecords, i) => (
                <ShelfRow key={i} records={shelfRecords} onRecordClick={setSelectedRecord} shelfIndex={i} />
              ))}
            </div>

            {/* Turntable + floor records */}
            <div style={{ position: "relative", zIndex: 5, marginTop: 20, display: "flex", gap: 12, alignItems: "flex-end", padding: "0 4px" }}>
              <div style={{ position: "relative", width: 50, height: 36 }}>
                {[0, 1, 2, 3].map(i => (
                  <div key={i} style={{ position: "absolute", bottom: i * 2, left: i * 1, width: 48, height: 48, background: `hsl(${i * 60 + 200}, 20%, ${15 + i * 5}%)`, border: "1px solid rgba(0,0,0,0.3)", borderRadius: 1 }} />
                ))}
              </div>
              <div style={{ width: 100, height: 28, background: "linear-gradient(180deg, #2a2218 0%, #1e1810 100%)", border: "2px solid #4a3e28", borderRadius: 3, position: "relative", boxShadow: "2px 2px 0 rgba(0,0,0,0.3)" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid #3a3020", position: "absolute", top: 3, left: 12, background: "radial-gradient(circle, #1a1610 30%, #2a2418 100%)", animation: "spin 2s linear infinite" }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#ffd080", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
                </div>
                <div style={{ width: 24, height: 2, background: "#6a5a3a", position: "absolute", top: 8, right: 14, transform: "rotate(-25deg)", transformOrigin: "right center", borderRadius: 1 }} />
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#44cc44", position: "absolute", bottom: 4, right: 8, boxShadow: "0 0 6px rgba(68,204,68,0.4)" }} />
              </div>
            </div>
          </div>

          {/* Floor */}
          <div style={{ height: 50, background: "linear-gradient(180deg, #1a1510 0%, #14110c 100%)", borderTop: "3px solid #2a2015", position: "relative", overflow: "hidden" }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ position: "absolute", top: 0, bottom: 0, left: `${i * 14}%`, width: 1, background: "rgba(255,200,100,0.03)" }} />
            ))}
            <div style={{ position: "absolute", bottom: 0, left: "25%", right: "25%", height: 20, background: "linear-gradient(90deg, #4a1a1a 0%, #6a2a2a 30%, #5a2020 60%, #4a1a1a 100%)", borderTop: "2px solid #7a3a3a", borderRadius: "2px 2px 0 0", opacity: 0.5 }}>
              <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,200,100,0.06) 8px, rgba(255,200,100,0.06) 9px)" }} />
            </div>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: "linear-gradient(180deg, #3a3020 0%, #2a2015 100%)" }} />
          </div>
        </div>
      </div>

      <DetailPanel record={selectedRecord} onClose={() => setSelectedRecord(null)} />
    </div>
  );
}
