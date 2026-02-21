/**
 * TEMPLATE 27: SINGLELINE FOCUS QUOTE
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.SINGLELINE_FOCUS_QUOTE = {
    name: "Singleline Focus Quote",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();
        const text = (slide.items && slide.items[0]) ? slide.items[0] : slide.title || "Key message";

        s.background = { fill: "FFFFFF" };
        s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.7, fill: { color: p.primary } });
        s.addText(slide.title || "Focus", { x: 0.6, y: 0.9, w: 8.8, h: 0.6, fontSize: 24, bold: true, color: "111827" });
        s.addText("“", { x: 1.0, y: 2.0, w: 0.7, h: 0.8, fontSize: 64, bold: true, color: p.accent });
        s.addText(text, { x: 1.8, y: 2.2, w: 7.2, h: 1.4, fontSize: 34, bold: true, color: "1F2937" });
    }
};
