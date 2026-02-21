/**
 * TEMPLATE 5: GRID BOXES
 * 3-column colorful grid with title on left (dynamic colors)
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.GRID_REQUIREMENTS = {
    name: "Grid Boxes",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();

        s.background = { fill: "FFFFFF" };

        // Title on left (bold, black with line)
        s.addText(slide.title || "", {
            x: 0.4, y: 0.6, w: 3, h: 1.8,
            fontSize: 28,
            bold: true,
            color: "1F2937"
        });

        // Left accent bar with random color
        s.addShape(pptx.ShapeType.rect, {
            x: 0.35, y: 0.5, w: 0.08, h: 2,
            fill: { color: randColor() }
        });

        const items = (slide.items || []).slice(0, 12);
        const cols = 3;
        const boxW = 1.85;
        const boxH = 1.0;
        const gapX = 0.12;
        const gapY = 0.12;
        const startX = 3.6;
        const startY = 0.5;

        items.forEach((text, i) => {
            const row = Math.floor(i / cols);
            const col = i % cols;
            const x = startX + col * (boxW + gapX);
            const y = startY + row * (boxH + gapY);
            // Use random color for each box
            const color = randColor();

            // Colored box
            s.addShape(pptx.ShapeType.roundRect, {
                x: x, y: y, w: boxW, h: boxH,
                fill: { color: color }
            });

            // Text (white, centered)
            s.addText(text, {
                x: x + 0.1, y: y + 0.25, w: boxW - 0.2, h: boxH - 0.4,
                fontSize: 10,
                align: "center",
                color: "FFFFFF"
            });
        });
    }
};
