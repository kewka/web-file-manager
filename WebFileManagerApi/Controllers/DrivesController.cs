using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebFileManagerApi.Exceptions;
using WebFileManagerApi.Models;

namespace WebFileManagerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrivesController : ControllerBase
    {
        /// <summary>
        /// Gets a list of drives.
        /// </summary>
        /// <returns>Returns an enumeration with drive models.</returns>
        [HttpGet]
        public IEnumerable<DriveModel> Get()
        {
            return DriveInfo.GetDrives().Select(d => new DriveModel(d));
        }
    }
}
