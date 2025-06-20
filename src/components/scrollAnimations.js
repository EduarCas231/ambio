/**
 * ==========================================
 * SCROLL ANIMATIONS UTILITY
 * ==========================================
 * Maneja las animaciones de scroll para elementos con clases específicas
 * Incluye throttling para mejor performance
 */

// Configuration constants
const SCROLL_CONFIG = {
    triggerRatio: 4, // windowHeight / 4 (more responsive)
    defaultAnimationDelay: 100, // milliseconds
    observerThreshold: 0.15 // Intersection Observer threshold
  };
  
  // Animation types mapping
  const ANIMATION_TYPES = {
    'fade-up': { transform: 'translateY(30px)', opacity: '0' },
    'fade-down': { transform: 'translateY(-30px)', opacity: '0' },
    'fade-left': { transform: 'translateX(30px)', opacity: '0' },
    'fade-right': { transform: 'translateX(-30px)', opacity: '0' },
    'fade-in': { opacity: '0' }
  };
  
  /**
   * Apply initial animation state to element
   * @param {Element} element - DOM element to animate
   */
  const applyInitialState = (element) => {
    const animationType = element.dataset.aos;
    
    if (animationType && ANIMATION_TYPES[animationType]) {
      const initialState = ANIMATION_TYPES[animationType];
      Object.assign(element.style, initialState);
    } else if (element.classList.contains('scroll-animate')) {
      element.style.opacity = '0';
    }
  };
  
  /**
   * Animate element to visible state
   * @param {Element} element - DOM element to animate
   */
  const animateToVisible = (element) => {
    const delay = parseInt(element.dataset.aosDelay) || 0;
    
    // Add visible class immediately
    element.classList.add('visible');
    
    // Apply final animation state with delay
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'none';
      element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    }, delay);
  };
  
  /**
   * Check if element is in viewport
   * @param {Element} element - DOM element to check
   * @param {number} triggerOffset - Offset for triggering animation
   * @returns {boolean} - Whether element should be animated
   */
  const isElementInViewport = (element, triggerOffset) => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    return rect.top < windowHeight - triggerOffset && rect.bottom > 0;
  };
  
  /**
   * Handle scroll animations using traditional scroll event
   * @param {NodeList} elements - Elements to animate
   */
  const handleScrollAnimations = (elements) => {
    const windowHeight = window.innerHeight;
    const triggerOffset = windowHeight / SCROLL_CONFIG.triggerRatio;
    
    elements.forEach(element => {
      if (!element.classList.contains('visible') && 
          isElementInViewport(element, triggerOffset)) {
        animateToVisible(element);
      }
    });
  };
  
  /**
   * Intersection Observer approach (preferred for mobile)
   * @param {NodeList} elements - Elements to observe
   */
  const initIntersectionObserver = (elements) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
            animateToVisible(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: SCROLL_CONFIG.observerThreshold,
    
      }
    );
  
    elements.forEach(element => {
      applyInitialState(element);
      observer.observe(element);
    });
  };
  
  /**
   * Initialize scroll animations with mobile-optimized throttling
   * @param {NodeList} elements - Elements to animate
   */
  const initScrollEventListener = (elements) => {
    // Apply initial states
    elements.forEach(applyInitialState);
    
    // Initial check on load
    handleScrollAnimations(elements);
    
    // Mobile-optimized scroll handler
    let ticking = false;
    
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScrollAnimations(elements);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Add scroll event listener with passive option for better mobile performance
    window.addEventListener('scroll', scrollHandler, { 
      passive: true,
      capture: false
    });
    
    // Add resize event listener
    window.addEventListener('resize', scrollHandler, { passive: true });
  };
  
  /**
   * Main function to initialize scroll animations
   * Prioritizes Intersection Observer for better mobile performance
   */
  export const initScrollAnimations = () => {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initScrollAnimations);
      return;
    }
    
    // Get all elements that need animation
    const elements = document.querySelectorAll('.scroll-animate, [data-aos]');
    
    if (elements.length === 0) {
      return;
    }
    
    // Always try Intersection Observer first (better for mobile)
    if (window.IntersectionObserver) {
      initIntersectionObserver(elements);
    } else {
      // Minimal fallback for very old browsers
      initScrollEventListener(elements);
    }
  };
  
  /**
   * Utility function to manually trigger animation on specific element
   * @param {Element|string} elementOrSelector - Element or CSS selector
   */
  export const triggerAnimation = (elementOrSelector) => {
    const element = typeof elementOrSelector === 'string' 
      ? document.querySelector(elementOrSelector)
      : elementOrSelector;
      
    if (element && !element.classList.contains('visible')) {
      animateToVisible(element);
    }
  };
  
  /**
   * Utility function to reset animations (useful for SPA routing)
   */
  export const resetAnimations = () => {
    const elements = document.querySelectorAll('.scroll-animate, [data-aos]');
    
    elements.forEach(element => {
      element.classList.remove('visible');
      applyInitialState(element);
    });
    
    // Re-initialize animations
    setTimeout(() => {
      const elementsInView = document.querySelectorAll('.scroll-animate, [data-aos]');
      handleScrollAnimations(elementsInView);
    }, 100);
  };
  
