using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;

namespace ResizeImages
{
    class Program
    {
        static void Main(string[] args)
        {
            var encoder = ImageCodecInfo.GetImageEncoders().First(c => c.FormatID == ImageFormat.Jpeg.Guid);
            var encParams = new EncoderParameters() { Param = new[] { new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, 90L) } };

            var files = Directory.GetFiles(@"C:\Users\Timdows\ownCloud\Fotos\2012 @ Camera", "*.jpg");
            var current = 0;
            foreach (var imagePath in files)
            {
                var fileName = Path.GetFileName(imagePath);
                Console.WriteLine($"{current++}/{files.Length} - Processing {fileName}");

                using (var image = Image.FromFile(imagePath))
                using (var newImage = ScaleImage(image))
                {
                    newImage.Save(
                        Path.Combine(@"C:\Users\Timdows\ownCloud\Fotos\test", fileName), 
                        encoder, 
                        encParams);
                }
            }
        }

        public static Image ScaleImage(Image image)
        {
            var maxSize = 2000;

            var ratioX = (double)maxSize / image.Width;
            var ratioY = (double)maxSize / image.Height;
            var ratio = Math.Min(ratioX, ratioY);

            var newWidth = (int)(image.Width * ratio);
            var newHeight = (int)(image.Height * ratio);

            var newImage = new Bitmap(newWidth, newHeight);

            using (var graphics = Graphics.FromImage(newImage))
            {
                graphics.DrawImage(image, 0, 0, newWidth, newHeight);
            }

            return newImage;
        }
    }
}
