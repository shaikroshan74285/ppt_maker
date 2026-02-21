/**
 * TEMPLATE 18: CONCLUSION SINGLE QUOTE
 * Single takeaway styled like a quote card
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.CONCLUSION_SINGLE_QUOTE = {
    name: "Conclusion Single Quote",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();
        const message = (slide.items && slide.items[0]) ? slide.items[0] : "Key takeaway";

        s.background = { fill: "F9FAFB" };

        s.addText(slide.title || "Final Takeaway", {
            x: 0.6, y: 0.45, w: 8.8, h: 0.7,
            fontSize: 28,
            bold: true,
            color: "111827"
        });

        s.addShape(pptx.ShapeType.roundRect, {
            x: 0.9, y: 1.4, w: 8.2, h: 2.6,
            fill: { color: "FFFFFF" },
            line: { color: p.accent, width: 1.5 }
        });

        s.addText('"', {
            x: 1.25, y: 1.55, w: 0.5, h: 0.5,
            fontSize: 52,
            bold: true,
            color: p.primary
        });

        s.addText(message, {
            x: 1.85, y: 2.0, w: 6.9, h: 1.5,
            fontSize: 24,
            bold: true,
            color: "1F2937",
            valign: "mid"
        });

        s.addShape(pptx.ShapeType.rect, {
            x: 0, y: 5.2, w: 10, h: 0.425,
            fill: { color: p.primary }
        });

        if (assets && assets.bg) {
            s.addImage({
                path: assets.bg.path,
                x: 7.95, y: 0.05, w: 1.8, h: 1.25
            });
        }
    }
};
