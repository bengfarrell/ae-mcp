import type { 
    File,
    LabelIndex,
    TimeRange,
    DurationRange,
    PixelDimension,
    LayerIndex,
    ThreeDColorValue,
} from './primitives';

/**
 * Layer-related types and classes for After Effects scripting
 * 
 * This module contains all Layer classes, their subclasses, and related enums/interfaces.
 * 
 * @see https://ae-scripting.docsforadobe.dev/layer/layer/
 */

// =============================================================================
// ENUMS
// =============================================================================

/**
 * The type of automatic orientation to perform for the layer.
 * 
 * @remarks
 * These are integer enumeration values that JavaScript treats as numbers.
 * When setting layer.autoOrient, only these specific integer values are valid.
 * 
 * @see https://ae-scripting.docsforadobe.dev/layer/layer/#layer-autoorient
 */
declare enum AutoOrientType {
    /** 
     * Layer faces in the direction of the motion path.
     * Requires the layer to have a spatial keyframe animation to work effectively.
     * 
     * @remarks Integer value: 4213
     */
    ALONG_PATH = 4213,

    /** 
     * Layer always faces the active camera or points at its point of interest.
     * For 3D layers, this orients toward the camera; for 2D layers with point of interest, orients toward that point.
     * 
     * @remarks Integer value: 4214
     */
    CAMERA_OR_POINT_OF_INTEREST = 4214,

    /** 
     * Each character in a per-character 3D text layer automatically faces the active camera.
     * Only applicable to 3D text layers with per-character 3D enabled.
     * 
     * @remarks Integer value: 4215
     */
    CHARACTERS_TOWARD_CAMERA = 4215,

    /** 
     * Layer rotates freely, independent of any motion path, point of interest, or other layers.
     * This is the default orientation behavior.
     * 
     * @remarks Integer value: 4212
     */
    NO_AUTO_ORIENT = 4212,
}

/**
 * Blending modes for layers that determine how a layer blends with layers beneath it.
 * 
 * @remarks
 * These are integer enumeration values that JavaScript treats as numbers.
 * When setting layer.blendingMode, only these specific integer values are valid.
 * The actual visual effect depends on the pixel values of the current layer and underlying layers.
 * 
 * @see https://ae-scripting.docsforadobe.dev/layer/avlayer/#avlayer-blendingmode
 */
declare enum BlendingMode {
    /** Adds the color values. Often used for lighting effects. */
    ADD = 5220,
    
    /** Alpha Add blend mode for special compositing. */
    ALPHA_ADD = 5244,
    
    /** Classic Color Burn blend mode for darkening effects. */
    CLASSIC_COLOR_BURN = 5213,
    
    /** Classic Color Dodge blend mode for lightening effects. */
    CLASSIC_COLOR_DODGE = 5212,
    
    /** Classic Difference blend mode for creating inverted effects. */
    CLASSIC_DIFFERENCE = 5209,
    
    /** Applies the hue and saturation of the blend layer to the luminance of the base layer. */
    COLOR = 5216,
    
    /** Modern Color Burn blend mode for more accurate darkening. */
    COLOR_BURN = 5227,
    
    /** Modern Color Dodge blend mode for more accurate lightening. */
    COLOR_DODGE = 5226,
    
    /** Similar to dissolve but with dancing pixel patterns. */
    DANCING_DISSOLVE = 5206,
    
    /** Uses whichever is darker between the blend and base colors. */
    DARKEN = 5207,
    
    /** Modern darker color comparison across all channels. */
    DARKER_COLOR = 5245,
    
    /** Modern difference blend mode for color subtraction effects. */
    DIFFERENCE = 5223,
    
    /** Randomly replaces pixels based on opacity for a noisy effect. */
    DISSOLVE = 5205,
    
    /** Divides the base color by the blend color. */
    DIVIDE = 5246,
    
    /** Similar to difference but with lower contrast. */
    EXCLUSION = 5224,
    
    /** Combines multiply and screen blend modes. */
    HARD_LIGHT = 5218,
    
    /** Creates posterized colors by setting to maximum values. */
    HARD_MIX = 5230,
    
    /** Applies the hue of the blend layer to the base layer. */
    HUE = 5214,
    
    /** Uses whichever is lighter between the blend and base colors. */
    LIGHTEN = 5208,
    
    /** Modern lighter color comparison across all channels. */
    LIGHTER_COLOR = 5243,
    
    /** Inverse of linear dodge, darkens by decreasing brightness. */
    LINEAR_BURN = 5228,
    
    /** Linear version of color dodge, adds colors directly. */
    LINEAR_DODGE = 5229,
    
    /** Combines linear burn and linear dodge blend modes. */
    LINEAR_LIGHT = 5233,
    
    /** Luminescent premultiplied alpha blend mode. */
    LUMINESCENT_PREMUL = 5221,
    
    /** Applies the luminance of the blend layer to the base layer. */
    LUMINOSITY = 5217,
    
    /** Multiplies the base and blend colors, always resulting in darker colors. */
    MULTIPLY = 5210,
    
    /** 
     * Default blend mode. Shows the blend layer with no interaction with base layer.
     * @remarks This is the default value when creating new layers.
     */
    NORMAL = 5204,
    
    /** Combines multiply and screen, hard light with softer contrast. */
    OVERLAY = 5211,
    
    /** Combines lighten and darken blend modes based on luminance. */
    PIN_LIGHT = 5234,
    
    /** Applies the saturation of the blend layer to the base layer. */
    SATURATION = 5215,
    
    /** Inverse of multiply, always results in lighter colors. */
    SCREEN = 5222,
    
    /** Uses alpha channel to create silhouette effects. */
    SILHOUETE_ALPHA = 5219,
    
    /** Uses luminance to create silhouette effects. */
    SILHOUETTE_LUMA = 5225,
    
    /** Softer version of hard light blend mode. */
    SOFT_LIGHT = 5231,
    
    /** Uses alpha channel to create stencil cutout effects. */
    STENCIL_ALPHA = 5235,
    
    /** Uses luminance to create stencil cutout effects. */
    STENCIL_LUMA = 5236,
    
    /** Subtracts the blend color from the base color. */
    SUBTRACT = 5247,
    
    /** Combination of color dodge and color burn with high contrast. */
    VIVID_LIGHT = 5232,
}

/**
 * Frame blending types for layers to control motion blur rendering quality.
 * 
 * @remarks
 * These are integer enumeration values that JavaScript treats as numbers.
 * Frame blending affects how motion blur is calculated when layer.frameBlending is true.
 * 
 * @see https://ae-scripting.docsforadobe.dev/layer/avlayer/#avlayer-frameblendingtype
 */
declare enum FrameBlendingType {
    /** 
     * Mixes adjacent frames for smoother motion blur.
     * Provides good quality with reasonable render times.
     * 
     * @remarks Integer value: 11213
     */
    FRAME_MIX = 11213,
    
    /** 
     * No frame blending applied.
     * Fastest rendering but no motion blur enhancement.
     * 
     * @remarks Integer value: 11211
     */
    NO_FRAME_BLEND = 11211,
    
    /** 
     * Advanced pixel motion analysis for highest quality motion blur.
     * Slowest rendering but best quality results.
     * 
     * @remarks Integer value: 11212
     */
    PIXEL_MOTION = 11212,
}

/**
 * Layer quality settings that control rendering quality vs. performance.
 * 
 * @remarks
 * These are integer enumeration values that JavaScript treats as numbers.
 * Quality affects how the layer is rendered in the composition panel and final output.
 * 
 * @see https://ae-scripting.docsforadobe.dev/layer/layer/#layer-quality
 */
declare enum LayerQuality {
    /** 
     * Highest quality rendering with all effects and sub-pixel positioning.
     * Slowest rendering but highest visual quality.
     * 
     * @remarks Integer value: 10212
     */
    BEST = 10212,
    
    /** 
     * Fast preview quality with reduced effects processing.
     * Good for previewing animations quickly.
     * 
     * @remarks Integer value: 10210
     */
    DRAFT = 10210,
    
    /** 
     * Shows only wireframe outlines of layer content.
     * Fastest rendering for positioning and timing work.
     * 
     * @remarks Integer value: 10211
     */
    WIREFRAME = 10211,
}

/**
 * Layer sampling quality settings for scaling and transformation operations.
 * 
 * @remarks
 * These are integer enumeration values that JavaScript treats as numbers.
 * Sampling quality affects how pixels are interpolated when layers are scaled or transformed.
 * 
 * @see https://ae-scripting.docsforadobe.dev/layer/avlayer/#avlayer-samplingquality
 */
declare enum LayerSamplingQuality {
    /** 
     * Bicubic interpolation for highest quality scaling.
     * More accurate color interpolation but slower processing.
     * 
     * @remarks Integer value: 10201
     */
    BICUBIC = 10201,
    
    /** 
     * Bilinear interpolation for faster scaling.
     * Good quality with better performance than bicubic.
     * 
     * @remarks Integer value: 10202
     */
    BILINEAR = 10202,
}

/**
 * Light types for light layers that illuminate 3D layers.
 * 
 * @remarks
 * These are integer enumeration values that JavaScript treats as numbers.
 * Light type determines how the light affects 3D layers in the composition.
 * Only applicable to light layers created with LayerCollection.addLight().
 * 
 * @see https://ae-scripting.docsforadobe.dev/layer/lightlayer/#lightlayer-lighttype
 */
declare enum LightType {
    /** 
     * Ambient light illuminates all surfaces equally from all directions.
     * No shadows or directional lighting effects.
     * 
     * @remarks Integer value: 4412
     */
    AMBIENT = 4412,
    
    /** 
     * Parallel light rays travel in the same direction (like sunlight).
     * Creates consistent shadows and lighting across all 3D layers.
     * 
     * @remarks Integer value: 4414
     */
    PARALLEL = 4414,
    
    /** 
     * Point light radiates in all directions from a single point.
     * Creates radial lighting falloff and realistic shadows.
     * 
     * @remarks Integer value: 4411
     */
    POINT = 4411,
    
    /** 
     * Spot light emits a cone of light with adjustable cone angle.
     * Most versatile light type with directional control and cone parameters.
     * 
     * @remarks Integer value: 4413
     */
    SPOT = 4413,
}

/**
 * Track matte types for layers that use another layer as a transparency mask.
 * 
 * @remarks
 * These are integer enumeration values that JavaScript treats as numbers.
 * Track mattes use the layer immediately above as a mask to control transparency.
 * The matte layer itself becomes invisible and only serves as a mask.
 * 
 * @see https://ae-scripting.docsforadobe.dev/layer/avlayer/#avlayer-trackmattetype
 */
declare enum TrackMatteType {
    /** 
     * Uses the alpha channel of the matte layer for transparency.
     * White areas of the matte are opaque, black areas are transparent.
     * 
     * @remarks Integer value: 11312
     */
    ALPHA = 11312,
    
    /** 
     * Uses the inverted alpha channel of the matte layer for transparency.
     * Black areas of the matte are opaque, white areas are transparent.
     * 
     * @remarks Integer value: 11313
     */
    ALPHA_INVERTED = 11313,
    
    /** 
     * Uses the luminance (brightness) of the matte layer for transparency.
     * Bright areas of the matte are opaque, dark areas are transparent.
     * 
     * @remarks Integer value: 11314
     */
    LUMA = 11314,
    
    /** 
     * Uses the inverted luminance of the matte layer for transparency.
     * Dark areas of the matte are opaque, bright areas are transparent.
     * 
     * @remarks Integer value: 11315
     */
    LUMA_INVERTED = 11315,
    
    /** 
     * No track matte applied to the layer.
     * Layer uses its own alpha channel for transparency.
     * 
     * @remarks Integer value: 11311
     */
    NO_TRACK_MATTE = 11311,
}

// =============================================================================
// FORWARD DECLARATIONS (to be imported from other modules)
// =============================================================================

// These will be imported from aetypes.ts
declare class PropertyGroup { }
declare class Collection { }
declare class CompItem { }
declare class AVItem { }
declare class MarkerValueProperty { }
declare class MaskPropertyGroup { }
declare class PropertyBase { }
declare class Viewer { }
declare class TextDocument { }

// Property types (will be imported from property module when created)
declare interface OneDProperty { }
declare interface TwoDOrThreeDProperty { }
declare interface ThreeDProperty { }
declare interface TextDocumentProperty { }

// Type aliases
type _PropertyClasses = any; // Will be properly typed later

// =============================================================================
// PROPERTY GROUP INTERFACES
// =============================================================================

/**
 * Transform property group for layers containing all spatial and temporal transformation properties.
 * 
 * @remarks
 * All properties in this group are Property objects that can be keyframed.
 * Position and anchor point use 2D coordinates for 2D layers, 3D coordinates for 3D layers.
 * Rotation values are in degrees. Scale values are percentages (100 = normal size).
 * Opacity ranges from 0 (transparent) to 100 (opaque).
 * 
 * @see https://ae-scripting.docsforadobe.dev/layer/layer/#transform-group
 */
declare interface _TransformGroup extends PropertyGroup {
    /** 
     * Anchor point coordinates for the layer's transformation center.
     * 
     * @remarks
     * - For 2D layers: [x, y] coordinates in layer space (pixels from top-left)
     * - For 3D layers: [x, y, z] coordinates in layer space
     * - Default is typically the center of the layer content
     */
    readonly anchorPoint: TwoDOrThreeDProperty;
    
    /** 
     * Position coordinates for the layer in the composition.
     * 
     * @remarks
     * - For 2D layers: [x, y] coordinates in composition space (pixels)
     * - For 3D layers: [x, y, z] coordinates in composition space
     * - Z values are in pixels, positive Z moves away from camera
     */
    readonly position: TwoDOrThreeDProperty;
    
    /** 
     * X-axis position component as a separate property.
     * 
     * @remarks
     * Range: Unlimited floating-point values in pixels.
     * Can be separated from position for independent keyframing.
     */
    readonly xPosition: OneDProperty;
    
    /** 
     * Y-axis position component as a separate property.
     * 
     * @remarks
     * Range: Unlimited floating-point values in pixels.
     * Can be separated from position for independent keyframing.
     */
    readonly yPosition: OneDProperty;
    
    /** 
     * Z-axis position component as a separate property (3D layers only).
     * 
     * @remarks
     * Range: Unlimited floating-point values in pixels.
     * Only available when layer.threeDLayer is true.
     * Positive values move away from camera.
     */
    readonly zPosition: OneDProperty;
    
    /** 
     * Scale values for layer size as percentages.
     * 
     * @remarks
     * - For 2D layers: [x%, y%] percentages
     * - For 3D layers: [x%, y%, z%] percentages
     * - Range: Typically 0.01 to 10000+ (0.01% to 10000%+)
     * - 100 = normal size, 200 = double size, 50 = half size
     */
    readonly scale: TwoDOrThreeDProperty;
    
    /** 
     * 3D orientation in degrees (3D layers only).
     * 
     * @remarks
     * Range: [x°, y°, z°] unlimited degree values.
     * Only available when layer.threeDLayer is true.
     * Different from rotation - uses quaternion-based orientation.
     */
    readonly orientation: ThreeDProperty;
    
    /** 
     * Z-axis rotation (standard rotation) in degrees.
     * 
     * @remarks
     * Range: Unlimited floating-point degrees.
     * Positive values rotate clockwise.
     * Can accumulate beyond 360° for multiple rotations.
     */
    readonly rotation: OneDProperty;
    
    /** 
     * X-axis rotation in degrees (3D layers only).
     * 
     * @remarks
     * Range: Unlimited floating-point degrees.
     * Only available when layer.threeDLayer is true.
     * Rotates around the X-axis (pitch).
     */
    readonly xRotation: OneDProperty;
    
    /** 
     * Y-axis rotation in degrees (3D layers only).
     * 
     * @remarks
     * Range: Unlimited floating-point degrees.
     * Only available when layer.threeDLayer is true.
     * Rotates around the Y-axis (yaw).
     */
    readonly yRotation: OneDProperty;
    
    /** 
     * Z-axis rotation in degrees (3D layers only).
     * 
     * @remarks
     * Range: Unlimited floating-point degrees.
     * Only available when layer.threeDLayer is true.
     * Rotates around the Z-axis (roll) - same as standard rotation.
     */
    readonly zRotation: OneDProperty;
    
    /** 
     * Layer opacity as a percentage.
     * 
     * @remarks
     * Range: 0.0 to 100.0 (0% to 100%)
     * - 0 = completely transparent
     * - 100 = completely opaque
     * - JavaScript Number type, but must be within valid range
     */
    readonly opacity: OneDProperty;
    
    /** 
     * Point of interest coordinates for camera and light targeting (3D layers only).
     * 
     * @remarks
     * Range: [x, y, z] unlimited coordinates in composition space.
     * Only available for camera and light layers.
     * Used with autoOrient settings for automatic orientation.
     */
    readonly pointOfInterest: ThreeDProperty;
}

/**
 * Audio property group for AVLayers containing audio-related properties.
 * 
 * @remarks
 * Only available for layers that have an audio component (layer.hasAudio is true).
 * Audio levels are typically displayed as stereo pairs [left, right] or mono [single].
 * 
 * @see https://ae-scripting.docsforadobe.dev/layer/avlayer/#audio-group
 */
declare interface _AudioGroup extends PropertyGroup {
    /** 
     * Audio level values for the layer's audio component.
     * 
     * @remarks
     * - For stereo audio: [left, right] channel levels in decibels
     * - For mono audio: [single] channel level in decibels
     * - Range: Typically -96 dB to +6 dB
     * - 0 dB = no attenuation, negative values = attenuation, positive values = amplification
     * - JavaScript Number type, but must be within valid decibel range
     */
    readonly audioLevels: TwoDOrThreeDProperty;
}

/**
 * Camera options property group for camera layers containing lens and focus properties.
 * 
 * @remarks
 * Only available for camera layers created with LayerCollection.addCamera().
 * These properties control the virtual camera's lens behavior and depth of field effects.
 * 
 * @see https://ae-scripting.docsforadobe.dev/layer/cameralayer/#camera-options-group
 */
declare interface _CameraOptionsGroup extends PropertyGroup {
    /** 
     * Camera zoom value in pixels (focal length).
     * 
     * @remarks
     * Range: 1.0 to 30000+ pixels
     * - Higher values = more telephoto (zoomed in)
     * - Lower values = more wide-angle (zoomed out)
     * - Default is typically 50-200 depending on composition size
     */
    readonly zoom: OneDProperty;
    
    /** 
     * Depth of field blur amount.
     * 
     * @remarks
     * Range: 0.0 to 100.0+
     * - 0 = no depth of field blur (everything in focus)
     * - Higher values = more pronounced blur for out-of-focus areas
     * - Requires depthOfField to be enabled in camera settings
     */
    readonly depthOfField: OneDProperty;
    
    /** 
     * Distance from camera to the focus plane in pixels.
     * 
     * @remarks
     * Range: 0.1 to unlimited pixels
     * Objects at this distance will be in perfect focus.
     * Objects closer or farther will be blurred based on aperture and blur level.
     */
    readonly focusDistance: OneDProperty;
    
    /** 
     * Aperture setting controlling depth of field.
     * 
     * @remarks
     * Range: 1.4 to 32.0+ (f-stop values)
     * - Lower values (f/1.4) = shallow depth of field (more blur)
     * - Higher values (f/16) = deep depth of field (less blur)
     * - Follows real-world camera aperture conventions
     */
    readonly aperture: OneDProperty;
    
    /** 
     * Additional blur level for depth of field effect.
     * 
     * @remarks
     * Range: 0.0 to 100.0+
     * - 0 = minimal blur
     * - 100 = maximum blur
     * - Works in conjunction with aperture to control blur intensity
     */
    readonly blurLevel: OneDProperty;
}

/**
 * Geometry options property group for 3D layers with extruded text or shapes.
 * 
 * @remarks
 * Only available for text layers and shape layers when 3D layer is enabled.
 * Controls the 3D extrusion and beveling of vector-based layer content.
 * 
 * @see https://ae-scripting.docsforadobe.dev/layer/layer/#geometry-options-group
 */
declare interface _GeometryOptionsGroup extends PropertyGroup {
    /** 
     * Curvature amount for rounded edges.
     * 
     * @remarks
     * Range: 0.0 to 100.0
     * - 0 = sharp edges
     * - 100 = maximum rounding
     * - Affects how beveled edges appear
     */
    readonly curvature: OneDProperty;
    
    /** 
     * Number of segments for curved surfaces.
     * 
     * @remarks
     * Range: 1 to 100+ (integer values)
     * - Higher values = smoother curves but slower rendering
     * - Lower values = more angular curves but faster rendering
     * - JavaScript treats as Number but should be integer values
     */
    readonly segments: OneDProperty;
    
    /** 
     * Depth of bevel effect on front face in pixels.
     * 
     * @remarks
     * Range: 0.0 to 500.0+ pixels
     * - 0 = no front bevel
     * - Higher values = deeper front bevel
     * - Creates chamfered edges on the front of extruded geometry
     */
    readonly bevelDepth: OneDProperty;
    
    /** 
     * Depth of bevel effect on holes in pixels.
     * 
     * @remarks
     * Range: 0.0 to 500.0+ pixels
     * - 0 = no hole bevel
     * - Higher values = deeper hole bevel
     * - Applies to internal holes in text characters or shapes
     */
    readonly holeBevelDepth: OneDProperty;
    
    /** 
     * Depth of 3D extrusion in pixels.
     * 
     * @remarks
     * Range: 0.0 to unlimited pixels
     * - 0 = flat (no extrusion)
     * - Positive values = extrude away from camera
     * - Negative values = extrude toward camera
     */
    readonly extrusionDepth: OneDProperty;
}

/**
 * Layer styles property group containing Photoshop-style layer effects.
 * 
 * @remarks
 * Layer styles are non-destructive effects applied to layer content.
 * Each style sub-group contains properties for controlling that specific effect.
 * Styles can be applied to most layer types including text, shapes, and footage.
 * 
 * @see https://ae-scripting.docsforadobe.dev/layer/layer/#layer-styles-group
 */
declare interface _LayerStyles extends PropertyGroup {
    /** Advanced blending and knockout options for the layer. */
    readonly blendingOptions: PropertyGroup;
    
    /** Drop shadow effect properties (offset, color, opacity, blur, etc.). */
    readonly dropShadow: PropertyGroup;
    
    /** Inner shadow effect properties (inward shadow within layer bounds). */
    readonly innerShadow: PropertyGroup;
    
    /** Outer glow effect properties (glow extending outside layer bounds). */
    readonly outerGlow: PropertyGroup;
    
    /** Inner glow effect properties (glow within layer bounds). */
    readonly innerGlow: PropertyGroup;
    
    /** Bevel and emboss effect properties (3D-style raised/recessed appearance). */
    readonly bevelAndEmboss: PropertyGroup;
    
    /** Satin effect properties (curved highlight/shadow patterns). */
    readonly satin: PropertyGroup;
    /** Color overlay effect properties (solid color tint overlay). */
    readonly colorOverlay: PropertyGroup;
    
    /** Gradient overlay effect properties (gradient color overlay). */
    readonly gradientOverlay: PropertyGroup;
    
    /** Stroke effect properties (outline around layer content). */
    readonly stroke: PropertyGroup;
}

/**
 * Light options property group for light layers containing illumination properties.
 * 
 * @remarks
 * Only available for light layers created with LayerCollection.addLight().
 * These properties control how the light affects 3D layers in the composition.
 * Different light types have different available properties.
 * 
 * @see https://ae-scripting.docsforadobe.dev/layer/lightlayer/#light-options-group
 */
declare interface _LightOptionsGroup extends PropertyGroup {
    /** 
     * Light intensity as a percentage.
     * 
     * @remarks
     * Range: 0.0 to 1000.0+ (0% to 1000%+)
     * - 0 = no light output
     * - 100 = standard intensity
     * - Values over 100 = increased brightness
     * - JavaScript Number type
     */
    readonly intensity: OneDProperty;
    
    /** 
     * Light color as RGB values.
     * 
     * @remarks
     * Range: [r, g, b] where each component is 0.0 to 1.0
     * - [1, 1, 1] = white light
     * - [1, 0, 0] = red light
     * - [0, 0, 0] = no light (black)
     * - JavaScript treats as Number array [r, g, b]
     */
    readonly color: ThreeDProperty;
    
    /** 
     * Cone angle for spot lights in degrees.
     * 
     * @remarks
     * Range: 1.0 to 179.0 degrees
     * Only available for spot lights (LightType.SPOT).
     * - Smaller values = tighter beam
     * - Larger values = wider beam
     * - JavaScript Number type
     */
    readonly coneAngle: OneDProperty;
    
    /** 
     * Cone feather amount for spot lights as a percentage.
     * 
     * @remarks
     * Range: 0.0 to 100.0 (0% to 100%)
     * Only available for spot lights (LightType.SPOT).
     * - 0 = hard edge to light cone
     * - 100 = very soft, feathered edge
     * - JavaScript Number type
     */
    readonly coneFeather: OneDProperty;
    
    /** 
     * Shadow darkness as a percentage.
     * 
     * @remarks
     * Range: 0.0 to 100.0 (0% to 100%)
     * - 0 = no shadows (transparent)
     * - 100 = completely black shadows
     * - Only works with layers that acceptsShadows is true
     * - JavaScript Number type
     */
    readonly shadowDarkness: OneDProperty;
    
    /** 
     * Shadow diffusion (softness) amount.
     * 
     * @remarks
     * Range: 0.0 to 1000.0+ pixels
     * - 0 = sharp, hard shadows
     * - Higher values = softer, more diffused shadows
     * - Affects the blur radius of shadow edges
     * - JavaScript Number type
     */
    readonly shadowDiffusion: OneDProperty;
}

/**
 * Material options property group for 3D layers controlling surface appearance and lighting interaction.
 * 
 * @remarks
 * Only available for 3D layers (layer.threeDLayer is true).
 * These properties control how the layer surface responds to lights and appears in reflections.
 * Material settings affect the layer's interaction with the 3D environment.
 * 
 * @see https://ae-scripting.docsforadobe.dev/layer/layer/#material-options-group
 */
declare interface _MaterialOptionsGroup extends PropertyGroup {
    /** 
     * Whether the layer casts shadows on other layers.
     * 
     * @remarks
     * Boolean value: true/false
     * - true = layer casts shadows
     * - false = layer does not cast shadows
     * - JavaScript treats as Number (0 = false, 1 = true)
     */
    readonly castsShadows: OneDProperty;
    
    /** 
     * Light transmission through the layer as a percentage.
     * 
     * @remarks
     * Range: 0.0 to 100.0 (0% to 100%)
     * - 0 = opaque to light (blocks all light)
     * - 100 = completely transparent to light
     * - Affects how light passes through semi-transparent areas
     * - JavaScript Number type
     */
    readonly lightTransmission: OneDProperty;
    
    /** 
     * Whether the layer accepts shadows from other layers.
     * 
     * @remarks
     * Boolean value: true/false
     * - true = layer receives shadows
     * - false = layer ignores shadows
     * - JavaScript treats as Number (0 = false, 1 = true)
     */
    readonly acceptsShadows: OneDProperty;
    
    /** 
     * Whether the layer is affected by lights in the composition.
     * 
     * @remarks
     * Boolean value: true/false
     * - true = layer is illuminated by lights
     * - false = layer ignores all lighting
     * - JavaScript treats as Number (0 = false, 1 = true)
     */
    readonly acceptsLights: OneDProperty;
    
    /** 
     * Whether the layer appears in reflections on other 3D layers.
     * 
     * @remarks
     * Boolean value: true/false
     * - true = layer appears in reflections
     * - false = layer is not reflected
     * - JavaScript treats as Number (0 = false, 1 = true)
     */
    readonly appearsInReflections: OneDProperty;
    
    /** 
     * Ambient light reflection as a percentage.
     * 
     * @remarks
     * Range: 0.0 to 100.0 (0% to 100%)
     * - 0 = no ambient reflection (darker in shadowed areas)
     * - 100 = full ambient reflection (maintains brightness)
     * - JavaScript Number type
     */
    readonly ambient: OneDProperty;
    
    /** 
     * Diffuse light reflection as a percentage.
     * 
     * @remarks
     * Range: 0.0 to 100.0 (0% to 100%)
     * - 0 = no diffuse reflection (unaffected by light direction)
     * - 100 = full diffuse reflection (bright when facing lights)
     * - JavaScript Number type
     */
    readonly diffuse: OneDProperty;
    
    /** 
     * Specular highlight intensity as a percentage.
     * 
     * @remarks
     * Range: 0.0 to 100.0 (0% to 100%)
     * - 0 = no specular highlights
     * - 100 = bright specular highlights
     * - Works with shininess to control highlight appearance
     * - JavaScript Number type
     */
    readonly specular: OneDProperty;
    
    /** 
     * Specular highlight focus/size.
     * 
     * @remarks
     * Range: 0.0 to 100.0
     * - 0 = very large, soft highlights
     * - 100 = small, sharp highlights
     * - Controls the tightness of specular reflections
     * - JavaScript Number type
     */
    readonly shininess: OneDProperty;
    
    /** 
     * Metal appearance as a percentage.
     * 
     * @remarks
     * Range: 0.0 to 100.0 (0% to 100%)
     * - 0 = non-metallic appearance
     * - 100 = fully metallic appearance
     * - Affects how reflections and highlights appear
     * - JavaScript Number type
     */
    readonly metal: OneDProperty;
    
    /** 
     * Reflection intensity as a percentage.
     * 
     * @remarks
     * Range: 0.0 to 100.0 (0% to 100%)
     * - 0 = no reflections
     * - 100 = mirror-like reflections
     * - Only visible when other layers have appearsInReflections enabled
     * - JavaScript Number type
     */
    readonly reflectionIntensity: OneDProperty;
    
    /** 
     * Reflection sharpness/focus.
     * 
     * @remarks
     * Range: 0.0 to 100.0
     * - 0 = very blurry reflections
     * - 100 = sharp, clear reflections
     * - Controls the blur amount of reflected imagery
     * - JavaScript Number type
     */
    readonly reflectionSharpness: OneDProperty;
    
    /** 
     * Reflection falloff distance in pixels.
     * 
     * @remarks
     * Range: 0.0 to 1000.0+ pixels
     * - 0 = reflections visible at all distances
     * - Higher values = reflections fade with distance
     * - Controls how quickly reflections diminish over distance
     * - JavaScript Number type
     */
    readonly reflectionRolloff: OneDProperty;
    
    /** 
     * Layer transparency as a percentage.
     * 
     * @remarks
     * Range: 0.0 to 100.0 (0% to 100%)
     * - 0 = completely opaque
     * - 100 = completely transparent
     * - Different from opacity - affects light transmission and refraction
     * - JavaScript Number type
     */
    readonly transparency: OneDProperty;
    
    /** 
     * Transparency falloff distance in pixels.
     * 
     * @remarks
     * Range: 0.0 to 1000.0+ pixels
     * - 0 = uniform transparency
     * - Higher values = transparency varies with distance/angle
     * - Creates realistic transparency effects based on viewing angle
     * - JavaScript Number type
     */
    readonly transparencyRolloff: OneDProperty;
    
    /** 
     * Index of refraction for transparent materials.
     * 
     * @remarks
     * Range: 1.0 to 3.0+ (physical IOR values)
     * - 1.0 = no refraction (air/vacuum)
     * - 1.33 = water
     * - 1.5 = glass
     * - Higher values = more refraction/bending of light
     * - JavaScript Number type
     */
    readonly indexOfRefraction: OneDProperty;
}

/**
 * Text properties group for text layers containing text-specific animation and formatting controls.
 * 
 * @remarks
 * Only available for text layers created with LayerCollection.addText().
 * These properties control text content, path following, advanced options, and text animators.
 * Text animators allow per-character animation of text properties.
 * 
 * @see https://ae-scripting.docsforadobe.dev/layer/textlayer/#text-properties-group
 */
declare interface _TextProperties extends PropertyGroup {
    /** 
     * The source text content and formatting properties.
     * 
     * @remarks
     * This property contains the actual text string and all formatting information.
     * Use TextDocument objects to set rich text formatting.
     * Can be keyframed to animate text content changes.
     * 
     * @see TextDocument for formatting options
     */
    readonly sourceText: TextDocumentProperty;
    
    /** 
     * Path options for text following a mask path.
     * 
     * @remarks
     * Contains properties for:
     * - Path selection (which mask to follow)
     * - Reverse path direction
     * - Perpendicular to path alignment
     * - Force alignment options
     * - First margin and last margin settings
     */
    readonly pathOptions: PropertyGroup;
    
    /** 
     * Advanced text options and behaviors.
     * 
     * @remarks
     * Contains properties for:
     * - Inter-character blending
     * - Fill and stroke options
     * - Anchor point grouping
     * - Grouping alignment
     * - Character offset timing
     */
    readonly moreOptions: PropertyGroup;
    
    /** 
     * Text animators collection for per-character animation.
     * 
     * @remarks
     * Contains multiple animator groups that can independently animate:
     * - Position, rotation, scale per character
     * - Opacity, color, stroke properties
     * - Tracking, line spacing
     * - Blur, skew, and other effects
     * 
     * Each animator has range selectors to control which characters are affected.
     */
    readonly animators: PropertyGroup;
}

// =============================================================================
// LAYER CLASSES
// =============================================================================

/**
 * The Layer object provides access to layers within compositions. It can be accessed from an item's layer collection either by index number or by a name string.
 * 
 * Layer is a subclass of PropertyGroup, which is a subclass of PropertyBase. All methods and attributes of PropertyGroup are available when working with Layer.
 * 
 * Layer is the base class for CameraLayer, LightLayer, and AVLayer objects, so Layer attributes and methods are available when working with all layer types.
 * 
 * @see https://ae-scripting.docsforadobe.dev/layer/layer/
 */
declare class Layer extends PropertyGroup {
    /**
     * Instance property which returns a unique and persistent identification number used internally to identify a Layer between sessions.
     * The value of the ID remains the same when the project is saved to a file and later reloaded.
     * However, when you import this project into another project, new IDs are assigned to all Layers in the imported project.
     * 
     * @since After Effects 22.0 (2022)
     * @readonly
     */
    readonly id: number

    /**
     * The index position of the layer in the layer stack.
     * 
     * @remarks
     * Range: 1 to layerCollection.length (integer values)
     * - 1 = topmost layer in the stack
     * - Higher values = lower in the stack
     * - JavaScript treats as Number but is always a positive integer
     * - Index changes when layers are reordered
     * 
     * @readonly
     */
    readonly index: LayerIndex<number>

    /**
     * The current time of the layer, expressed in composition time (seconds).
     * 
     * @remarks
     * Range: Typically 0.0 to composition.duration (floating-point seconds)
     * - Based on the composition's current time indicator
     * - Independent of layer's in/out points
     * - JavaScript Number type with decimal precision
     * - Updates automatically when composition time changes
     * 
     * @readonly
     */
    readonly time: number

    /**
     * When true, the layer has a video switch (the eyeball icon) in the Timeline panel; otherwise false.
     * 
     * @readonly
     */
    readonly hasVideo: boolean

    /**
     * When true, the layer is active at the current time.
     * 
     * @readonly
     */
    readonly active: boolean

    /**
     * When true, this is a null layer.
     * 
     * @readonly
     */
    readonly nullLayer: boolean

    /**
     * All selected After Effects properties in the layer.
     * 
     * @readonly
     */
    readonly selectedProperties: _PropertyClasses[]

    /**
     * The composition that contains this layer.
     * 
     * @readonly
     */
    readonly containingComp: CompItem

    /**
     * True if the value of the name attribute has been set explicitly, rather than automatically from the source.
     * This always returns true for layers that do not have a source.
     * 
     * @readonly
     */
    readonly isNameSet: boolean

    /**
     * The name of the layer.
     */
    name: string

    /**
     * The parent of this layer. Can be null if the layer has no parent.
     */
    parent: Layer | null

    /**
     * The start time of the layer, expressed in composition time (seconds).
     * 
     * @remarks
     * Range: -10800.0 to 10800.0 seconds (±3 hours)
     * - Negative values place the layer start before composition start
     * - Positive values delay the layer start within the composition
     * - JavaScript Number type with floating-point precision
     * - Setting beyond range limits will clamp to the valid range
     * - Changes affect when the layer becomes active in the timeline
     */
    startTime: TimeRange

    /**
     * The layer's time stretch, expressed as a percentage.
     * 
     * @remarks
     * Range: -9900.0 to 9900.0 (percentage values)
     * - 100 = normal speed (no stretch)
     * - 200 = half speed (2x slower)
     * - 50 = double speed (2x faster)
     * - Negative values = reverse playback
     * - Values between 0 and 1 are clamped to 1
     * - Values between -1 and 0 (excluding 0) are clamped to -1
     * - JavaScript Number type, but must avoid the 0-1 range for positive values
     */
    stretch: number

    /**
     * The "in" point of the layer, expressed in composition time (seconds).
     * 
     * @remarks
     * Range: -10800.0 to 10800.0 seconds (±3 hours)
     * - Defines when the layer content starts playing
     * - Must be less than or equal to outPoint
     * - Independent of startTime (layer can start before its content begins)
     * - JavaScript Number type with floating-point precision
     * - Setting beyond range limits will clamp to the valid range
     */
    inPoint: TimeRange

    /**
     * The "out" point of the layer, expressed in composition time (seconds).
     * 
     * @remarks
     * Range: -10800.0 to 10800.0 seconds (±3 hours)
     * - Defines when the layer content stops playing
     * - Must be greater than or equal to inPoint
     * - Layer is active from inPoint to outPoint
     * - JavaScript Number type with floating-point precision
     * - Setting beyond range limits will clamp to the valid range
     */
    outPoint: TimeRange

    /**
     * When true, the layer is enabled.
     */
    enabled: boolean

    /**
     * When true, the layer is soloed.
     */
    solo: boolean

    /**
     * When true, the layer is shy.
     */
    shy: boolean

    /**
     * When true, the layer is locked. This corresponds to the lock toggle in the Layer panel.
     */
    locked: boolean

    /**
     * A descriptive comment for the layer.
     */
    comment: string

    /**
     * The label color for the layer represented by a numeric identifier.
     * 
     * @remarks
     * Range: 0 to 16 (integer values only)
     * - 0 = None (no label color)
     * - 1-16 = Preset label colors from Labels preferences
     * - Colors correspond to user-defined preferences in Labels panel
     * - Custom label colors cannot be set programmatically
     * - JavaScript treats as Number but must be integer values
     * - Values outside range are clamped to valid range
     * - Used for organization and visual identification in timeline
     */
    label: LabelIndex

    /**
     * The type of automatic orientation to perform for the layer.
     * 
     * One of:
     * - AutoOrientType.ALONG_PATH: Layer faces in the direction of the motion path
     * - AutoOrientType.CAMERA_OR_POINT_OF_INTEREST: Layer always faces the active camera or points at its point of interest
     * - AutoOrientType.CHARACTERS_TOWARD_CAMERA: Each character in a per-character 3D text layer automatically faces the active camera
     * - AutoOrientType.NO_AUTO_ORIENT: Layer rotates freely, independent of any motion path, point of interest, or other layers
     */
    autoOrient: AutoOrientType

    /**
     * Moves this layer to the topmost position of the layer stack (the first layer).
     * 
     * @returns {void} Nothing.
     */
    moveToBeginning(): void

    /**
     * Moves this layer to the bottom position of the layer stack (the last layer).
     * 
     * @returns {void} Nothing.
     */
    moveToEnd(): void

    /**
     * Moves this layer to a position immediately after (below) the specified layer.
     * 
     * @param {Layer} layer - The target layer in the same composition.
     * @returns {void} Nothing.
     */
    moveAfter(layer: Layer): void

    /**
     * Moves this layer to a position immediately before (above) the specified layer.
     * 
     * @param {Layer} layer - The target layer in the same composition.
     * @returns {void} Nothing.
     */
    moveBefore(layer: Layer): void

    /**
     * Duplicates the layer. Creates a new Layer object in which all values are the same as in this one.
     * This has the same effect as selecting a layer in the user interface and choosing Edit > Duplicate.
     * 
     * @returns {Layer} A new Layer object that is a duplicate of this layer.
     */
    duplicate(): Layer

    /**
     * Copies the layer into the specified composition. The original layer remains unchanged.
     * Creates a new Layer object with the same values as this one, and prepends the new object to the LayerCollection object in the target CompItem.
     * This is the same as copying and pasting a layer through the user interface.
     * 
     * @param {CompItem} intoComp - The target composition.
     * @returns {void} Nothing.
     */
    copyToComp(intoComp: CompItem): void

    /**
     * Runs Scene Edit Detection on the layer that the method is called on and returns an array containing the times of any detected scenes.
     * This is the same as selecting a layer in the Timeline and choosing "Layer > Scene Edit Detection".
     * Just as in the UI, doSceneEditDetection will fail and error if called on a non-video layer or a video layer with Time Remapping enabled.
     * 
     * @since After Effects 22.3 (2022)
     * @param {SceneEditDetectionMode} applyOptions - How the detected edits will be applied. One of: MARKERS, SPLIT, SPLIT_PRECOMP, or NONE.
     * @returns {number[]} Array of floating-point values; the times of the detected edit points expressed in composition time.
     */
    doSceneEditDetection(applyOptions: any): number[] // SceneEditDetectionMode to be defined

    /**
     * Returns true if this layer will be active at the specified time.
     * To return true, the layer must be enabled, no other layer may be soloing unless this layer is soloed too,
     * and the time must be between the inPoint and outPoint values of this layer.
     * 
     * @param {number} time - The time in seconds.
     * @returns {boolean} True if the layer is active at the specified time; otherwise false.
     */
    activeAtTime(time: number): boolean

    /**
     * Sets the parent of this layer to the specified layer, without changing the transform values of the child layer.
     * There may be an apparent jump in the rotation, translation, or scale of the child layer,
     * as this layer's transform values are combined with those of its ancestors.
     * 
     * @param {Layer} [newParent] - Optional. A layer in the same composition. If not specified, it sets the parent to None.
     * @returns {void} Nothing.
     */
    setParentWithJump(newParent?: Layer): void

    /**
     * Applies the specified collection of animation settings (an animation preset) to all the currently selected layers of the comp to which the layer belongs.
     * If no layer is selected, it applies the animation preset to a new solid layer.
     * 
     * @param {File} presetName - An ExtendScript File object containing the animation preset.
     * @returns {void} Nothing.
     */
    applyPreset(presetName: File): void

    /**
     * A PropertyGroup object that contains all a layer's markers.
     * Layer marker scripting has the same functionality as Comp markers.
     * 
     * @readonly
     */
    readonly marker: MarkerValueProperty
    
    /**
     * The layer's transform property group, containing properties like position, scale, rotation, etc.
     * 
     * @readonly
     */
    readonly transform: _TransformGroup

    // Transform property shortcuts
    
    /**
     * The layer's anchor point property.
     * 
     * @readonly
     */
    readonly anchorPoint: TwoDOrThreeDProperty
    
    /**
     * The layer's position property.
     * 
     * @readonly
     */
    readonly position: TwoDOrThreeDProperty
    
    /**
     * The layer's X position property.
     * 
     * @readonly
     */
    readonly xPosition: OneDProperty
    
    /**
     * The layer's Y position property.
     * 
     * @readonly
     */
    readonly yPosition: OneDProperty
    
    /**
     * The layer's Z position property.
     * 
     * @readonly
     */
    readonly zPosition: OneDProperty
    
    /**
     * The layer's scale property.
     * 
     * @readonly
     */
    readonly scale: TwoDOrThreeDProperty
    
    /**
     * The layer's 3D orientation property.
     * 
     * @readonly
     */
    readonly orientation: ThreeDProperty
    
    /**
     * The layer's 2D rotation property.
     * 
     * @readonly
     */
    readonly rotation: OneDProperty
    
    /**
     * The layer's X rotation property.
     * 
     * @readonly
     */
    readonly xRotation: OneDProperty
    
    /**
     * The layer's Y rotation property.
     * 
     * @readonly
     */
    readonly yRotation: OneDProperty
    
    /**
     * The layer's Z rotation property.
     * 
     * @readonly
     */
    readonly zRotation: OneDProperty
    
    /**
     * The layer's opacity property.
     * 
     * @readonly
     */
    readonly opacity: OneDProperty
    
    /**
     * The layer's point of interest property (for camera and light layers).
     * 
     * @readonly
     */
    readonly pointOfInterest: ThreeDProperty
}

/**
 * The AVLayer object provides an interface to those layers that contain AVItem objects (composition layers, footage layers, solid layers, text layers, and sound layers).
 */
declare class AVLayer extends Layer {
    /**
     * The source item for this layer.
     * 
     * @readonly
     */
    readonly source: any

    /**
     * When true, the layer has no expressly set name, but contains a named source.
     * 
     * @readonly
     */
    readonly isNameFromSource: boolean

    /**
     * The height of the layer in pixels.
     * 
     * @readonly
     */
    readonly height: number

    /**
     * The width of the layer in pixels.
     * 
     * @readonly
     */
    readonly width: number

    /**
     * When true, it is legal to change the value of collapseTransformation.
     * 
     * @readonly
     */
    readonly canSetCollapseTransformation: boolean

    /**
     * When true, frame blending is enabled.
     * 
     * @readonly
     */
    readonly frameBlending: boolean

    /**
     * When true, it is legal to change the value of timeRemapEnabled.
     * 
     * @readonly
     */
    readonly canSetTimeRemapEnabled: boolean

    /**
     * When true, the layer contains an audio component.
     * 
     * @readonly
     */
    readonly hasAudio: boolean

    /**
     * When true, the layer's audio is active at the current time.
     * 
     * @readonly
     */
    readonly audioActive: boolean

    /**
     * When true, this layer is being used as a track matte for the layer below it.
     * 
     * @readonly
     */
    readonly isTrackMatte: boolean

    /**
     * When true, the layer above is being used as a track matte on this layer.
     * 
     * @readonly
     */
    readonly hasTrackMatte: boolean

    /**
     * Returns the track matte layer for this layer. Returns null if this layer has no track matte layer.
     * 
     * @readonly
     */
    readonly trackMatteLayer: AVLayer | null

    /**
     * When true, the layer's audio is enabled.
     */
    audioEnabled: boolean

    /**
     * When true, the layer's motion blur is enabled.
     */
    motionBlur: boolean

    /**
     * When true, the layer's effects are active.
     */
    effectsActive: boolean

    /**
     * When true, this is an adjustment layer.
     */
    adjustmentLayer: boolean

    /**
     * When true, this is an environment layer.
     */
    environmentLayer: boolean

    /**
     * When true, this is a guide layer.
     */
    guideLayer: boolean

    /**
     * When true, this is a 3D layer.
     */
    threeDLayer: boolean

    /**
     * When true, 3D is set on a per-character basis in this text layer.
     */
    threeDPerChar: boolean

    /**
     * When true, collapse transformation is on.
     */
    collapseTransformation: boolean

    /**
     * The type of frame blending for the layer.
     */
    frameBlendingType: FrameBlendingType

    /**
     * When true, time remapping is enabled on this layer.
     */
    timeRemapEnabled: boolean

    /**
     * The blending mode of the layer.
     */
    blendingMode: BlendingMode

    /**
     * When true, preserve transparency is enabled.
     */
    preserveTransparency: boolean

    /**
     * The layer sampling quality setting.
     */
    samplingQuality: LayerSamplingQuality

    /**
     * If this layer has a track matte, specifies the way the track matte is applied.
     *
     * Legacy API; use `AVLayer.setTrackMatte()` and `AVLayer.removeTrackMatte()` instead.
     *
     * @deprecated since version 23.0.
     */
    trackMatteType: TrackMatteType

    /**
     * The layer quality setting.
     */
    quality: LayerQuality

    /**
     * Reports whether this layer's audio is active at a given time.
     * For the audio to be active, the layer must be audio-enabled and not muted,
     * and the time must be between the inPoint and outPoint of the layer.
     * 
     * @param {number} time - The time in seconds.
     * @returns {boolean} True if the layer's audio is active at the specified time; otherwise false.
     */
    audioActiveAtTime(time: number): boolean

    /**
     * Calculates a transformation from a set of points in this layer.
     * 
     * @param {[number, number, number]} pointTopLeft - The top-left point coordinates as [x, y, z].
     * @param {[number, number, number]} pointTopRight - The top-right point coordinates as [x, y, z].
     * @param {[number, number, number]} pointBottomRight - The bottom-right point coordinates as [x, y, z].
     * @returns {object} An object containing the calculated transformation.
     */
    calculateTransformFromPoints(
        pointTopLeft: [number, number, number],
        pointTopRight: typeof pointTopLeft,
        pointBottomRight: typeof pointTopLeft,
    ): object

    /**
     * Converts layer coordinates to composition coordinates.
     * 
     * @param {[number, number]} point - The layer coordinates as [x, y].
     * @returns {[number, number]} The composition coordinates as [x, y].
     */
    sourcePointToComp(point: [number, number]): [number, number]

    /**
     * Converts composition coordinates to layer coordinates.
     * 
     * @param {[number, number]} point - The composition coordinates as [x, y].
     * @returns {[number, number]} The layer coordinates as [x, y].
     */
    compPointToSource(point: [number, number]): [number, number]

    /**
     * Opens the layer in a Layer panel.
     * 
     * @returns {Viewer | null} The Viewer object for the Layer panel, or null if the layer could not be opened.
     */
    openInViewer(): Viewer | null

    /**
     * Changes the source item for this layer.
     * 
     * @param {AVItem} newSource - The new source AVItem.
     * @param {boolean} fixExpressions - When true, attempts to preserve expression references by adjusting them for the new source.
     * @returns {void} Nothing.
     */
    replaceSource(newSource: AVItem, fixExpressions: boolean): void

    /**
     * Retrieves the source rectangle of a layer at a specified time.
     * 
     * @param {number} timeT - The time in seconds.
     * @param {boolean} extents - When true, includes any effects that extend the layer bounds.
     * @returns {{ top: number; left: number; width: number; height: number }} An object with the rectangle coordinates and dimensions.
     */
    sourceRectAtTime(
        timeT: number,
        extents: boolean,
    ): { top: number; left: number; width: number; height: number }

    /**
     * Adds the layer to the Essential Graphics Panel for the specified composition.
     * 
     * @param {CompItem} comp - The composition for which to add the layer to the Essential Graphics Panel.
     * @returns {boolean} True if the layer was successfully added; otherwise false.
     */
    addToMotionGraphicsTemplate(comp: CompItem): boolean

    /**
     * Adds the layer to the Essential Graphics Panel for the specified composition with a custom name.
     * 
     * @param {CompItem} comp - The composition for which to add the layer to the Essential Graphics Panel.
     * @param {string} name - The custom name for the layer in the Essential Graphics Panel.
     * @returns {boolean} True if the layer was successfully added; otherwise false.
     */
    addToMotionGraphicsTemplateAs(comp: CompItem, name: string): boolean

    /**
     * Returns true if the layer can be added to the Essential Graphics Panel for the specified composition.
     * 
     * @param {CompItem} comp - The composition to check.
     * @returns {boolean} True if the layer can be added to the Essential Graphics Panel; otherwise false.
     */
    canAddToMotionGraphicsTemplate(comp: CompItem): boolean

    /**
     * Removes the track matte for this layer while preserving the TrackMatteType.
     * Use setTrackMatte() with null for another way of removing track matte.
     * 
     * @returns {void} Nothing.
     */
    removeTrackMatte(): void

    /**
     * Sets the track matte layer and type for this layer.
     * Passing in null to trackMatteLayer parameter removes the track matte.
     * Use removeTrackMatte() for another way of removing track matte.
     * 
     * @param {AVLayer | null} trackMatteLayer - The layer to use as a track matte, or null to remove the track matte.
     * @param {TrackMatteType} trackMatteType - The type of track matte to apply.
     * @returns {void} Nothing.
     */
    setTrackMatte(trackMatteLayer: AVLayer | null, trackMatteType: TrackMatteType): void

    // AVLayer property shortcuts
    
    /**
     * The layer's time remap property.
     * 
     * @readonly
     */
    readonly timeRemap: OneDProperty
    
    /**
     * The layer's mask property group.
     * 
     * @readonly
     */
    readonly mask: MaskPropertyGroup
    
    /**
     * The layer's effects property group.
     * 
     * @readonly
     */
    readonly effect: PropertyGroup
    
    /**
     * The layer's layer styles property group.
     * 
     * @readonly
     */
    readonly layerStyle: _LayerStyles
    
    /**
     * The layer's geometry options property group (for 3D layers).
     * 
     * @readonly
     */
    readonly geometryOption: _GeometryOptionsGroup
    
    /**
     * The layer's material options property group (for 3D layers).
     * 
     * @readonly
     */
    readonly materialOption: _MaterialOptionsGroup
    
    /**
     * The layer's audio property group.
     * 
     * @readonly
     */
    readonly audio: _AudioGroup
}

/**
 * The CameraLayer object represents a camera layer within a composition.
 * Create it using the LayerCollection object's addCamera method.
 * 
 * Camera layers are used to create 3D perspective views of compositions containing 3D layers.
 */
declare class CameraLayer extends Layer {
    /**
     * The camera layer's camera options property group, containing properties like zoom, depth of field, etc.
     * 
     * @readonly
     */
    readonly cameraOption: _CameraOptionsGroup
}

/**
 * The LightLayer object represents a light layer within a composition.
 * Create it using the LayerCollection object's addLight method.
 * 
 * Light layers are used to illuminate 3D layers in a composition.
 */
declare class LightLayer extends Layer {
    /**
     * The light layer's light options property group, containing properties like intensity, color, cone angle, etc.
     * 
     * @readonly
     */
    readonly lightOption: _LightOptionsGroup

    /**
     * For light layers, the type of light.
     * One of: LightType.PARALLEL, LightType.SPOT, LightType.POINT, or LightType.AMBIENT.
     */
    lightType: LightType
}

/**
 * The ShapeLayer object represents a shape layer within a composition.
 * Create it using the LayerCollection object's addShape method.
 * 
 * Shape layers contain vector-based shapes and paths that can be animated and styled.
 */
declare class ShapeLayer extends AVLayer {}

/**
 * The TextLayer object represents a text layer within a composition.
 * Create it using the LayerCollection object's addText method.
 * 
 * Text layers contain editable text that can be animated and styled.
 */
declare class TextLayer extends AVLayer {
    /**
     * The source for text layers is always null since text is generated procedurally.
     * 
     * @readonly
     */
    readonly source: null

    /**
     * The text properties group containing all text-related properties.
     * 
     * @readonly
     */
    readonly text: _TextProperties
    
    /**
     * The source text property that contains the actual text content and formatting.
     * 
     * @readonly
     */
    readonly sourceText: TextDocumentProperty
}

/**
 * The ThreeDModelLayer object represents a 3D model layer within a composition.
 * 
 * 3D model layers contain 3D model assets that can be positioned and animated in 3D space.
 * 
 * @since After Effects 2023
 */
declare class ThreeDModelLayer extends AVLayer {}

/**
 * The LayerCollection object represents a set of layers. The LayerCollection belonging to a CompItem object contains all the layer objects for layers in the composition. The methods of the collection object allow you to manipulate the layer list.
 */
declare class LayerCollection extends Collection {
    /**
     * Retrieves a Layer object in the collection by its index number. The first object is at index 1.
     * 
     * @readonly
     */
    readonly [index: number]: Layer

    /**
     * Creates a new AVLayer and adds it to this collection.
     * 
     * @param {AVItem} item - The AVItem to use as the layer source (CompItem, FootageItem, etc.).
     * @param {number} [duration] - Optional. The duration of the layer in seconds.
     * 
     * @remarks
     * Duration parameter:
     * - Range: 0.0 to 10800.0 seconds (3 hours maximum)
     * - If omitted, uses the source item's duration
     * - JavaScript Number type with floating-point precision
     * - Values outside range are clamped to valid range
     * 
     * @returns {AVLayer} The newly created AVLayer.
     */
    add(item: AVItem, duration?: DurationRange): AVLayer

    /**
     * Creates a new, null layer and adds it to this collection.
     * 
     * @param {number} [duration] - Optional. The duration of the layer in seconds.
     * 
     * @remarks
     * Duration parameter:
     * - Range: 0.0 to 10800.0 seconds (3 hours maximum)
     * - Default: Uses composition duration if omitted
     * - JavaScript Number type with floating-point precision
     * - Values outside range are clamped to valid range
     * 
     * @returns {AVLayer} The newly created null layer.
     */
    addNull(duration?: DurationRange): AVLayer

    /**
     * Creates a new layer, a FootageItem with a SolidSource, and adds it to this collection.
     * 
     * @param {ThreeDColorValue} color - The color of the solid as [R, G, B] values.
     * @param {string} name - The name of the solid layer and its source FootageItem.
     * @param {number} width - The width of the solid in pixels.
     * @param {number} height - The height of the solid in pixels.
     * @param {number} pixelAspect - The pixel aspect ratio of the solid.
     * @param {number} [duration] - Optional. The duration of the layer in seconds.
     * 
     * @remarks
     * Parameter constraints:
     * - color: [r, g, b] where each component is 0.0 to 1.0 (floating-point RGB)
     * - name: String, should be unique within project for clarity
     * - width: Range 1 to 30000 pixels (integer values preferred)
     * - height: Range 1 to 30000 pixels (integer values preferred)  
     * - pixelAspect: Range 0.01 to 100.0 (1.0 = square pixels)
     * - duration: Range 0.0 to 10800.0 seconds (if specified)
     * 
     * All numeric parameters are JavaScript Number type but have practical limits.
     * 
     * @returns {AVLayer} The newly created solid layer.
     */
    addSolid(
        color: ThreeDColorValue,
        name: string,
        width: PixelDimension,
        height: PixelDimension,
        pixelAspect: number,
        duration?: DurationRange,
    ): AVLayer

    /**
     * Creates a new vertical text box layer and adds it to this collection.
     * 
     * @param {number} [width] - Optional. The width of the text box in pixels.
     * @param {number} [height] - Optional. The height of the text box in pixels.
     * @returns {TextLayer} The newly created vertical box text layer.
     */
    addVerticalBoxText(width?: PixelDimension, height?: PixelDimension): TextLayer

    /**
     * Creates a new vertical text layer and adds it to this collection.
     * 
     * @param {string} [sourceText] - Optional. The initial text content.
     * @returns {TextLayer} The newly created vertical text layer.
     */
    addVerticalText(sourceText?: string): TextLayer

    /**
     * Creates a new paragraph (box) text layer and adds it to this collection.
     * 
     * @param {[number, number]} size - The size of the text box as [width, height] in pixels.
     * @param {string | TextDocument} [sourceText] - Optional. The initial text content or TextDocument.
     * @returns {TextLayer} The newly created box text layer.
     */
    addBoxText(size: [PixelDimension, PixelDimension], sourceText?: string | TextDocument): TextLayer

    /**
     * Creates a new point text layer and adds it to this collection.
     * 
     * @param {string | TextDocument} [sourceText] - Optional. The initial text content or TextDocument.
     * @returns {TextLayer} The newly created text layer.
     */
    addText(sourceText?: string | TextDocument): TextLayer

    /**
     * Creates a new camera layer and adds it to this collection.
     * 
     * @param {string} name - The name of the camera layer.
     * @param {[number, number]} centerPoint - The center point of the camera as [x, y] coordinates.
     * @returns {CameraLayer} The newly created camera layer.
     */
    addCamera(name: string, centerPoint: [number, number]): CameraLayer

    /**
     * Creates a new light layer and adds it to this collection.
     * 
     * @param {string} name - The name of the light layer.
     * @param {[number, number]} centerPoint - The center point of the light as [x, y] coordinates.
     * @returns {LightLayer} The newly created light layer.
     */
    addLight(name: string, centerPoint: [number, number]): LightLayer

    /**
     * Creates a new shape layer and adds it to this collection.
     * 
     * @returns {ShapeLayer} The newly created shape layer.
     */
    addShape(): ShapeLayer

    /**
     * Retrieves the layer object with a specified name.
     * 
     * @param {string} name - The name of the layer to retrieve.
     * @returns {Layer | null} The layer with the specified name, or null if not found.
     */
    byName(name: string): Layer | null

    /**
     * Collects specified layers into a new composition (pre-compose).
     * 
     * @param {number[]} layerIndicies - An array of layer indices to include in the pre-composition.
     * @param {string} name - The name of the new composition.
     * @param {boolean} [moveAllAttributes] - Optional. When true, moves all attributes into the new composition.
     * @returns {CompItem} The newly created composition containing the specified layers.
     */
    precompose(layerIndicies: number[], name: string, moveAllAttributes?: boolean): CompItem
}

// =============================================================================
// EXPORTS
// =============================================================================

export {
    // Enums
    AutoOrientType,
    BlendingMode,
    FrameBlendingType,
    LayerQuality,
    LayerSamplingQuality,
    LightType,
    TrackMatteType,
    
    // Property Group Interfaces
    _TransformGroup,
    _AudioGroup,
    _CameraOptionsGroup,
    _GeometryOptionsGroup,
    _LayerStyles,
    _LightOptionsGroup,
    _MaterialOptionsGroup,
    _TextProperties,
    
    // Layer Classes
    Layer,
    AVLayer,
    CameraLayer,
    LightLayer,
    ShapeLayer,
    TextLayer,
    ThreeDModelLayer,
    LayerCollection,
};
