import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Reset native scroll
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        // Also reset Lenis internal scroll position so it agrees with the browser
        if (window.__lenis) {
            window.__lenis.scrollTo(0, { immediate: true });
        }
    }, [pathname]);

    return null;
}
