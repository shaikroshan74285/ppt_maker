/**
 * TEMPLATE 33: MULTIPOINT ICON GRID
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.MULTIPOINT_ICON_GRID = {
    name: "Multipoint Icon Grid",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();
        const items = (slide.items || []).slice(0, 6);
        const pos = [
            { x: 0.8, y: 1.3 }, { x: 3.55, y: 1.3 }, { x: 6.3, y: 1.3 },
            { x: 0.8, y: 3.35 }, { x: 3.55, y: 3.35 }, { x: 6.3, y: 3.35 }
        ];

        s.background = { fill: "FFFFFF" };
        s.addText(slide.title || "Point Grid", { x: 0.6, y: 0.35, w: 8.8, h: 0.7, fontSize: 27, bold: true, color: "111827" });

        for (let i = 0; i < items.length; i++) {
            s.addShape(pptx.ShapeType.roundRect, {
                x: pos[i].x, y: pos[i].y, w: 2.45, h: 1.75,
                fill: { color: "F8FAFC" }, line: { color: p.light, width: 1 }
            });
            if (assets && assets.icons && assets.icons[i]) {
                s.addImage({ path: assets.icons[i].path, x: pos[i].x + 0.95, y: pos[i].y + 0.2, w: 0.5, h: 0.5 });
            } else {
                s.addShape(pptx.ShapeType.ellipse, { x: pos[i].x + 1.0, y: pos[i].y + 0.25, w: 0.4, h: 0.4, fill: { color: p.secondary } });
            }
            s.addText(items[i], { x: pos[i].x + 0.2, y: pos[i].y + 0.85, w: 2.05, h: 0.7, fontSize: 11, align: "center", color: "374151" });
        }
    }
};
