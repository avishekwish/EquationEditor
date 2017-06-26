using EquationEditor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PagedList;

namespace EquationEditor.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
      
        public ActionResult About()
        {
            ViewBag.Message = "Help.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Equation Editor Contact.";

            return View();
        }

        [Authorize(Users = "avishek.ece85@gmail.com")]
        public ActionResult Browse(int? pageNumber)
        {
            if (!pageNumber.HasValue)
            {
                pageNumber = 1;

            }
            int pageSize = 30;
            var _equationList = EquationEditorDbHelper.GetList();
            return View(_equationList.ToPagedList(pageNumber.Value, pageSize));
        }

        [Authorize(Users = "avishek.ece85@gmail.com")]
        public ActionResult Delete(int id)
        {
            EquationEditorDbHelper.Delete(id);
            var _equationList = EquationEditorDbHelper.GetList();
            int pageSize = 30;
            return View("Browse", _equationList.ToPagedList(1, pageSize));
        }

    }
}