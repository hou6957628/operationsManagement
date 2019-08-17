import Vue from "vue";
import 'element-ui/lib/theme-chalk/index.css'
import {
    Button,
    Input,
    Select,
    Checkbox,
    Radio,
    Switch,
    DatePicker,
    TimePicker,
    Row,
    Col,
    Form,
    FormItem,
    RadioGroup,
    CheckboxGroup,
    Option,
    Table,
    TableColumn,
    Tag,
    Dialog,
    Pagination,
    Tabs,
    Tree,
} from "element-ui";
Vue.use(Button);
Vue.use(Input);
Vue.use(Select);
Vue.use(Checkbox);
Vue.use(Radio);
Vue.use(Switch);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(RadioGroup);
Vue.use(CheckboxGroup);
Vue.use(Option);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tag);
Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(Tabs);
Vue.use(Tree);



import { MessageBox, Message } from "element-ui";
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

// Vue.prototype.$loading = Loading.service;
// Vue.prototype.$msgbox = MessageBox;

// Vue.prototype.$prompt = MessageBox.prompt;
// Vue.prototype.$notify = Notification;