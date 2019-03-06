using System;
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
        /// Gets the system time of the host.
        /// </summary>
        [JsonConverter(typeof(UnixDateTimeConverter))]
        public DateTime Time => DateTime.Now;
    }
}