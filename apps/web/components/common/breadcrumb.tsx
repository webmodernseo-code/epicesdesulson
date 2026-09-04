import Link from "next/link";
import React from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="py-12">
      <div className="container">
        <div className="breadcrumb">
          <ul>
            <li>
              <Link href="/">
                <span>
                  <i className="hgi hgi-stroke hgi-home-01 text-[20px]"></i>
                </span>
                Home
              </Link>
            </li>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <li className="text-light-disabled-text">&#8226;</li>
                <li>
                  {item.href ? (
                    <Link href={item.href}>{item.label}</Link>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
