/**
 * TEMPLATE 30: SINGLELINE ACCENT BLOCK
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.SINGLELINE_ACCENT_BLOCK = {
    name: "Singleline Accent Block",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();
        const text = (slide.items && slide.items[0]) ? slide.items[0] : slide.title || "Single-line point";

        s.background = { fill: "FFFFFF" };
        s.addShape(pptx.ShapeType.rect, { x: 0.5, y: 0.6, w: 3.8, h: 4.4, fill: { color: p.primary } });
        s.addText(slide.title || "Highlight", {
            x: 0.85, y: 1.0, w: 3.1, h: 0.6, fontSize: 18, bold: true, color: "FFFFFF"
        });
        s.addText(text, {
            x: 4.7, y: 1.65, w: 4.7, h: 2.1, fontSize: 34, bold: true, color: "1F2937"
        });
        s.addShape(pptx.ShapeType.line, { x: 4.7, y: 3.95, w: 2.2, h: 0, line: { color: p.secondary, pt: 2 } });
    }
};
