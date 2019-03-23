using System.ComponentModel.DataAnnotations;

namespace WebFileManagerApi.Models
{
    /// <summary>
    /// This class is intended to represent the parameters for renaming a file/directory.
    /// </summary>
    public class RenameParams
    {
        /// <summary>
        /// Gets or sets a new name.
        /// </summary>
        /// <value>New name.</value>
        [Required]
        public string Name { get; set; }
    }
}