using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using WebFileManagerApi.Exceptions;
using WebFileManagerApi.Models;

namespace WebFileManagerApi.Controllers
{
    [Route("services/[controller]")]
    public class DownloadController : ControllerBase
    {
        // GET /download/directory
        [HttpGet("directory")]
        public IActionResult Get([FromQuery, Required]string directoryPath)
        {
            var directoryInfo = new DirectoryInfo(directoryPath);

            try
            {
                // Create zip archive in memory
                using (var stream = new MemoryStream())
                {
                    using (var archive = new ZipArchive(stream, ZipArchiveMode.Create, true))
                    {
                        foreach (var file in directoryInfo.GetFiles("*.*", SearchOption.AllDirectories))
                        {
                            string entryName = file.FullName.Substring(directoryInfo.FullName.Length + 1);
                            archive.CreateEntryFromFile(file.FullName, entryName, CompressionLevel.Fastest);
                        }
                    }

                    stream.Position = 0;

                    // Send zip archive
                    return File(stream.ToArray(), "application/zip", directoryInfo.Name + ".zip");
                }
            }
            catch
            {
                throw new ApiException("Could not download directory", HttpStatusCode.InternalServerError);
            }
        }

        // GET /download/file
        [HttpGet("file")]
        public ActionResult DownloadFile([FromQuery, Required]string filePath)
        {
            try
            {
                return PhysicalFile(filePath, "application/octet-stream", Path.GetFileName(filePath));
            }
            catch
            {
                throw new ApiException("Could not download file", HttpStatusCode.InternalServerError);
            }
        }
    }
}