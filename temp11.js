/**
 * TEMPLATE 11: INSTALLATION GALLERY
 * Colorful gradient cards in 2 rows
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.INSTALLATION_STEPS_CARDS = {
    name: "Gallery Cards",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();

        s.background = { fill: "F3F4F6" };

        // Title
        s.addText(slide.title || "", {
            x: 0.5, y: 0.2, w: 9, h: 0.6,
            fontSize: 28,
            bold: true,
            align: "center",
            color: "1F2937"
        });

        // Subtitle
        s.addText("Step-by-step process overview", {
            x: 0.5, y: 0.75, w: 9, h: 0.35,
            fontSize: 11,
            align: "center",
            color: "6B7280"
        });

        const items = (slide.items || []).slice(0, 6);
        const cols = 4;
        const cardW = 2.2;
        const cardH = 1.8;
        const gapX = 0.2;
        const gapY = 0.2;
        const startX = 0.4;
        const startY = 1.2;

        // Gradient-like solid colors
        const cardColors = [
            "10B981", // Emerald
            "0EA5E9", // Sky blue  
            "06B6D4", // Cyan
            "A855F7", // Purple gradient end
            "F97316", // Orange
            "3B82F6"  // Blue
        ];

        items.forEach((text, i) => {
            const row = Math.floor(i / cols);
            const col = i % cols;
            const x = startX + col * (cardW + gapX);
            const y = startY + row * (cardH + gapY);
            const color = cardColors[i % cardColors.length];

            // Card with rounded corners
            s.addShape(pptx.ShapeType.roundRect, {
                x: x, y: y, w: cardW, h: cardH,
                fill: { color: color }
            });

            // Large number (watermark style)
            s.addText(String(i + 1), {
                x: x + 0.1, y: y + 0.05, w: 0.6, h: 0.7,
                fontSize: 40,
                bold: true,
                color: "FFFFFF"
            });

            // Title (first 2-3 words)
            const words = text.split(" ");
            s.addText(words.slice(0, 3).join(" "), {
                x: x + 0.15, y: y + 0.75, w: cardW - 0.3, h: 0.45,
                fontSize: 12,
                bold: true,
                color: "FFFFFF"
            });

            // Description (remaining words)
            s.addText(words.slice(3).join(" ") || text, {
                x: x + 0.15, y: y + 1.2, w: cardW - 0.3, h: 0.5,
                fontSize: 9,
                color: "FFFFFF"
            });
        });
    }
};
