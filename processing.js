/**
 * Prabhas PPT Maker - Frontend Processing Engine v3.1
 * Pure JavaScript text processor for AI-generated content
 * No backend required - works entirely in browser
 */

// ============== HELPER FUNCTIONS ==============

function cleanMarkdown(text) {
    if (!text) return "";
    text = text.replace(/\*\*([^*]*)\*\*/g, '$1');
    text = text.replace(/__([^_]*)__/g, '$1');
    text = text.replace(/\*([^*]+)\*/g, '$1');
    text = text.replace(/_([^_]+)_/g, '$1');
    text = text.replace(/^#{1,6}\s*/gm, '');
    text = text.replace(/`([^`]+)`/g, '$1');
    text = text.replace(/^\*+\s*/g, '');
    text = text.replace(/\s*\*+$/g, '');
    text = text.replace(/\s+/g, ' ');
    return text.trim();
}

function isSkipLine(line) {
    const lineLower = line.trim().toLowerCase();

    if (!lineLower || lineLower === '---' || lineLower.startsWith('```')) return true;

    const labels = [
        'title:', 'content:', 'overview:', 'focus:', 'subtitle:',
        'definition:', 'causes:', 'effects:', 'conclusion:',
        'presented by:', 'date:', 'your name'
    ];
    if (labels.includes(lineLower.replace(/:$/, '') + ':')) return true;

    const skipPhrases = [
        'would you like', 'tell me your', 'if you want',
        "here's", 'here is', 'i can also', 'let me know',
        'sure', 'ready-to-copy', 'presentation-friendly',
        'slide 2,3,4', 'slide 2, 3, 4',
        'advanced technical', 'student seminar', 'real-world examples',
        'tell me your audience', 'your audience type',
        "i'll give you", 'ready-to-use', 'directly use it',
        'this structure is', 'just tell me'
    ];
    return skipPhrases.some(p => lineLower.includes(p));
}

function extractLabelContent(line) {
    let match = line.match(/\*\*([^*:]+):\*\*\s*(.+)/);
    if (match) {
        const label = match[1].trim().toLowerCase();
        const content = cleanMarkdown(match[2]);
        if (['title', 'main title'].includes(label)) return { type: 'title', content: content };
        if (['overview', 'focus', 'content', 'description', 'definition'].includes(label)) return { type: 'overview', content: content };
        if (label === 'conclusion') return { type: 'conclusion', content: content };
    }

    match = line.match(/\*\*([^*]+)\*\*:\s*(.+)/);
    if (match) {
        const label = match[1].trim().toLowerCase();
        const content = cleanMarkdown(match[2]);
        if (['title', 'main title'].includes(label)) return { type: 'title', content: content };
        if (['overview', 'focus', 'content'].includes(label)) return { type: 'overview', content: content };
    }

    match = line.match(/^([A-Za-z\s]+):\s*(.+)/);
    if (match) {
        const label = match[1].trim().toLowerCase();
        const content = cleanMarkdown(match[2]);
        if (['title', 'main title'].includes(label)) return { type: 'title', content: content };
        if (['overview', 'focus', 'content', 'definition'].includes(label)) return { type: 'overview', content: content };
        if (label === 'conclusion') return { type: 'conclusion', content: content };
    }

    return null;
}

function stripTitleHints(title) {
    if (!title) return title;
    return title
        .replace(/\s*\(\d+\s*points?\s*slide\)\s*/gi, '')
        .replace(/\s*\(single\s*line\s*slide\)\s*/gi, '')
        .replace(/\s*\(paragraph\s*slide\)\s*/gi, '')
        .replace(/\s*\(title\s*slide\)\s*/gi, '')
        .trim();
}

function parseSlideContent(contentText) {
    const lines = contentText.split('\n');
    let explicitTitle = null;
    let inferredTitle = null;
    let items = [];
    let overview = null;
    let conclusion = null;
    let currentSection = null;

    for (let rawLine of lines) {
        const line = rawLine.trim();
        const lineLower = line.toLowerCase();
        if (lineLower.includes('this structure is') || lineLower.includes('if you want, i can also')) {
            break;
        }
        if (isSkipLine(line)) continue;

        const labelData = extractLabelContent(line);
        if (labelData) {
            if (labelData.type === 'title') {
                explicitTitle = labelData.content;
                continue;
            }
            if (labelData.type === 'overview') {
                overview = labelData.content;
                continue;
            }
            if (labelData.type === 'conclusion') {
                conclusion = labelData.content;
                continue;
            }
        }

        const cleanLine = cleanMarkdown(line);
        const isSectionHeader = /:$/.test(cleanLine) &&
            cleanLine.length <= 60 &&
            !/^slide\s*\d*/i.test(cleanLine) &&
            !/^[\-\d]/.test(cleanLine);
        if (isSectionHeader) {
            currentSection = cleanLine.replace(/:$/, '').trim();
            continue;
        }

        const bulletMatch = line.match(/^[\-*\u2022\u25BA\u25AA\u25E6]\s*(.+)/u);
        if (bulletMatch) {
            const item = cleanMarkdown(bulletMatch[1]);
            if (item && item.length > 3 && !isSkipLine(item)) {
                items.push(currentSection ? (currentSection + ': ' + item) : item);
            }
            continue;
        }

        const numberedSubtitleMatch = cleanLine.match(/^(\d+)[.)]\s+(.+)$/);
        if (numberedSubtitleMatch) {
            const subtitleText = numberedSubtitleMatch[2].trim();
            const wordCount = subtitleText.split(/\s+/).length;
            const looksLikeSubtitle = subtitleText.length <= 80 && wordCount <= 10 && !/[;!?]$/.test(subtitleText);
            if (looksLikeSubtitle) {
                currentSection = subtitleText;
                continue;
            }
        }

        const numberedMatch = line.match(/^\d+[.)]\s*(.+)/);
        if (numberedMatch) {
            const item = cleanMarkdown(numberedMatch[1]);
            if (item && item.length > 3 && !isSkipLine(item)) {
                items.push(currentSection ? (currentSection + ': ' + item) : item);
            }
            continue;
        }
        if (cleanLine && cleanLine.length > 5 && !isSkipLine(cleanLine)) {
            if (!inferredTitle) inferredTitle = cleanLine;
            else if (cleanLine.length > 8) {
                items.push(currentSection ? (currentSection + ': ' + cleanLine) : cleanLine);
            }
        }
    }

    if (overview && overview.length > 10) items.unshift(overview);
    if (conclusion && conclusion.length > 10) items.push(conclusion);

    const title = stripTitleHints(explicitTitle || inferredTitle || '');
    return {
        title: title || null,
        hasExplicitTitle: !!explicitTitle,
        items: items.slice(0, 12)
    };
}

function extractKeywords(title, items) {
    const text = ((title || '') + ' ' + (items || []).slice(0, 4).join(' ')).toLowerCase();

    const stopWords = new Set([
        'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been',
        'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
        'could', 'should', 'may', 'might', 'must', 'shall', 'can',
        'and', 'or', 'but', 'if', 'then', 'else', 'when', 'where',
        'how', 'what', 'which', 'who', 'whom', 'this', 'that', 'these',
        'those', 'am', 'it', 'its', 'of', 'to', 'in', 'for', 'on',
        'with', 'at', 'by', 'from', 'as', 'into', 'through', 'during',
        'before', 'after', 'above', 'below', 'between', 'under', 'again',
        'further', 'once', 'here', 'there', 'all', 'each', 'few', 'more',
        'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only',
        'own', 'same', 'so', 'than', 'too', 'very', 'just', 'also',
        'slide', 'slides', 'title', 'topic', 'overview', 'introduction',
        'conclusion', 'summary', 'point', 'points', 'section', 'content'
    ]);

    const words = text.match(/\b[a-z][a-z0-9]{1,}\b/g) || [];
    const keywords = [];
    const seen = new Set();

    for (const word of words) {
        if (!stopWords.has(word) && !seen.has(word)) {
            keywords.push(word);
            seen.add(word);
            if (keywords.length >= 10) break;
        }
    }

    return keywords;
}

function extractIconKeywords(title, items, fallbackKeywords) {
    const titleLower = (title || '').toLowerCase().trim();
    const focused = extractKeywords(title, (items || []).slice(0, 2)).slice(0, 5);

    // Include the full title as a phrase keyword if it's 2-4 words (helps exact tag matching)
    const titleWords = titleLower.split(/\s+/).filter(w => w.length > 1);
    if (titleWords.length >= 2 && titleWords.length <= 4) {
        focused.unshift(titleLower);
    }

    if (focused.length) return focused;
    return (fallbackKeywords || []).slice(0, 5);
}

function hasExplicitDifferenceIntent(title, items) {
    const text = ((title || '') + ' ' + (items || []).join(' ')).toLowerCase();
    const hasAdvDis = /advantages?.*disadvantages?|disadvantages?.*advantages?/i.test(text);
    const hasProsCons = /\bpros?\b.*\bcons?\b|\bcons?\b.*\bpros?\b/i.test(text);
    const hasVsCompare = /\b(vs|versus|compare|comparison|difference)\b/i.test(text);
    return hasAdvDis || hasProsCons || hasVsCompare;
}

function detectContentType(title, items, slideIndex, totalSlides) {
    const titleLower = (title || '').toLowerCase();
    const itemCount = (items || []).length;

    if (slideIndex === 0) return 'title';

    const isLastSlide = slideIndex === totalSlides - 1;
    const hasConclusionKeyword = ['conclusion', 'summary', 'final', 'takeaway', 'closing', 'wrap up', 'outlook']
        .some(p => titleLower.includes(p));

    if (isLastSlide && hasConclusionKeyword) {
        const totalItemTextLength = (items || []).join(' ').length;
        return (itemCount <= 1 || totalItemTextLength <= 140) ? 'conclusion_single' : 'conclusion_multi';
    }

    if (['thank', 'question', 'q&a', 'contact'].some(p => titleLower.includes(p))) return 'thankyou';
    if (hasExplicitDifferenceIntent(title, items)) return 'difference';
    if (['introduction', 'overview', 'landscape', 'what is'].some(p => titleLower.includes(p))) return 'overview';
    if (['type', 'kind', 'category', 'classification'].some(p => titleLower.includes(p))) return 'grid';
    if (['step', 'process', 'how to', 'method'].some(p => titleLower.includes(p))) return 'process';
    if (['skill', 'feature', 'benefit', 'require', 'tip'].some(p => titleLower.includes(p))) return 'features';
    if (['company', 'recruiter', 'hire', 'top', 'major'].some(p => titleLower.includes(p))) return 'grid';
    if (['role', 'job', 'career', 'opportunit', 'position'].some(p => titleLower.includes(p))) return 'bullets';

    if (itemCount <= 1) return 'singleline';
    if (itemCount >= 6) return 'multipoint';
    if (itemCount === 0) return 'paragraph';
    if (itemCount <= 3) return 'features';
    if (itemCount <= 5) return 'bullets';
    return 'grid';
}

// ============== TEMPLATE SELECTION WITH RANDOMIZATION ==============

const TEMPLATE_POOLS = {
    title: ['HERO_IMAGE_TITLE', 'TITLE_SPLIT_BAND', 'TITLE_MINIMAL_ACCENT', 'TITLE_DUOTONE_FRAME'],
    thankyou: ['FULL_BG_TEXT_OVERLAY', 'TEXT_LEFT_IMAGE_RIGHT'],
    difference: ['DIFFERENCE_SPLIT_CHEVRON', 'PROS_CONS_BALANCE_CARDS', 'ADV_DISADV_TIMELINE', 'DIFFERENCE_DUAL_COLUMN_BANDS'],
    singleline: [
        'SINGLELINE_FOCUS_QUOTE', 'SINGLELINE_CENTER_STATEMENT', 'SINGLELINE_BANNER_IMAGE',
        'SINGLELINE_ACCENT_BLOCK', 'SINGLELINE_MINIMAL_FRAME'
    ],
    multipoint: [
        'MULTIPOINT_NUMBERED_PATH', 'MULTIPOINT_ICON_GRID', 'MULTIPOINT_STAGGERED_CARDS',
        'MULTIPOINT_LEFT_RAIL_LIST', 'MULTIPOINT_TWO_COLUMN_BULLETS'
    ],
    conclusion_single: ['CONCLUSION_SINGLE_SPOTLIGHT', 'CONCLUSION_SINGLE_QUOTE', 'CONCLUSION_SINGLE_METRIC'],
    conclusion_multi: ['CONCLUSION_MULTI_CHECKLIST', 'CONCLUSION_MULTI_PILLARS', 'CONCLUSION_MULTI_SUMMARY_GRID'],
    conclusion: [
        'CONCLUSION_SINGLE_SPOTLIGHT', 'CONCLUSION_SINGLE_QUOTE', 'CONCLUSION_SINGLE_METRIC',
        'CONCLUSION_MULTI_CHECKLIST', 'CONCLUSION_MULTI_PILLARS', 'CONCLUSION_MULTI_SUMMARY_GRID'
    ],
    overview: ['FULL_BG_TEXT_OVERLAY', 'TEXT_LEFT_IMAGE_RIGHT', 'IMAGE_LEFT_BULLETS_RIGHT'],
    paragraph: ['FULL_BG_TEXT_OVERLAY', 'TEXT_LEFT_IMAGE_RIGHT'],
    process: ['ZIGZAG_PROCESS_STEPS', 'PROCESS_VERTICAL_STACK', 'VALUE_CHAIN_FLOW'],
    features: ['SOLUTION_CARDS_GRID', 'LEFT_TITLE_FEATURE_CARDS', 'BLOG_CARDS_LAYOUT'],
    grid: ['GRID_REQUIREMENTS', 'INSTALLATION_STEPS_CARDS', 'BLOG_CARDS_LAYOUT'],
    bullets: ['IMAGE_LEFT_BULLETS_RIGHT', 'TEXT_LEFT_IMAGE_RIGHT', 'PROCESS_VERTICAL_STACK', 'LEFT_TITLE_FEATURE_CARDS']
};

function suggestTemplate(contentType) {
    const pool = TEMPLATE_POOLS[contentType] || TEMPLATE_POOLS.bullets;
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
}

function parseSlideHeaderLine(line) {
    if (!line) return null;
    let cleaned = line.trim();
    if (!cleaned) return null;

    cleaned = cleaned.replace(/^#{1,6}\s*/, '').replace(/\*\*/g, '').trim();

    // Strict rule: only lines that explicitly start with "Slide" create a new slide.
    // Accepts "Slide", "Slide 1", "Slide 1 - Title", and emoji prefixes before "Slide".
    let match = cleaned.match(/^((?:[\u{1F300}-\u{1FAFF}\u2600-\u27BF\uFE0F\u200D]+\s*)*)slide(?:\s*(\d{1,2}))?\s*[:\-\u2013\u2014]?\s*(.*)$/iu);
    if (match) {
        const emojiPrefix = (match[1] || '').trim();
        const headerText = cleanMarkdown(match[3] || '');
        const headerWithEmoji = (emojiPrefix ? (emojiPrefix + ' ') : '') + headerText;
        return {
            number: match[2] ? parseInt(match[2], 10) : null,
            header: headerWithEmoji.trim()
        };
    }

    return null;
}

// ============== MAIN PROCESSING FUNCTION ==============

function splitIntoSlides(text) {
    text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = text.split('\n');

    const slidesRaw = [];
    let currentSlide = null;

    for (const rawLine of lines) {
        const marker = parseSlideHeaderLine(rawLine);

        if (marker) {
            if (currentSlide) {
                slidesRaw.push({
                    number: currentSlide.number,
                    header: currentSlide.header,
                    content: currentSlide.lines.join('\n').trim()
                });
            }

            currentSlide = {
                number: marker.number,
                header: marker.header,
                lines: []
            };
            continue;
        }

        if (currentSlide) {
            currentSlide.lines.push(rawLine);
        }
    }

    if (currentSlide) {
        slidesRaw.push({
            number: currentSlide.number,
            header: currentSlide.header,
            content: currentSlide.lines.join('\n').trim()
        });
    }

    return slidesRaw.length ? slidesRaw : null;
}

/**
 * Main processing function - call this from index.html
 * @param {string} text - Raw AI-generated content
 * @returns {Object} - { slides: [...], error: string|null }
 */
function processContent(text) {
    text = text.trim();
    if (!text) {
        return { slides: [], error: 'No content provided' };
    }

    console.log('Processing content...', text.length, 'chars');

    const slidesRaw = splitIntoSlides(text);

    if (!slidesRaw || slidesRaw.length < 1) {
        console.log('No slide markers found');
        return {
            slides: [],
            error: "No slide structure found. Use explicit slide lines like 'Slide 1 - Title' or 'Slide - Title'."
        };
    }

    console.log('Found', slidesRaw.length, 'slides');

    const slides = [];
    for (let i = 0; i < slidesRaw.length && i < 20; i++) {
        const slideData = slidesRaw[i];
        const parsed = parseSlideContent(slideData.content || '');

        const headerTitle = stripTitleHints(cleanMarkdown(slideData.header || ''));
        let title = null;
        if (parsed.hasExplicitTitle && parsed.title) {
            title = parsed.title;
        } else if (headerTitle) {
            title = headerTitle;
        } else {
            title = parsed.title || ('Slide ' + (i + 1));
        }

        let items = parsed.items || [];
        if (!parsed.hasExplicitTitle && headerTitle && parsed.title) {
            const inferredLine = parsed.title.trim();
            const headerNorm = headerTitle.trim().toLowerCase();
            if (inferredLine && inferredLine.toLowerCase() !== headerNorm) {
                items = [inferredLine].concat(items);
            }
        }
        const contentType = detectContentType(title, items, i, slidesRaw.length);
        const suggestedTemplate = suggestTemplate(contentType);
        const keywords = extractKeywords(title, items);
        const iconKeywords = extractIconKeywords(title, items, keywords);

        slides.push({
            title: title.substring(0, 120),
            items: items,
            keywords: keywords,
            icon_keywords: iconKeywords,
            content_type: contentType,
            suggested_template: suggestedTemplate
        });

        console.log('Slide', slides.length, '|', title.substring(0, 40), '| items:', items.length, '|', suggestedTemplate);
    }

    return { slides: slides, error: null };
}

window.processContent = processContent;

console.log('Prabhas PPT - Processing Engine v3.1 Loaded');
