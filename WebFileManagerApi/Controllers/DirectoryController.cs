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
        // GET /directory
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

        // DELETE /directory
        [HttpDelete]
        public void Delete([FromQuery, Required]string directoryPath)
        {
            if (!Directory.Exists(directoryPath))
            {
                throw new ApiException("Directory not found", HttpStatusCode.NotFound);
            }

            Directory.Delete(directoryPath, true);
        }

        // GET /directory/search
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

        // PUT /directory/rename
        [HttpPut("rename")]
        public DirectoryModel Rename([FromQuery, Required]string directoryPath, RenameParams body)
        {
            string destination = Path.Combine(directoryPath, "..", body.Name);
            Directory.Move(directoryPath, destination);
            var directoryInfo = new DirectoryInfo(destination);
            return new DirectoryModel(directoryInfo);
        }

        public class RenameParams
        {
            [Required]
            public string Name { get; set; }
        }
    }
}