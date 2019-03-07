using System.Security.Cryptography;
using System.Text;

namespace WebFileManagerApi.Utils
{
    public static class CommonUtils
    {
        public static string GetMd5Hash(string value)
        {
            using (MD5 md5 = MD5.Create())
            {
                byte[] data = md5.ComputeHash(Encoding.Default.GetBytes(value));
                var builder = new StringBuilder();

                for (int i = 0; i < data.Length; i++)
                {
                    builder.Append(data[i].ToString("x2"));
                }

                return builder.ToString();
            }
        }
    }
}