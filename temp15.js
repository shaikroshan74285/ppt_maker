/**
 * TEMPLATE 15: TITLE MINIMAL ACCENT
 * Minimal title slide with strong typography and vertical accent
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.TITLE_MINIMAL_ACCENT = {
    name: "Title Minimal Accent",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();

        s.background = { fill: "FFFFFF" };

        s.addShape(pptx.ShapeType.rect, {
            x: 0.55, y: 0.6, w: 0.12, h: 4.4,
            fill: { color: p.primary }
        });

        s.addText(slide.title || "Presentation", {
            x: 0.95, y: 1.05, w: 6.3, h: 1.8,
            fontSize: 44,
            bold: true,
            color: "111827"
        });

        const subtitle = (slide.items && slide.items[0]) ? slide.items[0] : "Key ideas and outcomes";
        s.addText(subtitle, {
            x: 0.95, y: 3.0, w: 5.5, h: 0.8,
            fontSize: 17,
            color: "4B5563"
        });

        s.addShape(pptx.ShapeType.rect, {
            x: 0.95, y: 4.1, w: 2.2, h: 0.07,
            fill: { color: p.secondary }
        });

        if (assets && assets.bg) {
            s.addImage({
                path: assets.bg.path,
                x: 6.85, y: 0.75, w: 2.7, h: 4.2
            });
        } else {
            s.addShape(pptx.ShapeType.roundRect, {
                x: 6.85, y: 0.75, w: 2.7, h: 4.2,
                fill: { color: p.light },
                line: { color: p.accent, width: 1.2 }
            });
            s.addShape(pptx.ShapeType.rect, {
                x: 7.25, y: 1.2, w: 1.9, h: 0.14,
                fill: { color: p.secondary }
            });
            s.addShape(pptx.ShapeType.rect, {
                x: 7.25, y: 1.55, w: 1.6, h: 0.1,
                fill: { color: p.accent }
            });
        }
    }
};
