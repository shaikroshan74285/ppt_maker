/**
 * TEMPLATE 32: MULTIPOINT NUMBERED PATH
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.MULTIPOINT_NUMBERED_PATH = {
    name: "Multipoint Numbered Path",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();
        const items = (slide.items || []).slice(0, 6);

        s.background = { fill: "FFFFFF" };
        s.addText(slide.title || "Key Points", { x: 0.6, y: 0.35, w: 8.8, h: 0.7, fontSize: 27, bold: true, color: "111827" });

        let y = 1.25;
        items.forEach(function (it, i) {
            s.addShape(pptx.ShapeType.roundRect, {
                x: 0.9, y: y, w: 8.2, h: 0.58,
                fill: { color: i % 2 ? "F8FAFC" : "FFFFFF" }, line: { color: "E5E7EB", width: 0.8 }
            });
            s.addShape(pptx.ShapeType.ellipse, { x: 1.12, y: y + 0.12, w: 0.35, h: 0.35, fill: { color: p.primary } });
            s.addText(String(i + 1), { x: 1.21, y: y + 0.19, w: 0.2, h: 0.12, fontSize: 9, bold: true, color: "FFFFFF" });
            s.addText(it, { x: 1.65, y: y + 0.12, w: 7.1, h: 0.35, fontSize: 12, color: "374151" });
            y += 0.68;
        });
    }
};
