/**
 * TEMPLATE 2: FEATURE CARDS
 * Left title with right-side gray rounded cards with icons
 */
window.AI_TEMPLATES = window.AI_TEMPLATES || {};
window.AI_TEMPLATES.LEFT_TITLE_FEATURE_CARDS = {
    name: "Feature Cards",

    build: function (pptx, slide, assets) {
        const s = pptx.addSlide();

        s.background = { fill: "FFFFFF" };

        // Title on left (bold, black)
        s.addText(slide.title || "", {
            x: 0.4, y: 0.8, w: 3.2, h: 1.8,
            fontSize: 28,
            bold: true,
            color: "1F2937"
        });

        // Feature cards on right (gray background, rounded)
        const items = (slide.items || []).slice(0, 4);
        let y = 0.5;

        items.forEach((text, i) => {
            // Gray rounded card
            s.addShape(pptx.ShapeType.roundRect, {
                x: 3.8, y: y, w: 5.9, h: 1.1,
                fill: { color: "F3F4F6" }
            });

            // Icon placeholder (orange/gray icon)
            if (assets?.icons?.[i]) {
                s.addImage({
                    path: assets.icons[i].path,
                    x: 4.1, y: y + 0.25, w: 0.6, h: 0.6
                });
            } else {
                // Default icon placeholder
                s.addShape(pptx.ShapeType.ellipse, {
                    x: 4.1, y: y + 0.25, w: 0.6, h: 0.6,
                    fill: { color: "F59E0B" }
                });
            }

            // Text content
            s.addText(text, {
                x: 5.0, y: y + 0.3, w: 4.5, h: 0.5,
                fontSize: 14,
                color: "374151"
            });

            y += 1.25;
        });
    }
};
