using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using WebFileManagerApi.Exceptions;
using WebFileManagerApi.Models;

namespace WebFileManagerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DirectoryController : ControllerBase
    {
        /// <summary>
        /// Gets directory information.
        /// </summary>
        /// <param name="directoryPath">The directory path.</param>
        /// <returns>Returns the directory model.</returns>
        [HttpGet]
        public DirectoryModel Get([FromQuery, Required]string directoryPath)
        {
            try
            {
                var directoryInfo = new DirectoryInfo(directoryPath);
                var directoryModel = new DirectoryModel(directoryInfo);
                directoryModel.LoadContent();
                return directoryModel;
            }
            catch (DirectoryNotFoundException)
            {
                throw new ApiException("Directory not found", HttpStatusCode.NotFound);
            }
        }

        /// <summary>
        /// Deletes directory.
        /// </summary>
        /// <param name="directoryPath">The directory path.</param>
        [HttpDelete]
        public void Delete([FromQuery, Required]string directoryPath)
        {
            bool isRootPath = Path.GetPathRoot(directoryPath) == directoryPath;

            if (isRootPath)
            {
                throw new ApiException("You can not delete the root directory", HttpStatusCode.Forbidden);
            }

            if (!Directory.Exists(directoryPath))
            {
                throw new ApiException("Directory not found", HttpStatusCode.NotFound);
            }

            Directory.Delete(directoryPath, true);
        }

        /// <summary>
        /// Searches directory.
        /// </summary>
        /// <param name="query">The query with directory path.</param>
        /// <returns>Returns an enumeration with directory models.</returns>
        [HttpGet("search")]
        public IEnumerable<DirectoryModel> Search([FromQuery]string query = "/")
        {
            try
            {
                var parentDirectory = query == "/" ? new DirectoryInfo("/") : Directory.GetParent(query);
                return parentDirectory.GetDirectories()
                                      .Select(d => new DirectoryModel(d))
                                      .Where(d => d.Path.StartsWith(query));
            }
            catch { }

            return new List<DirectoryModel>();
        }

        /// <summary>
        /// Renames directory.
        /// </summary>
        /// <param name="directoryPath">The directory path.</param>
        /// <param name="body">These are the parameters for renaming.</param>
        /// <returns>Returns the new directory model.</returns>
        [HttpPut("rename")]
        public DirectoryModel Rename([FromQuery, Required]string directoryPath, RenameParams body)
        {
            bool isRootPath = Path.GetPathRoot(directoryPath) == directoryPath;

            if (isRootPath)
            {
                throw new ApiException("You can not rename the root directory", HttpStatusCode.Forbidden);
            }

            if (body.Name.IndexOfAny(Path.GetInvalidPathChars()) != -1 || body.Name.Contains('/'))
            {
                throw new ApiException("Invalid directory name", HttpStatusCode.BadRequest);
            }

            string destination = Path.Combine(directoryPath, "..", body.Name);
            Directory.Move(directoryPath, destination);
            var directoryInfo = new DirectoryInfo(destination);
            return new DirectoryModel(directoryInfo);
        }
    }
}