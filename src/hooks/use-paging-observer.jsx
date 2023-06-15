import { useRef, useEffect } from 'react';

function usePagingObserver(ref, loading, page, totalPages, setPage) {
  const observer = useRef();

  useEffect(() => {
    if (loading) return;
    if (!ref.current) return;

    const callbackObserver = (entries) => {
      if (entries[0].isIntersecting && page < totalPages) {
        setPage(page + 1);
      }
    };

    observer.current = new IntersectionObserver(callbackObserver);
    observer.current.observe(ref.current);

    // eslint-disable-next-line consistent-return
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
}

export default usePagingObserver;
