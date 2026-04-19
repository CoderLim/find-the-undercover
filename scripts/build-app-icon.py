#!/usr/bin/env python3
"""Crop the generated icon artwork to a square and export 144x144 / 288x288 PNGs.

The source image has the icon embedded inside a wider decorative canvas.
We locate the icon's rounded square by finding pixels that are darker than
the cream background, expand to a square with small padding, then downsample.
"""

from pathlib import Path

from PIL import Image, ImageOps

SRC = Path(
    "/Users/coderlim/.cursor/projects/Users-coderlim-Projects-find-the-undercover/assets/app-icon.png"
)
OUT_DIR = Path(__file__).resolve().parent.parent / "assets"
OUT_DIR.mkdir(parents=True, exist_ok=True)


def find_icon_bbox(image: Image.Image) -> tuple[int, int, int, int]:
    """Return (left, top, right, bottom) of the icon by luminance threshold."""
    gray = image.convert("L")
    w, h = gray.size
    px = gray.load()

    threshold = 200  # anything darker than this counts as "icon content"

    left, top = w, h
    right, bottom = 0, 0
    for y in range(h):
        for x in range(w):
            if px[x, y] < threshold:
                if x < left:
                    left = x
                if x > right:
                    right = x
                if y < top:
                    top = y
                if y > bottom:
                    bottom = y

    if right <= left or bottom <= top:
        raise RuntimeError("Could not detect icon region.")

    return left, top, right + 1, bottom + 1


def expand_to_square(
    bbox: tuple[int, int, int, int],
    image_size: tuple[int, int],
    padding: float = 0.04,
) -> tuple[int, int, int, int]:
    left, top, right, bottom = bbox
    w, h = image_size
    bw = right - left
    bh = bottom - top
    side = max(bw, bh)
    side = int(side * (1 + padding))

    cx = (left + right) // 2
    cy = (top + bottom) // 2
    half = side // 2

    new_left = max(0, cx - half)
    new_top = max(0, cy - half)
    new_right = min(w, new_left + side)
    new_bottom = min(h, new_top + side)

    # If we hit the boundary, shift back to preserve the side length when possible
    if new_right - new_left < side:
        new_left = max(0, new_right - side)
    if new_bottom - new_top < side:
        new_top = max(0, new_bottom - side)

    return new_left, new_top, new_right, new_bottom


def main() -> None:
    image = Image.open(SRC).convert("RGBA")
    w, h = image.size

    # Manual bbox of the generated icon, measured from the 1376x768 artwork.
    # The rounded-square body plus magnifying glass visually sit in this
    # square region, centered on the combined composition's centroid.
    ICON_CX = 600
    ICON_CY = 390
    ICON_SIDE = 680

    half = ICON_SIDE // 2
    new_left = max(0, ICON_CX - half)
    new_top = max(0, ICON_CY - half)
    new_right = min(w, new_left + ICON_SIDE)
    new_bottom = min(h, new_top + ICON_SIDE)
    if new_right - new_left < ICON_SIDE:
        new_left = max(0, new_right - ICON_SIDE)
    if new_bottom - new_top < ICON_SIDE:
        new_top = max(0, new_bottom - ICON_SIDE)

    cropped = image.crop((new_left, new_top, new_right, new_bottom))
    square_side = min(cropped.size)
    if cropped.size != (square_side, square_side):
        cropped = ImageOps.fit(cropped, (square_side, square_side), method=Image.LANCZOS)

    outputs = {
        "app-icon-144.png": 144,
        "app-icon-288.png": 288,
        "app-icon.png": 144,  # overwrite the raw artwork with the final 144x144
    }

    for name, target in outputs.items():
        resized = cropped.resize((target, target), resample=Image.LANCZOS)
        path = OUT_DIR / name
        resized.save(path, format="PNG", optimize=True)
        print(f"wrote {path}  {target}x{target}  {path.stat().st_size/1024:.1f} KB")


if __name__ == "__main__":
    main()
