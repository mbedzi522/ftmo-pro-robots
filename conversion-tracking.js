// Advanced Conversion Tracking and Funnel Optimization
(function() {
    'use strict';
    
    // Conversion tracking configuration
    const ConversionTracker = {
        // Track user journey through the funnel
        funnelSteps: {
            'page_load': 'Page Loaded',
            'hero_view': 'Hero Section Viewed',
            'problem_view': 'Problem Section Viewed',
            'solution_view': 'Solution Section Viewed',
            'products_view': 'Products Section Viewed',
            'cta_click': 'CTA Button Clicked',
            'external_link': 'External Link Clicked'
        },
        
        // Initialize tracking
        init: function() {
            this.trackPageLoad();
            this.setupScrollTracking();
            this.setupCTATracking();
            this.setupHeatmapTracking();
            this.setupExitIntentTracking();
            this.setupFormTracking();
        },
        
        // Track page load and initial engagement
        trackPageLoad: function() {
            const startTime = performance.now();
            
            window.addEventListener('load', () => {
                const loadTime = performance.now() - startTime;
                this.trackEvent('Performance', 'Page Load Time', Math.round(loadTime));
                this.trackEvent('Funnel', 'Step', 'page_load');
                
                // Track traffic source
                const referrer = document.referrer;
                const utmSource = this.getURLParameter('utm_source');
                const utmMedium = this.getURLParameter('utm_medium');
                const utmCampaign = this.getURLParameter('utm_campaign');
                
                if (utmSource) {
                    this.trackEvent('Traffic', 'UTM Source', utmSource);
                }
                if (utmMedium) {
                    this.trackEvent('Traffic', 'UTM Medium', utmMedium);
                }
                if (utmCampaign) {
                    this.trackEvent('Traffic', 'UTM Campaign', utmCampaign);
                }
                if (referrer) {
                    this.trackEvent('Traffic', 'Referrer', referrer);
                }
            });
        },
        
        // Setup scroll-based funnel tracking
        setupScrollTracking: function() {
            const sections = [
                { element: '.hero', step: 'hero_view' },
                { element: '.problem', step: 'problem_view' },
                { element: '.solution', step: 'solution_view' },
                { element: '.products', step: 'products_view' }
            ];
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const section = sections.find(s => entry.target.matches(s.element));
                        if (section) {
                            this.trackEvent('Funnel', 'Step', section.step);
                            this.trackEvent('Engagement', 'Section Viewed', section.element);
                        }
                    }
                });
            }, { threshold: 0.5 });
            
            sections.forEach(section => {
                const element = document.querySelector(section.element);
                if (element) {
                    observer.observe(element);
                }
            });
        },
        
        // Track CTA button clicks and conversions
        setupCTATracking: function() {
            const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
            
            ctaButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const buttonText = button.textContent.trim();
                    const buttonLocation = this.getElementLocation(button);
                    const isExternalLink = button.href && button.href.includes('mql5.com');
                    
                    this.trackEvent('CTA', 'Click', buttonText);
                    this.trackEvent('CTA', 'Location', buttonLocation);
                    
                    if (isExternalLink) {
                        this.trackEvent('Conversion', 'External Link Click', buttonText);
                        this.trackEvent('Funnel', 'Step', 'external_link');
                        
                        // Track as potential conversion
                        this.trackConversion('cta_click', {
                            button_text: buttonText,
                            button_location: buttonLocation,
                            timestamp: new Date().toISOString()
                        });
                    }
                });
            });
        },
        
        // Setup heatmap-style click tracking
        setupHeatmapTracking: function() {
            document.addEventListener('click', (e) => {
                const x = e.clientX;
                const y = e.clientY;
                const element = e.target;
                const elementType = element.tagName.toLowerCase();
                const elementClass = element.className;
                
                this.trackEvent('Heatmap', 'Click', `${elementType}.${elementClass}`, {
                    x: x,
                    y: y,
                    viewport_width: window.innerWidth,
                    viewport_height: window.innerHeight
                });
            });
        },
        
        // Track exit intent to show retention popup
        setupExitIntentTracking: function() {
            let exitIntentShown = false;
            
            document.addEventListener('mouseleave', (e) => {
                if (e.clientY <= 0 && !exitIntentShown) {
                    exitIntentShown = true;
                    this.trackEvent('Engagement', 'Exit Intent', 'Mouse Leave');
                    this.showExitIntentPopup();
                }
            });
            
            // Track time on page
            let timeOnPage = 0;
            const timeTracker = setInterval(() => {
                timeOnPage += 10;
                if (timeOnPage % 60 === 0) { // Every minute
                    this.trackEvent('Engagement', 'Time on Page', `${timeOnPage}s`);
                }
            }, 10000);
            
            window.addEventListener('beforeunload', () => {
                clearInterval(timeTracker);
                this.trackEvent('Engagement', 'Total Time on Page', `${timeOnPage}s`);
            });
        },
        
        // Setup form tracking (for future contact forms)
        setupFormTracking: function() {
            const forms = document.querySelectorAll('form');
            
            forms.forEach(form => {
                // Track form starts
                const inputs = form.querySelectorAll('input, textarea, select');
                inputs.forEach(input => {
                    input.addEventListener('focus', () => {
                        this.trackEvent('Form', 'Start', form.id || 'unnamed_form');
                    }, { once: true });
                });
                
                // Track form submissions
                form.addEventListener('submit', (e) => {
                    this.trackEvent('Form', 'Submit', form.id || 'unnamed_form');
                    this.trackConversion('form_submit', {
                        form_id: form.id,
                        timestamp: new Date().toISOString()
                    });
                });
            });
        },
        
        // Show exit intent popup to retain visitors
        showExitIntentPopup: function() {
            // Create exit intent popup
            const popup = document.createElement('div');
            popup.className = 'exit-intent-popup';
            popup.innerHTML = `
                <div class="popup-overlay">
                    <div class="popup-content">
                        <button class="popup-close">&times;</button>
                        <h3>Wait! Don't Miss Out!</h3>
                        <p>Get a <strong>FREE bonus indicator</strong> worth $70 with any purchase today!</p>
                        <div class="popup-cta">
                            <a href="https://www.mql5.com/en/users/mbedzimz1/seller" class="btn-primary" target="_blank">
                                Claim Your Bonus Now
                            </a>
                        </div>
                    </div>
                </div>
            `;
            
            // Add popup styles
            const style = document.createElement('style');
            style.textContent = `
                .exit-intent-popup {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10000;
                    animation: fadeIn 0.3s ease;
                }
                .popup-overlay {
                    background: rgba(0, 0, 0, 0.8);
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .popup-content {
                    background: linear-gradient(135deg, #0a0e27, #1a1f3a);
                    padding: 2rem;
                    border-radius: 12px;
                    border: 2px solid #f59e0b;
                    max-width: 400px;
                    text-align: center;
                    position: relative;
                    color: white;
                }
                .popup-close {
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: #f59e0b;
                    cursor: pointer;
                }
                .popup-content h3 {
                    color: #f59e0b;
                    margin-bottom: 1rem;
                }
                .popup-cta {
                    margin-top: 1.5rem;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            
            document.head.appendChild(style);
            document.body.appendChild(popup);
            
            // Handle popup close
            const closeBtn = popup.querySelector('.popup-close');
            const overlay = popup.querySelector('.popup-overlay');
            
            const closePopup = () => {
                popup.remove();
                style.remove();
                this.trackEvent('Exit Intent', 'Popup Closed', 'User Action');
            };
            
            closeBtn.addEventListener('click', closePopup);
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    closePopup();
                }
            });
            
            // Track popup CTA clicks
            const popupCTA = popup.querySelector('.btn-primary');
            popupCTA.addEventListener('click', () => {
                this.trackEvent('Exit Intent', 'CTA Click', 'Bonus Claim');
                this.trackConversion('exit_intent_conversion', {
                    action: 'bonus_claim',
                    timestamp: new Date().toISOString()
                });
            });
            
            this.trackEvent('Exit Intent', 'Popup Shown', 'Mouse Leave');
        },
        
        // Track conversions with detailed data
        trackConversion: function(type, data) {
            const conversion = {
                type: type,
                timestamp: new Date().toISOString(),
                url: window.location.href,
                referrer: document.referrer,
                user_agent: navigator.userAgent,
                screen_resolution: `${screen.width}x${screen.height}`,
                viewport_size: `${window.innerWidth}x${window.innerHeight}`,
                ...data
            };
            
            // Store conversion data (could be sent to analytics service)
            this.storeConversion(conversion);
            this.trackEvent('Conversion', type, JSON.stringify(data));
        },
        
        // Store conversion data locally and send to server
        storeConversion: function(conversion) {
            // Store in localStorage
            const conversions = JSON.parse(localStorage.getItem('conversions') || '[]');
            conversions.push(conversion);
            localStorage.setItem('conversions', JSON.stringify(conversions));
            
            // Send to analytics service (placeholder)
            this.sendToAnalytics(conversion);
        },
        
        // Send data to analytics service
        sendToAnalytics: function(data) {
            // Placeholder for Google Analytics, Facebook Pixel, etc.
            console.log('Analytics Event:', data);
            
            // Example: Send to Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', data.type, {
                    event_category: 'Conversion',
                    event_label: JSON.stringify(data),
                    value: 1
                });
            }
            
            // Example: Send to Facebook Pixel
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', data);
            }
        },
        
        // Generic event tracking
        trackEvent: function(category, action, label, data) {
            const event = {
                category: category,
                action: action,
                label: label,
                timestamp: new Date().toISOString(),
                data: data
            };
            
            console.log('Event Tracked:', event);
            
            // Send to analytics services
            if (typeof gtag !== 'undefined') {
                gtag('event', action, {
                    event_category: category,
                    event_label: label,
                    custom_parameter: data
                });
            }
        },
        
        // Utility functions
        getURLParameter: function(name) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(name);
        },
        
        getElementLocation: function(element) {
            const rect = element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (rect.top < window.innerHeight * 0.3) {
                return 'top';
            } else if (rect.top < window.innerHeight * 0.7) {
                return 'middle';
            } else {
                return 'bottom';
            }
        }
    };
    
    // A/B Testing Framework
    const ABTesting = {
        tests: {
            'hero_headline': {
                variants: [
                    'Pass Your FTMO Challenge with Proven Forex Robots',
                    'Guaranteed FTMO Success with 85% Pass Rate',
                    'Stop Failing FTMO Challenges - Use Our Proven System'
                ],
                element: '.hero-title'
            },
            'cta_button_text': {
                variants: [
                    'Get Your Passing Robot Now',
                    'Start Passing Challenges Today',
                    'Secure Your Funded Account'
                ],
                element: '.hero .btn-primary'
            }
        },
        
        init: function() {
            Object.keys(this.tests).forEach(testName => {
                this.runTest(testName);
            });
        },
        
        runTest: function(testName) {
            const test = this.tests[testName];
            const variant = this.getVariant(testName);
            const element = document.querySelector(test.element);
            
            if (element && test.variants[variant]) {
                element.textContent = test.variants[variant];
                ConversionTracker.trackEvent('AB Test', testName, `Variant ${variant}`);
            }
        },
        
        getVariant: function(testName) {
            // Use consistent variant based on user session
            const userId = this.getUserId();
            const hash = this.hashCode(userId + testName);
            const test = this.tests[testName];
            return Math.abs(hash) % test.variants.length;
        },
        
        getUserId: function() {
            let userId = localStorage.getItem('user_id');
            if (!userId) {
                userId = 'user_' + Math.random().toString(36).substr(2, 9);
                localStorage.setItem('user_id', userId);
            }
            return userId;
        },
        
        hashCode: function(str) {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash; // Convert to 32-bit integer
            }
            return hash;
        }
    };
    
    // Personalization Engine
    const Personalization = {
        init: function() {
            this.detectUserBehavior();
            this.personalizeContent();
            this.setupDynamicPricing();
        },
        
        detectUserBehavior: function() {
            // Track user behavior patterns
            const behavior = {
                scroll_speed: 0,
                time_on_sections: {},
                click_patterns: [],
                return_visitor: this.isReturnVisitor()
            };
            
            // Store behavior data
            localStorage.setItem('user_behavior', JSON.stringify(behavior));
        },
        
        personalizeContent: function() {
            const behavior = JSON.parse(localStorage.getItem('user_behavior') || '{}');
            
            if (behavior.return_visitor) {
                this.showReturnVisitorMessage();
            }
            
            // Personalize based on traffic source
            const utmSource = ConversionTracker.getURLParameter('utm_source');
            if (utmSource === 'facebook') {
                this.personalizeForSocialTraffic();
            } else if (utmSource === 'google') {
                this.personalizeForSearchTraffic();
            }
        },
        
        showReturnVisitorMessage: function() {
            const heroSubtitle = document.querySelector('.hero-subtitle');
            if (heroSubtitle) {
                heroSubtitle.textContent = 'Welcome back! Ready to finally pass your FTMO challenge? Join the traders who chose success over struggle.';
            }
        },
        
        personalizeForSocialTraffic: function() {
            // Add social proof emphasis
            const socialProof = document.querySelector('.social-proof .section-title');
            if (socialProof) {
                socialProof.innerHTML = 'Join Your Fellow Traders Who <span class="highlight">Chose Success</span>';
            }
        },
        
        personalizeForSearchTraffic: function() {
            // Emphasize search-relevant content
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                heroTitle.innerHTML = 'The #1 <span class="highlight">FTMO Passing Solution</span> Traders Search For';
            }
        },
        
        setupDynamicPricing: function() {
            // Show urgency-based pricing
            const priceElements = document.querySelectorAll('.price-current');
            priceElements.forEach(price => {
                const originalPrice = price.textContent;
                const discountBadge = document.createElement('span');
                discountBadge.className = 'discount-badge';
                discountBadge.textContent = 'LIMITED TIME';
                discountBadge.style.cssText = `
                    background: #ef4444;
                    color: white;
                    padding: 2px 8px;
                    border-radius: 4px;
                    font-size: 0.7rem;
                    margin-left: 8px;
                    animation: pulse 2s infinite;
                `;
                price.appendChild(discountBadge);
            });
        },
        
        isReturnVisitor: function() {
            const visited = localStorage.getItem('visited_before');
            if (!visited) {
                localStorage.setItem('visited_before', 'true');
                return false;
            }
            return true;
        }
    };
    
    // Initialize all tracking and optimization systems
    document.addEventListener('DOMContentLoaded', function() {
        ConversionTracker.init();
        ABTesting.init();
        Personalization.init();
        
        // Track initial page view
        ConversionTracker.trackEvent('Page', 'View', window.location.pathname);
    });
    
})();

