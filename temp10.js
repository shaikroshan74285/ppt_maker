/**
 * TEMPLATE 10: BLOG CARDS LAYOUT
 * Simple 3-column content cards
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.BLOG_CARDS_LAYOUT = {
    name: "Content Cards",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();

        s.background = { fill: "F8FAFC" };

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

        const items = (slide.items || []).slice(0, 6);
        const cols = 3;
        const cardW = 2.95;
        const cardH = 1.9;
        const gapX = 0.2;
        const gapY = 0.2;
        const startX = 0.5;
        const startY = 1.1;
        const cardColors = ["3B82F6", "10B981", "F59E0B", "EC4899", "8B5CF6", "EF4444"];

        items.forEach((text, i) => {
            const row = Math.floor(i / cols);
            const col = i % cols;
            const x = startX + col * (cardW + gapX);
            const y = startY + row * (cardH + gapY);
            const color = cardColors[i % cardColors.length];

            // White card
            s.addShape(pptx.ShapeType.roundRect, {
                x: x, y: y, w: cardW, h: cardH,
                fill: { color: "FFFFFF" },
                line: { color: "E5E7EB", width: 1 }
            });

            // Colored top bar
            s.addShape(pptx.ShapeType.rect, {
                x: x, y: y, w: cardW, h: 0.08,
                fill: { color: color }
            });

            // Number badge
            s.addShape(pptx.ShapeType.ellipse, {
                x: x + 0.15, y: y + 0.2, w: 0.4, h: 0.4,
                fill: { color: color }
            });
            s.addText(String(i + 1), {
                x: x + 0.15, y: y + 0.25, w: 0.4, h: 0.35,
                fontSize: 12,
                bold: true,
                align: "center",
                color: "FFFFFF"
            });

            // Text
            s.addText(text, {
                x: x + 0.15, y: y + 0.7, w: cardW - 0.3, h: cardH - 0.9,
                fontSize: 11,
                color: "374151"
            });
        });
    }
};
