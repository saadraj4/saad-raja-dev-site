# Quick Color Change Guide

Want to change the portfolio color scheme? It's now super simple!

## 📍 Location
File: `app/css/globals.scss`  
Section: Lines 1-50 (`:root` block)

## 🎨 Quick Swap Templates

### Current: Modern Tech Blue (Professional)
```scss
--primary: #2563EB;           /* Blue */
--primary-hover: #1D4ED8;
--primary-light: #3B82F6;
--secondary: #8B5CF6;         /* Violet */
--accent: #0EA5E9;            /* Sky */
```

---

### Option 1: Creative Purple
```scss
--primary: #8B5CF6;           /* Violet */
--primary-hover: #7C3AED;
--primary-light: #A78BFA;
--secondary: #EC4899;         /* Pink */
--accent: #06B6D4;            /* Cyan */
```
**Best for:** Creative agencies, startups, modern tech

---

### Option 2: Growth Green
```scss
--primary: #059669;           /* Emerald */
--primary-hover: #047857;
--primary-light: #10B981;
--secondary: #0EA5E9;         /* Sky */
--accent: #3B82F6;            /* Blue */
```
**Best for:** Fintech, healthtech, sustainable tech

---

### Option 3: Bold Orange
```scss
--primary: #F97316;           /* Orange */
--primary-hover: #EA580C;
--primary-light: #FB923C;
--secondary: #3B82F6;         /* Blue */
--accent: #8B5CF6;            /* Violet */
```
**Best for:** Personal brand, bold positioning

---

### Option 4: Classic Red (Original)
```scss
--primary: #DC2626;           /* Red */
--primary-hover: #B91C1C;
--primary-light: #EF4444;
--secondary: #3B82F6;         /* Blue */
--accent: #06B6D4;            /* Cyan */
```
**Best for:** Energy, passion, bold statements

---

### Option 5: Elegant Slate
```scss
--primary: #475569;           /* Slate */
--primary-hover: #334155;
--primary-light: #64748B;
--secondary: #3B82F6;         /* Blue */
--accent: #0EA5E9;            /* Sky */
```
**Best for:** Minimalist, elegant, understated

---

## 🚀 How to Change

1. Open `app/css/globals.scss`
2. Find the `:root` section (lines 1-50)
3. Replace the `--primary`, `--secondary`, and `--accent` values
4. Save the file
5. Refresh browser - done! ✨

## 🎯 Pro Tips

**Keep it simple:**
- Change only `--primary`, `--secondary`, and `--accent`
- Leave semantic colors (success, error, warning, info) as they are
- Don't touch neutral colors (bg, ink, muted, line)

**Test contrast:**
- Use Chrome DevTools → Check contrast ratio
- Must be at least 4.5:1 for text
- Must be at least 3:1 for interactive elements

**Save your experiments:**
- Create a `color-experiments.txt` file
- Save each variant you try
- Easy to switch back later

## 🎨 Custom Colors

Want to use your own colors?

1. Pick your color from [Tailwind Colors](https://tailwindcss.com/docs/customizing-colors)
2. Find the hex codes (e.g., Blue 600 = #2563EB)
3. Replace in the template above
4. Done!

**Example with Rose:**
```scss
--primary: #E11D48;           /* Rose 600 */
--primary-hover: #BE123C;     /* Rose 700 */
--primary-light: #F43F5E;     /* Rose 500 */
--secondary: #8B5CF6;         /* Keep Violet */
--accent: #0EA5E9;            /* Keep Sky */
```

## 🔄 Quick Revert

Made a mistake? Revert to the last working version:

```bash
git checkout HEAD -- app/css/globals.scss
```

Or use `Ctrl+Z` (Undo) in your editor immediately after saving.

## ✅ Checklist After Changing

- [ ] Refresh browser (hard refresh: `Ctrl+Shift+R`)
- [ ] Scroll through entire site
- [ ] Check buttons are readable
- [ ] Test hover effects
- [ ] Verify dark sections still readable
- [ ] Check navbar looks good

## 📸 Preview Colors Before Committing

Can't decide? Try this:

1. Open Chrome DevTools (F12)
2. Go to "Elements" tab
3. Find `:root` in the styles
4. Click on a color value
5. Use color picker to experiment
6. When you like it, copy the hex code to your file

---

**Current Scheme:** Modern Tech Blue  
**Last Updated:** Aug 20, 2026  
**Difficulty:** ⭐ Super Easy (5 min change)
