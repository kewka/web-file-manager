using System.IO;
using WebFileManagerApi.Utils;

namespace WebFileManagerApi.Models
{
    /// <summary>
    /// This class is intended to represent the file model.
    /// </summary>
    public class FileModel
    {
        /// <summary>
        /// The file info.
        /// </summary>
        private FileInfo _info;

        /// <summary>
        /// Gets the file ID.
        /// </summary>
        public string Id => CommonUtils.GetMd5Hash(Path);
        /// <summary>
        /// Gets the file name.
        /// </summary>
        public string Name => _info.Name;
        /// <summary>
        /// Gets the file extension.
        /// </summary>
        public string Ext => _info.Extension;
        /// <summary>
        /// Gets the file path.
        /// </summary>
        public string Path => _info.FullName;
        /// <summary>
        /// Gets the file size, in bytes.
        /// </summary>
        public long Size => _info.Length;

        /// <summary>
        /// Initialize a new instance of the <see cref="FileModel" /> class.
        /// </summary>
        /// <param name="info">File information.</param>
        public FileModel(FileInfo info)
        {
            this._info = info;
        }
    }
}