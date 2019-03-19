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
        // GET /drives
        [HttpGet]
        public IEnumerable<DriveModel> Get()
        {
            return DriveInfo.GetDrives().Select(d => new DriveModel(d));
        }
    }
}
