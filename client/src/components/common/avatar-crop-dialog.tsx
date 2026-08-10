"use client";

import { useCallback, useState } from "react";
import Cropper, { Area } from "react-easy-crop";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AppDialog } from "./dialogBox";
import { getCroppedImage } from "./image-utils";

interface AvatarCropperProps {
  open: boolean;
  image: string;
  fileName: string;
  onCancel: () => void;
  onComplete: (file: File) => void;
}

export function AvatarCropper({
  open,
  image,
  fileName,
  onCancel,
  onComplete,
}: AvatarCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const handleCropComplete = useCallback(
    (_croppedArea: Area, croppedPixels: Area) => {
      setCroppedAreaPixels(croppedPixels);
    },
    [],
  );

  const handleConfirm = async () => {
    if (!croppedAreaPixels) {
      return;
    }

    try {
      const croppedFile = await getCroppedImage(
        image,
        croppedAreaPixels,
        fileName,
      );

      onComplete(croppedFile);
    } catch {
      onCancel();
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      onCancel();
    }
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={handleOpenChange}
      title="Adjust profile picture"
      description="Move and zoom the image until it fits the circle."
      width="md"
    >
      <div className="space-y-6">
        <div className="relative mx-auto h-80 w-full max-w-md overflow-hidden rounded-xl bg-black">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="avatar-zoom">Zoom</Label>

            <span className="text-sm text-muted-foreground">
              {zoom.toFixed(1)}x
            </span>
          </div>

          <input
            id="avatar-zoom"
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(event) => setZoom(Number(event.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>

          <Button type="button" onClick={handleConfirm}>
            Use photo
          </Button>
        </div>
      </div>
    </AppDialog>
  );
}
