/**
 * TEMPLATE 31: SINGLELINE MINIMAL FRAME
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.SINGLELINE_MINIMAL_FRAME = {
    name: "Singleline Minimal Frame",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();
        const text = (slide.items && slide.items[0]) ? slide.items[0] : slide.title || "Minimal message";

        s.background = { fill: "F8FAFC" };
        s.addShape(pptx.ShapeType.roundRect, {
            x: 0.8, y: 0.8, w: 8.4, h: 4.1,
            fill: { color: "FFFFFF" }, line: { color: p.primary, width: 2 }
        });
        s.addText(slide.title || "Message", {
            x: 1.2, y: 1.25, w: 7.6, h: 0.6, fontSize: 22, bold: true, align: "center", color: p.dark
        });
        s.addText(text, {
            x: 1.4, y: 2.15, w: 7.2, h: 1.5, fontSize: 33, bold: true, align: "center", color: "111827"
        });
        s.addShape(pptx.ShapeType.rect, { x: 4.6, y: 4.25, w: 0.8, h: 0.08, fill: { color: p.secondary } });
    }
};
