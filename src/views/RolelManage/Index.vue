<template>
    <div id="roleCotent">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="web-font" :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item class="web-font">角色管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <div class="conditionsContent">
            <el-button class="addRole" v-if="$hasButton('oper.admin.role.add')" @click="addRole" type="primary">增加角色</el-button>
            <el-input placeholder="请输入角色名称" v-model="searchRoleName" class="searchBtn" clearable @clear="clearConditions">
                <el-button slot="append" @click="searchBtn" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <template>
            <el-table class="tableStyle" align="center" :header-cell-style='styleObj' v-loading="loading" :data="tableData" border>
                <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
                <el-table-column align="center" prop="roleId" label="角色编号" width="100"></el-table-column>
                <el-table-column align="center" prop="roleName" label="角色名称" width="120"></el-table-column>
                <el-table-column align="center" prop="updateBy" label="修改人" width="120"></el-table-column>
                <el-table-column align="center" prop="updateTime" label="上一次修改时间" min-width="200"></el-table-column>
                <el-table-column align="center" label="角色用户" width="120">
                    <template slot-scope="scope">
                        <el-button size="mini" v-if="$hasButton('oper.admim.role.viewUserList')" @click="lookRoleUser(scope.$index,scope.row)">查看角色用户</el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" v-if="$hasButton('oper.admin.role.view')" @click="detailsBtn(scope.$index,scope.row)">查看</el-button>
                        <el-button size="mini" v-if="$hasButton('oper.admin.role.update')" type="primary" @click="modifyBtn(scope.$index,scope.row)">修改</el-button>
                        <el-button size="mini" v-if="$hasButton('oper.admin.role.delete')" type="danger" @click="deleteBefore(scope.$index,scope.row)">删除</el-button>
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
        <!--左侧弹出框-->
        <el-drawer
                title="角色信息"
                custom-class="drawerStyle"
                size="30%"
                :visible.sync="drawer"
                :direction="direction"
                :before-close="handleClose">
            <el-form :model="roleFrom" :rules="ruleRole" ref="roleFrom">
                <el-row>
                    <el-col :offset="1" :span="12">
                    <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
                        <el-input v-model="roleFrom.roleName" :disabled="editDisabled" autocomplete="off"></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div id="footerContent" v-if="addUserBtn">
                <el-button type="primary" @click="submitroleForm('roleFrom')" plain>确 定</el-button>
                <el-button @click="handleClose">取 消</el-button>
            </div>
            <permissionConfiguration :clickStyle="clickType" v-if="DestroyPermission&&addUser" v-on:closeParentDrawer="listenDrawer" v-on:treeChuan="listenTree"></permissionConfiguration>
        </el-drawer>
    </div>
</template>

<script>
    import PermissionConfiguration from "@/views/RolelManage/PermissionConfiguration";
    export default {
        data(){
            return {
                tableData:[],
                loading:false,
                pageable:'',
                pageNum: 1,
                pageSize:10,
                pageSizes:[10,20,30],
                proTotal:null,
                formLabelWidth: '80px',
                styleObj: {
                    'color': '#313334',
                    'background-color': "#fafafa",
                    "font-size": "13px",
                    "letter-spacing": "2px",
                },
                search:'',
                dialogFormVisible:false,
                dialogDetailVisible:false,
                dialogUpdateVisible:false,
                roleFrom:{
                    roleName:'',
                    remark:'',
                },
                roleDetailFrom:{
                    roleName:'',
                    remark:'',
                },
                roleUpdateFrom:{
                    roleName:'',
                    remark:'',
                },
                ruleRole: {
                    roleName: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                },
                ruleDetailRole: {
                    roleName: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                },
                ruleUpdateRole: {
                    roleName: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                },
                searchRoleName:'',
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
            //获取角色列表
            getRoleList(data1,data2){
                this.loading=true;
                this.$Api.Role.getRoleList({
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
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                });
            },
            //选择多少条数据功能
            handleSizeChange(val) {
                this.getRoleList(this.pageNum,val);
            },
            //左右翻页功能
            handleCurrentChange(val) {
                this.getRoleList(val,this.pageSize);
            },
            //搜索功能
            searchBtn(){
                this.loading=true;
                this.$Api.Role.searchRoleUser({
                    pageNo: this.pageNum,
                    pageSize: this.pageSize,
                    roleName: this.searchRoleName,
                }).then(res => {
                    if (res.result == '00000000') {
                        this.tableData=res.data.content;
                        this.loading=false;
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                });
            },
            //搜索条件清空
            clearConditions(){
                this.getRoleList(1,10);
            },
            //添加角色
            addRole(){
                this.addUser=false;
                this.addUserBtn=true;
                this.drawer=true;
            },
            //查看功能
            detailsBtn(data1,data2){
                this.roleFrom.roleName=data2.roleName;
                this.drawer=true;
                this.clickType=false;
                this.addUser=true;
                this.editDisabled=true;
                this.DestroyPermission = true;
                this.permissionsBtn(data1,data2);
            },
            //修改功能
            modifyBtn(data1,data2){
                this.drawer=true;
                this.clickType=true;
                this.addUser=true;
                this.editDisabled=false;
                this.DestroyPermission = true;
                this.roleFrom.roleName=data2.roleName;
                console.log(data2);
                this.permissionsBtn(data1,data2);
            },
            //权限配置功能
            permissionsBtn(data1,data2){
                this.$store.commit('getUserId', data2.userId);
                this.$store.commit('getRoleId', data2.roleId);
                this.$store.commit('getRoleName', data2.roleName);
            },
            //删除询问功能
            deleteBefore(data1,data2){
                this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
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
                this.$Api.Role.daleteRole({
                    roleId:data2.roleId,
                }).then(res => {
                    if (res.result == '00000000') {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getRoleList(this.pageNum,this.pageSize);
                        this.dialogUpdateVisible=false;
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                });
            },
            //查看角色用户
            lookRoleUser(data1,data2){
                let breadcrumb=this.$route.path;
                let breadname=this.$route.name;
                this.$store.commit('getBreadcrumb', breadcrumb);
                this.$store.commit('getBreadname', breadname);
                this.$store.commit('getRoleFunction', data2);
                this.$store.commit('getRoleId', data2.roleId);
                this.$router.push('/role/RoleUser');
            },
            //添加角色
            submitroleForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$Api.Role.addRole({
                            role:{
                                roleName:this.roleFrom.roleName,
                            },
                            funcIds:[],
                        }).then(res => {
                            if (res.result == '00000000') {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.getRoleList(this.pageNum,this.pageSize);
                                this.drawer=false;
                                this.addUserBtn=false;
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
            //修改角色
            submitroleUpdateForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$Api.Role.updateRole({
                            role:{
                                roleName:this.roleFrom.roleName,
                                roleId:this.$store.state.roleId,
                            },
                            funcIds:this.treeKey,
                        }).then(res => {
                            if (res.result == '00000000') {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.getRoleList(this.pageNum,this.pageSize);
                                this.drawer=false;
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
            //查看账户
            lookBtn(data1,data2){
                this.drawer=true;
                this.clickType=false;
                this.addUser=true;
                this.editDisabled=true;
                this.DestroyPermission = true;
                this.roleFrom=data2;
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
                this.submitroleUpdateForm('roleFrom');
            },
        },
        mounted(){
            this.getRoleList(1,10);
        },
        components: {
            permissionConfiguration:PermissionConfiguration
        },
    }
</script>

<style lang="less" scoped>
    #roleCotent {
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
    #footerContent ,#footerDetailContent ,#footerUpdateContent{
        text-align: center;
    }
    #footerContent{
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
        height: 34px;
        width: 97%;
        margin: 0 0 15px 0;
        font-family:"webfont" !important;
        font-size:14px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
        .searchBtn {
            float: right;
            width: 240px;
        }
        .addRole{
            float: left;
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
    .drawerStyle #el-drawer__title{
        padding: 19px;
        border-bottom: 1px solid #ccc;
    }
    .drawerStyle{
        overflow-y: auto;
    }
</style>
