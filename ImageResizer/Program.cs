using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;

namespace ResizeImages
{
	class Program
    {
        static void Main(string[] args)
        {
            var encoder = ImageCodecInfo.GetImageEncoders().First(c => c.FormatID == ImageFormat.Jpeg.Guid);
            var encParams = new EncoderParameters() { Param = new[] { new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, 90L) } };

			var directories = Directory.GetDirectories(@"C:\Users\tim\Desktop\PhotoWall");
			var directoryIndex = 0;
			foreach(var directory in directories)
			{
				directoryIndex++;

				var files = Directory.GetFiles(directory, "*.jpg");
				var fileIndex = 0;
				foreach (var imagePath in files)
				{
					var fileName = Path.GetFileName(imagePath);
					Console.WriteLine($"File {fileIndex++}/{files.Length} - Directory {directoryIndex}/{directories.Length} - Processing {fileName}");

					var saveDirectory = Path.Combine(@"C:\Users\tim\Desktop\PhotoWall_small", new DirectoryInfo(directory).Name);
					if (!Directory.Exists(saveDirectory))
					{
						Directory.CreateDirectory(saveDirectory);
					}

					using (var image = Image.FromFile(imagePath))
					using (var newImage = ScaleImage(image))
					{
						newImage.Save(
							Path.Combine(saveDirectory, fileName),
							encoder,
							encParams);
					}
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
