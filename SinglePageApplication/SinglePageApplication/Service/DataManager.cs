using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace SinglePageApplication.Controllers
{
    public class DataManager
    {
        const string filelink = @"~/xml/test.xml";
        public static SinglePageDataSet GetData()
        {
            string filename = HttpContext.Current.ApplicationInstance.Server.MapPath(filelink);
            SinglePageDataSet data = new SinglePageDataSet();
            try
            {
                if (File.Exists(filename))
                {
                    data.ReadXml(filename);
                }
            }
            catch
            {
            }
            return data;
        }
        public static void SaveData(SinglePageDataSet data)
        {
            string filename = HttpContext.Current.ApplicationInstance.Server.MapPath(filelink);
            data.WriteXml(filename);
        }
    }
}