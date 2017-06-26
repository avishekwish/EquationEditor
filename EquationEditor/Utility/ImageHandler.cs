using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace EquationEditor.Utility
{
    public class ImageHandler
    {
        public static void SaveImageFile(string imageData, long equationId)
        {
            if (Convert.ToBoolean(ConfigurationManager.AppSettings["SAVEDATA"]))
            {
                var base64Data = Regex.Match(imageData, @"data:image/(?<type>.+?),(?<data>.+)").Groups["data"].Value;
                string virtualpath = "../../" + ConfigurationManager.AppSettings["IMAGEFOLDER"];
                string path = HttpContext.Current.Server.MapPath(virtualpath);
                string bmpfilePath = Path.Combine(path, string.Concat(equationId, ".bmp"));

                var binData = Convert.FromBase64String(base64Data);
                using (var stream = new MemoryStream(binData))
                {
                    var image = new Bitmap(stream);
                    image.Save(bmpfilePath);
                }

            }
        }
    }
}