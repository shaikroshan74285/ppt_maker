/**
 * TEMPLATE 17: CONCLUSION SINGLE SPOTLIGHT
 * Centered single-message conclusion slide
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.CONCLUSION_SINGLE_SPOTLIGHT = {
    name: "Conclusion Single Spotlight",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();
        const message = (slide.items && slide.items[0]) ? slide.items[0] : "Thank you";

        s.background = { fill: "FFFFFF" };

        s.addShape(pptx.ShapeType.ellipse, {
            x: 3.4, y: 1.0, w: 3.2, h: 3.2,
            fill: { color: p.light }
        });

        s.addText(slide.title || "Conclusion", {
            x: 0.8, y: 0.55, w: 8.4, h: 0.8,
            fontSize: 30,
            bold: true,
            align: "center",
            color: p.dark
        });

        s.addText(message, {
            x: 1.3, y: 2.15, w: 7.4, h: 1.2,
            fontSize: 28,
            bold: true,
            align: "center",
            color: "1F2937"
        });

        s.addShape(pptx.ShapeType.rect, {
            x: 4.2, y: 3.55, w: 1.6, h: 0.08,
            fill: { color: p.primary }
        });

        if (assets && assets.bg) {
            s.addImage({
                path: assets.bg.path,
                x: 8.2, y: 4.55, w: 1.3, h: 0.9
            });
        }
    }
};
