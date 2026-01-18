/************************************************************
  THEMES
*************************************************************/
window.PPT_THEMES = {
  loan_lms: {
    name: "Loan / LMS",
    fontFace: "Calibri",
    colors: {
      black: "111827",
      blue: "4472C4",
      lightBox: "EEF2F7",
      orange: "F57C00",
      card: "F3F4F6",
      white: "FFFFFF",
      gray: "6B7280"
    }
  }
};

/************************************************************
  ✅ TEMPLATES registry (ADD NEW templates here)
*************************************************************/
window.TEMPLATES = {
  // 1) image-1 : Title + 1-point slides
  TITLE_PHOTO_BAR: {
    id: "TITLE_PHOTO_BAR",
    name: "Title Photo + Bottom White Bar",
    build: tpl_titlePhotoBar
  },

  // 2) image-2 : <=3 points but long sentences
  LONG_3POINTS: {
    id: "LONG_3POINTS",
    name: "3 points long sentences layout",
    build: tpl_long3Points
  },

  // 3) image-3 : <=5 points and each <=5 words
  THREE_FEATURE_BLOCKS: {
    id: "THREE_FEATURE_BLOCKS",
    name: "3 Feature blocks",
    build: tpl_threeFeatureBlocks
  },

  // 4) image-4 : 4-6 normal single line bullets
  FEATURE_CARDS_RIGHT: {
    id: "FEATURE_CARDS_RIGHT",
    name: "Feature cards right",
    build: tpl_featureCardsRight
  },

  // 5) image-5 : medium/heavy bullets normal
  IMAGE_LEFT_TEXT_RIGHT: {
    id: "IMAGE_LEFT_TEXT_RIGHT",
    name: "Image left text right",
    build: tpl_imageLeftTextRight
  },

  // 6) image-6 : >5 points each <=5 words
  REQUIREMENTS_GRID_RIGHT: {
    id: "REQUIREMENTS_GRID_RIGHT",
    name: "Requirement grid right",
    build: tpl_requirementsGridRight
  },

  // 7) image-7 : heavy paragraph slides
  OVERLAY_PARAGRAPH: {
    id: "OVERLAY_PARAGRAPH",
    name: "Full bg overlay paragraph",
    build: tpl_overlayParagraph
  },

  // 8) image-8 : points >5 words and >3 points
  APPLY_LOAN_LEFT_IMAGE: {
    id: "APPLY_LOAN_LEFT_IMAGE",
    name: "Apply loan left image",
    build: tpl_applyLoanLeftImage
  },

  // 9) image-9 : no rules random
  PROCESS_STACK: {
    id: "PROCESS_STACK",
    name: "Process stack",
    build: tpl_processStack
  }
};

/************************************************************
  TEMPLATE 1 (Image-1)
*************************************************************/
function tpl_titlePhotoBar(pptx, theme, slide, assets) {
  const s = pptx.addSlide();

  if (assets?.bg) s.addImage({ data: assets.bg, x: 0, y: 0, w: 10, h: 3.35 });
  else s.background = { fill: theme.colors.white };

  s.addShape(pptx.ShapeType.rect, {
    x: 0, y: 3.35, w: 10, h: 2.275,
    fill: { color: theme.colors.white },
    line: { color: theme.colors.white }
  });

  s.addText(slide.title || "", {
    x: 0.7, y: 4.05, w: 8.0, h: 0.8,
    fontFace: theme.fontFace, fontSize: 34,
    bold: true, color: theme.colors.black
  });

  const tagline = slide.items?.[0] || slide.subtitle || "";
  if (tagline) {
    s.addText(tagline, {
      x: 6.8, y: 4.25, w: 3.0, h: 0.5,
      fontFace: theme.fontFace,
      fontSize: 14,
      color: theme.colors.gray,
      align: "right"
    });
  }

  if (slide.footerLines?.length) {
    s.addText(slide.footerLines.join("\n"), {
      x: 0.75, y: 4.75, w: 8.5, h: 0.8,
      fontFace: theme.fontFace,
      fontSize: 12,
      color: theme.colors.gray
    });
  }
}

/************************************************************
  TEMPLATE 2 (Image-2) <=3 points long sentences
*************************************************************/
function tpl_long3Points(pptx, theme, slide, assets) {
  const s = pptx.addSlide();
  s.background = { fill: theme.colors.white };

  // left title
  s.addText(slide.title || "", {
    x: 0.8, y: 0.7, w: 4.7, h: 0.8,
    fontFace: theme.fontFace, fontSize: 30,
    bold: true, color: theme.colors.black
  });

  // right image
  if (assets?.bg) {
    s.addImage({ data: assets.bg, x: 5.3, y: 0, w: 4.7, h: 5.625 });
  } else {
    s.addShape(pptx.ShapeType.rect, {
      x: 5.3, y: 0, w: 4.7, h: 5.625,
      fill: { color: theme.colors.card }, line: { color: theme.colors.card }
    });
  }

  // bullets
  const bullets = (slide.items || []).slice(0, 3).join("\n");
  s.addText(bullets, {
    x: 0.9, y: 1.7, w: 4.3, h: 3.6,
    fontFace: theme.fontFace,
    fontSize: 17,
    color: theme.colors.black,
    bullet: true,
    paraSpaceAfter: 10
  });
}

/************************************************************
  TEMPLATE 3 (Image-3) Feature Blocks
*************************************************************/
function tpl_threeFeatureBlocks(pptx, theme, slide) {
  const s = pptx.addSlide();
  s.background = { fill: theme.colors.white };

  s.addText(slide.title || "", {
    x: 0.7, y: 0.6, w: 9.0, h: 0.8,
    fontFace: theme.fontFace,
    fontSize: 30, bold: true,
    align: "center", color: theme.colors.black
  });

  const items = (slide.items || []).slice(0, 3);
  const boxW = 2.7, boxH = 1.35;
  const y = 2.6;
  const xs = [1.0, 3.65, 6.3];

  items.forEach((txt, i) => {
    s.addShape(pptx.ShapeType.roundRect, {
      x: xs[i] - 0.4, y: y - 0.35,
      w: boxW, h: boxH,
      fill: { color: theme.colors.blue },
      line: { color: theme.colors.blue }
    });

    s.addShape(pptx.ShapeType.roundRect, {
      x: xs[i], y,
      w: boxW, h: boxH,
      fill: { color: theme.colors.lightBox },
      line: { color: theme.colors.blue }
    });

    s.addText(txt, {
      x: xs[i] + 0.15,
      y: y + 0.25,
      w: boxW - 0.3, h: boxH - 0.3,
      fontFace: theme.fontFace,
      fontSize: 18,
      align: "center", valign: "mid",
      color: theme.colors.black
    });
  });
}

/************************************************************
  TEMPLATE 4 (Image-4) Feature Cards right
*************************************************************/
function tpl_featureCardsRight(pptx, theme, slide, assets) {
  const s = pptx.addSlide();
  s.background = { fill: theme.colors.white };

  s.addText(slide.title || "", {
    x: 0.7, y: 1.0, w: 3.6, h: 2.5,
    fontFace: theme.fontFace,
    fontSize: 32, bold: true,
    color: theme.colors.black
  });

  const items = (slide.items || []).slice(0, 3);
  let y = 0.8;

  items.forEach((txt, i) => {
    s.addShape(pptx.ShapeType.roundRect, {
      x: 4.3, y, w: 5.4, h: 1.2,
      fill: { color: theme.colors.card },
      line: { color: theme.colors.card }
    });

    const icon = assets?.icons?.[i];
    if (icon) s.addImage({ data: icon, x: 4.6, y: y + 0.28, w: 0.55, h: 0.55 });

    s.addText(txt, {
      x: 5.3, y: y + 0.32, w: 4.2, h: 0.6,
      fontFace: theme.fontFace,
      fontSize: 18,
      color: theme.colors.black
    });

    y += 1.55;
  });
}

/************************************************************
  TEMPLATE 5 (Image-5) Normal Image Left + Text Right
*************************************************************/
function tpl_imageLeftTextRight(pptx, theme, slide, assets) {
  const s = pptx.addSlide();
  s.background = { fill: theme.colors.white };

  if (assets?.bg) s.addImage({ data: assets.bg, x: 0, y: 0, w: 5, h: 5.625 });
  else s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 5, h: 5.625, fill: { color: theme.colors.card } });

  s.addShape(pptx.ShapeType.rect, {
    x: 5, y: 0, w: 5, h: 5.625,
    fill: { color: theme.colors.white }, line: { color: theme.colors.white }
  });

  s.addText(slide.title || "", {
    x: 5.5, y: 0.9, w: 4.2, h: 0.7,
    fontFace: theme.fontFace,
    fontSize: 30, bold: true,
    color: theme.colors.black
  });

  s.addText((slide.items || []).slice(0, 10).join("\n"), {
    x: 5.5, y: 1.8, w: 4.2, h: 3.6,
    fontFace: theme.fontFace,
    fontSize: 15,
    color: theme.colors.black,
    bullet: true,
    paraSpaceAfter: 8
  });
}

/************************************************************
  TEMPLATE 6 (Image-6) Grid right
*************************************************************/
function tpl_requirementsGridRight(pptx, theme, slide) {
  const s = pptx.addSlide();
  s.background = { fill: theme.colors.white };

  s.addText(slide.title || "", {
    x: 0.8, y: 1.0, w: 3.2, h: 2.8,
    fontFace: theme.fontFace,
    fontSize: 34, bold: true,
    color: theme.colors.black
  });

  const items = (slide.items || []).slice(0, 11);
  const colors = ["F57C00", "9CA3AF", "D19A00", "5FA0E0", "6BAA3B"];

  const startX = 4.1, startY = 0.9;
  const boxW = 1.6, boxH = 0.86, gapX = 0.28, gapY = 0.22;

  items.forEach((txt, idx) => {
    const row = Math.floor(idx / 3);
    const col = idx % 3;
    const x = startX + col * (boxW + gapX);
    const y = startY + row * (boxH + gapY);
    const fill = colors[idx % colors.length];

    s.addShape(pptx.ShapeType.rect, {
      x, y, w: boxW, h: boxH,
      fill: { color: fill },
      line: { color: fill }
    });

    s.addText(txt, {
      x: x + 0.08, y: y + 0.18,
      w: boxW - 0.16, h: boxH - 0.12,
      fontFace: theme.fontFace,
      fontSize: 10,
      color: "FFFFFF",
      align: "center", valign: "mid"
    });
  });
}

/************************************************************
  TEMPLATE 7 (Image-7) Paragraph overlay
*************************************************************/
function tpl_overlayParagraph(pptx, theme, slide, assets) {
  const s = pptx.addSlide();

  if (assets?.bg) s.addImage({ data: assets.bg, x: 0, y: 0, w: 10, h: 5.625 });
  else s.background = { fill: theme.colors.card };

  // white overlay card
  s.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 0.7, w: 6.3, h: 4.3,
    fill: { color: "FFFFFF", transparency: 30 },
    line: { color: "FFFFFF", transparency: 100 }
  });

  s.addText(slide.title || "", {
    x: 0.9, y: 1.0, w: 5.7, h: 0.8,
    fontFace: theme.fontFace,
    fontSize: 34,
    bold: true,
    color: theme.colors.black
  });

  s.addText((slide.items || []).slice(0, 6).join("\n"), {
    x: 1.0, y: 2.0, w: 5.6, h: 2.8,
    fontFace: theme.fontFace,
    fontSize: 16,
    color: theme.colors.black,
    bullet: true,
    paraSpaceAfter: 8
  });
}

/************************************************************
  TEMPLATE 8 (Image-8) Apply loan layout
  ✅ Image RIGHT, Text LEFT
*************************************************************/
function tpl_applyLoanLeftImage(pptx, theme, slide, assets) {
  const s = pptx.addSlide();

  // ✅ Right side image
  if (assets?.bg) {
    s.addImage({ data: assets.bg, x: 5.0, y: 0, w: 5.0, h: 5.625 });
  } else {
    s.addShape(pptx.ShapeType.rect, {
      x: 5.0, y: 0, w: 5.0, h: 5.625,
      fill: { color: theme.colors.card },
      line: { color: theme.colors.card }
    });
  }

  // ✅ Left side white panel
  s.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 5.0, h: 5.625,
    fill: { color: "FFFFFF" },
    line: { color: "FFFFFF" }
  });

  // ✅ Title (LEFT)
  s.addText(slide.title || "", {
    x: 0.55, y: 0.8, w: 4.4, h: 0.8,
    fontFace: theme.fontFace,
    fontSize: 30,
    bold: true,
    color: theme.colors.black
  });

  // ✅ Bullets (LEFT)
  s.addText((slide.items || []).slice(0, 12).join("\n"), {
    x: 0.65, y: 1.65, w: 4.25, h: 3.8,
    fontFace: theme.fontFace,
    fontSize: 14,
    color: theme.colors.black,
    bullet: true,
    paraSpaceAfter: 8
  });
}

/************************************************************
  TEMPLATE 9 (Image-9) Process stack
*************************************************************/
function tpl_processStack(pptx, theme, slide) {
  const s = pptx.addSlide();
  s.background = { fill: theme.colors.white };

  s.addText(slide.title || "", {
    x: 0.7, y: 0.8, w: 3.0, h: 1.5,
    fontFace: theme.fontFace,
    fontSize: 34, bold: true,
    color: theme.colors.black
  });

  const items = (slide.items || []).slice(0, 6);
  const colors = ["F57C00", "E07B39", "C67A5E", "B99090", "A9A9A9", "9CA3AF"];

  let y = 0.6;
  items.forEach((txt, i) => {
    s.addShape(pptx.ShapeType.roundRect, {
      x: 4.1, y, w: 5.5, h: 0.75,
      fill: { color: colors[i % colors.length] },
      line: { color: colors[i % colors.length] }
    });

    s.addText(txt, {
      x: 4.35, y: y + 0.12, w: 5.0, h: 0.6,
      fontFace: theme.fontFace,
      fontSize: 22,
      color: "FFFFFF"
    });

    y += 0.88;
  });
}

window.TEMPLATES = TEMPLATES;
window.PPT_THEMES = PPT_THEMES;
