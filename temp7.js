/**
 * TEMPLATE 7: VALUE CHAIN FLOW
 * Simple horizontal flow with connected boxes (dynamic colors)
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.VALUE_CHAIN_FLOW = {
    name: "Value Chain",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();

        s.background = { fill: "FFFFFF" };

        // Title
        s.addText(slide.title || "", {
            x: 0.5, y: 0.3, w: 9, h: 0.6,
            fontSize: 26,
            bold: true,
            color: "1F2937"
        });

        // Accent line with random color
        s.addShape(pptx.ShapeType.rect, {
            x: 0.5, y: 0.85, w: 1.5, h: 0.06,
            fill: { color: randColor() }
        });

        const items = (slide.items || []).slice(0, 5);
        const boxW = 1.7;
        const gapX = 0.15;
        const startX = 0.5;
        const boxY = 1.8;

        // Draw boxes with arrows
        items.forEach((text, i) => {
            const x = startX + i * (boxW + gapX);
            // Use random color for each box
            const color = randColor();

            // Box
            s.addShape(pptx.ShapeType.roundRect, {
                x: x, y: boxY, w: boxW, h: 2.8,
                fill: { color: color }
            });

            // Number
            s.addText(String(i + 1), {
                x: x, y: boxY + 0.1, w: boxW, h: 0.5,
                fontSize: 22,
                bold: true,
                align: "center",
                color: "FFFFFF"
            });

            // Text
            s.addText(text, {
                x: x + 0.1, y: boxY + 0.7, w: boxW - 0.2, h: 2,
                fontSize: 10,
                align: "center",
                color: "FFFFFF"
            });

            // Arrow (except for last item)
            if (i < items.length - 1) {
                s.addText("→", {
                    x: x + boxW - 0.1, y: boxY + 1.2, w: 0.4, h: 0.4,
                    fontSize: 16,
                    color: "6B7280"
                });
            }
        });
    }
};
