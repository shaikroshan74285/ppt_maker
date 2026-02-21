/**
 * TEMPLATE 25: ADV DISADV TIMELINE
 * Horizontal timeline: strengths then limitations
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.ADV_DISADV_TIMELINE = {
    name: "Adv Disadv Timeline",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();
        const items = (slide.items || []).slice(0, 6);

        s.background = { fill: "FFFFFF" };

        s.addText(slide.title || "Comparison Timeline", {
            x: 0.6, y: 0.4, w: 8.8, h: 0.7,
            fontSize: 28, bold: true, color: "111827"
        });

        s.addShape(pptx.ShapeType.line, {
            x: 1.0, y: 2.8, w: 8.0, h: 0,
            line: { color: p.primary, pt: 2.5 }
        });

        for (let i = 0; i < items.length; i++) {
            const x = 1.05 + (i * 1.3);
            const isAdv = i < Math.ceil(items.length / 2);
            s.addShape(pptx.ShapeType.ellipse, {
                x: x, y: 2.62, w: 0.35, h: 0.35,
                fill: { color: isAdv ? "10B981" : "EF4444" }
            });
            s.addText(items[i], {
                x: x - 0.45, y: isAdv ? 1.45 : 3.05, w: 1.2, h: 1.0,
                fontSize: 10, align: "center", color: "374151"
            });
        }

        s.addText("Advantages", { x: 1.0, y: 0.95, w: 2.2, h: 0.4, fontSize: 14, bold: true, color: "047857" });
        s.addText("Disadvantages", { x: 6.8, y: 0.95, w: 2.2, h: 0.4, fontSize: 14, bold: true, color: "B91C1C" });
    }
};
