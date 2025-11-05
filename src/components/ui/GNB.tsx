"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface GNBProps {
  /** Logo text or component */
  logo?: React.ReactNode;
  /** Logo href link */
  logoHref?: string;
  /** Whether to show notification badge */
  hasNotification?: boolean;
  /** Notification icon click handler */
  onNotificationClick?: () => void;
  /** Additional className */
  className?: string;
}

export const GNB = React.forwardRef<HTMLElement, GNBProps>(
  (
    {
      logo = "LOGO",
      logoHref = "/",
      hasNotification = false,
      onNotificationClick,
      className = "",
    },
    ref
  ) => {
    return (
      <header ref={ref} className={`gnb ${className}`}>
        <div className="flex items-center gap-2.5 p-4 relative flex-1 grow bg-white">
          <Link href={logoHref}>
            <h1 className="gnb-logo cursor-pointer">
              {logo}
            </h1>
          </Link>
        </div>

        <div className="inline-flex items-start gap-2.5 pl-4 pr-[17px] py-4 relative flex-[0_0_auto] bg-white">
          <button
            type="button"
            aria-label="Notifications"
            onClick={onNotificationClick}
            className="relative gnb-icon"
          >
            <Image
              className="gnb-icon"
              alt=""
              src="/img/notifications.svg"
              width={24}
              height={24}
            />
            {hasNotification && (
              <span
                className="gnb-notification-badge"
                aria-label="Unread notifications"
              />
            )}
          </button>
        </div>
      </header>
    );
  }
);

GNB.displayName = "GNB";
