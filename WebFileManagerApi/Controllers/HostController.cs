using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebFileManagerApi.Models;

namespace WebFileManagerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HostController : ControllerBase
    {
        /// <summary>
        /// Gets host information.
        /// </summary>
        /// <returns>Returns the host model.</returns>
        [HttpGet]
        public ActionResult<HostModel> Get() => new HostModel();
    }
}
