using EquationEditor.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;

namespace EquationEditor
{
    public class GlobalExceptionHandler: ExceptionHandler
    {
        public override void Handle(ExceptionHandlerContext context)
        {
            try
            {
                bool logException = Convert.ToBoolean(ConfigurationManager.AppSettings["LOGEXCEPTION"]);
                if (logException)
                {
                    EquationEditorDbHelper.LogError(context.Exception.Message);
                    context.Result = new TextPlainErrorResult
                    {
                        Request = context.ExceptionContext.Request,
                        Content = "Oops! Sorry! Something went wrong." +
                     "Please contact support@contoso.com so we can try to fix it."
                    };
                }
            }
            catch (Exception ex)
            {

                
            }
           
        }

        private class TextPlainErrorResult : IHttpActionResult
        {
            public HttpRequestMessage Request { get; set; }

            public string Content { get; set; }

            public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
            {
                HttpResponseMessage response =
                                 new HttpResponseMessage(HttpStatusCode.InternalServerError);
                response.Content = new StringContent(Content);
                response.RequestMessage = Request;
                return Task.FromResult(response);
            }
        }
    }
}