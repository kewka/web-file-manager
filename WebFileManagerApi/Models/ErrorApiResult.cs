using Newtonsoft.Json;

namespace WebFileManagerApi.Models
{
    /// <summary>
    /// This class is intended to represent the error api result.
    /// </summary>
    public class ErrorApiResult
    {
        /// <summary>
        /// Gets or sets the error message.
        /// </summary>
        /// <value>Error message.</value>
        [JsonProperty("message")]
        public string Message { get; set; }
        /// <summary>
        /// Gets or sets the error status code.
        /// </summary>
        /// <value>Status code.</value>
        [JsonProperty("statusCode")]
        public int StatusCode { get; set; }

        /// <summary>
        /// Initialize a new instance of the <see cref="ErrorApiResult" /> class.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <param name="statusCode">Status code.</param>
        public ErrorApiResult(string message, int statusCode)
        {
            this.Message = message;
            this.StatusCode = statusCode;
        }


        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}