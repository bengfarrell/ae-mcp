import type { IsInt } from 'ts-arithmetic';

export type NumericRange<
    START extends number,
    END extends number,
    ARR extends unknown[] = [],
    ACC extends number = never
> = ARR['length'] extends END
    ? ACC | START | END
    : NumericRange<START, END, [...ARR, 1], ARR[START] extends undefined ? ACC : ACC | ARR['length']>

// Common range types for After Effects values (using branded types for large ranges)
export type Percentage = NumericRange<0, 100>;
export type OpacityRange = NumericRange<0, 100>;
export type LabelIndex = NumericRange<0, 16>;
export type ColorComponent = NumericRange<0, 1>;

// Specific property ranges that fit within TypeScript limits
export type ConeAngleRange = NumericRange<1, 179>;  // For spot light cone angles
export type ApertureRange = number & { __brand: 'ApertureRange' }; // Range: 1.4 to 32.0
export type IORRange = NumericRange<1, 3>; // Index of refraction range

// For larger ranges, use branded types to avoid TypeScript recursion limits
export type TimeRange = number & { __brand: 'TimeRange' }; // Range: -10800 to 10800
export type DurationRange = number & { __brand: 'DurationRange' }; // Range: 0 to 10800
export type PixelDimension = number & { __brand: 'PixelDimension' }; // Range: 1 to 30000

// Integer constraints for specific properties
export type LayerIndex<T extends number> = IsInt<T> extends true ? T : never;
export type SegmentCount<T extends number> = IsInt<T> extends true ? T : never;

export type Point = [number, number];
export type Color = [ColorComponent, ColorComponent, ColorComponent];
export type ThreeDColorValue = [ColorComponent, ColorComponent, ColorComponent];
export type TwoDPoint = [number, number];
export type ThreeDPoint = [number, number, number];

export interface File {}
export interface Folder {}