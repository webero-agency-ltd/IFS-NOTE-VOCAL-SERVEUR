"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var loader_1 = __importDefault(require("../../components/loader"));
vue_1.default.component('loader', loader_1.default);
var Avatar_1 = __importDefault(require("../../components/Avatar"));
vue_1.default.component('Avatar', Avatar_1.default);
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
var modal_1 = __importDefault(require("bootstrap-vue/es/components/modal/modal"));
vue_1.default.component('b-modal', modal_1.default);
var img_1 = __importDefault(require("bootstrap-vue/es/components/image/img"));
vue_1.default.component('b-img', img_1.default);
var input_group_1 = __importDefault(require("bootstrap-vue/es/components/input-group/input-group"));
vue_1.default.component('b-input-group', input_group_1.default);
var progress_1 = __importDefault(require("bootstrap-vue/es/components/progress/progress"));
vue_1.default.component('b-progress', progress_1.default);
var alert_1 = __importDefault(require("bootstrap-vue/es/components/alert/alert"));
vue_1.default.component('b-alert', alert_1.default);
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
var TextInput_1 = __importDefault(require("../../components/TextInput"));
vue_1.default.component('TextInput', TextInput_1.default);
var comp = {};
exports.default = comp;
