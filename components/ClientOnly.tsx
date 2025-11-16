"use client";

import { FC, ReactNode, useEffect, useState } from "react";

// Renders children only after component has mounted on the client
export const ClientOnly: FC<{ children: ReactNode }> = ({ children }) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        // Render a placeholder or null on the server
        return null; 
    }

    return <>{children}</>;
};