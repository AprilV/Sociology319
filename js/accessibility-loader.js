/**
 * Accessibility Settings Loader
 * Loads and applies user accessibility preferences from localStorage on every page
 */

(function() {
    'use strict';
    
    /**
     * Stop all SVG animations when reduce motion is enabled
     */
    function stopSVGAnimations() {
        // Find all SVG animate elements
        const animateElements = document.querySelectorAll('svg animate, svg animateTransform, svg animateMotion');
        animateElements.forEach(element => {
            element.beginElement = function() {}; // Prevent animation from starting
            element.endElement(); // Stop if already running
        });
    }
    
    /**
     * Apply all saved accessibility settings
     */
    function loadAccessibilitySettings() {
        // Font Size
        const fontSize = localStorage.getItem('accessibility-font-size');
        if (fontSize) {
            document.documentElement.style.fontSize = fontSize + '%';
        }
        
        // High Contrast Mode
        const highContrast = localStorage.getItem('accessibility-high-contrast');
        if (highContrast === 'true') {
            document.body.classList.add('high-contrast');
        }
        
        // Reduce Motion
        const reduceMotion = localStorage.getItem('accessibility-reduce-motion');
        if (reduceMotion === 'true') {
            document.body.classList.add('reduce-motion');
            stopSVGAnimations(); // Stop SVG animations
        }
        
        // Dyslexia Font
        const dyslexiaFont = localStorage.getItem('accessibility-dyslexia-font');
        if (dyslexiaFont === 'true') {
            document.body.classList.add('dyslexia-font');
        }
        
        // Enhanced Focus
        const enhancedFocus = localStorage.getItem('accessibility-enhanced-focus');
        if (enhancedFocus === 'true') {
            document.body.classList.add('enhanced-focus');
        }
        
        // Link Underlines
        const linkUnderlines = localStorage.getItem('accessibility-link-underlines');
        if (linkUnderlines === 'true') {
            document.body.classList.add('link-underlines');
        }
    }
    
    // Load settings when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadAccessibilitySettings);
    } else {
        // DOM already loaded
        loadAccessibilitySettings();
    }
})();
