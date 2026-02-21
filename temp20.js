/**
 * TEMPLATE 20: CONCLUSION MULTI CHECKLIST
 * Multi-point conclusion with checklist style
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.CONCLUSION_MULTI_CHECKLIST = {
    name: "Conclusion Multi Checklist",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();
        const items = (slide.items || []).slice(0, 5);

        s.background = { fill: "FFFFFF" };

        s.addText(slide.title || "Conclusion", {
            x: 0.7, y: 0.45, w: 7.2, h: 0.8,
            fontSize: 30,
            bold: true,
            color: "111827"
        });

        s.addShape(pptx.ShapeType.rect, {
            x: 0.7, y: 1.15, w: 1.4, h: 0.06,
            fill: { color: p.primary }
        });

        let y = 1.55;
        items.forEach(function (item) {
            s.addShape(pptx.ShapeType.roundRect, {
                x: 0.8, y: y, w: 8.3, h: 0.62,
                fill: { color: "F8FAFC" },
                line: { color: "E5E7EB", width: 0.8 }
            });
            s.addShape(pptx.ShapeType.ellipse, {
                x: 1.05, y: y + 0.17, w: 0.25, h: 0.25,
                fill: { color: p.secondary }
            });
            s.addText(item, {
                x: 1.45, y: y + 0.12, w: 7.2, h: 0.35,
                fontSize: 14,
                color: "374151"
            });
            y += 0.77;
        });

        if (assets && assets.icons && assets.icons[0]) {
            s.addImage({
                path: assets.icons[0].path,
                x: 9.1, y: 0.35, w: 0.6, h: 0.6
            });
        }
    }
};
