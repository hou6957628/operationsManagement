<template>
<div style="text-align:center; width:650px; margin:0 auto;">
    <div class="treeBox">
        <el-tree :data="data2" :props="defaultProps" @node-click="handleNodeClick" default-expand-all :filter-node-method="filterNode" ref="tree2">
        </el-tree>
    </div>
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
            }
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
    }
};
</script>

<style lang="less" scoped>
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
        background: url(./../../assets/images/pic.png) no-repeat left center;
    }
}
</style>
