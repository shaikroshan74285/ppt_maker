/**
 * TEMPLATE 9: SOLUTION CARDS
 * 3 clean cards with icons and title only
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.SOLUTION_CARDS_GRID = {
    name: "Solution Cards Grid",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();

        s.background = { fill: "FFFFFF" };

        // Title Centered
        s.addText(slide.title || "", {
            x: 0.5, y: 0.3, w: 9, h: 0.7,
            fontSize: 26,
            bold: true,
            align: "center",
            color: p.dark
        });

        // Accent underline
        s.addShape(pptx.ShapeType.rect, {
            x: 4.3, y: 0.95, w: 1.4, h: 0.06,
            fill: { color: p.primary }
        });

        const items = (slide.items || []).slice(0, 3);
        const cardW = 2.9;
        const startX = 0.65;
        const gap = 3.05;

        items.forEach((text, i) => {
            const x = startX + i * gap;
            const cardPalette = COLOR_PALETTES[(paletteIndex + i) % COLOR_PALETTES.length];

            // Clean card background (no border lines)
            s.addShape(pptx.ShapeType.roundRect, {
                x: x, y: 1.2, w: cardW, h: 3.9,
                fill: { color: cardPalette.light }
            });

            // Icon circle
            s.addShape(pptx.ShapeType.ellipse, {
                x: x + 0.95, y: 1.5, w: 1, h: 1,
                fill: { color: cardPalette.primary }
            });

            // Use actual icon if available
            if (assets?.icons?.[i]) {
                s.addImage({
                    path: assets.icons[i].path,
                    x: x + 1.1, y: 1.65, w: 0.7, h: 0.7
                });
            }

            // Title only (no duplicate description)
            s.addText(text, {
                x: x + 0.15, y: 2.7, w: cardW - 0.3, h: 2.2,
                fontSize: 12,
                align: "center",
                color: cardPalette.dark
            });
        });
    }
};
