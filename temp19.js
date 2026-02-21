/**
 * TEMPLATE 19: CONCLUSION SINGLE METRIC
 * Single-line conclusion with bold highlight badge
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.CONCLUSION_SINGLE_METRIC = {
    name: "Conclusion Single Metric",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();
        const message = (slide.items && slide.items[0]) ? slide.items[0] : "Strong final outcome";

        s.background = { fill: "FFFFFF" };

        s.addShape(pptx.ShapeType.roundRect, {
            x: 0.75, y: 0.65, w: 8.5, h: 4.25,
            fill: { color: "F8FAFC" },
            line: { color: p.light, width: 1.2 }
        });

        s.addText(slide.title || "Conclusion", {
            x: 1.05, y: 1.05, w: 6.8, h: 0.7,
            fontSize: 26,
            bold: true,
            color: "111827"
        });

        s.addShape(pptx.ShapeType.roundRect, {
            x: 1.05, y: 1.95, w: 2.15, h: 0.45,
            fill: { color: p.primary }
        });
        s.addText("KEY TAKEAWAY", {
            x: 1.23, y: 2.08, w: 1.8, h: 0.2,
            fontSize: 10,
            bold: true,
            color: "FFFFFF"
        });

        s.addText(message, {
            x: 1.05, y: 2.65, w: 7.6, h: 1.2,
            fontSize: 27,
            bold: true,
            color: p.dark
        });

        if (assets && assets.icons && assets.icons[0]) {
            s.addImage({
                path: assets.icons[0].path,
                x: 7.95, y: 1.05, w: 1, h: 1
            });
        } else {
            s.addShape(pptx.ShapeType.ellipse, {
                x: 8.1, y: 1.15, w: 0.8, h: 0.8,
                fill: { color: p.accent }
            });
        }
    }
};
