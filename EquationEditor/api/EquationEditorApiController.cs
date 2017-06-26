using EquationEditor.Models;
using EquationEditor.Utility;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace EquationEditor.api
{
    [RoutePrefix("api/equation")]
    public class EquationEditorApiController : ApiController
    {
        [HttpPost]
        [Route("save")]
        public HttpResponseMessage SaveEquation(EquationViewModel _equationViewModel)
        {
            if (Convert.ToBoolean(ConfigurationManager.AppSettings["SAVEIMAGE"]))
            {
                EquationFile _equationFile = new EquationFile() { Equationfile1 = _equationViewModel.File, InsertDate = DateTime.Now, UpdateDate = DateTime.Now };
                _equationFile.UserIp = HttpContext.Current != null ? HttpContext.Current.Request.UserHostAddress : "";
                _equationFile.BrowserName = HttpContext.Current != null ? HttpContext.Current.Request.Browser.Browser : "";
                long equationid = EquationEditorDbHelper.SaveEquationFile(_equationFile);
                if (_equationViewModel.TagSubjectRelationIds != null && _equationViewModel.TagSubjectRelationIds.Count > 0)
                {
                    EquationEditorDbHelper.LogActivity(_equationViewModel.TagSubjectRelationIds, equationid);
                }
                if (!string.IsNullOrEmpty(_equationViewModel.Image))
                {
                    ImageHandler.SaveImageFile(_equationViewModel.Image, equationid);
                }

                return Request.CreateResponse(HttpStatusCode.OK, equationid);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.OK, 100);
            }



        }
    }
}