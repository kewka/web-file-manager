using System;
using System.Runtime.InteropServices;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace WebFileManagerApi.Models
{
    /// <summary>
    /// This class is intended to represent the host model.
    /// </summary>
    public class HostModel
    {
        /// <summary>
        /// Gets the host name.
        /// </summary>
        public string Name => Environment.MachineName;
        /// <summary>
        /// Gets the host platform.
        /// </summary>
        public string Platform
        {
            get
            {
                if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
                {
                    return "Linux";
                }
                else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
                {
                    return "OSX";
                }
                else if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
                {
                    return "Windows";
                }
                else
                {
                    return "Unknown";
                }
            }
        }
        /// <summary>
        /// Gets the system time of the host.
        /// </summary>
        [JsonConverter(typeof(UnixDateTimeConverter))]
        public DateTime Time => DateTime.Now;
    }
}