function getData(url, data) {
    var result = null;
    //
    $.ajax({
    data:data,
        url: url,
        type: 'get',
        dataType: 'json',
        async: false,
        success: function (data) {
            result = data;
        }
    });
    return result;
}
function postData(url, data) {
    var result = null;
    //
    $.ajax({
        data: data,
        url: url,
        type: 'post',
        dataType: 'json',
        async: false,
        success: function (data) {
            result = data;
        }
    });
    return result;
}
function getList(param) {
    var result = getData("/Home/List/?param=" + param);
    return $.makeArray(result);
}

function getDetails(id) {
    var result = getData("/Home/Details/" + id);
    return result;
}
function create(testds) {
    var result = postData("/Home/Create/", testds.data);
    return result;
}
function edit(testds, id) {
    testds.data.id = id;
    var result = postData("/Home/Edit/", testds.data);
    return result;
}
function del(id) {
    var result = postData("/Home/Delete/", { id: id });
    
    
    return result;
}
function delJoMenuItem(val) {
    console.log("val=" + val);
    $("jomenuitem").each(function () {
        
        if (val != null)
            if ($(this).attr("index") == val.toString()) {
            
            $(this).remove();
        }
    })
}
function refreshJoMenu() {
    var i = 0;
    $("jomenuitem").each(function () {
        $(this).attr("index", i); i++;
    })
}
function editJoMenuItem(val, text) {
    $("jomenuitem").each(function () {
        if (val != null)
            if ($(this).attr("index") == val.toString()) {

                $(this).html(text);
            }
    })
}
function msToString(date) {
    var re = /-?\d+/;
    var m = re.exec(date);
    var d = new Date(parseInt(m[0]));
    return d.toDateString();
}