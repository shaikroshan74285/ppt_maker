/**
 * TEMPLATE 16: TITLE DUOTONE FRAME
 * Framed title slide with duotone background blocks
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.TITLE_DUOTONE_FRAME = {
    name: "Title Duotone Frame",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();

        s.addShape(pptx.ShapeType.rect, {
            x: 0, y: 0, w: 10, h: 5.625,
            fill: { color: p.dark }
        });

        s.addShape(pptx.ShapeType.rect, {
            x: 0, y: 3.7, w: 10, h: 1.925,
            fill: { color: p.primary }
        });

        s.addShape(pptx.ShapeType.roundRect, {
            x: 0.8, y: 0.65, w: 8.4, h: 3.6,
            fill: { color: "FFFFFF", transparency: 5 },
            line: { color: p.accent, width: 2 }
        });

        s.addText(slide.title || "Presentation", {
            x: 1.2, y: 1.35, w: 7.6, h: 1.2,
            fontSize: 40,
            bold: true,
            align: "center",
            color: "111827"
        });

        const subtitle = (slide.items && slide.items[0]) ? slide.items[0] : "Structured insights for your topic";
        s.addText(subtitle, {
            x: 1.5, y: 2.7, w: 7, h: 0.7,
            fontSize: 16,
            align: "center",
            color: "374151"
        });

        if (assets && assets.bg) {
            s.addImage({
                path: assets.bg.path,
                x: 4.05, y: 4.2, w: 1.9, h: 1.2
            });
        } else {
            s.addShape(pptx.ShapeType.ellipse, {
                x: 4.45, y: 4.35, w: 1.1, h: 1.1,
                fill: { color: p.accent }
            });
        }
    }
};
