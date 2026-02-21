/**
 * TEMPLATE 22: CONCLUSION MULTI SUMMARY GRID
 * Four-box summary grid for multiple closing points
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.CONCLUSION_MULTI_SUMMARY_GRID = {
    name: "Conclusion Multi Summary Grid",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();
        const items = (slide.items || []).slice(0, 4);

        s.background = { fill: "FFFFFF" };

        s.addText(slide.title || "Summary", {
            x: 0.6, y: 0.4, w: 8.4, h: 0.7,
            fontSize: 29,
            bold: true,
            color: "111827"
        });

        s.addShape(pptx.ShapeType.rect, {
            x: 0.6, y: 1.05, w: 2, h: 0.06,
            fill: { color: p.primary }
        });

        const boxes = [
            { x: 0.8, y: 1.45 }, { x: 5.1, y: 1.45 },
            { x: 0.8, y: 3.2 }, { x: 5.1, y: 3.2 }
        ];

        for (let i = 0; i < 4; i++) {
            s.addShape(pptx.ShapeType.roundRect, {
                x: boxes[i].x, y: boxes[i].y, w: 4.0, h: 1.45,
                fill: { color: i % 2 === 0 ? "F8FAFC" : "FFFFFF" },
                line: { color: p.light, width: 1 }
            });

            if (assets && assets.icons && assets.icons[i]) {
                s.addImage({
                    path: assets.icons[i].path,
                    x: boxes[i].x + 0.22, y: boxes[i].y + 0.42, w: 0.45, h: 0.45
                });
            } else {
                s.addShape(pptx.ShapeType.ellipse, {
                    x: boxes[i].x + 0.26, y: boxes[i].y + 0.46, w: 0.32, h: 0.32,
                    fill: { color: p.secondary }
                });
            }

            s.addText(items[i] || "Add closing point", {
                x: boxes[i].x + 0.78, y: boxes[i].y + 0.32, w: 2.95, h: 0.85,
                fontSize: 13,
                color: "374151"
            });
        }
    }
};
