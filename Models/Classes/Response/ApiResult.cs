using Newtonsoft.Json;

namespace Models.Classes.Response
{
    public class ApiResult
    {
        public bool Succes { get; set; }
        public string Value { get; set; }
    }

    public static class ApiResultCreator
    {
        public static ApiResult CreateOkResponse(object ResponseItem)
        {
            if (ResponseItem == null)
            {
                return CreateErrorResponse("Null object");
            }
            ApiResult resp = new ApiResult
            {
                Succes = true,
                Value = JsonConvert.SerializeObject(ResponseItem)
            };
            return resp;
        }

        public static ApiResult CreateErrorResponse(string ResponseError)
        {
            ApiResult resp = new ApiResult
            {
                Succes = false,
                Value = ResponseError
            };
            return resp;
        }
    }
}
