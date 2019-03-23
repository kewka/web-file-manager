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
        public int StatusCode { get; }

        /// <summary>
        /// Initialize a new instance of the <see cref="ApiException" /> class.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <param name="statusCode">Status code.</param>
        public ApiException(string message, int statusCode) : base(message)
        {
            this.StatusCode = statusCode;
        }

        /// <summary>
        /// Initialize a new instance of the <see cref="ApiException" /> class.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <param name="statusCode">Status code.</param>
        public ApiException(string message, HttpStatusCode statusCode) : this(message, (int)statusCode) { }
    }
}