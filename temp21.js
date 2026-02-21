/**
 * TEMPLATE 21: CONCLUSION MULTI PILLARS
 * Three-pillar conclusion with compact cards
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.CONCLUSION_MULTI_PILLARS = {
    name: "Conclusion Multi Pillars",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();
        const items = (slide.items || []).slice(0, 3);

        s.background = { fill: "FFFFFF" };

        s.addShape(pptx.ShapeType.rect, {
            x: 0, y: 0, w: 10, h: 1.15,
            fill: { color: p.primary }
        });

        s.addText(slide.title || "Conclusion", {
            x: 0.7, y: 0.28, w: 8.6, h: 0.6,
            fontSize: 25,
            bold: true,
            color: "FFFFFF"
        });

        const cardX = [0.8, 3.45, 6.1];
        for (let i = 0; i < 3; i++) {
            s.addShape(pptx.ShapeType.roundRect, {
                x: cardX[i], y: 1.75, w: 2.45, h: 3.1,
                fill: { color: "F8FAFC" },
                line: { color: p.light, width: 1.2 }
            });

            s.addShape(pptx.ShapeType.ellipse, {
                x: cardX[i] + 0.9, y: 2.05, w: 0.65, h: 0.65,
                fill: { color: p.secondary, transparency: 15 }
            });

            const txt = items[i] || "Add key conclusion point";
            s.addText(txt, {
                x: cardX[i] + 0.24, y: 2.95, w: 1.95, h: 1.5,
                fontSize: 13,
                align: "center",
                color: "374151"
            });
        }

        if (assets && assets.icons) {
            for (let j = 0; j < 3; j++) {
                if (assets.icons[j]) {
                    s.addImage({
                        path: assets.icons[j].path,
                        x: cardX[j] + 1.05, y: 2.17, w: 0.35, h: 0.35
                    });
                }
            }
        }
    }
};
