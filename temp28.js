/**
 * TEMPLATE 28: SINGLELINE CENTER STATEMENT
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.SINGLELINE_CENTER_STATEMENT = {
    name: "Singleline Center Statement",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();
        const text = (slide.items && slide.items[0]) ? slide.items[0] : slide.title || "Core point";

        s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 10, h: 5.625, fill: { color: p.dark } });
        s.addShape(pptx.ShapeType.roundRect, {
            x: 1.0, y: 1.2, w: 8.0, h: 3.2,
            fill: { color: "FFFFFF", transparency: 8 }, line: { color: p.accent, width: 1.5 }
        });
        s.addText(slide.title || "Single Line Insight", {
            x: 1.4, y: 1.6, w: 7.2, h: 0.5, fontSize: 20, bold: true, align: "center", color: p.primary
        });
        s.addText(text, {
            x: 1.5, y: 2.35, w: 7.0, h: 1.5, fontSize: 36, bold: true, align: "center", color: "111827"
        });
    }
};
