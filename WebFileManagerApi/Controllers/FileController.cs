using System;
using System.ComponentModel.DataAnnotations;
using IO = System.IO;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using WebFileManagerApi.Exceptions;
using WebFileManagerApi.Models;
using System.Linq;

namespace WebFileManagerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        // GET /file
        [HttpGet]
        public FileModel Get([FromQuery, Required]string filePath)
        {
            var fileInfo = new IO.FileInfo(filePath);

            if (!fileInfo.Exists)
            {
                throw new ApiException("File not found", HttpStatusCode.NotFound);
            }

            return new FileModel(fileInfo);
        }

        // DELETE /file
        [HttpDelete]
        public void Delete([FromQuery, Required]string filePath)
        {
            if (!IO.File.Exists(filePath))
            {
                throw new ApiException("File not found", HttpStatusCode.NotFound);
            }

            IO.File.Delete(filePath);
        }

        // PUT /file/rename
        [HttpPut("rename")]
        public FileModel Rename([FromQuery, Required]string filePath, RenameParams body)
        {
            var invalidChars = IO.Path.GetInvalidFileNameChars();

            if (body.Name.IndexOfAny(invalidChars) != -1)
            {
                throw new ApiException("Invalid file name", HttpStatusCode.BadRequest);
            }

            string destination = IO.Path.Combine(filePath, "..", body.Name);
            IO.File.Move(filePath, destination);
            var fileInfo = new IO.FileInfo(destination);
            return new FileModel(fileInfo);
        }
    }
}