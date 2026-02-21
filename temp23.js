/**
 * TEMPLATE 23: DIFFERENCE SPLIT CHEVRON
 * Left vs right comparison with chevron divider
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.DIFFERENCE_SPLIT_CHEVRON = {
    name: "Difference Split Chevron",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();
        const items = slide.items || [];
        const mid = Math.ceil(items.length / 2);
        const leftItems = items.slice(0, mid);
        const rightItems = items.slice(mid);

        s.background = { fill: "FFFFFF" };

        s.addText(slide.title || "Advantages vs Disadvantages", {
            x: 0.6, y: 0.35, w: 8.8, h: 0.7,
            fontSize: 28, bold: true, color: "111827"
        });

        s.addShape(pptx.ShapeType.rect, {
            x: 0.5, y: 1.2, w: 4.35, h: 4.1,
            fill: { color: "ECFDF5" }, line: { color: "A7F3D0", width: 1 }
        });
        s.addShape(pptx.ShapeType.rect, {
            x: 5.15, y: 1.2, w: 4.35, h: 4.1,
            fill: { color: "FEF2F2" }, line: { color: "FECACA", width: 1 }
        });

        s.addShape(pptx.ShapeType.chevron, {
            x: 4.7, y: 2.35, w: 0.6, h: 1.8,
            fill: { color: p.primary }
        });

        s.addText("Advantages", {
            x: 0.8, y: 1.45, w: 3.8, h: 0.4,
            fontSize: 18, bold: true, color: "065F46"
        });
        s.addText("Disadvantages", {
            x: 5.45, y: 1.45, w: 3.8, h: 0.4,
            fontSize: 18, bold: true, color: "991B1B"
        });

        let y = 1.95;
        leftItems.slice(0, 5).forEach(function (it) {
            s.addText("+" + " " + it, {
                x: 0.85, y: y, w: 3.9, h: 0.45,
                fontSize: 12, color: "14532D"
            });
            y += 0.58;
        });

        y = 1.95;
        rightItems.slice(0, 5).forEach(function (it) {
            s.addText("-" + " " + it, {
                x: 5.5, y: y, w: 3.8, h: 0.45,
                fontSize: 12, color: "7F1D1D"
            });
            y += 0.58;
        });
    }
};
