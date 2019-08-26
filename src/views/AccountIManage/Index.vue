<template>
    <div id="accountCotent">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="web-font" :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item class="web-font">账户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <div class="conditionsContent">
            <el-row>
            <el-col :span="6">
                用户姓名&nbsp;:&nbsp;
                <el-input placeholder="请输入内容" v-model="userFullName" class="searchBtn" clearable @clear="clearConditions"></el-input>
            </el-col>
            <el-col :span="6">
                手机号&nbsp;:&nbsp;
            <el-input placeholder="请输入内容" v-model="mobile" class="searchBtn" clearable @clear="clearConditions">
            </el-input>
            </el-col>
            <el-col :span="6">
                邮箱&nbsp;:&nbsp;<el-input placeholder="请输入内容" v-model="email" class="searchBtn" clearable @clear="clearConditions">
            </el-input>
            </el-col>
            <el-col :span="6">
                账户状态&nbsp;:&nbsp;
            <el-select class="searchBtn" v-model="status" placeholder="请选择">
                <el-option
                        v-for="item in accountStateList"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                </el-option>
            </el-select>
            </el-col>
            </el-row>
            <el-row class="operateArea">
                <el-button v-if="$hasButton('oper.admin.user.add')" class="addRole" @click="addAccount">增加账户</el-button>
                <el-button class="searchAccount" @click="searchAccount" type="primary">搜索账户</el-button>
                <el-button class="resetAccount" @click="resetAccount">重置</el-button>
            </el-row>
        </div>
        <template class="tableArea">
            <el-table class="tableStyle" align="center" :header-cell-style='styleObj' v-loading="loading" :data="tableData" border>
                <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
                <el-table-column align="center" prop="userFullName" label="用户名称" width="100"></el-table-column>
                <el-table-column align="center" prop="mobile" label="手机号" width="110"></el-table-column>
                <el-table-column align="center" prop="email" label="email" width="120"></el-table-column>
                <el-table-column align="center" prop="wechat" label="微信" width="120"></el-table-column>
                <el-table-column align="center" prop="remark" label="备注" min-width="180"></el-table-column>
                <el-table-column align="center" :formatter="accountState" prop="status" label="账号状态" width="90"></el-table-column>
                <el-table-column align="center" :formatter="loginState" prop="loginFlag" label="登陆状态" width="90">
                </el-table-column>
                <el-table-column align="center" label="分配角色" width="120">
                    <template slot-scope="scope">
                        <el-button size="mini" v-if="$hasButton('oper.admin.user.distributeRole')" @click="assignRoles(scope.$index,scope.row)">分配角色</el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="270">
                    <template slot-scope="scope">
                        <el-button size="mini" v-if="$hasButton('oper.admin.user.view')" @click="lookBtn(scope.$index,scope.row)">查看</el-button>
                        <el-button size="mini" v-if="$hasButton('oper.admin.user.update')" type="primary" @click="modifyBtn(scope.$index,scope.row)">编辑</el-button>
                        <el-button size="mini" v-if="$hasButton('oper.admin.user.delete')" type="danger" @click="deleteBefore(scope.$index,scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <div class="block">
            <el-pagination class="paginationBox"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :unique-opened="true"
                           :current-page="pageNum"
                           :page-sizes="pageSizes"
                           :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="proTotal">
            </el-pagination>
        </div>
        <!--角色分配-->
        <el-drawer title="角色分配"
                   custom-class="roledrawerStyle"
                   size="40%"
                   :visible.sync="dialogAssignVisible"
                   :direction="direction"
                   :before-close="handleClose1">
            <el-form :model="assignFrom" :rules="ruleAssignAccount" ref="assignFrom">
                <template prop="roleList">
                    <el-transfer filterable @change="handleChange" :props="{key: 'roleId',label: 'roleName'}" :titles="['所有角色', '已有角色']" v-model="assignFrom.roleList1" :data="roleData"></el-transfer>
                </template>
            </el-form>
            <div id="footerAssignContent">
                <el-button type="primary" @click="submitAssignForm('assignFrom')" plain>确 定</el-button>
                <el-button @click="dialogAssignVisible = false">返回</el-button>
            </div>
        </el-drawer>
        <!--左侧弹出框-->
        <el-drawer
                title="账户信息"
                custom-class="drawerStyle"
                size="35%"
                :visible.sync="drawer"
                :direction="direction"
                :before-close="handleClose">
            <el-form :model="accountDetailFrom" :rules="ruleDetailAccount" ref="accountDetailFrom">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户全名" :label-width="formLabelWidth" prop="userFullName">
                            <el-input v-model="accountDetailFrom.userFullName" :disabled="editDisabled" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobile">
                            <el-input v-model="accountDetailFrom.mobile" :disabled="editDisabled" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                            <el-input v-model="accountDetailFrom.password" :disabled="editDisabled" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="email" :label-width="formLabelWidth" prop="email">
                            <el-input v-model="accountDetailFrom.email" :disabled="editDisabled" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="微信号" :label-width="formLabelWidth" prop="wechat">
                            <el-input v-model="accountDetailFrom.wechat" :disabled="editDisabled" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
                            <el-input v-model="accountDetailFrom.remark" :disabled="editDisabled" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="账号状态" prop="status" :label-width="formLabelWidth">
                            <el-select class="selectAccount" v-model="accountDetailFrom.status" :disabled="editDisabled" placeholder="请选择">
                                <el-option
                                        v-for="item in accountStateList"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div id="footerContent" v-if="addUserBtn">
                <el-button type="primary" @click="submitAccountForm('accountDetailFrom')" plain>确 定</el-button>
                <el-button @click="handleClose">取 消</el-button>
            </div>
            <permissionConfiguration :clickStyle="clickType" v-if="DestroyPermission&&addUser" v-on:closeParentDrawer="listenDrawer" v-on:treeChuan="listenTree"></permissionConfiguration>
        </el-drawer>
    </div>
</template>

<script>
    import { accout } from "@/utils/Api"
    import { getUserIdList } from "@/components/js/initMapTree";
    import PermissionConfiguration from "@/views/AccountIManage/PermissionConfiguration";
    export default {
        data(){
            return {
                tableData: [],
                loading:false,
                pageable:'',
                pageNum:1,
                proTotal:null,
                pageSize:10,
                pageSizes:[10,20,30],
                nowPageSizes:10,
                formLabelWidth: '80px',
                inputWidth:"60px",
                styleObj: {
                    'color': '#313334',
                    'background-color': "#fafafa",
                    "font-size": "13px",
                    "letter-spacing": "2px",
                },
                dialogFormVisible:false,
                dialogUpdateFormVisible:false,
                dialogDetailVisible:false,
                dialogAssignVisible:false,
                accountStateList:[
                    {key:'',value:'所有'},
                    {key:0,value:'正常'},
                    {key:1,value:'禁用'},
                    {key:2,value:'锁定'},
                ],
                accountFrom:{
                    userFullName:'',
                    mobile:'',
                    password:'',
                    email:'',
                    wechat:'',
                    remark:'',
                    status:0,
                },
                accountFrombackUp:{
                    userFullName:'',
                    mobile:'',
                    password:'',
                    email:'',
                    wechat:'',
                    remark:'',
                    status:0,
                },
                assignFrom:{
                    roleList1:[],
                },
                accountUpdateFrom:{
                    userFullName:'',
                    mobile:'',
                    password:'',
                    email:'',
                    wechat:'',
                    remark:'',
                    status:0,
                },
                accountDetailFrom:{
                    userFullName:'',
                    mobile:'',
                    password:'',
                    email:'',
                    wechat:'',
                    remark:'',
                    status:0,
                },
                ruleAccount: {
                    userFullName: [
                        { required: true, message: '请输入用户全名', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    mobile: [
                        {  required: true, message: '请输入手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入email', trigger: 'blur' }
                    ],
                    wechat: [
                        { required: true, message: '请输入微信号', trigger: 'blur' }
                    ],
                    remark: [
                        { required: true, message: '请填写备注信息', trigger: 'blur' }
                    ],
                    status:[
                        { required: true, message: '请选择账户状态', trigger: 'change' }
                    ],
                },
                ruleDetailAccount: {
                    userFullName: [
                        { required: true, message: '请输入用户全名', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    mobile: [
                        {  required: true, message: '请输入手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入email', trigger: 'blur' }
                    ],
                    wechat: [
                        { required: true, message: '请输入微信号', trigger: 'blur' }
                    ],
                    remark: [
                        { required: true, message: '请填写备注信息', trigger: 'blur' }
                    ],
                    status:[
                        { required: true, message: '请选择账户状态', trigger: 'change' }
                    ],
                },
                ruleUpdateAccount: {
                    userFullName: [
                        { required: true, message: '请输入用户全名', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    mobile: [
                        {  required: true, message: '请输入手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入email', trigger: 'blur' }
                    ],
                    wechat: [
                        { required: true, message: '请输入微信号', trigger: 'blur' }
                    ],
                    remark: [
                        { required: true, message: '请填写备注信息', trigger: 'blur' }
                    ],
                    status:[
                        { required: true, message: '请选择账户状态', trigger: 'change' }
                    ],
                },
                ruleAssignAccount: {
                },
                status:'',
                userFullName:'',
                mobile:'',
                email:'',
                roleData:[],
                checked:[],
                roleList:[],
                drawer: false,
                direction: 'rtl',
                DestroyPermission:true,
                addUser:true,
                editDisabled:false,
                addUserBtn:false,
                clickType:true,//判断是否修改数据
                treeKey:[],
            }
        },
        methods:{
            //获取账户列表
            getAccountList(data1,data2){
                this.loading=true;
                this.$Api.Accout.getAccountList({
                    pageNo:data1||this.pageNum,
                    pageSize:data2||this.pageSize,
                }).then(res => {
                    if (res.result == '00000000') {
                        this.tableData=res.data.content;
                        this.pageable=res.data.pageable;
                        this.pageNum=this.$pageNoZero(this.pageable.pageNumber,1);
                        this.pageSize=this.$pageNoZero(this.pageable.pageSize,10);
                        this.proTotal=this.pageable.totalElements;
                        this.loading=false;
                    } else {
                    }
                });
            },
            //选择多少条数据功能
            handleSizeChange(val) {
                this.getAccountList(this.pageNum,val);
            },
            //左右翻页功能
            handleCurrentChange(val) {
                this.getAccountList(val,this.pageSize);
            },
            //搜索功能
            searchAccount(){
                this.loading=true;
                this.$Api.Accout.searchAccount({
                    pageNo:1,
                    pageSize:this.pageSize,
                    status:this.status,
                    userFullName:this.userFullName,
                    mobile:this.mobile,
                    email:this.email,
                }).then(res => {
                    if (res.result == '00000000') {
                        this.tableData=res.data.content;
                        this.pageNum=res.data.pageable.pageNumber;
                        this.pageSize=res.data.pageable.pageSize;
                        this.proTotal=res.data.pageable.totalElements;
                        this.loading=false;
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                });
            },
            //重置功能
            resetAccount(){
                this.status = 0;
                this.userFullName = '';
                this.mobile = '';
                this.email = '';
                this.getAccountList(1,10);
            },
            //搜索条件清空
            clearConditions(){
                console.log("搜索条件清空");
            },
            //添加账户
            addAccount(){
                this.addUser=false;
                this.addUserBtn=true;
                this.drawer=true;
            },
            //分配角色
            assignRoles(data1,data2){
                this.dialogAssignVisible=true;
                this.userId=data2.userId;
                this.getRoleList();
                this.getUserRoleList(this.userId);
            },
            //提交分配submitAssignForm
            submitAssignForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$Api.Accout.updateUserRole({
                            userId:this.userId,
                            roleIds:this.assignFrom.roleList1,
                        }).then(res => {
                            if (res.result == '00000000') {
                                this.$message({
                                    message: '分配成功',
                                    type: 'success'
                                });
                                this.getAccountList(this.pageNum,this.pageSize);
                                this.dialogAssignVisible=false;
                            } else {
                                this.$message({
                                    message: res.msg,
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
            //查看功能
            detailsBtn(data1,data2){
                this.accountDetailFrom=data2;
                this.dialogDetailVisible=true
            },
            //编辑功能
            modifyBtn(data1,data2){
                this.drawer=true;
                this.clickType=true;
                this.addUser=true;
                this.editDisabled=false;
                this.DestroyPermission = true;
                this.accountDetailFrom=data2;
                this.permissionsBtn(data1,data2);
            },
            //权限配置功能
            permissionsBtn(data1,data2){
                this.$store.commit('getUserId', data2.userId);
                this.$store.commit('getRoleName', data2.roleName);
            },
            //删除询问功能
            deleteBefore(data1,data2){
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteBtn(data1,data2);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //删除功能
            deleteBtn(data1,data2){
                this.$Api.Accout.daleteUser({
                    userId:data2.userId,
                }).then(res => {
                    if (res.result == '00000000') {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getAccountList(this.pageNum,this.pageSize);
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                });
            },
            //登录状态 0-正常 1：禁用 2：锁定
            loginState(row){
                if(row.loginFlag==="0"){
                    return "未登录"
                }else {
                    return "已登录"
                }
            },
            //账号状态 0未登录，1已登录
            accountState(row){
                if(row.status===2){
                    return "锁定"
                }else if(row.status===1){
                    return "禁用"
                }else {
                    return "正常"
                }
            },
            //增加账户
            submitAccountForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$Api.Accout.addUser({
                            remark:this.accountDetailFrom.remark,
                            userFullName:this.accountDetailFrom.userFullName,
                            mobile:this.accountDetailFrom.mobile,
                            email:this.accountDetailFrom.email,
                            wechat:this.accountDetailFrom.wechat,
                            password:this.accountDetailFrom.password,
                            status:this.accountDetailFrom.status,
                        }).then(res => {
                            if (res.result == '00000000') {
                                this.$message({
                                    message: '登录成功',
                                    type: 'success'
                                });
                                this.getAccountList(this.pageNum,this.pageSize);
                                this.drawer=false;
                                this.addUserBtn=false;
                                this.$refs["accountDetailFrom"].resetFields();
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
            //修改账户
            submitAccountUpdateForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$Api.Accout.updateUser({
                            user:{
                                remark:this.accountDetailFrom.remark,
                                userFullName:this.accountDetailFrom.userFullName,
                                mobile:this.accountDetailFrom.mobile,
                                email:this.accountDetailFrom.email,
                                wechat:this.accountDetailFrom.wechat,
                                password:this.accountDetailFrom.password,
                                status:this.accountDetailFrom.status,
                                userId:this.$store.state.userId
                            },
                            funcIds:this.treeKey
                        }).then(res => {
                            if (res.result == '00000000') {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.getAccountList(this.pageNum,this.pageSize);
                                this.drawer=false;
                                this.addUserBtn=false;
                                this.$refs["accountDetailFrom"].resetFields();
                            } else {
                                this.$message({
                                    message: res.msg,
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
            //获取所有角色列表
            getRoleList(){
                this.$Api.Role.getRoleList({
                    pageNo:1,
                    pageSize:998,
                }).then(res => {
                    if (res.result == '00000000') {
                        this.roleData=res.data.content;
                        console.log(this.roleData);
                    } else {
                    }
                });
            },
            //获取当前用户的角色权限
            getUserRoleList(userId){
                this.$Api.Accout.listCurrUserRoles({
                    pageNo:1,
                    pageSize:10,
                    userId:userId,
                }).then(res => {
                    if (res.result == '00000000') {
                        this.assignFrom.roleList1=getUserIdList(res.data);
                        console.log("111111"+this.assignFrom.roleList1);
                    } else {
                    }
                });
            },
            //穿梭框的移动操作
            handleChange(value, direction, movedKeys) {
                //可以通过direction回调right/left 来进行操作，right：把数字移到右边，left把数据移到左边
                if(direction === "right") {
                    console.log(this.assignFrom.roleList);
                }
                if(direction === "left") {
                    console.log(this.assignFrom.roleList);
                }

            },
            //左侧关闭提醒
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.DestroyPermission=false;
                        this.addUser=true;
                        this.drawer=false;
                        this.editDisabled=false;
                        this.addUserBtn=false;
                    })
                    .catch(_ => {
                    });
            },
            //关闭角色分配
            handleClose1(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.dialogAssignVisible=false;
                    })
                    .catch(_ => {
                    });
            },
            //查看账户
            lookBtn(data1,data2){
                this.drawer=true;
                this.clickType=false;
                this.addUser=true;
                this.editDisabled=true;
                this.DestroyPermission = true;
                this.accountDetailFrom=data2;
                this.permissionsBtn(data1,data2);
            },
            //监听子类方法
            listenDrawer(data){
                this.DestroyPermission=false;
                this.addUser=true;
                this.drawer=false;
                this.editDisabled=false;
            },
            //监听子组件的tree的值，提交
            listenTree(data){
                this.treeKey=data;
                this.submitAccountUpdateForm('accountDetailFrom');
            },
            //初始化表单
            restFrom(accountDetailFrom){
                this.accountDetailFrom.userFullName='';
                this.accountDetailFrom.mobile='';
                this.accountDetailFrom.password='';
                this.accountDetailFrom.email='';
                this.accountDetailFrom.wechat='';
                this.accountDetailFrom.remark='';
                this.accountDetailFrom.status=0;
            }
        },
        mounted(){
            this.loading=true;
            this.getAccountList(1,10);
        },
        components: {
            permissionConfiguration:PermissionConfiguration
        },
    }
</script>

<style lang="less" scoped>
    #accountCotent {
        height: calc(100% - 20px);
        padding: 20px 0 0 20px;
        background-color: #fff;
        .el-form-item__content{
            text-align: left;
        }
        .operateArea{
            margin-top: 15px;
            margin-bottom: 15px;
            text-align: center;
        }
    }
    #footerContent ,#footerDetailContent ,#footerUpdateContent,#footerAssignContent{
        text-align: center;
    }
    #footerAssignContent{
        margin-top: 15px;
    }
    #footerContent ,#footerAssignContent{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 60px;
        line-height: 60px;
    }
    #accountCotent .el-dialog{
        line-height: 30px !important;
    }
    .tableStyle {
        line-height: 30px;
        width: 97%;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .tableArea{
        margin-top: 15px;
    }
    .paginationBox {
        width: 97%;
        text-align: center;
    }
    .conditionsContent{
        line-height: 40px;
        height: 85px;
        width: 97%;
        margin: 0 0 15px 0;
        font-family:"webfont" !important;
        font-size:14px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
        .searchBtn{
            width: 200px;
            text-align: right;
        }
        .addRole{
            letter-spacing: 2px;
        }
        .searchAccount{
            margin-left: 20px;
            letter-spacing: 2px;
        }
        .resetAccount{
            margin-left: 20px;
            letter-spacing: 2px;
        }
    }
    .selectAccount{
        float: left;
    }
    .drawerStyle{
        color: red;
    }
    /deep/ .el-tree-node__label {
        padding-left: 8px;
    }
    /deep/ input::-webkit-input-placeholder {
        color: #aab2bd;
        text-align: left;
        font-size: 13px;
    }
</style>
<style>
    #accountCotent .el-transfer-panel__item.el-checkbox {
        text-align: left;
        display: block;
        color: #606266;
    }
    #accountCotent .el-transfer-panel .el-transfer-panel__header{
        text-align: left;
    }
    .drawerStyle #el-drawer__title ,.roledrawerStyle #el-drawer__title{
        padding: 19px;
        border-bottom: 1px solid #ccc;
    }
    .drawerStyle{
        overflow-y: auto;
    }
    .drawerStyle .el-drawer__body{
        font-family:"webfont" !important;
    }
    .roledrawerStyle .el-transfer{
        text-align: center;
        font-family:"webfont" !important;
    }
    .roledrawerStyle .el-transfer-panel__list.is-filterable{
        text-align: left;
    }
    .roledrawerStyle .el-transfer-panel__item.el-checkbox{
        display: block;
    }
    .roledrawerStyle .el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label ,.el-drawer__header>:first-child{
        font-family:"webfont" !important;
    }
    .roledrawerStyle .el-transfer-panel__item.el-checkbox .el-checkbox__label{
        font-family:"webfont" !important;
    }
    .roledrawerStyle .el-transfer-panel .el-transfer-panel__header .el-checkbox{
        text-align: left;
    }
</style>
