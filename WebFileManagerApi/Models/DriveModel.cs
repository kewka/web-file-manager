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
        /// The drive info.
        /// </summary>
        private DriveInfo _info;

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
        public string Label => IsReady ? _info.VolumeLabel : null;
        /// <summary>
        /// Gets the drive name.
        /// </summary>
        public string Name => _info.Name;
        /// <summary>
        /// Gets the drive type.
        /// </summary>
        public DriveType Type => _info.DriveType;
        /// <summary>
        /// Gets the drive format.
        /// </summary>
        public string Format => IsReady ? _info.DriveFormat : null;
        /// <summary>
        /// Gets a value that indicates whether a drive is ready.
        /// </summary>
        public bool IsReady => _info.IsReady;
        /// <summary>
        /// Gets the amount of available free space on a drive, in bytes.
        /// </summary>
        public long Available => IsReady ? _info.AvailableFreeSpace : 0;
        /// <summary>
        /// Gets the total size of the drive, in bytes.
        /// </summary>
        public long Total => IsReady ? _info.TotalSize : 0;
        /// <summary>
        /// Initialize a new instance of the <see cref="DriveModel" /> class.
        /// </summary>
        /// <param name="info">Drive information.</param>
        public DriveModel(DriveInfo info)
        {
            _info = info;
        }
    }
}