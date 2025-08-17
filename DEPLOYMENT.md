# Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Method 1: GitHub Integration (Recommended)

1. **Upload to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: FTMO Pro Robots landing page"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ftmo-pro-robots-landing.git
   git push -u origin main
   ```

2. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com) and sign up/login
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it as a static site
   - Click "Deploy"

### Method 2: Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd landing_page
   vercel --prod
   ```

### Method 3: Drag & Drop

1. Go to [vercel.com](https://vercel.com)
2. Drag and drop the entire `landing_page` folder
3. Vercel will automatically deploy it

## 🔧 Configuration

### Custom Domain Setup

1. **In Vercel Dashboard**:
   - Go to your project settings
   - Click "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update URLs**:
   - Replace `your-domain.vercel.app` with your actual domain in:
     - `index.html` (meta tags, structured data)
     - `sitemap.xml`
     - `robots.txt`

### Environment Variables

If you need to add environment variables:
1. Go to Project Settings → Environment Variables
2. Add your variables (e.g., analytics IDs)

### Analytics Setup

1. **Google Analytics**:
   - Replace `GA_TRACKING_ID` in `index.html` with your actual tracking ID
   - Example: `gtag('config', 'G-XXXXXXXXXX');`

2. **Facebook Pixel**:
   - Replace `YOUR_PIXEL_ID` in `index.html` with your actual pixel ID
   - Example: `fbq('init', '1234567890123456');`

## 🎯 Post-Deployment Checklist

### SEO & Analytics
- [ ] Update Google Analytics tracking ID
- [ ] Update Facebook Pixel ID
- [ ] Submit sitemap to Google Search Console
- [ ] Verify meta tags with Facebook Debugger
- [ ] Test structured data with Google Rich Results Test

### Performance
- [ ] Test page speed with Google PageSpeed Insights
- [ ] Verify mobile responsiveness
- [ ] Check all images load correctly
- [ ] Test all CTA buttons and links

### Functionality
- [ ] Test FAQ accordion
- [ ] Verify countdown timer works
- [ ] Check exit-intent popup
- [ ] Test form submissions (if any)
- [ ] Verify all external links work

## 🔍 Monitoring

### Vercel Analytics
- Enable Vercel Analytics in your dashboard for performance monitoring
- View real-time visitor data and performance metrics

### Custom Analytics
- The landing page includes conversion tracking
- Monitor funnel performance through the built-in tracking system
- A/B test different headlines and CTAs

## 🛠️ Maintenance

### Regular Updates
- Update product prices and features as needed
- Refresh testimonials and success metrics
- Keep countdown timer relevant
- Update copyright year annually

### Performance Optimization
- Optimize images if needed
- Monitor Core Web Vitals
- Update dependencies if any are added

## 📞 Support

### Vercel Support
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

### Custom Development
- All source code is included and well-commented
- Modify styles in `styles.css`
- Update content in `index.html`
- Add functionality in `script.js`

---

**Your FTMO landing page is now ready for professional deployment on Vercel! 🎉**

