<template>
<div id="functionContent">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="web-font" :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item class="web-font">功能管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <div class="treeBox">
        <el-tree :data="data2" node-key="id" :default-checked-keys="[1]" :props="defaultProps" :highlight-current="true" @node-click="handleNodeClick" default-expand-all :filter-node-method="filterNode" ref="tree2">
        </el-tree>
    </div>
    <!--系统菜单功能-->
    <div class="functionArea" v-loading="loading" v-if="!action">
        <el-form :model="accountFrom" :rules="ruleAccount" ref="accountFrom">
            <el-form-item label="父ID" :label-width="formLabelWidth" prop="parentId">
                <el-input v-model="accountFrom.parentId" :disabled="true" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="功能名称" :label-width="formLabelWidth" prop="funcName">
                <el-input v-model="accountFrom.funcName" :disabled="newFun" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="功能类型" :label-width="formLabelWidth" prop="funcType">
                <el-select class="selectAccount" :disabled="newFun" v-model="accountFrom.funcType" placeholder="请选择">
                    <el-option
                            v-for="item in funcTypeList"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="行为识别码" :label-width="formLabelWidth" prop="actionKey">
                <el-input v-model="accountFrom.actionKey" :disabled="newFun" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="功能菜单地址" :label-width="formLabelWidth" prop="menuUrl">
                <el-input v-model="accountFrom.menuUrl" :disabled="newFun" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="序号" prop="seqNum" :label-width="formLabelWidth">
                <el-input v-model="accountFrom.seqNum" :disabled="newFun" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图标" prop="menuIcon" :label-width="formLabelWidth">
                <el-input v-model="accountFrom.menuIcon" :disabled="newFun" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="账号状态" prop="status" :label-width="formLabelWidth">
                <el-select class="selectAccount" :disabled="newFun" v-model="accountFrom.isEnabled" placeholder="请选择">
                    <el-option
                            v-for="item in accountStateList"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" id="footerContent">
            <el-button @click="addChildFunction('accountFrom')" v-if="newFun && $hasButton('oper.admin.func.add')"  type="primary" plain>增加下级</el-button>
            <el-button @click="editFunction" v-if="newFun && $hasButton('oper.admin.func.update')">修改</el-button>
            <el-button type="danger" plain @click="deleteBefore" v-if="newFun&&rootDetail && $hasButton('oper.admin.func.delete')">删除</el-button>
            <el-button type="primary" v-if="!newFun&&editFlag" @click="editFunctionList('accountFrom')">确定修改</el-button>
            <el-button type="primary" v-if="!newFun&&!editFlag" @click="addFunctionList('accountFrom')">确定新增</el-button>
            <el-button @click="cancelFunction" v-if="!newFun">取 消</el-button>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        data(){
            return {
                tableData: [],
                loading:false,
                pageNum: null,
                proTotal:null,
                pageSize:null,
                pageSizes:[10,20,30],
                nowPageSizes:10,
                rootDetail:false,
                styleObj: {
                    'color':'#313334',
                    'background-color':"#fafafa",
                    "font-size":"12px",
                },
                data2:[],
                data1:[],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                props: {
                    label: 'name',
                    children: 'zones'
                },
                count: 1,
                formLabelWidth: '120px',
                accountFrom:{
                    funcName:'',
                    parentId:0,
                    funcType:'menu',
                    actionKey:'',
                    menuUrl:'',
                    seqNum:'',
                    isEnabled:1,
                    menuIcon:'',
                },
                actionFrom:{
                    funcName:'',
                    parentId:0,
                    funcType:'action',
                    actionKey:'',
                    menuUrl:'',
                    seqNum:'',
                    isEnabled:1,
                    menuIcon:'',
                },
                ruleAccount: {
                    funcName: [
                        { required: true, message: '请输入功能名称', trigger: 'change' },
                    ],
                    funcType: [
                        {  required: true, message: '请选择行为识别码', trigger: 'change' },
                    ],
                    actionKey: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    isEnabled: [
                        { required: true, message: '请选择账号状态', trigger: 'blur' }
                    ],
                },
                ruleAction: {
                    funcName: [
                        { required: true, message: '请输入功能名称', trigger: 'blur' },
                    ],
                    funcType: [
                        {  required: true, message: '请选择行为识别码', trigger: 'blur' },
                    ],
                    actionKey: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    isEnabled: [
                        { required: true, message: '请选择账号状态', trigger: 'blur' }
                    ],
                },
                accountStateList:[
                    {key:0,value:'禁用'},
                    {key:1,value:'启用'},
                ],
                funcTypeList:[
                    {key:"menu",value:'菜单 '},
                    {key:"action",value:'行为'},
                ],
                newFun:true,
                newAction:true,
                functionId:'',
                parentId:'',
                action:false,
                editFlag:true,
            }
        },
        methods:{
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            //功能菜单tree节点点击事件
            handleNodeClick(data) {
                this.action=false;
                this.loading=true;
                this.$store.commit('getFunctionId', data.id);
                this.$Api.Function.getFuncById({
                    funcId:data.id
                }).then(res => {
                    if (res.result == '00000000') {
                        this.accountFrom=res.data;
                        this.accountFrom.isEnabled=parseInt(res.data.isEnabled);
                        this.functionId=res.data.funcId;
                        if(res.data.parentId!=0){
                            this.rootDetail=true;
                        }else {
                            this.rootDetail=false;
                        }
                        console.log(res.data.parentId);
                        this.loading=false;
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                });
            },
            //行为菜单tree节点点击事件
            handleNodeClick1(data) {
                this.loading=true;
                this.action=true;
                this.$store.commit('getFunctionId', data.id);
                this.$Api.Function.getFuncById({
                    funcId:data.id
                }).then(res => {
                    if (res.result == '00000000') {
                        this.accountFrom=res.data;
                        this.accountFrom.isEnabled=parseInt(res.data.isEnabled);
                        this.functionId=res.data.funcId;
                        if(res.data.parentId!=0){
                            this.rootDetail=true;
                        }else {
                            this.rootDetail=false;
                        }
                        console.log(res.data.parentId);
                        this.loading=false;
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                });
            },
            //获取功能列表
            getFunctionList(){
                this.$Api.Function.getFunctionList({
                }).then(res => {
                    if (res.result == '00000000') {
                        this.data2=res.data;
                        this.$Api.Function.getFuncById({
                            funcId:8
                        }).then(res => {
                            if (res.result == '00000000') {
                                this.accountFrom=res.data;
                                this.accountFrom.isEnabled=parseInt(res.data.isEnabled);
                                this.functionId=res.data.funcId;
                                console.log(this.functionId);
                                this.loading=false;
                            } else {
                                this.$message({
                                    message: res.msg,
                                    type: 'error'
                                });
                            }
                        });
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                });
            },
            //增加功能
            addFunctionList(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$Api.Function.addFunctionList({
                            "func": {
                                funcName: this.accountFrom.funcName,
                                parentId: this.accountFrom.parentId,
                                funcType: this.accountFrom.funcType,
                                actionKey: this.accountFrom.actionKey,
                                menuUrl: this.accountFrom.menuUrl,
                                seqNum: this.accountFrom.seqNum,
                                isEnabled: this.accountFrom.isEnabled,
                                menuIcon: this.accountFrom.menuIcon,
                            }
                        }).then(res => {
                            if (res.result == '00000000') {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.getFunctionList();
                                this.cancelFunction();
                            } else {
                                this.$message({
                                    message: res.data,
                                    type: 'error'
                                });
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //修改功能
            editFunctionList(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$Api.Function.addFunctionList({
                            "func": {
                                funcId:this.functionId,
                                funcName: this.accountFrom.funcName,
                                parentId: this.accountFrom.parentId,
                                funcType: this.accountFrom.funcType,
                                actionKey: this.accountFrom.actionKey,
                                menuUrl: this.accountFrom.menuUrl,
                                seqNum: this.accountFrom.seqNum,
                                isEnabled: this.accountFrom.isEnabled,
                                menuIcon: this.accountFrom.menuIcon,
                            }
                        }).then(res => {
                            if (res.result == '00000000') {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.getFunctionList();
                                this.cancelFunction();
                            } else {
                                this.$message({
                                    message: res.data,
                                    type: 'error'
                                });
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //添加行为
            addctionList(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$Api.Function.addFunctionList({
                            "func": {
                                funcId:this.functionId,
                                funcName: this.actionFrom.funcName,
                                parentId: this.actionFrom.parentId,
                                funcType: this.actionFrom.funcType,
                                actionKey: this.actionFrom.actionKey,
                                menuUrl: this.actionFrom.menuUrl,
                                seqNum: this.actionFrom.seqNum,
                                isEnabled: this.actionFrom.isEnabled,
                                menuIcon: this.actionFrom.menuIcon,
                            }
                        }).then(res => {
                            if (res.result == '00000000') {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.getFunctionList();
                                this.cancelFunction();
                            } else {
                                this.$message({
                                    message: res.data,
                                    type: 'error'
                                });
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //修改功能
            editFunction(){
                this.editFlag=true;
                this.newFun=false;
            },
            //修改行为
            editAction(){
                this.newAction=false;
            },
            //删除询问功能
            deleteBefore(){
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.detailFunction();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //行为删除询问功能
            deleteActionBefore(){
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.detailActionFunction();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //删除功能
            detailFunction(){
                this.$Api.Function.deleteFunctionList({
                    funcId:this.functionId,
                }).then(res => {
                    if (res.result == '00000000') {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getFunctionList();
                    } else {
                        this.$message({
                            message: res.data,
                            type: 'error'
                        });
                    }
                });
            },
            //行为删除功能
            detailActionFunction(){
                this.$Api.Function.deleteFunctionList({
                    funcId:this.functionId,
                }).then(res => {
                    if (res.result == '00000000') {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getFunctionList();
                    } else {
                        this.$message({
                            message: res.data,
                            type: 'error'
                        });
                    }
                });
            },
            //添加下级按钮
            addChildFunction(accountFrom){
                this.newFun=false;
                this.editFlag=false;
                this.parentId=this.accountFrom.funcId;
                this.$refs[accountFrom].resetFields();
                this.accountFrom.parentId=this.parentId;
            },
            //添加行为
            addActionFunction(accountFrom){
                this.action=false;
                this.parentId=this.actionFrom.funcId;
                this.$refs[actionFrom].resetFields();
                this.actionFrom.parentId=this.parentId;
            },
            //取消功能
            cancelFunction(){
                let funcId=this.$store.state.functionId;
                this.newFun=true;
                this.$Api.Function.getFuncById({
                    funcId:funcId
                }).then(res => {
                    if (res.result == '00000000') {
                        this.accountFrom=res.data;
                        this.accountFrom.isEnabled=parseInt(res.data.isEnabled);
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                });
            },
            //行为取消功能
            cancelActionFunction(){
                let funcId=this.$store.state.functionId;
                this.newFun=true;
                this.$Api.Function.getFuncById({
                    funcId:funcId
                }).then(res => {
                    if (res.result == '00000000') {
                        this.accountFrom=res.data;
                        this.accountFrom.isEnabled=parseInt(res.data.isEnabled);
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                });
            },
        },
        mounted(){
            this.getFunctionList();
            this.rootDetail=false;
            this.$store.commit('getFunctionId',8);
        },
        // computed:{
        //     parentId:function () {
        //         console.log(this.parentId);
        //         return this.parentId;
        //     }
        // }
    }
</script>

<style lang="less" scoped>
    #functionContent {
        height: calc(100% - 20px);
        padding: 20px 0 0 20px;
        background-color: #fff;
    }
    .tableStyle {
        line-height: 30px;
        width: 881px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .paginationBox {
        width: 881px;
        text-align: center;
    }
    .conditionsContent{
        line-height: 40px;
        height: 40px;
        width: 881px;
        margin: 0 0 15px 0;
        .searchBtn {
            float: right;
            width: 240px;
        }
        .addRole{
            float: left;
        }
    }
    .treeBox {
        width: 260px;
        height: 550px;
        overflow-y: auto;
        float: left;
        display: inline-block;
        padding: 10px;
        border: 1px solid #ccc;
    }
    .modifyBtn{
        float: left;
    }
    .selectAccount{
        float: left;
    }
    #footerContent,#footerContent1{
        text-align: center;
    }
    .functionArea{
        width: 500px;
        height: 550px;
        float: left;
        display: inline-block;
        padding: 10px;
    }
    /deep/ .el-tree-node__content {
        height: 30px;
        font-size: 20px;
    }

    /deep/ .el-icon-caret-right:before {
        content: "\E791";
    }

    /deep/ .el-tree-node__label {
        padding-left: 22px;
        background: url(./../../assets/images/tree.png) no-repeat left center;
        background-size: 21px;
        font-family:"webfont" !important;
    }
    /deep/ .el-drawer__body{
        font-family:"webfont" !important;
    }
    /deep/ .el-form-item__label{
        font-family:"webfont" !important;
    }

</style>
