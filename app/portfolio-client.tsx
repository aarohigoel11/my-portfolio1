"use client";

import { useEffect } from "react";

type PortfolioClientProps = {
  markup: string;
};

export default function PortfolioClient({ markup }: PortfolioClientProps) {
  useEffect(() => {
    document.querySelectorAll<HTMLElement>("[data-m]").forEach((item) => {
      if (item.dataset.duplicated !== "true") {
        item.innerHTML += item.innerHTML;
        item.dataset.duplicated = "true";
      }
    });

    const rows = Array.from(document.querySelectorAll<HTMLButtonElement>(".exp-row"));
    const details = Array.from(document.querySelectorAll<HTMLElement>(".exp-detail"));
    const rowListeners = rows.map((row) => {
      const onClick = () => {
        const selectedIndex = Number(row.dataset.i);
        rows.forEach((item, index) => item.classList.toggle("active", index === selectedIndex));
        details.forEach((detail, index) => {
          detail.hidden = index !== selectedIndex;
        });
      };

      row.addEventListener("click", onClick);
      return onClick;
    });

    const bar = document.getElementById("bar");
    const timeline = document.getElementById("tl");
    const timelineItems = timeline
      ? Array.from(timeline.querySelectorAll<HTMLElement>(".tl-i"))
      : [];
    let animationFrame = 0;

    const updateScrollEffects = () => {
      const documentElement = document.documentElement;
      const maxScroll = documentElement.scrollHeight - window.innerHeight;
      bar?.style.setProperty("--s", maxScroll > 0 ? String(window.scrollY / maxScroll) : "0");

      if (timeline) {
        const bounds = timeline.getBoundingClientRect();
        const progress = (window.innerHeight * 0.6 - bounds.top) / bounds.height;
        timeline.style.setProperty("--p", String(Math.max(0, Math.min(1, progress))));
        timelineItems.forEach((item) => {
          item.classList.toggle("on", item.getBoundingClientRect().top < window.innerHeight * 0.7);
        });
      }
    };

    const scheduleScrollUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(() => {
          animationFrame = 0;
          updateScrollEffects();
        });
      }
    };

    window.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
    window.addEventListener("resize", updateScrollEffects);
    updateScrollEffects();

    return () => {
      rows.forEach((row, index) => row.removeEventListener("click", rowListeners[index]));
      window.removeEventListener("scroll", scheduleScrollUpdate);
      window.removeEventListener("resize", updateScrollEffects);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
