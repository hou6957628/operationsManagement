<template>
<div id="roleCotent">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <div class="treeBox">
        <el-tree :data="data2" :props="defaultProps" @node-click="handleNodeClick" default-expand-all :filter-node-method="filterNode" ref="tree2">
        </el-tree>
    </div>
    <div class="treeBox">
        <el-tree :data="data" show-checkbox node-key="id" :props="defaultProps">
        </el-tree>
    </div>
    <el-button class="modifyBtn" type="primary">确认修改</el-button>
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
                },
                search:'',
                filterText: '',
                data2: [{
                    id: 0,
                    label: "北京聚通达科技股份有限公司",
                    children: [{
                        id: 1,
                        label: '云通信事业部',
                        children: [{
                            id: 4,
                            label: '战略合作部',
                        }]
                    },
                        {
                            id: 1,
                            label: '云通信事业部',
                            children: [{
                                id: 4,
                                label: '战略合作部',
                                children: [{
                                    id: 9,
                                    label: '渠道部'
                                }, {
                                    id: 10,
                                    label: '资源部',
                                    children: [{
                                        id: 5,
                                        label: '投标部'
                                    }]
                                }]
                            }]
                        },
                        {
                            id: 1,
                            label: '云通信事业部',
                            children: [{
                                id: 4,
                                label: '战略合作部',
                                children: [{
                                    id: 9,
                                    label: '渠道部'
                                }, {
                                    id: 10,
                                    label: '资源部',
                                    children: [{
                                        id: 5,
                                        label: '投标部'
                                    }]
                                }]
                            }]
                        }
                    ],

                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                props: {
                    label: 'name',
                    children: 'zones'
                },
                count: 1,
                data: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
            }
        },
        methods:{
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
    .treeBox {
        width: 260px;
        height: 450px;
        float: left;
        display: inline-block;
        padding: 10px;

        /deep/ .el-tree-node__content {
            height: 30px;
            font-size: 20px;
        }

        /deep/ .el-icon-caret-right:before {
            content: "\E791";
        }

        /deep/ .el-tree-node__label {
            padding-left: 20px;
            background: url(./../../assets/images/pic.png) no-repeat left center;
        }
    }
    .modifyBtn{
        float: left;
    }
</style>
