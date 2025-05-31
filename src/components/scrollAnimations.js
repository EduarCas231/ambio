/**
 * ==========================================
 * SCROLL ANIMATIONS UTILITY
 * ==========================================
 * Maneja las animaciones de scroll para elementos con clases específicas
 * Incluye throttling para mejor performance
 */

// Configuration constants
const SCROLL_CONFIG = {
    triggerRatio: 5, // windowHeight / 5
    throttleDelay: 50, // milliseconds
    defaultAnimationDelay: 100, // milliseconds
    observerThreshold: 0.1 // Intersection Observer threshold
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
   * Modern Intersection Observer approach (fallback for older browsers)
   * @param {NodeList} elements - Elements to observe
   */
  const initIntersectionObserver = (elements) => {
    if (!window.IntersectionObserver) {
      // Fallback to scroll event for older browsers
      return false;
    }
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
            animateToVisible(entry.target);
            // Stop observing once animated
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: SCROLL_CONFIG.observerThreshold,
        rootMargin: '50px'
      }
    );
  
    elements.forEach(element => {
      applyInitialState(element);
      observer.observe(element);
    });
  
    return true;
  };
  
  /**
   * Initialize scroll animations with throttling
   * @param {NodeList} elements - Elements to animate
   */
  const initScrollEventListener = (elements) => {
    // Apply initial states
    elements.forEach(applyInitialState);
    
    // Initial check on load
    handleScrollAnimations(elements);
    
    // Throttled scroll listener
    let isScrolling = false;
    let scrollTimeout;
    
    const throttledScrollHandler = () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          handleScrollAnimations(elements);
          isScrolling = false;
        });
        isScrolling = true;
      }
      
      // Clear existing timeout
      clearTimeout(scrollTimeout);
      
      // Set timeout for final scroll check
      scrollTimeout = setTimeout(() => {
        handleScrollAnimations(elements);
      }, SCROLL_CONFIG.throttleDelay);
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    
    // Add resize event listener for responsive updates
    window.addEventListener('resize', () => {
      handleScrollAnimations(elements);
    }, { passive: true });
  };
  
  /**
   * Main function to initialize scroll animations
   * Automatically detects and uses the best method available
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
      console.warn('No elements found for scroll animations');
      return;
    }
    
    // Try to use Intersection Observer first (modern approach)
    const observerInitialized = initIntersectionObserver(elements);
    
    // Fallback to scroll event listener if Intersection Observer is not available
    if (!observerInitialized) {
      console.info('Using scroll event fallback for animations');
      initScrollEventListener(elements);
    }
    
    // Debug mode (remove in production)
    if (process.env.NODE_ENV === 'development') {
      console.log(`Initialized scroll animations for ${elements.length} elements`);
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
  
