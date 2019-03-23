using System;
using System.ComponentModel.DataAnnotations;
using IO = System.IO;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using WebFileManagerApi.Exceptions;
using WebFileManagerApi.Models;

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
    }
}