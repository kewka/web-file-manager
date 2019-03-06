using System;
using System.Net;

namespace WebFileManagerApi.Exceptions
{
    /// <summary>
    /// This class is intended to create API exceptions.
    /// </summary>
    public class ApiException : Exception
    {
        /// <summary>
        /// Gets the HTTP status code.
        /// </summary>
        public int Status { get; }
        public ApiException(string message, int status) : base(message)
        {
            this.Status = status;
        }

        public ApiException(string message, HttpStatusCode status) : this(message, (int)status) { }
    }
}