# Performance Testing Guide

## Quick Test (5 minutes)

### 1. Visual Smoothness Test
```bash
npm run dev
```

Then in your browser:
1. Open http://localhost:3000
2. **Scroll down slowly** - Should be smooth (60fps)
3. **Scroll quickly** - No lag or stuttering
4. **Hover over cards** - Instant response
5. **Hover over buttons** - Quick transitions
6. **Check animations** - Should feel snappy, not slow

**Expected**: Everything feels instant and smooth ✅

---

### 2. Chrome DevTools Performance Test

1. Open Chrome DevTools (F12)
2. Go to **Performance** tab
3. Click **Record** (⚫)
4. Scroll through the page for 5 seconds
5. Stop recording
6. Check the results:

**What to look for:**
- ✅ FPS meter: Should be mostly **green** (60fps)
- ✅ CPU usage: Should be **moderate** (not constant red)
- ✅ GPU usage: Should be **low to moderate**
- ❌ Red/yellow bars: Should be **minimal**

---

### 3. Lighthouse Audit

```bash
# First build production version
npm run build
npm run start
```

Then:
1. Open http://localhost:3000 in Chrome
2. Open DevTools (F12)
3. Go to **Lighthouse** tab
4. Select **Performance** only
5. Click **Analyze page load**

**Target Scores:**
- Performance: **85+** ✅
- First Contentful Paint: **< 1.5s** ✅
- Largest Contentful Paint: **< 2.5s** ✅
- Total Blocking Time: **< 300ms** ✅
- Cumulative Layout Shift: **< 0.1** ✅

---

## Detailed Performance Tests

### Test 1: Scroll Performance
**What to test**: Smooth scrolling without jank

**Steps:**
1. Open http://localhost:3000
2. Press F12 → Performance tab
3. Enable "Screenshots" and "Memory"
4. Click Record ⚫
5. Scroll from top to bottom slowly
6. Click Stop ⏹️

**What to check:**
- FPS graph should be mostly at 60fps (green)
- No long yellow/red bars during scrolling
- Frame timing should be consistent

**Pass criteria**: FPS stays above 50fps during scrolling ✅

---

### Test 2: Interaction Performance
**What to test**: Hover effects and transitions

**Steps:**
1. Open Performance tab
2. Click Record
3. Hover over 5-10 different cards/buttons
4. Stop recording

**What to check:**
- Each hover should complete in < 50ms
- No layout recalculations (yellow bars)
- Minimal style recalculation

**Pass criteria**: All interactions < 50ms ✅

---

### Test 3: Initial Load Performance
**What to test**: Page load speed

**Steps:**
1. Open Network tab
2. Check "Disable cache"
3. Refresh page (Ctrl+Shift+R)

**What to check:**
- Total page weight: < 2MB
- Number of requests: < 50
- DOMContentLoaded: < 2s
- Load event: < 3s

**Pass criteria**: Page fully loads in < 3s ✅

---

### Test 4: Memory Usage
**What to test**: No memory leaks

**Steps:**
1. Open Performance Monitor (Ctrl+Shift+P → "Performance Monitor")
2. Let page sit for 1 minute
3. Scroll up and down a few times
4. Check memory usage

**What to check:**
- JS Heap size: Should stabilize (not constantly growing)
- Nodes: Should stay relatively constant
- Event listeners: Should not keep increasing

**Pass criteria**: Memory stays stable ✅

---

### Test 5: Mobile Performance
**What to test**: Performance on slower devices

**Steps:**
1. Open DevTools
2. Click Device Toggle (Ctrl+Shift+M)
3. Select "iPhone 12" or similar
4. Go to Performance tab
5. Enable "CPU: 4x slowdown"
6. Record performance while scrolling

**What to check:**
- FPS should still be acceptable (> 30fps)
- Page should remain usable
- Interactions should work

**Pass criteria**: Still usable on 4x slowdown ✅

---

## Quick Comparison Checklist

### ✅ Signs of Good Performance:
- [ ] Scrolling is smooth and fluid
- [ ] Hover effects are instant
- [ ] No visible lag anywhere
- [ ] Page loads quickly
- [ ] Animations complete quickly
- [ ] No stuttering or jank
- [ ] Lighthouse score > 85

### ❌ Signs of Poor Performance:
- [ ] Stuttering when scrolling
- [ ] Delayed hover responses
- [ ] Visible lag on interactions
- [ ] Page takes > 3s to load
- [ ] Animations feel sluggish
- [ ] Lighthouse score < 70

---

## Browser Testing

Test in multiple browsers:

### Chrome/Edge (Chromium)
```bash
npm run dev
# Open http://localhost:3000
```
- Should be very smooth ✅

### Firefox
```bash
npm run dev
# Open http://localhost:3000 in Firefox
```
- Should be smooth ✅
- Might show slight differences in animation timing

### Safari (Mac only)
```bash
npm run dev
# Open http://localhost:3000 in Safari
```
- Should be smooth ✅
- Check that all effects still work

---

## Real-World Testing

### Desktop Testing:
1. Test on laptop (with/without power)
2. Test with multiple tabs open
3. Test with other apps running
4. Test with slower CPU/GPU

### Mobile Testing:
1. Test on actual phone (not just DevTools)
2. Test on 3G/4G network
3. Test in different browsers (Chrome, Safari)
4. Test on older devices

---

## Expected Results

### Before Optimization:
- ❌ FPS: 20-40fps during scroll
- ❌ Lighthouse: 60-70
- ❌ TTI: 4-5 seconds
- ❌ Hover delay: 100-200ms
- ❌ Feels laggy and unresponsive

### After Optimization:
- ✅ FPS: 55-60fps during scroll
- ✅ Lighthouse: 85-95
- ✅ TTI: 1.5-2.5 seconds
- ✅ Hover delay: < 50ms
- ✅ Feels fast and responsive

---

## Troubleshooting

### If performance is still poor:

1. **Check if you're in development mode**
   ```bash
   npm run build
   npm run start
   ```
   Production mode is much faster

2. **Clear browser cache**
   - Hard refresh: Ctrl+Shift+R

3. **Check browser extensions**
   - Test in incognito mode

4. **Check system resources**
   - Close other apps
   - Check if GPU acceleration is enabled

5. **Verify optimizations were applied**
   - Open `app/css/globals.scss`
   - Search for "backdrop-filter" → Should have 0 results
   - Search for "blur(" → Should be minimal

---

## Automated Testing (Optional)

### Install Lighthouse CI
```bash
npm install -g @lhci/cli
```

### Run automated test
```bash
npm run build
npm run start

# In another terminal:
lhci autorun --collect.url=http://localhost:3000
```

This will give you detailed performance metrics.

---

## Success Criteria Summary

Your optimization is successful if:
- ✅ Lighthouse Performance: **85+**
- ✅ Scroll FPS: **55-60fps**
- ✅ Hover response: **< 50ms**
- ✅ Initial load: **< 2s**
- ✅ Time to Interactive: **< 3s**
- ✅ No visible lag or jank
- ✅ Users perceive site as fast

---

## Report Issues

If you find any performance problems:
1. Note which section/component
2. Check Chrome DevTools Performance tab
3. Look for red/yellow bars
4. Check if backdrop-filter or blur was accidentally added
5. Review PERFORMANCE_GUIDELINES.md

---

**Remember**: The goal is for users to never think the site is "faulty" or slow. Every interaction should feel instant!

🎯 **Target**: Professional, fast, responsive website  
✅ **Status**: Optimization complete - Ready to test!
