// Template names
var TEMPLATE_LIST = [
    'HERO_IMAGE_TITLE', 'LEFT_TITLE_FEATURE_CARDS', 'PROCESS_VERTICAL_STACK',
    'IMAGE_LEFT_BULLETS_RIGHT', 'GRID_REQUIREMENTS', 'FULL_BG_TEXT_OVERLAY',
    'VALUE_CHAIN_FLOW', 'TEXT_LEFT_IMAGE_RIGHT', 'SOLUTION_CARDS_GRID',
    'BLOG_CARDS_LAYOUT', 'INSTALLATION_STEPS_CARDS', 'ZIGZAG_PROCESS_STEPS',
    'TEXT_LEFT_IMAGE_RIGHT_ALT', 'TITLE_SPLIT_BAND', 'TITLE_MINIMAL_ACCENT',
    'TITLE_DUOTONE_FRAME', 'CONCLUSION_SINGLE_SPOTLIGHT', 'CONCLUSION_SINGLE_QUOTE',
    'CONCLUSION_SINGLE_METRIC', 'CONCLUSION_MULTI_CHECKLIST', 'CONCLUSION_MULTI_PILLARS',
    'CONCLUSION_MULTI_SUMMARY_GRID', 'DIFFERENCE_SPLIT_CHEVRON', 'PROS_CONS_BALANCE_CARDS',
    'ADV_DISADV_TIMELINE', 'DIFFERENCE_DUAL_COLUMN_BANDS', 'SINGLELINE_FOCUS_QUOTE',
    'SINGLELINE_CENTER_STATEMENT', 'SINGLELINE_BANNER_IMAGE', 'SINGLELINE_ACCENT_BLOCK',
    'SINGLELINE_MINIMAL_FRAME', 'MULTIPOINT_NUMBERED_PATH', 'MULTIPOINT_ICON_GRID',
    'MULTIPOINT_STAGGERED_CARDS', 'MULTIPOINT_LEFT_RAIL_LIST', 'MULTIPOINT_TWO_COLUMN_BULLETS'
];

// Track used templates
var templateTracker = {};

function resetTemplates() {
    templateTracker = {};
}

function pickTemplate(slide, idx) {
    var suggested = slide.suggested_template || null;
    var contentType = slide.content_type || 'bullets';
    var itemCount = (slide.items || []).length;
    if (idx === 0) contentType = 'title';
    if (!slide.content_type) {
        if (itemCount <= 1) contentType = 'singleline';
        else if (itemCount >= 6) contentType = 'multipoint';
    }

    // Content type to template mapping (matches backend rules)
    var typeTemplates = {
        'title': ['HERO_IMAGE_TITLE', 'TITLE_SPLIT_BAND', 'TITLE_MINIMAL_ACCENT', 'TITLE_DUOTONE_FRAME'],
        'thankyou': ['FULL_BG_TEXT_OVERLAY', 'HERO_IMAGE_TITLE'],
        'difference': ['DIFFERENCE_SPLIT_CHEVRON', 'PROS_CONS_BALANCE_CARDS', 'ADV_DISADV_TIMELINE', 'DIFFERENCE_DUAL_COLUMN_BANDS'],
        'singleline': [
            'SINGLELINE_FOCUS_QUOTE', 'SINGLELINE_CENTER_STATEMENT', 'SINGLELINE_BANNER_IMAGE',
            'SINGLELINE_ACCENT_BLOCK', 'SINGLELINE_MINIMAL_FRAME'
        ],
        'multipoint': [
            'MULTIPOINT_NUMBERED_PATH', 'MULTIPOINT_ICON_GRID', 'MULTIPOINT_STAGGERED_CARDS',
            'MULTIPOINT_LEFT_RAIL_LIST', 'MULTIPOINT_TWO_COLUMN_BULLETS'
        ],
        'conclusion_single': ['CONCLUSION_SINGLE_SPOTLIGHT', 'CONCLUSION_SINGLE_QUOTE', 'CONCLUSION_SINGLE_METRIC'],
        'conclusion_multi': ['CONCLUSION_MULTI_CHECKLIST', 'CONCLUSION_MULTI_PILLARS', 'CONCLUSION_MULTI_SUMMARY_GRID'],
        'conclusion': [
            'CONCLUSION_SINGLE_SPOTLIGHT', 'CONCLUSION_SINGLE_QUOTE', 'CONCLUSION_SINGLE_METRIC',
            'CONCLUSION_MULTI_CHECKLIST', 'CONCLUSION_MULTI_PILLARS', 'CONCLUSION_MULTI_SUMMARY_GRID'
        ],
        'agenda': ['PROCESS_VERTICAL_STACK', 'VALUE_CHAIN_FLOW'],
        'process': ['PROCESS_VERTICAL_STACK', 'ZIGZAG_PROCESS_STEPS', 'VALUE_CHAIN_FLOW'],
        'features': ['LEFT_TITLE_FEATURE_CARDS', 'SOLUTION_CARDS_GRID', 'TEXT_LEFT_IMAGE_RIGHT'],
        'grid': ['GRID_REQUIREMENTS', 'INSTALLATION_STEPS_CARDS', 'BLOG_CARDS_LAYOUT'],
        'comparison': ['VALUE_CHAIN_FLOW', 'SOLUTION_CARDS_GRID', 'GRID_REQUIREMENTS'],
        'cards': ['SOLUTION_CARDS_GRID', 'LEFT_TITLE_FEATURE_CARDS', 'BLOG_CARDS_LAYOUT'],
        'bullets': ['IMAGE_LEFT_BULLETS_RIGHT', 'TEXT_LEFT_IMAGE_RIGHT', 'PROCESS_VERTICAL_STACK'],
        'paragraph': ['FULL_BG_TEXT_OVERLAY', 'IMAGE_LEFT_BULLETS_RIGHT', 'TEXT_LEFT_IMAGE_RIGHT'],
        'textimage': ['TEXT_LEFT_IMAGE_RIGHT', 'IMAGE_LEFT_BULLETS_RIGHT', 'LEFT_TITLE_FEATURE_CARDS']
    };

    // Get templates for this content type
    var options = typeTemplates[contentType] || typeTemplates['bullets'];

    // Try to use suggested template first if not used
    if (suggested && !templateTracker[suggested] && AI_TEMPLATES[suggested]) {
        templateTracker[suggested] = true;
        console.log('  Using suggested:', suggested, 'for type:', contentType);
        return AI_TEMPLATES[suggested];
    }

    // Find unused template from options
    for (var i = 0; i < options.length; i++) {
        var name = options[i];
        if (!templateTracker[name] && AI_TEMPLATES[name]) {
            templateTracker[name] = true;
            console.log('  Using option:', name, 'for type:', contentType);
            return AI_TEMPLATES[name];
        }
    }

    // Reset if running low on templates
    var usedCount = Object.keys(templateTracker).length;
    if (usedCount >= TEMPLATE_LIST.length - 2) {
        templateTracker = {};
    }

    // Any unused from full list
    for (var j = 0; j < TEMPLATE_LIST.length; j++) {
        var n = TEMPLATE_LIST[j];
        if (!templateTracker[n] && AI_TEMPLATES[n]) {
            templateTracker[n] = true;
            return AI_TEMPLATES[n];
        }
    }

    return AI_TEMPLATES.TEXT_LEFT_IMAGE_RIGHT;
}

function showStatus(msg, type) {
    var el = document.getElementById('status');
    if (el) {
        el.textContent = msg;
        el.className = 'status ' + type;
    }
}

function normalizeIconKeywords(keywords) {
    if (!Array.isArray(keywords)) return [];
    var seen = {};
    var result = [];
    for (var i = 0; i < keywords.length; i++) {
        var k = String(keywords[i] || '').toLowerCase().trim();
        if (!k || seen[k]) continue;
        seen[k] = true;
        result.push(k);
    }
    return result;
}

function pptTagMatchesKeyword(tag, keyword) {
    var t = String(tag || '').toLowerCase().trim();
    var k = String(keyword || '').toLowerCase().trim();
    if (!t || !k) return false;
    // Exact full match is always valid
    if (t === k) return true;
    var tagWords = t.split(/[\s_-]+/);
    var keyWords = k.split(/[\s_-]+/);
    // Helper: check if two words match (exact or prefix with min 4 chars)
    function wordsMatch(w1, w2) {
        if (w1 === w2) return true;
        if (w1.length >= 4 && w2.length >= 4) {
            return w1.indexOf(w2) === 0 || w2.indexOf(w1) === 0;
        }
        return false;
    }
    // All keyword words must find a matching tag word
    var allKeyInTag = true;
    var keyCount = 0;
    for (var i = 0; i < keyWords.length; i++) {
        if (keyWords[i].length < 3) continue;
        keyCount++;
        var found = false;
        for (var j = 0; j < tagWords.length; j++) {
            if (wordsMatch(tagWords[j], keyWords[i])) { found = true; break; }
        }
        if (!found) { allKeyInTag = false; break; }
    }
    if (allKeyInTag && keyCount > 0) return true;
    // Or all tag words must find a matching keyword word
    var allTagInKey = true;
    var tagCount = 0;
    for (var j = 0; j < tagWords.length; j++) {
        if (tagWords[j].length < 3) continue;
        tagCount++;
        var found = false;
        for (var i = 0; i < keyWords.length; i++) {
            if (wordsMatch(tagWords[j], keyWords[i])) { found = true; break; }
        }
        if (!found) { allTagInKey = false; break; }
    }
    return allTagInKey && tagCount > 0;
}

function isIconMatched(icon, keywords) {
    if (!icon || !icon.tags || !icon.tags.length || !keywords || !keywords.length) return false;
    for (var i = 0; i < keywords.length; i++) {
        for (var j = 0; j < icon.tags.length; j++) {
            if (pptTagMatchesKeyword(icon.tags[j], keywords[i])) return true;
        }
    }
    return false;
}

function filterMatchedIcons(icons, keywords) {
    if (!Array.isArray(icons) || !icons.length) return [];
    if (!keywords || !keywords.length) return icons;
    var matched = [];
    for (var i = 0; i < icons.length; i++) {
        if (isIconMatched(icons[i], keywords)) {
            matched.push(icons[i]);
        }
    }
    return matched.length ? matched : [];
}

// ========== ANIMATED BACKGROUND (Blue Gradient + White Arcs) ==========
(function initBackground() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const coordsEl = document.getElementById('coordsDisplay');

    let width, height;
    let arcs = [];
    let time = 0;
    let gradientOffset = 0;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initArcs();
    }

    function initArcs() {
        arcs = [];
        // Create 4 thin arc lines for a cleaner look
        for (let i = 0; i < 4; i++) {
            arcs.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: 100 + Math.random() * 300,
                startAngle: Math.random() * Math.PI * 2,
                speed: 0.002 + Math.random() * 0.005,
                lineWidth: 1 + Math.random() * 1.5,
                direction: Math.random() > 0.5 ? 1 : -1,
                // Coordinate label for this arc
                showCoord: Math.random() > 0.5,
                coordValue: (Math.random() * 2 - 1).toFixed(2)
            });
        }
    }

    function draw() {
        time += 0.015;
        gradientOffset = (gradientOffset + 0.002) % 1;

        // Draw blue/cyan gradient background
        const gradient = ctx.createLinearGradient(
            width * (0.3 + Math.sin(time * 0.2) * 0.2), 0,
            width * (0.7 + Math.cos(time * 0.15) * 0.3), height
        );
        gradient.addColorStop(0, '#3b82f6');      // Blue
        gradient.addColorStop(0.3, '#38bdf8');    // Sky blue
        gradient.addColorStop(0.6, '#67e8f9');    // Cyan
        gradient.addColorStop(0.8, '#a78bfa');    // Purple hint
        gradient.addColorStop(1, '#60a5fa');      // Light blue

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Draw white thin arcs
        arcs.forEach((arc, i) => {
            arc.startAngle += arc.speed * arc.direction;

            // Slow movement
            arc.x += Math.sin(time * 0.5 + i) * 0.15;
            arc.y += Math.cos(time * 0.3 + i * 0.7) * 0.15;

            // Wrap around
            if (arc.x < -arc.radius) arc.x = width + arc.radius;
            if (arc.x > width + arc.radius) arc.x = -arc.radius;
            if (arc.y < -arc.radius) arc.y = height + arc.radius;
            if (arc.y > height + arc.radius) arc.y = -arc.radius;

            // Draw white thin arc
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = arc.lineWidth;
            ctx.beginPath();
            ctx.arc(arc.x, arc.y, arc.radius, arc.startAngle, arc.startAngle + Math.PI * 0.7);
            ctx.stroke();

            // Draw coordinate label at arc end
            if (arc.showCoord) {
                const endX = arc.x + Math.cos(arc.startAngle + Math.PI * 0.35) * arc.radius;
                const endY = arc.y + Math.sin(arc.startAngle + Math.PI * 0.35) * arc.radius;

                // Update coord value slowly
                arc.coordValue = (Math.sin(time + i * 2) * 0.99).toFixed(2);

                ctx.font = '12px Courier New';
                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.fillText(arc.coordValue, endX + 5, endY);
            }
        });

        // Also draw some straight thin lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
            const y = height * (0.2 + i * 0.3) + Math.sin(time + i) * 20;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y + Math.sin(time * 2) * 30);
            ctx.stroke();
        }

        // Update main coords display
        if (coordsEl) {
            const coord1 = (Math.sin(time) * 0.99).toFixed(2);
            coordsEl.textContent = `${coord1}`;
        }

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();
})();

// ========== WELCOME ALERT ==========
window.addEventListener('load', function () {
    setTimeout(function () {
        var msg = 'Welcome to Prabhas PPT Maker!' + '\n\n' +
            'Paste AI-generated content in this format:' + '\n\n' +
            'Slide 1 - Title' + '\n' +
            '- Point one' + '\n' +
            '- Point two' + '\n\n' +
            'Slide 2 - Content' + '\n' +
            '- Point one' + '\n' +
            '- Point two' + '\n\n' +
            'Supported formats:' + '\n' +
            'Slide 1: Title' + '\n' +
            'Slide 1 - Title' + '\n' +
            '## Slide 1: Title';
        alert(msg);
    }, 500);
});

// ========== GENERATE PPT (Frontend-Only) ==========
document.getElementById('generateBtn').onclick = async function () {
    var btn = this;
    var text = document.getElementById('inputText').value;

    if (!text.trim()) {
        alert('Please enter some content!');
        return;
    }

    try {
        btn.disabled = true;
        showStatus('🔍 Analyzing content...', 'loading');

        // Use frontend processing (no backend needed!)
        var data = window.processContent(text);

        if (data.error) {
            throw new Error(data.error);
        }

        console.log('Processed:', data.slides.length, 'slides');

        if (!data.slides || data.slides.length === 0) {
            throw new Error('No slides detected. Make sure content has "Slide 1:", "Slide 2:", etc.');
        }

        showStatus('🎨 Creating ' + data.slides.length + ' slides...', 'loading');

        // Reset tracking
        if (window.resetAssetTracking) resetAssetTracking();
        if (window.resetColors) resetColors();
        resetTemplates();

        var pptx = new PptxGenJS();
        pptx.layout = 'LAYOUT_16x9';

        for (var i = 0; i < data.slides.length; i++) {
            var slide = data.slides[i];
            var template = pickTemplate(slide, i);

            console.log('Slide ' + (i + 1) + ': ' + slide.title + ' -> ' + template.name);

            // Handle missing assets gracefully
            var bg = null;
            var icons = [];

            if (window.getBackgroundImage) {
                bg = getBackgroundImage(slide.keywords || []);
            }

            if (window.getIcons) {
                var iconKeywords = normalizeIconKeywords(slide.icon_keywords || (slide.keywords || []).slice(0, 3));
                icons = getIcons(iconKeywords, 4, 'slide-' + i);

                // If getIcons returned no good matches, try with full keywords
                if (!icons.length && slide.keywords && slide.keywords.length) {
                    var fallbackKeywords = normalizeIconKeywords(slide.keywords);
                    icons = getIcons(fallbackKeywords, 4, 'slide-' + i + '-fallback');
                }
            }

            template.build(pptx, slide, {
                bg: bg,
                icons: icons
            });
        }
        showStatus('📥 Generating file...', 'loading');

        // Generate as blob and download
        var pptxBlob = await pptx.write({ outputType: 'blob' });

        showStatus('✅ Done! ' + data.slides.length + ' slides created.', 'success');
        downloadBlobFile(pptxBlob, 'Prabhas_Presentation.pptx');

    } catch (err) {
        console.error('Error:', err);
        showStatus('❌ ' + err.message, 'error');
    } finally {
        btn.disabled = false;
    }
};

function downloadBlobFile(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
