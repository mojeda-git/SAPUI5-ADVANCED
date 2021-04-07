// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.core.model.json.JSONModel} JSONModel
     */
    function (Controller) {
        "use strict";

        return Controller.extend("logaligroup.Lists.controller.ListTypes", {
            onInit: function () {
                var oJSONModel = new sap.ui.model.json.JSONModel();
                oJSONModel.loadData("./localService/mockdata/ListData.json");
                this.getView().setModel(oJSONModel);

            },
            getGroupHeader: function (oGroup) {
                var groupHeaderListItem = new sap.m.GroupHeaderListItem({
                    title: oGroup.key,
                    upperCase: true
                });
                return groupHeaderListItem;
            },
            onDeleteSelectedRows: function () {
                var standardList = this.getView().byId("standardList");
                var selectedItems = standardList.getSelectedItems();
                var i18nModel = this.getView().getModel("i18n").getResourceBundle();

                if (selectedItems.length === 0) {
                    sap.m.MessageToast.show(i18nModel.getText("noSelection"));
                } else {

                    var textMessage = i18nModel.getText("deleteSelectedItems");
                    var model = this.getView().getModel();
                    var products = model.getProperty("/Products");

                    var arrayId = [];

                    for (var i in selectedItems) {
                        var context = selectedItems[i].getBindingContext();
                        var oContext = context.getObject();

                        arrayId.push(oContext.Id);
                        textMessage = textMessage + " - " + oContext.Material;
                    }
                    products = products.filter(function (p) {
                        return !arrayId.includes(p.Id);
                    });
                    sap.m.MessageToast.show(textMessage);
                    model.setProperty("/Products", products);
                    standardList.removeSelections();
                }
            },
            onShowSelectedRow: function () {
                var standardList = this.getView().byId("standardList");
                var selectedItems = standardList.getSelectedItems();

                var i18nModel = this.getView().getModel("i18n").getResourceBundle();

                if (selectedItems.length === 0) {
                    sap.m.MessageToast.show(i18nModel.getText("noSelection"));
                } else {

                    var textMessage = i18nModel.getText("selection");

                    for (var items in selectedItems) {
                        var context = selectedItems[items].getBindingContext();
                        var oContext = context.getObject();

                        textMessage = textMessage + " - " + oContext.Material;

                        sap.m.MessageToast.show(textMessage);

                    }
                }
            },
            onDeleteRow: function (oEvent) {
                var selectedRow = oEvent.getParameter("listItem");
                var context = selectedRow.getBindingContext();
                var splitPath = context.getPath().split("/");
                var idxSelectedRow = splitPath[splitPath.length - 1];
                var model = this.getView().getModel();
                var products = model.getProperty("/Products")
                products.splice(idxSelectedRow, 1);
                model.refresh();

            }
        });
    });
