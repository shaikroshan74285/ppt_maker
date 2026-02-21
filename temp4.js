/**
 * TEMPLATE 4: IMAGE + BULLETS
 * Left image, right bullet list
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.IMAGE_LEFT_BULLETS_RIGHT = {
    name: "Image + Bullets",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();

        // Left side: image or colored block
        if (assets?.bg) {
            s.addImage({
                path: assets.bg.path,
                x: 0, y: 0, w: 4.5, h: 5.625
            });
        } else {
            s.addShape(pptx.ShapeType.rect, {
                x: 0, y: 0, w: 4.5, h: 5.625,
                fill: { color: p.primary }
            });
            // Decorative circle
            s.addShape(pptx.ShapeType.ellipse, {
                x: 1.25, y: 1.8, w: 2, h: 2,
                fill: { color: p.secondary, transparency: 30 }
            });
        }

        // Right white area
        s.addShape(pptx.ShapeType.rect, {
            x: 4.5, y: 0, w: 5.5, h: 5.625,
            fill: { color: "FFFFFF" }
        });

        // Title
        s.addText(slide.title || "", {
            x: 4.8, y: 0.5, w: 5, h: 0.8,
            fontSize: 24,
            bold: true,
            color: p.dark
        });

        // Accent line
        s.addShape(pptx.ShapeType.rect, {
            x: 4.8, y: 1.25, w: 1, h: 0.05,
            fill: { color: p.primary }
        });

        // Bullet points
        const items = (slide.items || []).slice(0, 6);
        let y = 1.5;

        items.forEach((item) => {
            // Bullet dot
            s.addShape(pptx.ShapeType.ellipse, {
                x: 4.8, y: y + 0.15, w: 0.15, h: 0.15,
                fill: { color: p.primary }
            });
            // Text
            s.addText(item, {
                x: 5.1, y: y, w: 4.5, h: 0.55,
                fontSize: 12,
                color: "374151"
            });
            y += 0.6;
        });
    }
};
