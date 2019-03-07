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
    public class DirectoryController : ControllerBase
    {
        [HttpGet]
        public DirectoryModel Get([FromQuery]string directoryPath)
        {
            if (string.IsNullOrEmpty(directoryPath))
            {
                throw new ApiException("directoryPath is required.", HttpStatusCode.UnprocessableEntity);
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
    }
}