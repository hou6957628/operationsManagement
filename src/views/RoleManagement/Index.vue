<template>
<div id="roleCotent">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <div class="conditionsContent">
        <el-button class="addRole" @click="addRole" type="primary">增加角色</el-button>
        <el-input placeholder="请输入内容" v-model="search" class="searchBtn" clearable @clear="clearConditions">
            <el-button slot="append" @click="searchBtn" icon="el-icon-search"></el-button>
        </el-input>
    </div>
    <template>
        <el-table class="tableStyle" align="center" :header-cell-style='styleObj' v-loading="loading" :data="tableData" border>
            <el-table-column align="center" prop="index" label="序号" width="100"></el-table-column>
            <el-table-column align="center" prop="userName" label="用户名称" width="120"></el-table-column>
            <el-table-column align="center" prop="userName" label="称谓" width="120"></el-table-column>
            <el-table-column align="center" prop="statisticsDate" label="手机号" width="120"></el-table-column>
            <el-table-column align="center" prop="statisticsDate" label="用户等级" width="120"></el-table-column>
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
</div>
</template>

<script>
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
                pageNum: null,
                proTotal:null,
                pageSize:null,
                pageSizes:[10,20,30],
                nowPageSizes:10,
                styleObj: {
                    'color':'#313334',
                    'background-color':"#fafafa",
                    "font-size":"12px",
                    "font-size":"12px",
                },
                search:'',
            }
        },
        methods:{
            //翻页功能
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.getProductList(this.pageNum,val,this.value8,this.startTime,this.endTime);
                this.nowPageSizes=val;
            },
            //翻页功能
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                console.log(this.nowPageSizes);
                this.getProductList(val,this.nowPageSizes,this.value8,this.startTime,this.endTime);
            },
            //搜索功能
            searchBtn(){
                console.log(this.search);
            },
            //搜索条件清空
            clearConditions(){
                console.log("搜索条件清空");
            },
            //添加角色
            addRole(){
                console.log("添加角色");
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
        }
    }
</script>

<style lang="less" scoped>
    #roleCotent {
        height: 100%;
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
</style>
