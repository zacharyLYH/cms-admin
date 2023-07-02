import { useEffect, useState } from "react";

export const useOrigin = () => {
    const [isMounted, setIsMounted] = useState(false);
    const origin =
        typeof window !== "undefined" && window.location.origin
            ? window.location.origin
            : "";
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        //we are in server side
        return "";
    }
    return origin;
};
