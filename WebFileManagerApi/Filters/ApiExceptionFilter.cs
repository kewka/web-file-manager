using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WebFileManagerApi.Exceptions;

namespace WebFileManagerApi.Filters
{
    /// <summary>
    /// This class is intended to handle API exceptions <see cref="ApiException"/>.
    /// </summary>
    public class ApiExceptionFilter : IExceptionFilter
    {
        /// <summary>
        /// Method for handling exceptions.
        /// </summary>
        /// <param name="context">Exception context.</param>
        public void OnException(ExceptionContext context)
        {
            if (context.Exception is ApiException exception)
            {
                context.HttpContext.Response.StatusCode = exception.Status;
                context.Result = new JsonResult(new
                {
                    exception.Message
                });
                context.ExceptionHandled = true;
            }
        }
    }
}