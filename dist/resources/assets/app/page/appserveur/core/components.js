"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var pourTrello_1 = __importDefault(require("../components/pourTrello"));
vue_1.default.component('pour-trello', pourTrello_1.default);
var labelTrello_1 = __importDefault(require("../components/labelTrello"));
vue_1.default.component('label-trello', labelTrello_1.default);
var pourInfusionsoft_1 = __importDefault(require("../components/pourInfusionsoft"));
vue_1.default.component('pour-infusionsoft', pourInfusionsoft_1.default);
var menu_1 = __importDefault(require("../components/menu"));
vue_1.default.component('menu-app', menu_1.default);
var loader_1 = __importDefault(require("../components/loader"));
vue_1.default.component('loader-app', loader_1.default);
var menu_external_1 = __importDefault(require("../components/menu-external"));
vue_1.default.component('menu-external', menu_external_1.default);
var modal_1 = __importDefault(require("../components/modal"));
vue_1.default.component('modal', modal_1.default);
var alert_1 = __importDefault(require("../components/alert"));
vue_1.default.component('alert', alert_1.default);
var createApplication_1 = __importDefault(require("../components/createApplication"));
vue_1.default.component('create-application', createApplication_1.default);
var noteVocal_1 = __importDefault(require("../components/noteVocal"));
vue_1.default.component('note-vocal', noteVocal_1.default);
var pagination_1 = __importDefault(require("bootstrap-vue/es/components/pagination/pagination"));
vue_1.default.component('b-pagination', pagination_1.default);
//Bootrap vuejs
var table_1 = __importDefault(require("bootstrap-vue/es/components/table/table"));
vue_1.default.component('b-table', table_1.default);
var navbar_1 = __importDefault(require("bootstrap-vue/es/components/navbar/navbar"));
vue_1.default.component('b-navbar', navbar_1.default);
var navbar_brand_1 = __importDefault(require("bootstrap-vue/es/components/navbar/navbar-brand"));
vue_1.default.component('b-navbar-brand', navbar_brand_1.default);
var navbar_nav_1 = __importDefault(require("bootstrap-vue/es/components/navbar/navbar-nav"));
vue_1.default.component('b-navbar-nav', navbar_nav_1.default);
var nav_item_1 = __importDefault(require("bootstrap-vue/es/components/nav/nav-item"));
vue_1.default.component('b-nav-item', nav_item_1.default);
var components_1 = require("bootstrap-vue/es/components");
vue_1.default.use(components_1.Button);
var form_1 = __importDefault(require("bootstrap-vue/es/components/form/form"));
vue_1.default.component('b-form', form_1.default);
var form_group_1 = __importDefault(require("bootstrap-vue/es/components/form-group/form-group"));
vue_1.default.component('b-form-group', form_group_1.default);
var form_input_1 = __importDefault(require("bootstrap-vue/es/components/form-input/form-input"));
vue_1.default.component('b-form-input', form_input_1.default);
var form_invalid_feedback_1 = __importDefault(require("bootstrap-vue/es/components/form/form-invalid-feedback"));
vue_1.default.component('b-form-invalid-feedback', form_invalid_feedback_1.default);
var container_1 = __importDefault(require("bootstrap-vue/es/components/layout/container"));
vue_1.default.component('b-container', container_1.default);
var row_1 = __importDefault(require("bootstrap-vue/es/components/layout/row"));
vue_1.default.component('b-row', row_1.default);
var col_1 = __importDefault(require("bootstrap-vue/es/components/layout/col"));
vue_1.default.component('b-col', col_1.default);
var form_row_1 = __importDefault(require("bootstrap-vue/es/components/layout/form-row"));
vue_1.default.component('b-form-row', form_row_1.default);
var popover_1 = __importDefault(require("bootstrap-vue/es/components/popover/popover"));
vue_1.default.component('b-popover', popover_1.default);
var modal_2 = __importDefault(require("bootstrap-vue/es/components/modal/modal"));
vue_1.default.component('b-modal', modal_2.default);
var dropdown_1 = __importDefault(require("bootstrap-vue/es/components/dropdown/dropdown"));
vue_1.default.component('b-dropdown', dropdown_1.default);
var dropdown_item_1 = __importDefault(require("bootstrap-vue/es/components/dropdown/dropdown-item"));
vue_1.default.component('b-dropdown-item', dropdown_item_1.default);
var nav_item_dropdown_1 = __importDefault(require("bootstrap-vue/es/components/nav/nav-item-dropdown"));
vue_1.default.component('b-nav-item-dropdown', nav_item_dropdown_1.default);
var img_1 = __importDefault(require("bootstrap-vue/es/components/image/img"));
vue_1.default.component('b-img', img_1.default);
var input_group_1 = __importDefault(require("bootstrap-vue/es/components/input-group/input-group"));
vue_1.default.component('b-input-group', input_group_1.default);
var list_group_1 = __importDefault(require("bootstrap-vue/es/components/list-group/list-group"));
vue_1.default.component('b-list-group', list_group_1.default);
var list_group_item_1 = __importDefault(require("bootstrap-vue/es/components/list-group/list-group-item"));
vue_1.default.component('b-list-group-item', list_group_item_1.default);
var card_1 = __importDefault(require("bootstrap-vue/es/components/card/card"));
vue_1.default.component('b-card', card_1.default);
var card_text_1 = __importDefault(require("bootstrap-vue/es/components/card/card-text"));
vue_1.default.component('b-card-text', card_text_1.default);
var card_group_1 = __importDefault(require("bootstrap-vue/es/components/card/card-group"));
vue_1.default.component('b-card-group', card_group_1.default);
var badge_1 = __importDefault(require("bootstrap-vue/es/components/badge/badge"));
vue_1.default.component('b-badge', badge_1.default);
var progress_1 = __importDefault(require("bootstrap-vue/es/components/progress/progress"));
vue_1.default.component('b-progress', progress_1.default);
var alert_2 = __importDefault(require("bootstrap-vue/es/components/alert/alert"));
vue_1.default.component('b-alert', alert_2.default);
var form_textarea_1 = __importDefault(require("bootstrap-vue/es/components/form-textarea/form-textarea"));
vue_1.default.component('b-form-textarea', form_textarea_1.default);
var form_select_1 = __importDefault(require("bootstrap-vue/es/components/form-select/form-select"));
vue_1.default.component('b-form-select', form_select_1.default);
var form_checkbox_group_1 = __importDefault(require("bootstrap-vue/es/components/form-checkbox/form-checkbox-group"));
vue_1.default.component('b-form-checkbox-group', form_checkbox_group_1.default);
var form_checkbox_1 = __importDefault(require("bootstrap-vue/es/components/form-checkbox/form-checkbox"));
vue_1.default.component('b-form-checkbox', form_checkbox_1.default);
var progress_bar_1 = __importDefault(require("bootstrap-vue/es/components/progress/progress-bar"));
vue_1.default.component('b-progress-bar', progress_bar_1.default);
var popover_2 = __importDefault(require("bootstrap-vue/es/components/popover/popover"));
vue_1.default.component('b-popover', popover_2.default);
var form_radio_group_1 = __importDefault(require("bootstrap-vue/es/components/form-radio/form-radio-group"));
vue_1.default.component('b-form-radio-group', form_radio_group_1.default);
var form_radio_1 = __importDefault(require("bootstrap-vue/es/components/form-radio/form-radio"));
vue_1.default.component('b-form-radio', form_radio_1.default);
var input_group_append_1 = __importDefault(require("bootstrap-vue/es/components/input-group/input-group-append"));
vue_1.default.component('b-input-group-append', input_group_append_1.default);
var comp = {};
exports.default = comp;
