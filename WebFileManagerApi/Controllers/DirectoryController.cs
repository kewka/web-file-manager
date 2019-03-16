using System;
using System.Collections.Generic;
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
        [HttpGet("")]
        public DirectoryModel Get([FromQuery]string directoryPath)
        {
            if (string.IsNullOrEmpty(directoryPath))
            {
                throw ValidationExceptions.Required(nameof(directoryPath));
            }

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
            catch (ApiException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new ApiException(ex.Message, HttpStatusCode.InternalServerError);
            }
        }

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
            catch
            {
                return new List<DirectoryModel>();
            }
        }

        [HttpDelete("")]
        public void Delete([FromQuery]string directoryPath)
        {
            if (string.IsNullOrEmpty(directoryPath))
            {
                throw ValidationExceptions.Required(nameof(directoryPath));
            }

            if (!Directory.Exists(directoryPath))
            {
                throw new ApiException("Directory not found", HttpStatusCode.NotFound);
            }


            try
            {
                Directory.Delete(directoryPath, true);
            }
            catch (Exception ex)
            {
                throw new ApiException(ex.Message, HttpStatusCode.InternalServerError);
            }
        }

        [HttpPut("rename")]
        public DirectoryModel Rename([FromQuery]string directoryPath, RenameParams body)
        {
            if (string.IsNullOrEmpty(directoryPath))
            {
                throw ValidationExceptions.Required(nameof(directoryPath));
            }
            else if (string.IsNullOrEmpty(body.Name))
            {
                throw ValidationExceptions.Required(nameof(body.Name));
            }

            try
            {
                string destination = Path.Combine(directoryPath, "..", body.Name);
                Directory.Move(directoryPath, destination);
                var directoryInfo = new DirectoryInfo(destination);
                return new DirectoryModel(directoryInfo);
            }
            catch (Exception ex)
            {
                throw new ApiException(ex.Message, HttpStatusCode.InternalServerError);
            }
        }

        public class RenameParams
        {
            public string Name { get; set; }
        }
    }
}