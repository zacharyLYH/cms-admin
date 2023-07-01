"use client";

import { StoreModal } from "@/components/modals/store-modal";
import { useEffect, useState } from "react";

/*
(I think) Since this is a client component, only the client will run this useEffect. So the server will never trigger the useEffect and make isMounted to true and thus will never escape the return of null
*/
export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        //we are in server side
        return null;
    }
    return (
        <>
            <StoreModal />
        </>
    );
};
