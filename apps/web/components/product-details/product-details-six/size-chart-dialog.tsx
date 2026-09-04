"use client";

import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

interface SizeChartDialogProps {
  onClose: () => void;
}

export default function SizeChartDialog({ onClose }: SizeChartDialogProps) {
  const [height, setHeight] = useState(150);
  const [weight, setWeight] = useState(60);

  return (
    <div
      data-state="open"
      className="size-variation-modal max-w-[950px] w-full overflow-y-auto h-full lg:h-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl z-99 data-[state=close]:invisible data-[state=close]:opacity-0 data-[state=open]:visible data-[state=open]:opacity-100 transition-all duration-250"
    >
      <div className="size-variation-modal-content">
        <h5 className="size-variation-modal-title py-[15px] px-6 border-b border-gray-300 relative">
          Size Guide
          <button
            onClick={onClose}
            className="absolute top-1/2 -translate-y-1/2 right-6 close-sidebar-btn cursor-pointer"
          >
            <i className="hgi hgi-stroke hgi-multiplication-sign text-xl" />
          </button>
        </h5>
        <div className="size-variation-modal-content-inner p-[34px]">
          <div className="height-range-slider-section mb-6 flex items-center gap-x-10">
            <div className="flex items-center gap-x-6">
              <span className="min-w-15">Height:</span>
              <p className="py-2.5 px-3.5 border border-gray-300 rounded-[80px] font-semibold text-light-primary-text min-w-24 text-center">
                <span className="height-range-slider-value">{height}</span>
                <span>cm</span>
              </p>
            </div>
            <div className="flex-1 custom-range-slider-single">
              <RangeSlider
                min={100}
                max={220}
                step={1}
                value={[100, height]}
                onInput={(value: [number, number]) => setHeight(value[1])}
                thumbsDisabled={[true, false]}
                rangeSlideDisabled={true}
              />
            </div>
          </div>
          <div className="weight-range-slider-section mb-6 flex items-center gap-x-10">
            <div className="flex items-center gap-x-6">
              <span className="min-w-15">Weight:</span>
              <p className="py-2.5 px-3.5 border border-gray-300 rounded-[80px] font-semibold text-light-primary-text min-w-24 text-center">
                <span className="weight-range-slider-value">{weight}</span>
                <span>kg</span>
              </p>
            </div>
            <div className="flex-1 custom-range-slider-single">
              <RangeSlider
                min={30}
                max={150}
                step={1}
                value={[30, weight]}
                onInput={(value: [number, number]) => setWeight(value[1])}
                thumbsDisabled={[true, false]}
                rangeSlideDisabled={true}
              />
            </div>
          </div>
          <div className="suggestion-section mb-4">
            <h6 className="mb-2">Suggests For You:</h6>
            <div className="suggestion-items flex items-center gap-x-2">
              <div className="suggestion-item py-[7px] px-4 rounded-full border border-gray-300 flex items-center justify-center leading-[26px] font-semibold text-light-primary-text hover:bg-[rgba(145,158,171,0.08)]">
                S
              </div>
              <div className="suggestion-item py-[7px] px-[15px] rounded-full border border-gray-300 flex items-center justify-center leading-[26px] font-semibold text-light-primary-text hover:bg-[rgba(145,158,171,0.08)]">
                M
              </div>
              <div className="suggestion-item py-[7px] px-[15px] rounded-full border border-gray-300 flex items-center justify-center leading-[26px] font-semibold text-light-primary-text hover:bg-[rgba(145,158,171,0.08)]">
                L
              </div>
              <div className="suggestion-item py-[7px] px-[15px] rounded-full border border-gray-300 flex items-center justify-center leading-[26px] font-semibold text-light-primary-text hover:bg-[rgba(145,158,171,0.08)]">
                XL
              </div>
              <div className="suggestion-item py-[7px] px-[15px] rounded-full border border-gray-300 flex items-center justify-center leading-[26px] font-semibold text-light-primary-text hover:bg-[rgba(145,158,171,0.08)]">
                XXL
              </div>
              <div className="suggestion-item py-[7px] px-[15px] rounded-full border border-gray-300 flex items-center justify-center leading-[26px] font-semibold text-light-primary-text hover:bg-[rgba(145,158,171,0.08)]">
                XXXL
              </div>
            </div>
          </div>
          <div className="size-table-section p-6 border border-gray-300 rounded-2xl">
            <div className="size-table w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-semibold p-4 bg-[#F4F6F8]">
                      Size
                    </th>
                    <th className="text-left font-semibold p-4 bg-[#F4F6F8]">
                      Bust
                    </th>
                    <th className="text-left font-semibold p-4 bg-[#F4F6F8]">
                      Waist
                    </th>
                    <th className="text-left font-semibold p-4 bg-[#F4F6F8]">
                      Low Hip
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  <tr>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      XS
                    </td>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      32
                    </td>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      24-25
                    </td>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      33-34
                    </td>
                  </tr>
                  <tr>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      S
                    </td>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      34
                    </td>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      26-27
                    </td>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      35-36
                    </td>
                  </tr>
                  <tr>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      M
                    </td>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      36
                    </td>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      28-29
                    </td>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      37-38
                    </td>
                  </tr>
                  <tr>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      L
                    </td>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      38
                    </td>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      30-31
                    </td>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      39-40
                    </td>
                  </tr>
                  <tr>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      XL
                    </td>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      40
                    </td>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      32-33
                    </td>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      41-42
                    </td>
                  </tr>
                  <tr>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      XXL
                    </td>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      42
                    </td>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      34-35
                    </td>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      43-44
                    </td>
                  </tr>
                  <tr>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      XXXL
                    </td>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      44
                    </td>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      36-37
                    </td>
                    <td className="text-left py-3 px-4 font-semibold text-light-primary-text">
                      45-46
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
