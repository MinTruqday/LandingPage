import toast from 'react-hot-toast';

export const trackEvent = async (eventType, elementId, path) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:8000' : 'https://landingpage-x1qu.onrender.com');
    await fetch(`${apiUrl}/api/webhook/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_type: eventType,
        element_id: elementId,
        path: path || window.location.pathname,
        timestamp: new Date().toISOString(),
      }),
    });
    
    const actionName = eventType === 'scroll' ? 'Cuộn trang' : (eventType === 'click' ? 'Click' : eventType);
    toast(`Đã ghi nhận hành vi: ${actionName}`, {
      position: 'bottom-left',
      style: {
        borderRadius: '10px',
        background: 'var(--secondary-bg)',
        color: 'var(--text-color)',
        fontSize: '0.85rem',
        padding: '8px 12px',
      },
      duration: 2000,
    });
  } catch (error) {
    console.error("Tracking error:", error);
  }
};

export const initScrollTracking = () => {
  let scrollTimeout;
  let lastScrollY = window.scrollY;
  
  window.addEventListener("scroll", () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) > 50) {
        lastScrollY = currentScrollY;
        const scrollDepth = Math.round((currentScrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
        if (scrollDepth > 0) {
          trackEvent("scroll", `depth_${scrollDepth}`, window.location.pathname);
        }
      }
    }, 1000);
  }, { passive: true });
};
