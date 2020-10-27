function DocumentMap(arrData, elementDocumentMap) {
  that = this;
  that.arrData = arrData;
  that.elementDocumentMap = elementDocumentMap;
  that.arrVBQL = that.arrData[0];
  that.arrDocMapRelate = that.arrData[1];
  that.arrDocMapType = that.arrData[2];
  that.documentZoneTop = [];
  that.documentZoneBottom = [];
  that.documentZoneLeft = [];
  that.documentZoneRight = [];
  that.mainDoc = {};
  that.strHTMLLeft = "";
  that.strHTMLRight = "";
  that.strHTMLMid = "";

  that.RenderRowDocMapType = function () {
    that.arrDocMapType.sort(function (a, b) {
      return a.Rank - b.Rank;
    });
    $(that.arrDocMapType).each(function (index, item) {
      $(that.elementDocumentMap).append(
        "<div style='margin:50px 0px;width:100%' class='d-flex'><div style='width:25%' id=" +
          "divLeft" +
          item.DocumentTypeId +
          "></div><div style='width:50%'  id=" +
          "divMid" +
          item.DocumentTypeId +
          "></div><div style='width:25%'  id=" +
          "divRight" +
          item.DocumentTypeId +
          "></div></div>"
      );
    });
  };
  that.sortDocumentByZone = function () {
    //DUYỆT ARRAY QUAN HỆ DOCUMENTMAP
    for (var i = 0; i < that.arrDocMapRelate.length; i++) {
      var zone = that.arrDocMapRelate[i];
      //DUYỆT VĂN BẢN QUAN HỆ TÁCH RA THEO ZONE
      for (var j = 0; j < that.arrVBQL.length; j++) {
        var doc = that.arrVBQL[j];
        if (doc.RelateType == zone.RelateTypeId && zone.Zone === 1) {
          doc.ColorArrow = zone.Color;
          doc.DirectionArrow = zone.DirectionArrow;
          setDocumentByDocumentType(doc, that.arrDocMapType);
          that.documentZoneTop.push(doc);
        } else if (doc.RelateType == zone.RelateTypeId && zone.Zone === 2) {
          doc.ColorArrow = zone.Color;
          doc.DirectionArrow = zone.DirectionArrow;
          setDocumentByDocumentType(doc, that.arrDocMapType);
          that.documentZoneBottom.push(doc);
        } else if (doc.RelateType == zone.RelateTypeId && zone.Zone === 3) {
          doc.ColorArrow = zone.Color;
          doc.DirectionArrow = zone.DirectionArrow;
          setDocumentByDocumentType(doc, that.arrDocMapType);
          that.documentZoneLeft.push(doc);
        } else if (doc.RelateType == zone.RelateTypeId && zone.Zone === 4) {
          doc.ColorArrow = zone.Color;
          doc.DirectionArrow = zone.DirectionArrow;
          setDocumentByDocumentType(doc, that.arrDocMapType);
          that.documentZoneRight.push(doc);
        }
      }
    }
    console.log("documentZoneTop");
    console.log(that.documentZoneTop);
    console.log("documentZoneBottom");
    console.log(that.documentZoneBottom);
    console.log("documentZoneLeft");
    console.log(that.documentZoneLeft);
    console.log("documentZoneRight");
    console.log(that.documentZoneRight);
  };
  this.RenderDocumentMapByType = function () {
    createHTMLByZone(that.documentZoneLeft, "#divLeft");
    createHTMLByZone(that.documentZoneRight, "#divRight");
    createHTMLByZone(that.documentZoneTop, "#divMid", "Top");
    createHTMLByZone(that.documentZoneBottom, "#divMid", "Bottom");
    arrayElement = $(".items");
    $(arrayElement).each(function (i, item) {
      if (item.childElementCount > 2) {
        $(item.children).each(function (index, child) {
          if (index > 1) {
            $(child).hide();
          }
        });
        $(item).append(
          "<button style='border: none;background: none;' onclick='myFunction(this)' class='show-more' id='showMore'>Xem thêm</button>"
        );
      }
    });
  };
  function createHTMLByZone(documentZone, elementDivParent, positoin = "") {
    documentZone.sort(SortByRankDocumentType);
    var oldIdType;
    var classesLRC;
    $(documentZone).each(function (index, item) {
      if (elementDivParent === "#divMid" && positoin == "Top") {
        if (index == 0) classesLRC = "items-c";
        else
          index % 2 == 0 ? (classesLRC = "items-l") : (classesLRC = "items-r");
      } else if (elementDivParent === "#divMid" && positoin == "Bottom") {
        if (index == documentZone.length - 1) classesLRC = "items-c";
        else
          index % 2 == 0 ? (classesLRC = "items-l") : (classesLRC = "items-r");
      }

      if (oldIdType !== item.DocumentTypeId) {
        $(elementDivParent + item.DocumentTypeId).append(
          "<div class='items " +
            classesLRC +
            "' style='overflow: auto;text-align: center;margin:10px;border-radius: 5px;width:150px;height:70px;background-color:" +
            item.ColorDocumentMapType +
            "'><div><a target='_blank' href='" +
            item.Url +
            "'>" +
            item.Title +
            "</a></div></div>"
        );
      } else {
        $(elementDivParent + item.DocumentTypeId + "> div").append(
          "<div><a target='_blank' href='" +
            item.Url +
            "'>" +
            item.Title +
            "</a></div>"
        );
      }

      if (item.IsMainDoc === true) {
        $("#" + "divMid" + item.DocumentTypeId + " >div").height("100%");
        $("#" + "divMid" + item.DocumentTypeId + " >div").width("80%");
        $("#" + "divMid" + item.DocumentTypeId + " >div").removeClass(
          "items-r items-l"
        );
      }
      // oldIdType = 0;
      oldIdType = item.DocumentTypeId;
    });
  }
  function SortByRankDocumentType(a, b) {
    var aa = a.RankDocumentMapType;
    var bb = b.RankDocumentMapType;
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  }

  //Fuction Helper
  function setDocumentByDocumentType(document, arrayDocumentType) {
    for (var k = 0; k < arrayDocumentType.length; k++) {
      var documenttype = arrayDocumentType[k];
      if (document.DocumentTypeId == documenttype.DocumentTypeId) {
        document.ColorDocumentMapType = documenttype.Color;
        document.RankDocumentMapType = documenttype.Rank;
      }
    }
  }
  function convertDirectionArrow(directionArrow) {
    if (directionArrow == 1) return "Trên xuống dưới";
    else if (directionArrow == 2) return "Dưới lên trên";
    else if (directionArrow == 3) return "Trái qua phải";
    return "Phải qua trái";
  }
}
