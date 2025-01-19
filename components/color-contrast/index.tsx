"use client";

import { useState, useCallback, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import {
  getBorderColor,
  // copyToClipboard,
  hexToRgba,
  rgbaToHex,
} from "@/lib/colorUtils";
// import { ConfettiButton } from "@/components/ui/confetti";
import FlipText from "../ui/flip-text";

function calculateContrastRatio(background: string, text: string): number {
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const getLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const bg = hexToRgb(background);
  const fg = hexToRgb(text);

  if (!bg || !fg) return 1;

  const L1 = getLuminance(bg.r, bg.g, bg.b);
  const L2 = getLuminance(fg.r, fg.g, fg.b);

  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

function suggestBetterColors(backgroundColor: string, textColor: string) {
  const contrastRatio = calculateContrastRatio(backgroundColor, textColor);
  if (contrastRatio >= 4.5) {
    return null;
  }

  const invertColor = (hex: string) => {
    return (
      "#" +
      (0xffffff ^ parseInt(hex.substring(1), 16)).toString(16).padStart(6, "0")
    );
  };

  const newBg = invertColor(backgroundColor);
  const newText = invertColor(textColor);

  return { backgroundColor: newBg, textColor: newText };
}

export function ColorContrast() {
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [textColor, setTextColor] = useState("#000000");
  const [bgOpacity, setBgOpacity] = useState(1);
  const [textOpacity, setTextOpacity] = useState(1);
  const [previewStyle, setPreviewStyle] = useState({
    backgroundColor: "rgba(255, 255, 255, 1)",
    color: "rgba(0, 0, 0, 1)",
  });
  const [contrastRatio, setContrastRatio] = useState(21);
  const [suggestedColors, setSuggestedColors] = useState<{
    backgroundColor: string;
    textColor: string;
  } | null>(null);

  const handleColorChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, isBackground: boolean) => {
      const { value } = e.target;
      if (isBackground) {
        setBackgroundColor(value);
      } else {
        setTextColor(value);
      }
    },
    []
  );

  // const handleOpacityChange = useCallback(
  //   (value: number, isBackground: boolean) => {
  //     if (isBackground) {
  //       setBgOpacity(value);
  //     } else {
  //       setTextOpacity(value);
  //     }
  //   },
  //   []
  // );

  const handleApplyColors = useCallback(() => {
    const bgRgba = hexToRgba(backgroundColor, bgOpacity);
    const textRgba = hexToRgba(textColor, textOpacity);
    const ratio = calculateContrastRatio(backgroundColor, textColor);
    setContrastRatio(ratio);

    if (ratio < 4.5) {
      const suggested = suggestBetterColors(backgroundColor, textColor);
      setSuggestedColors(suggested);
      return;
    }

    setSuggestedColors(null);
    setPreviewStyle({
      backgroundColor: bgRgba,
      color: textRgba,
    });
  }, [backgroundColor, textColor, bgOpacity, textOpacity]);

  const applySuggestedColors = useCallback(() => {
    if (suggestedColors) {
      setBackgroundColor(suggestedColors.backgroundColor);
      setTextColor(suggestedColors.textColor);
      setBgOpacity(1);
      setTextOpacity(1);
      setPreviewStyle({
        backgroundColor: suggestedColors.backgroundColor,
        color: suggestedColors.textColor,
      });
      setSuggestedColors(null);
      setContrastRatio(
        calculateContrastRatio(
          suggestedColors.backgroundColor,
          suggestedColors.textColor
        )
      );
    }
  }, [suggestedColors]);

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>, isBackground: boolean) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text");
      const { hex, opacity } = rgbaToHex(pastedText);
      if (isBackground) {
        setBackgroundColor(hex);
        setBgOpacity(opacity);
      } else {
        setTextColor(hex);
        setTextOpacity(opacity);
      }
    },
    []
  );

  return (
    <div className="space-y-6">
      <FlipText
      className="tracking-tighter text-4xl font-semibold"
      word="Color Contrast Checker"
       />
      {/* <h2 className="text-2xl font-semibold mb-4">Color Contrast Checker</h2> */}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="backgroundColor">Background Color:</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="backgroundColor"
              type="color"
              value={backgroundColor}
              onChange={(e) => handleColorChange(e, true)}
              onPaste={(e) => handlePaste(e, true)}
              className="h-10 w-1/3"
              aria-label="Background color input"
            />
            <Input
              id="backgroundColor"
              type="text"
              value={backgroundColor}
              onChange={(e) => handleColorChange(e, true)}
              onPaste={(e) => handlePaste(e, true)}
              className="w-2/3"
              aria-label="Background color input"
            />
          </div>
          {/* <Label htmlFor="bgOpacity">Background Opacity:</Label> */}
          {/* <Slider
            id="bgOpacity"
            min={0}
            max={1}
            step={0.01}
            value={[bgOpacity]}
            onValueChange={(value) => handleOpacityChange(value[0], true)}
          /> */}
        </div>

        <div className="space-y-2">
          <Label htmlFor="textColor">Text Color:</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="textColor"
              type="color"
              value={textColor}
              onChange={(e) => handleColorChange(e, false)}
              onPaste={(e) => handlePaste(e, false)}
              className="h-10 w-1/3"
              aria-label="Text color input"
            />
            <Input
              id="textColor"
              type="text"
              value={textColor}
              onChange={(e) => handleColorChange(e, false)}
              onPaste={(e) => handlePaste(e, false)}
              className="w-2/3"
              aria-label="Text color input"
            />
          </div>
          {/* <Label htmlFor="textOpacity">Text Opacity:</Label> */}
          {/* <Slider
            id="textOpacity"
            min={0}
            max={1}
            step={0.01}
            value={[textOpacity]}
            onValueChange={(value) => handleOpacityChange(value[0], false)}
          /> */}
        </div>
        <Button aria-label="Apply colors" onClick={handleApplyColors} className="w-full" size="lg">
            Apply Colors
          </Button>
        {/* <ConfettiButton  onClick={handleApplyColors}  className="w-full">
         apply
       
        </ConfettiButton> */}
        {/* <ConfettiButton className="w-full">Apply Colors 🎉</ConfettiButton> */}

        {suggestedColors && (
          <div className="space-y-4">
            <Alert variant="destructive">
              <InfoIcon className="h-4 w-4" />
              <AlertDescription>
                The selected colors have insufficient contrast (
                {contrastRatio.toFixed(2)}:1). Click below to use suggested
                accessible colors.
              </AlertDescription>
            </Alert>

            <div
              className="p-4 rounded-md min-h-[100px] text-center flex flex-col items-center justify-center mb-4"
              style={{
                backgroundColor: suggestedColors.backgroundColor,
                color: suggestedColors.textColor,
                borderColor: getBorderColor(suggestedColors.backgroundColor),
              }}
            >
              <p className="text-lg font-medium mb-2">
                Suggested Colors Preview
              </p>
              <div className="flex space-x-2">
                {/* <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    copyToClipboard(suggestedColors.backgroundColor)
                  }
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy BG
                </Button> */}
                {/* <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(suggestedColors.textColor)}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Text
                </Button> */}
              </div>
            </div>

            <Button
              onClick={applySuggestedColors}
              className="w-full"
              variant="secondary"
            >
              Use Suggested Colors
            </Button>
          </div>
        )}

        {!suggestedColors && (
          <>
            <div
              className="p-4 rounded-md min-h-[100px] text-center flex flex-col items-center justify-center border"
              style={{
                ...previewStyle,
                borderColor: getBorderColor(backgroundColor),
              }}
            >
              <p className="text-lg font-medium mb-2">Preview Text</p>
              <div className="flex space-x-2">
                {/* <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(previewStyle.backgroundColor)}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy BG
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(previewStyle.color)}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Text
                </Button> */}
              </div>
            </div>

            <Alert className="flex items-center mt-16">
              <InfoIcon className="h-4 w-4" />
              <AlertDescription>
                Current contrast ratio: {contrastRatio.toFixed(2)}:1
              </AlertDescription>
            </Alert>
          </>
        )}
      </div>
    </div>
  );
}
