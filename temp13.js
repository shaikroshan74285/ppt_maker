/**
 * TEMPLATE 13: TEXT LEFT + IMAGE RIGHT
 * Same style as Template 4 but reversed (text left, image right)
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.TEXT_LEFT_IMAGE_RIGHT_ALT = {
    name: "Text Left + Image Right Alt",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();

        // Left white area
        s.addShape(pptx.ShapeType.rect, {
            x: 0, y: 0, w: 5, h: 5.625,
            fill: { color: "FFFFFF" }
        });

        // Right side: image or colored block
        if (assets?.bg) {
            s.addImage({
                path: assets.bg.path,
                x: 5, y: 0, w: 5, h: 5.625
            });
        } else {
            s.addShape(pptx.ShapeType.rect, {
                x: 5, y: 0, w: 5, h: 5.625,
                fill: { color: p.primary }
            });
            // Decorative circle
            s.addShape(pptx.ShapeType.ellipse, {
                x: 6.5, y: 1.8, w: 2, h: 2,
                fill: { color: p.secondary, transparency: 30 }
            });
        }

        // Title
        s.addText(slide.title || "", {
            x: 0.5, y: 0.5, w: 4.2, h: 0.8,
            fontSize: 24,
            bold: true,
            color: p.dark
        });

        // Accent line
        s.addShape(pptx.ShapeType.rect, {
            x: 0.5, y: 1.25, w: 1, h: 0.05,
            fill: { color: p.primary }
        });

        // Bullet points
        const items = (slide.items || []).slice(0, 8);
        let y = 1.5;

        items.forEach((item) => {
            // Bullet dot
            s.addShape(pptx.ShapeType.ellipse, {
                x: 0.5, y: y + 0.15, w: 0.15, h: 0.15,
                fill: { color: p.primary }
            });

            // Text
            s.addText(item, {
                x: 0.8, y: y, w: 3.9, h: 0.5,
                fontSize: 12,
                color: "374151"
            });

            y += 0.5;
        });
    }
};
