"use client";

import React from "react";
import Image from "next/image";
import { getAssetPath } from "@/utils/assetPath";

interface NavigationHeaderProps {
    onPrev: () => void;
    onNext: () => void;
    title: string;
    showDropdown?: boolean;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
    onPrev,
    onNext,
    title,
    showDropdown = true,
}) => {
    return (
        <div className="flex items-center justify-between px-2 pb-5">
            <button
                onClick={onPrev}
                className="w-10 h-10 bg-surface-2 rounded-lg flex items-center justify-center"
            >
                <Image
                    className="relative w-6 h-6"
                    alt=""
                    src={getAssetPath("/img/chevron_backward.svg")}
                    width={24}
                    height={24}
                />
            </button>

            <button className="bg-surface-2 rounded-lg px-5 py-2 flex items-center gap-1">
                <span className="title-2 text-on-surface">{title}</span>
                {showDropdown && (
                    <Image
                        className="relative w-6 h-6"
                        alt=""
                        src={getAssetPath("/img/keyboard-arrow-down.svg")}
                        width={24}
                        height={24}
                    />
                )}
            </button>

            <button
                onClick={onNext}
                className="w-10 h-10 bg-surface-2 rounded-lg flex items-center justify-center"
            >
                <Image
                    className="relative w-6 h-6 rotate-180"
                    alt=""
                    src={getAssetPath("/img/chevron_backward.svg")}
                    width={24}
                    height={24}
                />
            </button>
        </div>
    );
};