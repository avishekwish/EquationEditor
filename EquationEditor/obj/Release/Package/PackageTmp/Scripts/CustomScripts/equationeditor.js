var canvas
var custontxt
var isEdit = false;
var lastTime;

var equationEditor = (function () {
    var _fontsize = 27;//defaut font size
    var _offsetxAdjustment = 0;//default offset x adjustment
    var _offsetyAdjustment = 8;//default offset y adjustment
    var _cursorDurtaion = 500;//default cursor blinking time in milliseconds
    var _fontFamily = 'arial';
    var _fontStyle = 'normal';//default font style
    var _fontColor = 'black';//default font color
    var _nomatch = 198;
    var _equationId = 0;
    var _isChanged = false;
    var _tags = [];
    var _keyboardTags = [
        { TagId: 140, TagValue: 'a' },
        { TagId: 141, TagValue: 'b' },
        { TagId: 142, TagValue: 'c' },
        { TagId: 143, TagValue: 'd' },
        { TagId: 144, TagValue: 'e' },
        { TagId: 145, TagValue: 'f' },
        { TagId: 146, TagValue: 'g' },
        { TagId: 147, TagValue: 'h' },
        { TagId: 148, TagValue: 'i' },
        { TagId: 149, TagValue: 'j' },
        { TagId: 150, TagValue: 'k' },
        { TagId: 151, TagValue: 'l' },
        { TagId: 152, TagValue: 'm' },
        { TagId: 153, TagValue: 'n' },
        { TagId: 154, TagValue: 'o' },
        { TagId: 155, TagValue: 'p' },
        { TagId: 156, TagValue: 'q' },
        { TagId: 157, TagValue: 'r' },
        { TagId: 158, TagValue: 's' },
        { TagId: 159, TagValue: 't' },
        { TagId: 160, TagValue: 'u' },
        { TagId: 161, TagValue: 'v' },
        { TagId: 162, TagValue: 'w' },
        { TagId: 163, TagValue: 'x' },
        { TagId: 164, TagValue: 'y' },
        { TagId: 165, TagValue: 'z' },
        { TagId: 166, TagValue: 'A' },
        { TagId: 167, TagValue: 'B' },
        { TagId: 168, TagValue: 'C' },
        { TagId: 169, TagValue: 'D' },
        { TagId: 170, TagValue: 'E' },
        { TagId: 171, TagValue: 'F' },
        { TagId: 172, TagValue: 'G' },
        { TagId: 173, TagValue: 'H' },
        { TagId: 174, TagValue: 'I' },
        { TagId: 175, TagValue: 'J' },
        { TagId: 176, TagValue: 'K' },
        { TagId: 177, TagValue: 'L' },
        { TagId: 178, TagValue: 'M' },
        { TagId: 179, TagValue: 'N' },
        { TagId: 180, TagValue: 'O' },
        { TagId: 181, TagValue: 'P' },
        { TagId: 182, TagValue: 'Q' },
        { TagId: 183, TagValue: 'R' },
        { TagId: 184, TagValue: 'S' },
        { TagId: 185, TagValue: 'T' },
        { TagId: 186, TagValue: 'U' },
        { TagId: 187, TagValue: 'V' },
        { TagId: 188, TagValue: 'W' },
        { TagId: 189, TagValue: 'X' },
        { TagId: 190, TagValue: 'Y' },
        { TagId: 191, TagValue: 'Z' },
        { TagId: 192, TagValue: '{' },
        { TagId: 193, TagValue: '}' },
        { TagId: 194, TagValue: '[' },
        { TagId: 195, TagValue: ']' },
        { TagId: 196, TagValue: '<' },
        { TagId: 197, TagValue: '>' },
        { TagId: 198, TagValue: 'NOMATCH' },
        { TagId: 199, TagValue: '0' },
        { TagId: 200, TagValue: '1' },
        { TagId: 201, TagValue: '2' },
        { TagId: 202, TagValue: '3' },
        { TagId: 203, TagValue: '4' },
        { TagId: 204, TagValue: '5' },
        { TagId: 205, TagValue: '6' },
        { TagId: 206, TagValue: '7' },
        { TagId: 207, TagValue: '8' },
        { TagId: 208, TagValue: '9' },
        { TagId: 209, TagValue: '+' },
        { TagId: 210, TagValue: '₋' },
        { TagId: 213, TagValue: '₌' },
        { TagId: 52, TagValue: '(' },
        { TagId: 53, TagValue: ')' },
        { TagId: 214, TagValue: '?' }
    ];

    var addIdToTag = function (id) {
        this._isChanged = true;
        try {
            if (id) {
                _tags.push(parseInt(id));
            }
        } catch (e) {

        }
    };

    var _matchTag = function (content) {
        this._isChanged = true;
        try {
            if (content && typeof content != 'undefined' && content.length > 0) {
                var chararray = [...content];
                for (var i = 0; i < chararray.length; i++) {
                    $.each(_keyboardTags, function (x, val) {
                        if (val.TagValue == chararray[i]) {
                            _tags.push(val.TagId);

                        }

                    });

                }
            }
        } catch (e) {

        }
    };
    var getTag = function () {
        return _tags;
    };
    var changed = function () {
        return this._isChanged;
    };

    var _setChange = function (value) {
        this._isChanged = value;
    };

    var _getEquationId = function () {
        return this._equationId;
    };
    var _setEquationId = function (id) {
        this._equationId = id;
    };
    var _clearTags = function () {
        _tags.splice(0, _tags.length)
    };

    var fontColor = function () {
        return _fontColor;
    };
    var setFontColor = function (color) {
        _fontColor = color;
    }

    var configurationElement =
        {
            fontSize: _fontsize,
            fontFamily: _fontFamily,
            fontColor: fontColor,
            setFontColor: setFontColor,
            fontStyle: _fontStyle,
            cursorDurtaion: _cursorDurtaion,
            offsetAdjustmentX: _offsetxAdjustment,
            offsetyAdjustmentY: _offsetyAdjustment,
            keyboardTags: _keyboardTags,
            noMatch: _nomatch,
            equationId: _getEquationId,
            setEquationId: _setEquationId,
            tags: getTag,
            isChanged: changed,
            setChange: _setChange,
            addTag: addIdToTag,
            matchTag: _matchTag,
            clearTags: _clearTags


        };

    var setOffsetAdjustment = function (x, y) {
        if (typeof x != 'undefined') {
            _offsetxAdjustment = x;
        }
        if (typeof yx != 'undefined') {
            _offsetyAdjustment = y;
        }

    };



    var cursorDurtaion = function (duration) {
        _cursorDurtaion = duration;
    };


    return configurationElement;


})();
equationEditor.Text = function (x, y, content) {
    var text = new fabric.Text(content, {
        fontFamily: equationEditor.fontFamily,
        left: x,
        top: y - equationEditor.offsetyAdjustmentY,
        fontSize: equationEditor.fontSize,
        stroke: equationEditor.fontColor(),
        fill: equationEditor.fontColor()
    });
    text.on({
        'scaling':
            function (e) {
                this.fontSize = this.fontSize * this.scaleX;
                this.scaleX = 1;
                this.scaleY = 1;
                this.width = this.getBoundingBox().width;
                this.height = this.getBoundingBox().height;
            }
    });
    return text;
}
equationEditor.Itext = function (x, y) {
    var itext = new fabric.IText(' ', {
        fontFamily: equationEditor.fontFamily,
        fontSize: equationEditor.fontSize,
        stroke: equationEditor.fontColor(),
        fill: equationEditor.fontColor(),
        fontStyle: equationEditor.fontStyle,
        top: y - equationEditor.offsetyAdjustmentY,
        left: x,
        cursorDuration: equationEditor.cursorDurtaion

    });
    itext.on({
        'editing:exited': function (e) {
            equationEditor.matchTag(this.__text);
        }
    });
    itext.on({
        'scaling':
            function (e) {
                this.fontSize = this.fontSize * this.scaleX;
                this.scaleX = 1;
                this.scaleY = 1;
                this.width = this.getBoundingBox().width;
                this.height = this.getBoundingBox().height;
            }
    });
    return itext;
}
equationEditor.squareRoot = function (x, y) {
    var squarerootPoints = [{ x: 0, y: 0 }, { x: 5, y: 20 }, { x: 10, y: -20 }, { x: 50, y: -20 }];
    var squareroot = new fabric.Polyline(squarerootPoints, {
        top: y,
        left: x,
        fill: 'transparent',
        stroke: equationEditor.fontColor(),
        strokeWidth: 2,
        perPixelTargetFind: true,

    });


    squareroot.on({
        'scaling':
            function (e) {
                var points = this.points;
                for (var i = 0; i < points.length; i++) {
                    var p = points[i];
                    p.x *= this.scaleX
                    p.y *= this.scaleY;
                }
                this.scaleX = 1;
                this.scaleY = 1;
                this.width = this.getBoundingBox().width;
                this.height = this.getBoundingBox().height;
            }
    });
    squareroot.isObjectSelected = false;
    return squareroot;
}
equationEditor.fraction = function (x, y) {

    var fraction = new fabric.Text('-', {
        fontFamily: equationEditor.fontFamily,
        left: x,
        top: y - equationEditor.offsetyAdjustmentY,
        fontSize: equationEditor.fontSize,
        stroke: equationEditor.fontColor(),
        fill: equationEditor.fontColor()
    });
    fraction.on({
        'scaling': function (e) {
            this.scaleY = 1;
        }
    });


    return fraction;
}
function writetoCanvas(dataType, x, y, content) {

    switch (dataType) {
        case "text":
            canvas.add(new equationEditor.Text(x, y, content));
            break;
        case "squareroot":
            canvas.add(new equationEditor.squareRoot(x, y));
            break;
        case "itext":
            var iText = new equationEditor.Itext(x, y);
            canvas.add(iText);
            canvas.setActiveObject(iText);
            iText.enterEditing();
            isEdit = true;
            break;
        case "fraction":
            canvas.add(new equationEditor.fraction(x, y));
            break;

        default:
            break;

    }
}
function dragstart_handler(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
}
function dragover_handler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'copy';
}
function drop_handler(ev) {

    ev.preventDefault();
    // Get the data, which is the id of the drop target
    var data = ev.dataTransfer.getData("text");

    var content = document.getElementById(data)
    var dataType = content.getAttribute('data-type');
    equationEditor.addTag(data);
    writetoCanvas(dataType, ev.layerX, ev.layerY, content.innerHTML);
    ev.dataTransfer.clearData();

}
function downloadCanvas(link, canvasId, filename, filetype) {

    var equation_id = save();
    link.href = document.getElementById(canvasId).toDataURL({ format: filetype });

    link.download = filename + '_' + equation_id + '.' + filetype;
    equationEditor.setChange(false);
}
function save() {
    var equationid = 1;
    try {
        if (equationEditor.isChanged() && equationEditor.tags().length > 0) {
            var json = JSON.stringify(canvas);
            var tagids = equationEditor.tags();
            var image = canvas.toDataURL();
            var _equationViewModel =
                {
                    File: json,
                    TagSubjectRelationIds: tagids,
                    Image: image
                };


            $.ajax({
                type: 'POST',
                url: '/api/equation/save',
                data: JSON.stringify(_equationViewModel),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    equationid = data;

                }
            });
        }

    } catch (e) {

    }
    equationEditor.setEquationId(equationid);
    return equationid;

}
$(document).ready(function () {
    if (!Modernizr.canvas || !Modernizr.borderradius) {
        alert('This website is not supported in current browser.Please update browser version or use new browser to access the site.')
    }


    var width = $("#canvas-container").width();
    var height = $("#canvas-container").height();
    canvas = new fabric.Canvas('canvas', { width: width, height: height });
    canvas.stateful = false;
    window.fabric.util.addListener(canvas.upperCanvasEl, 'dblclick', function (event, self) {
        doubleClicked(event);
    });
    canvas.on('mouse:down', function (options) {
        //var activeObject = canvas.getActiveObject()
        //if (activeObject && typeof activeObject != 'undefined' && activeObject.type == 'polyline') {
        //    writetoCanvas("itext", options.e.offsetX + 2, options.e.offsetY + 3);
        //}

        if (options.target == null && isEdit == false) {
            writetoCanvas("itext", options.e.offsetX, options.e.offsetY);
        }
        else {
            if (options.target == null) {
                isEdit = false;
            }

        }
    });

    canvas.on('object:selected', function (e) {

        var activeObject = e.target;
        if (activeObject && typeof activeObject != 'undefined') {
            $("[name='dragitem']").bootstrapSwitch('state', !activeObject.lockMovementX, !activeObject.lockMovementX);
        }

        if (activeObject && typeof activeObject != 'undefined' && activeObject.type == 'polyline') {
            activeObject.isObjectSelected = !activeObject.isObjectSelected;
            if (!activeObject.isObjectSelected) {
                writetoCanvas("itext", e.e.layerX + 2, e.e.layerY + 3);
            }

        }


    });

    $(document).keydown(function (e) {
        if (e.keyCode == 46 || e.keyCode == 8) {
            if (canvas.getActiveGroup()) {
                canvas.getActiveGroup().forEachObject(function (o) { canvas.remove(o) });
                canvas.discardActiveGroup().renderAll();
            } else {
                canvas.remove(canvas.getActiveObject());
            }

        }

    });
    $("#clearCanvas").click(function (e) {
        canvas.clear();
        equationEditor.clearTags();
    });

    $('#downloadpng').click(function (e) {
        downloadCanvas(this, 'canvas', 'image', 'png');
    });
    $('#downloadjpeg').click(function (e) {
        downloadCanvas(this, 'canvas', 'image', 'jpeg');
    });
    /*filter text box*/
    $('#filter').keyup(function () {
        var value = $(this).val();
        var ref_this = $("#tabs li.active a").attr('href');

        if (typeof value != "undefined" && value.length > 0) {
            var rex = new RegExp(value, 'i');
            $('.draggable').hide();
            $('.draggable').filter(function () {
                return rex.test($(this).attr("data-info"));
            }).show();
            $(".tab-pane").addClass('active');


        }
        else {
            $('.draggable').show();
            $(".tab-pane").removeClass('active');
            $(ref_this).addClass('active');
        }

    });

    /* Color Picker*/
    $('#changebackgroundcolor').simpleColorPicker({
        onChangeColor: function (color) {
            canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
        }
    });
    $('#changefontcolor').simpleColorPicker({
        onChangeColor: function (color) {
            equationEditor.setFontColor(color);
        }
    });
    $("[name='dragitem']").bootstrapSwitch();
    $("[name='dragitem']").on('switchChange.bootstrapSwitch', function (event, state) {
        var activeObject = canvas.getActiveObject()
        if (typeof activeObject != 'undefined') {
            activeObject.lockMovementX = !activeObject.lockMovementX;
            activeObject.lockMovementY = !activeObject.lockMovementY;

        }
    });
});


