using System.Net;

namespace WebFileManagerApi.Exceptions
{
    public static class ValidationExceptions
    {
        public static ApiException Required(string property)
        {
            return new ApiException($"{property} is required.", HttpStatusCode.UnprocessableEntity);
        }
    }
}