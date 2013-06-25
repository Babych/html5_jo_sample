using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;

namespace SinglePageApplication.Controllers
{
    public class DataRepository
    {
        static bool sortname = true;
        static bool sortdate = true;
        public List<Info> getList(string param)
        {
            List<Info> list = new List<Info>();
            SinglePageDataSet data = DataManager.GetData();
            DataTable dt = data.InfoTable;

            foreach (SinglePageDataSet.InfoTableRow item in dt.Rows)
            {
                Info info = new Info();
                try
                {
                    info.date = item.Date;
                    info.name = item.Name;
                    info.info = item.Info;
                    info.title = item.Name;
                }
                catch 
                {
                }
                info.id = "form";

                list.Add(info);
            }
            if (param == "1")
            {
                if (sortname)
                {
                    list = list.OrderBy(p => p.name).ToList();
                }
                else
                {
                    list = list.OrderByDescending(p => p.name).ToList();
                }
                sortname = !sortname;
            }
            else if (param == "2")
            {
                if (sortdate)
                {
                    list = list.OrderBy(p => p.date).ToList();
                }
                else 
                {
                    list = list.OrderByDescending(p => p.date).ToList();
                }
                sortdate = !sortdate;
            }
            return list;
        }
        public void delItemById(int id)
        {
            SinglePageDataSet data = DataManager.GetData();
            var row = data.InfoTable.FindByid(id);
            data.InfoTable.RemoveInfoTableRow(row);
            DataManager.SaveData(data);
        }
        public void delItemByPosition(int id)
        {
            SinglePageDataSet data = DataManager.GetData();
            data.InfoTable.Rows[id].Delete();
            DataManager.SaveData(data);
        }
        public Info getDetails(int id)
        {
            SinglePageDataSet data = DataManager.GetData();
            var item = data.InfoTable.FindByid(id);
            Info info = new Info();
            info.date = item.Date;
            info.name = item.Name;
            info.info = item.Info;
            info.title = item.Name;
            info.id = "form"; 
            return info;
        }

        public void editItem(Info model)
        {
            SinglePageDataSet data = DataManager.GetData();
            DataRow item = data.InfoTable.Rows[Convert.ToInt32(model.id)];

            item["Date"] = model.date;
            item["Name"] = model.name;
            item["Info"] = model.info;

            DataManager.SaveData(data);
        }
        public void addData(Info model)
        {
            SinglePageDataSet data = DataManager.GetData();
            data.InfoTable.AddInfoTableRow(model.name, model.info, model.date);
            DataManager.SaveData(data);
        }

        public Info getDetailsByPos(int id)
        {
            //SinglePageApplication.SinglePageDataSet+InfoTableDataTable" обнаружена циклическая ссылка
            Info info = new Info();
            try
            {
                SinglePageDataSet data = DataManager.GetData();
                DataRow item = data.InfoTable.Rows[id];
                info.date = DateTime.Parse(item["Date"].ToString());
                info.name = item["Name"].ToString();
                info.info = item["Info"].ToString();
                info.title = item["Name"].ToString();
                info.id = "form";
            }
            catch { }
            return info;

        }
    }
}
