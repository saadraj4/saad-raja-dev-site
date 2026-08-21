# Performance Guidelines

## Quick Reference: What to Avoid

### ❌ NEVER USE (Very Expensive):
```css
/* Backdrop filters - Forces GPU to process every pixel behind element */
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);

/* CSS filters on large elements */
filter: blur(20px);
filter: saturate(180%);

/* Background attachment fixed with gradients */
background: conic-gradient(...);
background-attachment: fixed;

/* Complex mask operations */
mask-composite: intersect;
-webkit-mask-composite: xor;
```

### ⚠️ USE SPARINGLY (Expensive):
```css
/* Multiple layered box-shadows */
box-shadow: 
  0 20px 40px rgba(0,0,0,0.1),
  0 8px 20px rgba(0,0,0,0.05),
  inset 0 1px 0 rgba(255,255,255,0.8);

/* Multiple background layers */
background: 
  radial-gradient(...),
  radial-gradient(...),
  linear-gradient(...);

/* Infinite animations on multiple elements */
animation: pulse 2s infinite;

/* Complex transforms in animations */
transform: translateY(-6px) scale(1.05) rotate(5deg);
```

### ✅ USE THESE INSTEAD (Fast):
```css
/* Simple single shadows */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

/* Solid or simple gradient backgrounds */
background: #FFFFFF;
background: linear-gradient(180deg, #FAFBFC 0%, #F0F4F8 100%);

/* Simple transforms (GPU accelerated) */
transform: translateY(-2px);
transform: scale(1.02);

/* Opacity transitions */
opacity: 0.8;
transition: opacity 0.2s ease;
```

## Performance Rules for New Features

### 1. **Animations**
- ✅ Duration: 0.2s - 0.5s (max)
- ✅ Use `transform` and `opacity` only
- ✅ Keep infinite animations to minimum
- ❌ Avoid animating `width`, `height`, `margin`, `padding`

### 2. **Box Shadows**
- ✅ Max blur radius: 12px
- ✅ Single shadow preferred
- ✅ Use rgba with low alpha for performance
- ❌ Avoid 3+ layered shadows

### 3. **Hover Effects**
- ✅ Use `transform: translateY(-2px)` for lift
- ✅ Simple color changes
- ✅ Max transition time: 0.3s
- ❌ No scale beyond 1.05
- ❌ No blur effects on hover

### 4. **Background Effects**
- ✅ Solid colors or simple gradients
- ✅ Max 2 gradient layers
- ❌ No `background-attachment: fixed` on body
- ❌ No complex radial/conic gradients

### 5. **Images**
- ✅ Always use Next.js Image component
- ✅ Provide width/height
- ✅ Use `loading="lazy"` for below-fold images
- ✅ Enable WebP/AVIF formats

### 6. **Framer Motion**
- ✅ Use `viewport={{ once: true }}` for scroll animations
- ✅ Keep animation distances small (20-30px max)
- ✅ Respect `useReducedMotion()`
- ❌ Don't animate everything on scroll

## Performance Testing Checklist

Before deploying new features:

```bash
# 1. Build and test production
npm run build
npm run start

# 2. Run Lighthouse audit (target: 85+)
# Open DevTools > Lighthouse > Performance

# 3. Check FPS while scrolling (target: 60fps)
# DevTools > Performance > Record > Scroll page

# 4. Check bundle size
# .next/static/chunks - should not grow significantly

# 5. Test on mobile/slower devices
# DevTools > Device Emulation > Throttle CPU 4x slowdown
```

## Quick Performance Wins

### Easy Wins (Do First):
1. Remove `backdrop-filter` → Use solid colors
2. Simplify box-shadows → Single shadow with small blur
3. Reduce animation duration → 0.4s max
4. Remove infinite animations → Or slow them down (8s+)
5. Optimize images → Use Next.js Image component

### Medium Wins:
1. Lazy load below-fold content
2. Reduce bundle size with dynamic imports
3. Optimize fonts (preload, subset)
4. Remove unused CSS
5. Minimize third-party scripts

### Advanced Wins:
1. Code splitting
2. Service worker caching
3. Preload critical resources
4. HTTP/3 and compression
5. CDN optimization

## Common Performance Issues

### Issue: Janky Scrolling
**Causes:**
- Too many scroll-triggered animations
- Heavy animations (blur, complex transforms)
- Large repaints

**Solutions:**
- Reduce scroll animations
- Use `transform` and `opacity` only
- Add `will-change` sparingly and remove after animation

### Issue: Slow Initial Load
**Causes:**
- Large bundle size
- Too many fonts
- Unoptimized images
- Synchronous scripts

**Solutions:**
- Dynamic imports for heavy components
- Subset fonts (latin only)
- Use WebP/AVIF images
- Defer non-critical scripts

### Issue: Laggy Hover Effects
**Causes:**
- Complex transitions
- Multiple property changes
- Heavy pseudo-elements

**Solutions:**
- Transition `transform` and `opacity` only
- Keep transitions under 0.3s
- Simplify pseudo-elements

## Browser DevTools Tips

### Chrome DevTools:
```
Performance Tab:
- Record while interacting with site
- Look for long tasks (>50ms)
- Check FPS meter
- Analyze paint operations

Lighthouse:
- Performance score target: 85+
- Check metrics: FCP, LCP, CLS, TTI
- Follow recommendations

Coverage Tab:
- Find unused CSS/JS
- Optimize bundle size
```

### Firefox DevTools:
```
Performance Tab:
- Waterfall view
- Check layout thrashing
- Monitor reflows

Network Tab:
- Check resource sizes
- Verify caching
- Check compression
```

## Performance Budget

Set limits for your project:

```javascript
// Example performance budget
{
  "FCP": "< 1.5s",
  "LCP": "< 2.5s",
  "TTI": "< 3.0s",
  "TBT": "< 200ms",
  "CLS": "< 0.1",
  
  "Bundle size": "< 200KB (gzipped)",
  "Images": "< 1MB total",
  "Fonts": "< 100KB",
  
  "Lighthouse Score": "> 85"
}
```

## Questions?

Ask yourself before adding effects:
1. Does this use `backdrop-filter` or `filter: blur()`? → Don't use
2. Will this animate on every scroll? → Minimize
3. Is this a complex gradient or shadow? → Simplify
4. Will this run infinitely? → Slow down or remove
5. Can this be achieved with simpler CSS? → Do it

---
**Remember**: Performance is a feature. Fast sites convert better, rank higher, and provide better UX.
