using System;
using System.IO;
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
        [HttpGet]
        public FileModel Get([FromQuery]string filePath)
        {
            if (string.IsNullOrEmpty(filePath))
            {
                throw ValidationExceptions.Required(nameof(filePath));
            }

            try
            {
                var fileInfo = new FileInfo(filePath);

                if (!fileInfo.Exists)
                {
                    throw new ApiException("File not found", HttpStatusCode.NotFound);
                }

                return new FileModel(fileInfo);
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
    }
}