/**
 * TEMPLATE 3: PROCESS STEPS
 * Horizontal stacked bars with dynamic colors
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.PROCESS_VERTICAL_STACK = {
    name: "Process Steps",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();

        s.background = { fill: "FFFFFF" };

        // Title on left (bold, black)
        s.addText(slide.title || "", {
            x: 0.4, y: 0.6, w: 3, h: 1.5,
            fontSize: 26,
            bold: true,
            color: "1F2937"
        });

        // Left accent bar with random color
        s.addShape(pptx.ShapeType.rect, {
            x: 0.35, y: 0.5, w: 0.08, h: 1.8,
            fill: { color: randColor() }
        });

        const steps = (slide.items || []).slice(0, 6);
        let y = 0.5;

        steps.forEach((step, i) => {
            // Use random color for each bar
            const color = randColor();

            // Colored bar (full width on right)
            s.addShape(pptx.ShapeType.roundRect, {
                x: 3.5, y: y, w: 6.2, h: 0.75,
                fill: { color: color }
            });

            // Step text (white, inside bar)
            s.addText(step, {
                x: 3.7, y: y + 0.18, w: 5.8, h: 0.45,
                fontSize: 15,
                color: "FFFFFF"
            });

            y += 0.85;
        });
    }
};
