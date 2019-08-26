<template>
    <div id="roleCotent">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="web-font" :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item class="web-font">角色管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <div class="conditionsContent">
            <el-button class="addRole" v-if="$hasButton('auditRole')" @click="addRole" type="primary">增加角色</el-button>
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
                        <el-button size="mini" v-if="$hasButton('checkRoleUser')" @click="lookRoleUser(scope.$index,scope.row)">查看角色用户</el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" v-if="$hasButton('checkRole')" @click="detailsBtn(scope.$index,scope.row)">查看</el-button>
                        <el-button size="mini" v-if="$hasButton('editRole')" type="primary" @click="modifyBtn(scope.$index,scope.row)">修改</el-button>
                        <el-button size="mini" v-if="$hasButton('rolePermissionConfiguration')" type="info" @click="permissionsBtn(scope.$index,scope.row)">权限配置</el-button>
                        <el-button size="mini" v-if="$hasButton('deleteRole')" type="danger" @click="deleteBefore(scope.$index,scope.row)">删除</el-button>
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
        <!--以下三个部分待封装公共组件-->
        <!--增加角色-->
        <el-dialog title="增加角色" :visible.sync="dialogFormVisible">
            <el-form :model="roleFrom" :rules="ruleRole" ref="roleFrom">
                <el-row>
                    <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
                        <el-input v-model="roleFrom.roleName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
                        <el-input type="textarea" v-model="roleFrom.remark" autocomplete="off"></el-input>
                    </el-form-item>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer" id="footerContent">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitroleForm('roleFrom')">确 定</el-button>
            </div>
        </el-dialog>
        <!--角色详情-->
        <el-dialog title="角色详情" :visible.sync="dialogDetailVisible">
            <el-form :model="roleDetailFrom" :rules="ruleDetailRole" ref="roleDetailFrom">
                <el-row>
                    <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
                        <el-input v-model="roleDetailFrom.roleName" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" :disabled="true" :label-width="formLabelWidth" prop="remark">
                        <el-input type="textarea" v-model="roleDetailFrom.remark" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer" id="footerDetailContent">
                <el-button type="primary" @click="dialogDetailVisible = false">返回</el-button>
            </div>
        </el-dialog>
        <!--修改角色-->
        <el-dialog title="修改角色" :visible.sync="dialogUpdateVisible">
            <el-form :model="roleUpdateFrom" :rules="ruleUpdateRole" ref="roleUpdateFrom">
                <el-row>
                    <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
                        <el-input v-model="roleUpdateFrom.roleName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
                        <el-input type="textarea" v-model="roleUpdateFrom.remark" autocomplete="off"></el-input>
                    </el-form-item>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer" id="footerUpdateContent">
                <el-button @click="dialogUpdateVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitroleUpdateForm('roleUpdateFrom')">确 定</el-button>
            </div>
        </el-dialog>

        <!--添加新的结构-->
    </div>
</template>

<script>
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
                    "font-size": "12px",
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
                this.dialogFormVisible=true;
            },
            //查看功能
            detailsBtn(data1,data2){
                this.roleDetailFrom.roleName=data2.roleName;
                this.dialogDetailVisible=true
            },
            //修改功能
            modifyBtn(data1,data2){
                this.dialogUpdateVisible=true;
                this.roleUpdateFrom.roleName=data2.roleName;
                this.$store.commit('getRoleId', data2.roleId);
            },
            //权限配置功能
            permissionsBtn(data1,data2){
                let breadcrumb=this.$route.path;
                let breadname=this.$route.name;
                this.$store.commit('getBreadcrumb', breadcrumb);
                this.$store.commit('getBreadname', breadname);
                this.$store.commit('getRoleId', data2.roleId);
                this.$store.commit('getRoleName', data2.roleName);
                this.$store.commit('getRoleFunction', data2);
                this.$router.push('/role/PermissionConfiguration');
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
                            }
                        }).then(res => {
                            if (res.result == '00000000') {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.dialogFormVisible=false;
                                this.getRoleList(this.pageNum,this.pageSize);
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
                                roleName:this.roleUpdateFrom.roleName,
                                roleId:this.$store.state.roleId,
                            }
                        }).then(res => {
                            if (res.result == '00000000') {
                                this.$message({
                                    message: '修改成功',
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
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
        mounted(){
            this.getRoleList(1,10);
        }
    }
</script>

<style lang="less">
    #roleCotent {
        height: calc(100% - 20px);
        padding: 20px 0 0 20px;
        background-color: #fff;
        .el-dialog{
            width: 30% !important;
        }
        .tableStyle {
            line-height: 30px;
            width: 97%;
            margin-top: 20px;
            margin-bottom: 20px;
        }
        .paginationBox {
            width: 97%;
            text-align: center;
        }
        .conditionsContent{
            line-height: 40px;
            height: 40px;
            width: 97%;
            margin: 0 0 15px 0;
            .searchBtn {
                float: right;
                width: 240px;
            }
            .addRole{
                float: left;
            }
        }
        #footerDetailContent ,#footerContent ,#footerUpdateContent{
            text-align: center;
        }
        .el-breadcrumb{
            font-family:"webfont" !important;
        }
    }
</style>
