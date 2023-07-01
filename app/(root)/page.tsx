"use client";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";

const SetupPage = () => {
    const onOpen = useStoreModal((state) => state.onOpen);
    const isOpen = useStoreModal((state) => state.isOpen);
    useEffect(() => {
        if (!isOpen) {
            onOpen();
        }
    }, [onOpen, isOpen]);
    return (
        <div className="p-4">
            {/* <Modal
                title="Test"
                description="TEst Desc"
                isOpen
                onClose={() => {}}
            >
                Children
            </Modal> */}
            Root page
        </div>
    );
};

export default SetupPage;
