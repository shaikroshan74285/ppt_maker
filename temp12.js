/**
 * TEMPLATE 12: ZIGZAG PROCESS
 * Simple vertical numbered steps
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.ZIGZAG_PROCESS_STEPS = {
    name: "Vertical Steps",

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

        // Accent line
        s.addShape(pptx.ShapeType.rect, {
            x: 0.5, y: 0.85, w: 1.5, h: 0.06,
            fill: { color: "F59E0B" }
        });

        const items = (slide.items || []).slice(0, 5);
        const stepColors = ["3B82F6", "10B981", "F59E0B", "EC4899", "8B5CF6"];
        let y = 1.2;

        items.forEach((text, i) => {
            const color = stepColors[i % stepColors.length];

            // Number circle
            s.addShape(pptx.ShapeType.ellipse, {
                x: 0.5, y: y + 0.1, w: 0.6, h: 0.6,
                fill: { color: color }
            });
            s.addText(String(i + 1), {
                x: 0.5, y: y + 0.17, w: 0.6, h: 0.5,
                fontSize: 16,
                bold: true,
                align: "center",
                color: "FFFFFF"
            });

            // Vertical line (except for last)
            if (i < items.length - 1) {
                s.addShape(pptx.ShapeType.rect, {
                    x: 0.77, y: y + 0.7, w: 0.06, h: 0.2,
                    fill: { color: "D1D5DB" }
                });
            }

            // Content bar
            s.addShape(pptx.ShapeType.roundRect, {
                x: 1.3, y: y, w: 8.2, h: 0.75,
                fill: { color: "F9FAFB" },
                line: { color: "E5E7EB", width: 1 }
            });

            // Text
            s.addText(text, {
                x: 1.5, y: y + 0.2, w: 7.8, h: 0.45,
                fontSize: 13,
                color: "374151"
            });

            y += 0.9;
        });
    }
};
