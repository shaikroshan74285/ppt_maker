/**
 * TEMPLATE 29: SINGLELINE BANNER IMAGE
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.SINGLELINE_BANNER_IMAGE = {
    name: "Singleline Banner Image",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const text = (slide.items && slide.items[0]) ? slide.items[0] : slide.title || "One powerful statement";

        if (assets && assets.bg) {
            s.addImage({ path: assets.bg.path, x: 0, y: 0, w: 10, h: 5.625 });
            s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 10, h: 5.625, fill: { color: "000000", transparency: 45 } });
        } else {
            const p = getNextPalette();
            s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 10, h: 5.625, fill: { color: p.primary } });
        }

        s.addShape(pptx.ShapeType.roundRect, {
            x: 0.8, y: 2.05, w: 8.4, h: 1.5,
            fill: { color: "FFFFFF", transparency: 15 }, line: { color: "FFFFFF", width: 1 }
        });
        s.addText(text, {
            x: 1.2, y: 2.45, w: 7.6, h: 0.8,
            fontSize: 30, bold: true, align: "center", color: "FFFFFF"
        });
    }
};
