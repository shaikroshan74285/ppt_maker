let LAST_VARIANT = 1;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnRegenerate").addEventListener("click", () => {
    LAST_VARIANT++;
    setStatus("Regenerate ✅ Now click Download PPT");
  });

  document.getElementById("btnDownload").addEventListener("click", downloadPPT);
});

function setStatus(msg) {
  const el = document.getElementById("statusText");
  if (el) el.textContent = msg;
}

/* =========================================================
   Helpers
========================================================= */
function cleanLine(x) {
  return String(x || "").replace(/^[-•]\s*/, "").trim();
}

function countWords(line) {
  return cleanLine(line).split(/\s+/).filter(Boolean).length;
}

function avgWords(items) {
  const arr = (items || []).map(countWords).filter(Boolean);
  if (!arr.length) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function splitDotBullets(line) {
  if (!String(line).includes("•")) return null;
  const arr = String(line)
    .split("•")
    .map(x => cleanLine(x))
    .filter(Boolean);
  return arr.length >= 2 ? arr : null;
}

function smartSplitParagraphToBullets(paragraph, maxBullets = 6) {
  paragraph = cleanLine(paragraph);
  if (!paragraph) return [];

  const wc0 = paragraph.split(/\s+/).length;
  if (wc0 <= 18) return [paragraph];

  let sentences = paragraph
    .split(/(?<=[.?!])\s+/)
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => s.replace(/[.?!]$/, "").trim());

  const bullets = [];
  for (let s of sentences) {
    if (!s) continue;

    const wc = s.split(/\s+/).length;
    if (wc > 22) {
      s.split(/,\s+/)
        .map(x => x.trim())
        .filter(Boolean)
        .forEach(p => bullets.push(p));
    } else {
      bullets.push(s);
    }
  }

  return bullets.map(cleanLine).filter(Boolean).slice(0, maxBullets);
}

/* =========================================================
   Parser (Slide 1 — Title supported)
========================================================= */
function parseSlidesFromOutlineText(text) {
  text = String(text || "")
    .replace(/–/g, "-")
    .replace(/—/g, "-");

  // split at Slide headings
  const parts = text
    .split(/(?=Slide\s*\d+\s*[:\-])/gi)
    .map(p => p.trim())
    .filter(Boolean);

  return parts.map((part, idx) => {
    const lines = part.split("\n").map(l => l.trim()).filter(Boolean);
    const header = lines[0] || "";
    const m = header.match(/^Slide\s*(\d+)\s*[:\-]\s*(.+)$/i);

    const slideNo = m ? parseInt(m[1]) : idx + 1;
    const title = m ? m[2].trim() : `Slide ${idx + 1}`;
    const body = lines.slice(1);

    let items = [];

    body.forEach(line => {
      line = cleanLine(line);
      if (!line) return;

      // dot bullets in one line
      const dot = splitDotBullets(line);
      if (dot) {
        items.push(...dot);
        return;
      }

      // long paragraph -> bullets
      if (countWords(line) >= 25) {
        items.push(...smartSplitParagraphToBullets(line, 6));
        return;
      }

      items.push(line);
    });

    return { slideNo, title, items, raw: part };
  });
}

/* =========================================================
   Keyword extraction
========================================================= */
function extractText(slide) {
  return (slide.title + " " + (slide.items || []).join(" ")).toLowerCase();
}

function words(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9% ]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function extractKeywords(slide) {
  const stop = new Set([
    "the","is","and","or","to","of","in","a","an","for","with","on","by","as",
    "slide","step","page","details","include","main","major","types"
  ]);

  const w = words(extractText(slide))
    .filter(x => !stop.has(x) && x.length >= 3);

  const freq = {};
  for (const x of w) freq[x] = (freq[x] || 0) + 1;

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(x => x[0]);
}

/* =========================================================
   Assets resolver (no repeat background image)
========================================================= */
function safeCheckAssets() {
  if (!window.ASSETS) throw new Error("assets.js not loaded");
}

function scoreAsset(asset, keywords, variant) {
  const tags = new Set((asset.tags || []).map(t => String(t).toLowerCase()));
  let score = 0;

  keywords.forEach(k => {
    if (tags.has(k)) score += 6;
  });

  score += ((Math.sin((variant + (asset.id || "").length) * 777) + 1) * 2);
  return score;
}

function pickUniqueBg(keywords, usedIds, variant) {
  safeCheckAssets();
  const imgs = window.ASSETS.images || [];
  if (!imgs.length) return { id: null, base64: null };

  const ranked = imgs
    .map(img => ({ img, score: scoreAsset(img, keywords, variant) }))
    .sort((a, b) => b.score - a.score);

  for (const r of ranked) {
    if (!usedIds.has(r.img.id)) {
      usedIds.add(r.img.id);
      return { id: r.img.id, base64: r.img.base64 };
    }
  }

  // fallback if all used
  const fallback = ranked[variant % ranked.length]?.img;
  return fallback ? { id: fallback.id, base64: fallback.base64 } : { id: null, base64: null };
}

function pickIcons(keywords, count = 3, variant = 0) {
  safeCheckAssets();
  const icons = window.ASSETS.icons || [];
  if (!icons.length) return [];

  const ranked = icons.map(ic => {
    const tags = new Set((ic.tags || []).map(t => String(t).toLowerCase()));
    let score = 0;
    keywords.forEach(k => { if (tags.has(k)) score += 3; });
    score += ((Math.sin((variant + (ic.id || "").length) * 555) + 1) * 1);
    return { ic, score };
  }).sort((a, b) => b.score - a.score);

  return ranked.slice(0, count).map(x => x.ic.base64);
}

function resolveSlideAssets(slide, usedIds, variant) {
  const bgPick = pickUniqueBg(slide.keywords || [], usedIds, variant);
  return {
    bgId: bgPick.id,
    bg: bgPick.base64,
    icons: pickIcons(slide.keywords || [], 3, variant)
  };
}

/* =========================================================
   ✅ SMART TEMPLATE PICK (matter-based + random)
========================================================= */

function slideCategory(slide, idx) {
  const items = slide.items || [];
  const n = items.length;
  const avg = avgWords(items);
  const maxW = Math.max(0, ...(items.map(countWords)));

  if (idx === 0 || n <= 1) return "TITLE";
  if (avg >= 14 || maxW >= 22) return "PARAGRAPH_HEAVY";
  if (n <= 3 && avg >= 8) return "LONG_3POINTS";
  if (n <= 5 && items.every(x => countWords(x) <= 5)) return "SHORT_POINTS";
  if (n > 5 && items.every(x => countWords(x) <= 5)) return "SHORT_MANY_POINTS";
  if (n >= 4 && n <= 6 && avg <= 7) return "NORMAL_BULLETS";
  if (n > 3 && avg > 5) return "LONG_BULLETS";

  const t = (slide.title || "").toLowerCase();
  if (t.includes("process") || t.includes("steps") || t.includes("workflow"))
    return "PROCESS";

  return "MIXED";
}

// deterministic random (so regenerate changes)
function pickRandom(arr, seed = 0) {
  if (!arr.length) return null;
  const idx = Math.abs(Math.floor(Math.sin(seed) * 10000)) % arr.length;
  return arr[idx];
}

function getTemplatePoolByCategory(cat) {
  const P = window.TEMPLATES;

  // ✅ ensure missing templates won't break engine
  const safe = (x) => x && typeof x.build === "function";

  const map = {
    TITLE: [P.TITLE_PHOTO_BAR],
    PARAGRAPH_HEAVY: [P.OVERLAY_PARAGRAPH, P.IMAGE_LEFT_TEXT_RIGHT, P.LONG_3POINTS],
    LONG_3POINTS: [P.LONG_3POINTS, P.IMAGE_LEFT_TEXT_RIGHT, P.FEATURE_CARDS_RIGHT],
    SHORT_POINTS: [P.THREE_FEATURE_BLOCKS, P.FEATURE_CARDS_RIGHT, P.PROCESS_STACK],
    SHORT_MANY_POINTS: [P.REQUIREMENTS_GRID_RIGHT, P.PROCESS_STACK, P.FEATURE_CARDS_RIGHT],
    NORMAL_BULLETS: [P.FEATURE_CARDS_RIGHT, P.IMAGE_LEFT_TEXT_RIGHT, P.APPLY_LOAN_LEFT_IMAGE],
    LONG_BULLETS: [P.APPLY_LOAN_LEFT_IMAGE, P.IMAGE_LEFT_TEXT_RIGHT, P.OVERLAY_PARAGRAPH],
    PROCESS: [P.PROCESS_STACK, P.FEATURE_CARDS_RIGHT, P.THREE_FEATURE_BLOCKS],
    MIXED: [
      P.FEATURE_CARDS_RIGHT,
      P.IMAGE_LEFT_TEXT_RIGHT,
      P.PROCESS_STACK,
      P.APPLY_LOAN_LEFT_IMAGE,
      P.REQUIREMENTS_GRID_RIGHT
    ]
  };

  return (map[cat] || map.MIXED).filter(safe);
}

function chooseTemplate(slide, idx, variant) {
  const cat = slideCategory(slide, idx);
  const pool = getTemplatePoolByCategory(cat);

  const tpl = pickRandom(pool, variant + idx * 91);
  return tpl || window.TEMPLATES.FEATURE_CARDS_RIGHT;
}

/**
 * ✅ Optional soft diversity (NOT fixed 4 templates)
 * It just avoids "same template everywhere"
 */
function softenRepetition(chosenTemplates, variant) {
  const ids = chosenTemplates.map(t => t?.id).filter(Boolean);

  // if >60% same template, add more variety
  const freq = {};
  ids.forEach(id => freq[id] = (freq[id] || 0) + 1);
  const top = Object.entries(freq).sort((a, b) => b[1] - a[1])[0];

  if (!top) return chosenTemplates;

  const [topId, topCount] = top;
  if (topCount / ids.length < 0.6) return chosenTemplates;

  // swap some slides to different templates
  const allTemplates = Object.values(window.TEMPLATES)
    .filter(t => t?.id && typeof t.build === "function" && t.id !== "TITLE_PHOTO_BAR");

  for (let i = 1; i < chosenTemplates.length; i++) {
    if (chosenTemplates[i]?.id === topId) {
      chosenTemplates[i] = pickRandom(allTemplates, variant + i * 77) || chosenTemplates[i];
    }
  }

  return chosenTemplates;
}

/* =========================================================
   Download PPT
========================================================= */
async function downloadPPT() {
  try {
    const input = document.getElementById("inputText").value.trim();
    if (!input) return alert("Paste content first!");

    if (!window.TEMPLATES) throw new Error("templates.js not loaded (TEMPLATES missing)");
    if (!window.PPT_THEMES) throw new Error("templates.js not loaded (PPT_THEMES missing)");

    safeCheckAssets();

    const themeKey = "loan_lms";
    const theme = window.PPT_THEMES[themeKey];

    const slides = parseSlidesFromOutlineText(input);
    if (!slides.length) return alert("No slides detected.");

    // keywords
    slides.forEach(s => s.keywords = extractKeywords(s));

    // templates chosen
    let chosenTemplates = slides.map((s, idx) => chooseTemplate(s, idx, LAST_VARIANT));
    chosenTemplates = softenRepetition(chosenTemplates, LAST_VARIANT);

    // images unique
    const usedIds = new Set();

    slides.forEach((s, idx) => {
      s.template = chosenTemplates[idx] || window.TEMPLATES.FEATURE_CARDS_RIGHT;
      s.assets = resolveSlideAssets(s, usedIds, LAST_VARIANT + idx);
    });

    console.log("Templates used:", slides.map(s => s.template?.id));
    console.log("Images used:", slides.map(s => s.assets?.bgId));

    const pptx = new PptxGenJS();
    pptx.defineLayout({ name: "CUSTOM", width: 10, height: 5.625 });
    pptx.layout = "CUSTOM";

    slides.forEach((s, idx) => {
      if (!s.template || typeof s.template.build !== "function") {
        console.error("Template missing build():", s.template, "Slide:", s);
        throw new Error(`Template build missing for slide ${idx + 1}`);
      }
      s.template.build(pptx, theme, s, s.assets);
    });

    await pptx.writeFile({ fileName: "AI_PPT_Basic.pptx" });
    setStatus("Done ✅ Downloaded");
  } catch (err) {
    console.error(err);
    alert("Error: " + err.message);
    setStatus("Error ❌ Check console");
  }
}
