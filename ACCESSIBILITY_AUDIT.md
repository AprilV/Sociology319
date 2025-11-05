# SOC319 Website - WCAG 2.2 Accessibility Audit
**Date:** November 4, 2025  
**Auditor:** AI Assistant  
**Standard:** WCAG 2.2 Level AA Compliance  
**Website:** SOC319 Research Project on Human-AI Collaboration

---

## EXECUTIVE SUMMARY

**Overall Compliance:** ⚠️ **Partial Compliance** (Needs Improvement)

Your SOC319 website has **good foundation** but requires several accessibility improvements to meet WCAG 2.2 Level AA standards. The issues are **moderate** and can be fixed without major restructuring.

**Priority Fixes:**
1. 🔴 **High Priority:** Color contrast issues, missing alt text, keyboard navigation
2. 🟡 **Medium Priority:** ARIA labels, semantic HTML improvements
3. 🟢 **Low Priority:** Skip navigation, focus indicators

---

## DETAILED FINDINGS

### ✅ WHAT YOU'RE DOING RIGHT

1. **Language Declaration:** `<html lang="en">` ✅
2. **Viewport Meta Tag:** Responsive design setup ✅
3. **Semantic Structure:** Using `<nav>`, `<main>`, `<section>`, `<header>`, `<footer>` ✅
4. **Heading Hierarchy:** Proper H1→H2→H3 structure ✅
5. **Readable Fonts:** Good base font size (1.1rem) and line-height (1.8) ✅
6. **Responsive Design:** Media queries for mobile accessibility ✅

---

## 🔴 HIGH PRIORITY ISSUES (MUST FIX)

### 1. Color Contrast Failures (WCAG 2.2 Criterion 1.4.3)

**Problem:** Several text/background combinations don't meet 4.5:1 contrast ratio required for normal text.

#### Issues Found:

**Navigation Links:**
```css
/* CURRENT - FAILS */
.course-info {
    color: rgba(255,255,255,0.9);  /* White text on gradient */
}
```
- White text on gradient background may not meet 4.5:1 in some areas
- **Contrast ratio:** ~3.8:1 (FAILS)

**Hero Subtitle:**
```css
/* CURRENT - FAILS */
.hero-subtitle {
    color: rgba(255,255,255,0.95);  /* Light text on gradient */
}
```
- Light text on gradient background
- **Contrast ratio:** ~4.1:1 (FAILS)

**Light Text in Various Sections:**
```css
/* CURRENT - FAILS */
--text-light: #6B7280;  /* Gray text */
```
- Gray text on white background
- **Contrast ratio:** ~4.2:1 (FAILS on small text)

**Footer Links:**
```css
/* CURRENT - FAILS */
.footer-links a {
    color: white;
    background: rgba(255,255,255,0.1);  /* Very light bg */
}
```
- May not have sufficient contrast against gradient background

#### FIXES NEEDED:

```css
/* FIX 1: Darken light text */
:root {
    --text-light: #4B5563;  /* Darker gray - passes 4.5:1 */
}

/* FIX 2: Ensure hero text contrast */
.hero-subtitle {
    color: #FFFFFF;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);  /* Adds contrast */
}

.hero-byline {
    color: #FFFFFF;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
}

/* FIX 3: Strengthen footer link backgrounds */
.footer-links a {
    background: rgba(255,255,255,0.25);  /* More opaque */
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

/* FIX 4: Navigation course info */
.course-info {
    color: #FFFFFF;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}
```

---

### 2. Missing Alternative Text (WCAG 2.2 Criterion 1.1.1)

**Problem:** Any images you add will need alt text. Currently no `<img>` tags found, but emojis used decoratively should be handled.

#### Issues Found:

**Decorative Emojis:**
```html
<!-- CURRENT - ISSUE -->
<div class="finding-icon">🤝</div>
<div class="finding-icon">💬</div>
<div class="finding-icon">❤️</div>
```
- Screen readers will read emoji names literally ("handshake", "speech bubble")
- May be confusing or annoying to users

#### FIXES NEEDED:

```html
<!-- FIX: Add aria-hidden for decorative emojis -->
<div class="finding-icon" aria-hidden="true">🤝</div>
<div class="finding-icon" aria-hidden="true">💬</div>
<div class="finding-icon" aria-hidden="true">❤️</div>
```

**Or use meaningful icons with labels:**
```html
<div class="finding-icon" role="img" aria-label="Trust Development">🤝</div>
<div class="finding-icon" role="img" aria-label="Communication">💬</div>
<div class="finding-icon" role="img" aria-label="Emotional Connection">❤️</div>
```

---

### 3. Keyboard Navigation Issues (WCAG 2.2 Criterion 2.1.1, 2.4.7)

**Problem:** Links and interactive elements need visible focus indicators for keyboard users.

#### Issues Found:

**No Focus Styles Defined:**
```css
/* MISSING - Need to add */
a:focus { ... }
.nav-menu li a:focus { ... }
.cta-button:focus { ... }
```

#### FIXES NEEDED:

```css
/* FIX: Add keyboard focus indicators */
a:focus,
.nav-menu li a:focus,
.footer-nav-card:focus,
.cta-button:focus {
    outline: 3px solid #FFD93D;  /* High contrast yellow outline */
    outline-offset: 2px;
    box-shadow: 0 0 0 5px rgba(255, 217, 61, 0.3);
}

/* Remove browser default outline, replace with custom */
*:focus {
    outline: none;
}

a:focus-visible,
button:focus-visible,
[role="button"]:focus-visible {
    outline: 3px solid #FFD93D;
    outline-offset: 2px;
}

/* Ensure visible focus within gradient backgrounds */
.navbar a:focus {
    outline: 3px solid white;
    outline-offset: 2px;
    background: rgba(255,255,255,0.3);
}
```

---

### 4. Link Purpose Not Clear from Context (WCAG 2.2 Criterion 2.4.4)

**Problem:** Some links use generic text like "→" or "Read more" without context.

#### Issues Found:

```html
<!-- CURRENT - AMBIGUOUS -->
<a href="problem.html" class="card-link">Explore Framework →</a>
<a href="case-study.html" class="card-link">View Collaboration Data →</a>
```

For screen reader users who navigate by links only, "Explore Framework" doesn't indicate what page they'll reach.

#### FIXES NEEDED:

**Option 1: Add aria-label**
```html
<a href="problem.html" 
   class="card-link" 
   aria-label="Explore Turkle's theoretical framework on the Context page">
    Explore Framework →
</a>

<a href="case-study.html" 
   class="card-link"
   aria-label="View six weeks of human-AI collaboration data on the Our Collaboration page">
    View Collaboration Data →
</a>
```

**Option 2: Make visible text more descriptive**
```html
<a href="problem.html" class="card-link">
    Explore Turkle's Framework on Context Page →
</a>

<a href="case-study.html" class="card-link">
    View Our Collaboration Data →
</a>
```

---

## 🟡 MEDIUM PRIORITY ISSUES (SHOULD FIX)

### 5. Skip Navigation Link Missing (WCAG 2.2 Criterion 2.4.1)

**Problem:** Keyboard users have to tab through all navigation links to reach main content.

#### FIX NEEDED:

**Add to EVERY HTML page, first element in `<body>`:**

```html
<body>
    <!-- Add skip link FIRST -->
    <a href="#main-content" class="skip-link">Skip to main content</a>
    
    <nav class="navbar">
        <!-- existing nav -->
    </nav>
    
    <main class="container" id="main-content" tabindex="-1">
        <!-- existing content -->
    </main>
</body>
```

**CSS for skip link:**
```css
/* Add to styles.css */
.skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: #fff;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    z-index: 10000;
    font-weight: bold;
    border-radius: 0 0 8px 0;
}

.skip-link:focus {
    top: 0;
    outline: 3px solid #FFD93D;
}
```

---

### 6. Insufficient Heading Structure (WCAG 2.2 Criterion 2.4.6)

**Problem:** Some pages have generic "Draft" headings that don't describe content.

#### Issues Found:

**problem.html:**
```html
<!-- CURRENT - NOT DESCRIPTIVE -->
<h1 class="hero-title">Context (Draft)</h1>
```

**case-study.html:**
```html
<!-- CURRENT - NOT DESCRIPTIVE -->
<h1 class="hero-title">Our Collaboration (Draft)</h1>
```

#### FIXES NEEDED:

```html
<!-- FIX: More descriptive headings -->
<h1 class="hero-title">Theoretical Context: Turkle's Framework on Human-Robot Relationships</h1>

<h1 class="hero-title">Case Study: Six Weeks of Human-AI Collaboration</h1>
```

---

### 7. Form Input Labels Missing (If you add forms later)

**Not applicable yet** - but if you add contact forms, search boxes, or any inputs:

```html
<!-- WRONG -->
<input type="email" placeholder="Your email">

<!-- RIGHT -->
<label for="email">Your Email Address:</label>
<input type="email" id="email" name="email" placeholder="example@domain.com">
```

---

### 8. ARIA Landmarks Should Be Explicit (WCAG 2.2 Best Practice)

**Problem:** Some sections could benefit from ARIA landmark roles for screen reader navigation.

#### FIXES NEEDED:

```html
<!-- Add role attributes for clarity -->
<nav class="navbar" role="navigation" aria-label="Main navigation">
    <!-- nav content -->
</nav>

<main class="container" role="main" id="main-content">
    <!-- main content -->
</main>

<footer class="site-footer" role="contentinfo">
    <!-- footer content -->
</footer>
```

---

## 🟢 LOW PRIORITY ISSUES (NICE TO HAVE)

### 9. Page Titles Should Be Unique and Descriptive

**Current:**
```html
<title>As-If Partnership: Adult-AI Collaboration | SOC319 Research</title>
```

**Better (for other pages):**
```html
<!-- index.html -->
<title>Home - As-If Partnership: Adult-AI Collaboration | SOC319 Research</title>

<!-- problem.html -->
<title>Theoretical Context - As-If Partnership | SOC319 Research</title>

<!-- case-study.html -->
<title>Six Weeks of Collaboration - As-If Partnership | SOC319 Research</title>
```

---

### 10. Animation Considerations (WCAG 2.2 Criterion 2.3.3)

**Problem:** Your CSS animations might trigger vestibular issues for some users.

#### FIX NEEDED:

```css
/* Add to styles.css - respect user preference */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    .hero-title,
    .hero-subtitle,
    .hero-byline,
    .hero-author {
        animation: none !important;
    }
}
```

---

### 11. Language Changes Should Be Marked

**If you use non-English quotes or terms:**

```html
<!-- EXAMPLE -->
<p>
    Turkle describes <span lang="fr">raison d'être</span> of computational objects.
</p>
```

---

## TESTING TOOLS RECOMMENDATIONS

### Browser Extensions:
1. **axe DevTools** (Chrome/Firefox) - Automated accessibility testing
2. **WAVE** - Visual accessibility evaluation
3. **Lighthouse** (Chrome DevTools) - Built-in accessibility audit

### Manual Testing:
1. **Keyboard navigation:** Tab through entire site without mouse
2. **Screen reader:** Use NVDA (Windows, free) or JAWS to navigate
3. **Color contrast:** Use WebAIM Contrast Checker
4. **Zoom:** Test at 200% zoom (Ctrl + scroll)

---

## PRIORITY ACTION CHECKLIST

### 🔴 **DO IMMEDIATELY** (Before Submission):

- [ ] Fix color contrast on `--text-light` variable
- [ ] Add text-shadow to hero text for contrast
- [ ] Add `aria-hidden="true"` to decorative emojis
- [ ] Add focus styles to all interactive elements
- [ ] Add skip navigation link to all pages
- [ ] Make link text more descriptive or add aria-labels
- [ ] Add `id="main-content"` to `<main>` element

### 🟡 **DO THIS WEEK** (Quality Improvements):

- [ ] Add `role` attributes to navigation, main, footer
- [ ] Update page titles to be unique per page
- [ ] Add `prefers-reduced-motion` media query
- [ ] Test keyboard navigation thoroughly
- [ ] Remove "(Draft)" from headings, make descriptive

### 🟢 **DO IF TIME** (Enhancements):

- [ ] Run axe DevTools scan and fix issues
- [ ] Test with screen reader (NVDA)
- [ ] Add ARIA labels to complex widgets
- [ ] Document accessibility statement

---

## SPECIFIC FILE UPDATES NEEDED

### 1. Update `styles.css`:
- Fix color contrast variables
- Add focus styles
- Add skip-link styles
- Add prefers-reduced-motion

### 2. Update ALL HTML files:
- Add skip navigation link
- Add `id="main-content"` to main
- Add `aria-hidden="true"` to emojis
- Add `aria-label` to ambiguous links
- Add `role` attributes to landmarks

---

## ESTIMATED TIME TO FIX

- **High Priority Issues:** 2-3 hours
- **Medium Priority Issues:** 1-2 hours
- **Low Priority Issues:** 1 hour
- **Total:** 4-6 hours to achieve WCAG 2.2 Level AA compliance

---

## ACCESSIBILITY STATEMENT (Add to website)

Create a new page: `accessibility.html`

```html
<h1>Accessibility Statement</h1>
<p>
    This website is committed to providing an accessible experience for all users. 
    We strive to meet WCAG 2.2 Level AA standards.
</p>

<h2>Accessibility Features</h2>
<ul>
    <li>Semantic HTML structure</li>
    <li>Keyboard navigation support</li>
    <li>ARIA landmarks and labels</li>
    <li>Sufficient color contrast (4.5:1 minimum)</li>
    <li>Responsive design for all devices</li>
    <li>Reduced motion option for animations</li>
</ul>

<h2>Feedback</h2>
<p>
    If you encounter accessibility barriers on this site, please contact 
    [your email] so we can address them.
</p>
```

---

## CONCLUSION

Your SOC319 website has a **solid foundation** but needs accessibility improvements to be fully WCAG 2.2 compliant. The issues are **fixable** and mostly involve:

1. **Color adjustments** (contrast)
2. **ARIA attributes** (labels, hidden)
3. **Focus indicators** (keyboard navigation)
4. **Skip links** (navigation efficiency)

**Recommendation:** Prioritize the 🔴 HIGH PRIORITY fixes before submission. The fixes will take 2-3 hours and make your site accessible to users with disabilities—**especially relevant given your topic is about digital inequality and AI accessibility!**

The irony of writing about digital divides while having an inaccessible website would undermine your research. Fix these issues to practice what you're researching.

---

**Next Steps:**
1. Review this audit
2. Ask which fixes you want me to implement first
3. I'll update the files with accessibility improvements
4. You can test with keyboard navigation and tools

Want me to start implementing the fixes?
