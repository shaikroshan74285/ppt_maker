/**
 * TEMPLATE 1: TITLE SLIDE
 * Hero layout with bold title and accent elements
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.HERO_IMAGE_TITLE = {
    name: "Title Hero",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();

        // Background with image or solid color
        if (assets?.bg) {
            s.addImage({ path: assets.bg.path, x: 0, y: 0, w: 10, h: 5.625 });
            // Dark overlay
            s.addShape(pptx.ShapeType.rect, {
                x: 0, y: 0, w: 10, h: 5.625,
                fill: { color: "000000", transparency: 45 }
            });
        } else {
            // Gradient-style split
            s.addShape(pptx.ShapeType.rect, {
                x: 0, y: 0, w: 10, h: 4,
                fill: { color: p.primary }
            });
            s.addShape(pptx.ShapeType.rect, {
                x: 0, y: 4, w: 10, h: 1.625,
                fill: { color: p.dark }
            });
        }

        // Center title
        s.addText(slide.title || "Presentation", {
            x: 0.5, y: 2, w: 9, h: 1.2,
            fontSize: 44,
            bold: true,
            align: "center",
            color: "FFFFFF"
        });

        // Subtitle line
        if (slide.items?.[0]) {
            s.addText(slide.items[0], {
                x: 1.5, y: 3.3, w: 7, h: 0.6,
                fontSize: 18,
                align: "center",
                color: p.accent
            });
        }

        // Bottom accent line
        s.addShape(pptx.ShapeType.rect, {
            x: 4, y: 4.2, w: 2, h: 0.08,
            fill: { color: p.accent }
        });
    }
};
