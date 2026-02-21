/**
 * TEMPLATE 36: MULTIPOINT TWO COLUMN BULLETS
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.MULTIPOINT_TWO_COLUMN_BULLETS = {
    name: "Multipoint Two Column Bullets",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();
        const items = (slide.items || []).slice(0, 8);
        const left = items.slice(0, Math.ceil(items.length / 2));
        const right = items.slice(Math.ceil(items.length / 2));

        s.background = { fill: "FFFFFF" };
        s.addText(slide.title || "Multi Point Summary", { x: 0.6, y: 0.35, w: 8.8, h: 0.7, fontSize: 27, bold: true, color: "111827" });
        s.addShape(pptx.ShapeType.line, { x: 5.0, y: 1.2, w: 0, h: 4.1, line: { color: "E5E7EB", pt: 1.2 } });

        let y = 1.35;
        left.forEach(function (it) {
            s.addShape(pptx.ShapeType.ellipse, { x: 0.85, y: y + 0.16, w: 0.14, h: 0.14, fill: { color: p.primary } });
            s.addText(it, { x: 1.12, y: y, w: 3.65, h: 0.48, fontSize: 12, color: "374151" });
            y += 0.58;
        });

        y = 1.35;
        right.forEach(function (it) {
            s.addShape(pptx.ShapeType.ellipse, { x: 5.25, y: y + 0.16, w: 0.14, h: 0.14, fill: { color: p.secondary } });
            s.addText(it, { x: 5.52, y: y, w: 3.65, h: 0.48, fontSize: 12, color: "374151" });
            y += 0.58;
        });
    }
};
