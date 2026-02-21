/**
 * TEMPLATE 24: PROS CONS BALANCE CARDS
 * Two elevated cards with visual balance bar
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.PROS_CONS_BALANCE_CARDS = {
    name: "Pros Cons Balance Cards",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();
        const items = slide.items || [];
        const leftItems = items.slice(0, Math.ceil(items.length / 2));
        const rightItems = items.slice(Math.ceil(items.length / 2));

        s.background = { fill: "F9FAFB" };

        s.addText(slide.title || "Pros and Cons", {
            x: 0.6, y: 0.35, w: 7.8, h: 0.65,
            fontSize: 27, bold: true, color: "111827"
        });

        s.addShape(pptx.ShapeType.roundRect, {
            x: 0.7, y: 1.25, w: 4.1, h: 3.95,
            fill: { color: "FFFFFF" }, line: { color: "D1FAE5", width: 1.3 }
        });
        s.addShape(pptx.ShapeType.roundRect, {
            x: 5.2, y: 1.25, w: 4.1, h: 3.95,
            fill: { color: "FFFFFF" }, line: { color: "FECACA", width: 1.3 }
        });

        s.addText("PROS", { x: 1.05, y: 1.55, w: 1.3, h: 0.35, fontSize: 16, bold: true, color: "047857" });
        s.addText("CONS", { x: 5.55, y: 1.55, w: 1.3, h: 0.35, fontSize: 16, bold: true, color: "B91C1C" });

        s.addShape(pptx.ShapeType.line, {
            x: 2.3, y: 5.35, w: 5.4, h: 0,
            line: { color: p.primary, pt: 2 }
        });
        s.addShape(pptx.ShapeType.ellipse, {
            x: 4.75, y: 5.2, w: 0.35, h: 0.35,
            fill: { color: p.secondary }
        });

        let y = 2.0;
        leftItems.slice(0, 5).forEach(function (it) {
            s.addText("• " + it, { x: 1.0, y: y, w: 3.5, h: 0.4, fontSize: 12, color: "065F46" });
            y += 0.58;
        });

        y = 2.0;
        rightItems.slice(0, 5).forEach(function (it) {
            s.addText("• " + it, { x: 5.5, y: y, w: 3.5, h: 0.4, fontSize: 12, color: "7F1D1D" });
            y += 0.58;
        });
    }
};
