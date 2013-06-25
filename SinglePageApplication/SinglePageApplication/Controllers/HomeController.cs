using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SinglePageApplication.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }
        //
        // GET: /Home/List

        public ActionResult List(string param)
        {
            DataRepository dataRepository = new DataRepository();
            List<Info> list = null;
            list = dataRepository.getList(param);

            var json = Json(list, JsonRequestBehavior.AllowGet);
            return json;
        }
        //
        // GET: /Home/Details/5

        public ActionResult Details(int id)
        {
            DataRepository dataRepository = new DataRepository();
            var item = dataRepository.getDetailsByPos(id);
            return Json(item, JsonRequestBehavior.AllowGet);
        }

        //
        // POST: /Home/Create

        [HttpPost]
        public ActionResult Create(Info model, FormCollection collection)
        {
            try
            {
                DataRepository dataRepository = new DataRepository();
                dataRepository.addData(model);
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        [HttpPost]
        public ActionResult Edit(int id, Info model, FormCollection collection)
        {
            try
            {
                DataRepository dataRepository = new DataRepository();
                dataRepository.editItem(model);
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // POST: /Home/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, Info model, FormCollection collection)
        {
            try
            {
                DataRepository dataRepository = new DataRepository();
                dataRepository.delItemByPosition(id);
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
