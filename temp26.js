/**
 * TEMPLATE 26: DIFFERENCE DUAL COLUMN BANDS
 * Two banded columns with icon headers
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.DIFFERENCE_DUAL_COLUMN_BANDS = {
    name: "Difference Dual Column Bands",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const items = slide.items || [];
        const left = items.slice(0, Math.ceil(items.length / 2));
        const right = items.slice(Math.ceil(items.length / 2));

        s.background = { fill: "FFFFFF" };
        s.addText(slide.title || "Difference Analysis", {
            x: 0.5, y: 0.35, w: 9, h: 0.7,
            fontSize: 27, bold: true, color: "111827"
        });

        s.addShape(pptx.ShapeType.rect, { x: 0.6, y: 1.2, w: 4.25, h: 0.55, fill: { color: "059669" } });
        s.addShape(pptx.ShapeType.rect, { x: 5.15, y: 1.2, w: 4.25, h: 0.55, fill: { color: "DC2626" } });
        s.addText("ADVANTAGES", { x: 0.95, y: 1.35, w: 3.6, h: 0.25, fontSize: 12, bold: true, color: "FFFFFF" });
        s.addText("DISADVANTAGES", { x: 5.45, y: 1.35, w: 3.7, h: 0.25, fontSize: 12, bold: true, color: "FFFFFF" });

        let y = 1.95;
        left.slice(0, 6).forEach(function (it) {
            s.addShape(pptx.ShapeType.rect, { x: 0.8, y: y + 0.18, w: 0.12, h: 0.12, fill: { color: "10B981" } });
            s.addText(it, { x: 1.0, y: y, w: 3.7, h: 0.45, fontSize: 12, color: "064E3B" });
            y += 0.55;
        });

        y = 1.95;
        right.slice(0, 6).forEach(function (it) {
            s.addShape(pptx.ShapeType.rect, { x: 5.35, y: y + 0.18, w: 0.12, h: 0.12, fill: { color: "EF4444" } });
            s.addText(it, { x: 5.55, y: y, w: 3.7, h: 0.45, fontSize: 12, color: "7F1D1D" });
            y += 0.55;
        });
    }
};
