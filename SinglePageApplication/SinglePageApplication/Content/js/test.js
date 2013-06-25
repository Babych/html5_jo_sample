/*
NOTE:
What follows is a mishmash of coding techniques put together as a rough
test for the library. It it not intended as a "best practice" coding exmaple,
but reather shows off some of the many approaches you can use to interact
with the Jo framework.
*/

// required
jo.load();

// not required
jo.setDebug(true);

// placed in a module pattern, not a terrible idea for application level code
var App = (function () {
    var stack;
    var scn;
    var button;
    var backbutton;
    var page;
    var login;
    var form;
    var test;
    var more;
    var option;
    var select;
    var moreback;
    var urldata;
    var list;
    var menu;
    var cssnode;
    var sortdate;
    var sortname;
    //	var blipsound = new joSound("blip2.wav");
    //	var bloopsound = new joSound("blip0.wav");
    var cancelbutton;
    var testds;

    /*
    EXAMPLE: if you want to configure what HTML tag and optional CSS class name a given
    UI class creates, you can change that by altering the properties in the class directly.
    NOTE: this should be done after jo is loaded, but before you create any new UI objects.
    */
    // uncomment to try this out:
    //		joInput.prototype.tagName = "input";
    //		joInput.prototype.className = "stuff";

    function init() {
        // silly, but you you can load style tags with a string
        // which may be moderately useful. the node is returned,
        // so in theory you could replace it or remove it.
        // a more practical case would be to use the loadCSS() method
        // to load in an additional stylesheet
        cssnode = joDOM.applyCSS(".htmlgroup { background: #fff; }");

        var toolbar;
        var nav;

        // hack for webOS touchpad browser event issue
        if (jo.matchPlatform("hpwos") && typeof PalmSystem === 'undefined')
            joEvent.touchy = false;
        var getlist = getList("");

        menu = new joCard([
        sortdate = new joButton("sortdate"),
        sortname = new joButton("sortname"),
        list = new joMenu(getlist)]).setTitle("Kitchen Sink Demo");
        menu.activate = function () {
            // maybe this should be built into joMenu...
            list.deselect();
        };

        // chaining is supported on constructors and any setters		
        scn = new joScreen(
			new joContainer([
				new joFlexcol([
					nav = new joNavbar(),

					stack = new joStackScroller().push(menu),
					toolbar = new joToolbar("footer")
				])
			])
		);

        nav.setStack(stack);

        // this is a bit of a hack for now; adds a CSS rule which puts enough
        // space at the bottom of scrolling views to allow for our floating
        // toolbar. Going to find a slick way to automagically do this in the
        // framework at some point.
        joDefer(function () {
            var style = new joCSSRule('jostack > joscroller > *:last-child:after { content: ""; display: block; height: ' + (toolbar.container.offsetHeight) + 'px; }');
        });

        var ex;

        testds = new joRecord({
            name: "name",
            info: "info",
            date: "0-0-0000"
        }).setAutoSave(false);

        //=========================================================================
        form = createForm();
        //=========================================================================

        //	was demoing how to disable a control, but decided having a "back"
        // button was more important right now
        //		cancelbutton.disable();
        cancelbutton.selectEvent.subscribe(back, this);

        // some arbitrary HTML shoved into a joHTML control
        var html = new joHTML('<h1>Disclaimer</h1><p>This is a disclaimer. For more information, you can check <a href="moreinfo.html">this <b>file</b></a> for more info, or try your luck with <a href="someotherfile.html">this file</a>.');
        var htmlgroup;

        page = new joCard([
			new joLabel("HTML Control"),
			htmlgroup = new joGroup(html),
			new joCaption("Note that the HTML control above is using another stylesheet without impacting our controls."),
			new joFooter([
				new joDivider(),
				backbutton = new joButton("Back"),

			])
		]).setTitle("Success");

        htmlgroup.setStyle("htmlgroup");

        more = new joCard([
			new joGroup([
				new joCaption("This is more info."),
				new joCaption(urldata = new joDataSource(""))
			]),
			new joFooter([
				new joDivider(),
				moreback = new joButton("Back Again")
			])
		]).setTitle("URL Demo");

        list.selectEvent.subscribe(function (id) {
            subscribeList(id);
        }, this);


        moreback.selectEvent.subscribe(function () { stack.pop(); }, this);
        backbutton.selectEvent.subscribe(back, this);
        sortdate.selectEvent.subscribe(fnsortdate, this);
        sortname.selectEvent.subscribe(fnsortname, this);

        cancelbutton.selectEvent.subscribe(back, this);

        html.selectEvent.subscribe(link, this);

        stack.pushEvent.subscribe(blip, this);
        stack.popEvent.subscribe(bloop, this);

        joGesture.forwardEvent.subscribe(stack.forward, stack);
        joGesture.backEvent.subscribe(stack.pop, stack);

        document.body.addEventListener('touchmove', function (e) {
            e.preventDefault();
            joEvent.stop(e);
        }, false);

    }
    function createForm() {
        _form = new joCard([
			new joGroup([
				new joLabel("Name"),
				new joFlexrow(nameinput = new joInput(testds.link("name"))),
				new joLabel("Info"),
				new joFlexrow(new joInput(testds.link("info"))),
                new joLabel("Date"),
				new joFlexrow(new joInput(testds.link("date"))),
				new joLabel("Actions"),
				new joFlexrow(option = new joOption([
					"Create", "Edit", "Delete"
				], testds.link("num")).selectEvent.subscribe(function (value) {
				    console.log("option selected: " + value);
				    action(value);
				})),

			]),
			new joFooter([
				new joDivider(),
				cancelbutton = new joButton("Back")
			])
		]).setTitle("Form Widget Demo");

        return _form;
    }
    function blip() {
        //		blipsound.play();
    }

    function bloop() {
        //		bloopsound.play();
    }

    function link(href) {
        joLog("HTML link clicked: " + href);
        urldata.setData(href);
        stack.push(more);
    }

    function click() {
        stack.push(page);
    }

    function back() {

        stack.pop();
    }
    function fnsortname() {
        refreshMenu("1");
    }
    function fnsortdate() {
        refreshMenu("2");
    }
    function refreshMenu(param) {
        var getlist = null;

        getlist = getList(param);

        menu = new joCard([
        sortdate = new joButton("sortdate"),
        sortname = new joButton("sortname"),
        list = new joMenu(getlist)]).setTitle("Kitchen Sink Demo");
        menu.activate = function () {
            // maybe this should be built into joMenu...
            list.deselect();
        };
        stack.push(menu);
        list.selectEvent.subscribe(function (id) {
            subscribeList(id);
        }, this);
        sortdate.selectEvent.subscribe(fnsortdate, this);
        sortname.selectEvent.subscribe(fnsortname, this);
    }
    function subscribeList(id) {
        if (id == "form") {
            var itemid = list.value;
            var details = getDetails(itemid);
            try {
                testds = new joRecord({
                    name: details["name"],
                    info: details["info"],
                    date: msToString(details["date"])
                }).setAutoSave(false);
            }
            catch (e) { }
            form = createForm();
            cancelbutton.selectEvent.subscribe(back, this);

            stack.push(form);
        }
    }
    function action(id) {

        switch (id) {
            case "0":
                {
                    create(testds);
                    //back();
                    refreshMenu("");
                    break;
                }
            case "1":
                {
                    var val = list.value;
                    edit(testds, val);
                    back();
                    editJoMenuItem(val, testds.data.name)
                    break;
                }
            case "2":
                {
                    var val = list.value;
                    del(val);
                    back();
                    delJoMenuItem(val);
                    refreshJoMenu();
                    break;
                }
        }
    }

    // public stuff
    return {
        init: init,
        getData: function () { return testds; },
        getStack: function () { return stack; },
        getButton: function () { return button; },
        getSelect: function () { return select; },
        getOption: function () { return option; },
        getRecord: function () { return testds; }
    }
} ());
