import toast from 'react-hot-toast';

export const trackEvent = async (eventType, elementId, path) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || '';
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
    
    // Hiển thị thông báo khi theo dõi hành vi
    const actionName = eventType === 'scroll' ? 'Cuộn trang' : (eventType === 'click' ? 'Click' : eventType);
    toast(`Đã ghi nhận hành vi: ${actionName}`, {
      icon: '👁️',
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
  window.addEventListener("scroll", () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollDepth = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      if (scrollDepth > 0) {
        trackEvent("scroll", `depth_${scrollDepth}`, window.location.pathname);
      }
    }, 1000);
  });
};
