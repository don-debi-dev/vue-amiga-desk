import os
import argparse
from PIL import Image

class Pixelator:

    ARGS = None

    @classmethod
    def set_global_args(cls, args):
        cls.ARGS = args

    @classmethod
    def log_progress(cls, message):
        if not cls.ARGS.silent:
            print(message)

    def pixelate_image(image_path, pixel_width, output_dir):

        source_image = Image.open(image_path)    
        image_size = source_image.size[0] # This is x (width)

        source_pixels = source_image.load()
        result_image = Image.new(mode="RGBA", size=source_image.size)
        result_pixels = result_image.load()

        Pixelator.log_progress(f"Pixelating {os.path.basename(image_path)}")
        
        for y in range(image_size):
            for x in range(image_size):
                result_pixels[x, y] = source_pixels[x // pixel_width * pixel_width, y // pixel_width * pixel_width]

        filename = f"{os.path.basename(image_path)}"
        save_path = os.path.join(output_dir, filename)
        result_image.save(save_path, format=source_image.format)

        Pixelator.log_progress(f"Success pixelating image {os.path.basename(image_path)}")


    def arg_parser():
        parser = argparse.ArgumentParser(
            description="Pixelates directory of images using Pillow"
        )

        parser.add_argument(
            "--input-path",
            required=True,
            help="Path to images directory (input)"
        )

        parser.add_argument(
            "--pixel-width",
            type=int,
            default=8,
            help="Pixel width size (default: 8)"
        )

        parser.add_argument(
            "--output-dir",
            default="pixelated",
            help="Output directory (default: /pixelated)"
        )

        parser.add_argument(
            "--silent",
            action="store_true",
            help="Silent (no logs)"
        )

        args = parser.parse_args()

        Pixelator.set_global_args(args)


    def file_loader():
        images_path = Pixelator.ARGS.input_path
        pixel_width = Pixelator.ARGS.pixel_width
        output_dir = os.path.join(images_path, Pixelator.ARGS.output_dir)

        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
            Pixelator.log_progress(f"Created directory: {output_dir}")

        images = [i for i in os.listdir(images_path) if i.endswith(('.png', '.jpg', '.jpeg'))]

        if not images:
            Pixelator.log_progress(f"No images found in directory {images_path}")
            return

        for img in images:
            image_path = os.path.join(images_path, img)
            Pixelator.pixelate_image(image_path, pixel_width, output_dir)

        Pixelator.log_progress("All images pixelated successfully!")


def main():
    Pixelator.arg_parser()
    Pixelator.file_loader()


if __name__ == "__main__":
    main()
