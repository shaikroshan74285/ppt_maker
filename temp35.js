/**
 * TEMPLATE 35: MULTIPOINT LEFT RAIL LIST
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.MULTIPOINT_LEFT_RAIL_LIST = {
    name: "Multipoint Left Rail List",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();
        const items = (slide.items || []).slice(0, 7);

        s.background = { fill: "FFFFFF" };
        s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 1.3, h: 5.625, fill: { color: p.dark } });
        s.addText(slide.title || "Detailed Points", { x: 1.6, y: 0.45, w: 7.8, h: 0.7, fontSize: 27, bold: true, color: "111827" });

        let y = 1.3;
        items.forEach(function (it, i) {
            s.addShape(pptx.ShapeType.ellipse, { x: 1.7, y: y + 0.16, w: 0.14, h: 0.14, fill: { color: p.primary } });
            s.addText(it, { x: 2.0, y: y, w: 7.2, h: 0.46, fontSize: 12, color: "374151" });
            y += 0.6;
        });
    }
};
