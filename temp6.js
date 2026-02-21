/**
 * TEMPLATE 6: FULL BLEED IMAGE / PARAGRAPH CONTENT
 * Full background with text overlay - perfect for paragraphs
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.FULL_BG_TEXT_OVERLAY = {
    name: "Full Bleed / Paragraph",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();

        // White background for clean paragraph display
        s.background = { fill: "FFFFFF" };

        // Left accent bar
        s.addShape(pptx.ShapeType.rect, {
            x: 0.3, y: 0.4, w: 0.08, h: 1.5,
            fill: { color: p.primary }
        });

        // Title at top left
        s.addText(slide.title || "", {
            x: 0.5, y: 0.5, w: 5, h: 1,
            fontSize: 32,
            bold: true,
            color: "1F2937"
        });

        // Content handling - paragraph style vs bullet style
        if (slide.items?.length) {
            const items = slide.items;

            // Check if this is paragraph content (1-2 long items) or bullet content
            const isParagraph = items.length <= 2 && items.some(i => i.length > 80);

            if (isParagraph) {
                // Display as paragraph text in a colored box
                const fullText = items.join(" ");

                // Colored text box on right side
                s.addShape(pptx.ShapeType.roundRect, {
                    x: 3.5, y: 0.4, w: 6, h: 2.5,
                    fill: { color: p.primary }
                });

                s.addText(fullText, {
                    x: 3.7, y: 0.6, w: 5.6, h: 2.2,
                    fontSize: 14,
                    color: "FFFFFF",
                    valign: "top"
                });
            } else {
                // Display as bullet points for lists
                let y = 1.8;
                const maxItems = items.slice(0, 6);

                maxItems.forEach((item) => {
                    // Bullet dot
                    s.addShape(pptx.ShapeType.ellipse, {
                        x: 0.5, y: y + 0.12, w: 0.12, h: 0.12,
                        fill: { color: p.primary }
                    });

                    s.addText(item, {
                        x: 0.75, y: y, w: 8.5, h: 0.5,
                        fontSize: 13,
                        color: "374151"
                    });
                    y += 0.55;
                });
            }
        }

        // Add decorative image on bottom right if available
        if (assets?.bg) {
            s.addImage({
                path: assets.bg.path,
                x: 5.5, y: 3.2, w: 4, h: 2.2
            });
        }
    }
};
