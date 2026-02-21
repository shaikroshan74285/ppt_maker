/**
 * TEMPLATE 8: TWO COLUMNS WITH IMAGE
 * Clean layout with bullets left, image right
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.TEXT_LEFT_IMAGE_RIGHT = {
    name: "Two Columns",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();

        s.background = { fill: "FFFFFF" };

        // Title
        s.addText(slide.title || "", {
            x: 0.5, y: 0.3, w: 9, h: 0.7,
            fontSize: 26,
            bold: true,
            color: "1F2937"
        });

        // Accent underline
        s.addShape(pptx.ShapeType.rect, {
            x: 0.5, y: 0.95, w: 1.2, h: 0.06,
            fill: { color: "F59E0B" }
        });

        // Bullet points on left
        const items = (slide.items || []).slice(0, 6);
        let y = 1.3;

        items.forEach((item) => {
            s.addShape(pptx.ShapeType.ellipse, {
                x: 0.5, y: y + 0.15, w: 0.15, h: 0.15,
                fill: { color: p.primary }
            });
            s.addText(item, {
                x: 0.8, y: y, w: 4.2, h: 0.55,
                fontSize: 13,
                color: "374151"
            });
            y += 0.65;
        });

        // Image on right (Circular/Rounded)
        if (assets?.bg) {
            s.addImage({
                path: assets.bg.path,
                x: 5.5, y: 0.8, w: 4, h: 4,
                rounding: true,
                sizing: { type: 'contain', w: 4, h: 4 }
            });
        } else {
            // Placeholder with gradient
            s.addShape(pptx.ShapeType.ellipse, {
                x: 5.5, y: 0.8, w: 4, h: 4,
                fill: { color: p.light },
                line: { color: p.primary, width: 2 }
            });
        }
    }
};
