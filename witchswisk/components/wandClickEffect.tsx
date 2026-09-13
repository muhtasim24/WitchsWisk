"use client";
import { useEffect } from "react";

export default function WandClickEffect() {
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            const starCount = 8;
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement("span");
                star.textContent = "✨";
                star.style.position = "fixed";
                star.style.left = `${e.clientX}px`;
                star.style.top = `${e.clientY}px`;
                star.style.pointerEvents = "none";
                star.style.fontSize = `${10 + Math.random() * 10}px`;
                star.style.zIndex = "9999";
                star.style.transition = "transform 0.6s ease-out, opacity 0.6s ease-out";
                document.body.appendChild(star);

                const angle = (Math.PI * 2 * i) / starCount + Math.random() * 0.5;
                const distance = 40 + Math.random() * 30;
                const dx = Math.cos(angle) * distance;
                const dy = Math.sin(angle) * distance;

                // Force a reflow so the transition actually applies
                requestAnimationFrame(() => {
                    star.style.transform = `translate(${dx}px, ${dy}px) scale(0.3)`;
                    star.style.opacity = "0";
                });

                setTimeout(() => star.remove(), 650);
            }
        }

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    return null;
}