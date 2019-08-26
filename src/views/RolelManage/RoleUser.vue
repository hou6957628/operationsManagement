<template>
    <div id="roleList">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="web-font" :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item class="web-font" :to="{ path:breadcrumb }">{{breadname}}</el-breadcrumb-item>
        <el-breadcrumb-item class="web-font">角色用户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <div class="conditionsContent">
            <el-button class="addRole" v-if="$hasButton('oper.admim.role.deleteUser')" @click="romoveAllRole" type="danger">批量移除角色</el-button>
            <el-input placeholder="请输入账户名称" v-model="search" class="searchBtn" clearable @clear="clearConditions">
                <el-button slot="append" @click="searchBtn" icon="el-icon-search"></el-button>
            </el-input>
        </div>
    <template>
        <el-table @selection-change="handleSelectionChange" ref="multipleTable"  highlight-current-row class="tableStyle" align="center" :header-cell-style='styleObj' v-loading="loading" :data="tableData" border>
            <el-table-column align="center" type="selection" width="55"></el-table-column>
            <el-table-column align="center" type="index" label="序号" width="120"></el-table-column>
            <el-table-column align="center" prop="userId" label="账户编号" width="120"></el-table-column>
            <el-table-column align="center" prop="userFullName" label="账户名称" width="120"></el-table-column>
            <el-table-column align="center" prop="mobile" label="手机号码" width="120"></el-table-column>
            <el-table-column align="center" prop="email" label="Email" width="120"></el-table-column>
            <el-table-column align="center" prop="wechat" label="微信" width="120"></el-table-column>
            <el-table-column align="center" :formatter="roleState" prop="status" label="用户状态" width="120"></el-table-column>
            <el-table-column align="center" prop="desc" label="备注" min-width="120"></el-table-column>
            <el-table-column align="center" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button size="mini" v-if="$hasButton('oper.admim.role.deleteUser')" type="danger" @click="deleteBefore(scope.$index,scope.row)">删除</el-button>
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
    </div>
</template>

<script>
    export default {
        data(){
            return {
                tableData:[],
                loading:false,
                pageNum: 1,
                proTotal:null,
                pageSize:10,
                pageable:'',
                pageSizes:[10,20,30],
                formLabelWidth: '80px',
                styleObj: {
                    'color': '#313334',
                    'background-color': "#fafafa",
                    "font-size": "12px",
                    "letter-spacing": "2px",
                },
                search:'',
                breadcrumb:'',
                breadname:'',
                customerId:"",
            }
        },
        methods:{
            //获取角色列表
            getRoleList(data1,data2){
                this.loading=true;
                this.$Api.Role.getRoleFunction({
                    roleId:this.roleId,
                    pageNo:data1,
                    pageSize:data2,
                }).then(res => {
                    if (res.result == '00000000') {
                        this.tableData=res.data.userList;
                        this.pageable=res.data.pageable;
                        // this.pageNum=this.$pageNoZero(this.pageable.pageNumber,1);
                        // this.pageSize=this.$pageNoZero(this.pageable.pageSize,10);
                        // this.proTotal=this.pageable.totalElements;
                        this.loading=false;
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                });
            },
            //翻页功能
            handleSizeChange(val) {
                this.nowPageSizes=val;
                console.log(this.pageNum);
                this.getRoleList(this.pageNum,val);
            },
            //翻页功能
            handleCurrentChange(val) {
                this.getRoleList(val,this.pageNum);
            },
            //搜索功能
            searchBtn(){
                console.log(this.search);
            },
            //搜索条件清空
            clearConditions(){
                console.log("搜索条件清空");
            },
            //用户状态 0未登录，1已登录
            roleState(row){
                if(row.status===2){
                    return "锁定"
                }else if(row.status===1){
                    return "禁用"
                }else {
                    return "正常"
                }
            },
            //删除询问功能
            deleteBefore(data1,data2){
                console.log(data2.userId);
                this.userId=data2.userId;
                this.$confirm('是否将用户从此角色中移除, 是否继续?', '提示', {
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
                this.$Api.Accout.updateUserRole({
                    userId: this.userId,
                    roleIds: [],
                }).then(res => {
                    if (res.result == '00000000') {
                        this.$message({
                            message: '移除成功',
                            type: 'success'
                        });
                        this.getRoleList(this.pageNum, this.pageSize);
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                });
            },
            //全部勾选
            handleSelectionChange(val) {
                this.multipleSelection = val;
                let userIds = [];
                this.multipleSelection.map((item)=> {
                    userIds.push(item.userId);
                });
                this.userIds = userIds;
                if (this.multipleSelection.length == 0) {
                    this.customerId = null;
                } else {
                    this.customerId = this.multipleSelection[0].userId;
                }
            },
            //批量删除提示
            romoveAllRole(row){
                if (this.customerId == null||this.customerId=='') {
                    this.$message({
                        showClose: true,
                        message: '请至少选择一位用户',
                        type: 'warning'
                    });
                } else {
                    this.batchDel();
                }
            },
            //确认批量接口
            batchDel(){
                this.loading=true;
                this.$Api.Role.deleteUserRole({
                    userIds:this.userIds,
                    roleIds:[this.roleId],
                }).then(res => {
                    if (res.result == '00000000') {
                        this.$message({
                            message: '移除成功',
                            type: 'success'
                        });
                        this.loading=false;
                        this.getRoleList(this.pageNum, this.pageSize);
                    } else {
                    }
                });
            },
        },
        mounted(){
            this.roleId=this.$store.state.roleId;
            this.getRoleList(1,10);
            this.RoleFunction=this.$store.state.RoleFunction;
            this.breadcrumb=this.$store.state.breadcrumb;
            this.breadname=this.$store.state.breadname;
        }
    }
</script>

<style lang="less">
    #roleList {
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
    }
</style>
