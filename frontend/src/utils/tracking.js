export const trackEvent = async (eventType, elementId, path) => {
  try {
    await fetch("http://localhost:8000/api/webhook/track", {
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
