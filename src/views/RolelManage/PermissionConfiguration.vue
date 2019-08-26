<template>
    <div id="perContent">
        <p class="perText">权限信息</p>
        <div class="treeBox">
            <el-tree :data="data" show-checkbox node-key="id" default-expand-all :default-checked-keys='resourceCheckedKey' :props="defaultProps" ref="tree">
            </el-tree>
        </div>
        <div class="contentBox">
            <el-button v-if="clickStyle" @click="submitAccount()" type="primary" plain>确认修改</el-button>
            <el-button @click="closeDrawer()" type="info" plain>返回</el-button>
        </div>
    </div>
</template>

<script>
    import { convertAuthor, restTree,noCheckTree } from "@/components/js/initMapTree";
    export default {
        props:["clickStyle"],
        data() {
            return {
                filterText: '',
                count: 1,
                data: [],
                data1: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                breadcrumb:'',
                breadname:'',
                checkList:[],
                resourceCheckedKey:[],
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
            handleNodeClick(data) {
                console.log(data);
            },
            //获取角色和相关联的用户与功能信息
            getRoleFunction(data){
                this.$Api.Role.getRoleFunction({
                    roleId:this.roleId,
                }).then(res => {
                    if (res.result == '00000000') {
                        this.data=res.data.authTree;
                        this.$nextTick(function() {
                            if(this.clickStyle){
                                this.resourceCheckedKey=noCheckTree(res.data.authTree);
                            }else {
                                this.resourceCheckedKey=convertAuthor(res.data.authTree);
                            }
                        })
                    } else {
                        this.$message({
                            message: res.data,
                            type: 'error'
                        });
                    }
                });
            },
            //提交账户权限树
            submitAccount(){
                this.getKeys();
                this.$emit("treeChuan",this.aKey);
            },

            //获取所有KEY的数组
            getKeys () {
                this.aKey = this.$getCheckedKeys(this.data, this.$refs.tree.getCheckedKeys(), 'id');
                console.log(this.aKey);
            },
            //closeDrawer
            closeDrawer(){
                this.$emit('closeParentDrawer','111');
            },
        },
        mounted(){
            restTree();
            this.roleId=this.$store.state.roleId;
            this.getRoleFunction(1,10);

        },
    };
</script>

<style lang="less">
    #perContent{
        height: auto;
        background-color: #fff;
        .el-tree {
            position: relative;
            cursor: default;
            color: #606266;
            padding-top: 15px;
        }
        .treeBox {
            width: 100%;
            height: auto;
            float: left;
            display: inline-block;
            border-top: 1px solid #ccc;
        }
        .contentBox{
            position: relative;
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            float: left;
            display: inline-block;
            padding: 10px;
            letter-spacing: 2px;
        }
        .perInfo{
            position: absolute;
            left: 12px;
            top:-15px;
            line-height: 20px;
        }
        .perText{
            text-indent: 20px;
        }
    }
</style>
