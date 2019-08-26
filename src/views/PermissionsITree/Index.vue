<template>
    <div id="perContent">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path:breadcrumb }">{{breadname}}</el-breadcrumb-item>
            <el-breadcrumb-item>权限配置</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <div class="treeBox">
            <el-tree :data="data" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps">
            </el-tree>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                filterText: '',
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
                breadcrumb:'',
                breadname:'',
            }

        },
        watch: {
            filterText(val) {
                this.$refs.tree2.filter(val);
            }
        },
        methods: {
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            handleNodeClick(data) {
                console.log(data);
            },
        },
        mounted(){
            this.breadcrumb=this.$store.state.breadcrumb;
            this.breadname=this.$store.state.breadname;
        },
    };
</script>

<style lang="less" scoped>
    #perContent{
        height: calc(100% - 20px);
        padding: 20px 0 0 20px;
        background-color: #fff;
    }
    .treeBox {
        width: 260px;
        height: 450px;
        float: left;
        display: inline-block;
        border: 1px solid #ccc;
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
        }
    }
</style>
