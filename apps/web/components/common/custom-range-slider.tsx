"use client";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

interface CustomRangeSliderProps {
  min: number;
  max: number;
  onChange: (values: { min: number; max: number }) => void;
  initialMin?: number;
  initialMax?: number;
}

const CustomRangeSlider = ({
  min,
  max,
  onChange,
  initialMin = 0,
  initialMax = 100,
}: CustomRangeSliderProps) => {
  return (
    <div className="custom-range-slider-wrapper py-4 px-1">
      <RangeSlider
        min={min}
        max={max}
        value={[initialMin, initialMax]}
        onInput={(values: [number, number]) => {
          onChange({ min: values[0], max: values[1] });
        }}
      />
    </div>
  );
};

export default CustomRangeSlider;
