using System.Diagnostics;
using System.IO;
using WebFileManagerApi.Utils;

namespace WebFileManagerApi.Models
{
    /// <summary>
    /// This class is intended to represent the drive model.
    /// </summary>
    public class DriveModel
    {
        /// <summary>
        /// Gets the drive ID.
        /// </summary>
        public string Id
        {
            get
            {
                string hashPayload = string.Format("{0}{1}{2}", Label, Name, (int)Type);
                return CommonUtils.GetMd5Hash(hashPayload);
            }
        }
        /// <summary>
        /// Gets the drive label.
        /// </summary>
        public string Label { get; }
        /// <summary>
        /// Gets the drive name.
        /// </summary>
        public string Name { get; }
        /// <summary>
        /// Gets the drive type.
        /// </summary>
        public DriveType Type { get; }
        /// <summary>
        /// Gets the drive format.
        /// </summary>
        public string Format { get; }
        /// <summary>
        /// Gets a value that indicates whether a drive is ready.
        /// </summary>
        public bool IsReady { get; }
        /// <summary>
        /// Gets the amount of available free space on a drive, in bytes.
        /// </summary>
        public long Available { get; }
        /// <summary>
        /// Gets the total size of the drive, in bytes.
        /// </summary>
        public long Total { get; }
        /// <summary>
        /// Initialize a new instance of the <see cref="DriveModel" /> class.
        /// </summary>
        /// <param name="info">Drive information.</param>
        public DriveModel(DriveInfo info)
        {
            IsReady = info.IsReady;
            Label = IsReady ? info.VolumeLabel : null;
            Name = info.Name;
            Type = info.DriveType;
            Format = IsReady ? info.DriveFormat : null;
            Available = IsReady ? info.AvailableFreeSpace : 0;
            Total = IsReady ? info.TotalSize : 0;
        }
    }
}