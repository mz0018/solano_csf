import { useState } from "react";
import { toPng } from "html-to-image";

export const useCaptureChart = () => {

    const [isCapturing, setIsCapturing] = useState<boolean>(false);

    const handleCapture = async (refs: (HTMLDivElement | null)[]) => {
        setIsCapturing(true)
        const images: string[] = []

        for (const ref of refs) {
            if (!ref) {
                continue
            }

            const dataUrl = await toPng(ref, {
                quality: 1,
                backgroundColor: "white",
                pixelRatio: 2
            })
            images.push(dataUrl)
        }
        setIsCapturing(false)
        return images;
    };

    return { handleCapture, isCapturing };
};
