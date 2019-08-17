<template>
    <div id="roleCotent">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>账户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <div class="conditionsContent">
            <el-button class="addRole" @click="addAccount" type="primary">增加账户</el-button>
            <el-input placeholder="请输入内容" v-model="search" class="searchBtn" clearable @clear="clearConditions">
                <el-button slot="append" @click="searchBtn" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <template>
            <el-table class="tableStyle" align="center" :header-cell-style='styleObj' v-loading="loading" :data="tableData" border>
                <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
                <el-table-column align="center" prop="userFullName" label="用户名称" width="100"></el-table-column>
                <el-table-column align="center" prop="mobile" label="手机号" width="110"></el-table-column>
                <el-table-column align="center" prop="email" label="email" width="120"></el-table-column>
                <el-table-column align="center" prop="wechat" label="微信" width="120"></el-table-column>
                <el-table-column align="center" prop="remark" label="备注" min-width="200"></el-table-column>
                <el-table-column align="center" :formatter="accountState" prop="status" label="账号状态" width="90"></el-table-column>
                <el-table-column align="center" :formatter="loginState" prop="loginFlag" label="登陆状态" width="90">
                </el-table-column>
                <el-table-column align="center" label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="detailsBtn(scope.$index,scope.row)">查看</el-button>
                        <el-button size="mini" type="primary" @click="modifyBtn(scope.$index,scope.row)">修改</el-button>
                        <el-button size="mini" type="info" @click="permissionsBtn(scope.$index,scope.row)">权限配置</el-button>
                        <el-button size="mini" type="danger" @click="deleteBefore(scope.$index,scope.row)">删除</el-button>
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
        <!--增加账户-->
        <el-dialog title="增加账户" :visible.sync="dialogFormVisible">
            <el-form :model="accountFrom" :rules="ruleAccount" ref="accountFrom">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户全名" :label-width="formLabelWidth" prop="userFullName">
                            <el-input v-model="accountFrom.userFullName" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobile">
                            <el-input v-model="accountFrom.mobile" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                            <el-input v-model="accountFrom.password" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="email" :label-width="formLabelWidth" prop="email">
                            <el-input v-model="accountFrom.email" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="微信号" :label-width="formLabelWidth" prop="wechat">
                            <el-input v-model="accountFrom.wechat" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
                            <el-input v-model="accountFrom.remark" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="账号状态" prop="status" :label-width="formLabelWidth">
                            <el-select class="selectAccount" v-model="accountFrom.status" placeholder="请选择">
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
            <div slot="footer" class="dialog-footer" id="footerContent">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitAccountForm('accountFrom')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { accout } from "@/utils/Api"
    export default {
        data(){
            return {
                tableData: [
                    {
                        index:1,
                        userName:1,
                        statisticsDate:1,
                    },
                    {
                        index:1,
                        userName:1,
                        statisticsDate:1,
                    },
                    {
                        index:1,
                        userName:1,
                        statisticsDate:1,
                    },
                    {
                        index:1,
                        userName:1,
                        statisticsDate:1,
                    },
                    {
                        index:1,
                        userName:1,
                        statisticsDate:1,
                    },
                ],
                loading:false,
                pageNum:null,
                proTotal:null,
                pageSize:null,
                pageSizes:[10,20,30],
                nowPageSizes:10,
                formLabelWidth: '120px',
                styleObj: {
                    'color':'#313334',
                    'background-color':"#fafafa",
                    "font-size":"12px",
                    "font-size":"12px",
                },
                search:'',
                dialogFormVisible:false,
                accountStateList:[
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
                }
            }
        },
        methods:{
            //获取账户列表
            getAccountList(data1,data2){
                this.$Api.accout.getAccountList({
                    pageNo:data1||this.pageNum,
                    pageSize:data2||this.pageSize,
                }).then(res => {
                    if (res.result == '00000000') {
                        this.tableData=res.data.content;
                        this.pageNum=res.data.pageable.pageNumber;
                        this.pageSize=res.data.pageable.pageSize;
                        this.proTotal=res.data.pageable.totalElements;
                        this.loading=false;
                    } else {
                    }
                });
            },
            //翻页功能
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                console.log(this.pageNum);
                this.nowPageSizes=val;
                this.getAccountList(this.pageNum,val);
            },
            //翻页功能
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                console.log(this.pageNum);
                this.getAccountList(val,this.pageNum);
            },
            //搜索功能
            searchBtn(){
                console.log(this.search);
            },
            //搜索条件清空
            clearConditions(){
                console.log("搜索条件清空");
            },
            //添加账户
            addAccount(){
                this.dialogFormVisible=true;
            },
            //查看功能
            detailsBtn(data1,data2){
                console.log(data1,data2);
            },
            //修改功能
            modifyBtn(data1,data2){
                console.log(data1,data2);
            },
            //权限配置功能
            permissionsBtn(data1,data2){
                console.log(data1,data2);
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
                console.log(data1,data2);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            },
            //登录状态 0未登录，1已登录
            loginState(row){
                if(row.status===0){
                    return "未登录"
                }else {
                    return "已登录"
                }
            },
            //账号状态 0-正常 1：禁用 2：锁定
            accountState(row){
                if(row.loginFlag===2){
                    return "锁定"
                }else if(row.loginFlag===1){
                    return "禁用"
                }else {
                    return "正常"
                }
            },
            //增加账户
            submitAccountForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$Api.Login.loginIn({
                            mobile:this.ruleForm.username,
                            password:this.ruleForm.password,
                        }).then(res => {
                            if (res.result == '00000000') {
                                this.$message({
                                    message: '登录成功',
                                    type: 'success'
                                });
                                //1个小时过期的token
                                this.$cookie.set("loginToken", res.data, {
                                    expires: 1
                                });
                                this.$router.push('/home');
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
            this.loading=true;
            this.getAccountList(1,10);
        }
    }
</script>

<style lang="less" scoped>
    #roleCotent {
        height: 100%;
        padding: 20px 0 0 20px;
        background-color: #fff;
        .el-form-item__content{
            text-align: left;
        }
    }
    #footerContent{
        text-align: center;
    }
    #roleCotent .el-dialog{
        line-height: 30px !important;
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
    .selectAccount{
        float: left;
    }

</style>
