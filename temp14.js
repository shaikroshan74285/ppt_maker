/**
 * TEMPLATE 14: TITLE SPLIT BAND
 * Bold title slide with top color band and clean subtitle area
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.TITLE_SPLIT_BAND = {
    name: "Title Split Band",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();
        const p = getNextPalette();

        s.background = { fill: "FFFFFF" };

        s.addShape(pptx.ShapeType.rect, {
            x: 0, y: 0, w: 10, h: 2.2,
            fill: { color: p.primary }
        });

        s.addText(slide.title || "Presentation", {
            x: 0.7, y: 0.6, w: 8.6, h: 1.1,
            fontSize: 42,
            bold: true,
            color: "FFFFFF"
        });

        const subtitle = (slide.items && slide.items[0]) ? slide.items[0] : "Prepared for your audience";
        s.addText(subtitle, {
            x: 0.8, y: 2.65, w: 5.2, h: 0.9,
            fontSize: 18,
            color: "374151"
        });

        s.addShape(pptx.ShapeType.roundRect, {
            x: 0.8, y: 3.75, w: 2.4, h: 0.45,
            fill: { color: p.light }
        });
        s.addText("Professional Deck", {
            x: 1.05, y: 3.86, w: 2, h: 0.25,
            fontSize: 11,
            bold: true,
            color: p.dark
        });

        if (assets && assets.bg) {
            s.addImage({
                path: assets.bg.path,
                x: 6.1, y: 2.35, w: 3.5, h: 2.6
            });
            s.addShape(pptx.ShapeType.rect, {
                x: 6.1, y: 4.75, w: 3.5, h: 0.2,
                fill: { color: p.secondary }
            });
        } else {
            s.addShape(pptx.ShapeType.roundRect, {
                x: 6.1, y: 2.35, w: 3.5, h: 2.6,
                fill: { color: p.light },
                line: { color: p.accent, width: 1.5 }
            });
            s.addShape(pptx.ShapeType.ellipse, {
                x: 7.3, y: 3.2, w: 1.1, h: 1.1,
                fill: { color: p.secondary, transparency: 20 }
            });
        }
    }
};
