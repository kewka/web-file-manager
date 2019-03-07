using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using WebFileManagerApi.Utils;

namespace WebFileManagerApi.Models
{
    /// <summary>
    /// This class is intended to represent the directory model.
    /// </summary>
    public class DirectoryModel
    {
        /// <summary>
        /// The directory information.
        /// </summary>
        private DirectoryInfo _info;

        /// <summary>
        /// Gets the directory ID.
        /// </summary>
        public string Id => CommonUtils.GetMd5Hash(Path);
        /// <summary>
        /// Gets the directory name.
        /// </summary>
        /// <value></value>
        public string Name => _info.Name;
        /// <summary>
        /// Gets the directory path.
        /// </summary>
        public string Path => _info.FullName;
        /// <summary>
        /// Gets the directory content.
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public DirectoryContent Content { get; private set; }

        /// <summary>
        /// Initialize a new instance of the <see cref="DirectoryModel" /> class.
        /// </summary>
        /// <param name="info">Directory information.</param>
        public DirectoryModel(DirectoryInfo info)
        {
            this._info = info;
        }

        /// <summary>
        /// Loads directory content.
        /// </summary>
        /// <exception cref="System.IO.DirectoryNotFoundException">Directory not found.</exception>
        /// <exception cref="System.Security.SecurityException">Does not have the required permission.</exception>
        /// <exception cref="System.UnauthorizedAccessException">Does not have the required permission.</exception>
        public void LoadContent()
        {
            this.Content = new DirectoryContent(_info);
        }

        /// <summary>
        /// This class is intended to represent the directory content.
        /// </summary>
        public class DirectoryContent
        {
            /// <summary>
            /// The directories.
            /// </summary>
            public IEnumerable<DirectoryModel> Directories { get; } = new List<DirectoryModel>();
            /// <summary>
            /// The files.
            /// </summary>
            public IEnumerable<FileModel> Files { get; } = new List<FileModel>();

            /// <summary>
            /// Initialize a new instance of the <see cref="DirectoryContent" /> class.
            /// </summary>
            /// <param name="info">Directory information.</param>
            public DirectoryContent(DirectoryInfo info)
            {
                this.Directories = info.GetDirectories().Select(d => new DirectoryModel(d));
                this.Files = info.GetFiles().Select(f => new FileModel(f));
            }
        }
    }
}