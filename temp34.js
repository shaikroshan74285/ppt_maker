/**
 * TEMPLATE 34: MULTIPOINT STAGGERED CARDS
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.MULTIPOINT_STAGGERED_CARDS = {
    name: "Multipoint Staggered Cards",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();
        const items = (slide.items || []).slice(0, 6);

        s.background = { fill: "FFFFFF" };
        s.addText(slide.title || "Staggered Highlights", { x: 0.6, y: 0.35, w: 8.8, h: 0.7, fontSize: 27, bold: true, color: "111827" });

        let y = 1.25;
        for (let i = 0; i < items.length; i++) {
            const x = (i % 2 === 0) ? 0.9 : 1.7;
            s.addShape(pptx.ShapeType.roundRect, {
                x: x, y: y, w: 7.8, h: 0.62,
                fill: { color: i % 2 === 0 ? "EEF2FF" : "F8FAFC" }, line: { color: p.light, width: 0.8 }
            });
            s.addShape(pptx.ShapeType.rect, { x: x, y: y, w: 0.12, h: 0.62, fill: { color: p.primary } });
            s.addText(items[i], { x: x + 0.28, y: y + 0.14, w: 7.2, h: 0.35, fontSize: 12, color: "334155" });
            y += 0.7;
        }
    }
};
