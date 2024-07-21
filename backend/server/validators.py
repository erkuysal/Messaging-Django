from django.core.exceptions import ValidationError

from PIL import Image
import os


def validate_icon_image_size(image):
    if image:
        with (Image.open(image) as img):
            if img.width > 70 or img.height > 70:
                raise ValidationError(
                    f"Icon image size should be 70x70 pixels. Uploaded size is {img.width}x{img.height} pixels."
                )


def validate_image_file_extension(ext):
    value = os.path.splitext(ext.name)[1]
    valid_extensions = [".jpg", ".jpeg", ".png", ".gif"]
    if not value.lower() in valid_extensions:
        raise ValidationError(f"Unsupported file extension. Supported extensions are {valid_extensions}.")
